import { Paper } from "@mui/material";
import Segments from "../category/Segments";

const MiddlePart = () => {
  return (
    <Paper sx={{ width: "100%", minHeight: "700px", backgroundColor: "white" }}>
      <Segments />
    </Paper>
  );
};

export default MiddlePart;
