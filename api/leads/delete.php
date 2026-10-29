<?php
/**
 * KMS Astrology - Admin Delete Lead API
 * Method: POST, DELETE
 * Body: { "leadId": "..." }
 * Requires: Authorization: Bearer <token>
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth_helper.php';

// Verify admin authorization
$admin = requireAdminAuth();

if (!in_array($_SERVER['REQUEST_METHOD'], ['POST', 'DELETE'], true)) {
    sendResponse(405, [
        'success' => false,
        'error'   => 'METHOD_NOT_ALLOWED',
        'message' => 'POST அல்லது DELETE கோரிக்கை மட்டுமே அனுமதிக்கப்படுகிறது.'
    ]);
}

$payload = getJsonPayload();
$leadId = trim($payload['leadId'] ?? $_GET['leadId'] ?? '');

if (empty($leadId)) {
    sendResponse(400, [
        'success' => false,
        'error'   => 'MISSING_LEAD_ID',
        'message' => 'நீக்க வேண்டிய கோரிக்கை எண் தேவைப்படுகிறது.'
    ]);
}

try {
    $pdo = getDBConnection(true);

    $stmt = $pdo->prepare("DELETE FROM `kms_leads` WHERE `lead_id` = ?");
    $stmt->execute([$leadId]);

    if ($stmt->rowCount() === 0) {
        sendResponse(404, [
            'success' => false,
            'error'   => 'LEAD_NOT_FOUND',
            'message' => 'கோரிக்கை காணப்படவில்லை அல்லது ஏற்கனவே நீக்கப்பட்டுவிட்டது.'
        ]);
    }

    sendResponse(200, [
        'success' => true,
        'message' => 'கோரிக்கை வெற்றிகரமாக நீக்கப்பட்டது (Lead deleted successfully).'
    ]);
} catch (Exception $e) {
    sendResponse(500, [
        'success' => false,
        'error'   => 'DELETE_ERROR',
        'message' => 'நீக்குவதில் பிழை ஏற்பட்டது: ' . $e->getMessage()
    ]);
}

