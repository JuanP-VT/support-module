import PropTypes from "prop-types";
import { statusList } from "../constants/ModuloSoporte";
import { Chip } from "@mui/material";
export default function Status({ status }) {
  let bgColor = "";
  let textColor = "white";
  if (status.toLowerCase() === statusList.COMPLETADO.toLocaleLowerCase()) {
    bgColor = "#22c55e";
  }
  if (status.toLowerCase() === statusList.ENPROGRESO.toLowerCase()) {
    bgColor = "#3b82f6";
  }
  if (status.toLocaleLowerCase() === statusList.CANCELADO.toLowerCase()) {
    bgColor = "#f31260";
  }
  if (status.toLocaleLowerCase() === statusList.PENDIENTE.toLowerCase()) {
    bgColor = "#f59e0b";
    textColor = "black";
  }
  return (
    <Chip
      label={status}
      sx={{
        fontSize: "13px",
        width: "100px",
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
