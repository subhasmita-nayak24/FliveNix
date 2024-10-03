import './App.css';
import { RouterProvider } from 'react-router-dom';
import Router from './routes/Router';

function App() {
  return (
    <div className=" bg-gradient-to-r from-purple-900 to-purple-200">
    <RouterProvider router={Router} />
  </div>
  );
}

export default App;
