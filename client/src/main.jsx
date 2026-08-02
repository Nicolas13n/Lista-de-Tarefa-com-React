import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/Style/index.css'
import ListaTarefasApp from './layouts/ListaTarefas'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ListaTarefasApp />
  </StrictMode>,
)
