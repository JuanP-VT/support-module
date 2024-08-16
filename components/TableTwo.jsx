import { useLazyGetSupportReportsQuery } from "../redux/api/supportModuleApi";
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
  openCreateNewDialog,
  setFilterDate,
  setFilterState,
  setFilterType,
  setFilterWord,
} from "../redux/features/newSupportModuleSlice";
import { statusList, typeList } from "../constants/ModuloSoporte";
import { DatePicker } from "@mui/x-date-pickers";
import { format, isAfter, isSameDay } from "date-fns";
import { useEffect } from "react";

export default function TableTwo() {
  const dispatch = useDispatch();

  const [getSupportReports, { data: supportItemList }] =
    useLazyGetSupportReportsQuery();
  useEffect(() => {
    const getReports = async () => {
      await getSupportReports();
    };
    getReports();
  }, [getSupportReports]);

  const filterWord = useSelector((state) => state.newSupportModule.filterWord);
  const filterState = useSelector(
    (state) => state.newSupportModule.filterState
  );
  const filterType = useSelector((state) => state.newSupportModule.filterType);
  const selectedDate = useSelector(
    (state) => state.newSupportModule.filterDate
  );
  /**
   * We filter data in steps
   * 1- Filter by "Buscar" param
   * 2- Filter by "Estado"
   * 3- Filter by "Tipo"
   * 4- Filter by "Fecha"
   */
  console.log(supportItemList);
  const filterBySearchFilter = supportItemList?.filter((supportItem) => {
    return (
      supportItem.problemDescription
        .toLowerCase()
        .includes(filterWord.toLowerCase()) ||
      supportItem.solutionDescription
        .toLowerCase()
        .includes(filterWord.toLowerCase()) ||
      supportItem.user.toLowerCase().includes(filterWord.toLowerCase())
    );
  });
  const filterByStatus = filterBySearchFilter?.filter((supportItem) =>
    supportItem.supportState.toLowerCase().includes(filterState.toLowerCase())
  );
  const filterByType = filterByStatus?.filter((supportItem) =>
    supportItem.type.toLowerCase().includes(filterType.toLowerCase())
  );

  const filteredByDate = filterByType?.filter((supportItem) => {
    if (!selectedDate) return supportItem;
    return (
      isAfter(new Date(supportItem.date), new Date(selectedDate)) ||
      isSameDay(new Date(supportItem.date), new Date(selectedDate))
    );
  });

  return (
    <div>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            onChange={(e) => dispatch(setFilterWord(e.target.value))}
            sx={{ width: "100%", maxWidth: "150px", mr: 1, my: 1 }}
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
              sx={{ width: "100%", minWidth: "150px", mr: 1, my: 1 }}
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
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <FormControl sx={{ width: "100%", maxWidth: "150px", mr: 1, my: 1 }}>
            <InputLabel sx={{ my: -1 }}>Tipo</InputLabel>
            <Select
              sx={{
                width: "100%",
                maxWidth: { xs: "150px", md: "200px" },
                mx: 1,
              }}
              defaultValue=""
              onChange={(e) => dispatch(setFilterType(e.target.value))}
              size="small"
              label="Estatus"
            >
              <MenuItem value="">-</MenuItem>
              <MenuItem value={typeList.CANCELACIÓN}>
                {typeList.CANCELACIÓN}
              </MenuItem>
              <MenuItem value={typeList.QUEJA}>{typeList.QUEJA}</MenuItem>
              <MenuItem value={typeList.RECLAMO}>{typeList.RECLAMO}</MenuItem>
            </Select>
          </FormControl>
          <DatePicker
            sx={{ width: "100%", maxWidth: "150px", mx: 1, my: 1 }}
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
        </Box>
        <Button
          color="success"
          variant="contained"
          onClick={() => {
            dispatch(openCreateNewDialog());
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
            {filteredByDate?.map((supportItem, index) => (
              <TableRow
                key={`${index}-${supportItem.id}`}
                sx={{
                  height: "50px",
                }}
              >
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {supportItem.type}
                </TableCell>
                <TableCell>
                  {format(new Date(supportItem.date), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>{supportItem.user}</TableCell>
                <TableCell>{supportItem.problemDescription}</TableCell>
                <TableCell>{supportItem.solutionDescription}</TableCell>
                <TableCell>
                  <Status status={supportItem.supportState} />
                </TableCell>
                <TableCell>
                  <ActionsMenu supportItem={supportItem} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
