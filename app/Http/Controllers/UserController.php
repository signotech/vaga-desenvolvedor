<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    // Show Register/Create Form
    public function create()
    {
        return view('users.register');
    }

    // Store a New User
    public function store(Request $request)
    {
        // dd($request);
        $formFields = $request->validate([
            'name' => ['required', 'min:3'],
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => ['required', 'confirmed', 'min:6'],
            'role' => 'required'
        ]);

        // Hash Password
        $formFields['password'] = bcrypt($formFields['password']);

        // Create Candidate
        $user = User::create($formFields);

        // Login
        auth()->login($user);

        return redirect('/')->with('message', 'Candidato criado e logado com sucesso');
    }

    // Log Out User
    public function logout(Request $request)
    {
        auth()->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/')->with('message', 'Usuário saiu com sucesso');
    }

    // Show Login Form
    public function login()
    {
        return view('users.login');
    }

    // Log In User
    public function authenticate(Request $request)
    {
        $formFields = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'min:6'],
        ]);

        if (auth()->attempt($formFields)) {
            $request->session()->regenerate();

            $role = auth()->user()->role;
            $role_name = $role == 'employer' ? 'Empregador' : 'Candidato';
            return redirect('/')->with('message', $role_name . ' logado com sucesso!');
        }

        return back()->withErrors(['email' => 'Invalid Credentials'])->onlyInput('email');
    }
}
