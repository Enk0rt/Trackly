import UIIcon from "@/components/ui/svg/other/UIIcon";
import { FC, SVGProps } from "react";
import CustomizationIcon from "@/components/ui/svg/other/CustomizationIcon";
import ChartIcon from "@/components/ui/svg/other/ChartIcon";

type Benefit = {
    icon: FC<SVGProps<SVGSVGElement>>;
    title: string;
    iconLabel: string;
    text: string;
};

export const benefits: Benefit[] = [
    {
        icon: UIIcon,
        title: "Simple UI",
        iconLabel: "UI icon",
        text: "Minimal, distraction-free design helps you focus on what matters",
    },
    {
        icon: CustomizationIcon,
        title: "Customization",
        iconLabel: "Customization icon",
        text: "Create your own habits and goals to track your success",
    },
    {
        icon: ChartIcon,
        title: "Progress Tracking",
        iconLabel:"Progress Tracking icon",
        text: "Follow the progress with charts and daily statistics",
    },
];