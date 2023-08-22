import { Typography } from "@mui/material";

interface CategoryProps {
  title: string;
}

const CategoryBar = (props: CategoryProps) => {
  const { title } = props;

  return <Typography>Category: {title}</Typography>;
};

export default CategoryBar;
