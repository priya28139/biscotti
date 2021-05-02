import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { grey, pink } from "@material-ui/core/colors";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SnackBar({ open, setOpen, darkState }) {
  const classes = useStyles();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          style={{ backgroundColor: darkState ? pink[500] : grey[900] }}
        >
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </div>
  );
}
