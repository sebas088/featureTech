import ReactDOM from 'react-dom/client';
import './index.css'
import '../src/assets/swiper.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
