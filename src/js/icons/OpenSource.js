import * as React from "react"

const OpenSource = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 980 310"
        width={1306.667}
        height={413.333}
        {...props}
    >
        <defs>
            <clipPath id="A">
                <path d="M0 0h980v310H0z" />
            </clipPath>
            <style>
                {
                    '@font-face{font-family:"Ubuntu";src:url(data:application/font-woff;charset=utf-8;base64,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) format("woff");font-weight:400;font-style:normal}@font-face{font-family:"Ubuntu";src:url(data:application/font-woff;charset=utf-8;base64,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) format("woff");font-weight:700;font-style:normal}'
                }
            </style>
        </defs>
        <g clipPath="url(#A)">
            <path
                d="m327.51 299.47-27.14-27.19H59.84l-45.7-45.7V84.48l44.41-44.42H297.4l24.52-24.52h585.04l41.11 41.15v195.7l-19.9 19.89H711.65l-27.14 27.14-354.9.05h-2.1z"
                fill="#1a1a1a"
            />
            <g fill="#fff">
                <path d="m905.84 18.23 39.54 39.58v193.47l-18.32 18.32H710.54l-27.14 27.14-353.78.04h-.99l-27.14-27.18H60.95l-44.13-44.13V85.59l42.84-42.84h238.85l24.52-24.52h582.81zm2.23-5.37H320.82l-1.57 1.57-22.95 22.95H57.45l-1.57 1.57-42.84 42.84-1.57 1.57v144.32l1.57 1.57 44.13 44.13 1.57 1.57h240.52l25.57 25.61 1.57 1.58H329.62l353.78-.04h2.22l1.57-1.57 25.57-25.57h216.52l1.57-1.57 18.32-18.32 1.57-1.57V55.58l-1.57-1.57-39.54-39.58-1.56-1.57z" />
                <path d="M341.95 1.85h367.36l14.05 14.06H325.42m-61.24 253.85h33.61l31.16 31.16 357.76.01v5.35H300.7l-36.52-36.52zm65.92 9.12h359.94l-7.25 7.25H337.35l-7.25-7.25z" />
            </g>
            <path
                d="m927.07 253.98-.01 7.36h-223.1l-8.09 8.09H324.29l-8.09-8.09H60.95v-7.36h866.12zm-215.39 19.05h217l19.87-19.87V64.24l8.35 8.36v100.81l14.79 14.79v75.54l-30.02 30.02H840.35l-14.39 14.39h-59.23l-16.21-16.2h-57.78l18.94-18.92zM397.41 29.72h417.7v6.97h-417.7zM204.69 68.3H87.19L59.93 95.56h117.51l27.25-27.26zm57.61 0-27.26 27.26H202.3l27.26-27.26h32.74zm57.6 0-27.26 27.26h-32.73l27.26-27.26h32.73zm57.6 0-27.26 27.26h-32.73l27.26-27.26h32.73zm57.6 0-27.26 27.26h-32.73l27.26-27.26h32.73zm57.61 0-27.26 27.26h-32.74l27.26-27.26h32.74z"
                fill="#1d319f"
            />
            <path
                d="M704.1 232.47a5.06 5.06 0 0 0-5.06 5.06 5.07 5.07 0 0 0 5.06 5.06 5.06 5.06 0 1 0 0-10.12zm3.53 6.05h-2.46v2.53h-2.13v-2.53h-2.46v-2h2.46V234h2.13v2.53h2.46v1.99z"
                fill="#fff"
            />
            <circle
                vectorEffect="non-scaling-stroke"
                cx={704.1}
                cy={237.53}
                r={7.58}
                fill="none"
                strokeWidth={1.489}
                stroke="#fff"
            />
            <path fill="#1d319f" d="M523.26 49.53h380.43v60.33H523.26z" />
            <mask id="B" x="-200%" y="-200%" width="400%" height="400%">
                <path d="M-1960-620h3920V620h-3920z" fill="#fff" />
                <path d="M8.31 213.16V95.56" />
            </mask>
            <path
                mask="url(#B)"
                vectorEffect="non-scaling-stroke"
                strokeWidth={21.478}
                stroke="#fff"
                strokeMiterlimit={10}
                d="M8.31 213.16V95.56"
            />
            <path
                d="M823 182.753c.653-28.743 20.577-48.993 45.074-52.26 29.396-3.919 53.893 16.005 58.466 42.461 4.573 25.151-9.146 48.341-32.009 57.813-1.96.653-2.94.327-3.92-1.633l-11.432-29.396c-.653-1.633-.326-2.94 1.634-3.593 5.225-2.287 8.165-6.206 9.145-11.759 1.306-8.492-4.899-16.658-13.718-17.311-7.839-.653-15.025 4.9-16.331 12.739-.98 6.859 2.286 13.391 8.818 16.331 1.96.98 2.287 1.96 1.634 3.919l-11.106 29.396c-.653 1.307-1.633 1.96-3.266 1.307-12.085-4.573-21.884-13.718-27.436-25.15-5.226-10.452-5.226-18.291-5.553-22.864zm4.246-.326c0 1.306 0 2.939.327 4.572 1.306 15.025 10.452 30.376 27.763 38.542.653.327.98.327 1.306-.327 3.267-8.165 6.206-16.658 9.472-24.823.327-.653 0-.98-.653-1.307-6.532-4.246-10.125-10.125-9.472-18.291.327-4.572 1.96-8.492 4.899-11.758 6.206-6.859 16.332-8.492 24.497-3.593 6.859 3.92 10.452 11.432 9.472 18.944-.653 6.533-3.919 11.432-9.798 14.698-.654.327-.654.654-.327 1.307 3.266 8.165 6.532 16.658 9.472 24.823.327.654.653.654 1.307.327 7.512-3.593 13.718-8.492 18.617-15.025 7.186-10.125 10.452-21.557 8.819-33.969-3.266-24.823-25.477-45.4-54.22-41.808-22.21 2.613-41.154 21.558-41.481 47.688z"
                fill="#fff"
            />
            <g clipPath="url(#C)">
                <text
                    transform="translate(60 158.144)"
                    fontFamily="Ubuntu"
                    fontSize={42}
                    fill="#fff"
                >
                    {"VISIBLE AND OPEN SOURCE CODE"}
                </text>
            </g>
            <defs>
                <clipPath id="C">
                    <path transform="translate(60 119)" d="M0 0h711v52.3H0z" />
                </clipPath>
            </defs>
            <g clipPath="url(#D)">
                <text
                    transform="translate(590.416 97.597)"
                    fontFamily="Ubuntu"
                    fontWeight={700}
                    fontSize={48}
                    fill="#fff"
                >
                    {"WARNING "}
                </text>
            </g>
            <defs>
                <clipPath id="D">
                    <path transform="translate(523 49.53)" d="M0 0h380v60.47H0z" />
                </clipPath>
            </defs>
            <g clipPath="url(#E)">
                <text
                    transform="translate(60 193.668)"
                    fontFamily="Ubuntu"
                    fontSize={24}
                    fill="#fff"
                >
                    {"MORE EYES, MORE TRUST."}
                </text>
            </g>
            <defs>
                <clipPath id="E">
                    <path transform="translate(60 171.3)" d="M0 0h711v39.216H0z" />
                </clipPath>
            </defs>
            <g clipPath="url(#F)">
                <text
                    transform="translate(718.255 242.427)"
                    fontFamily="Ubuntu"
                    fontWeight={700}
                    fontSize={14}
                    fill="#fff"
                >
                    {"SAFETY FIRST"}
                </text>
            </g>
            <defs>
                <clipPath id="F">
                    <path transform="translate(718.255 226.453)" d="M0 0h141v21.547H0z" />
                </clipPath>
            </defs>
        </g>
    </svg>
)

export default OpenSource