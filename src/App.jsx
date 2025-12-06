import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import { Login } from './components/Login'
import { Body } from './components/Body'
import { Provider } from 'react-redux'
import { store } from "./utils/appStore"
import { Feed } from './components/Feed'
import { Profile } from './components/Profile'
import { Requests } from './components/Requests'
import { Connections } from './components/Connections'
import ErrorBoundary from './components/ErrorBoundary'
function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<Feed />} />
              <Route path="feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/connections" element={<Connections />} />
              {/* Child Routes that will render inside <Outlet /> */}
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </ErrorBoundary>
        </BrowserRouter>
      </Provider>

    </>
  )
}

export default App
