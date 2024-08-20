import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenDeleteDialog } from "../redux/features/supportReportsSlice";
import { Close } from "@mui/icons-material";
import { useDeleteSupportReportMutation } from "../redux/api/supportReportsApi";
import swal from "sweetalert";
export default function DeleteModal() {
  const dispatch = useDispatch();
  const selectedItem = useSelector(
    (state) => state.supportReports.selectedItem
  );
  const isOpen = useSelector(
    (state) => state.supportReports.isOpenDeleteDialog
  );
  const [deleteSupportReport, { isLoading }] = useDeleteSupportReportMutation();
  const handleDelete = async () => {
    const response = await deleteSupportReport(selectedItem.id);
    if (response.error) {
      swal({
        title: "Error en el cuerpo de la petición",
        text: response.error?.data ?? "Algo salio mal",
        icon: "error",
        button: "OK",
      });
      return;
    }
    swal({
      title: "Éxito",
      text: "Se ha eliminado el reporte correctamente",
      icon: "success",
      button: "OK",
    });
    dispatch(setIsOpenDeleteDialog(false));
  };
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => dispatch(setIsOpenDeleteDialog(false))}
      >
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
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Cancelar Soporte
          </Typography>
          <Typography variant="h6">
            ¿Estás seguro que deseas cancelar este soporte?
          </Typography>
          <Close
            sx={{ cursor: "pointer", position: "absolute", top: 10, right: 10 }}
            onClick={() => dispatch(setIsOpenDeleteDialog(false))}
          />

          <Box sx={{ pt: 2, display: "flex", gap: 1 }}>
            <Button
              color="success"
              variant="contained"
              onClick={() => handleDelete()}
            >
              Aceptar
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => dispatch(setIsOpenDeleteDialog(false))}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
