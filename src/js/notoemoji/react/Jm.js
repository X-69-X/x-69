import * as React from "react";

function SvgJm(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={600}
      height={300}
      viewBox="0 0 12 6"
      {...props}
    >
      <path fill="#009B3A" d="M0 0h12v6H0" />
      <path stroke="#FED100" d="M-6 9L18-3V9L-6-3" />
    </svg>
  );
}

export default SvgJm;
