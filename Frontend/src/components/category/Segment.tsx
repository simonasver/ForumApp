import { Paper, Typography } from "@mui/material";
import Category from "./Category";

interface SegmentProps {
  title: string;
  categories: { id: number; name: string }[];
}

const Segment = (props: SegmentProps) => {
  const { title, categories } = props;

  return (
    <Paper sx={{ paddingY: "10px", marginBottom: "10px" }}>
      <Typography
        variant="h6"
        borderBottom="1px solid black"
        paddingBottom="10px"
        marginBottom="10px"
      >
        Segment: {title}
      </Typography>
      {categories.map((category) => (
        <Category key={category.id} title={category.name} />
      ))}
    </Paper>
  );
};

export default Segment;
