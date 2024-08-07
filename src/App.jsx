import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthProvider';

import ProjectRoutes from './Routes'
import CartProvider from './context/CartProvider';

function App() {

  return (
    <>
      <AuthProvider>
        <CartProvider>
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
        </CartProvider>
      </AuthProvider>

    </>
  )
}

export default App