import { ToastContainer } from 'react-toastify';

import AppRouter from './components/AppRouter';
function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
}

export default App;