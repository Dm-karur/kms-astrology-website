import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAF5EB",
          color: "#38251D",
          padding: "2rem",
          textAlign: "center",
          fontFamily: "system-ui, sans-serif"
        }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#8C6834" }}>
            பக்கத்தை ஏற்றுவதில் தற்காலிகப் பிழை ஏற்பட்டது / A temporary error occurred
          </h2>
          <p style={{ maxWidth: "500px", marginBottom: "1.5rem", color: "#665044", lineHeight: 1.6 }}>
            தயவுசெய்து பக்கத்தைப் புதுப்பிக்கவும் அல்லது முகப்புப் பக்கத்திற்குச் செல்லவும்.
            (Please refresh the page or return home.)
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={this.handleReload}
              style={{
                backgroundColor: "#38251D",
                color: "#FFFDF9",
                border: "none",
                borderRadius: "8px",
                padding: "0.75rem 1.5rem",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              பக்கத்தைப் புதுப்பி (Refresh)
            </button>
            <a
              href="/"
              style={{
                backgroundColor: "#B08A50",
                color: "#FFFDF9",
                borderRadius: "8px",
                padding: "0.75rem 1.5rem",
                textDecoration: "none",
                fontWeight: 600
              }}
            >
              முகப்புப் பக்கம் (Home)
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
