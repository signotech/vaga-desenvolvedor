<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CandidateController extends Controller
{
    protected $service;

    public function __construct(UserService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
         $this->authorize('viewAny', User::class);
        return response()->json($this->service->all());
    }

    public function store(Request $request)
    {
        $user = $this->service->create($request->all());
        return response()->json($user, 201);
    }

    public function show($id)
    {
        return response()->json($this->service->find($id));
    }

    public function update(Request $request, $id)
    {
        return response()->json($this->service->update($id, $request->all()));
    }

    public function destroy($id)
    {
        $this->service->delete($id);
        return response()->json(null, 204);
    }
}
