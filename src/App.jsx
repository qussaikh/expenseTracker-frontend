import { useState } from 'react'
import './App.css'
import ListInvoiceComponent from './components/ListInvoiceComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import InvoiceComponent from './components/InvoiceComponent'
import IncomeProcessingComponent from './components/IncomeProcessingComponent'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import { isUserLoggedIn } from './services/AuthService'
import HomeComponent from './components/HomeComponent'

function App() {

  function AuthenticatedRoute({ children }) {

    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }

    return <Navigate to="/" />

  }

  return (
    <>
    
      <BrowserRouter>
        <HeaderComponent />
          <Routes >
            {/* http://localhost:8080/home */}
            <Route path='/home' element={<HomeComponent />}></Route>
            {/* http://localhost:8080/invoices */}
            <Route path='/invoices' element={
              <AuthenticatedRoute>
                <ListInvoiceComponent />
              </AuthenticatedRoute>
            }></Route>
            {/* http://localhost:8080/add-invoice */}
            <Route path='/add-invoice' element={
              <AuthenticatedRoute>
                <InvoiceComponent />
              </AuthenticatedRoute>
            }></Route>
            {/* http://localhost:8080/incomes */}
            <Route path='/add-income' element={
              <AuthenticatedRoute>
                <IncomeProcessingComponent />
              </AuthenticatedRoute>
            }></Route>
            {/* http://localhost:8080/update-invoice/1 */}
            <Route path='/update-invoice/:id' element={
              <AuthenticatedRoute>
                <InvoiceComponent />
              </AuthenticatedRoute>
            }></Route>
            {/* http://localhost:8080/register */}
            <Route path='/register' element={<RegisterComponent />}></Route>

            {/* http://localhost:8080/login */}
            <Route path='/login' element={<LoginComponent />}></Route>
          </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
