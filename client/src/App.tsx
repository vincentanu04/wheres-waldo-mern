import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Layout } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout user={true} />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
