import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
<<<<<<< HEAD
import "react-image-gallery/styles/css/image-gallery.css";

=======
import { Provider } from 'react-redux';
import { mystore } from './Redux/store.jsx';
>>>>>>> redux

createRoot(document.getElementById('root')).render(
  <StrictMode>
<Provider store={mystore }>
    <App />
    </Provider>
  </StrictMode>,
)
