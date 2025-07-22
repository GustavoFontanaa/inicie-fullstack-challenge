<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::apiResource('students', UserController::class);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/first-access', [AuthController::class, 'firstAccess']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

