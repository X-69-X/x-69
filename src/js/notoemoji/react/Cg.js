import * as React from "react";

function SvgCg(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={600}
      height={400}
      viewBox="0 0 3 2"
      {...props}
    >
      <path fill="#009543" d="M0 0h3v2H0z" />
      <path d="M0 2l2-2h1v2z" fill="#FBDE4A" />
      <path d="M3 0v2H1z" fill="#DC241F" />
    </svg>
  );
}

export default SvgCg;
