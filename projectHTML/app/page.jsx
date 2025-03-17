"use client"

import { useState, useEffect } from "react"
import Editor from "@/components/editor"
import Preview from "@/components/preview"
import Header from "@/components/header"

export default function Home() {
  const [html, setHtml] = useState(`<!DOCTYPE html>
<html>
<head>
  <title>My HTML Page</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
      line-height: 1.6;
    }
    h1 {
      color: #0070f3;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #eaeaea;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to HTML Editor</h1>
    <p>This is a paragraph of text. You can edit this HTML code on the left side.</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
    <button>Click Me</button>
  </div>
</body>
</html>`)

  const [isMobile, setIsMobile] = useState(false)
  const [showPreview, setShowPreview] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleCopyCode = () => {
    navigator.clipboard.writeText(html)
  }

  const handleDownload = () => {
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "index.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result
        setHtml(content)
      }
      reader.readAsText(file)
    }
  }

  const handleSaveToLocalStorage = () => {
    localStorage.setItem("savedHtml", html)
  }

  const handleLoadFromLocalStorage = () => {
    const savedHtml = localStorage.getItem("savedHtml")
    if (savedHtml) {
      setHtml(savedHtml)
    }
  }

  return (
    <main className="flex flex-col h-screen bg-background">
      <Header
        onDownload={handleDownload}
        onUpload={handleUpload}
        onCopy={handleCopyCode}
        onSave={handleSaveToLocalStorage}
        onLoad={handleLoadFromLocalStorage}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        isMobile={isMobile}
      />

      <div className="flex flex-1 overflow-hidden">
        {(!isMobile || !showPreview) && (
          <div className={`${isMobile ? "w-full" : "w-1/2"} h-full border-r border-border`}>
            <Editor value={html} onChange={setHtml} />
          </div>
        )}

        {(!isMobile || showPreview) && (
          <div className={`${isMobile ? "w-full" : "w-1/2"} h-full`}>
            <Preview html={html} />
          </div>
        )}
      </div>
    </main>
  )
}

