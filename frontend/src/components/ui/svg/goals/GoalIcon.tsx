import * as React from "react";

type Props = React.SVGProps<SVGSVGElement>;

const GoalIcon: React.FC<Props> = (props) => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g clipPath="url(#clip0_240_80)">
            <path
                d="M15 0C6.71531 0.00105469 0.00105469 6.71473 0 15C0.00105469 23.2847 6.71531 29.9989 15 30C23.2847 29.9989 29.9989 23.2847 30 15C29.9989 6.71473 23.2847 0.00105469 15 0ZM23.7127 23.7127C21.4782 25.9445 18.4068 27.3204 15 27.3214C11.5932 27.3204 8.52123 25.9445 6.28729 23.7127C4.05551 21.4788 2.67914 18.4068 2.67855 15C2.67908 11.5932 4.05551 8.52123 6.28729 6.28729C8.52123 4.05551 11.5932 2.67914 15 2.67855C18.4068 2.67908 21.4783 4.05551 23.7127 6.28729C25.9444 8.52123 27.3209 11.5932 27.3214 15C27.3209 18.4068 25.9445 21.4788 23.7127 23.7127Z"
                fill="currentColor" />
            <path d="M10.8496 9.68726V21.857H12.371V16.5328H20.357V9.68726H12.371H10.8496Z" fill="currentColor" />
        </g>
        <defs>
            <clipPath id="clip0_240_80">
                <rect width="30" height="30" fill="currentColor" />
            </clipPath>
        </defs>
    </svg>


);

export default GoalIcon;
