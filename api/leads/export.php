<?php
/**
 * KMS Astrology - Admin Export Leads to CSV API
 * Method: GET
 * Supports Tamil UTF-8 BOM encoding for Microsoft Excel & Google Sheets
 * Requires: Authorization: Bearer <token> or ?token=...
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth_helper.php';

// Verify admin authorization
$admin = requireAdminAuth();

try {
    $pdo = getDBConnection(true);

    $stmt = $pdo->query("
        SELECT
            `lead_id`,
            `full_name`,
            `mobile_number`,
            `consultation_category`,
            `preferred_contact_method`,
            `brief_concern`,
            `status`,
            `notes`,
            `submission_timestamp`
        FROM `kms_leads`
        ORDER BY `submission_timestamp` DESC
    ");
    $leads = $stmt->fetchAll();

    $categoryLabels = [
        'marriage'  => 'திருமணம் (Marriage)',
        'education' => 'கல்வி (Education)',
        'business'  => 'தொழில் (Business)'
    ];

    $statusLabels = [
        'received'  => 'புதியது (Received)',
        'contacted' => 'தொடர்பு கொள்ளப்பட்டது (Contacted)',
        'consulted' => 'ஆலோசனை முடிந்தது (Consulted)',
        'closed'    => 'நிறைவுற்றது (Closed)'
    ];

    $filename = 'kms-astrology-leads-' . date('Ymd-His') . '.csv';

    // Clear output buffer & set CSV headers
    if (ob_get_level()) {
        ob_end_clean();
    }

    header('Content-Type: text/csv; charset=UTF-8');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    header('Pragma: no-cache');
    header('Expires: 0');

    $output = fopen('php://output', 'w');

    // Write UTF-8 BOM so Excel opens Tamil characters cleanly
    fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));

    // Tamil CSV Headers
    fputcsv($output, [
        'கோரிக்கை எண் (Lead ID)',
        'பெயர் (Full Name)',
        'கைப்பேசி எண் (Mobile Number)',
        'ஆலோசனைப் பிரிவு (Category)',
        'தொடர்பு முறை (Contact Method)',
        'தேவை / கேள்வி (Brief Concern)',
        'நிலை (Status)',
        'நிர்வாகக் குறிப்புகள் (Notes)',
        'பதிவு செய்யப்பட்ட தேதி & நேரம் (Date & Time)'
    ]);

    foreach ($leads as $row) {
        $cat = $categoryLabels[$row['consultation_category']] ?? $row['consultation_category'];
        $stat = $statusLabels[$row['status']] ?? $row['status'];

        fputcsv($output, [
            $row['lead_id'],
            $row['full_name'],
            $row['mobile_number'],
            $cat,
            $row['preferred_contact_method'],
            $row['brief_concern'],
            $stat,
            $row['notes'],
            $row['submission_timestamp']
        ]);
    }

    fclose($output);
    exit;
} catch (Exception $e) {
    sendResponse(500, [
        'success' => false,
        'error'   => 'EXPORT_ERROR',
        'message' => 'பதிவிறக்குவதில் பிழை ஏற்பட்டது: ' . $e->getMessage()
    ]);
}
