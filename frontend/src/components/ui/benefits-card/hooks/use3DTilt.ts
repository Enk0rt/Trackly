import { useRef } from "react";

export const use3DTilt = (baseSkew: string) => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const wrap = wrapRef.current;
        const card = cardRef.current;
        if (!wrap || !card) return;

        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const max = 10;
        const rotateX = Math.max(-max, Math.min(max, ((y - cy) / cy) * max));
        const rotateY = Math.max(-max, Math.min(max, ((x - cx) / cx) * max));

        card.style.transform = `${baseSkew} rotateX(${-rotateX}deg) rotateY(${rotateY}deg`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = `${baseSkew}` ;
    };

    return { wrapRef, cardRef, handleMouseMove, handleMouseLeave };
};