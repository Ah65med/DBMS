"use client";

import type { PropsWithChildren } from "react";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";
import { cn } from "~/lib/utils";

export const WavyBackground = ({
	children,
	className,
	containerClassName,
	colors,
	waveWidth,
	blur = 10,
	speed = "fast",
	waveOpacity = 0.5,
}: PropsWithChildren<{
	className?: string;
	containerClassName?: string;
	colors?: string[];
	waveWidth?: number;
	blur?: number;
	speed?: "slow" | "fast";
	waveOpacity?: number;
}>) => {
	const { resolvedTheme } = useTheme();

	const noise = createNoise3D();
	let w = 0;
	let h = 0;
	let nt = 0;
	let i = 0;
	let x = 0;
	let ctx: CanvasRenderingContext2D | null | undefined = null;
	let canvas: HTMLCanvasElement | null = null;

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const getSpeed = () => {
		switch (speed) {
			case "slow":
				return 0.001;
			case "fast":
				return 0.002;
			default:
				return 0.001;
		}
	};

	const init = useCallback(() => {
		canvas = canvasRef.current;
		ctx = canvas?.getContext("2d");

		if (!ctx) {
			return;
		}

		w = ctx.canvas.width = window.innerWidth;
		h = ctx.canvas.height = window.innerHeight;
		ctx.filter = `blur(${blur}px)`;
		nt = 0;
		window.onresize = () => {
			if (!ctx) {
				return;
			}

			w = ctx.canvas.width = window.innerWidth;
			h = ctx.canvas.height = window.innerHeight;
			ctx.filter = `blur(${blur}px)`;
		};
		render();
	}, [blur, canvas, ctx, h, nt, w]);

	const waveColors = colors ?? [
		"#38bdf8",
		"#818cf8",
		"#c084fc",
		"#e879f9",
		"#22d3ee",
	];
	const drawWave = (n: number) => {
		nt += getSpeed();
		for (i = 0; i < n; i++) {
			if (!ctx) {
				return;
			}

			ctx.beginPath();
			ctx.lineWidth = waveWidth || 50;
			ctx.strokeStyle = waveColors[i % waveColors.length];
			for (x = 0; x < w; x += 5) {
				const y = noise(x / 800, 0.3 * i, nt) * 100;
				ctx.lineTo(x, y + h * 0.5); // adjust for height, currently at 50% of the container
			}
			ctx.stroke();
			ctx.closePath();
		}
	};

	let animationId: number | null = null;
	const render = () => {
		if (!ctx) {
			return;
		}

		ctx.fillStyle = resolvedTheme === "light" ? "white" : "black";
		ctx.globalAlpha = waveOpacity || 0.5;
		ctx.fillRect(0, 0, w, h);
		drawWave(5);
		animationId = requestAnimationFrame(render);
	};

	useEffect(() => {
		init();
		return () => {
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		};
	}, [init, animationId]);

	const [isSafari, setIsSafari] = useState(false);

	useEffect(() => {
		// I have got to support it on safari.
		setIsSafari(
			typeof window !== "undefined" &&
				navigator.userAgent.includes("Safari") &&
				!navigator.userAgent.includes("Chrome"),
		);
	}, []);

	return (
		<div
			className={cn(
				"h-screen flex flex-col items-center justify-center",
				containerClassName,
			)}
		>
			<canvas
				className="absolute inset-0 z-0"
				ref={canvasRef}
				id="canvas"
				style={{
					...(isSafari ? { filter: `blur(${blur}px)` } : {}),
				}}
			/>
			<div className={cn("relative z-10", className)}>{children}</div>
		</div>
	);
};
