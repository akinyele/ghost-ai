"use client"

import { EditorDialog } from "@/components/editor/editor-dialog"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/mock-projects"

interface DeleteProjectDialogProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
  isLoading: boolean
  onConfirm: () => void
}

export function DeleteProjectDialog({
  isOpen,
  onClose,
  project,
  isLoading,
  onConfirm,
}: DeleteProjectDialogProps) {
  return (
    <EditorDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Delete project"
      description={
        project
          ? `"${project.name}" will be permanently deleted. This cannot be undone.`
          : "This project will be permanently deleted. This cannot be undone."
      }
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Deleting…" : "Delete"}
          </Button>
        </>
      }
    />
  )
}
