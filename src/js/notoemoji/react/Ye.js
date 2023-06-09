import * as React from "react";

function SvgYe(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={450} height={300} {...props}>
      <path d="M0 0h450v300H0z" />
      <path fill="#FFF" d="M0 0h450v200H0z" />
      <path fill="#CE1126" d="M0 0h450v100H0z" />
    </svg>
  );
}

export default SvgYe;
