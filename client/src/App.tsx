import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Button } from './components/ui/button';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Button>Submit</Button>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
