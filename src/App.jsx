import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthProvider';

import ProjectRoutes from './Routes'

function App() {

  return (
    <>
      <AuthProvider>
        <div className="App bg-warnig-subtle">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <ProjectRoutes />
        </div>
      </AuthProvider>

    </>
  )
}

export default App