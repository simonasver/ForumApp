import React from "react";
import { Alert, Slide, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { alertActions } from "../../store/alert-slice";

const NotificationSnackbar = () => {
  const dispatch = useAppDispatch();

  const alertData = useAppSelector((state) => state.alert);

  React.useEffect(() => {
    console.log(
      "Notification snackbar with type: " +
        alertData.type +
        "; and message: " +
        alertData.message +
        ";"
    );
  }, [alertData]);

  return (
    <Snackbar
      open={!!alertData.type && !!alertData.message}
      TransitionComponent={TransitionUp}
      onClose={() =>
        setTimeout(() => dispatch(alertActions.clearAlert()), 5000)
      }
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={5000}
    >
      <Alert severity={alertData.type}>{alertData.message}</Alert>
    </Snackbar>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TransitionUp = (props: any) => {
  return <Slide {...props} direction="up" />;
};

export default NotificationSnackbar;
