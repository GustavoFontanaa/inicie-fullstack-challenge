<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function index(): Collection
    {
        return User::all();
    }

    public function show(int $id): JsonResponse
    {
        $user = User::findOrFail($id);

        return response()->json($user);
    }

    public function store(Request $request): User
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
        ]);

        $temporaryPassword = Str::random(10);

        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($temporaryPassword),
            'first_access' => true,
        ]);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $student = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $id,
        ]);

        $student->update($request->only('name', 'email'));

        return response()->json(['message' => 'Aluno atualizado com sucesso']);
    }

    public function destroy(int $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'Aluno excluído']);
    }
}
