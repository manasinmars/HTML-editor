"use client"

import { useEffect, useRef } from "react"

// Props:
// - html: string - The HTML code to render in the preview

export default function Preview({ html }) {
  const iframeRef = useRef(null)

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document

      if (iframeDoc) {
        iframeDoc.open()
        iframeDoc.write(html)
        iframeDoc.close()
      }
    }
  }, [html])

  return (
    <div className="h-full w-full bg-white">
      <iframe
        ref={iframeRef}
        title="HTML Preview"
        className="h-full w-full border-0"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  )
}

