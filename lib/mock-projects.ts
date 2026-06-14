export interface Project {
  id: string
  name: string
  slug: string
  role: "owner" | "collaborator"
}

export const MOCK_PROJECTS: Project[] = [
  { id: "1", name: "Ghost AI Architecture", slug: "ghost-ai-architecture", role: "owner" },
  { id: "2", name: "API Gateway Design", slug: "api-gateway-design", role: "owner" },
  { id: "3", name: "Team Platform Spec", slug: "team-platform-spec", role: "collaborator" },
]
