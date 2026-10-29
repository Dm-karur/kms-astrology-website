<?php
/**
 * KMS Astrology - Admin Update Lead Status & Notes API
 * Method: POST, PUT
 * Body: { "leadId": "...", "status": "...", "notes": "..." }
 * Requires: Authorization: Bearer <token>
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth_helper.php';

// Verify admin authorization
$admin = requireAdminAuth();

if (!in_array($_SERVER['REQUEST_METHOD'], ['POST', 'PUT', 'PATCH'], true)) {
    sendResponse(405, [
        'success' => false,
        'error'   => 'METHOD_NOT_ALLOWED',
        'message' => 'POST அல்லது PUT கோரிக்கை மட்டுமே அனுமதிக்கப்படுகிறது.'
    ]);
}

$payload = getJsonPayload();
$leadId = trim($payload['leadId'] ?? '');

if (empty($leadId)) {
    sendResponse(400, [
        'success' => false,
        'error'   => 'MISSING_LEAD_ID',
        'message' => 'கோரிக்கை எண் (Lead ID) தேவைப்படுகிறது.'
    ]);
}

try {
    $pdo = getDBConnection(true);

    // Verify lead exists
    $checkStmt = $pdo->prepare("SELECT * FROM `kms_leads` WHERE `lead_id` = ? LIMIT 1");
    $checkStmt->execute([$leadId]);
    $existing = $checkStmt->fetch();

    if (!$existing) {
        sendResponse(404, [
            'success' => false,
            'error'   => 'LEAD_NOT_FOUND',
            'message' => 'கோரிக்கை காணப்படவில்லை (Lead not found).'
        ]);
    }

    $updateFields = [];
    $updateParams = [];

    // Check if status is provided
    if (isset($payload['status'])) {
        $allowedStatuses = ['received', 'contacted', 'consulted', 'closed'];
        $newStatus = trim($payload['status']);
        if (in_array($newStatus, $allowedStatuses, true)) {
            $updateFields[] = "`status` = ?";
            $updateParams[] = $newStatus;
        }
    }

    // Check if notes are provided
    if (isset($payload['notes'])) {
        $newNotes = htmlspecialchars(strip_tags((string)$payload['notes']), ENT_QUOTES, 'UTF-8');
        $updateFields[] = "`notes` = ?";
        $updateParams[] = $newNotes;
    }

    if (empty($updateFields)) {
        sendResponse(400, [
            'success' => false,
            'error'   => 'NO_FIELDS_TO_UPDATE',
            'message' => 'மாற்ற வேண்டிய விவரங்கள் எதுவும் இல்லை.'
        ]);
    }

    $updateParams[] = $leadId;
    $sql = "UPDATE `kms_leads` SET " . implode(', ', $updateFields) . " WHERE `lead_id` = ?";
    $updateStmt = $pdo->prepare($sql);
    $updateStmt->execute($updateParams);

    // Fetch refreshed lead
    $fetchStmt = $pdo->prepare("
        SELECT
            `id`,
            `lead_id` AS `leadId`,
            `full_name` AS `fullName`,
            `mobile_number` AS `mobileNumber`,
            `normalized_digits` AS `normalizedDigits`,
            `preferred_language` AS `preferredLanguage`,
            `consultation_category` AS `consultationCategory`,
            `preferred_contact_method` AS `preferredContactMethod`,
            `brief_concern` AS `briefConcern`,
            `consent_given` AS `consentGiven`,
            `submission_timestamp` AS `submissionTimestamp`,
            `status`,
            `notes`
        FROM `kms_leads`
        WHERE `lead_id` = ? LIMIT 1
    ");
    $fetchStmt->execute([$leadId]);
    $updatedLead = $fetchStmt->fetch();
    $updatedLead['consentGiven'] = (bool)$updatedLead['consentGiven'];

    sendResponse(200, [
        'success' => true,
        'message' => 'விவரங்கள் வெற்றிகரமாகப் புதுப்பிக்கப்பட்டன!',
        'lead'    => $updatedLead
    ]);
} catch (Exception $e) {
    sendResponse(500, [
        'success' => false,
        'error'   => 'UPDATE_ERROR',
        'message' => 'புதுப்பிப்பதில் பிழை ஏற்பட்டது: ' . $e->getMessage()
    ]);
}
