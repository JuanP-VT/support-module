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
    shipmentDate: "2024-08-15T17:16:05.375Z",
    branchOffice: "Los Mochis",
    shipmentOrigin: "Querétaro",
    shipmentDestination: "Los Mochis",
    shipmentState: "En transito",
  },
  {
    trackNumber: "11B2CS0C0LM2",
    shipmentDate: "2024-08-17T17:16:05.375Z",
    branchOffice: "Los Mochis",
    shipmentOrigin: "Veracruz",
    shipmentDestination: "Los Mochis",
    shipmentState: "En transito",
  },
  {
    trackNumber: "01BR0S0C0LM3",
    shipmentDate: "2024-08-13T17:16:05.375Z",
    branchOffice: "Los Mochis",
    shipmentOrigin: "Tijuana",
    shipmentDestination: "Los Mochis",
    shipmentState: "En transito",
  },
  {
    trackNumber: "C1BR0S0C0LM4",
    shipmentDate: "2024-08-12T17:16:05.375Z",
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
  isNormalMode: true,
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
  selectedTracking: {
    branchOffice: null,
    shipmentDate: null,
    shipmentDestination: null,
    shipmentOrigin: null,
    shipmentState: null,
    trackNumber: null,
  },
  displayBackdrop: false,
};

const newSupportModule = createSlice({
  name: "newSupportModule",
  initialState,
  reducers: {
    setIsNormalMode: (state, action) => {
      state.isNormalMode = action.payload;
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setNewItem: (state, action) => {
      state.newItem = action.payload;
    },
    setIsOpenCreateNewDialog: (state, action) => {
      state.isOpenCreateNewDialog = action.payload;
    },
    setIsOpenEditDialog: (state, action) => {
      state.isOpenEditDialog = action.payload;
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
    setDisplayBackdrop: (state, action) => {
      state.displayBackdrop = action.payload;
    },
    resetNewItem: (state) => {
      state.newItem = initialState.newItem;
    },
    resetSelectedTracking: (state) => {
      state.selectedTracking = initialState.selectedTracking;
    },
  },
});
export const {
  setNewItem,
  setSelectedItem,
  setIsOpenCreateNewDialog,
  setIsNormalMode,
  setIsOpenEditDialog,
  setIsOpenDeleteDialog,
  setFilterWord,
  setFilterState,
  setFilterType,
  setFilterDate,
  setCancelation,
  setGuideNumberOrUser,
  setCancelationReason,
  setSelectedTracking,
  setDisplayBackdrop,
  resetNewItem,
  resetSelectedTracking,
} = newSupportModule.actions;
export const selectDialog = (state) => state.dialog.isOpenDialog;

export default newSupportModule.reducer;
