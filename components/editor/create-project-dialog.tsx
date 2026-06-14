"use client"

import { EditorDialog } from "@/components/editor/editor-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

interface CreateProjectDialogProps {
  isOpen: boolean
  onClose: () => void
  name: string
  onNameChange: (value: string) => void
  isLoading: boolean
  onSubmit: () => void
}

export function CreateProjectDialog({
  isOpen,
  onClose,
  name,
  onNameChange,
  isLoading,
  onSubmit,
}: CreateProjectDialogProps) {
  const slug = toSlug(name)

  return (
    <EditorDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Create project"
      description="Name your new architecture workspace."
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={!name.trim() || isLoading}>
            {isLoading ? "Creating…" : "Create project"}
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <Input
          className="text-foreground"
          placeholder="Project name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          autoFocus
        />
        {slug && (
          <p className="text-xs text-text-muted font-mono">ghost.ai/{slug}</p>
        )}
      </div>
    </EditorDialog>
  )
}
