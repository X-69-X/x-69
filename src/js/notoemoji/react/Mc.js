import * as React from "react";

function SvgMc(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={750} height={600} {...props}>
      <path fill="#FFF" d="M0 0h750v600H0z" />
      <path fill="#CE1126" d="M0 0h750v300H0z" />
    </svg>
  );
}

export default SvgMc;
