"use client";

import { useState } from "react";

import LeadMagnetEditorNavbar from "./LeadMagnetEditorNavbar";
import LeadMagnetContentEditor from "./LeadMagnetContentEditor";

export type LeadMagnetSections =
  | "content"
  | "prompt"
  | "email"
  | "profile"
  | "settings";

function LeadMagnetEditor() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedEditor, setSelectedEditor] =
    useState<LeadMagnetSections>("content");

  return (
    <div
      className="flex h-screen w-full flex-col overflow-y-hidden"
      style={{ height: `calc(100vh - 66px)` }}
    >
      <LeadMagnetEditorNavbar />
      <div className="flex h-full flex-row">
       
        <div className="h-full flex-grow">
          {selectedEditor === "content" && <LeadMagnetContentEditor />}
         
        </div>
      </div>
    </div>
  );
}

export default LeadMagnetEditor;
