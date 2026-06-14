import { useEffect, useState } from 'react'
import { createSkill, deleteSkill, getSkills, updateSkill } from '../api/skillApi'
import type { Skill, SkillFormData } from '../types/skill.types'
import { SKILL_CATEGORIES } from '@/shared/constants/skillCategories'

const INITIAL_FORM: SkillFormData = {
  name: '',
  category: 'frontend',
  display_order: 0,
}

export function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [formData, setFormData] = useState<SkillFormData>(INITIAL_FORM)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    loadSkills()
  }, [])

  async function loadSkills() {
    setIsLoading(true)
    try {
      const data = await getSkills()
      setSkills(data)
    } catch (err) {
      console.error('Failed to load skills', err)
    } finally {
      setIsLoading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'display_order' ? parseInt(value, 10) || 0 : value,
    }))
  }

  function startEdit(skill: Skill) {
    setEditingId(skill.id)
    setFormData({
      name: skill.name,
      category: skill.category,
      display_order: skill.display_order,
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setFormData(INITIAL_FORM)
    setErrors({})
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSaving(true)
    setErrors({})

    try {
      if (editingId) {
        await updateSkill(editingId, formData)
      } else {
        await createSkill(formData)
      }

      setFormData(INITIAL_FORM)
      setEditingId(null)
      await loadSkills()
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const apiErrors: Record<string, string> = {}
        Object.entries(err.response.data.errors).forEach(([key, value]) => {
          apiErrors[key] = Array.isArray(value) ? value[0] : String(value)
        })
        setErrors(apiErrors)
      } else {
        setErrors({ general: 'Failed to save skill.' })
      }
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this skill?')) return

    try {
      await deleteSkill(id)
      await loadSkills()
    } catch (err) {
      console.error('Failed to delete skill', err)
    }
  }

  function getCategoryColor(category: string) {
    return SKILL_CATEGORIES.find((c) => c.value === category)?.color ?? 'bg-gray-100 text-gray-700'
  }

  function getCategoryLabel(category: string) {
    return SKILL_CATEGORIES.find((c) => c.value === category)?.label ?? category
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Skills</h1>

      {errors.general && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{errors.general}</div>
      )}

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {editingId ? 'Edit Skill' : 'Add Skill'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Skill Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. React"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
            >
              {SKILL_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>

          <div>
            <label htmlFor="display_order" className="block text-sm font-medium text-gray-700 mb-1">
              Order
            </label>
            <input
              id="display_order"
              name="display_order"
              type="number"
              min="0"
              value={formData.display_order}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : editingId ? 'Update Skill' : 'Add Skill'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Skills List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-6 text-center text-gray-600">Loading skills...</div>
        ) : skills.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No skills added yet.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {skills.map((skill) => (
              <li key={skill.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-900">{skill.name}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                      skill.category
                    )}`}
                  >
                    {getCategoryLabel(skill.category)}
                  </span>
                  <span className="text-sm text-gray-500">Order: {skill.display_order}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEdit(skill)}
                    className="px-3 py-1.5 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
