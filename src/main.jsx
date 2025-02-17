import { createRoot } from 'react-dom/client'
import { NuqsAdapter } from 'nuqs/adapters/react'

import './assets/bootstrap/css/bootstrap.css'
import './assets/style/style.css'

import './assets/bootstrap/js/jquery-3.6.0.min.js'
import './assets/bootstrap/js/bootstrap.js'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <NuqsAdapter>
        <App />
    </NuqsAdapter>
)
