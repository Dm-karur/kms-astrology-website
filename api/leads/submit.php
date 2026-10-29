<?php
/**
 * KMS Astrology - Public Consultation Lead Submission API
 * Method: POST
 * Body: {
 *   "name": "...",
 *   "mobile": "...",
 *   "category": "marriage | education | business",
 *   "language": "ta | en",
 *   "contactMethod": "WhatsApp | Phone Call | Either",
 *   "concern": "...",
 *   "consent": true,
 *   "hp_field": "" // anti-spam honeypot
 * }
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, [
        'success' => false,
        'error'   => 'METHOD_NOT_ALLOWED',
        'message' => 'POST கோரிக்கை மட்டுமே அனுமதிக்கப்படுகிறது.'
    ]);
}

$payload = getJsonPayload();

// 1. Anti-spam honeypot check
if (!empty($payload['hp_field'])) {
    sendResponse(400, [
        'success' => false,
        'error'   => 'SPAM_DETECTED',
        'message' => 'Spam detected.'
    ]);
}

// 2. Validate Full Name
$fullName = trim($payload['fullName'] ?? $payload['name'] ?? '');
if (mb_strlen($fullName, 'UTF-8') < 2) {
    sendResponse(400, [
        'success' => false,
        'error'   => 'VALIDATION_NAME',
        'message' => 'தயவுசெய்து உங்கள் பெயரைச் சரியாக உள்ளிடவும் (குறைந்தது 2 எழுத்துக்கள்).'
    ]);
}

// 3. Normalize & Validate Indian Mobile Number
$rawMobile = $payload['mobileNumber'] ?? $payload['mobile'] ?? '';
$digits = preg_replace('/\D/', '', $rawMobile);

// Strip leading +91 or 0
if (strlen($digits) === 12 && substr($digits, 0, 2) === '91') {
    $digits = substr($digits, 2);
} elseif (strlen($digits) === 11 && substr($digits, 0, 1) === '0') {
    $digits = substr($digits, 1);
}

// Validate 10-digit starting with 6, 7, 8, or 9
if (!preg_match('/^[6-9]\d{9}$/', $digits)) {
    sendResponse(400, [
        'success' => false,
        'error'   => 'VALIDATION_MOBILE',
        'message' => 'தயவுசெய்து சரியான 10 இலக்க இந்தியக் கைப்பேசி எண்ணை உள்ளிடவும்.'
    ]);
}
$formattedMobile = '+91 ' . substr($digits, 0, 5) . ' ' . substr($digits, 5);

// 4. Validate Consultation Category
$category = trim($payload['consultationCategory'] ?? $payload['category'] ?? '');
$validCategories = ['marriage', 'education', 'business', 'Marriage Astrology', 'Education Astrology', 'Business Astrology'];
if (empty($category)) {
    $category = 'marriage';
} else {
    // Normalize category key
    $catLower = strtolower($category);
    if (strpos($catLower, 'marr') !== false) {
        $category = 'marriage';
    } elseif (strpos($catLower, 'edu') !== false) {
        $category = 'education';
    } elseif (strpos($catLower, 'busi') !== false) {
        $category = 'business';
    }
}

// 5. Consent validation
$consent = !empty($payload['consentGiven']) || !empty($payload['consent']);
if (!$consent) {
    sendResponse(400, [
        'success' => false,
        'error'   => 'VALIDATION_CONSENT',
        'message' => 'தொடர்பு கொள்ள உங்கள் ஒப்புதலைத் தேர்வு செய்யவும்.'
    ]);
}

// 6. Preferred language & contact method
$prefLang = ($payload['preferredLanguage'] ?? $payload['language'] ?? 'ta') === 'en' ? 'en' : 'ta';
$contactMethod = trim($payload['preferredContactMethod'] ?? $payload['contactMethod'] ?? 'Either');
if (empty($contactMethod)) {
    $contactMethod = 'Either';
}

// 7. Sanitize concern text
$briefConcern = trim($payload['briefConcern'] ?? $payload['concern'] ?? '');
$briefConcern = htmlspecialchars(strip_tags($briefConcern), ENT_QUOTES, 'UTF-8');
if (mb_strlen($briefConcern, 'UTF-8') > 1000) {
    $briefConcern = mb_substr($briefConcern, 0, 1000, 'UTF-8');
}

// 8. Generate Unique Lead ID
$leadId = 'KMS-' . date('Ymd') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 4));

try {
    $pdo = getDBConnection(true);

    $stmt = $pdo->prepare("
        INSERT INTO `kms_leads` (
            `lead_id`, `full_name`, `mobile_number`, `normalized_digits`,
            `preferred_language`, `consultation_category`, `preferred_contact_method`,
            `brief_concern`, `consent_given`, `consent_timestamp`, `submission_timestamp`,
            `status`, `notes`
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW(), 'received', ''
        )
    ");

    $stmt->execute([
        $leadId,
        $fullName,
        $formattedMobile,
        $digits,
        $prefLang,
        $category,
        $contactMethod,
        $briefConcern
    ]);

    $insertedId = $pdo->lastInsertId();

    $leadRecord = [
        'id'                     => (int)$insertedId,
        'leadId'                 => $leadId,
        'fullName'               => $fullName,
        'mobileNumber'           => $formattedMobile,
        'normalizedDigits'       => $digits,
        'preferredLanguage'      => $prefLang,
        'consultationCategory'   => $category,
        'preferredContactMethod' => $contactMethod,
        'briefConcern'           => $briefConcern,
        'consentGiven'           => true,
        'submissionTimestamp'    => date('c'),
        'status'                 => 'received',
        'notes'                  => ''
    ];

    sendResponse(201, [
        'success' => true,
        'message' => 'உங்கள் ஜோதிட ஆலோசனைக் கோரிக்கை வெற்றிகரமாகப் பெறப்பட்டது. விரைவில் தொடர்பு கொள்வோம்!',
        'lead'    => $leadRecord
    ]);
} catch (Exception $e) {
    sendResponse(500, [
        'success' => false,
        'error'   => 'DATABASE_SAVE_FAILED',
        'message' => 'கோரிக்கையைச் சேமிப்பதில் பிழை ஏற்பட்டது: ' . $e->getMessage()
    ]);
}
