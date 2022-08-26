import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routesaAddress from './Router/routes'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route></Route>
        {routesaAddress.map((route, index) => (
          <Route {...route} key={index} ></Route>
        ))}
      </Routes>
    </BrowserRouter>
  );

}

export default App;
