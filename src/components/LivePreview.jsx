import React, { useEffect, useState } from "react";

const LivePreview = ({ files }) => {
  const [previewCode, setPreviewCode] = useState("");

  //   console.log(htmlCode);
  useEffect(() => {
    const timer = setTimeout(() => {
      const htmlCode = files.find((file) => file.language === "html");
      const cssCode = files.find((file) => file.language === "css");
      const jsCode = files.find((file) => file.language === "javascript");

      const combineCode = `
        <html>
            <head>
                <style>
                ${cssCode?.content ?? ""}
                </style>
            </head>
            <body>
                ${htmlCode?.content ?? ""}
                <script>
                ${jsCode?.content ?? ""}
                </script>
            </body>
        </html>`;

      setPreviewCode(combineCode);
    }, 500);

    return () => {
        clearTimeout(timer);
    };
  }, [files]);

  return (
    <iframe
      title="Live Preview"
      srcDoc={previewCode}
      sandbox="allow-scripts allow-modals"
      className="h-full w-full"
    />
  );
};

export default LivePreview;
