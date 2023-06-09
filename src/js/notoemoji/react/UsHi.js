import * as React from "react";

function SvgUsHi(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1200}
      height={600}
      viewBox="0 0 48 24"
      {...props}
    >
      <clipPath id="US-HI_svg__a">
        <path d="M0 0v6h22v6h-1zm21 0H10.5v13H0v-1z" />
      </clipPath>
      <path fill="#00247d" d="M0 0h48v24H0z" />
      <path d="M0 0l21 12m0-12L0 12" stroke="#fff" strokeWidth={2.4} />
      <path
        d="M0 0l21 12m0-12L0 12"
        stroke="#cf142b"
        strokeWidth={1.6}
        clipPath="url(#US-HI_svg__a)"
      />
      <path d="M10.5 0v15M0 6h24" stroke="#fff" strokeWidth={4} />
      <path d="M10.5 0v15M0 6h24" stroke="#cf142b" strokeWidth={2.4} />
      <path d="M21 12V9l3-3-3-3V0h27v24H0v-6z" fill="#fff" />
      <path d="M21 6v3h27V3zM0 15v3h48v-6z" fill="#00247d" />
      <path d="M21 4.5h27m-48 9h48m-48 9h48" stroke="#cf142b" strokeWidth={3} />
    </svg>
  );
}

export default SvgUsHi;
