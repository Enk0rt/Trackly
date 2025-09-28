import * as React from "react";

type Props = React.SVGProps<SVGSVGElement>;

const CheckboxIcon: React.FC<Props> = (props) => (

    <svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" id="check-mark-square"
         xmlns="http://www.w3.org/2000/svg" className="icon line" {...props}>
        <path id="primary"
              d="M20,21H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3H20a1,1,0,0,1,1,1V20A1,1,0,0,1,20,21ZM16,9.5l-5,5-3-3"
              fill='none' stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
    </svg>

);

export default CheckboxIcon;
