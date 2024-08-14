import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeEditDialog } from "../redux/features/newSupportModuleSlice";
import { Close } from "@mui/icons-material";
import SupportModalNormal from "./SupportModalNormal";
import { useState } from "react";
import SupportModalDelete from "./SupportModalDelete";
export default function SupportModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state) => state.newSupportModule.isOpenEditDialog
  );
  //State to change between normal and cancelation
  const [isNormalMode, setIsNormalMode] = useState(false);
  const selectedItem = useSelector(
    (state) => state.newSupportModule.selectedItem
  );

  return (
    <div>
      <Modal open={isOpen} onClose={() => dispatch(closeEditDialog())}>
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
            {selectedItem.tipo && "Editar Registro de Soporte"}
            {!selectedItem.tipo && "Nuevo Registro de Soporte"}
          </Typography>
          <Close
            sx={{ cursor: "pointer", position: "absolute", top: 10, right: 10 }}
            onClick={() => dispatch(closeEditDialog())}
          />
          <Box sx={{ display: "flex", mb: 2 }}>
            <Button
              onClick={() => setIsNormalMode(true)}
              sx={isNormalMode ? { borderBottom: "2px solid blue" } : {}}
            >
              Normal
            </Button>
            <Button
              onClick={() => setIsNormalMode(false)}
              sx={!isNormalMode ? { borderBottom: "2px solid blue" } : {}}
            >
              Cancelación
            </Button>
          </Box>
          {isNormalMode && <SupportModalNormal />}
          {!isNormalMode && <SupportModalDelete />}
        </Box>
      </Modal>
    </div>
  );
}
