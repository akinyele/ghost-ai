import { getProjectsForUser } from "@/lib/project-data"
import { EditorHome } from "@/components/editor/editor-home"

export default async function EditorPage() {
  const { owned, shared } = await getProjectsForUser()
  return <EditorHome ownedProjects={owned} sharedProjects={shared} />
}
