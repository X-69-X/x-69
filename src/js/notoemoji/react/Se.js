import * as React from "react";

function SvgSe(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1600}
      height={1000}
      viewBox="0 0 16 10"
      {...props}
    >
      <path fill="#006aa7" d="M0 0h16v10H0z" />
      <path fill="#fecc00" d="M5 0h2v10H5z" />
      <path fill="#fecc00" d="M0 4h16v2H0z" />
    </svg>
  );
}

export default SvgSe;
