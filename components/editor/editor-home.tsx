"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { CreateProjectDialog } from "@/components/editor/create-project-dialog"
import { RenameProjectDialog } from "@/components/editor/rename-project-dialog"
import { DeleteProjectDialog } from "@/components/editor/delete-project-dialog"
import { Button } from "@/components/ui/button"
import { useProjectActions } from "@/hooks/use-project-actions"
import type { SidebarProject } from "@/lib/project-data"

interface EditorHomeProps {
  ownedProjects: SidebarProject[]
  sharedProjects: SidebarProject[]
}

export function EditorHome({ ownedProjects, sharedProjects }: EditorHomeProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const actions = useProjectActions()

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
          ownedProjects={ownedProjects}
          sharedProjects={sharedProjects}
          onNewProject={actions.openCreate}
          onRenameProject={actions.openRename}
          onDeleteProject={actions.openDelete}
        />
        <main className="flex-1 overflow-auto">
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <h1 className="text-xl font-semibold text-text-primary">
              Create a project or open an existing one
            </h1>
            <p className="text-sm text-text-muted">
              Start a new architecture workspace, or choose a project from the sidebar.
            </p>
            <Button onClick={actions.openCreate} className="gap-2">
              <Plus className="h-5 w-5" />
              New Project
            </Button>
          </div>
        </main>
      </div>

      <CreateProjectDialog
        isOpen={actions.dialog === "create"}
        onClose={actions.closeDialog}
        name={actions.formName}
        onNameChange={actions.setFormName}
        roomIdPreview={actions.roomIdPreview}
        isLoading={actions.isLoading}
        onSubmit={actions.handleCreate}
      />
      <RenameProjectDialog
        isOpen={actions.dialog === "rename"}
        onClose={actions.closeDialog}
        project={actions.targetProject}
        name={actions.formName}
        onNameChange={actions.setFormName}
        isLoading={actions.isLoading}
        onSubmit={actions.handleRename}
      />
      <DeleteProjectDialog
        isOpen={actions.dialog === "delete"}
        onClose={actions.closeDialog}
        project={actions.targetProject}
        isLoading={actions.isLoading}
        onConfirm={actions.handleDelete}
      />
    </div>
  )
}
