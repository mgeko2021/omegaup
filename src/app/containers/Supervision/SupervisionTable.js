import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Table } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { TableContainer } from "@material-ui/core";
import { TableHead } from "@material-ui/core/";
import { TablePagination } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import supervisionActions from "../../modules/Supervision/actions";

const SupervisionTable = ({ nitPuesto }) => {
  const dispatch = useDispatch();
  const columns = [
    { id: "Asunto", label: "Asunto", minWidth: 170 },
    {
      id: "Registro",
      label: "Registrado por",
      minWidth: 170,
      align: "right",
    },
    {
      id: "Fecha",
      label: "Fecha de registro",
      minWidth: 170,
      align: "right",
    },
  ];

  // eslint-disable-next-line no-unused-vars
  const [dataInit, setDataInit] = useState({
    nitPuesto,
  });
  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(supervisionActions.getSupervision({ dataInit, setRows }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 440,
    },
  });

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell>Visita no. {row.numeroVisita}</TableCell>
                    <TableCell style={{ textAlign: "right" }}>
                      {row.nombreUsuarioRegistra} {row.apellidoUsuarioRegistra}
                    </TableCell>
                    <TableCell style={{ textAlign: "right" }}>
                      {row.fechaVisita}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default SupervisionTable;
