<?php
/**
 * KMS Astrology - Database Auto-Installer / Migrator
 * Runs automatically or via browser: /api/install.php
 */

require_once __DIR__ . '/config/cors.php';
require_once __DIR__ . '/config/db.php';

try {
    // 1. Connect to MySQL server without selecting database first
    $rootPdo = getDBConnection(false);

    // 2. Create database if it does not exist
    $dbName = DB_NAME;
    $rootPdo->exec("CREATE DATABASE IF NOT EXISTS `$dbName` DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci");

    // 3. Connect to the created database
    $pdo = getDBConnection(true);

    // 4. Create kms_admins table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `kms_admins` (
            `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            `username` VARCHAR(64) NOT NULL UNIQUE,
            `password_hash` VARCHAR(255) NOT NULL,
            `full_name` VARCHAR(128) NOT NULL DEFAULT 'நிர்வாகி',
            `role` VARCHAR(32) NOT NULL DEFAULT 'super_admin',
            `last_login` DATETIME NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    // 5. Seed default admin (admin / kmsastro@2026)
    $adminUser = 'admin';
    $adminHash = password_hash('kmsastro@2026', PASSWORD_BCRYPT);
    $adminName = 'ஜோதிடர் சுப்பிரமணி (நிர்வாகி)';

    $checkAdmin = $pdo->prepare("SELECT id FROM `kms_admins` WHERE `username` = ?");
    $checkAdmin->execute([$adminUser]);
    if ($checkAdmin->rowCount() === 0) {
        $insertAdmin = $pdo->prepare("
            INSERT INTO `kms_admins` (`username`, `password_hash`, `full_name`, `role`)
            VALUES (?, ?, ?, 'super_admin')
        ");
        $insertAdmin->execute([$adminUser, $adminHash, $adminName]);
    }

    // 6. Create kms_leads table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `kms_leads` (
            `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            `lead_id` VARCHAR(64) NOT NULL UNIQUE,
            `full_name` VARCHAR(255) NOT NULL,
            `mobile_number` VARCHAR(32) NOT NULL,
            `normalized_digits` VARCHAR(16) NOT NULL,
            `preferred_language` VARCHAR(10) NOT NULL DEFAULT 'ta',
            `consultation_category` VARCHAR(64) NOT NULL,
            `preferred_contact_method` VARCHAR(64) NOT NULL DEFAULT 'Either',
            `brief_concern` TEXT NULL,
            `consent_given` TINYINT(1) NOT NULL DEFAULT 1,
            `consent_timestamp` DATETIME NULL,
            `submission_timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `status` ENUM('received', 'contacted', 'consulted', 'closed') NOT NULL DEFAULT 'received',
            `notes` TEXT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX `idx_lead_id` (`lead_id`),
            INDEX `idx_status` (`status`),
            INDEX `idx_category` (`consultation_category`),
            INDEX `idx_submission_time` (`submission_timestamp`),
            INDEX `idx_digits` (`normalized_digits`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    // 7. Seed sample leads if empty
    $checkLeads = $pdo->query("SELECT COUNT(*) AS total FROM `kms_leads`");
    $leadCount = (int)$checkLeads->fetch()['total'];

    if ($leadCount === 0) {
        $seedStmt = $pdo->prepare("
            INSERT INTO `kms_leads` (
                `lead_id`, `full_name`, `mobile_number`, `normalized_digits`,
                `preferred_language`, `consultation_category`, `preferred_contact_method`,
                `brief_concern`, `consent_given`, `submission_timestamp`, `status`, `notes`
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)
        ");

        $seedData = [
            [
                'KMS-20261027-MARR',
                'சரவணன் குமார்',
                '+91 98401 23456',
                '9840123456',
                'ta',
                'marriage',
                'வாட்ஸ்அப் (WhatsApp)',
                'மகனின் திருமண ஜாதகப் பொருத்தம் மற்றும் செவ்வாய் தோஷம் குறித்து ஆலோசிக்க வேண்டும்.',
                date('Y-m-d H:i:s', time() - 3600 * 3),
                'received',
                ''
            ],
            [
                'KMS-20261027-EDUB',
                'பிரியா நந்தினி',
                '+91 94432 78901',
                '9443278901',
                'ta',
                'education',
                'தொலைபேசி அழைப்பு (Phone Call)',
                'மருத்துவக் கல்வி அல்லது உயர்கல்வி தேர்வு - எனது ஜாதகப்படி எது உகந்தது?',
                date('Y-m-d H:i:s', time() - 3600 * 8),
                'contacted',
                'தொலைபேசியில் பேசி நாளை நேரம் ஒதுக்கப்பட்டுள்ளது.'
            ],
            [
                'KMS-20261026-BIZZ',
                'முருகேசன் சுந்தரம்',
                '+91 97890 45678',
                '9789045678',
                'ta',
                'business',
                'இரண்டும் (Either)',
                'புதிய வியாபாரம் தொடங்குவதற்கு நல்ல நாள் மற்றும் கிரக அமைப்பு தெரிந்து கொள்ள வேண்டும்.',
                date('Y-m-d H:i:s', time() - 3600 * 26),
                'consulted',
                'நேரடி ஆலோசனை நிறைவு பெற்றது. சுப முகூர்த்த நாள் வழங்கப்பட்டது.'
            ]
        ];

        foreach ($seedData as $row) {
            $seedStmt->execute($row);
        }
    }

    sendResponse(200, [
        'success' => true,
        'message' => 'KMS ஜோதிடத் தரவுத்தளம் மற்றும் அட்டவணைகள் வெற்றிகரமாக நிறுவப்பட்டன!',
        'database' => DB_NAME,
        'tables' => ['kms_admins', 'kms_leads'],
        'defaultAdmin' => [
            'username' => 'admin',
            'password' => 'kmsastro@2026'
        ],
        'leadCount' => max($leadCount, 3)
    ]);
} catch (Exception $e) {
    sendResponse(500, [
        'success' => false,
        'error' => 'INSTALLATION_FAILED',
        'message' => 'நிறுவல் தோல்வியடைந்தது: ' . $e->getMessage()
    ]);
}

