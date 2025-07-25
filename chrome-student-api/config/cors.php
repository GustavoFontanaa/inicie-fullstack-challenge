<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:4200',
        'chrome-extension://jghphjbokcgggilcpalmdigdcmbhmicn',
    ],
    'allowed_origins_patterns' => [
        '/^chrome-extension:\/\/.*/',
    ],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
