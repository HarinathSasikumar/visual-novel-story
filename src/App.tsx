import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NovelLayout from './layouts/NovelLayout';
import Landing from './pages/Landing';
import ChapterPage from './pages/ChapterPage';
import Epilogue from './pages/Epilogue';
import { useNovelStore } from './store/useNovelStore';

function App() {
  const { theme } = useNovelStore();

  return (
    <div className={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<NovelLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/chapter/:id" element={<ChapterPage />} />
            <Route path="/epilogue" element={<Epilogue />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
