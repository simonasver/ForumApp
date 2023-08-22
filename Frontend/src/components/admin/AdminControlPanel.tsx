import { Paper, Typography, Button, Stack } from "@mui/material";
import { useAppSelector, useEffectOnce } from "../../utils/hooks";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../utils/helpers";

const AdminControlPanel = () => {
  const navigate = useNavigate();

  const user = useAppSelector((user) => user.auth.user);

  useEffectOnce(() => {
    if (!user || !isAdmin(user)) {
      navigate("/", { replace: true });
    }
  });

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "white",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "inherit",
          width: "400px",
        }}
      >
        <Typography variant="h5">Admin control panel</Typography>
        <Typography variant="subtitle2">Control website from here</Typography>
        <br />
        <Stack direction={"row"} justifyContent={"space-around"}>
          <Button variant="outlined">Users</Button>
          <Button variant="outlined" onClick={() => navigate("/admincategory")}>
            Categories
          </Button>
          <Button variant="outlined">Roles</Button>
        </Stack>
      </Paper>
    </Paper>
  );
};

export default AdminControlPanel;
