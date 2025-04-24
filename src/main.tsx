import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { tareaStore } from './store/tareaStore.ts'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={tareaStore}>
      <App/>
    </Provider>
  </BrowserRouter>
)
