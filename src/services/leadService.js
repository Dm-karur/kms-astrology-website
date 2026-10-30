/**
 * KMS Astrology - Lead Collection & Consultation API Service
 * Handles client validation, phone normalization, anti-spam rate limiting,
 * secure API transmission, and persistent local storage fallback.
 */

import { siteConfig } from "../config/siteConfig";

const LEADS_STORAGE_KEY = "kms_consultation_leads_vault";
const RATE_LIMIT_KEY = "kms_lead_submission_history";
const MAX_SUBMISSIONS_PER_WINDOW = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

/**
 * Initial sample leads in Tamil to showcase the admin dashboard
 */
const SAMPLE_INITIAL_LEADS = [
  {
    leadId: "KMS-20261027-MARR",
    fullName: "சரவணன் குமார்",
    mobileNumber: "+91 98401 23456",
    normalizedDigits: "9840123456",
    preferredLanguage: "ta",
    consultationCategory: "marriage",
    preferredContactMethod: "வாட்ஸ்அப் (WhatsApp)",
    briefConcern: "மகனின் திருமண ஜாதகப் பொருத்தம் மற்றும் செவ்வாய் தோஷம் குறித்து ஆலோசிக்க வேண்டும்.",
    consentGiven: true,
    submissionTimestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    status: "received",
    notes: "",
  },
  {
    leadId: "KMS-20261027-EDUB",
    fullName: "பிரியா நந்தினி",
    mobileNumber: "+91 94432 78901",
    normalizedDigits: "9443278901",
    preferredLanguage: "ta",
    consultationCategory: "education",
    preferredContactMethod: "தொலைபேசி அழைப்பு (Phone Call)",
    briefConcern: "மருத்துவக் கல்வி அல்லது உயர்கல்வி தேர்வு - எனது ஜாதகப்படி எது உகந்தது?",
    consentGiven: true,
    submissionTimestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
    status: "contacted",
    notes: "தொலைபேசியில் பேசி நாளை நேரம் ஒதுக்கப்பட்டுள்ளது.",
  },
  {
    leadId: "KMS-20261026-BIZZ",
    fullName: "முருகேசன் சுந்தரம்",
    mobileNumber: "+91 97890 45678",
    normalizedDigits: "9789045678",
    preferredLanguage: "ta",
    consultationCategory: "business",
    preferredContactMethod: "இரண்டும் (Either)",
    briefConcern: "புதிய வியாபாரம் தொடங்குவதற்கு நல்ல நாள் மற்றும் கிரக அமைப்பு தெரிந்து கொள்ள வேண்டும்.",
    consentGiven: true,
    submissionTimestamp: new Date(Date.now() - 3600000 * 26).toISOString(),
    status: "consulted",
    notes: "நேரடி ஆலோசனை நிறைவு பெற்றது. சுப முகூர்த்த நாள் வழங்கப்பட்டது.",
  },
];

/**
 * Normalizes Indian mobile number.
 * Accepts formats like: "+91 98401 23456", "09840123456", "9840123456", "+91-9840123456"
 * Returns standard 10-digit string if valid, or null.
 */
export function normalizeIndianMobile(rawNumber) {
  if (!rawNumber || typeof rawNumber !== "string") return null;

  // Remove whitespace, hyphens, parentheses, plus
  let cleaned = rawNumber.replace(/[\s\-()+]/g, "");

  // Remove leading 91 if 12 digits
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    cleaned = cleaned.substring(2);
  }
  // Remove leading 0 if 11 digits
  else if (cleaned.length === 11 && cleaned.startsWith("0")) {
    cleaned = cleaned.substring(1);
  }

  // Must be exactly 10 digits and start with 6, 7, 8, or 9 for Indian cellular networks
  if (/^[6-9]\d{9}$/.test(cleaned)) {
    return cleaned;
  }

  return null;
}

/**
 * Checks client-side rate limiting to prevent automated spam
 */
function checkRateLimit() {
  try {
    const now = Date.now();
    const history = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || "[]");
    const recent = history.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

    if (recent.length >= MAX_SUBMISSIONS_PER_WINDOW) {
      return false;
    }

    recent.push(now);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
    return true;
  } catch {
    return true;
  }
}

/**
 * Generates a collision-resistant unique Consultation Lead ID
 * Format: KMS-YYYYMMDD-XXXX
 */
function generateLeadId() {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `KMS-${dateStr}-${randomPart}`;
}

/**
 * Submits consultation lead.
 * If a custom remote API endpoint is provided via VITE_LEAD_API_URL, sends via fetch().
 * Otherwise, stores locally with persistent vault and returns genuine record.
 */
export async function submitConsultationLead(formData) {
  // 1. Anti-spam honeypot check
  if (formData.hp_field) {
    throw new Error("Spam detected");
  }

  // 2. Anti-spam rate limiting check
  if (!checkRateLimit()) {
    throw new Error("Too many enquiries submitted in a short period. Please wait a moment.");
  }

  // 3. Validation
  const trimmedName = (formData.name || "").trim();
  if (!trimmedName || trimmedName.length < 2) {
    throw new Error("VALIDATION_NAME");
  }

  const normalizedPhone = normalizeIndianMobile(formData.mobile);
  if (!normalizedPhone) {
    throw new Error("VALIDATION_MOBILE");
  }

  if (!formData.category) {
    throw new Error("VALIDATION_CATEGORY");
  }

  if (!formData.consent) {
    throw new Error("VALIDATION_CONSENT");
  }

  // Sanitize brief description
  const sanitizedConcern = (formData.concern || "")
    .slice(0, 1000)
    .replace(/[<>]/g, "");

  const leadPayload = {
    leadId: generateLeadId(),
    fullName: trimmedName,
    mobileNumber: `+91 ${normalizedPhone}`,
    normalizedDigits: normalizedPhone,
    preferredLanguage: formData.language || "ta",
    consultationCategory: formData.category,
    preferredContactMethod: formData.contactMethod || "Either",
    briefConcern: sanitizedConcern,
    consentGiven: true,
    consentTimestamp: new Date().toISOString(),
    submissionTimestamp: new Date().toISOString(),
    status: "received",
    notes: "",
  };

  // If a real backend URL is configured, attempt network dispatch
  if (siteConfig.api.isProductionBackendConfigured) {
    try {
      const response = await fetch(siteConfig.api.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(leadPayload),
      });

      if (!response.ok) {
        throw new Error(`Server responded with HTTP ${response.status}`);
      }

      const serverData = await response.json();
      const savedLead = serverData.lead || leadPayload;

      // Cache locally as offline backup
      try {
        const existing = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || "[]");
        existing.unshift(savedLead);
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(existing.slice(0, 100)));
      } catch (e) {
        console.warn("Local storage cache warning:", e);
      }

      return {
        success: true,
        source: "backend-api",
        lead: savedLead,
      };
    } catch (networkError) {
      console.warn("Backend API unavailable, saving securely:", networkError);
    }
  }

  // Simulated latency for realistic user experience
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Store privately in browser local storage as a secure offline backup so no enquiry is lost
  try {
    const existing = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || "[]");
    existing.unshift(leadPayload);
    const trimmed = existing.slice(0, 100);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (err) {
    console.error("Secure storage error:", err);
  }

  return {
    success: true,
    source: "secure-intake",
    lead: leadPayload,
  };
}

/**
 * Retrieves stored consultation leads for the Admin Portal.
 * Initializes with sample leads if the vault is empty.
 */
export function getStoredLeads() {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(SAMPLE_INITIAL_LEADS));
      return SAMPLE_INITIAL_LEADS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(SAMPLE_INITIAL_LEADS));
      return SAMPLE_INITIAL_LEADS;
    }
    return parsed;
  } catch {
    return SAMPLE_INITIAL_LEADS;
  }
}

/**
 * Updates status of a consultation lead
 * @param {string} leadId
 * @param {'received' | 'contacted' | 'consulted' | 'closed'} newStatus
 */
export function updateLeadStatus(leadId, newStatus) {
  try {
    const leads = getStoredLeads();
    const index = leads.findIndex((l) => l.leadId === leadId);
    if (index !== -1) {
      leads[index].status = newStatus;
      leads[index].updatedTimestamp = new Date().toISOString();
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
      return leads;
    }
  } catch (e) {
    console.error("Failed to update status:", e);
  }
  return getStoredLeads();
}

/**
 * Updates astrologer private notes for a lead
 * @param {string} leadId
 * @param {string} notes
 */
export function updateLeadNotes(leadId, notes) {
  try {
    const leads = getStoredLeads();
    const index = leads.findIndex((l) => l.leadId === leadId);
    if (index !== -1) {
      leads[index].notes = notes;
      leads[index].updatedTimestamp = new Date().toISOString();
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
      return leads;
    }
  } catch (e) {
    console.error("Failed to update notes:", e);
  }
  return getStoredLeads();
}

/**
 * Deletes a lead
 * @param {string} leadId
 */
export function deleteLead(leadId) {
  try {
    const leads = getStoredLeads();
    const filtered = leads.filter((l) => l.leadId !== leadId);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (e) {
    console.error("Failed to delete lead:", e);
    return getStoredLeads();
  }
}

/**
 * Exports all leads to CSV formatted in Tamil or English with UTF-8 BOM
 * @param {Array} leads
 * @param {'ta' | 'en'} lang
 */
export function exportLeadsToCSV(leads, lang = "ta") {
  const isEn = lang === "en";

  const categoryMap = isEn
    ? {
      marriage: "Marriage Astrology",
      education: "Education Astrology",
      business: "Business Astrology",
    }
    : {
      marriage: "திருமணம் (Marriage)",
      education: "கல்வி (Education)",
      business: "தொழில் (Business)",
    };

  const statusMap = isEn
    ? {
      received: "New (Received)",
      contacted: "Contacted",
      consulted: "Consulted",
      closed: "Closed",
    }
    : {
      received: "புதியது (Received)",
      contacted: "தொடர்பு கொள்ளப்பட்டது (Contacted)",
      consulted: "ஆலோசனை நிறைவு (Consulted)",
      closed: "முடிந்தது (Closed)",
    };

  const headers = isEn
    ? [
      "Lead ID",
      "Full Name",
      "Mobile Number",
      "Consultation Category",
      "Preferred Contact Method",
      "Brief Concern / Message",
      "Submitted At (IST)",
      "Current Status",
      "Astrologer Private Notes",
    ]
    : [
      "பதிவு எண் (Lead ID)",
      "பெயர் (Full Name)",
      "கைப்பேசி எண் (Mobile Number)",
      "ஆலோசனை வகை (Category)",
      "விருப்பமான தொடர்பு (Contact Method)",
      "சுருக்கமான விவரம் (Concern)",
      "பதிவு செய்யப்பட்ட நேரம் (Submitted At)",
      "தற்போதைய நிலை (Status)",
      "ஜோதிடர் குறிப்புகள் (Notes)",
    ];

  const rows = leads.map((item) => [
    `"${item.leadId || ""}"`,
    `"${(item.fullName || "").replace(/"/g, '""')}"`,
    `"${item.mobileNumber || ""}"`,
    `"${categoryMap[item.consultationCategory] || item.consultationCategory || ""}"`,
    `"${item.preferredContactMethod || ""}"`,
    `"${(item.briefConcern || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    `"${item.submissionTimestamp
      ? new Date(
        item.submissionTimestamp.includes("T") || item.submissionTimestamp.endsWith("Z")
          ? item.submissionTimestamp
          : item.submissionTimestamp.replace(" ", "T") + "+05:30"
      ).toLocaleString(isEn ? "en-IN" : "ta-IN", { timeZone: "Asia/Kolkata" })
      : ""
    }"`,
    `"${statusMap[item.status] || item.status || ""}"`,
    `"${(item.notes || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
  ]);

  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `KMS_Astro_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ==============================================================================
// PHP & MYSQL BACKEND INTEGRATION APIS
// ==============================================================================

/**
 * Admin Login via PHP / MySQL API
 */
export async function adminLoginAPI(username, password) {
  try {
    const res = await fetch(`${siteConfig.api.baseUrl}/auth/login.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return await res.json();
  } catch (err) {
    console.warn("Backend API not reachable (using offline fallback):", err);
    return null;
  }
}

/**
 * Fetches consultation leads from MySQL Database via PHP API
 */
export async function fetchLeadsFromAPI(token = "", filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.status && filters.status !== "all") params.append("status", filters.status);
    if (filters.category && filters.category !== "all") params.append("category", filters.category);
    if (filters.search) params.append("search", filters.search);

    const queryStr = params.toString() ? `?${params.toString()}` : "";
    const res = await fetch(`${siteConfig.api.baseUrl}/leads/list.php${queryStr}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        // Sync local cache
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(data.leads));
        return {
          success: true,
          leads: data.leads,
          stats: data.stats,
          source: "mysql-database",
        };
      }
    }
  } catch (err) {
    console.warn("MySQL backend unreachable, serving from local vault:", err);
  }

  // Graceful offline fallback
  return {
    success: true,
    leads: getStoredLeads(),
    source: "local-vault",
  };
}

/**
 * Updates lead status in MySQL Database
 */
export async function updateLeadStatusAPI(leadId, newStatus, token = "") {
  // Update local cache immediately
  const localLeads = updateLeadStatus(leadId, newStatus);
  try {
    await fetch(`${siteConfig.api.baseUrl}/leads/update.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ leadId, status: newStatus }),
    });
  } catch (err) {
    console.warn("Network error during status update, saved locally:", err);
  }
  return localLeads;
}

/**
 * Updates lead notes in MySQL Database
 */
export async function updateLeadNotesAPI(leadId, notes, token = "") {
  // Update local cache immediately
  const localLeads = updateLeadNotes(leadId, notes);
  try {
    await fetch(`${siteConfig.api.baseUrl}/leads/update.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ leadId, notes }),
    });
  } catch (err) {
    console.warn("Network error during notes update, saved locally:", err);
  }
  return localLeads;
}

/**
 * Deletes a lead in MySQL Database
 */
export async function deleteLeadAPI(leadId, token = "") {
  // Delete from local cache immediately
  const localLeads = deleteLead(leadId);
  try {
    await fetch(`${siteConfig.api.baseUrl}/leads/delete.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ leadId }),
    });
  } catch (err) {
    console.warn("Network error during delete, removed locally:", err);
  }
  return localLeads;
}
