import { Typography } from "@mui/material";

interface CategoryProps {
  title: string;
}

const Category = (props: CategoryProps) => {
  const { title } = props;

  return <Typography>Category: {title}</Typography>;
};

export default Category;
