<?php
/**
 * KMS Astrology - Admin Logout Endpoint
 */

require_once __DIR__ . '/../config/cors.php';

// Invalidate token / cookies if any
if (isset($_COOKIE['kms_admin_token'])) {
    setcookie('kms_admin_token', '', time() - 3600, '/');
}

sendResponse(200, [
    'success' => true,
    'message' => 'வெற்றிகரமாக வெளியேறியது (Successfully logged out).'
]);

