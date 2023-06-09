import * as React from "react";

function SvgSi(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={600}
      width={1200}
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 12 6"
      {...props}
    >
      <path fill="#ed1c24" d="M0 0h12v6H0z" />
      <path fill="#005da4" d="M0 0h12v4H0z" />
      <path fill="#fff" d="M0 0h12v2H0z" />
      <svg
        width={12}
        viewBox="-120 -190.223 240 309.188"
        height={15.459}
        transform="translate(2.224 1) scale(.12937)"
        {...props}
      >
        <path
          d="M110.26-19.478l9.74-143.75a280.22 280.22 0 00-240 0l9.74 143.75A155.61 155.61 0 000 118.972a155.61 155.61 0 00110.26-138.45"
          fill="#005da4"
        />
        <path
          d="M-90 0A138.29 138.29 0 000 100.77 138.29 138.29 0 0090 0L45-60 27-36 0-90l-27 54-18-24-45 60"
          fill="#fff"
        />
        <path
          d="M-17.196-2.196A6 6 0 00-9 0a6 6 0 016 0 6 6 0 006 0 6 6 0 016 0 6 6 0 008.196-2.196v1.732A6 6 0 019 1.732a6 6 0 00-6 0 6 6 0 01-6 0 6 6 0 00-6 0 6 6 0 01-8.196-2.196z"
          transform="matrix(5 0 0 5 0 25.981)"
          id="SI_svg__a"
          fill="#005da4"
        />
        <use xlinkHref="#SI_svg__a" transform="translate(0 17.321)" />
        <path
          strokeWidth={0.2}
          d="M0-5l1 3.268L4.33-2.5 2 0l2.33 2.5L1 1.732 0 5l-1-3.268-3.33.768L-2 0l-2.33-2.5 3.33.768z"
          fill="#fd0"
          transform="matrix(2.25 0 0 2.25 0 -120)"
          id="SI_svg__b"
        />
        <use xlinkHref="#SI_svg__b" transform="translate(-33.75 -45)" />
        <use xlinkHref="#SI_svg__b" transform="translate(33.75 -45)" />
        <path
          d="M-111.58-167.05l9.96 146.99A146.95 146.95 0 000 109.89 146.95 146.95 0 00101.62-20.06l9.96-146.99a280.22 280.22 0 008.42 3.82l-9.74 143.75A155.61 155.61 0 010 118.97 155.61 155.61 0 01-110.26-19.48L-120-163.23a280.22 280.22 0 008.42-3.82"
          fill="#ed1c24"
        />
      </svg>
    </svg>
  );
}

export default SvgSi;
