import React, { useState } from 'react'

interface FileUploaderProps {
  onFileUpload: (file: File) => void
}

const FileUploader = ({ onFileUpload }: FileUploaderProps) => {
  const [fileName, setFileName] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      onFileUpload(file)
    }
  }

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleChange} />
      {fileName && <p>📄 File: {fileName}</p>}
    </div>
  )
}

export default FileUploader
