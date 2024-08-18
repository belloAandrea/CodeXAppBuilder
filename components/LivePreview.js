
import React, { useEffect, useRef } from 'react';

const LivePreview = ({ htmlCode, cssCode, jsCode }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const document = iframe.contentDocument;
    const documentContents = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
        <script>
          ${jsCode}
        </script>
      </body>
      </html>
    `;
    document.open();
    document.write(documentContents);
    document.close();
  }, [htmlCode, cssCode, jsCode]);

  return <iframe ref={iframeRef} style={{ height: '100%', width: '100%' }} />;
};

export default LivePreview;
