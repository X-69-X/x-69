import * as React from "react";

function SvgCi(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={450} height={300} {...props}>
      <path fill="#009E60" d="M0 0h450v300H0z" />
      <path fill="#FFF" d="M0 0h300v300H0z" />
      <path fill="#F77F00" d="M0 0h150v300H0z" />
    </svg>
  );
}

export default SvgCi;
