import React from "react";
import { Paper } from "@mui/material";

interface ContentProps {
  children: React.ReactNode;
}

const Content = (props: ContentProps) => {
  const { children } = props;

  return (
    <Paper
      sx={{
        width: "100%",
        backgroundColor: "inherit",
        paddingX: { xs: "30px", md: "100px" },
        paddingY: "30px",
        boxSizing: "border-box",
      }}
      elevation={0}
    >
      {children}
    </Paper>
  );
};

export default Content;
