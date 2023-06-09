import * as React from "react";

function SvgLt(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={500}
      height={300}
      viewBox="0 0 5 3"
      {...props}
    >
      <path fill="#C1272D" d="M0 0h5v3H0z" />
      <path fill="#006A44" d="M0 0h5v2H0z" />
      <path fill="#FDB913" d="M0 0h5v1H0z" />
    </svg>
  );
}

export default SvgLt;
