import PropTypes from "prop-types";
import {statusList} from "../constants/ModuloSoporte";
import { Chip } from "@mui/material";
export default function Status({ status }) {
  let bgColor = "";
  let textColor = "white"
  if (status === statusList.COMPLETADO) {
    bgColor = "#22c55e";
  }
  if (status === statusList.ENPROGRESO) {
    bgColor = "#3b82f6";
  }
  if (status === statusList.CANCELADO) {
    bgColor = "#f31260";
  }
  if (status === statusList.PENDIENTE) {
    bgColor = "#f59e0b";
    textColor = "black"
  }
  return (
    <Chip
      label={status}
      sx={{
        fontSize:"13px",
        width:"100px",
        backgroundColor: bgColor,
        textAlign: "center",
        borderRadius: "10px",
        color: textColor,        
      }}
    />
  );
}

Status.propTypes = {
  status: PropTypes.string.isRequired,
};
