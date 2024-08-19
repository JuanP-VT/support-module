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
  setSelectedItem,
  setSelectedTracking,
} from "../redux/features/newSupportModuleSlice";
import { statusList } from "../constants/ModuloSoporte";
import Status from "./Status";
import { Textarea } from "@mui/joy";
import { supportTypeList } from "../constants/ModuloSoporte";
export default function EditSupportModalNormal() {
  const dispatch = useDispatch();
  const selectedItem = useSelector(
    (state) => state.newSupportModule.selectedItem
  );

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
          getOptionLabel={
            (option) =>
              option.charAt(0).toUpperCase() + option.slice(1).toLowerCase() // Capitalize the first letter
          }
          value={selectedItem.type}
          options={supportTypeList}
          freeSolo
          onChange={(_, val) => {
            dispatch(setSelectedItem({ ...selectedItem, type: val }));
            dispatch(
              setSelectedTracking({
                shipmentDate: null,
                shipmentDestination: null,
                shipmentOrigin: null,
                branchOffice: null,
                shipmentState: null,
                trackNumber: null,
              })
            );
          }}
          size="small"
          sx={{ mb: 1, mr: 1, width: "100%", maxWidth: 200 }}
          renderInput={(params) => <TextField {...params} label="Tipo" />}
        />
        <DatePicker
          value={selectedItem.date ? new Date(selectedItem.date) : null}
          onAccept={(e) => {
            const formattedDate = formatISO(e);
            dispatch(setSelectedItem({ ...selectedItem, date: formattedDate }));
          }}
          slotProps={{ textField: { size: "small" } }}
          sx={{ mb: 1, mr: 1, width: "100%", maxWidth: 200 }}
          label="Desde"
          format="yyyy/MM/dd"
        />
        <Autocomplete
          freeSolo
          value={selectedItem.user}
          options={usuarios}
          onChange={(_, val) =>
            dispatch(setSelectedItem({ ...selectedItem, user: val }))
          }
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
          value={selectedItem.problemDescription}
          onChange={(e) =>
            dispatch(
              setSelectedItem({
                ...selectedItem,
                problemDescription: e.target.value,
              })
            )
          }
          placeholder="Descripción del problema"
          minRows={3}
          sx={{ width: "100%", mr: 2 }}
        />
        <Textarea
          value={selectedItem.solutionDescription}
          placeholder="Solución"
          label="Solución"
          minRows={3}
          sx={{ width: "100%", my: 1 }}
          onChange={(e) =>
            dispatch(
              setSelectedItem({
                ...selectedItem,
                solutionDescription: e.target.value,
              })
            )
          }
        />
      </Box>
      <FormControl fullWidth>
        <InputLabel>Estatus</InputLabel>
        <Select
          value={selectedItem.supportState}
          sx={{ width: "150px" }}
          size="small"
          label="Estatus"
          onChange={(e) =>
            dispatch(
              setSelectedItem({ ...selectedItem, supportState: e.target.value })
            )
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
