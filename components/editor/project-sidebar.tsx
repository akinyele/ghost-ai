"use client"

import { X, Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { SidebarProject } from "@/lib/project-data"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  ownedProjects: SidebarProject[]
  sharedProjects: SidebarProject[]
  onNewProject: () => void
  onRenameProject: (project: SidebarProject) => void
  onDeleteProject: (project: SidebarProject) => void
}

export function ProjectSidebar({
  isOpen,
  onClose,
  ownedProjects,
  sharedProjects,
  onNewProject,
  onRenameProject,
  onDeleteProject,
}: ProjectSidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-base/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-72 z-50 flex flex-col bg-elevated border-r border-border-default transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-default">
          <span className="text-sm font-semibold text-text-primary">Projects</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-7 w-7 text-text-muted hover:text-text-primary"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden px-3 pt-3">
          <Tabs defaultValue="my-projects" className="flex-1 flex flex-col">
            <TabsList className="w-full">
              <TabsTrigger value="my-projects" className="flex-1">
                My Projects
              </TabsTrigger>
              <TabsTrigger value="shared" className="flex-1">
                Shared
              </TabsTrigger>
            </TabsList>
            <TabsContent value="my-projects" className="flex-1 overflow-hidden mt-2">
              {ownedProjects.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-text-muted">No projects yet</p>
                </div>
              ) : (
                <ScrollArea className="h-full">
                  <ul className="space-y-0.5 py-1">
                    {ownedProjects.map((project) => (
                      <li key={project.id}>
                        <ProjectItem
                          project={project}
                          onRename={onRenameProject}
                          onDelete={onDeleteProject}
                        />
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              )}
            </TabsContent>
            <TabsContent value="shared" className="flex-1 overflow-hidden mt-2">
              {sharedProjects.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-text-muted">No shared projects</p>
                </div>
              ) : (
                <ScrollArea className="h-full">
                  <ul className="space-y-0.5 py-1">
                    {sharedProjects.map((project) => (
                      <li key={project.id}>
                        <ProjectItem project={project} />
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="p-3 border-t border-border-default">
          <Button className="w-full gap-2" onClick={onNewProject}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>
    </>
  )
}

interface ProjectItemProps {
  project: SidebarProject
  onRename?: (project: SidebarProject) => void
  onDelete?: (project: SidebarProject) => void
}

function ProjectItem({ project, onRename, onDelete }: ProjectItemProps) {
  const isOwner = project.role === "owner"

  return (
    <div className="group flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-subtle transition-colors cursor-pointer">
      <span className="flex-1 text-sm text-text-primary truncate">{project.name}</span>
      {isOwner && (
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-text-muted hover:text-text-primary"
            onClick={(e) => {
              e.stopPropagation()
              onRename?.(project)
            }}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-text-muted hover:text-state-error"
            onClick={(e) => {
              e.stopPropagation()
              onDelete?.(project)
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  )
}
