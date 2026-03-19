'use client';

import { useEffect, useRef, useCallback } from 'react';

const FRAME_COUNT = 61;
const FRAME_DIR = '/hero-frames';

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = framesRef.current[index];
    if (!canvas || !ctx || !img) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, rect.width, rect.height);

    // Cover fit
    const scale = Math.max(rect.width / img.width, rect.height / img.height);
    const x = (rect.width - img.width * scale) / 2;
    const y = (rect.height - img.height * scale) / 2;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, []);

  useEffect(() => {
    // Preload frames
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `${FRAME_DIR}/frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = () => {
        loaded++;
        if (loaded === 1) drawFrame(0); // show first frame ASAP
      };
      images.push(img);
    }

    framesRef.current = images;

    // Scroll-driven animation
    const onScroll = () => {
      const scrollFraction = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const index = Math.min(FRAME_COUNT - 1, Math.floor(scrollFraction * FRAME_COUNT * 3));
      if (index !== currentFrameRef.current) {
        currentFrameRef.current = index;
        requestAnimationFrame(() => drawFrame(index));
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
      aria-hidden="true"
    />
  );
}
