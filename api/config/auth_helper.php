<?php
/**
 * KMS Astrology - Authentication Helper
 * Handles HMAC-based secure token creation and route protection.
 */

require_once __DIR__ . '/db.php';

/**
 * Creates an HMAC signed session token
 *
 * @param array $payload User payload (e.g., id, username)
 * @param int $expirySeconds Duration in seconds (default 7 days)
 * @return string
 */
function createAuthToken($payload, $expirySeconds = 604800) {
    $payload['exp'] = time() + $expirySeconds;
    $payloadJson = json_encode($payload);
    $base64Payload = rtrim(strtr(base64_encode($payloadJson), '+/', '-_'), '=');
    $signature = hash_hmac('sha256', $base64Payload, JWT_SECRET, true);
    $base64Signature = rtrim(strtr(base64_encode($signature), '+/', '-_'), '=');
    return $base64Payload . '.' . $base64Signature;
}

/**
 * Validates an HMAC signed token
 *
 * @param string $token
 * @return array|false Returns payload if valid, false otherwise
 */
function verifyAuthToken($token) {
    if (empty($token) || strpos($token, '.') === false) {
        return false;
    }

    list($base64Payload, $base64Signature) = explode('.', $token, 2);

    // Verify signature
    $expectedSignature = hash_hmac('sha256', $base64Payload, JWT_SECRET, true);
    $expectedBase64Signature = rtrim(strtr(base64_encode($expectedSignature), '+/', '-_'), '=');

    if (!hash_equals($expectedBase64Signature, $base64Signature)) {
        return false;
    }

    // Decode payload
    $payloadJson = base64_decode(strtr($base64Payload, '-_', '+/'));
    $payload = json_decode($payloadJson, true);

    if (!is_array($payload) || !isset($payload['exp'])) {
        return false;
    }

    // Check expiration
    if (time() > $payload['exp']) {
        return false;
    }

    return $payload;
}

/**
 * Extracts and verifies token from HTTP Authorization header or Cookie
 * Responds with 401 if unauthorized.
 *
 * @return array Verified admin payload
 */
function requireAdminAuth() {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';

    // If Authorization header not in $_SERVER, check getallheaders()
    if (empty($authHeader) && function_exists('getallheaders')) {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    }

    $token = '';
    if (!empty($authHeader) && preg_match('/Bearer\s+(\S+)/i', $authHeader, $matches)) {
        $token = $matches[1];
    } elseif (!empty($_COOKIE['kms_admin_token'])) {
        $token = $_COOKIE['kms_admin_token'];
    } elseif (!empty($_GET['token'])) {
        $token = $_GET['token'];
    }

    $payload = verifyAuthToken($token);

    if (!$payload) {
        sendResponse(401, [
            'success' => false,
            'error'   => 'UNAUTHORIZED',
            'message' => 'அனுமதி மறுக்கப்பட்டது. தயவுசெய்து உள்நுழையவும் (Unauthorized access).'
        ]);
    }

    return $payload;
}

