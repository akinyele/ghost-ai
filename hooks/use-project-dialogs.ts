"use client"

import { useState, useRef, useEffect } from "react"
import type { Project } from "@/lib/mock-projects"

type DialogType = "create" | "rename" | "delete" | null

export interface ProjectDialogsState {
  dialog: DialogType
  targetProject: Project | null
  formName: string
  isLoading: boolean
  openCreate: () => void
  openRename: (project: Project) => void
  openDelete: (project: Project) => void
  closeDialog: () => void
  setFormName: (name: string) => void
  handleCreate: () => void
  handleRename: () => void
  handleDelete: () => void
}

export function useProjectDialogs(): ProjectDialogsState {
  const [dialog, setDialog] = useState<DialogType>(null)
  const [targetProject, setTargetProject] = useState<Project | null>(null)
  const [formName, setFormName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current)
    }
  }, [])

  function openCreate() {
    setFormName("")
    setTargetProject(null)
    setDialog("create")
  }

  function openRename(project: Project) {
    setFormName(project.name)
    setTargetProject(project)
    setDialog("rename")
  }

  function openDelete(project: Project) {
    setTargetProject(project)
    setDialog("delete")
  }

  function closeDialog() {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setDialog(null)
    setTargetProject(null)
    setFormName("")
  }

  function handleCreate() {
    setIsLoading(true)
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false)
      closeDialog()
    }, 500)
  }

  function handleRename() {
    setIsLoading(true)
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false)
      closeDialog()
    }, 500)
  }

  function handleDelete() {
    setIsLoading(true)
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false)
      closeDialog()
    }, 500)
  }

  return {
    dialog,
    targetProject,
    formName,
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
