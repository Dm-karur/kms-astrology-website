<?php
/**
 * KMS Astrology - Database Connection Configuration (MySQL / PDO)
 * Supports Hostinger production credentials, db.local.php override,
 * environment variables, or standard local fallbacks.
 */

// Enforce Indian Standard Time (IST, UTC+5:30) across all dates and times
date_default_timezone_set('Asia/Kolkata');

// 1. Check for dedicated server credentials file (db.local.php is gitignored)
if (file_exists(__DIR__ . '/db.local.php')) {
    require_once __DIR__ . '/db.local.php';
}

// 2. Check for .env or db.env file in api/config/, api/, or web root
if (!defined('DB_PASS') || DB_PASS === '') {
    $envFiles = [
        __DIR__ . '/db.env',
        __DIR__ . '/../.env',
        __DIR__ . '/../../.env'
    ];
    foreach ($envFiles as $envFile) {
        if (file_exists($envFile)) {
            $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $line = trim($line);
                if (empty($line) || strpos($line, '#') === 0 || strpos($line, '=') === false) continue;
                list($k, $v) = explode('=', $line, 2);
                $k = trim($k);
                $v = trim($v, " \t\n\r\0\x0B\"'");
                if (!defined($k)) {
                    define($k, $v);
                }
            }
            break;
        }
    }
}

// 3. Define database credentials with Hostinger defaults and env overrides
if (!defined('DB_HOST')) define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
if (!defined('DB_PORT')) define('DB_PORT', getenv('DB_PORT') ?: '3306');
if (!defined('DB_NAME')) define('DB_NAME', getenv('DB_NAME') ?: 'u589483802_kmsastrology');
if (!defined('DB_USER')) define('DB_USER', getenv('DB_USER') ?: 'u589483802_kmsserver');
if (!defined('DB_PASS')) define('DB_PASS', defined('DB_PASS') ? DB_PASS : (getenv('DB_PASS') !== false ? getenv('DB_PASS') : ''));

// Secret key for HMAC token signing (configurable)
if (!defined('JWT_SECRET')) define('JWT_SECRET', getenv('JWT_SECRET') ?: 'kms_astrology_super_secret_tamil_portal_token_key_2026');

/**
 * Returns a configured PDO database instance
 *
 * @param bool $selectDatabase Whether to select the target database
 * @return PDO
 */
function getDBConnection($selectDatabase = true)
{
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
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci, time_zone = '+05:30'"
    ];

    try {
        $instance = new PDO($dsn, DB_USER, DB_PASS, $options);
        // Explicitly set connection timezone to Indian Standard Time (IST)
        $instance->exec("SET time_zone = '+05:30'");
        if ($selectDatabase) {
            $pdo = $instance;
        }
        return $instance;
    } catch (PDOException $e) {
        // If connecting to localhost failed, attempt 127.0.0.1 fallback
        if (DB_HOST === 'localhost') {
            try {
                $altDsn = "mysql:host=127.0.0.1;port=" . DB_PORT . ($selectDatabase ? ";dbname=" . DB_NAME : "") . ";charset=utf8mb4";
                $instance = new PDO($altDsn, DB_USER, DB_PASS, $options);
                $instance->exec("SET time_zone = '+05:30'");
                if ($selectDatabase) {
                    $pdo = $instance;
                }
                return $instance;
            } catch (PDOException $e2) {
                // fall through to error reporting with original exception
            }
        }

        // Output clean JSON error if connection fails
        if (!headers_sent()) {
            http_response_code(500);
            header('Content-Type: application/json; charset=UTF-8');
        }
        echo json_encode([
            'success' => false,
            'error' => 'DATABASE_CONNECTION_ERROR',
            'message' => 'தரவுத்தள இணைப்பு தோல்வியடைந்தது: ' . $e->getMessage(),
            'attempted_user' => DB_USER,
            'attempted_db'   => DB_NAME,
            'hint' => 'Please create/update `api/config/db.local.php` on Hostinger File Manager with your database password.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}
