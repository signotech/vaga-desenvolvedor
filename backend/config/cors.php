<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Configure settings for cross-origin requests. By default, Laravel will
    | allow CORS requests only for your API routes. Adjust the origins to
    | match your frontend URLs (ex: Next.js on localhost:3000).
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    // Durante desenvolvimento pode liberar tudo com ['*']
    // Mas melhor restringir ao frontend:
    'allowed_origins' => ['http://localhost:3000'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
