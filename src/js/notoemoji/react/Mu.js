import * as React from "react";

function SvgMu(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={450}
      height={300}
      viewBox="0 0 6 4"
      {...props}
    >
      <path fill="#00A551" d="M0 0h6v4H0z" />
      <path fill="#FFD500" d="M0 0h6v3H0z" />
      <path fill="#1A206D" d="M0 0h6v2H0z" />
      <path fill="#EA2839" d="M0 0h6v1H0z" />
    </svg>
  );
}

export default SvgMu;
