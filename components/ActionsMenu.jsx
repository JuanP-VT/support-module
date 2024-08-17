import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Edit, Delete } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  setIsOpenDeleteDialog,
  setIsOpenEditDialog,
  setSelectedItem,
  setSelectedTracking,
} from "../redux/features/newSupportModuleSlice";

export default function ActionsMenu({ supportItem }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //Edit Modal
  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            dispatch(setSelectedItem(supportItem));
            dispatch(setIsOpenEditDialog(true));
            dispatch(setSelectedTracking(supportItem.shipmentDetails));
            handleClose();
          }}
        >
          <Edit />
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(setSelectedItem(supportItem));
            dispatch(setIsOpenDeleteDialog(true));
            handleClose();
          }}
        >
          <Delete />
          Cancelar
        </MenuItem>
      </Menu>
    </div>
  );
}

ActionsMenu.propTypes = {
  supportItem: PropTypes.object.isRequired,
  tipo: PropTypes.string,
  fecha: PropTypes.string,
  usuario: PropTypes.string,
  problema: PropTypes.string,
  solución: PropTypes.string,
  estado: PropTypes.string,
};
