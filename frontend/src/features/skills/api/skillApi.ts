import { apiClient } from '@/lib/apiClient'
import type { Skill, SkillFormData } from '../types/skill.types'

export async function getSkills(): Promise<Skill[]> {
  const response = await apiClient.get<{ data: Skill[] }>('/skills')
  return response.data.data
}

export async function createSkill(data: SkillFormData): Promise<Skill> {
  const response = await apiClient.post<{ data: Skill }>('/skills', data)
  return response.data.data
}

export async function updateSkill(id: number, data: SkillFormData): Promise<Skill> {
  const response = await apiClient.put<{ data: Skill }>(`/skills/${id}`, data)
  return response.data.data
}

export async function deleteSkill(id: number): Promise<void> {
  await apiClient.delete(`/skills/${id}`)
}
