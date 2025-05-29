<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NotaController;
use App\Http\Middleware\CustomAuth;

// API Routes
Route::middleware([CustomAuth::class])->prefix('note')->group(function () {
    Route::get('/', [NotaController::class, 'index']);
    Route::get('{id}', [NotaController::class, 'show']);
    Route::post('/', [NotaController::class, 'store']);
    Route::put('{id}', [NotaController::class, 'update']);
    Route::delete('{id}', [NotaController::class, 'destroy']);
});

