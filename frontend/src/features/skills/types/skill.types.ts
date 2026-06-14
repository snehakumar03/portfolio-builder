export interface Skill {
  id: number
  name: string
  category: SkillCategory
  display_order: number
  created_at: string
  updated_at: string
}

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'devops'
  | 'ai'
  | 'tools'

export interface SkillFormData {
  name: string
  category: SkillCategory
  display_order: number
}
