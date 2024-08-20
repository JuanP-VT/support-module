import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { formatISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSelectedTracking,
  setNewItem,
} from "../redux/features/newSupportModuleSlice";
import { statusList } from "../constants/ModuloSoporte";
import Status from "./Status";
import { Textarea } from "@mui/joy";
import { supportTypeList } from "../constants/ModuloSoporte";
export default function NewSupportModalNormal() {
  const dispatch = useDispatch();
  const newItem = useSelector((state) => state.newSupportModule.newItem);

  const usuarios = ["Jorge Frausto", "Mario Perez"];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Autocomplete
          value={newItem.type}
          options={supportTypeList}
          getOptionLabel={
            (option) =>
              option.charAt(0).toUpperCase() + option.slice(1).toLowerCase() // Capitalize the first letter
          }
          freeSolo
          onChange={(_, val) => {
            dispatch(setNewItem({ ...newItem, type: val }));
            dispatch(resetSelectedTracking());
          }}
          size="small"
          sx={{
            mb: 1,
            mr: 1,
            width: "100%",
            maxWidth: 200,
          }}
          renderInput={(params) => <TextField {...params} label="Tipo" />}
        />
        <DatePicker
          value={newItem.date ? new Date(newItem.date) : null}
          onAccept={(e) => {
            const formattedDate = formatISO(e);
            dispatch(setNewItem({ ...newItem, date: formattedDate }));
          }}
          slotProps={{ textField: { size: "small" } }}
          sx={{ mb: 1, mr: 1, width: "100%", maxWidth: 200 }}
          label="Desde"
          format="yyyy/MM/dd"
        />
        <Autocomplete
          freeSolo
          value={newItem.user}
          options={usuarios}
          onChange={(_, val) => dispatch(setNewItem({ ...newItem, user: val }))}
          size="small"
          sx={{ mb: 2, mr: 1, width: "100%", maxWidth: 200 }}
          renderInput={(params) => <TextField {...params} label="Usuario" />}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          mb: 2,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Textarea
          value={newItem.problemDescription}
          onChange={(e) =>
            dispatch(
              setNewItem({
                ...newItem,
                problemDescription: e.target.value,
              })
            )
          }
          placeholder="Descripción del problema"
          minRows={3}
          sx={{ width: "100%", mr: 2 }}
        />
        <Textarea
          value={newItem.solutionDescription}
          placeholder="Solución"
          label="Solución"
          minRows={3}
          sx={{ width: "100%", my: 1 }}
          onChange={(e) =>
            dispatch(
              setNewItem({
                ...newItem,
                solutionDescription: e.target.value,
              })
            )
          }
        />
      </Box>
      <FormControl fullWidth>
        <InputLabel>Estatus</InputLabel>
        <Select
          value={newItem.supportState}
          sx={{ width: "150px" }}
          size="small"
          label="Estatus"
          onChange={(e) =>
            dispatch(setNewItem({ ...newItem, supportState: e.target.value }))
          }
        >
          <MenuItem value={statusList.COMPLETADO}>
            <Status status={statusList.COMPLETADO} />
          </MenuItem>
          <MenuItem value={statusList.PENDIENTE}>
            <Status status={statusList.PENDIENTE} />
          </MenuItem>
          <MenuItem value={statusList.ENPROGRESO}>
            <Status status={statusList.ENPROGRESO} />
          </MenuItem>
          <MenuItem value={statusList.CANCELADO}>
            <Status status={statusList.CANCELADO} />
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
