import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { pink, purple } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  colorPrimary: {
    backgroundColor: pink[200],
  },
  barColorPrimary: {
    backgroundColor: pink[700],
  },
});

export default function ProgressBar({ progress }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress
        variant="determinate"
        value={progress}
        classes={{
          colorPrimary: classes.colorPrimary,
          barColorPrimary: classes.barColorPrimary,
        }}
      />
    </div>
  );
}
