<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Note;
use Illuminate\Http\JsonResponse;

class NotaController extends Controller
{
    /**
     * Display a paginated listing of the resource.
     */
public function index(Request $request): JsonResponse
{
    $perPage = $request->get('per_page', 6);
    $search = $request->get('search');

    $query = Note::query();

    if ($search) {
        $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('text', 'like', "%{$search}%");
        });
    }

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
    ], 200);
}


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'text' => 'string',
           
        ]);

        $note = Note::create($validatedData);
        
        return response()->json([
            'message' => 'Nota creada exitosamente',
            'data' => $note
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $note = Note::find($id);
        
        if (!$note) {
            return response()->json([
                'message' => 'Nota no encontrada'
            ], 404);
        }
        
        return response()->json([
            'data' => $note
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $note = Note::find($id);
        
        if (!$note) {
            return response()->json([
                'message' => 'Nota no encontrada'
            ], 404);
        }

        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'text' => 'sometimes|string',
        ]);

        $note->update($validatedData);
        
        return response()->json([
            'message' => 'Nota actualizada exitosamente',
            'data' => $note->fresh() 
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $note = Note::find($id);

        if (!$note) {
            return response()->json([
                'message' => 'Nota no encontrada'
            ], 404);
        }
        
        $note->delete();
        
        return response()->json([
            'message' => 'Nota eliminada exitosamente'
        ], 200);
    }
}