import React from "react";
import { Paper } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = () => {
  const [textValue, setTextValue] = React.useState("");

  return (
    <Paper
      sx={{
        backgroundColor: "inherit",
        width: "100%",
        paddingX: { xs: "30px", md: "100px" },
        paddingY: "30px",
        boxSizing: "border-box",
      }}
      elevation={0}
    >
      <Paper sx={{ minHeight: "300px", padding: "10px" }}>
        <ReactQuill
          theme="snow"
          value={textValue}
          onChange={(value) => {
            setTextValue(value);
            console.log(value);
          }}
        />
      </Paper>
    </Paper>
  );
};

export default TextEditor;
