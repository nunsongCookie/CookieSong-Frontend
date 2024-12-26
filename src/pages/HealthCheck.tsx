import React from "react";

const HealthCheck: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f3f3f3",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#0a70d9", fontSize: "2rem" }}>Health Check</h1>
      <p style={{ color: "#333", fontSize: "1rem" }}>
        Health Check 페이지
      </p>
    </div>
  );
};

export default HealthCheck;
