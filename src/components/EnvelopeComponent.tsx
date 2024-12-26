import React from "react";

const EnvelopeComponent = ({ recipient = "아무개" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 768"
      width="100%"
      height="100%"
    >
      {/* Background Rectangle */}
      <rect width="1024" height="768" fill="#ffffff" />

      {/* Envelope Shape */}
      <path
        d="M512 128L128 320V640H896V320L512 128Z"
        fill="#e0e0e0"
        stroke="#000"
        strokeWidth="2"
      />

      {/* Address Lines */}
      <line x1="256" y1="400" x2="768" y2="400" stroke="#000" strokeWidth="1" />
      <line x1="256" y1="450" x2="768" y2="450" stroke="#000" strokeWidth="1" />
      <line x1="256" y1="500" x2="768" y2="500" stroke="#000" strokeWidth="1" />

      {/* Recipient Name */}
      <text
        x="50%"
        y="350"
        textAnchor="middle"
        fill="#000"
        fontSize="24"
        fontWeight="bold"
        dominantBaseline="middle"
      >
        {recipient}
      </text>
    </svg>
  );
};

export default EnvelopeComponent;
