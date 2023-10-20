import React from 'react';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RootRouter from './RootRouter';

function App() {
  return (
    <>
      <RootRouter />
      <ToastContainer autoClose={6000} position="top-right" />
    </>
  );
}

export default App;