import React from 'react'
import FileUploader from '../components/FileUploader'
import { useTheme } from '../context/ThemeContext'

const Mainpage: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div style={{
      minHeight: '100vh',
      background: theme === 'light' ? '#f8f9fa' : '#121212',
      paddingTop: '3rem',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '2.2rem',
        color: theme === 'light' ? '#333' : '#fff',
      }}>
        Lost in Translation
      </h1>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>

      <FileUploader />
    </div>
  )
}

export default Mainpage
