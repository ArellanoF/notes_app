<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Note;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class NotaController extends Controller
{
    /**
     * Display a paginated listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $perPage = $request->get('per_page', 6);
            $search = $request->get('search');

            $query = Note::query();

            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%");
                });
            }
            $query->orderBy('created_at', 'DESC');

            $notes = $query->paginate($perPage);

            return response()->json([
                'data' => $notes->items(),
                'current_page' => $notes->currentPage(),
                'last_page' => $notes->lastPage(),
                'per_page' => $notes->perPage(),
                'total' => $notes->total(),
                'from' => $notes->firstItem(),
                'to' => $notes->lastItem(),
                'links' => [
                    'first' => $notes->url(1),
                    'last' => $notes->url($notes->lastPage()),
                    'prev' => $notes->previousPageUrl(),
                    'next' => $notes->nextPageUrl(),
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Internal server error',
                'message' => 'Notes could not be obtained'
            ], 500);
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'text' => 'string',

            ]);

            $note = Note::create($validatedData);

            return response()->json([
                'message' => 'Note created successfully',
                'date' => $note
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Invalid validation data',
                'message' => 'The data provided is not valid',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Internal server error',
                'message' => 'The note could not be created'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        try {
            $note = Note::findOrFail($id);

            return response()->json([
                'data' => $note
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Resource not found',
                'message' => 'The requested note does not exist'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Internal server error',
                'message' => 'The grade could not be obtained'
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        try {
            $note = Note::findOrFail($id);

            $validatedData = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'text' => 'sometimes|required|string',
            ]);

            $note->update($validatedData);

            return response()->json([
                'message' => 'Note updated successfully',
                'date' => $note->fresh()
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Resource not found',
                'message' => 'The note you are trying to update does not exist'
            ], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Invalid validation data',
                'message' => 'The data provided is not valid',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Internal server error',
                'message' => 'The note could not be updated'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $note = Note::findOrFail($id);
            $note->delete();

            return response()->json([
                'message' => 'Note deleted successfully'
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Resource not found',
                'message' => 'The note you are trying to delete does not exist'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Internal server error',
                'message' => 'The note could not be deleted'
            ], 500);
        }
    }
}
