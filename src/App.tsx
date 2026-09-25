import { useState } from "react";
import Landing from "./pages/Landing";
import Workspace from "./pages/Workspace";
import SatelliteInfo from "./pages/SatelliteInfo";
import InfoPage from "./pages/InfoPage";

export type Page = "landing" | "workspace" | "satellite-info" | "product" | "api-docs" | "privacy" | "terms" | "contact";

export interface WorkspaceDraft{
  question?: string;
  image?: File | null;
}

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [draft, setDraft] = useState<WorkspaceDraft>({});

  const openWorkspace = (nextDraft: WorkspaceDraft = {}) => {
    setDraft(nextDraft);
    setPage("workspace");
  };

  return (
    <div className="size-full space-page">
      {page === "landing" ? (
        <Landing onNavigate={setPage} onOpenWorkspace={openWorkspace} />
      ) : page === "satellite-info" ? (
        <SatelliteInfo onNavigate={setPage} onOpenWorkspace={openWorkspace} />
      ) : page === "workspace" ? (
        <Workspace onNavigate={setPage} draft={draft} />
      ) : (
        <InfoPage page={page} onNavigate={setPage} onOpenWorkspace={openWorkspace} />
      )}
    </div>
  );
}
