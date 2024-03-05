import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<p>Hello</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
