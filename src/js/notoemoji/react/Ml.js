import * as React from "react";

function SvgMl(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={450} height={300} {...props}>
      <path fill="#CE1126" d="M0 0h450v300H0z" />
      <path fill="#FCD116" d="M0 0h300v300H0z" />
      <path fill="#14B53A" d="M0 0h150v300H0z" />
    </svg>
  );
}

export default SvgMl;
