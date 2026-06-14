<?php

namespace Database\Seeders;

use App\Models\Template;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TemplateSeeder extends Seeder
{
    /** @use WithoutModelEvents<Template> */
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $templates = [
            [
                'slug' => 'modern-developer',
                'name' => 'Modern Developer',
                'description' => 'Dark, professional, tech-focused',
                'thumbnail_url' => '',
                'is_active' => true,
                'config' => json_encode([]),
            ],
            [
                'slug' => 'minimal-portfolio',
                'name' => 'Minimal Portfolio',
                'description' => 'Clean, white, elegant',
                'thumbnail_url' => '',
                'is_active' => true,
                'config' => json_encode([]),
            ],
            [
                'slug' => 'creative-portfolio',
                'name' => 'Creative Portfolio',
                'description' => 'Vibrant, animation-heavy',
                'thumbnail_url' => '',
                'is_active' => true,
                'config' => json_encode([]),
            ],
            [
                'slug' => 'corporate-portfolio',
                'name' => 'Corporate Portfolio',
                'description' => 'Business oriented',
                'thumbnail_url' => '',
                'is_active' => true,
                'config' => json_encode([]),
            ],
            [
                'slug' => 'premium-dark',
                'name' => 'Premium Dark Portfolio',
                'description' => 'Luxury feel, premium animations',
                'thumbnail_url' => '',
                'is_active' => true,
                'config' => json_encode([]),
            ],
        ];

        foreach ($templates as $template) {
            Template::updateOrCreate(
                ['slug' => $template['slug']],
                $template
            );
        }
    }
}
