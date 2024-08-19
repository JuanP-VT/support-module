import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenDeleteDialog } from "../redux/features/newSupportModuleSlice";
import { Close } from "@mui/icons-material";

export default function DeleteModal() {
  const dispatch = useDispatch();
  const selectedItem = useSelector(
    (state) => state.newSupportModule.selectedItem
  );
  const isOpen = useSelector(
    (state) => state.newSupportModule.isOpenDeleteDialog
  );

  const handleDelete = async () => {
    //Cambiar a rtk query
    const response = await fetch(
      `https://nestjs-technical-test-production.up.railway.app/api/support-reports/${selectedItem.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({ id: selectedItem.id }),
      }
    );
    console.log(response);
    const res = await response.json();
    console.log(res);
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
