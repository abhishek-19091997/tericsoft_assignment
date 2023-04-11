import logo from './logo.svg';
import './App.css';
import AllRoutes from './Routes/AllRoutes';
import PrivateRoute from './Routes/PrivateRoute';

function App() {
  return (
    <div className="App">
      <AllRoutes />
      <PrivateRoute/>
    </div>
  );
}

export default App;
