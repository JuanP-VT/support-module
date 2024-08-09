import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Status from "./Status";
import ActionsMenu from "./ActionsMenu";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  openEditDialog,
  setFilterDate,
  setFilterState,
  setFilterType,
  setFilterWord,
  setSelectedItem,
} from "../redux/features/dataSlice";
import { statusList, typeList } from "../constants/ModuloSoporte";
import { DatePicker } from "@mui/x-date-pickers";
import { format, isAfter, isSameDay } from "date-fns";

export default function TableTwo() {
  const data = useSelector((state) => state.data.value);
  const dispatch = useDispatch();
  const filterWord = useSelector((state) => state.data.filterWord);
  const filterState = useSelector((state) => state.data.filterState);
  const filterType = useSelector((state) => state.data.filterType);
  const selectedDate = useSelector((state) => state.data.filterDate);
  /**
   * We filter data in steps
   * 1- Filter by "Buscar" param
   * 2- Filter by "Estado"
   * 3- Filter by "Tipo"
   * 4- Filter by "Fecha"
   */
  const filterBySearchFilter = data.filter((row) => {
    return (
      row.problema.toLowerCase().includes(filterWord.toLowerCase()) ||
      row.solución.toLowerCase().includes(filterWord.toLowerCase()) ||
      row.usuario.toLowerCase().includes(filterWord.toLowerCase())
    );
  });
  const filterByStatus = filterBySearchFilter.filter((row) =>
    row.estado.toLowerCase().includes(filterState.toLowerCase())
  );
  const filterByType = filterByStatus.filter((row) =>
    row.tipo.toLowerCase().includes(filterType.toLowerCase())
  );

  const filteredByDate = filterByType.filter((row) => {
    if (!selectedDate) return row;
    return (
      isAfter(new Date(row.fecha), new Date(selectedDate)) ||
      isSameDay(new Date(row.fecha), new Date(selectedDate))
    );
  });

  return (
    <div>
      <Box sx={{ p: 2, display: "flex" }}>
        <TextField
          onChange={(e) => dispatch(setFilterWord(e.target.value))}
          sx={{ width: "200px", mr: 2 }}
          label="Buscar"
          size="small"
          InputProps={{
            startAdornment: <Search />,
          }}
        />
        <FormControl>
          <InputLabel>Estado</InputLabel>
          <Select
            defaultValue=""
            onChange={(e) => dispatch(setFilterState(e.target.value))}
            sx={{ width: "200px", mr: 2 }}
            size="small"
            label="Estatus"
          >
            <MenuItem value="">-</MenuItem>
            <MenuItem value={statusList.COMPLETADO}>
              <Status status={statusList.COMPLETADO} />
            </MenuItem>
            <MenuItem value={statusList.ENPROGRESO}>
              <Status status={statusList.ENPROGRESO} />
            </MenuItem>
            <MenuItem value={statusList.PENDIENTE}>
              <Status status={statusList.PENDIENTE} />
            </MenuItem>
            <MenuItem value={statusList.CANCELADO}>
              <Status status={statusList.CANCELADO} />
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Tipo</InputLabel>
          <Select
            defaultValue=""
            onChange={(e) => dispatch(setFilterType(e.target.value))}
            sx={{ width: "200px", mr: 2 }}
            size="small"
            id="demo-simple-select"
            label="Estatus"
          >
            <MenuItem value="">-</MenuItem>
            <MenuItem value={typeList.CANCELACIÓN}>{typeList.CANCELACIÓN}</MenuItem>
            <MenuItem value={typeList.SOPORTE}>{typeList.SOPORTE}</MenuItem>
            <MenuItem value={typeList.REGISTRO}>{typeList.REGISTRO}</MenuItem>
          </Select>
        </FormControl>
        <DatePicker
          slotProps={{ textField: { size: "small" } }}
          label="Desde"
          format="yyyy/MM/dd"
          onAccept={(newValue) => {
            if (newValue) {
              const formattedDate = format(newValue, "yyyy/MM/dd");
              dispatch(setFilterDate(formattedDate));
            }
          }}
        />
        {/** Reset Selected Item */}
        <Button
          onClick={() => {
            dispatch(
              setSelectedItem({
                tipo:"",
                fecha: "",
                usuario: "",
                problema: "",
                solución: "",
                estado: "",
              })
            );
            dispatch(openEditDialog());
          }}
          sx={{
            backgroundColor: "green",
            color: "white",
            ml: 1,
            "&:hover": {
              backgroundColor: "lightgreen",
              color: "white",
            },
          }}
        >
          Nuevo
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead
            sx={{ backgroundColor: "ThreeDFace", fontWeight: "fontWeightBold" }}
          >
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Usuario</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Problema</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Solución</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredByDate.map((row, index) => (
              <TableRow
                key={`${index}-${row.id}`}
                sx={{
                  height: "50px",
                }}
              >
                <TableCell component="th" scope="row">
                  {row.tipo}
                </TableCell>
                <TableCell>{row.fecha}</TableCell>
                <TableCell>{row.usuario}</TableCell>
                <TableCell>{row.problema}</TableCell>
                <TableCell>{row.solución}</TableCell>
                <TableCell>
                  <Status status={row.estado} />
                </TableCell>
                <TableCell>
                  <ActionsMenu supportItem={row} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
