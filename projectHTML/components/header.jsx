"use client"

import { Button } from "@/components/ui/button"
import { Download, Upload, Copy, Save, FileUp, Eye, Code, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useRef } from "react"

// Props:
// - onDownload: function - Handler for download button
// - onUpload: function - Handler for upload button
// - onCopy: function - Handler for copy button
// - onSave: function - Handler for save button
// - onLoad: function - Handler for load button
// - showPreview: boolean - Whether to show preview (mobile)
// - setShowPreview: function - Toggle preview visibility
// - isMobile: boolean - Whether in mobile view

export default function Header({
  onDownload,
  onUpload,
  onCopy,
  onSave,
  onLoad,
  showPreview,
  setShowPreview,
  isMobile,
}) {
  const fileInputRef = useRef(null)
  const { theme, setTheme } = useTheme()

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="flex items-center justify-between p-4 border-b border-border bg-background">
      <div className="flex items-center">
        <h1 className="text-xl font-bold mr-4 text-primary">HTML Editor</h1>
      </div>

      <div className="flex items-center space-x-2">
        {isMobile && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            title={showPreview ? "Show Editor" : "Show Preview"}
          >
            {showPreview ? <Code size={16} /> : <Eye size={16} />}
          </Button>
        )}

        <Button variant="outline" size="sm" onClick={onCopy} title="Copy HTML">
          <Copy size={16} className="mr-1" />
          <span className="hidden sm:inline">Copy</span>
        </Button>

        <Button variant="outline" size="sm" onClick={onSave} title="Save to Browser">
          <Save size={16} className="mr-1" />
          <span className="hidden sm:inline">Save</span>
        </Button>

        <Button variant="outline" size="sm" onClick={onLoad} title="Load from Browser">
          <FileUp size={16} className="mr-1" />
          <span className="hidden sm:inline">Load</span>
        </Button>

        <Button variant="outline" size="sm" onClick={onDownload} title="Download HTML">
          <Download size={16} className="mr-1" />
          <span className="hidden sm:inline">Download</span>
        </Button>

        <Button variant="outline" size="sm" onClick={handleUploadClick} title="Upload HTML">
          <Upload size={16} className="mr-1" />
          <span className="hidden sm:inline">Upload</span>
        </Button>

        <Button variant="outline" size="sm" onClick={toggleTheme} title="Toggle Theme">
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </Button>

        <input type="file" ref={fileInputRef} onChange={onUpload} className="hidden" accept=".html,.htm" />
      </div>
    </header>
  )
}

