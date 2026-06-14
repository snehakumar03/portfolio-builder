<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\StoreProfileRequest;
use App\Http\Resources\Api\v1\PortfolioResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Get the authenticated user's portfolio profile.
     */
    public function show(Request $request): JsonResponse
    {
        $portfolio = $request->user()
            ->portfolio()
            ->with(['template', 'user.socialLinks'])
            ->first();

        if (! $portfolio) {
            return response()->json([
                'data' => null,
            ]);
        }

        return response()->json([
            'data' => new PortfolioResource($portfolio),
        ]);
    }

    /**
     * Create or update the authenticated user's portfolio profile.
     */
    public function update(StoreProfileRequest $request): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validated();

        $portfolio = $user->portfolio;

        if (! $portfolio) {
            $portfolio = $user->portfolio()->create([
                'slug' => $user->username,
                'full_name' => $validated['full_name'] ?? $user->name,
            ]);
        }

        $portfolio->update([
            'full_name' => $validated['full_name'],
            'role' => $validated['role'] ?? null,
            'headline' => $validated['headline'] ?? null,
            'about' => $validated['about'] ?? null,
            'email' => $validated['email'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'location' => $validated['location'] ?? null,
        ]);

        if (isset($validated['social_links'])) {
            $user->socialLinks()->delete();

            foreach ($validated['social_links'] as $link) {
                $user->socialLinks()->create([
                    'platform' => $link['platform'],
                    'url' => $link['url'],
                ]);
            }
        }

        $portfolio->refresh();
        $portfolio->load(['template', 'user.socialLinks']);

        return response()->json([
            'data' => new PortfolioResource($portfolio),
        ]);
    }

    /**
     * Upload or update the profile picture.
     */
    public function uploadPicture(Request $request): JsonResponse
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        $user = $request->user();
        $portfolio = $user->portfolio;

        if (! $portfolio) {
            $portfolio = $user->portfolio()->create([
                'slug' => $user->username,
                'full_name' => $user->name,
            ]);
        }

        if ($portfolio->profile_picture_url) {
            $oldPath = str_replace(Storage::disk('public')->url(''), '', $portfolio->profile_picture_url);
            Storage::disk('public')->delete($oldPath);
        }

        $path = $request->file('image')->store(
            "profile-pictures/{$user->id}",
            'public'
        );

        $portfolio->update([
            'profile_picture_url' => Storage::disk('public')->url($path),
        ]);

        return response()->json([
            'data' => [
                'profile_picture_url' => $portfolio->profile_picture_url,
            ],
        ]);
    }
}
