import * as React from "react";

function SvgBd(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={500}
      height={300}
      viewBox="0 0 20 12"
      {...props}
    >
      <path fill="#006a4e" d="M0 0h20v12H0z" />
      <circle cx={9} cy={6} r={4} fill="#f42a41" />
    </svg>
  );
}

export default SvgBd;
