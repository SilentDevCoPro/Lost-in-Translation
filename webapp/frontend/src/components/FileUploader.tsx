import React, { useRef, useState } from 'react'
import axios from 'axios'
import './FileUploader.css'

const FileUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState('')
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [targetLang, setTargetLang] = useState('es')
  const [dragOver, setDragOver] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFile = (selectedFile: File) => {
    if (selectedFile.name.endsWith('.txt')) {
      setFile(selectedFile)
      setFileName(selectedFile.name)
      setError(null)
    } else {
      setFile(null)
      setFileName('')
      setError('Only .txt files are allowed.')
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) handleFile(droppedFile)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0])
  }

  const handleSubmit = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('target_lang', targetLang)

    try {
      const res = await axios.post(
        'https://your-api-id.execute-api.your-region.amazonaws.com/Prod/translate', //Replaceable URL 
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      setDownloadUrl(res.data.translated_url)
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Upload failed. Please try again.')
    }
  }

  return (
    <div className="file-uploader-container">
      <div
        className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        tabIndex={0}
        role="button"
        aria-label="Click or drag a .txt file here to upload"
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        <p>📄 Click or Drag a File Here</p>
        <p>(.txt only)</p>
        <input
          ref={inputRef}
          type="file"
          accept=".txt"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
      </div>

      <label htmlFor="language-select" className="language-label">
        Target Language:
      </label>
      <select
        id="language-select"
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value)}
        className="language-select"
      >
        <option value="es">Spanish (es)</option>
        <option value="fr">French (fr)</option>
        <option value="de">German (de)</option>
      </select>

      <button
        onClick={handleSubmit}
        className="submit-button"
        disabled={!file}
      >
        Translate File
      </button>

      {fileName && (
        <p className="filename">
          📄 <strong>{fileName}</strong> ready to translate to <strong>{targetLang}</strong>
        </p>
      )}

      {downloadUrl && (
        <div className="download-link">
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
            📥 Download Translated File
          </a>
        </div>
      )}

      {error && <p className="error-message">⚠️ {error}</p>}
    </div>
  )
}

export default FileUploader
