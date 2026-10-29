<?php
/**
 * KMS Astrology - CORS & JSON Response Helper
 */

// Allow cross-origin requests from frontend dev servers & production domains
$allowedOrigins = [
    'https://kmsastrology.in',
    'https://www.kmsastrology.in',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'http://localhost:8000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:8000',
];

$httpOrigin = $_SERVER['HTTP_ORIGIN'] ?? '*';
if ($httpOrigin === '*' || in_array($httpOrigin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $httpOrigin");
} else {
    // If not in dev list, allow origin if set, otherwise *
    header("Access-Control-Allow-Origin: " . ($httpOrigin ?: '*'));
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");
header("Access-Control-Max-Age: 86400");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Ensure default JSON content type
header('Content-Type: application/json; charset=UTF-8');

/**
 * Sends a standardized JSON response
 *
 * @param int $statusCode HTTP status code
 * @param array $data Array payload
 */
function sendResponse($statusCode, $data) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

/**
 * Retrieves parsed JSON payload from php://input
 *
 * @return array
 */
function getJsonPayload() {
    $raw = file_get_contents('php://input');
    if (empty($raw)) {
        return [];
    }
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}
