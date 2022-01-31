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
import moment from "moment";
import guardasActions from "../../modules/Guardas/_redux/actions";

const ProgramacionTable = ({ colaboradorCode, week }) => {
  const dispatch = useDispatch();
  const columns = [
    {
      id: "fecha",
      label: "Fecha",
      minWidth: 170,
    },
    {
      id: "puesto",
      label: "Puesto",
      minWidth: 170,
      align: "right",
    },
    {
      id: "turno",
      label: "Turno",
      minWidth: 170,
      align: "right",
    },
    {
      id: "notificacion",
      label: "Notificacion",
      minWidth: 170,
      align: "left",
    },
  ];

  // eslint-disable-next-line no-unused-vars
  const [dataInit, setDataInit] = useState({
    colaboradorCode,
  });
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);

  useEffect(() => {
    dispatch(
      guardasActions.getProgramacion({ dataInit, programacionCallBack })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const programacionCallBack = (data) => {
    const {
      guardProgramsWeekSpots: { this: thisWeek, next: nextWeek },
    } = data;
    setRows(thisWeek);
    //console.log(thisWeek);
    setRows2(nextWeek);
  };

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
  const [page2, setPage2] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [rowsPerPage2, setRowsPerPage2] = React.useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePage2 = (event, newPage) => {
    setPage2(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeRowsPerPage2 = (event) => {
    setRowsPerPage2(+event.target.value);
    setPage2(0);
  };

  return (
    <Paper className={classes.root}>
      <p
        className="pl-8"
        style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0" }}
      >
        Turnos esta semana
      </p>
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
                .map((row, index) =>
                  Array.isArray(row.programs)
                    ? row.programs.map((element) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            <TableCell>
                              {moment(element.programStartDate.date).format(
                                "DD/MM/YYYY, h:mm:ss a"
                              )}
                            </TableCell>
                            <TableCell
                              style={{
                                textAlign: "right",
                              }}
                            >
                              {element.place_name2}
                            </TableCell>
                            <TableCell
                              style={{
                                textAlign: "right",
                              }}
                            >
                              <p>
                                {element.turn_code} - {element.turn_type}
                              </p>
                            </TableCell>
                            <TableCell
                              style={{
                                textAlign: "left",
                              }}
                            >
                              {row.notifications}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : null
                )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 10, 25, 100]}
        component="div"
        count={rows.length > 0 ? rows.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      <TableContainer className={classes.container}>
        <p
          className="pl-8"
          style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0" }}
        >
          Turnos proxima semana
        </p>
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
          {rows2.length > 0 && (
            <TableBody>
              {rows2
                .slice(
                  page2 * rowsPerPage2,
                  page2 * rowsPerPage2 + rowsPerPage2
                )
                .map((row, index) =>
                  Array.isArray(row.programs)
                    ? row.programs.map((element) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            <TableCell>
                              {moment(element.programStartDate.date).format(
                                "DD/MM/YYYY, h:mm:ss a"
                              )}
                            </TableCell>
                            <TableCell
                              style={{
                                textAlign: "right",
                              }}
                            >
                              {element.place_name2}
                            </TableCell>
                            <TableCell
                              style={{
                                textAlign: "right",
                              }}
                            >
                              <p>
                                {element.turn_code} - {element.turn_type}
                              </p>
                            </TableCell>
                            <TableCell
                              style={{
                                textAlign: "left",
                              }}
                            >
                              {row.notifications}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : null
                )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 10, 25, 100]}
        component="div"
        count={rows2.length > 0 ? rows2.length : 0}
        rowsPerPage={rowsPerPage2}
        page={page2}
        onChangePage={handleChangePage2}
        onChangeRowsPerPage={handleChangeRowsPerPage2}
      />
    </Paper>
  );
};

export default ProgramacionTable;
