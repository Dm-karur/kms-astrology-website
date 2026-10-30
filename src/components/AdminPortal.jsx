import React, { useState, useEffect, useMemo } from "react";
import {
  getStoredLeads,
  updateLeadStatus,
  updateLeadNotes,
  deleteLead,
  exportLeadsToCSV,
  adminLoginAPI,
  fetchLeadsFromAPI,
  updateLeadStatusAPI,
  updateLeadNotesAPI,
  deleteLeadAPI,
} from "../services/leadService";
import { BrandMotif } from "./SubtleKolam";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  Smartphone,
  Download,
  LogOut,
  Search,
  Phone,
  MessageCircle,
  Trash2,
  Save,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
  FileSpreadsheet,
  AlertCircle,
  ExternalLink,
  Languages,
  X,
} from "lucide-react";

const ADMIN_STORAGE_KEY = "kms_admin_authenticated_session";
const ADMIN_TOKEN_KEY = "kms_admin_token";
const ADMIN_LANG_KEY = "kms_admin_portal_language";
const PWA_INSTALLED_KEY = "kms_admin_pwa_installed";
const DEFAULT_USER = "admin";
const DEFAULT_PASS = "kmsastro@2026";

/**
 * Complete bilingual translations dictionary for Admin Portal
 */
const adminStrings = {
  ta: {
    brandTitle: "KMS ஜோதிடம்",
    portalBadge: "நிர்வாகி போர்டல்",
    loginSubtitle: "நிர்வாகி போர்டல் • உள்நுழைவு",
    mysqlConnected: "MySQL தரவுத்தளம்",
    localOffline: "உள்ளூர் சேமிப்பகம்",
    pwaAsk: "மொபைலில் செயலியை நிறுவ வேண்டுமா?",
    install: "நிறுவுக",
    installApp: "செயலியை நிறுவுக",
    appRunning: "செயலி இயங்குகிறது",
    usernameLabel: "பயனர் பெயர் (Username)",
    passwordLabel: "கடவுச்சொல் (Password)",
    hidePw: "கடவுச்சொல்லை மறை",
    showPw: "கடவுச்சொல்லைக் காட்டு",
    signIn: "உள்நுழைக (Sign In)",
    defaultCredsTitle: "இயல்புநிலை அனுமதி விவரங்கள்:",
    usernameHint: "பயனர் பெயர்:",
    passwordHint: "கடவுச்சொல்:",
    invalidCreds: "தவறான பயனர் பெயர் அல்லது கடவுச்சொல். மீண்டும் முயற்சிக்கவும்.",
    enterCreds: "தயவுசெய்து பயனர் பெயர் மற்றும் கடவுச்சொல்லை உள்ளிடவும்.",
    refresh: "புதுப்பி",
    refreshTooltip: "புதிய பதிவுகளைப் புதுப்பித்து பெறுக",
    exportCsv: "எக்செல் (CSV)",
    exportTooltip: "எல்லா கோரிக்கைகளையும் எக்செல் கோப்பாக பதிவிறக்குக",
    logout: "வெளியேறு",
    pwaBannerTitle: "KMS நிர்வாகி செயலியை உங்கள் மொபைலில் நிறுவவும்",
    pwaBannerDesc: "உலாவிக்கு செல்லாமல், உங்கள் செல்போனின் முகப்புத் திரையிலிருந்தே ஒரே தொடுதலில் புதிய ஜோதிடக் கோரிக்கைகளைக் கண்காணிக்கலாம்.",
    installNow: "இப்போதே நிறுவுக (Install App)",

    searchPlaceholder: "பெயர், கைப்பேசி எண், அல்லது விவரம் மூலம் தேடுக...",
    filterCategory: "பிரிவு:",
    filterStatus: "நிலை:",
    all: "அனைத்தும்",
    catMarriage: "திருமணம்",
    catEducation: "கல்வி",
    catBusiness: "தொழில்",
    catMarriageBadge: "திருமண ஜோதிடம்",
    catEducationBadge: "கல்வி ஜோதிடம்",
    catBusinessBadge: "தொழில் ஜோதிடம்",
    statusReceived: "புதியவை",
    statusContacted: "தொடர்பு",
    statusConsulted: "முடிந்தவை",
    statusOptReceived: "🔴 புதியது (Received)",
    statusOptContacted: "🟡 தொடர்பு கொள்ளப்பட்டது (Contacted)",
    statusOptConsulted: "🟢 ஆலோசனை வழங்கப்பட்டது (Consulted)",
    statusOptClosed: "⚪ நிறைவுற்றது (Closed)",
    resultsCount: "காட்டப்படும் கோரிக்கைகள்:",
    emptyTitle: "கோரிக்கைகள் ஏதும் கிடைக்கவில்லை",
    emptyDesc: "தேடல் அல்லது வடிகட்டுதல் அமைப்புகளை மாற்றிப் பார்க்கவும்.",
    showAll: "அனைத்தையும் காட்டு",
    changeStatus: "நிலையை மாற்றவும்",
    contactPref: "தொடர்பு வழி:",
    either: "இரண்டும்",
    whatsapp: "வாட்ஸ்அப்",
    call: "அழைக்க",
    clientConcern: "வாடிக்கையாளர் கேள்வி / குறிப்பு:",
    privateNotes: "ஜோதிடரின் குறிப்புகள் (Private Notes):",
    notesPlaceholder: "எ.கா: நேரம் ஒதுக்கப்பட்டுள்ளது / ஜாதகம் பெறப்பட்டது...",
    save: "சேமி",
    savedBadge: "சேமிக்கப்பட்டது! ✓",
    deleteConfirm: "நிச்சயமாக நீக்கவா?",
    yesDelete: "ஆம், நீக்கு",
    cancel: "வேண்டாம்",
    delete: "நீக்கு",
    today: "இன்று",
    pwaManualAlert: "செயலியை நிறுவ உங்கள் உலாவி மெனுவில் (மூன்று புள்ளிகள்) 'Install app' அல்லது 'Add to Home screen' என்பதைத் தேர்ந்தெடுக்கவும்.",
    waGreetingIntro: "வணக்கம்",
    waGreetingBody: "KMS ஜோதிடத்தில் நீங்கள் பதிவு செய்த",
    waGreetingEnquiry: "ஜோதிட ஆலோசனைக் கோரிக்கை தொடர்பாக தொடர்பு கொள்கிறோம்.",
  },
  en: {
    brandTitle: "KMS Astrology",
    portalBadge: "Admin Portal",
    loginSubtitle: "Admin Portal • Sign In",
    mysqlConnected: "MySQL Database",
    localOffline: "Local Storage (Offline)",
    pwaAsk: "Install app on your mobile?",
    install: "Install",
    installApp: "Install App",
    appRunning: "App Running",
    usernameLabel: "Username",
    passwordLabel: "Password",
    hidePw: "Hide password",
    showPw: "Show password",
    signIn: "Sign In",
    defaultCredsTitle: "Default Credentials:",
    usernameHint: "Username:",
    passwordHint: "Password:",
    invalidCreds: "Invalid username or password. Please try again.",
    enterCreds: "Please enter your username and password.",
    refresh: "Refresh",
    refreshTooltip: "Refresh to fetch latest incoming enquiries",
    exportCsv: "Excel (CSV)",
    exportTooltip: "Download all enquiries as an Excel compatible CSV file",
    logout: "Logout",
    pwaBannerTitle: "Install KMS Admin App on Your Mobile",
    pwaBannerDesc: "Manage and respond to client astrology enquiries instantly with a single tap from your mobile home screen.",
    installNow: "Install App Now",


    searchPlaceholder: "Search by client name, mobile number, ID or notes...",
    filterCategory: "Category:",
    filterStatus: "Status:",
    all: "All",
    catMarriage: "Marriage",
    catEducation: "Education",
    catBusiness: "Business",
    catMarriageBadge: "Marriage Astrology",
    catEducationBadge: "Education Astrology",
    catBusinessBadge: "Business Astrology",
    statusReceived: "New",
    statusContacted: "Contacted",
    statusConsulted: "Completed",
    statusOptReceived: "🔴 New (Received)",
    statusOptContacted: "🟡 Contacted",
    statusOptConsulted: "🟢 Consultation Done",
    statusOptClosed: "⚪ Closed",
    resultsCount: "Showing enquiries:",
    emptyTitle: "No enquiries found",
    emptyDesc: "Try adjusting your search query or filter settings.",
    showAll: "Show All",
    changeStatus: "Change Status",
    contactPref: "Preferred Contact:",
    either: "Either",
    whatsapp: "WhatsApp",
    call: "Call",
    clientConcern: "Client Question / Concern:",
    privateNotes: "Astrologer's Private Notes:",
    notesPlaceholder: "e.g., Slot scheduled / Horoscope chart received...",
    save: "Save",
    savedBadge: "Saved! ✓",
    deleteConfirm: "Confirm delete?",
    yesDelete: "Yes, Delete",
    cancel: "Cancel",
    delete: "Delete",
    today: "Today",
    pwaManualAlert: "To install the app, open your browser menu (3 dots) and tap 'Install app' or 'Add to Home screen'.",
    waGreetingIntro: "Hello",
    waGreetingBody: "We are contacting you regarding your KMS Astrology",
    waGreetingEnquiry: "consultation enquiry.",
  },
};

export const AdminPortal = () => {
  // Bilingual Language State ('ta' | 'en')
  const [adminLang, setAdminLang] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_LANG_KEY) || "ta";
    } catch {
      return "ta";
    }
  });

  const txt = adminStrings[adminLang] || adminStrings.ta;

  const toggleAdminLang = (lang) => {
    const target = lang || (adminLang === "ta" ? "en" : "ta");
    setAdminLang(target);
    try {
      localStorage.setItem(ADMIN_LANG_KEY, target);
    } catch (err) {
      console.error(err);
    }
  };

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_TOKEN_KEY) || "";
    } catch {
      return "";
    }
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [dataSource, setDataSource] = useState("local"); // 'mysql' | 'local'
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Leads & filters state
  const [leads, setLeads] = useState(() => {
    return isAuthenticated ? getStoredLeads() : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingNotes, setEditingNotes] = useState(() => {
    if (!isAuthenticated) return {};
    const data = getStoredLeads();
    const initialNotes = {};
    data.forEach((l) => {
      initialNotes[l.leadId] = l.notes || "";
    });
    return initialNotes;
  });
  const [savedNoteFeedback, setSavedNoteFeedback] = useState({});
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // PWA install prompt state
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(() => {
    if (typeof window !== "undefined") {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;
      const isStoredInstalled =
        localStorage.getItem(PWA_INSTALLED_KEY) === "true";
      return Boolean(isStandalone || isStoredInstalled);
    }
    return false;
  });

  // Listen for PWA beforeinstallprompt and check installation status
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      try {
        localStorage.setItem(PWA_INSTALLED_KEY, "true");
      } catch (err) {
        console.error("Storage error", err);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // If browser supports getInstalledRelatedApps, check if PWA is already installed
    if (typeof window !== "undefined" && "getInstalledRelatedApps" in navigator) {
      navigator
        .getInstalledRelatedApps()
        .then((apps) => {
          if (Array.isArray(apps) && apps.length > 0) {
            setIsAppInstalled(true);
            try {
              localStorage.setItem(PWA_INSTALLED_KEY, "true");
            } catch (err) {}
          }
        })
        .catch(() => {});
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  // Load leads from MySQL Database or Storage
  const loadLeadsData = async (activeToken = token) => {
    setIsRefreshing(true);
    const result = await fetchLeadsFromAPI(activeToken);
    if (result && Array.isArray(result.leads)) {
      setLeads(result.leads);
      setDataSource(result.source === "mysql-database" ? "mysql" : "local");
      const initialNotes = {};
      result.leads.forEach((l) => {
        initialNotes[l.leadId] = l.notes || "";
      });
      setEditingNotes(initialNotes);
    }
    setIsRefreshing(false);
  };

  // Initial fetch on mount if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadLeadsData();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      setLoginError(txt.enterCreds);
      return;
    }

    // 1. Attempt authentication with PHP & MySQL backend
    const apiResult = await adminLoginAPI(cleanUser, cleanPass);
    if (apiResult && apiResult.success) {
      const newToken = apiResult.token || "";
      setToken(newToken);
      try {
        localStorage.setItem(ADMIN_TOKEN_KEY, newToken);
        localStorage.setItem(ADMIN_STORAGE_KEY, "true");
      } catch (err) {
        console.error("Storage error", err);
      }
      setIsAuthenticated(true);
      loadLeadsData(newToken);
      setLoginError("");
      return;
    } else if (apiResult && !apiResult.success && apiResult.error === "INVALID_CREDENTIALS") {
      setLoginError(apiResult.message || txt.invalidCreds);
      return;
    }

    // 2. Offline fallback if PHP server is not reachable
    if (cleanUser === DEFAULT_USER && cleanPass === DEFAULT_PASS) {
      try {
        localStorage.setItem(ADMIN_STORAGE_KEY, "true");
      } catch (err) {
        console.error("Storage error", err);
      }
      setIsAuthenticated(true);
      loadLeadsData();
      setLoginError("");
    } else {
      setLoginError(txt.invalidCreds);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
      localStorage.removeItem(ADMIN_TOKEN_KEY);
    } catch (err) {
      console.error(err);
    }
    setIsAuthenticated(false);
    setToken("");
    setUsername("");
    setPassword("");
  };

  // Trigger PWA install
  const handleInstallApp = async () => {
    if (!deferredPrompt) {
      alert(txt.pwaManualAlert);
      return;
    }
    try {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice && choice.outcome === "accepted") {
        setIsAppInstalled(true);
        try {
          localStorage.setItem(PWA_INSTALLED_KEY, "true");
        } catch (err) {
          console.error("Storage error", err);
        }
      }
      setDeferredPrompt(null);
      setIsInstallable(false);
    } catch (err) {
      console.error("Install prompt error", err);
    }
  };

  // Handle status update
  const handleStatusChange = async (leadId, newStatus) => {
    const updated = await updateLeadStatusAPI(leadId, newStatus, token);
    setLeads([...updated]);
  };

  // Handle note save
  const handleSaveNotes = async (leadId) => {
    const noteText = editingNotes[leadId] || "";
    const updated = await updateLeadNotesAPI(leadId, noteText, token);
    setLeads([...updated]);
    setSavedNoteFeedback((prev) => ({ ...prev, [leadId]: true }));
    setTimeout(() => {
      setSavedNoteFeedback((prev) => ({ ...prev, [leadId]: false }));
    }, 2000);
  };

  // Handle delete
  const handleDeleteConfirm = async (leadId) => {
    const updated = await deleteLeadAPI(leadId, token);
    setLeads([...updated]);
    setDeleteConfirmId(null);
  };

  // Filter leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Category filter
      if (categoryFilter !== "all" && lead.consultationCategory !== categoryFilter) {
        return false;
      }

      // Status filter
      if (statusFilter !== "all" && lead.status !== statusFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = (lead.fullName || "").toLowerCase().includes(q);
        const mobileMatch = (lead.mobileNumber || "").toLowerCase().includes(q);
        const idMatch = (lead.leadId || "").toLowerCase().includes(q);
        const concernMatch = (lead.briefConcern || "").toLowerCase().includes(q);
        const notesMatch = (lead.notes || "").toLowerCase().includes(q);
        return nameMatch || mobileMatch || idMatch || concernMatch || notesMatch;
      }

      return true;
    });
  }, [leads, categoryFilter, statusFilter, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = leads.length;
    const received = leads.filter((l) => l.status === "received").length;
    const contacted = leads.filter((l) => l.status === "contacted").length;
    const consulted = leads.filter((l) => l.status === "consulted" || l.status === "closed").length;
    return { total, received, contacted, consulted };
  }, [leads]);

  // Format timestamp in Indian Standard Time (IST)
  const formatIST = (timestampStr) => {
    if (!timestampStr) return txt.today;
    const raw = timestampStr;
    const d = new Date(raw.includes("T") || raw.endsWith("Z") ? raw : raw.replace(" ", "T") + "+05:30");
    if (isNaN(d.getTime())) return raw;

    return d.toLocaleString(adminLang === "en" ? "en-IN" : "ta-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // --------------------------------------------------------------------------
  // LOGIN SCREEN (BILINGUAL: TAMIL & ENGLISH)
  // --------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card">
          {/* Top Language Toggle */}
          <div className="admin-login-lang-bar">
            <div className="admin-lang-switcher">
              <button
                type="button"
                className={`admin-lang-pill ${adminLang === "ta" ? "active" : ""}`}
                onClick={() => toggleAdminLang("ta")}
              >
                தமிழ்
              </button>
              <button
                type="button"
                className={`admin-lang-pill ${adminLang === "en" ? "active" : ""}`}
                onClick={() => toggleAdminLang("en")}
              >
                English
              </button>
            </div>
          </div>

          <div className="admin-login-brand">
            <div className="brand-motif" style={{ margin: "0 auto 1rem auto" }}>
              <BrandMotif size={28} />
            </div>
            <h1 className="admin-login-title">{txt.brandTitle}</h1>
            <p className="admin-login-subtitle">{txt.loginSubtitle}</p>
          </div>

          {/* PWA Install pill if accessible before login */}
          {isInstallable && (
            <div className="admin-pwa-quick-box">
              <Smartphone size={18} className="admin-pwa-icon" />
              <span>{txt.pwaAsk}</span>
              <button
                type="button"
                className="btn btn-secondary admin-pwa-quick-btn"
                onClick={handleInstallApp}
              >
                {txt.install}
              </button>
            </div>
          )}

          <form onSubmit={handleLogin} className="admin-login-form">
            {loginError && (
              <div className="admin-login-error" role="alert">
                <AlertCircle size={18} />
                <span>{loginError}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="admin-username">
                {txt.usernameLabel}
              </label>
              <div className="admin-input-wrap">
                <User size={18} className="admin-input-icon" />
                <input
                  id="admin-username"
                  type="text"
                  className="form-input admin-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="admin-password">
                {txt.passwordLabel}
              </label>
              <div className="admin-input-wrap">
                <Lock size={18} className="admin-input-icon" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  className="form-input admin-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="admin-pw-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? txt.hidePw : txt.showPw}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary admin-login-btn">
              <span>{txt.signIn}</span>
            </button>
          </form>

          {/* Helper Credentials Hint */}
          <div className="admin-credentials-hint">
            <strong>{txt.defaultCredsTitle}</strong>
            <p>
              {txt.usernameHint} <code>admin</code>
            </p>
            <p>
              {txt.passwordHint} <code>kmsastro@2026</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // ADMIN DASHBOARD SCREEN (BILINGUAL: TAMIL & ENGLISH)
  // --------------------------------------------------------------------------
  return (
    <div className="admin-dashboard-page">
      {/* Top Admin Header */}
      <header className="admin-header">
        <div className="container admin-header-container">
          <div className="admin-header-brand">
            <div className="brand-motif">
              <BrandMotif size={24} />
            </div>
            <div>
              <h1 className="admin-header-title">{txt.brandTitle}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "2px" }}>
                <span className="admin-header-badge">{txt.portalBadge}</span>
                {dataSource === "mysql" ? (
                  <span className="admin-db-badge connected" title={txt.mysqlConnected}>
                    ● {txt.mysqlConnected}
                  </span>
                ) : (
                  <span className="admin-db-badge offline" title={txt.localOffline}>
                    ● {txt.localOffline}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="admin-header-actions">
            {/* Bilingual Switcher Pill */}
            <div className="admin-lang-switcher" title={adminLang === "ta" ? "Switch to English" : "தமிழுக்கு மாற்றவும்"}>
              <button
                type="button"
                className={`admin-lang-pill ${adminLang === "ta" ? "active" : ""}`}
                onClick={() => toggleAdminLang("ta")}
              >
                தமிழ்
              </button>
              <button
                type="button"
                className={`admin-lang-pill ${adminLang === "en" ? "active" : ""}`}
                onClick={() => toggleAdminLang("en")}
              >
                EN
              </button>
            </div>

            {/* Live Refresh Button */}
            <button
              type="button"
              className="btn btn-secondary admin-refresh-btn"
              onClick={() => loadLeadsData()}
              disabled={isRefreshing}
              title={txt.refreshTooltip}
            >
              <RefreshCw size={15} className={isRefreshing ? "spin-icon" : ""} />
              <span>{txt.refresh}</span>
            </button>

            {/* PWA Mobile App Install Button */}
            {!isAppInstalled && (
              <button
                type="button"
                className="btn btn-gold admin-install-btn"
                onClick={handleInstallApp}
                title={txt.installApp}
              >
                <Smartphone size={16} />
                <span>{txt.installApp}</span>
              </button>
            )}

            {isAppInstalled && (
              <div className="admin-installed-badge" title={txt.appRunning}>
                <CheckCircle2 size={16} />
                <span>{txt.appRunning}</span>
              </div>
            )}

            {/* CSV Export */}
            <button
              type="button"
              className="btn btn-secondary admin-export-btn"
              onClick={() => exportLeadsToCSV(leads, adminLang)}
              title={txt.exportTooltip}
            >
              <FileSpreadsheet size={16} />
              <span>{txt.exportCsv}</span>
            </button>

            {/* Logout */}
            <button
              type="button"
              className="btn btn-secondary admin-logout-btn"
              onClick={handleLogout}
              title={txt.logout}
            >
              <LogOut size={16} />
              <span>{txt.logout}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="container admin-main">
        {/* PWA Mobile Banner (prompts user to install on mobile) */}
        {!isAppInstalled && (
          <div className="admin-pwa-banner">
            <div className="admin-pwa-banner-content">
              <div className="admin-pwa-banner-icon">
                <Smartphone size={24} />
              </div>
              <div>
                <h2 className="admin-pwa-banner-title">{txt.pwaBannerTitle}</h2>
                <p className="admin-pwa-banner-desc">{txt.pwaBannerDesc}</p>
              </div>
            </div>
            <div className="admin-pwa-banner-actions">
              <button
                type="button"
                className="btn btn-primary admin-pwa-banner-btn"
                onClick={handleInstallApp}
              >
                <Download size={16} />
                <span>{txt.installNow}</span>
              </button>
              <button
                type="button"
                className="admin-pwa-dismiss-btn"
                onClick={() => {
                  setIsAppInstalled(true);
                  try {
                    localStorage.setItem(PWA_INSTALLED_KEY, "true");
                  } catch (e) {
                    console.error(e);
                  }
                }}
                title={adminLang === "ta" ? "மூடுக / ஏற்கனவே நிறுவப்பட்டது" : "Dismiss / Already installed"}
                aria-label="Dismiss banner"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Total Enquiries Metric Card */}
        <div className="admin-metrics-single-wrap">
          <div className="admin-metric-card admin-metric-card-single">
            <div className="admin-metric-header">
              <span className="admin-metric-label">{txt.metricTotal}</span>
              <Sparkles size={18} className="admin-metric-icon gold" />
            </div>
            <span className="admin-metric-number">{stats.total}</span>
            <span className="admin-metric-sub">{txt.metricTotalSub}</span>
          </div>
        </div>


        {/* Filter and Search Bar */}
        <div className="admin-controls-card">
          <div className="admin-search-box">
            <Search size={18} className="admin-search-icon" />
            <input
              type="text"
              className="form-input admin-search-input"
              placeholder={txt.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="admin-clear-search"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>

          {/* Category & Status Tabs */}
          <div className="admin-filter-row">
            {/* Category Tabs */}
            <div className="admin-pill-group">
              <span className="admin-pill-label">{txt.filterCategory}</span>
              <button
                type="button"
                className={`admin-pill ${categoryFilter === "all" ? "active" : ""}`}
                onClick={() => setCategoryFilter("all")}
              >
                {txt.all}
              </button>
              <button
                type="button"
                className={`admin-pill ${categoryFilter === "marriage" ? "active" : ""}`}
                onClick={() => setCategoryFilter("marriage")}
              >
                {txt.catMarriage}
              </button>
              <button
                type="button"
                className={`admin-pill ${categoryFilter === "education" ? "active" : ""}`}
                onClick={() => setCategoryFilter("education")}
              >
                {txt.catEducation}
              </button>
              <button
                type="button"
                className={`admin-pill ${categoryFilter === "business" ? "active" : ""}`}
                onClick={() => setCategoryFilter("business")}
              >
                {txt.catBusiness}
              </button>
            </div>

            {/* Status Tabs */}
            <div className="admin-pill-group">
              <span className="admin-pill-label">{txt.filterStatus}</span>
              <button
                type="button"
                className={`admin-pill ${statusFilter === "all" ? "active" : ""}`}
                onClick={() => setStatusFilter("all")}
              >
                {txt.all}
              </button>
              <button
                type="button"
                className={`admin-pill ${statusFilter === "received" ? "active" : ""}`}
                onClick={() => setStatusFilter("received")}
              >
                {txt.statusReceived} ({stats.received})
              </button>
              <button
                type="button"
                className={`admin-pill ${statusFilter === "contacted" ? "active" : ""}`}
                onClick={() => setStatusFilter("contacted")}
              >
                {txt.statusContacted} ({stats.contacted})
              </button>
              <button
                type="button"
                className={`admin-pill ${statusFilter === "consulted" ? "active" : ""}`}
                onClick={() => setStatusFilter("consulted")}
              >
                {txt.statusConsulted} ({stats.consulted})
              </button>
            </div>

            {/* Refresh */}
            <button
              type="button"
              className="admin-refresh-btn"
              onClick={() => loadLeadsData()}
              title={txt.refresh}
            >
              <RefreshCw size={16} />
              <span>{txt.refresh}</span>
            </button>
          </div>
        </div>

        {/* Leads Count Indicator */}
        <div className="admin-results-bar">
          <span>
            {txt.resultsCount} <strong>{filteredLeads.length}</strong> / {leads.length}
          </span>
        </div>

        {/* Empty state */}
        {filteredLeads.length === 0 && (
          <div className="admin-empty-state">
            <AlertCircle size={40} className="admin-empty-icon" />
            <h3>{txt.emptyTitle}</h3>
            <p>{txt.emptyDesc}</p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
                setStatusFilter("all");
              }}
            >
              {txt.showAll}
            </button>
          </div>
        )}

        {/* Leads Grid Cards */}
        <div className="admin-leads-list">
          {filteredLeads.map((item) => {
            const cleanDigits = item.normalizedDigits || item.mobileNumber?.replace(/\D/g, "");

            // Category text
            const catBadgeText =
              item.consultationCategory === "marriage"
                ? txt.catMarriageBadge
                : item.consultationCategory === "education"
                  ? txt.catEducationBadge
                  : txt.catBusinessBadge;

            // WhatsApp greeting adapting to selected language
            const waGreeting = encodeURIComponent(
              adminLang === "en"
                ? `${txt.waGreetingIntro} ${item.fullName}! ${txt.waGreetingBody} ${catBadgeText} ${txt.waGreetingEnquiry} (ID: ${item.leadId})`
                : `${txt.waGreetingIntro} ${item.fullName}! ${txt.waGreetingBody} ${catBadgeText} ${txt.waGreetingEnquiry} (எண்: ${item.leadId})`
            );

            return (
              <div key={item.leadId} className={`admin-lead-card status-${item.status}`}>
                {/* Top Row: Lead ID, Category Badge, Status Badge */}
                <div className="admin-lead-top">
                  <div className="admin-lead-badges">
                    <span className="admin-id-badge">{item.leadId}</span>
                    <span className={`admin-cat-badge cat-${item.consultationCategory}`}>
                      {catBadgeText}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="admin-status-dropdown-wrap">
                    <label htmlFor={`status-select-${item.leadId}`} className="sr-only">
                      {txt.changeStatus}
                    </label>
                    <select
                      id={`status-select-${item.leadId}`}
                      className={`admin-status-select status-${item.status}`}
                      value={item.status || "received"}
                      onChange={(e) => handleStatusChange(item.leadId, e.target.value)}
                    >
                      <option value="received">{txt.statusOptReceived}</option>
                      <option value="contacted">{txt.statusOptContacted}</option>
                      <option value="consulted">{txt.statusOptConsulted}</option>
                      <option value="closed">{txt.statusOptClosed}</option>
                    </select>
                  </div>
                </div>

                {/* Main Client Info */}
                <div className="admin-lead-body">
                  <div className="admin-client-info">
                    <h3 className="admin-client-name">{item.fullName}</h3>
                    <div className="admin-client-time">
                      <Clock size={14} />
                      <span>{formatIST(item.submissionTimestamp)}</span>
                      <span className="admin-contact-pref">
                        • {txt.contactPref} <strong>{item.preferredContactMethod || txt.either}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Action Contact Buttons (Direct WhatsApp & Direct Phone Call) */}
                  <div className="admin-contact-buttons">
                    <a
                      href={`https://wa.me/91${cleanDigits}?text=${waGreeting}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn admin-wa-btn"
                      title={txt.whatsapp}
                    >
                      <MessageCircle size={16} />
                      <span>{txt.whatsapp}</span>
                      <ExternalLink size={12} />
                    </a>

                    <a
                      href={`tel:+91${cleanDigits}`}
                      className="btn admin-call-btn"
                      title={txt.call}
                    >
                      <Phone size={16} />
                      <span>{item.mobileNumber}</span>
                    </a>
                  </div>
                </div>

                {/* Client's Concern Text */}
                {item.briefConcern && (
                  <div className="admin-concern-box">
                    <span className="admin-concern-label">{txt.clientConcern}</span>
                    <p className="admin-concern-text">{item.briefConcern}</p>
                  </div>
                )}

                {/* Astrologer Private Notes Box */}
                <div className="admin-notes-section">
                  <label
                    htmlFor={`notes-input-${item.leadId}`}
                    className="admin-notes-label"
                  >
                    {txt.privateNotes}
                  </label>
                  <div className="admin-notes-row">
                    <input
                      id={`notes-input-${item.leadId}`}
                      type="text"
                      className="form-input admin-notes-input"
                      placeholder={txt.notesPlaceholder}
                      value={editingNotes[item.leadId] || ""}
                      onChange={(e) =>
                        setEditingNotes({
                          ...editingNotes,
                          [item.leadId]: e.target.value,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveNotes(item.leadId);
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-secondary admin-notes-save-btn"
                      onClick={() => handleSaveNotes(item.leadId)}
                    >
                      <Save size={14} />
                      <span>{txt.save}</span>
                    </button>
                    {savedNoteFeedback[item.leadId] && (
                      <span className="admin-saved-badge">{txt.savedBadge}</span>
                    )}
                  </div>
                </div>

                {/* Delete / Actions Footer */}
                <div className="admin-lead-footer">
                  {deleteConfirmId === item.leadId ? (
                    <div className="admin-delete-confirm">
                      <span>{txt.deleteConfirm}</span>
                      <button
                        type="button"
                        className="admin-del-yes"
                        onClick={() => handleDeleteConfirm(item.leadId)}
                      >
                        {txt.yesDelete}
                      </button>
                      <button
                        type="button"
                        className="admin-del-no"
                        onClick={() => setDeleteConfirmId(null)}
                      >
                        {txt.cancel}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="admin-delete-trigger"
                      onClick={() => setDeleteConfirmId(item.leadId)}
                      title={txt.delete}
                    >
                      <Trash2 size={14} />
                      <span>{txt.delete}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AdminPortal;
