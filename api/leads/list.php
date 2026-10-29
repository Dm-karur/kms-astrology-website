<?php
/**
 * KMS Astrology - Admin List Leads API Endpoint
 * Method: GET
 * Query params: ?status=...&category=...&search=...
 * Requires: Authorization: Bearer <token>
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth_helper.php';

// Verify admin authorization
$admin = requireAdminAuth();

$statusFilter   = trim($_GET['status'] ?? 'all');
$categoryFilter = trim($_GET['category'] ?? 'all');
$searchQuery    = trim($_GET['search'] ?? '');

try {
    $pdo = getDBConnection(true);

    // Build query conditions
    $conditions = [];
    $params = [];

    if ($statusFilter !== 'all' && !empty($statusFilter)) {
        $conditions[] = "`status` = ?";
        $params[] = $statusFilter;
    }

    if ($categoryFilter !== 'all' && !empty($categoryFilter)) {
        $conditions[] = "`consultation_category` = ?";
        $params[] = $categoryFilter;
    }

    if (!empty($searchQuery)) {
        $conditions[] = "(`full_name` LIKE ? OR `mobile_number` LIKE ? OR `lead_id` LIKE ? OR `brief_concern` LIKE ? OR `notes` LIKE ?)";
        $searchTerm = '%' . $searchQuery . '%';
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $params[] = $searchTerm;
    }

    $whereSql = !empty($conditions) ? 'WHERE ' . implode(' AND ', $conditions) : '';

    $stmt = $pdo->prepare("
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
        $whereSql
        ORDER BY `submission_timestamp` DESC, `id` DESC
    ");
    $stmt->execute($params);
    $leads = $stmt->fetchAll();

    // Map booleans / null values
    foreach ($leads as &$lead) {
        $lead['consentGiven'] = (bool)$lead['consentGiven'];
        $lead['notes'] = $lead['notes'] ?? '';
        $lead['briefConcern'] = $lead['briefConcern'] ?? '';
    }
    unset($lead);

    // Calculate overall statistics
    $statsStmt = $pdo->query("
        SELECT
            COUNT(*) AS `total`,
            SUM(CASE WHEN `status` = 'received' THEN 1 ELSE 0 END) AS `received`,
            SUM(CASE WHEN `status` = 'contacted' THEN 1 ELSE 0 END) AS `contacted`,
            SUM(CASE WHEN `status` IN ('consulted', 'closed') THEN 1 ELSE 0 END) AS `consulted`
        FROM `kms_leads`
    ");
    $statsRow = $statsStmt->fetch();

    $stats = [
        'total'     => (int)($statsRow['total'] ?? 0),
        'received'  => (int)($statsRow['received'] ?? 0),
        'contacted' => (int)($statsRow['contacted'] ?? 0),
        'consulted' => (int)($statsRow['consulted'] ?? 0)
    ];

    sendResponse(200, [
        'success' => true,
        'leads'   => $leads,
        'stats'   => $stats
    ]);
} catch (Exception $e) {
    sendResponse(500, [
        'success' => false,
        'error'   => 'DATABASE_ERROR',
        'message' => 'கோரிக்கைகளைப் பெறுவதில் பிழை ஏற்பட்டது: ' . $e->getMessage()
    ]);
}
