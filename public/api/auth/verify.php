<?php
/**
 * KMS Astrology - Verify Admin Auth Token
 * Method: GET, POST
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/auth_helper.php';

$auth = requireAdminAuth();

sendResponse(200, [
    'success' => true,
    'authenticated' => true,
    'user' => [
        'id'       => $auth['id'] ?? null,
        'username' => $auth['username'] ?? '',
        'role'     => $auth['role'] ?? 'admin'
    ]
]);

