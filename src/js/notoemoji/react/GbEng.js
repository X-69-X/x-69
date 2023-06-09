import * as React from "react";

function SvgGbEng(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 15"
      width={800}
      height={480}
      {...props}
    >
      <path fill="#FFF" d="M0 0h25v15H0z" />
      <g fill="#CD202C">
        <path d="M11 0h3v15h-3z" />
        <path d="M0 6h25v3H0z" />
      </g>
    </svg>
  );
}

export default SvgGbEng;
