import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useSelector, useDispatch } from "react-redux";
import {
  closeEditDialog,
  setCancelation,
  setCancelationReason,
  setGuideNumberOrUser,
} from "../redux/features/newSupportModuleSlice";
import { cancelationList } from "../constants/ModuloSoporte";
import {
  Autocomplete,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowRightAlt, Search } from "@mui/icons-material";
export default function SupportModalDelete() {
  const dispatch = useDispatch();
  const cancelation = useSelector(
    (state) => state.newSupportModule.cancelation
  );
  const handleChange = (event, newAlignment) => {
    dispatch(setCancelation(newAlignment));
  };

  return (
    <div>
      <Box>
        <ToggleButtonGroup
          color="primary"
          value={cancelation}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value={cancelationList.GUÍA}>
            {cancelationList.GUÍA}
          </ToggleButton>
          <ToggleButton value={cancelationList.RECEPCIÓN}>
            {cancelationList.RECEPCIÓN}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box>
        <TextField
          onChange={(e) => dispatch(setGuideNumberOrUser(e.target.value))}
          sx={{ width: "200px", my: 2 }}
          label="Buscar"
          placeholder="Número de Guía o Usuario"
          size="small"
          InputProps={{
            startAdornment: <Search />,
          }}
        />
      </Box>
      <Box>
        <TableContainer>
          <Table size="small">
            <TableHead
              sx={{
                backgroundColor: "ThreeDFace",
                fontWeight: "fontWeightBold",
              }}
            >
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>No.Guía</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Usuario</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Fecha</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Sucursal</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Origen-Destino
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ maxWidth: "100px", wordWrap: "break-word" }}>
                  01B01920192SL190
                </TableCell>
                <TableCell>Jorge Frausto</TableCell>
                <TableCell>2024/08/08</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  LMM - Los Mochis
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  Los Mochis <ArrowRightAlt /> Culiacan
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      backgroundColor: "Orange",
                      textAlign: "center",
                      borderRadius: "5px",
                      whiteSpace: "nowrap",
                      p: 1,
                      fontSize: "12px",
                    }}
                  >
                    En Sitio
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box>
          <Autocomplete
            freeSolo
            options={options}
            onChange={(_, val) => dispatch(setCancelationReason(val))}
            size="small"
            sx={{ width: 200, my: 2 }}
            onKeyDown={(e) => e.stopPropagation()}
            renderInput={(params) => (
              <TextField {...params} label="Motivo de Cancelación" />
            )}
          />
        </Box>
      </Box>
      <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
        <Button
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
    </div>
  );
}

const options = ["Cliente Solicitó Cancelar"];
