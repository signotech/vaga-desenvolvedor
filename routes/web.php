<?php

use App\Http\Controllers\CandidateController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\VerifyAdmin;
use App\Http\Middleware\VerifyCandidate;
use App\Http\Middleware\VerifyEmployer;
use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [ListingController::class, 'index'])->name('listings.index');

// Show Create Form
Route::get('/listings/create', [ListingController::class, 'create'])->middleware(VerifyEmployer::class)->name('listings.create');

// Store Listing Data
Route::post('/listings', [ListingController::class, 'store'])->middleware(VerifyEmployer::class)->name('listings.store');

// Show Edit Form
Route::get('/listings/{listing}/edit', [ListingController::class, 'edit'])->middleware(VerifyEmployer::class)->name('listings.edit');

// Update Listing
Route::put('/listings/{listing}', [ListingController::class, 'update'])->middleware(VerifyEmployer::class)->name('listings.update');

// Delete Listing
Route::delete('/listings/{listing}', [ListingController::class, 'destroy'])->middleware(VerifyEmployer::class)->name('listings.destroy');

// Manage Listings
Route::get('/listings/manage', [ListingController::class, 'manage'])->middleware(VerifyEmployer::class);

// Single Listing
Route::get('/listings/{listing}', [ListingController::class, 'show'])->name('listings.show');

// Pause Listing
Route::put('/listings/{listing}/pause', [ListingController::class, 'pause'])->middleware(VerifyEmployer::class)->name('listings.pause');

// Apply to Listing as Candidate
Route::post('/listings/{listing}/apply', [ListingController::class, 'apply'])->middleware(VerifyCandidate::class)->name('listings.apply');

// Show Register/Create Form (Employer or Candidate)
Route::get('/register', [UserController::class, 'create'])->middleware('guest')->name('users.create');

// Create a New User (Candidate or Employer)
Route::post('/users', [UserController::class, 'store'])->name('users.store');

// Log User Out (Employer)
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth')->name('users.logout');

// Show Login Form (Employer)
Route::get('/login', [UserController::class, 'login'])->name('login')->middleware('guest');

// Log In User (Employer)
Route::post('/users/authenticate', [UserController::class, 'authenticate'])->name('users.authenticate');

// Show Candidate List
Route::get('/candidates', [CandidateController::class, 'index'])->middleware(VerifyAdmin::class);

// Single Candidate
Route::get('/candidates/{candidate}', [CandidateController::class, 'show'])->middleware(VerifyAdmin::class)->name('candidates.show');

// Show Edit Candidate Form
Route::get('/candidates/{candidate}/edit', [CandidateController::class, 'edit'])->middleware(VerifyAdmin::class)->name('candidates.edit');

// Update Candidate
Route::put('/candidates/{candidate}', [CandidateController::class, 'update'])->middleware(VerifyAdmin::class)->name('candidates.update');

// Delete Candidate
Route::delete('/candidates/{candidate}', [CandidateController::class, 'destroy'])->middleware(VerifyAdmin::class)->name('candidates.destroy');
