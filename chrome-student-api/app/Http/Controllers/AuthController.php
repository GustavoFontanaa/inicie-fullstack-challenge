<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user?->first_access) {
            return response()->json([
                'message' => 'Primeiro acesso: é necessário redefinir sua senha',
                'first_access' => true,
            ], 403);
        }

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        $tokenResult = $user->createToken('auth_token');
        $token = $tokenResult->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    public function firstAccess(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !$user->first_access) {
            return response()->json(['message' => 'Usuário não encontrado ou já completou o primeiro acesso'], 404);
        }

        $user->password = bcrypt($request->password);
        $user->first_access = false;
        $user->save();

        return response()->json(['message' => 'Senha redefinida com sucesso']);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logout realizado com sucesso']);
    }
}
