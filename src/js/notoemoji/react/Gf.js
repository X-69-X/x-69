import * as React from "react";

function SvgGf(props) {
  return (
    <svg width={900} height={600} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#078930" d="M0 0h900v600z" />
      <path fill="#FCDD09" d="M0 0l900 600H0z" />
      <path
        fill="#DA121A"
        d="M450 200l58.779 180.902-153.885-111.804h190.212L391.22 380.902z"
      />
    </svg>
  );
}

export default SvgGf;
