import * as React from "react";

function SvgCm(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={600}
      height={400}
      viewBox="0 0 90 60"
      {...props}
    >
      <path fill="#007a5e" d="M0 0h90v60H0z" />
      <path fill="#ce1126" d="M30 0h60v60H30z" />
      <path fill="#fcd116" d="M60 0h30v60H60z" />
      <g transform="translate(45 30)" fill="#fcd116">
        <g id="CM_svg__b">
          <path id="CM_svg__a" d="M0-8v8h4z" transform="rotate(18 0 -8)" />
          <use xlinkHref="#CM_svg__a" transform="scale(-1 1)" />
        </g>
        <use xlinkHref="#CM_svg__b" transform="rotate(72)" />
        <use xlinkHref="#CM_svg__b" transform="rotate(144)" />
        <use xlinkHref="#CM_svg__b" transform="rotate(216)" />
        <use xlinkHref="#CM_svg__b" transform="rotate(288)" />
      </g>
    </svg>
  );
}

export default SvgCm;
