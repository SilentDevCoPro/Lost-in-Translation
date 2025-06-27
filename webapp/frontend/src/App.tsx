import React from 'react'
import Mainpage from './pages/Mainpage'
import { ThemeProvider } from './context/ThemeContext'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Mainpage />
    </ThemeProvider>
  )
}

export default App
