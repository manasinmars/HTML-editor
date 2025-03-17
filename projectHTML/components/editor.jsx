"use client"

import { useEffect, useRef } from "react"
import * as monaco from "monaco-editor"

// Props:
// - value: string - The HTML code to display in the editor
// - onChange: function - Callback when the editor content changes

export default function Editor({ value, onChange }) {
  const editorRef = useRef(null)
  const monacoEditorRef = useRef(null)

  useEffect(() => {
    if (editorRef.current) {
      monacoEditorRef.current = monaco.editor.create(editorRef.current, {
        value,
        language: "html",
        theme: "vs-dark",
        minimap: { enabled: false },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        fontSize: 14,
        wordWrap: "on",
        lineNumbers: "on",
        tabSize: 2,
      })

      monacoEditorRef.current.onDidChangeModelContent(() => {
        onChange(monacoEditorRef.current?.getValue() || "")
      })
    }

    return () => {
      monacoEditorRef.current?.dispose()
    }
  }, [])

  useEffect(() => {
    if (monacoEditorRef.current && value !== monacoEditorRef.current.getValue()) {
      monacoEditorRef.current.setValue(value)
    }
  }, [value])

  return (
    <div className="h-full w-full">
      <div ref={editorRef} className="h-full w-full" />
    </div>
  )
}

