import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import ProjectRoutes from './Routes'

function App() {

  return (
    <>
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

    </>
  )
}

export default App