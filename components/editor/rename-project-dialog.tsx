"use client"

import { EditorDialog } from "@/components/editor/editor-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/mock-projects"

interface RenameProjectDialogProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
  name: string
  onNameChange: (value: string) => void
  isLoading: boolean
  onSubmit: () => void
}

export function RenameProjectDialog({
  isOpen,
  onClose,
  project,
  name,
  onNameChange,
  isLoading,
  onSubmit,
}: RenameProjectDialogProps) {
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && name.trim()) {
      onSubmit()
    }
  }

  return (
    <EditorDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Rename project"
      description={project ? `Renaming "${project.name}"` : undefined}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={!name.trim() || isLoading}>
            {isLoading ? "Saving…" : "Save"}
          </Button>
        </>
      }
    >
      <Input
        className="text-foreground"
        placeholder="Project name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </EditorDialog>
  )
}
