import * as React from "react";

function SvgCr(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1000}
      height={600}
      viewBox="0 0 10 6"
      {...props}
    >
      <path d="M0 0h10v6H0z" fill="#002b7f" />
      <path d="M0 1h10v4H0z" fill="#fff" />
      <path d="M0 2h10v2H0z" fill="#ce1126" />
    </svg>
  );
}

export default SvgCr;
