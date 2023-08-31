import { Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CategoryProps {
  id: string;
  title: string;
}

const CategoryBar = (props: CategoryProps) => {
  const { id, title } = props;

  const navigate = useNavigate();

  return (
    <Typography
      borderBottom={"1px solid rgba(158, 158, 158, 0.3)"}
      paddingY={"5px"}
      paddingX={"10px"}
      align="left"
      fontWeight={"bold"}
      onClick={() => navigate(`/category/${id}`)}
      sx={{ cursor: "pointer" }}
    >
      {title}
    </Typography>
  );
};

export default CategoryBar;
