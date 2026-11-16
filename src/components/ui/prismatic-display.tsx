'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, Zap, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Types & Interfaces ---
interface Node3D {
    id: number;
    col: number;
    row: number;
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    excitation: number;
}

interface BurstWave {
    radius: number;
    maxRadius: number;
    strength: number;
}

export interface PrismaticProps {
    headline?: string;
    className?: string;
    onScrollDown?: () => void;
    children?: React.ReactNode;
}

export function Prismatic({
    headline = "MANTHAN",
    className = "",
    onScrollDown,
    children,
}: PrismaticProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isRunning, setIsRunning] = useState(true);

    // Mesh settings
    const COLS = 32;
    const ROWS = 16;
    const NUM_NODES = COLS * ROWS;

    // Pointer coordinates and physics state
    const pointerRef = useRef({
        x: -2000,
        y: -2000,
        targetX: -2000,
        targetY: -2000,
        radius: 180,
        isDown: false,
    });

    const nodesRef = useRef<Node3D[]>([]);
    const burstsRef = useRef<BurstWave[]>([]);
    const dimensionsRef = useRef({ width: 0, height: 0 });

    // --- Core Initialization ---
    const initMesh = useCallback(() => {
        const nodes: Node3D[] = [];
        let id = 0;

        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                nodes.push({
                    id: id++,
                    col,
                    row,
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 400,
                    z: (Math.random() - 0.5) * 400,
                    vx: 0,
                    vy: 0,
                    vz: 0,
                    excitation: 0,
                });
            }
        }
        nodesRef.current = nodes;
    }, [COLS, ROWS]);

    // Initialize mesh immediately on mount
    useEffect(() => {
        initMesh();
    }, [initMesh]);

    // --- Sync Theme ---
    useEffect(() => {
        const checkDark = () => {
            if (typeof document === 'undefined') return true;
            return (
                document.documentElement.classList.contains('dark') ||
                document.body?.classList.contains('dark') ||
                window.matchMedia?.('(prefers-color-scheme: dark)').matches
            );
        };

        setIsDarkMode(checkDark());

        const observer = new MutationObserver(() => {
            setIsDarkMode(checkDark());
        });

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        if (document.body) {
            observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => setIsDarkMode(checkDark());
        mediaQuery.addEventListener('change', handler);

        return () => {
            observer.disconnect();
            mediaQuery.removeEventListener('change', handler);
        };
    }, []);

    // --- Canvas Resize Observer ---
    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const rect = entry.contentRect;
                if (rect.width === 0 || rect.height === 0) continue;
                
                const dpr = Math.min(window.devicePixelRatio || 1, 2);

                dimensionsRef.current = { width: rect.width, height: rect.height };
                canvas.width = Math.floor(rect.width * dpr);
                canvas.height = Math.floor(rect.height * dpr);
                canvas.style.width = `${rect.width}px`;
                canvas.style.height = `${rect.height}px`;

                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.scale(dpr, dpr);

                if (nodesRef.current.length === 0) {
                    initMesh();
                }
            }
        });

        resizeObserver.observe(container);
        return () => resizeObserver.disconnect();
    }, [initMesh]);

    // --- Main Render & Physics Loop (VORTEX Topology) ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let animId = 0;
        let time = 0;

        const render = () => {
            if (!isRunning) {
                animId = requestAnimationFrame(render);
                return;
            }

            time += 0.005;
            const { width, height } = dimensionsRef.current;
            if (width === 0 || height === 0) {
                animId = requestAnimationFrame(render);
                return;
            }

            const pointer = pointerRef.current;
            const nodes = nodesRef.current;
            
            // Safety guard against uninitialized node arrays
            if (!nodes || nodes.length < NUM_NODES) {
                animId = requestAnimationFrame(render);
                return;
            }

            const bursts = burstsRef.current;

            pointer.x += (pointer.targetX - pointer.x) * 0.08;
            pointer.y += (pointer.targetY - pointer.y) * 0.08;

            const isDark = isDarkMode;
            const bgColor = isDark ? '#17141F' : '#ffffff';
            const baseRgb = isDark ? '216, 197, 245' : '15, 23, 42';
            const activeRgb = isDark ? '79, 216, 232' : '0, 0, 0';

            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;

            // Update color bursts
            for (let i = bursts.length - 1; i >= 0; i--) {
                const burst = bursts[i];
                burst.radius += 15;
                burst.strength *= 0.96;

                if (burst.radius > burst.maxRadius || burst.strength < 0.01) {
                    bursts.splice(i, 1);
                }
            }

            const cosT = Math.cos(time);
            const sinT = Math.sin(time);
            const cosT2 = Math.cos(time * 0.7);
            const sinT2 = Math.sin(time * 0.7);

            // 1. Math & Physics Pass — VORTEX ONLY
            for (let i = 0; i < NUM_NODES; i++) {
                const node = nodes[i];
                if (!node) continue;

                const u = (node.col / COLS) * Math.PI * 2;
                const normalizedRow = node.row / ROWS;
                const radius = 20 + Math.pow(normalizedRow, 1.5) * Math.min(width, height) * 0.4;
                const twist = u + normalizedRow * Math.PI * 6;
                const targetX = Math.cos(twist) * radius;
                const targetZ = Math.sin(twist) * radius;
                const targetY = (normalizedRow - 0.5) * Math.min(width, height) * 0.8;

                const rx = targetX * cosT - targetZ * sinT;
                let rz = targetX * sinT + targetZ * cosT;
                const ry = targetY * cosT2 - rz * sinT2;
                rz = targetY * sinT2 + rz * cosT2;

                const spring = 0.03;
                const friction = 0.88;

                node.vx += (rx - node.x) * spring;
                node.vy += (ry - node.y) * spring;
                node.vz += (rz - node.z) * spring;

                const fov = 800;
                const cameraDist = 600;
                const scale = fov / (cameraDist + node.z);
                const projX = centerX + node.x * scale;
                const projY = centerY + node.y * scale;

                const dx = projX - pointer.x;
                const dy = projY - pointer.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < pointer.radius && dist > 0) {
                    const ratio = 1 - dist / pointer.radius;
                    const smoothRatio = ratio * ratio * (3 - 2 * ratio);
                    node.excitation = Math.max(node.excitation, smoothRatio);
                }

                const dxCenter = projX - centerX;
                const dyCenter = projY - centerY;
                const distFromCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);

                for (let b = 0; b < bursts.length; b++) {
                    const burst = bursts[b];
                    const ringThickness = 60;
                    const distToRing = Math.abs(distFromCenter - burst.radius);

                    if (distToRing < ringThickness) {
                        const ratio = 1 - (distToRing / ringThickness);
                        const smoothRatio = ratio * ratio * (3 - 2 * ratio);
                        node.excitation = Math.max(node.excitation, smoothRatio * burst.strength);
                    }
                }

                node.vx *= friction;
                node.vy *= friction;
                node.vz *= friction;
                node.x += node.vx;
                node.y += node.vy;
                node.z += node.vz;

                node.excitation *= 0.92;
            }

            // 2. Render Pass
            ctx.lineWidth = 1;

            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLS; col++) {
                    const idx = row * COLS + col;
                    const node = nodes[idx];
                    if (!node) continue;

                    const fov = 800;
                    const cameraDist = 600;
                    const scale = fov / (cameraDist + node.z);
                    const projX = centerX + node.x * scale;
                    const projY = centerY + node.y * scale;

                    const depthAlpha = Math.max(0, Math.min(1, 1 - (node.z + 300) / 600));

                    if (node.excitation > 0.05) {
                        ctx.strokeStyle = `rgba(${activeRgb}, ${Math.min(1, depthAlpha + node.excitation)})`;
                        ctx.lineWidth = 1 + node.excitation * 1.5;
                    } else {
                        ctx.strokeStyle = `rgba(${baseRgb}, ${depthAlpha * (isDark ? 0.35 : 0.15)})`;
                        ctx.lineWidth = 1;
                    }

                    const nextColIdx = row * COLS + ((col + 1) % COLS);
                    const rightNeighbor = nodes[nextColIdx];
                    if (rightNeighbor) {
                        const rScale = fov / (cameraDist + rightNeighbor.z);
                        ctx.beginPath();
                        ctx.moveTo(projX, projY);
                        ctx.lineTo(centerX + rightNeighbor.x * rScale, centerY + rightNeighbor.y * rScale);
                        ctx.stroke();
                    }

                    if (row < ROWS - 1) {
                        const bottomIdx = (row + 1) * COLS + col;
                        const bottomNeighbor = nodes[bottomIdx];
                        if (bottomNeighbor) {
                            const bScale = fov / (cameraDist + bottomNeighbor.z);
                            ctx.beginPath();
                            ctx.moveTo(projX, projY);
                            ctx.lineTo(centerX + bottomNeighbor.x * bScale, centerY + bottomNeighbor.y * bScale);
                            ctx.stroke();
                        }
                    }

                    if (node.excitation > 0.1) {
                        ctx.fillStyle = `rgba(${activeRgb}, ${node.excitation})`;
                        ctx.beginPath();
                        ctx.arc(projX, projY, (1 + node.excitation * 2.5) * scale, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            animId = requestAnimationFrame(render);
        };

        animId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animId);
    }, [isRunning, isDarkMode, COLS, ROWS, NUM_NODES]);

    const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        pointerRef.current.targetX = e.clientX - rect.left;
        pointerRef.current.targetY = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
        pointerRef.current.targetX = -2000;
        pointerRef.current.targetY = -2000;
        pointerRef.current.isDown = false;
    };

    const triggerBurst = () => {
        const { width, height } = dimensionsRef.current;
        const maxR = Math.max(width, height) * 1.2;

        burstsRef.current.push({
            radius: 0,
            maxRadius: maxR,
            strength: 1.0,
        });
    };

    const handleScrollClick = () => {
        if (onScrollDown) {
            onScrollDown();
        } else {
            const next = document.getElementById('sessions');
            if (next) {
                next.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handlePointerMove}
            onMouseLeave={handlePointerLeave}
            onMouseDown={() => { pointerRef.current.isDown = true; }}
            onMouseUp={() => { pointerRef.current.isDown = false; }}
            className={cn(
                "group relative flex h-full w-full select-none flex-col justify-between overflow-hidden bg-midnight transition-colors duration-700",
                className
            )}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 block h-full w-full cursor-crosshair"
            />

            <div className="relative z-20 flex h-full w-full flex-col justify-between p-6 md:p-10 pointer-events-none">
                {/* Header with Burst & Pause controls */}
                <header className="flex w-full flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-lavender/70 pointer-events-auto pt-20 sm:pt-24">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 rounded-xl border border-lavender/20 bg-midnight/80 px-3.5 py-1.5 backdrop-blur-md shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-holo-cyan animate-pulse" />
                            <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-ivory">
                                VORTEX
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={triggerBurst}
                                className="flex items-center gap-1.5 rounded-xl border border-lavender/20 bg-midnight/80 px-3 py-1.5 backdrop-blur-md transition-all hover:bg-lavender/10 hover:text-ivory shadow-sm cursor-pointer text-lavender"
                                title="Trigger Particle Shockwave"
                            >
                                <Zap className="size-3.5 text-holo-cyan" />
                                <span className="hidden sm:inline font-mono text-[10px] font-bold tracking-wider">BURST</span>
                            </button>

                            <button
                                onClick={() => setIsRunning((prev) => !prev)}
                                className="flex items-center gap-1.5 rounded-xl border border-lavender/20 bg-midnight/80 px-3 py-1.5 backdrop-blur-md transition-all hover:bg-lavender/10 hover:text-ivory shadow-sm cursor-pointer text-lavender"
                                title={isRunning ? "Pause Simulation" : "Resume Simulation"}
                            >
                                {isRunning ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content / Headline */}
                <main className="flex flex-col items-center justify-center text-center my-auto w-full max-w-4xl mx-auto px-4 pointer-events-auto">
                    {children ? (
                        children
                    ) : (
                        <h1
                            className="font-mono text-6xl font-black tracking-tighter uppercase sm:text-8xl md:text-[10rem] text-ivory"
                            style={{
                                textShadow: '0 0 60px rgba(79, 216, 232, 0.25), 0 20px 40px rgba(0,0,0,0.8)'
                            }}
                        >
                            {headline}
                        </h1>
                    )}
                </main>

                {/* Bottom Navigation Cue to Section 02 */}
                <footer className="pointer-events-auto flex flex-col items-center justify-center pb-2">
                    <button
                        onClick={handleScrollClick}
                        className="flex flex-col items-center gap-1.5 text-ivory-muted hover:text-lavender transition-colors cursor-pointer group"
                    >
                        <span className="text-[9px] font-mono tracking-[0.22em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                            Scroll
                        </span>
                        <ArrowDown className="w-4 h-4 text-holo-cyan animate-bounce" />
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default Prismatic;
