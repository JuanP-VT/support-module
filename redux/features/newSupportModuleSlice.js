import { createSlice } from "@reduxjs/toolkit";
import { cancelationList } from "../../constants/ModuloSoporte";
//Data Mock

const newItem = {
  type: "",
  date: "",
  user: "",
  problemDescription: "",
  solutionDescription: "",
  supportState: "en progreso",
  shipmentDetails: {
    branchOffice: null,
    shipmentDate: null,
    shipmentDestination: null,
    shipmentOrigin: null,
    shipmentState: null,
    trackNumber: null,
  },
};

const trackingService = [
  {
    trackNumber: "01BR0S0C0LM1",
    user: "Jorge Frausto",
    date: "2024-08-15T17:16:05.375Z",
    branchOffice: "Los Mochis",
    shipmentOrigin: "Querétaro",
    shipmentDestination: "Los Mochis",
    shipmentState: "En transito",
  },
  {
    trackNumber: "11B2CS0C0LM2",
    user: "Jorge Frausto",
    date: "2024-08-17T17:16:05.375Z",
    branchOffice: "Los Mochis",
    shipmentOrigin: "Veracruz",
    shipmentDestination: "Los Mochis",
    shipmentState: "En transito",
  },
  {
    trackNumber: "01BR0S0C0LM3",
    user: "Mario Perez",
    date: "2024-08-13T17:16:05.375Z",
    branchOffice: "Los Mochis",
    shipmentOrigin: "Tijuana",
    shipmentDestination: "Los Mochis",
    shipmentState: "En transito",
  },
  {
    trackNumber: "C1BR0S0C0LM4",
    user: "Mario Perez",
    date: "2024-08-12T17:16:05.375Z",
    branchOffice: "Los Mochis",
    shipmentOrigin: "Saltillo",
    shipmentDestination: "Los Mochis",
    shipmentState: "En transito",
  },
];

const initialState = {
  isOpenEditDialog: false,
  isOpenDeleteDialog: false,
  isOpenCreateNewDialog: false,
  newItem,
  selectedItem: {},
  filterWord: "",
  filterState: "",
  filterType: "",
  filterDate: "",
  cancelation: cancelationList.GUÍA,
  searchGuideNumberOrUser: "",
  cancelationReason: "",
  trackingService,
  selectedTracking: {},
};

const newSupportModule = createSlice({
  name: "newSupportModule",
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setNewItem: (state, action) => {
      state.newItem = action.payload;
    },
    setIsOpenCreateNewDialog: (state, action) => {
      state.isOpenCreateNewDialog = action.payload;
    },
    openEditDialog: (state) => {
      state.isOpenEditDialog = true;
    },
    closeEditDialog: (state) => {
      state.isOpenEditDialog = false;
    },
    setIsOpenDeleteDialog: (state, action) => {
      state.isOpenDeleteDialog = action.payload;
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
    setSelectedTracking: (state, action) => {
      state.selectedTracking = action.payload;
    },
  },
});
export const {
  setNewItem,
  setSelectedItem,
  setIsOpenCreateNewDialog,
  openEditDialog,
  closeEditDialog,
  setIsOpenDeleteDialog,
  setFilterWord,
  setFilterState,
  setFilterType,
  setFilterDate,
  setCancelation,
  setGuideNumberOrUser,
  setCancelationReason,
  setSelectedTracking,
} = newSupportModule.actions;
export const selectDialog = (state) => state.dialog.isOpenDialog;

export default newSupportModule.reducer;
