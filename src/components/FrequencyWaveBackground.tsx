import { useEffect, useRef } from 'react';

interface WaveConfig {
  amplitude: number;
  frequency: number;
  speed: number;
  phaseOffset: number;
  barCount: number;
  color: string;
  yOffset: number;
}

export function FrequencyWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Check if we are in dark mode
    const isDark = () => document.documentElement.classList.contains('dark');

    const waves: WaveConfig[] = [
      {
        amplitude: 0.13,
        frequency: 2.8,
        speed: 0.42,
        phaseOffset: 0,
        barCount: 80,
        color: 'foreground',
        yOffset: 0.5,
      },
      {
        amplitude: 0.08,
        frequency: 4.2,
        speed: 0.65,
        phaseOffset: Math.PI * 0.7,
        barCount: 80,
        color: 'muted',
        yOffset: 0.5,
      },
      {
        amplitude: 0.05,
        frequency: 6,
        speed: 0.9,
        phaseOffset: Math.PI * 1.3,
        barCount: 60,
        color: 'accent',
        yOffset: 0.5,
      },
    ];

    let t = 0;

    const getColors = () => {
      const dark = isDark();
      return {
        foreground: dark
          ? 'rgba(255,255,255,0.55)'
          : 'rgba(10,10,10,0.45)',
        muted: dark
          ? 'rgba(255,255,255,0.25)'
          : 'rgba(10,10,10,0.2)',
        accent: dark
          ? 'rgba(255,255,255,0.12)'
          : 'rgba(10,10,10,0.1)',
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.008;

      const colors = getColors();

      for (const wave of waves) {
        const colorMap = colors as Record<string, string>;
        const baseColor = colorMap[wave.color] ?? colorMap.foreground;
        const centerY = height * wave.yOffset;
        const barW = width / wave.barCount;
        const amp = height * wave.amplitude;

        for (let i = 0; i < wave.barCount; i++) {
          const x = i * barW;
          // 3D perspective: bars near center appear taller
          const perspective = 1 - Math.abs((i / wave.barCount) - 0.5) * 0.6;

          // Get two sine waves offset for a double helix / ribbon feel
          const phase1 = (i / wave.barCount) * Math.PI * 2 * wave.frequency + t * wave.speed + wave.phaseOffset;
          const phase2 = phase1 + Math.PI; // opposite phase

          const y1 = centerY + Math.sin(phase1) * amp * perspective;
          const y2 = centerY + Math.sin(phase2) * amp * perspective;

          const top = Math.min(y1, y2);
          const bottom = Math.max(y1, y2);
          const barH = Math.max(2, bottom - top);

          // Bar opacity based on position and perspective
          const opacity = perspective * 0.85;

          ctx.save();
          ctx.globalAlpha = opacity;

          // Gradient per bar for a glowing 3D effect
          const grad = ctx.createLinearGradient(0, top, 0, bottom);
          grad.addColorStop(0, baseColor.replace(/[\d.]+\)$/, `${opacity * 0.3})`));
          grad.addColorStop(0.5, baseColor);
          grad.addColorStop(1, baseColor.replace(/[\d.]+\)$/, `${opacity * 0.3})`));
          ctx.fillStyle = grad;

          const bw = Math.max(1.5, barW * 0.55);
          ctx.fillRect(x + (barW - bw) / 2, top, bw, barH);
          ctx.restore();
        }
      }

      // Subtle flowing sine outline (the curvy ribbon reference)
      ctx.save();
      ctx.beginPath();
      const outlineColor = isDark()
        ? 'rgba(255,255,255,0.12)'
        : 'rgba(0,0,0,0.1)';
      ctx.strokeStyle = outlineColor;
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += 2) {
        const n = x / width;
        const y =
          height * 0.5 +
          Math.sin(n * Math.PI * 5.6 + t * 0.7) * height * 0.12 +
          Math.sin(n * Math.PI * 3.2 + t * 0.45 + 1.1) * height * 0.06;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 1 }}
      aria-hidden
    />
  );
}

export default FrequencyWaveBackground;
