
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Path from './Commen/Path';
import Layout from './Layout';
import CategoryScreen from './Screen/Category/CategoryScreen';
import DashboardScreen from './Screen/Dashboard/DashboardScreen';
import ProductScreen from './Screen/Product/ProductScreen';
import GalleryScreen from './Screen/Gallery/GalleryScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PostScreen from './Screen/Post/PostScreen';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
 
  return (

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
     
        <div className="App">
          <Routes>
            <Route path={Path.Category} element={<Layout component={<CategoryScreen />} />} />
            <Route path={Path.Dashboard} element={<Layout component={<DashboardScreen />} />} />
            <Route path={Path.Product} element={<Layout component={<ProductScreen />} />} />
            <Route path={Path.Gallery} element={<Layout component={<GalleryScreen />} />} />
            <Route path={Path.Post} element={<Layout component={<PostScreen />} />} />
          </Routes>
        </div>
      </BrowserRouter>

     </ThemeProvider> 
  );
}

export default App;
