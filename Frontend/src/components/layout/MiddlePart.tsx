import { Paper } from "@mui/material";
import Categories from "../category/Categories";
import { useParams } from "react-router-dom";
import CategoryContainer from "../category/CategoryContainer";

const MiddlePart = () => {
  const { categoryId } = useParams();
  return (
    <Paper
      sx={{
        width: "100%",
        minHeight: "700px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {categoryId && <CategoryContainer categoryId={categoryId} />}
      {!categoryId && <Categories />}
    </Paper>
  );
};

export default MiddlePart;
