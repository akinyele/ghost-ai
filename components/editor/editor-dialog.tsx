"use client"

import React from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EditorDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  footer?: React.ReactNode
  children?: React.ReactNode
}

export function EditorDialog({
  isOpen,
  onClose,
  title,
  description,
  footer,
  children,
}: EditorDialogProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-base/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-elevated border border-border-default rounded-3xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-text-primary">{title}</h2>
            {description && (
              <p className="mt-1 text-sm text-text-muted">{description}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-7 w-7 -mt-1 -mr-1 text-text-muted hover:text-text-primary shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        {children && <div className="mb-4">{children}</div>}
        {footer && (
          <div className="flex justify-end gap-2 pt-4 border-t border-border-default">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
