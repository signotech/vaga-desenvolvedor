<?php
namespace App\Swagger\Schemas;

/**
 * @OA\Schema(
 *     schema="Job",
 *     type="object",
 *     required={"id", "title", "salary", "company", "type", "paused"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="title", type="string", example="Desenvolvedor PHP"),
 *     @OA\Property(property="salary", type="number", format="float", example=3500.50),
 *     @OA\Property(property="company", type="string", example="Empresa X"),
 *     @OA\Property(property="type", type="string", example="CLT"),
 *     @OA\Property(property="paused", type="boolean", example=false),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time"),
 * )
 */
class Job {}
