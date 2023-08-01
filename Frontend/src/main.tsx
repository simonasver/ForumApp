import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { injectStore } from "./services/api.ts";
import store from "./store/";
import { Provider } from "react-redux";
injectStore(store);

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
