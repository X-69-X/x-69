import * as React from "react";

function SvgBj(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={450}
      height={300}
      viewBox="0 0 15 10"
      {...props}
    >
      <path fill="#E8112D" d="M0 0h15v10H0z" />
      <path fill="#FCD116" d="M0 0h15v5H0z" />
      <path fill="#008751" d="M0 0h6v10H0z" />
    </svg>
  );
}

export default SvgBj;
