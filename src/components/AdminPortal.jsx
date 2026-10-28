import React, { useState, useEffect, useMemo } from "react";
import {
  getStoredLeads,
  updateLeadStatus,
  updateLeadNotes,
  deleteLead,
  exportLeadsToCSV,
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
} from "lucide-react";

const ADMIN_STORAGE_KEY = "kms_admin_authenticated_session";
const DEFAULT_USER = "admin";
const DEFAULT_PASS = "kmsastro@2026";

export const AdminPortal = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

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
      return (
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true
      );
    }
    return false;
  });

  // Listen for PWA beforeinstallprompt
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
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  // Load leads from storage
  const loadLeadsData = () => {
    const data = getStoredLeads();
    setLeads(data);
    const initialNotes = {};
    data.forEach((l) => {
      initialNotes[l.leadId] = l.notes || "";
    });
    setEditingNotes(initialNotes);
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      setLoginError("தயவுசெய்து பயனர் பெயர் மற்றும் கடவுச்சொல்லை உள்ளிடவும்.");
      return;
    }

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
      setLoginError("தவறான பயனர் பெயர் அல்லது கடவுச்சொல். மீண்டும் முயற்சிக்கவும்.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch (err) {
      console.error(err);
    }
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  // Trigger PWA install
  const handleInstallApp = async () => {
    if (!deferredPrompt) {
      alert(
        "செயலியை நிறுவ உங்கள் உலாவி மெனுவில் (மூன்று புள்ளிகள்) 'Install app' அல்லது 'Add to Home screen' என்பதைத் தேர்ந்தெடுக்கவும்."
      );
      return;
    }
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setIsAppInstalled(true);
    }
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  // Handle status update
  const handleStatusChange = (leadId, newStatus) => {
    const updated = updateLeadStatus(leadId, newStatus);
    setLeads(updated);
  };

  // Handle note save
  const handleSaveNotes = (leadId) => {
    const noteText = editingNotes[leadId] || "";
    const updated = updateLeadNotes(leadId, noteText);
    setLeads(updated);
    setSavedNoteFeedback((prev) => ({ ...prev, [leadId]: true }));
    setTimeout(() => {
      setSavedNoteFeedback((prev) => ({ ...prev, [leadId]: false }));
    }, 2000);
  };

  // Handle delete
  const handleDeleteConfirm = (leadId) => {
    const updated = deleteLead(leadId);
    setLeads(updated);
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

  // --------------------------------------------------------------------------
  // LOGIN SCREEN (100% TAMIL)
  // --------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card">
          <div className="admin-login-brand">
            <div className="brand-motif" style={{ margin: "0 auto 1rem auto" }}>
              <BrandMotif size={28} />
            </div>
            <h1 className="admin-login-title">KMS ஜோதிடம்</h1>
            <p className="admin-login-subtitle">நிர்வாகி போர்டல் • உள்நுழைவு</p>
          </div>

          {/* PWA Install pill if accessible before login */}
          {isInstallable && (
            <div className="admin-pwa-quick-box">
              <Smartphone size={18} className="admin-pwa-icon" />
              <span>மொபைலில் செயலியாக நிறுவ வேண்டுமா?</span>
              <button
                type="button"
                className="btn btn-secondary admin-pwa-quick-btn"
                onClick={handleInstallApp}
              >
                நிறுவுக
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
                பயனர் பெயர் (Username)
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
                கடவுச்சொல் (Password)
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
                  aria-label={showPassword ? "கடவுச்சொல்லை மறை" : "கடவுச்சொல்லைக் காட்டு"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary admin-login-btn">
              <span>உள்நுழைக (Sign In)</span>
            </button>
          </form>

          {/* Helper Credentials Hint for Astrologer */}
          <div className="admin-credentials-hint">
            <strong>இயல்புநிலை அனுமதி விவரங்கள்:</strong>
            <p>
              பயனர் பெயர்: <code>admin</code>
            </p>
            <p>
              கடவுச்சொல்: <code>kmsastro@2026</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // ADMIN DASHBOARD SCREEN (100% TAMIL)
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
              <h1 className="admin-header-title">KMS ஜோதிடம்</h1>
              <span className="admin-header-badge">நிர்வாகி போர்டல்</span>
            </div>
          </div>

          <div className="admin-header-actions">
            {/* PWA Mobile App Install Button */}
            {!isAppInstalled && (
              <button
                type="button"
                className="btn btn-gold admin-install-btn"
                onClick={handleInstallApp}
                title="மொபைலில் இந்த செயலியை நிறுவவும்"
              >
                <Smartphone size={16} />
                <span>செயலியை நிறுவுக</span>
              </button>
            )}

            {isAppInstalled && (
              <div className="admin-installed-badge" title="செயலி நிறுவப்பட்டுள்ளது">
                <CheckCircle2 size={16} />
                <span>செயலி இயங்குகிறது</span>
              </div>
            )}

            {/* CSV Export */}
            <button
              type="button"
              className="btn btn-secondary admin-export-btn"
              onClick={() => exportLeadsToCSV(leads)}
              title="எல்லா கோரிக்கைகளையும் எக்செல் கோப்பாக பதிவிறக்குக"
            >
              <FileSpreadsheet size={16} />
              <span>எக்செல் (CSV)</span>
            </button>

            {/* Logout */}
            <button
              type="button"
              className="btn btn-secondary admin-logout-btn"
              onClick={handleLogout}
              title="வெளியேறு"
            >
              <LogOut size={16} />
              <span>வெளியேறு</span>
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
                <h2 className="admin-pwa-banner-title">
                  KMS நிர்வாகி செயலியை உங்கள் மொபைலில் நிறுவவும்
                </h2>
                <p className="admin-pwa-banner-desc">
                  உலாவிக்கு செல்லாமல், உங்கள் செல்போனின் முகப்புத் திரையிலிருந்தே ஒரே தொடுதலில் புதிய
                  ஜோதிடக் கோரிக்கைகளைக் கண்காணிக்கலாம்.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary admin-pwa-banner-btn"
              onClick={handleInstallApp}
            >
              <Download size={16} />
              <span>இப்போதே நிறுவுக (Install App)</span>
            </button>
          </div>
        )}

        {/* Metrics Cards */}
        <div className="admin-metrics-grid">
          <div className="admin-metric-card">
            <div className="admin-metric-header">
              <span className="admin-metric-label">மொத்தக் கோரிக்கைகள்</span>

            </div>
            <span className="admin-metric-number">{stats.total}</span>
            <span className="admin-metric-sub">வரப்பெற்ற அனைத்து பதிவுகள்</span>
          </div>

          <div className="admin-metric-card highlight-new">
            <div className="admin-metric-header">
              <span className="admin-metric-label">புதியவை (New)</span>
              <AlertCircle size={18} className="admin-metric-icon red" />
            </div>
            <span className="admin-metric-number">{stats.received}</span>
            <span className="admin-metric-sub">உடனடி கவனத்திற்குரியவை</span>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-header">
              <span className="admin-metric-label">தொடர்பு கொண்டவை</span>
              <Clock size={18} className="admin-metric-icon blue" />
            </div>
            <span className="admin-metric-number">{stats.contacted}</span>
            <span className="admin-metric-sub">பேச்சுவார்த்தையில் உள்ளவை</span>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-header">
              <span className="admin-metric-label">ஆலோசனை முடிந்தவை</span>
              <CheckCircle2 size={18} className="admin-metric-icon green" />
            </div>
            <span className="admin-metric-number">{stats.consulted}</span>
            <span className="admin-metric-sub">நிறைவு பெற்ற ஆலோசனைகள்</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="admin-controls-card">
          <div className="admin-search-box">
            <Search size={18} className="admin-search-icon" />
            <input
              type="text"
              className="form-input admin-search-input"
              placeholder="பெயர், கைப்பேசி எண், அல்லது விவரம் மூலம் தேடுக..."
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

          {/* Category Tabs */}
          <div className="admin-filter-row">
            <div className="admin-pill-group">
              <span className="admin-pill-label">பிரிவு:</span>
              <button
                type="button"
                className={`admin-pill ${categoryFilter === "all" ? "active" : ""}`}
                onClick={() => setCategoryFilter("all")}
              >
                அனைத்தும்
              </button>
              <button
                type="button"
                className={`admin-pill ${categoryFilter === "marriage" ? "active" : ""}`}
                onClick={() => setCategoryFilter("marriage")}
              >
                திருமணம்
              </button>
              <button
                type="button"
                className={`admin-pill ${categoryFilter === "education" ? "active" : ""}`}
                onClick={() => setCategoryFilter("education")}
              >
                கல்வி
              </button>
              <button
                type="button"
                className={`admin-pill ${categoryFilter === "business" ? "active" : ""}`}
                onClick={() => setCategoryFilter("business")}
              >
                தொழில்
              </button>
            </div>

            {/* Status Tabs */}
            <div className="admin-pill-group">
              <span className="admin-pill-label">நிலை:</span>
              <button
                type="button"
                className={`admin-pill ${statusFilter === "all" ? "active" : ""}`}
                onClick={() => setStatusFilter("all")}
              >
                அனைத்தும்
              </button>
              <button
                type="button"
                className={`admin-pill ${statusFilter === "received" ? "active" : ""}`}
                onClick={() => setStatusFilter("received")}
              >
                புதியவை ({stats.received})
              </button>
              <button
                type="button"
                className={`admin-pill ${statusFilter === "contacted" ? "active" : ""}`}
                onClick={() => setStatusFilter("contacted")}
              >
                தொடர்பு ({stats.contacted})
              </button>
              <button
                type="button"
                className={`admin-pill ${statusFilter === "consulted" ? "active" : ""}`}
                onClick={() => setStatusFilter("consulted")}
              >
                முடிந்தவை ({stats.consulted})
              </button>
            </div>

            {/* Refresh */}
            <button
              type="button"
              className="admin-refresh-btn"
              onClick={loadLeadsData}
              title="புதுப்பிக்கவும்"
            >
              <RefreshCw size={16} />
              <span>புதுப்பி</span>
            </button>
          </div>
        </div>

        {/* Leads Count Indicator */}
        <div className="admin-results-bar">
          <span>
            காட்டப்படும் கோரிக்கைகள்: <strong>{filteredLeads.length}</strong> / {leads.length}
          </span>
        </div>

        {/* Empty state */}
        {filteredLeads.length === 0 && (
          <div className="admin-empty-state">
            <AlertCircle size={40} className="admin-empty-icon" />
            <h3>கோரிக்கைகள் ஏதும் கிடைக்கவில்லை</h3>
            <p>தேடல் அல்லது வடிகட்டுதல் அமைப்புகளை மாற்றிப் பார்க்கவும்.</p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
                setStatusFilter("all");
              }}
            >
              அனைத்தையும் காட்டு
            </button>
          </div>
        )}

        {/* Leads Grid Cards */}
        <div className="admin-leads-list">
          {filteredLeads.map((item) => {
            const cleanDigits = item.normalizedDigits || item.mobileNumber?.replace(/\D/g, "");
            const waGreeting = encodeURIComponent(
              `வணக்கம் ${item.fullName}! KMS ஜோதிடத்தில் நீங்கள் பதிவு செய்த ${item.consultationCategory === "marriage"
                ? "திருமண"
                : item.consultationCategory === "education"
                  ? "கல்வி"
                  : "தொழில்"
              } ஜோதிட ஆலோசனைக் கோரிக்கை (எண்: ${item.leadId}) தொடர்பாக தொடர்பு கொள்கிறோம்.`
            );

            return (
              <div key={item.leadId} className={`admin-lead-card status-${item.status}`}>
                {/* Top Row: Lead ID, Category Badge, Status Badge */}
                <div className="admin-lead-top">
                  <div className="admin-lead-badges">
                    <span className="admin-id-badge">{item.leadId}</span>
                    <span className={`admin-cat-badge cat-${item.consultationCategory}`}>
                      {item.consultationCategory === "marriage"
                        ? "திருமண ஜோதிடம்"
                        : item.consultationCategory === "education"
                          ? "கல்வி ஜோதிடம்"
                          : "தொழில் ஜோதிடம்"}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="admin-status-dropdown-wrap">
                    <label htmlFor={`status-select-${item.leadId}`} className="sr-only">
                      நிலையை மாற்றவும்
                    </label>
                    <select
                      id={`status-select-${item.leadId}`}
                      className={`admin-status-select status-${item.status}`}
                      value={item.status || "received"}
                      onChange={(e) => handleStatusChange(item.leadId, e.target.value)}
                    >
                      <option value="received">🔴 புதியது (Received)</option>
                      <option value="contacted">🟡 தொடர்பு கொள்ளப்பட்டது</option>
                      <option value="consulted">🟢 ஆலோசனை வழங்கப்பட்டது</option>
                      <option value="closed">⚪ நிறைவுற்றது (Closed)</option>
                    </select>
                  </div>
                </div>

                {/* Main Client Info */}
                <div className="admin-lead-body">
                  <div className="admin-client-info">
                    <h3 className="admin-client-name">{item.fullName}</h3>
                    <div className="admin-client-time">
                      <Clock size={14} />
                      <span>
                        {item.submissionTimestamp
                          ? new Date(item.submissionTimestamp).toLocaleString("ta-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                          : "இன்று"}
                      </span>
                      <span className="admin-contact-pref">
                        • தொடர்பு வழி: <strong>{item.preferredContactMethod || "இரண்டும்"}</strong>
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
                      title="வாட்ஸ்அப் மூலம் தொடர்புகொள்ள"
                    >
                      <MessageCircle size={16} />
                      <span>வாட்ஸ்அப்</span>
                      <ExternalLink size={12} />
                    </a>

                    <a
                      href={`tel:+91${cleanDigits}`}
                      className="btn admin-call-btn"
                      title="தொலைபேசி அழைப்பு செய்ய"
                    >
                      <Phone size={16} />
                      <span>{item.mobileNumber}</span>
                    </a>
                  </div>
                </div>

                {/* Client's Concern Text */}
                {item.briefConcern && (
                  <div className="admin-concern-box">
                    <span className="admin-concern-label">வாடிக்கையாளர் கேள்வி / குறிப்பு:</span>
                    <p className="admin-concern-text">{item.briefConcern}</p>
                  </div>
                )}

                {/* Astrologer Private Notes Box */}
                <div className="admin-notes-section">
                  <label
                    htmlFor={`notes-input-${item.leadId}`}
                    className="admin-notes-label"
                  >
                    ஜோதிடரின் குறிப்புகள் (Private Notes):
                  </label>
                  <div className="admin-notes-row">
                    <input
                      id={`notes-input-${item.leadId}`}
                      type="text"
                      className="form-input admin-notes-input"
                      placeholder="எ.கா: நேரம் ஒதுக்கப்பட்டுள்ளது / ஜாதகம் பெறப்பட்டது..."
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
                      <span>சேமி</span>
                    </button>
                    {savedNoteFeedback[item.leadId] && (
                      <span className="admin-saved-badge">சேமிக்கப்பட்டது! ✓</span>
                    )}
                  </div>
                </div>

                {/* Delete / Actions Footer */}
                <div className="admin-lead-footer">
                  {deleteConfirmId === item.leadId ? (
                    <div className="admin-delete-confirm">
                      <span>நிச்சயமாக நீக்கவா?</span>
                      <button
                        type="button"
                        className="admin-del-yes"
                        onClick={() => handleDeleteConfirm(item.leadId)}
                      >
                        ஆம், நீக்கு
                      </button>
                      <button
                        type="button"
                        className="admin-del-no"
                        onClick={() => setDeleteConfirmId(null)}
                      >
                        வேண்டாம்
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="admin-delete-trigger"
                      onClick={() => setDeleteConfirmId(item.leadId)}
                      title="இந்த பதிவை நீக்கு"
                    >
                      <Trash2 size={14} />
                      <span>நீக்கு</span>
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
