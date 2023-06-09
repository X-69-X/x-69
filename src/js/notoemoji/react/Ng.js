import * as React from "react";

function SvgNg(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 6 3"
      width={800}
      height={400}
      {...props}
    >
      <path fill="#008751" d="M0 0h6v3H0z" />
      <path fill="#FFF" d="M2 0h2v3H2z" />
    </svg>
  );
}

export default SvgNg;
