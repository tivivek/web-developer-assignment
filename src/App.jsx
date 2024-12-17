import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import QuoteListPage from './pages/QuoteListPage';
import CreateQuotePage from './pages/CreateQuotePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/quotes" element={<QuoteListPage />} />
        <Route path="/create" element={<CreateQuotePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
