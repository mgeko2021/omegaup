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
import guardasActions from "../../modules/Guardas/_redux/actions";

const FormacionTable = ({ colaboradorCode }) => {
  const dispatch = useDispatch();
  const columns = [
    // {
    //   id: "tipo",
    //   label: "Tipo de estudio",
    //   minWidth: 170,
    // },
    {
      id: "curso",
      label: "Titulo del estudio",
      minWidth: 170,
      align: "right",
    },
    {
      id: "Institucion",
      label: "Institucion",
      minWidth: 170,
      align: "right",
    },
    {
      id: "finalizacion",
      label: "Fecha de finalizacion",
      minWidth: 170,
      align: "right",
    },
  ];

  // eslint-disable-next-line no-unused-vars
  const [dataInit, setDataInit] = useState({
    colaboradorCode,
  });
  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(guardasActions.getFormacion({ dataInit, setRows }));
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
          {rows.length > 0 && (
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {/* <TableCell>{row.tipoEstudio}</TableCell> */}
                      <TableCell style={{ textAlign: "right" }}>
                        {row.nombreCurso}
                      </TableCell>
                      <TableCell style={{ textAlign: "right" }}>
                        {row.institucion}
                      </TableCell>
                      <TableCell style={{ textAlign: "right" }}>
                        {row.fechaFinalizacion}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length > 0 ? rows.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default FormacionTable;
