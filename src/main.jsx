import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "react-image-gallery/styles/css/image-gallery.css";

import { Provider } from 'react-redux';
import { mystore } from './Redux/store.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
<Provider store={mystore }>
    <App />
    </Provider>
  </StrictMode>,
)
