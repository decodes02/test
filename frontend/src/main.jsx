import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import User from './components/User.jsx'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <BrowserRouter>
    <Routes>
          <Route exact path="/" element={<App/>}></Route>
          <Route exact path="/user" element={<User />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
