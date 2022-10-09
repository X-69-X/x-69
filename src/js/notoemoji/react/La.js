import * as React from "react";

function SvgLa(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={600} height={400} {...props}>
      <path fill="#ce1126" d="M0 0h600v400H0z" />
      <path fill="#002868" d="M0 100h600v200H0z" />
      <circle fill="#fff" cx={300} cy={200} r={80} />
    </svg>
  );
}

export default SvgLa;