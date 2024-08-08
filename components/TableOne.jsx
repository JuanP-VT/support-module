/**
 * Useful comment
 */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { Search } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { FormControl, Select, MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import format from "date-fns/format";
import { isAfter, isSameDay } from "date-fns";
import { DeleteForever, PersonSearch } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function TableOne() {
  function createData(
    id,
    clientId,
    client,
    dateOfAdmision,
    plataform,
    orderNumber,
    status,
    actions
  ) {
    return {
      id,
      clientId,
      client,
      dateOfAdmision,
      plataform,
      orderNumber,
      status,
      actions,
    };
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rows = [
    createData(
      157,
      257,
      "María Solano",
      "2024-08-02",
      "Jump Seller",
      640,
      "Pendiente",
      "Borrar/Editar"
    ),
    createData(
      300,
      100,
      "Juan Zepeda",
      "2024-08-03",
      "Shopify",
      300,
      "Cancelado",
      "Borrar/Editar"
    ),
    createData(
      510,
      200,
      "Mario Gusman",
      "2024-08-04",
      "Shopify",
      310,
      "Pendiente",
      "Borrar/Editar"
    ),
    createData(
      712,
      131,
      "Gustavo Torres",
      "2024-08-05",
      "Jump Seller",
      876,
      "Generado",
      "Borrar/Editar"
    ),
    createData(
      794,
      831,
      "Armando Frausto",
      "2024-08-06",
      "Jump Seller",
      876,
      "Generado",
      "Borrar/Editar"
    ),
    createData(
      268,
      531,
      "Jorge Higuera",
      "2024-08-07",
      "Shopify",
      247,
      "Cancelado",
      "Borrar/Editar"
    ),
    createData(
      153,
      531,
      "Walter Vega",
      "2024-08-08",
      "Jump Seller",
      162,
      "Generado",
      "Borrar/Editar"
    ),
    createData(
      987,
      654,
      "Ana García",
      "2024-08-09",
      "Jump Seller",
      321,
      "Pendiente",
      "Borrar/Editar"
    ),
    createData(
      246,
      135,
      "Carlos López",
      "2024-08-10",
      "Shopify",
      246,
      "Cancelado",
      "Borrar/Editar"
    ),
    createData(
      369,
      963,
      "Laura Pérez",
      "2024-08-11",
      "Jump Seller",
      159,
      "Generado",
      "Borrar/Editar"
    ),
    createData(
      753,
      951,
      "Miguel Sánchez",
      "2024-08-12",
      "Shopify",
      753,
      "Pendiente",
      "Borrar/Editar"
    ),
    createData(
      951,
      753,
      "Sofía Martínez",
      "2024-08-13",
      "Jump Seller",
      951,
      "Generado",
      "Borrar/Editar"
    ),
    createData(
      357,
      951,
      "Pedro Hernández",
      "2024-08-14",
      "Shopify",
      357,
      "Cancelado",
      "Borrar/Editar"
    ),
    createData(
      753,
      159,
      "Isabel Gómez",
      "2024-08-15",
      "Jump Seller",
      753,
      "Pendiente",
      "Borrar/Editar"
    ),
    createData(
      951,
      753,
      "Luisa García",
      "2024-08-16",
      "Shopify",
      951,
      "Generado",
      "Borrar/Editar"
    ),
    createData(
      753,
      951,
      "Javier López",
      "2024-08-17",
      "Jump Seller",
      753,
      "Pendiente",
      "Borrar/Editar"
    ),
    createData(
      951,
      753,
      "María Sánchez",
      "2024-08-18",
      "Shopify",
      951,
      "Cancelado",
      "Borrar/Editar"
    ),
    createData(
      753,
      951,
      "Sergio Martínez",
      "2024-08-19",
      "Jump Seller",
      753,
      "Generado",
      "Borrar/Editar"
    ),
    createData(
      951,
      753,
      "Carla Hernández",
      "2024-08-20",
      "Shopify",
      951,
      "Pendiente",
      "Borrar/Editar"
    ),
    createData(
      753,
      951,
      "Ricardo Gómez",
      "2024-08-21",
      "Jump Seller",
      753,
      "Generado",
      "Borrar/Editar"
    ),
    createData(
      951,
      753,
      "Valeria García",
      "2024-08-22",
      "Shopify",
      951,
      "Cancelado",
      "Borrar/Editar"
    ),
    createData(
      753,
      951,
      "Daniel López",
      "2024-08-23",
      "Jump Seller",
      753,
      "Pendiente",
      "Borrar/Editar"
    ),
    createData(
      951,
      753,
      "Carmen Sánchez",
      "2024-08-24",
      "Shopify",
      951,
      "Generado",
      "Borrar/Editar"
    ),
    createData(
      753,
      951,
      "Roberto Martínez",
      "2024-08-25",
      "Jump Seller",
      753,
      "Pendiente",
      "Borrar/Editar"
    ),
    createData(
      951,
      753,
      "Patricia Hernández",
      "2024-08-26",
      "Shopify",
      951,
      "Cancelado",
      "Borrar/Editar"
    ),
    createData(
      753,
      951,
      "Andrés Gómez",
      "2024-08-27",
      "Jump Seller",
      753,
      "Generado",
      "Borrar/Editar"
    ),
    createData(
      951,
      753,
      "Ana López",
      "2024-08-28",
      "Shopify",
      951,
      "Pendiente",
      "Borrar/Editar"
    ),
    createData(
      753,
      951,
      "Carlos Sánchez",
      "2024-08-29",
      "Jump Seller",
      753,
      "Generado",
      "Borrar/Editar"
    ),
    createData(
      951,
      753,
      "Laura Martínez",
      "2024-08-30",
      "Shopify",
      951,
      "Cancelado",
      "Borrar/Editar"
    ),
    createData(
      753,
      951,
      "Miguel Hernández",
      "2024-08-31",
      "Jump Seller",
      753,
      "Pendiente",
      "Borrar/Editar"
    ),
  ];

  const [status, setStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);
  const [filterWord, setFilterWord] = useState("");

  useEffect(() => {
    //Filter by status
    const filterByStatus = rows.filter((row) => {
      return row.status.toLowerCase().includes(status.toLowerCase());
    });
    //Filter by search param first
    const filteredBySearch = filterByStatus.filter((row) => {
      return (
        row.client.toLowerCase().includes(filterWord.toLowerCase()) ||
        row.plataform.toLowerCase().includes(filterWord.toLowerCase()) ||
        row.id.toString().includes(filterWord.toLowerCase()) ||
        row.clientId.toString().includes(filterWord.toLowerCase())
      );
    });
    setFilteredRows(filteredBySearch);
    //Filter by date only if a date is selected
    if (selectedDate) {
      const filteredByDate = filteredBySearch.filter((row) => {
        return (
          isAfter(new Date(row.dateOfAdmision), new Date(selectedDate)) ||
          isSameDay(new Date(row.dateOfAdmision), new Date(selectedDate))
        );
      });
      setFilteredRows(filteredByDate);
    }
  }, [selectedDate, rows, filterWord, status]);
  //Button handlers
  const handleDelete = (id) => {
    console.log(`Delete id: ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Edit id: ${id}`);
  };
  return (
    <div className="m-10">
      <Box className="flex gap-3 w-full py-2 ">
        <DatePicker
          defaultValue={new Date()}
          slotProps={{ textField: { size: "small" } }}
          label="Desde"
          format="yyyy-MM-dd"
          onAccept={(newValue) => {
            if (newValue) {
              const formattedDate = format(newValue, "yyyy-MM-dd");
              setSelectedDate(formattedDate);
            }
          }}
        />
        <TextField
          id="outlined-basic"
          inputProps={{ style: { height: "23px" } }}
          label="Buscar"
          variant="outlined"
          size="small"
          value={filterWord}
          onChange={(ev) => setFilterWord(ev.target.value)}
          InputProps={{
            startAdornment: <Search />,
          }}
        />
        <FormControl fullWidth>
          <InputLabel>Estatus</InputLabel>
          <Select
            value={status}
            sx={{ width: "250px" }}
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Estatus"
            onChange={(ev) => setStatus(ev.target.value)}
          >
            <MenuItem value="">-</MenuItem>
            <MenuItem value="Generado">Generado</MenuItem>
            <MenuItem value="Pendiente">Pendiente</MenuItem>
            <MenuItem value="Cancelado">Cancelado</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead
            sx={{ backgroundColor: "ThreeDFace", fontWeight: "fontWeightBold" }}
          >
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>ID Cliente</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Fecha Ingreso</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Plataforma E-Commerce
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>No. Pedido</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Estatus</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow
                key={`${index}-${row.id}`}
                sx={{
                  height: "70px",
                }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.clientId}</TableCell>
                <TableCell>{row.client}</TableCell>
                <TableCell>{row.dateOfAdmision}</TableCell>
                <TableCell>{row.plataform}</TableCell>
                <TableCell>{row.orderNumber}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(row.id)}
                  >
                    <DeleteForever />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(row.id)}>
                    <PersonSearch color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableOne;
