<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\StoreSkillRequest;
use App\Http\Resources\Api\v1\SkillResource;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    /**
     * List the authenticated user's skills.
     */
    public function index(Request $request): JsonResponse
    {
        $skills = $request->user()
            ->skills()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get();

        return response()->json([
            'data' => SkillResource::collection($skills),
        ]);
    }

    /**
     * Store a new skill.
     */
    public function store(StoreSkillRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $skill = $request->user()
            ->skills()
            ->create([
                'name' => $validated['name'],
                'category' => $validated['category'],
                'display_order' => $validated['display_order'] ?? 0,
            ]);

        return response()->json([
            'data' => new SkillResource($skill),
        ], 201);
    }

    /**
     * Update an existing skill.
     */
    public function update(StoreSkillRequest $request, Skill $skill): JsonResponse
    {
        $this->authorize('update', $skill);

        $validated = $request->validated();

        $skill->update([
            'name' => $validated['name'],
            'category' => $validated['category'],
            'display_order' => $validated['display_order'] ?? $skill->display_order,
        ]);

        return response()->json([
            'data' => new SkillResource($skill),
        ]);
    }

    /**
     * Delete a skill.
     */
    public function destroy(Request $request, Skill $skill): JsonResponse
    {
        $this->authorize('delete', $skill);

        $skill->delete();

        return response()->json([
            'message' => 'Skill deleted successfully.',
        ], 204);
    }
}
