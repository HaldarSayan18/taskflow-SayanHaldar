import { Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import './index.css';

// pages
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Notfound from './pages/Notfound.tsx';
import Projects from './pages/Projects.tsx';
import { Footer } from './components/Footer.tsx';
import { ProjectDetails } from './pages/ProjectDetails.tsx';
import { UpdateTaskModalWrapper } from './components/UpdateTaskWrapper.tsx';
import { ProtectedRoutes } from './routes/ProtectedRoutes.tsx';
import Navbar from './components/Navbar.tsx';

function App() {
  const [isLightmode, setIsLightMode] = useState<boolean>(false);
  return (
    <>
      <Navbar isLightmode={isLightmode} setIsLightMode={setIsLightMode} />
      <Routes>
        {/* public routes */}
        <Route path='/login' element={<Login isLightmode={isLightmode} />} />
        <Route path='/register' element={<Register isLightmode={isLightmode} />} />
        {/* protected routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path='/projects' element={<Projects isLightmode={isLightmode} />} />
          <Route path='/projects/:id' element={<ProjectDetails isLightmode={isLightmode} />}>
            <Route path='task/:taskId' element={<UpdateTaskModalWrapper />} />
          </Route>
        </Route>
        <Route path='*' element={<Notfound isLightmode={isLightmode} />} />
      </Routes>
      <Footer isLightmode={isLightmode} />
    </>
  )
}

export default App
