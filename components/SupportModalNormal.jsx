import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  closeEditDialog,
  setSelectedItem,
} from "../redux/features/newSupportModuleSlice";
import { statusList } from "../constants/ModuloSoporte";
import Status from "./Status";
import { Textarea } from "@mui/joy";

export default function SupportModalNormal() {
  const dispatch = useDispatch();
  const selectedItem = useSelector(
    (state) => state.newSupportModule.selectedItem
  );

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
          value={selectedItem.tipo}
          options={options}
          freeSolo
          onChange={(_, val) =>
            dispatch(setSelectedItem({ ...selectedItem, tipo: val }))
          }
          size="small"
          sx={{ mb: 1, mr: 1, width: "100%", maxWidth: 200 }}
          renderInput={(params) => <TextField {...params} label="Tipo" />}
        />
        <DatePicker
          value={selectedItem.fecha ? new Date(selectedItem.fecha) : null}
          onAccept={(e) => {
            const formattedDate = format(e, "yyyy/MM/dd");
            dispatch(
              setSelectedItem({ ...selectedItem, fecha: formattedDate })
            );
          }}
          slotProps={{ textField: { size: "small" } }}
          sx={{ mb: 1, mr: 1, width: "100%", maxWidth: 200 }}
          label="Desde"
          format="yyyy/MM/dd"
        />
        <Autocomplete
          freeSolo
          value={selectedItem.usuario}
          options={usuarios}
          onChange={(_, val) =>
            dispatch(setSelectedItem({ ...selectedItem, usuario: val }))
          }
          size="small"
          sx={{ mb: 2, mr: 1, width: "100%", maxWidth: 200 }}
          onKeyDown={(e) => e.stopPropagation()}
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
          value={selectedItem.problema}
          onChange={(e) =>
            dispatch(
              setSelectedItem({ ...selectedItem, problema: e.target.value })
            )
          }
          placeholder="Descripción del problema"
          minRows={3}
          sx={{ width: "100%", mr: 2 }}
          onKeyDown={(e) => e.stopPropagation()}
        />
        <Textarea
          value={selectedItem.solución}
          placeholder="Solución"
          label="Solución"
          minRows={3}
          sx={{ width: "100%", my: 1 }}
          onChange={(e) =>
            dispatch(
              setSelectedItem({ ...selectedItem, solución: e.target.value })
            )
          }
          onKeyDown={(e) => e.stopPropagation()}
        />
      </Box>
      <FormControl fullWidth>
        <InputLabel>Estatus</InputLabel>
        <Select
          value={selectedItem.estado}
          sx={{ width: "150px" }}
          size="small"
          label="Estatus"
          onChange={(e) =>
            dispatch(
              setSelectedItem({ ...selectedItem, estado: e.target.value })
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
      <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => alert(JSON.stringify(selectedItem))}
          sx={{
            backgroundColor: "green",
            color: "white",
            mr: 1,
            "&:hover": {
              backgroundColor: "lightgreen",
              color: "white",
            },
          }}
        >
          Aceptar
        </Button>
        <Button
          onClick={() => dispatch(closeEditDialog())}
          sx={{
            backgroundColor: "red",
            color: "white",
            "&:hover": {
              backgroundColor: "orange",
              color: "white",
            },
          }}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );
}
const options = ["Cancelación", "Soporte"];
const usuarios = ["Jorge Frausto", "Mario Perez"];
