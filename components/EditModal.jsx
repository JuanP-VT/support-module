import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers";
import { Textarea } from "@mui/joy";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {  closeEditDialog, setSelectedItem } from "../redux/features/dataSlice";
import { Close } from "@mui/icons-material";
import { format } from "date-fns";

export default function EditModal() {
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.data.selectedItem);
  const isOpen = useSelector((state) => state.data.isOpenEditDialog);
  return (
    <div>
      <Modal open={isOpen} onClose={() => dispatch(closeEditDialog())}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Registro De Soporte
          </Typography>
          <Close
            sx={{ cursor: "pointer", position: "absolute", top: 10, right: 10 }}
            onClick={() => dispatch(closeEditDialog())}
          />
          <Box sx={{ display: "flex" }}>
            <Autocomplete
              value={selectedItem.tipo}
              options={options}
              onChange={(_, val) =>
                dispatch(setSelectedItem({ ...selectedItem, tipo: val }))
              }
              size="small"
              sx={{ width: 200 }}
              onKeyDown={(e) => e.stopPropagation()}
              renderInput={(params) => <TextField {...params} label="Tipo" />}
            />
            <DatePicker
              value={selectedItem.fecha ? new Date(selectedItem.fecha) : null}
              onAccept={(e) =>{
                const formattedDate = format(e, "yyyy-MM-dd");
                dispatch(setSelectedItem({ ...selectedItem, fecha: formattedDate }))
              }
                
              }
              slotProps={{ textField: { size: "small" } }}
              sx={{ mb: 2 }}
              label="Desde"
              format="yyyy-MM-dd"
            />
            <Autocomplete
              value={selectedItem.usuario}
              options={usuarios}
              onChange={(_, val) =>
                dispatch(setSelectedItem({ ...selectedItem, usuario: val }))
              }
              size="small"
              sx={{ width: 200 }}
              onKeyDown={(e) => e.stopPropagation()}
              renderInput={(params) => (
                <TextField {...params} label="Usuario" />
              )}
            />
          </Box>
          <Box sx={{ display: "flex", mb: 2 }}>
            <Textarea
              value={selectedItem.problema}
              onChange={(e) =>
                dispatch(
                  setSelectedItem({ ...selectedItem, problema: e.target.value })
                )
              }
              placeholder="Descripción del problema"
              minRows={3}
              sx={{ width: 300, mr: 2 }}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Textarea
              value={selectedItem.solución}
              placeholder="Solución"
              label="Solución"
              minRows={3}
              sx={{ width: 300 }}
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
              sx={{ width: "250px" }}
              size="small"
              label="Estatus"
              onChange={(e) =>
                dispatch(
                  setSelectedItem({ ...selectedItem, estado: e.target.value })
                )
              }
            >
              <MenuItem value="Completado">Completado</MenuItem>
              <MenuItem value="Pendiente">Pendiente</MenuItem>
              <MenuItem value="En progreso">En Progreso</MenuItem>
              <MenuItem value="Cancelado">Cancelado</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ p: 1 }}>
            <Button
            onClick={()=> alert(JSON.stringify(selectedItem))}
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
      </Modal>
    </div>
  );
}

const options = ["Cancelación", "Soporte"];
const usuarios = ["Jorge Frausto", "Mario Perez"];
