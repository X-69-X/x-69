import * as React from "react";

function SvgDk(props) {
  return (
    <svg height={560} width={740} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#C60C30" d="M0 0h740v560H0z" />
      <path fill="#FFF" d="M240 0h80v560h-80z" />
      <path fill="#FFF" d="M0 240h740v80H0z" />
    </svg>
  );
}

export default SvgDk;
