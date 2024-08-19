import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenCreateNewDialog } from "../redux/features/newSupportModuleSlice";
import { Close } from "@mui/icons-material";
import SupportModalNormal from "./NewSupportModalNormal";
import { useState } from "react";
import NewSupportModalCancelation from "./NewSupportModalCancelation";
export default function NewSupportDialog() {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state) => state.newSupportModule.isOpenCreateNewDialog
  );
  const newItem = useSelector((state) => state.newSupportModule.newItem);
  const [isNormalMode, setIsNormalMode] = useState(true);

  const selectedTrackingGuide = useSelector(
    (state) => state.newSupportModule.selectedTracking
  );
  const handleSubmit = () => {
    const itemToSubmit = { ...newItem, shipmentDetails: selectedTrackingGuide };
    console.log(itemToSubmit);
  };
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => dispatch(setIsOpenCreateNewDialog(false))}
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
          <Typography variant="h5" sx={{ mb: 2 }}>
            Nuevo Registro de Soporte
          </Typography>
          <Close
            sx={{ cursor: "pointer", position: "absolute", top: 20, right: 20 }}
            onClick={() => dispatch(setIsOpenCreateNewDialog(false))}
          />
          <Box sx={{ display: "flex", mb: 2 }}>
            <Button
              onClick={() => setIsNormalMode(true)}
              sx={isNormalMode ? { borderBottom: "2px solid blue" } : {}}
            >
              Normal
            </Button>
            {newItem.type === "cancelación" && (
              <Button
                onClick={() => setIsNormalMode(false)}
                sx={!isNormalMode ? { borderBottom: "2px solid blue" } : {}}
              >
                Cancelación
              </Button>
            )}
          </Box>
          {isNormalMode && <SupportModalNormal />}
          {!isNormalMode && <NewSupportModalCancelation />}
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
              onClick={() => dispatch(setIsOpenCreateNewDialog(false))}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
