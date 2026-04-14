import { Route, Routes, useLocation } from 'react-router-dom'
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
import { UpdateProjectModalWrapper } from './components/UpdateProjectModalWrapper.tsx';

function App() {
  const [isLightmode, setIsLightMode] = useState<boolean>(false);

  const location = useLocation();
  const state = location.state as { background?: Location };
  // console.log('location state ===>', state)

  return (
    <>
      <Navbar isLightmode={isLightmode} setIsLightMode={setIsLightMode} />
      <Routes location={state?.background || location}>
        {/* public routes */}
        <Route path='/login' element={<Login isLightmode={isLightmode} />} />
        <Route path='/register' element={<Register isLightmode={isLightmode} />} />

        {/* protected routes */}
        <Route element={<ProtectedRoutes />}>
          {/* full page routes */}
          <Route path='/projects' element={<Projects isLightmode={isLightmode} />} />
          <Route path='/projects/:id' element={<ProjectDetails isLightmode={isLightmode} />}>
            <Route path='task/:taskId' element={<UpdateTaskModalWrapper />} />
          </Route>
        </Route>
        <Route path='*' element={<Notfound isLightmode={isLightmode} />} />
      </Routes>

      {/* modal routes */}
      {state?.background && (
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path='/projects/:id/edit' element={<UpdateProjectModalWrapper />} />
          </Route>
        </Routes>
      )}

      <Footer isLightmode={isLightmode} />
    </>
  )
}

export default App
