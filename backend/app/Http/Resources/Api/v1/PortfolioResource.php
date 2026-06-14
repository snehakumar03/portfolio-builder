<?php

namespace App\Http\Resources\Api\v1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PortfolioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'full_name' => $this->full_name,
            'role' => $this->role,
            'headline' => $this->headline,
            'about' => $this->about,
            'profile_picture_url' => $this->profile_picture_url,
            'email' => $this->email,
            'phone' => $this->phone,
            'location' => $this->location,
            'is_published' => $this->is_published,
            'view_count' => $this->view_count,
            'template_id' => $this->template_id,
            'template' => $this->whenLoaded('template', function () {
                return [
                    'id' => $this->template->id,
                    'slug' => $this->template->slug,
                    'name' => $this->template->name,
                ];
            }),
            'social_links' => $this->whenLoaded('user', function () {
                return $this->user->socialLinks->map(function ($link) {
                    return [
                        'id' => $link->id,
                        'platform' => $link->platform,
                        'url' => $link->url,
                    ];
                });
            }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
