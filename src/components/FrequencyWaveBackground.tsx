import { useEffect, useRef } from 'react';

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

    const isDark = () => document.documentElement.classList.contains('dark');

    let t = 0;
    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = [];

    const getRetroColors = () => {
      const dark = isDark();
      return {
        primary: dark ? '#ff6b35' : '#ff6b35',      // Bright orange
        secondary: dark ? '#00d4ff' : '#00a8ff',    // Cyan
        tertiary: dark ? '#f72585' : '#f72585',     // Pink
        accent: dark ? '#ffd60a' : '#ffb703',       // Yellow
        background: dark ? '#0a0a0a' : '#f5f5f5',
      };
    };

    const drawRetroGrid = () => {
      const colors = getRetroColors();
      ctx.save();
      ctx.strokeStyle = isDark() ? 'rgba(0, 212, 255, 0.08)' : 'rgba(0, 212, 255, 0.05)';
      ctx.lineWidth = 1;

      const gridSize = Math.max(30, Math.min(width, height) / 15);
      
      // Vertical lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      ctx.restore();
    };

    const drawRadioPlayer3D = () => {
      const colors = getRetroColors();
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Scale based on viewport
      const scale = Math.min(width, height) / 800;
      const playerWidth = 300 * scale;
      const playerHeight = 200 * scale;

      ctx.save();
      
      // 3D perspective - radio player at center
      const x = centerX - playerWidth / 2;
      const y = centerY - playerHeight / 2;

      // Outer glow
      const glowGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(playerWidth, playerHeight) * 2);
      glowGradient.addColorStop(0, `${colors.primary}22`);
      glowGradient.addColorStop(0.5, `${colors.secondary}15`);
      glowGradient.addColorStop(1, `${colors.tertiary}00`);
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      // Metal body
      const bodyGrad = ctx.createLinearGradient(x, y, x, y + playerHeight);
      bodyGrad.addColorStop(0, isDark() ? '#2a2a2a' : '#3a3a3a');
      bodyGrad.addColorStop(0.5, isDark() ? '#1a1a1a' : '#2a2a2a');
      bodyGrad.addColorStop(1, isDark() ? '#0a0a0a' : '#1a1a1a');
      
      ctx.fillStyle = bodyGrad;
      ctx.strokeStyle = colors.secondary;
      ctx.lineWidth = 2 * scale;
      
      // Draw rounded rectangle
      const radius = 20 * scale;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + playerWidth - radius, y);
      ctx.quadraticCurveTo(x + playerWidth, y, x + playerWidth, y + radius);
      ctx.lineTo(x + playerWidth, y + playerHeight - radius);
      ctx.quadraticCurveTo(x + playerWidth, y + playerHeight, x + playerWidth - radius, y + playerHeight);
      ctx.lineTo(x + radius, y + playerHeight);
      ctx.quadraticCurveTo(x, y + playerHeight, x, y + playerHeight - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Display screen
      const screenX = x + playerWidth * 0.1;
      const screenY = y + playerHeight * 0.15;
      const screenW = playerWidth * 0.8;
      const screenH = playerHeight * 0.35;

      ctx.fillStyle = isDark() ? '#0a0a0a' : '#1a1a1a';
      ctx.fillRect(screenX, screenY, screenW, screenH);
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 1.5 * scale;
      ctx.strokeRect(screenX, screenY, screenW, screenH);

      // Animated equalizer bars in the display
      const barCount = 8;
      const barSpacing = screenW / (barCount + 1);
      for (let i = 0; i < barCount; i++) {
        const barX = screenX + barSpacing * (i + 1) - (barSpacing * 0.15);
        const barBaseHeight = screenH * 0.7;
        const frequency = 0.5 + (i / barCount) * 0.5;
        const height = Math.sin(t * (2 + i * 0.3) + i) * barBaseHeight * 0.4 + barBaseHeight * 0.3;
        
        const barGrad = ctx.createLinearGradient(0, screenY + screenH - height, 0, screenY + screenH);
        barGrad.addColorStop(0, colors.primary);
        barGrad.addColorStop(1, colors.secondary);
        
        ctx.fillStyle = barGrad;
        ctx.fillRect(barX, screenY + screenH - height, barSpacing * 0.3, height);
      }

      // Decorative dots/knobs
      const knobRadius = 8 * scale;
      const knobs = [
        { x: x + playerWidth * 0.2, y: y + playerHeight * 0.65, color: colors.primary },
        { x: x + playerWidth * 0.5, y: y + playerHeight * 0.65, color: colors.secondary },
        { x: x + playerWidth * 0.8, y: y + playerHeight * 0.65, color: colors.tertiary },
      ];

      knobs.forEach(knob => {
        // Outer ring
        ctx.strokeStyle = knob.color;
        ctx.lineWidth = 2 * scale;
        ctx.beginPath();
        ctx.arc(knob.x, knob.y, knobRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner rotation indicator
        const rotation = t * (0.5 + Math.random() * 0.5);
        ctx.strokeStyle = knob.color;
        ctx.lineWidth = 1 * scale;
        ctx.beginPath();
        ctx.moveTo(knob.x, knob.y);
        ctx.lineTo(
          knob.x + Math.cos(rotation) * knobRadius * 0.6,
          knob.y + Math.sin(rotation) * knobRadius * 0.6
        );
        ctx.stroke();
      });

      ctx.restore();
    };

    const drawAnimatedLines = () => {
      const colors = getRetroColors();
      ctx.save();

      // Animated sine waves
      ctx.strokeStyle = `${colors.secondary}40`;
      ctx.lineWidth = 2;
      ctx.beginPath();

      const waveAmplitude = Math.min(width, height) * 0.1;
      const waveFrequency = 0.005;

      for (let x = 0; x < width; x += 2) {
        const y = height * 0.25 + Math.sin(x * waveFrequency + t * 0.3) * waveAmplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second wave
      ctx.strokeStyle = `${colors.tertiary}30`;
      ctx.beginPath();
      for (let x = 0; x < width; x += 2) {
        const y = height * 0.75 + Math.sin(x * waveFrequency + t * 0.4 + Math.PI) * waveAmplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.restore();
    };

    const draw = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = isDark() 
        ? 'rgba(10, 10, 10, 0.98)' 
        : 'rgba(245, 245, 245, 0.98)';
      ctx.fillRect(0, 0, width, height);

      t += 0.016;

      drawRetroGrid();
      drawAnimatedLines();
      drawRadioPlayer3D();

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
      style={{ 
        zIndex: 0, 
        opacity: 1,
        top: 0,
        left: 0,
        display: 'block',
        maxHeight: 'auto',
        overflow: 'hidden'
      }}
      aria-hidden
    />
  );
}

export default FrequencyWaveBackground;
