import * as React from "react";

function SvgKg(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={750}
      height={450}
      viewBox="0 0 250 150"
      {...props}
    >
      <clipPath id="KG_svg__d">
        <circle r={25} />
      </clipPath>
      <path fill="#e8112d" d="M0 0h250v150H0z" />
      <g transform="translate(125 75)">
        <g id="KG_svg__c" transform="scale(.25)">
          <g id="KG_svg__b">
            <path
              id="KG_svg__a"
              d="M-8.4 108C0 130-18 164 0 180c-6-24 14-50 8.4-72s-25.2-22-16.8 0z"
              fill="#ffef00"
            />
            <use xlinkHref="#KG_svg__a" transform="rotate(90)" />
            <use xlinkHref="#KG_svg__a" transform="rotate(180)" />
            <use xlinkHref="#KG_svg__a" transform="rotate(270)" />
          </g>
          <use xlinkHref="#KG_svg__b" transform="rotate(18)" />
          <use xlinkHref="#KG_svg__b" transform="rotate(36)" />
          <use xlinkHref="#KG_svg__b" transform="rotate(54)" />
          <use xlinkHref="#KG_svg__b" transform="rotate(72)" />
        </g>
        <use xlinkHref="#KG_svg__c" transform="rotate(9)" />
        <circle r={27} fill="#e8112d" />
        <circle cy={-1.5} r={22.5} fill="#ffef00" />
        <g id="KG_svg__e" fill="#e8112d" clipPath="url(#KG_svg__d)">
          <path d="M-23.055 18a37.755 37.755 0 1175.51 0h.305a36.26 36.26 0 10-72.52 0z" />
          <path d="M-17.601 18A35.301 35.301 0 1153 18h.424a33.925 33.925 0 10-67.85 0z" />
          <path d="M20.7-15.052a33.052 33.052 0 100 66.104l1.8-1.232a31.82 31.82 0 110-63.64z" />
        </g>
        <use xlinkHref="#KG_svg__e" transform="scale(-1 1)" />
      </g>
    </svg>
  );
}

export default SvgKg;
