"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { CreateProjectDialog } from "@/components/editor/create-project-dialog"
import { RenameProjectDialog } from "@/components/editor/rename-project-dialog"
import { DeleteProjectDialog } from "@/components/editor/delete-project-dialog"
import { Button } from "@/components/ui/button"
import { useProjectDialogs } from "@/hooks/use-project-dialogs"
import { MOCK_PROJECTS } from "@/lib/mock-projects"

export default function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const dialogs = useProjectDialogs()

  return (
    <div className="flex h-screen flex-col">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex flex-1 overflow-hidden">
        <ProjectSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          projects={MOCK_PROJECTS}
          onNewProject={dialogs.openCreate}
          onRenameProject={dialogs.openRename}
          onDeleteProject={dialogs.openDelete}
        />
        <main className="flex-1 overflow-auto">
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <h1 className="text-xl font-semibold text-text-primary">
              Create a project or open an existing one
            </h1>
            <p className="text-sm text-text-secondary">
              Start a new architecture workspace, or choose a project from the sidebar.
            </p>
            <Button onClick={dialogs.openCreate} className="gap-2">
              <Plus className="h-5 w-5" />
              New Project
            </Button>
          </div>
        </main>
      </div>

      <CreateProjectDialog
        isOpen={dialogs.dialog === "create"}
        onClose={dialogs.closeDialog}
        name={dialogs.formName}
        onNameChange={dialogs.setFormName}
        isLoading={dialogs.isLoading}
        onSubmit={dialogs.handleCreate}
      />
      <RenameProjectDialog
        isOpen={dialogs.dialog === "rename"}
        onClose={dialogs.closeDialog}
        project={dialogs.targetProject}
        name={dialogs.formName}
        onNameChange={dialogs.setFormName}
        isLoading={dialogs.isLoading}
        onSubmit={dialogs.handleRename}
      />
      <DeleteProjectDialog
        isOpen={dialogs.dialog === "delete"}
        onClose={dialogs.closeDialog}
        project={dialogs.targetProject}
        isLoading={dialogs.isLoading}
        onConfirm={dialogs.handleDelete}
      />
    </div>
  )
}
