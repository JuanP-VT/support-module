import { createSlice } from "@reduxjs/toolkit";
import {
  statusList,
  typeList,
  cancelationList,
} from "../../constants/ModuloSoporte";
//Data Mock
const data = [
  {
    tipo: typeList.CANCELACIÓN,
    fecha: "2024/08/02",
    usuario: "Jorge Frausto",
    problema: "No se puede cancelar",
    solución: "Se cancela la compra",
    estado: statusList.COMPLETADO,
  },
  {
    tipo: typeList.CANCELACIÓN,
    fecha: "2024/08/03",
    usuario: "Jorge Frausto",
    problema: "No se puede procesar",
    solución: "Se cancela la compra",
    estado: statusList.PENDIENTE,
  },
  {
    tipo: typeList.CANCELACIÓN,
    fecha: "2024/08/04",
    usuario: "Mario Perez",
    problema: "Error en id",
    solución: "Editar el id ",
    estado: statusList.ENPROGRESO,
  },
  {
    tipo: typeList.CANCELACIÓN,
    fecha: "2024/08/04",
    usuario: "Mario Perez",
    problema: "Error en id",
    solución: "Editar el id ",
    estado: statusList.CANCELADO,
  },
  {
    tipo: typeList.REGISTRO,
    fecha: "2024/08/05",
    usuario: "Jorge Frausto",
    problema: "Internal Server Error",
    solución: "Se cacha el error",
    estado: statusList.ENPROGRESO,
  },
  {
    tipo: typeList.REGISTRO,
    fecha: "2024/08/06",
    usuario: "Mario Perez",
    problema: "Registro de usuario fallido",
    solución: "Se registra manual",
    estado: statusList.COMPLETADO,
  },
  {
    tipo: typeList.REGISTRO,
    fecha: "2024/12/15",
    usuario: "Jorge Frausto",
    problema: "Producto dañado",
    solución: "Se procesa reembolso",
    estado: statusList.COMPLETADO,
  },
  {
    tipo: typeList.REGISTRO,
    fecha: "2024/12/16",
    usuario: "Jorge Frausto",
    problema: "Talla incorrecta",
    solución: "Se envía nueva talla",
    estado: statusList.PENDIENTE,
  },
  {
    tipo: typeList.REGISTRO,
    fecha: "2024/12/17",
    usuario: "Jorge Frausto",
    problema: "Error de validación",
    solución: "Se corrige formulario",
    estado: statusList.ENPROGRESO,
  },
  {
    tipo: typeList.SOPORTE,
    fecha: "2024/12/18",
    usuario: "Mario Perez",
    problema: "Transacción rechazada",
    solución: "Se contacta al banco",
    estado: statusList.CANCELADO,
  },
  {
    tipo: typeList.SOPORTE,
    fecha: "2024/12/19",
    usuario: "Mario Perez",
    problema: "Dirección incorrecta",
    solución: "Se actualiza dirección",
    estado: statusList.ENPROGRESO,
  },
  {
    tipo: typeList.SOPORTE,
    fecha: "2024/12/20",
    usuario: "Mario Perez",
    problema: "Información de producto",
    solución: "Se proporciona detalles",
    estado: statusList.COMPLETADO,
  },
];
const initialState = {
  value: data,
  isOpenEditDialog: false,
  isOpenDeleteDialog: false,
  selectedItem: {},
  filterWord: "",
  filterState: "",
  filterType: "",
  filterDate: "",
  cancelation: cancelationList.GUÍA,
  searchGuideNumberOrUser: "",
  cancelationReason: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    openEditDialog: (state) => {
      state.isOpenEditDialog = true;
    },
    closeEditDialog: (state) => {
      state.isOpenEditDialog = false;
    },
    openDeleteDialog: (state) => {
      state.isOpenDeleteDialog = true;
    },
    closeDeleteDialog: (state) => {
      state.isOpenDeleteDialog = false;
    },
    setFilterWord: (state, action) => {
      state.filterWord = action.payload;
    },
    setFilterState: (state, action) => {
      state.filterState = action.payload;
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
    setFilterDate: (state, action) => {
      state.filterDate = action.payload;
    },
    setCancelation: (state, action) => {
      state.cancelation = action.payload;
    },
    setGuideNumberOrUser: (state, action) => {
      state.searchGuideNumberOrUser = action.payload;
    },
    setCancelationReason: (state, action) => {
      state.cancelationReason = action.payload;
    },
  },
});
export const {
  setSelectedItem,
  openEditDialog,
  closeEditDialog,
  openDeleteDialog,
  closeDeleteDialog,
  setFilterWord,
  setFilterState,
  setFilterType,
  setFilterDate,
  setCancelation,
  setGuideNumberOrUser,
  setCancelationReason,
} = dataSlice.actions;
export const selectDialog = (state) => state.dialog.isOpenDialog;

export default dataSlice.reducer;
