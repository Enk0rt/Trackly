"use client";
import React, { useRef } from "react";
import Image from "next/image";

export default function Mockup() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const wrap = wrapRef.current;
        const img = imgRef.current;
        if (!wrap || !img) return;

        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const max = 10; // кут нахилу
        const rotateX = Math.max(-max, Math.min(max, ((y - cy) / cy) * max));
        const rotateY = Math.max(-max, Math.min(max, ((x - cx) / cx) * max));

        img.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    };

    const handleMouseLeave = () => {
        const img = imgRef.current;
        if (!img) return;
        img.style.transform = "rotateX(0deg) rotateY(0deg)";
    };

    return (
        <div
            ref={wrapRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="
        relative
        [perspective:1200px]
        animate-float
        will-change-transform
      "
        >
            <div
                ref={imgRef}
                className="transition-transform duration-300 ease-out will-change-transform transform-gpu"
                style={{ transform: "rotateX(0) rotateY(0)" }}
            >
                <Image
                    src="/mokup.png"
                    alt="App Mockup"
                    width={800}
                    height={800}
                    className="w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] md:w-[760px] md:h-[760px] lg:w-[800px] lg:h-[400px] top-[100px] object-cover
                               xl:mt-8
                               lg:object-contain
                               skew-x-[40deg] skew-y-[-8deg]
                              "
                />
            </div>
        </div>
    );
}