import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToDoContextProvider } from './context/ToDoContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ToDoContextProvider>
        <App />
    </ToDoContextProvider> // 최상위 컴포넌트에 우산을 씌워줌
);