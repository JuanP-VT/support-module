import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSelectedTracking,
  setDisplayBackdrop,
  setIsNormalMode,
  setIsOpenEditDialog,
} from "../redux/features/newSupportModuleSlice";
import { Close } from "@mui/icons-material";
import EditSupportModalNormal from "./EditSupportModalNormal";
import EditSupportModalCancelation from "./EditSupportModalCancelation";
import { useUpdateSupportReportMutation } from "../redux/api/supportModuleApi";
import swal from "sweetalert";
export default function EditSupportModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state) => state.newSupportModule.isOpenEditDialog
  );
  const selectedItem = useSelector(
    (state) => state.newSupportModule.selectedItem
  );
  const isNormalMode = useSelector(
    (state) => state.newSupportModule.isNormalMode
  );

  const selectedTrackingGuide = useSelector(
    (state) => state.newSupportModule.selectedTracking
  );
  const displayBackdrop = useSelector(
    (state) => state.newSupportModule.displayBackdrop
  );
  const [updateSupportReport] = useUpdateSupportReportMutation();
  const handleSubmit = async () => {
    //Cambiar a rtk query
    const itemToSubmit = {
      ...selectedItem,
      id: undefined,
      shipmentDetails: selectedTrackingGuide,
    };

    try {
      dispatch(setDisplayBackdrop(true));
      const response = await updateSupportReport({
        id: selectedItem.id,
        body: itemToSubmit,
      });
      if (response.error) {
        swal({
          title: "Error en el cuerpo de la petición",
          text: response.error?.data ?? "Algo salio mal",
          icon: "error",
          button: "OK",
        });
        dispatch(setDisplayBackdrop(false));
        return;
      }
      dispatch(setDisplayBackdrop(false));
      dispatch(setIsOpenEditDialog(false));
      dispatch(setIsNormalMode(true));
      swal({
        title: "Éxito",
        text: "Se ha editado el reporte correctamente",
        icon: "success",
        button: "OK",
      });
    } catch (error) {
      swal({
        title: "Error Interno",
        text: error?.data?.message ?? "Algo salio mal",
        icon: "error",
        button: "OK",
      });
    }
  };
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => {
          dispatch(setIsOpenEditDialog(false));
          dispatch(resetSelectedTracking());
          dispatch(setIsNormalMode(true));
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "800px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={displayBackdrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Editar Registro de Soporte
          </Typography>
          <Close
            sx={{ cursor: "pointer", position: "absolute", top: 20, right: 20 }}
            onClick={() => {
              dispatch(setIsOpenEditDialog(false));
              dispatch(resetSelectedTracking());
              dispatch(setIsNormalMode(true));
            }}
          />
          <Box sx={{ display: "flex", mb: 2 }}>
            <Button
              onClick={() => dispatch(setIsNormalMode(true))}
              sx={isNormalMode ? { borderBottom: "2px solid blue" } : {}}
            >
              Normal
            </Button>
            {selectedItem?.type?.toLowerCase() === "cancelación" && (
              <Button
                onClick={() => dispatch(setIsNormalMode(false))}
                sx={!isNormalMode ? { borderBottom: "2px solid blue" } : {}}
              >
                Cancelación
              </Button>
            )}
          </Box>
          {isNormalMode && <EditSupportModalNormal />}
          {!isNormalMode && <EditSupportModalCancelation />}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button
              onClick={() => handleSubmit()}
              color="success"
              variant="contained"
            >
              Aceptar
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                dispatch(setIsOpenEditDialog(false));
                dispatch(resetSelectedTracking());
                dispatch(setIsNormalMode(true));
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
