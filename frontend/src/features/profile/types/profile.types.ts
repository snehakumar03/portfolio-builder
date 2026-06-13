export interface SocialLink {
  id?: number
  platform: string
  url: string
}

export interface PortfolioProfile {
  id: number
  slug: string
  full_name: string | null
  role: string | null
  headline: string | null
  about: string | null
  profile_picture_url: string | null
  email: string | null
  phone: string | null
  location: string | null
  is_published: boolean
  view_count: number
  template_id: number | null
  template: {
    id: number
    slug: string
    name: string
  } | null
  social_links: SocialLink[]
  created_at: string
  updated_at: string
}

export interface ProfileFormData {
  full_name: string
  role: string
  headline: string
  about: string
  email: string
  phone: string
  location: string
  social_links: SocialLink[]
}
