"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import type { SidebarProject } from "@/lib/project-data"

type DialogType = "create" | "rename" | "delete" | null

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

function shortSuffix(): string {
  return Math.random().toString(36).slice(2, 8)
}

export interface ProjectActionsState {
  dialog: DialogType
  targetProject: SidebarProject | null
  formName: string
  roomIdPreview: string
  isLoading: boolean
  openCreate: () => void
  openRename: (project: SidebarProject) => void
  openDelete: (project: SidebarProject) => void
  closeDialog: () => void
  setFormName: (name: string) => void
  handleCreate: () => Promise<void>
  handleRename: () => Promise<void>
  handleDelete: () => Promise<void>
}

export function useProjectActions(): ProjectActionsState {
  const router = useRouter()
  const pathname = usePathname()

  const [dialog, setDialog] = useState<DialogType>(null)
  const [targetProject, setTargetProject] = useState<SidebarProject | null>(null)
  const [formName, setFormName] = useState("")
  const [suffix, setSuffix] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const roomIdPreview =
    formName.trim() ? `${slugify(formName.trim())}-${suffix}` : ""

  function openCreate() {
    setFormName("")
    setTargetProject(null)
    setSuffix(shortSuffix())
    setDialog("create")
  }

  function openRename(project: SidebarProject) {
    setFormName(project.name)
    setTargetProject(project)
    setDialog("rename")
  }

  function openDelete(project: SidebarProject) {
    setTargetProject(project)
    setDialog("delete")
  }

  function closeDialog() {
    setDialog(null)
    setTargetProject(null)
    setFormName("")
  }

  async function handleCreate() {
    if (!formName.trim()) return
    const roomId = roomIdPreview
    setIsLoading(true)
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName.trim(), id: roomId }),
      })
      if (!res.ok) throw new Error("Failed to create project")
      const project: { id: string } = await res.json()
      closeDialog()
      router.push(`/editor/${project.id}`)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleRename() {
    if (!targetProject || !formName.trim()) return
    setIsLoading(true)
    try {
      const res = await fetch(`/api/projects/${targetProject.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName.trim() }),
      })
      if (!res.ok) throw new Error("Failed to rename project")
      closeDialog()
      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete() {
    if (!targetProject) return
    setIsLoading(true)
    try {
      const res = await fetch(`/api/projects/${targetProject.id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete project")
      closeDialog()
      if (pathname?.includes(targetProject.id)) {
        router.push("/editor")
      } else {
        router.refresh()
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    dialog,
    targetProject,
    formName,
    roomIdPreview,
    isLoading,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    setFormName,
    handleCreate,
    handleRename,
    handleDelete,
  }
}
