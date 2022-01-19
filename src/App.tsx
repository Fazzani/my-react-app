import './App.css';
import { Route, Routes } from 'react-router-dom';
import UpdataGridInplace from './pages/UpdataGridInplace';
import UpdataGridInplace2 from './pages/UpdataGridInplace2';
import { UpDefaultTheme, UpThemeProvider } from '@up-group-ui/react-controls';

function App() {
  return (
    <UpThemeProvider theme={UpDefaultTheme}>
      <div className="App">
        <h1>Welcome to My React app!</h1>
        <Routes>
          <Route path="/" element={<UpdataGridInplace />} />
          <Route path="Updatagrid2" element={<UpdataGridInplace2 />} />
        </Routes>
      </div>
    </UpThemeProvider>
  );
}

export default App;
