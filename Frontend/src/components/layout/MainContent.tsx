import { Grid } from "@mui/material";
import MiddlePart from "./MiddlePart";
import SidePart from "./SidePart";

// interface ContentProps {
//   category: string | undefined;
// }

const MainContent = (/* props: ContentProps */) => {
  return (
    <Grid container direction={"row"} justifyContent={"center"}>
      <Grid
        item
        width={{ xs: "100%", md: "70%" }}
        sx={{ paddingRight: { xs: "0px", md: "10px" } }}
      >
        <MiddlePart />
      </Grid>
      <Grid
        item
        width={{ xs: "100%", md: "30%" }}
        sx={{
          paddingLeft: { xs: "0px", md: "10px" },
          paddingTop: { xs: "10px", md: "0px" },
        }}
      >
        <SidePart />
      </Grid>
    </Grid>
  );
};

export default MainContent;
