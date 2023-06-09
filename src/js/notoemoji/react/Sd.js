import * as React from "react";

function SvgSd(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={600}
      height={300}
      viewBox="0 0 12 6"
      {...props}
    >
      <path d="M0 0h12v6H0z" />
      <path fill="#FFF" d="M0 0h12v4H0z" />
      <path fill="#D21034" d="M0 0h12v2H0z" />
      <path fill="#007229" d="M0 0l4 3-4 3z" />
    </svg>
  );
}

export default SvgSd;
