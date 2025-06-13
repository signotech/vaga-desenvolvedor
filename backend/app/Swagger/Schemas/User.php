<?php
namespace App\Swagger\Schemas;

/**
 * @OA\Schema(
 *     schema="User",
 *     type="object",
 *     title="Usuário",
 *     required={"id", "name", "email", "user_type"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Mateus Silva"),
 *     @OA\Property(property="email", type="string", example="mateus@example.com"),
 *     @OA\Property(property="user_type", type="integer", description="1 = candidato, 2 = admin", example=1),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time"),
 * )
 */
class User {}
