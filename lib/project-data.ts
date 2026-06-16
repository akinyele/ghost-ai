import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export interface SidebarProject {
  id: string
  name: string
  role: "owner" | "collaborator"
}

export async function getProjectsForUser(): Promise<{
  owned: SidebarProject[]
  shared: SidebarProject[]
}> {
  const user = await currentUser()
  if (!user) return { owned: [], shared: [] }

  const email = user.emailAddresses[0]?.emailAddress

  const [ownedRows, sharedRows] = await Promise.all([
    prisma.project.findMany({
      where: { ownerId: user.id },
      orderBy: { createdAt: "desc" },
    }),
    email
      ? prisma.projectCollaborator.findMany({
          where: { email },
          include: { project: true },
          orderBy: { createdAt: "desc" },
        })
      : Promise.resolve([]),
  ])

  return {
    owned: ownedRows.map((p) => ({ id: p.id, name: p.name, role: "owner" })),
    shared: sharedRows.map((r) => ({
      id: r.project.id,
      name: r.project.name,
      role: "collaborator",
    })),
  }
}
