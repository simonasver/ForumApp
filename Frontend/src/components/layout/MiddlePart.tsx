import { Paper } from "@mui/material";
import Categories from "../category/Categories";

const MiddlePart = () => {
  return (
    <Paper sx={{ width: "100%", minHeight: "700px", backgroundColor: "white" }}>
      <Categories />
    </Paper>
  );
};

export default MiddlePart;
