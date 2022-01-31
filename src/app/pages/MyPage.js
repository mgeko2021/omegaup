import React from "react";
import { useSubheader } from "../../_metronic/layout";
import { makeStyles } from "@material-ui/core";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export const MyPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Gestion de riesgos");
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root}>
        <p>La seccion de gestión de riesgo está en desarrollo.</p>
      </Paper>
    </>
  );
};
