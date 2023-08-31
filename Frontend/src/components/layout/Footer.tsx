import { Paper } from "@mui/material";

const Footer = () => {
  return (
    <Paper
      sx={{
        backgroundColor: "inherit",
        width: "100%",
        paddingX: { xs: "30px", md: "200px" },
        boxSizing: "border-box",
      }}
      elevation={0}
    >
      <Paper sx={{ minHeight: "100px" }}>footer</Paper>
    </Paper>
  );
};

export default Footer;
