import type { TeamMember } from "@/types/team";
import { reader } from "@/lib/keystatic";

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const slugs = await reader.collections.team.list();
  const members: TeamMember[] = [];
  for (const slug of slugs) {
    const entry = await reader.collections.team.read(slug);
    if (!entry) continue;
    members.push({
      name: entry.name,
      role: entry.role,
      bio: entry.bio,
      shortBio: entry.shortBio || undefined,
      image: entry.image || undefined,
    });
  }
  return members;
}

export async function getTeamMember(
  name: string
): Promise<TeamMember | undefined> {
  const all = await getAllTeamMembers();
  return all.find((m) => m.name === name);
}
