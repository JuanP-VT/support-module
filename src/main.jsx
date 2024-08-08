import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
 import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale'
import { LocalizationProvider } from '@mui/x-date-pickers';
//import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"

import {store} from "../redux/store.js"
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <App />
    </LocalizationProvider>
    </Provider>
  </React.StrictMode>,
)
