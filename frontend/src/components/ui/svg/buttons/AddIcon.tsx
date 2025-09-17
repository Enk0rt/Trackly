import * as React from "react";

type Props = React.SVGProps<SVGSVGElement>;

const UIIcon: React.FC<Props> = (props) => (

    <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g clipPath="url(#clip0_111_1310)">
            <path d="M15.7752 13.0953H12.7002M12.7002 13.0953H9.62524M12.7002 13.0953V10.0203M12.7002 13.0953V16.1703"
                  stroke="currentColor" strokeWidth="2.5625" strokeLinecap="round" />
            <path
                d="M7.57519 4.21648C9.08284 3.34436 10.8333 2.84521 12.7002 2.84521C18.3611 2.84521 22.9502 7.43429 22.9502 13.0952C22.9502 18.7561 18.3611 23.3452 12.7002 23.3452C7.03927 23.3452 2.4502 18.7561 2.4502 13.0952C2.4502 11.2283 2.94934 9.47786 3.82146 7.97021"
                stroke="currentColor" strokeWidth="2.5625" strokeLinecap="round" />
        </g>
        <defs>
            <clipPath id="clip0_111_1310">
                <rect width="24.6" height="24.6" fill="white" transform="translate(0.399902 0.79541)" />
            </clipPath>
        </defs>
    </svg>

);

export default UIIcon;
