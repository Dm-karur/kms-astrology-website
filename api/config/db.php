<?php
/**
 * KMS Astrology - Database Connection Configuration (MySQL / PDO)
 * Supports custom environment settings or standard XAMPP/cPanel defaults.
 */

// Define database credentials with fallback defaults
define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'kms_astro_db');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : '');

// Secret key for HMAC token signing (configurable)
define('JWT_SECRET', getenv('JWT_SECRET') ?: 'kms_astrology_super_secret_tamil_portal_token_key_2026');

/**
 * Returns a configured PDO database instance
 *
 * @param bool $selectDatabase Whether to select the target database
 * @return PDO
 */
function getDBConnection($selectDatabase = true) {
    static $pdo = null;

    if ($pdo !== null && $selectDatabase) {
        return $pdo;
    }

    $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT;
    if ($selectDatabase) {
        $dsn .= ";dbname=" . DB_NAME;
    }
    $dsn .= ";charset=utf8mb4";

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
    ];

    try {
        $instance = new PDO($dsn, DB_USER, DB_PASS, $options);
        if ($selectDatabase) {
            $pdo = $instance;
        }
        return $instance;
    } catch (PDOException $e) {
        // Output clean JSON error if connection fails
        if (!headers_sent()) {
            http_response_code(500);
            header('Content-Type: application/json; charset=UTF-8');
        }
        echo json_encode([
            'success' => false,
            'error'   => 'DATABASE_CONNECTION_ERROR',
            'message' => 'தரவுத்தள இணைப்பு தோல்வியடைந்தது: ' . $e->getMessage(),
            'hint'    => 'Please ensure MySQL is running in XAMPP / cPanel and credentials in api/config/db.php match.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

