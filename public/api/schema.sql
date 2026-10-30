-- ==============================================================================
-- KMS ASTROLOGY - MYSQL DATABASE SCHEMA & INITIAL DATA
-- Optimized for Tamil UTF-8 (utf8mb4) & Performance
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `kms_astro_db`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `kms_astro_db`;

-- ------------------------------------------------------------------------------
-- Table 1: kms_admins (Admin authentication)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `kms_admins` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(64) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(128) NOT NULL DEFAULT 'நிர்வாகி (Admin)',
  `role` VARCHAR(32) NOT NULL DEFAULT 'super_admin',
  `last_login` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed default admin account (User: admin / Pass: kmsastro@2026)
INSERT INTO `kms_admins` (`username`, `password_hash`, `full_name`, `role`)
VALUES (
  'admin',
  '$2y$10$92mle2yc9y5HMQy3cENRY.bSp74V4jdCVfkAlovN.kZCo8VDafi.K',
  'ஜோதிடர் சுப்பிரமணி (நிர்வாகி)',
  'super_admin'
) ON DUPLICATE KEY UPDATE `username` = `username`;

-- ------------------------------------------------------------------------------
-- Table 2: kms_leads (Submitted consultation enquiries)
-- ------------------------------------------------------------------------------
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Seed Initial Sample Leads in Tamil (Matching Astrologer Subramani's services)
-- ------------------------------------------------------------------------------
INSERT INTO `kms_leads` (
  `lead_id`, `full_name`, `mobile_number`, `normalized_digits`,
  `preferred_language`, `consultation_category`, `preferred_contact_method`,
  `brief_concern`, `consent_given`, `submission_timestamp`, `status`, `notes`
) VALUES
(
  'KMS-20261027-MARR',
  'சரவணன் குமார்',
  '+91 98401 23456',
  '9840123456',
  'ta',
  'marriage',
  'வாட்ஸ்அப் (WhatsApp)',
  'மகனின் திருமண ஜாதகப் பொருத்தம் மற்றும் செவ்வாய் தோஷம் குறித்து ஆலோசிக்க வேண்டும்.',
  1,
  NOW() - INTERVAL 3 HOUR,
  'received',
  ''
),
(
  'KMS-20261027-EDUB',
  'பிரியா நந்தினி',
  '+91 94432 78901',
  '9443278901',
  'ta',
  'education',
  'தொலைபேசி அழைப்பு (Phone Call)',
  'மருத்துவக் கல்வி அல்லது உயர்கல்வி தேர்வு - எனது ஜாதகப்படி எது உகந்தது?',
  1,
  NOW() - INTERVAL 8 HOUR,
  'contacted',
  'தொலைபேசியில் பேசி நாளை நேரம் ஒதுக்கப்பட்டுள்ளது.'
),
(
  'KMS-20261026-BIZZ',
  'முருகேசன் சுந்தரம்',
  '+91 97890 45678',
  '9789045678',
  'ta',
  'business',
  'இரண்டும் (Either)',
  'புதிய வியாபாரம் தொடங்குவதற்கு நல்ல நாள் மற்றும் கிரக அமைப்பு தெரிந்து கொள்ள வேண்டும்.',
  1,
  NOW() - INTERVAL 26 HOUR,
  'consulted',
  'நேரடி ஆலோசனை நிறைவு பெற்றது. சுப முகூர்த்த நாள் வழங்கப்பட்டது.'
) ON DUPLICATE KEY UPDATE `lead_id` = `lead_id`;

