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
import { Paper } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

import minutasActions from "../../modules/Minutas/_redux/actions";

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

const BasicTable = ({ category, numeroInstancia, NameInstance }) => {
  const dispatch = useDispatch();
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [rows, setRows] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [dataInit, setDataInit] = React.useState({
    idInstancia: numeroInstancia,
    bdName: NameInstance,
  });

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const minutasRowsCallback = async (data) => {
    const { minuta = null, bitacora = null } = data;

    if (minuta) {
      await setRows(data.minuta);
    } else if (bitacora) {
      await setRows(data.bitacora);
    }
  };

  useEffect(() => {
    if (category.value === "Administracion") {
      dispatch(
        minutasActions.getMinutasInit({ dataInit, minutasRowsCallback })
      );
    } else if (category.value === "Bitacora") {
      dispatch(
        minutasActions.getBitacoraInit({ dataInit, minutasRowsCallback })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, dispatch]);
  return (
    <TableContainer component={Paper}>
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
                  width: "20%",
                  fontSize: "1.025rem",
                  borderRight: "1px solid #E0E0E0",
                }}
              >
                <h2>
                  {row.nombreCreador} {row.apellidoCreador}
                </h2>
                <ul style={{ padding: 0, listStyle: "none" }}>
                  <li>
                    <strong>Cargo:</strong> {row.cargoCreador}
                  </li>
                  <li>
                    <strong>Fecha:</strong> {row.fecha_creacion}
                  </li>
                  <li>
                    <strong>Asuntos:</strong> {row.asunto}
                  </li>
                  <li>
                    <strong>Contacto:</strong> {row.contacto}
                  </li>
                </ul>
              </TableCell>
              <TableCell
                style={{
                  width: "80%",
                  fontSize: "1.025rem",
                }}
                align="left"
              >
                {row.descripcion}
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
