import * as React from "react";

function SvgGy(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={500} height={300} {...props}>
      <path fill="#009e49" d="M0 0h500v300H0z" />
      <path d="M0 0l500 150L0 300z" fill="#fff" />
      <path d="M0 13.05L456 150 0 286.95z" fill="#fcd116" />
      <path d="M0 0l250 150L0 300z" />
      <path d="M0 17.5L220.85 150 0 282.5z" fill="#ce1126" />
    </svg>
  );
}

export default SvgGy;
