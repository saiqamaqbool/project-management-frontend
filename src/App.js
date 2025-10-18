
import React, { useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [role, setRole] = useState('');

  return (
    <div>
      <AppRoutes role={role} setRole={setRole} />
      <ToastContainer />
    </div>
  );
}

export default App;

