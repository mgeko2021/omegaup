import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core";
import { Table } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { TableContainer } from "@material-ui/core";
import { TableFooter } from "@material-ui/core";
import { TablePagination } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";

import visitantesActions from "../../modules/Visitantes/actions";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const BasicTable = ({ idContacto, numeroInstancia, NameInstance }) => {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [rows, setRows] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [dataInit, setDataInit] = React.useState({
    idInstancia: numeroInstancia,
    bdName: NameInstance,
    idContacto: idContacto,
  });
  const dispatch = useDispatch();

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visitantesRowsCallback = async (data) => {
    const { Visitantes = null, Correspondencias = null } = data;

    if (Visitantes) {
      await setRows(data.Visitantes);
    } else if (Correspondencias) {
      await setRows(data.Correspondencias);
    }
  };

  useEffect(() => {
    dispatch(
      visitantesActions.getVisitantesInit({
        dataInit,
        visitantesRowsCallback,
      })
    );
  }, [dispatch, dataInit]);

  return (
    <TableContainer style={{ backgroundColor: "#f5f5f5", marginLeft: "10px" }}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
            <TableRow key={index}>
              <TableCell
                component="th"
                scope="row"
                style={{
                  fontSize: "1.025rem",
                  borderRight: "1px solid #E0E0E0",
                }}
              >
                <div className="d-flex align-items-center">
                  <img
                    className="mr-5"
                    style={{ width: 48, height: 48, borderRadius: "50%" }}
                    src={`https://omega.proteccionenlinea.co/controldevisitantes/${row.foto}`}
                    alt="user"
                  />
                  <p className="p-0 m-0">
                    {row.nombre} {row.apellido}
                  </p>
                </div>
              </TableCell>
              <TableCell
                style={{
                  fontSize: "1.025rem",
                  borderRight: "1px solid #E0E0E0",
                }}
                align="left"
              >
                <>
                  <div className="d-flex align-items-center">
                    <div className="mr-5" style={{ width: 24, height: 24 }}>
                      <SVG
                        style={{ width: "100%", height: "100%" }}
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/arrow-right.svg"
                        )}
                      ></SVG>
                    </div>
                    {row.fecha_ingreso}
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="mr-5" style={{ width: 24, height: 24 }}>
                      <SVG
                        style={{ width: "100%", height: "100%" }}
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/arrow-left.svg"
                        )}
                      ></SVG>
                    </div>
                    {row.fecha_salida}
                  </div>
                </>
              </TableCell>
              <TableCell
                style={{
                  fontSize: "1.025rem",
                  borderRight: "1px solid #E0E0E0",
                }}
                align="left"
              >
                <p>
                  Contacto: <br /> {row.nombreContacto}
                </p>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[4, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
