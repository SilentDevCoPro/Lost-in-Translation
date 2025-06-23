import React from 'react'
import FileUploader from '../components/FileUploader'

const Mainpage: React.FC = () => {
  const handleFileUpload = (file: File) => {
    console.log('File received in Mainpage:', file.name)
    
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🌍 Translator App</h1>
      <FileUploader onFileUpload={handleFileUpload} />
    </div>
  )
}

export default Mainpage
