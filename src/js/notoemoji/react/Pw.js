import * as React from "react";

function SvgPw(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={800} height={500} {...props}>
      <path fill="#4AADD6" d="M0 0h800v500H0z" />
      <circle fill="#FFDE00" cx={350} cy={250} r={150} />
    </svg>
  );
}

export default SvgPw;
