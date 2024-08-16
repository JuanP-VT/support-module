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
            ¿Estás seguro que deaseas cancelar este soporte?
          </Typography>
          <Close
            sx={{ cursor: "pointer", position: "absolute", top: 10, right: 10 }}
            onClick={() => dispatch(setIsOpenDeleteDialog(false))}
          />

          <Box sx={{ pt: 2 }}>
            <Button
              onClick={() => console.log(selectedItem)}
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
              onClick={() => dispatch(setIsOpenDeleteDialog(false))}
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
