import * as React from "react";

function SvgCo(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={450}
      height={300}
      viewBox="0 0 6 4"
      {...props}
    >
      <path fill="#CE1126" d="M0 0h6v4H0z" />
      <path fill="#003893" d="M0 0h6v3H0z" />
      <path fill="#FCD116" d="M0 0h6v2H0z" />
    </svg>
  );
}

export default SvgCo;
