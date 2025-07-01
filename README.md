# Lost in Translation 🌍📄

A simple, theme-aware file translation app that allows users to upload `.txt` files and receive translated versions using AWS Lambda and Amazon Translate. Built with React, TypeScript, and Create React App.

---

## ✨ Features

- ✅ Upload `.txt` files via drag & drop or file picker
- ✅ Select a target language for translation
- ✅ AWS Lambda backend with Amazon Translate integration
- ✅ Download translated `.txt` file from S3
- ✅ Toggle light/dark mode (with localStorage support)
- ✅ Clean, responsive UI with CSS transitions
- ✅ TypeScript and component-based architecture

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── FileUploader.tsx
│   │   └── FileUploader.css
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── pages/
│   │   └── Mainpage.tsx
│   ├── App.tsx
│   ├── index.tsx
│   ├── App.css
│   └── index.css
├── package.json
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Start the app (development)

```bash
npm start
```

### 3. Build for production

```bash
npm run build
```

---

## 🌐 Backend Integration

This app expects a deployed AWS Lambda function with an API Gateway endpoint like:

```
https://your-api-id.execute-api.region.amazonaws.com/Prod/translate
```

The Lambda should:

- Accept `multipart/form-data`
- Extract `.txt` file and `target_lang`
- Use Amazon Translate to translate text
- Upload result to S3
- Return a presigned URL to download the translated file

---

## 🖼️ Screenshots

| Light Mode | Dark Mode |
|------------|-----------|
| ![light](./docs/light-mode.png) | ![dark](./docs/dark-mode.png) |

---

## 📦 Tech Stack

- React 18 + TypeScript
- Create React App (CRA)
- AWS Lambda + S3 + Amazon Translate
- Axios for API requests
- CSS Modules with theming

---

## 📝 License

MIT License © 2025 Your Name

---

## 🤝 Contributions

PRs welcome! Feel free to suggest new features or file issues.
