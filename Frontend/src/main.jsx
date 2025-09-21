import { BrowserRouter } from "react-router-dom"; // ✅ correct

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthProvider.jsx";

createRoot(document.getElementById('root')).render(
<BrowserRouter>
       <AuthProvider>
        <App />
       </AuthProvider>
</BrowserRouter>
)
