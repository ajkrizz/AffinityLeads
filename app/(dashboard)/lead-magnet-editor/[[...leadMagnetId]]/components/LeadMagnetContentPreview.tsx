import React from "react";

interface LeadMagnetContentPreviewProps {
  title: string;
  subtitle?: string;
  body: string;
  //onRephrase: () => void; // Function to rephrase the content
}

function LeadMagnetContentPreview({
  title,
  subtitle,
  body,
  //onRephrase,
}: LeadMagnetContentPreviewProps) {
  return (
    <div className="mb-10 flex flex-col overflow-y-auto rounded-lg bg-white p-4 shadow-lg md:mb-10 md:p-8 relative">
      <h1 className="mb-4 text-2xl font-semibold text-gray-700 md:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <h2 className="mb-6 text-xl text-gray-500 md:text-2xl">{subtitle}</h2>
      )}
      <div
        className="ProseMirror"
        style={{ maxHeight: "calc(85vh - 200px)", overflowY: "auto" }}
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <button
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded"
        //onClick={onRephrase}
      >
        Rephrase
      </button>
    </div>
  );
}

export default LeadMagnetContentPreview;
