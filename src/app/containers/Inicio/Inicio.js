import React from "react";
import { makeStyles } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import Chart from "../../Components/chart/Chart.js";
import { useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    /* padding: theme.spacing(10,0,10,0), */
	padding: theme.spacing(3, 2),
    
  },
}));



const Inicio = () => {
  const {tipoUsuario} = useSelector((state) => state.auth);
  const classes = useStyles();
  

  return ( 
    <>
	
	{(() => {
  switch (tipoUsuario) {
	 case 'seguridadadministrativo'||'Administrador':
		 return (
			<Chart/>
		 )
	 default:
		 return (
		   
			<Paper className={classes.root}>
					<div className="w-100 d-flex justify-content-center">
					<img className="w-100" src="/img/banner-inicio.jpg" alt="" />
					</div>
				</Paper>
		 )
  }
  })()}

    </> 
  );
};
export default Inicio;

