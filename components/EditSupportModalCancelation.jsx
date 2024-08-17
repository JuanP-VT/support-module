import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useSelector, useDispatch } from "react-redux";
import {
  setCancelation,
  setCancelationReason,
  setGuideNumberOrUser,
  setSelectedTracking,
} from "../redux/features/newSupportModuleSlice";
import { cancelationList } from "../constants/ModuloSoporte";
import {
  Autocomplete,
  Box,
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
import { format } from "date-fns";
export default function EditSupportModalCancelation() {
  const dispatch = useDispatch();
  const cancelation = useSelector(
    (state) => state.newSupportModule.cancelation
  );
  const selectedItem = useSelector(
    (state) => state.newSupportModule.selectedItem
  );

  const trackingServiceResponse = useSelector(
    (state) => state.newSupportModule.trackingService
  );
  let trackingGuides = [...trackingServiceResponse];

  // Evita agregar una guía vacía al cambiar el tipo de reporte (p. ej. de queja a cancelación), ya que solo las cancelaciones tienen guías.
  if (selectedItem.shipmentDetails.trackNumber) {
    trackingGuides = [selectedItem.shipmentDetails, ...trackingGuides];
  }

  const selectedTracking = useSelector(
    (state) => state.newSupportModule.selectedTracking
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
        <TableContainer sx={{ maxHeight: "200px" }}>
          <Table size="small">
            <TableHead
              sx={{
                backgroundColor: "ThreeDFace",
                fontWeight: "fontWeightBold",
              }}
            >
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>No.Guía</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Fecha</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Sucursal</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Origen-Destino
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trackingGuides.map((item, index) => (
                <TableRow
                  sx={{
                    ...(selectedTracking.trackNumber === item.trackNumber
                      ? { backgroundColor: "lightgray" }
                      : {}),
                    cursor: "pointer",
                  }}
                  onClick={() => dispatch(setSelectedTracking(item))}
                  key={index}
                >
                  <TableCell sx={{ maxWidth: "100px", wordWrap: "break-word" }}>
                    {item.trackNumber}
                  </TableCell>
                  <TableCell>
                    {format(new Date(item.shipmentDate), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell sx={{ wordWrap: "break-word", fontSize: "12px" }}>
                    {item.branchOffice}
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", fontSize: "12px" }}>
                    {item.shipmentOrigin}
                    <ArrowRightAlt />
                    {item.shipmentDestination}
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
                      {item.shipmentState}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
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
            renderInput={(params) => (
              <TextField {...params} label="Motivo de Cancelación" />
            )}
          />
        </Box>
      </Box>
    </div>
  );
}

const options = ["Cliente Solicitó Cancelar"];
