
import './index.css'
import Pages from './components/pages'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <> 
    <Pages/>
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
    </>
  )
}

export default App
