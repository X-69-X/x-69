import * as React from "react";

function SvgIs(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={800} height={576} {...props}>
      <path d="M0 0h800v576H0" fill="#02529C" />
      <path d="M224 0h128v576H224M0 224h800v128H0" fill="#FFF" />
      <path d="M256 0h64v576h-64M0 256h800v64H0" fill="#DC1E35" />
    </svg>
  );
}

export default SvgIs;
