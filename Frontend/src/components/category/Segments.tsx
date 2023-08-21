import { Paper } from "@mui/material";
import Segment from "./Segment";

const TEMP_SEGMENTS = [
  {
    id: 1,
    name: "first",
    categories: [
      {
        id: 0,
        name: "test",
      },
      {
        id: 1,
        name: "test1",
      },
    ],
  },
  {
    id: 2,
    name: "second",
    categories: [
      {
        id: 0,
        name: "test11",
      },
      {
        id: 1,
        name: "test12",
      },
    ],
  },
];

const Segments = () => {
  return (
    <Paper sx={{ width: "100%" }}>
      {TEMP_SEGMENTS.map((segment) => (
        <Segment
          key={segment.id}
          title={segment.name}
          categories={segment.categories}
        />
      ))}
    </Paper>
  );
};

export default Segments;
