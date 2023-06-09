import * as React from "react";

function SvgQa(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1400}
      height={550}
      viewBox="0 0 75 18"
      preserveAspectRatio="none"
      {...props}
    >
      <path fill="#8d1b3d" d="M0 0h75v18H0z" />
      <path
        d="M22 18H0V0h22l6 1-6 1 6 1-6 1 6 1-6 1 6 1-6 1 6 1-6 1 6 1-6 1 6 1-6 1 6 1-6 1 6 1z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgQa;
