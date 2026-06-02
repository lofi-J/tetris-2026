'use client';

import { useEffect, useRef } from 'react';

type Vector = {
  x: number;
  y: number;
};

type Boid = {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  hue: number;
  pulseOffset: number;
  radius: number;
};

const BOID_COUNT = 56;
const MAX_SPEED = 2.6;
const MAX_FORCE = 0.04;
const PERCEPTION_RADIUS = 78;
const SEPARATION_RADIUS = 30;
const ALIGNMENT_WEIGHT = 1;
const COHESION_WEIGHT = 0.78;
const SEPARATION_WEIGHT = 1.55;
const TRAIL_ALPHA = 0.22;
const FRAME_INTERVAL = 1000 / 30;

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const makeVector = (x = 0, y = 0): Vector => ({ x, y });

const add = (target: Vector, source: Vector) => {
  target.x += source.x;
  target.y += source.y;
};

const limitVelocity = (vector: Vector, amount: number) => {
  const currentMagnitude = magnitude(vector);
  if (currentMagnitude <= amount) return;

  vector.x = (vector.x / currentMagnitude) * amount;
  vector.y = (vector.y / currentMagnitude) * amount;
};

const magnitude = (vector: Vector) => Math.hypot(vector.x, vector.y);

const makeBoid = (width: number, height: number): Boid => {
  const angle = randomBetween(0, Math.PI * 2);

  return {
    position: makeVector(randomBetween(0, width), randomBetween(0, height)),
    velocity: makeVector(
      Math.cos(angle) * randomBetween(0.8, MAX_SPEED),
      Math.sin(angle) * randomBetween(0.8, MAX_SPEED),
    ),
    acceleration: makeVector(),
    hue: randomBetween(0, 360),
    pulseOffset: randomBetween(0, Math.PI * 2),
    radius: randomBetween(2.4, 5.2),
  };
};

const applySteer = (boid: Boid, desiredX: number, desiredY: number, weight: number) => {
  const desiredMagnitude = Math.hypot(desiredX, desiredY);
  if (desiredMagnitude === 0) return;

  let steerX = (desiredX / desiredMagnitude) * MAX_SPEED - boid.velocity.x;
  let steerY = (desiredY / desiredMagnitude) * MAX_SPEED - boid.velocity.y;
  const steerMagnitude = Math.hypot(steerX, steerY);

  if (steerMagnitude > MAX_FORCE) {
    steerX = (steerX / steerMagnitude) * MAX_FORCE;
    steerY = (steerY / steerMagnitude) * MAX_FORCE;
  }

  boid.acceleration.x += steerX * weight;
  boid.acceleration.y += steerY * weight;
};

const flock = (boid: Boid, boids: Boid[]) => {
  let visibleCount = 0;
  let closeCount = 0;
  let alignmentX = 0;
  let alignmentY = 0;
  let cohesionX = 0;
  let cohesionY = 0;
  let separationX = 0;
  let separationY = 0;

  for (const other of boids) {
    if (other === boid) continue;

    const diffX = boid.position.x - other.position.x;
    const diffY = boid.position.y - other.position.y;
    const distanceSquared = diffX * diffX + diffY * diffY;

    if (distanceSquared < PERCEPTION_RADIUS * PERCEPTION_RADIUS) {
      visibleCount += 1;
      alignmentX += other.velocity.x;
      alignmentY += other.velocity.y;
      cohesionX += other.position.x;
      cohesionY += other.position.y;
    }

    if (distanceSquared < SEPARATION_RADIUS * SEPARATION_RADIUS) {
      closeCount += 1;
      const force = 1 / Math.max(distanceSquared, 1);
      separationX += diffX * force;
      separationY += diffY * force;
    }
  }

  if (visibleCount > 0) {
    applySteer(boid, alignmentX / visibleCount, alignmentY / visibleCount, ALIGNMENT_WEIGHT);
    applySteer(
      boid,
      cohesionX / visibleCount - boid.position.x,
      cohesionY / visibleCount - boid.position.y,
      COHESION_WEIGHT,
    );
  }

  if (closeCount > 0) {
    applySteer(boid, separationX / closeCount, separationY / closeCount, SEPARATION_WEIGHT);
  }
};

const wrap = (boid: Boid, width: number, height: number) => {
  if (boid.position.x < 0) boid.position.x = width;
  if (boid.position.x > width) boid.position.x = 0;
  if (boid.position.y < 0) boid.position.y = height;
  if (boid.position.y > height) boid.position.y = 0;
};

const drawBoid = (ctx: CanvasRenderingContext2D, boid: Boid, time: number) => {
  const speed = Math.max(magnitude(boid.velocity), 0.01);
  const glow = 0.65 + Math.sin(time * 0.006 + boid.pulseOffset) * 0.25;
  const radius = boid.radius * glow;
  const tailLength = 14 + speed * 7;
  const unitX = boid.velocity.x / speed;
  const unitY = boid.velocity.y / speed;
  const tailX = boid.position.x - unitX * tailLength;
  const tailY = boid.position.y - unitY * tailLength;

  ctx.globalCompositeOperation = 'lighter';
  ctx.lineCap = 'round';
  ctx.lineWidth = radius * 1.2;
  ctx.strokeStyle = `hsla(${boid.hue}, 94%, 66%, 0.34)`;
  ctx.beginPath();
  ctx.moveTo(tailX, tailY);
  ctx.lineTo(boid.position.x + unitX * radius, boid.position.y + unitY * radius);
  ctx.stroke();

  ctx.shadowColor = `hsla(${boid.hue}, 92%, 62%, 0.7)`;
  ctx.shadowBlur = 8;
  ctx.fillStyle = `hsla(${boid.hue}, 96%, 70%, 0.78)`;
  ctx.beginPath();
  ctx.arc(boid.position.x, boid.position.y, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
  ctx.beginPath();
  ctx.arc(boid.position.x, boid.position.y, Math.max(radius * 0.36, 1), 0, Math.PI * 2);
  ctx.fill();
};

export default function Boids() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let lastFrameTime = 0;
    let width = 0;
    let height = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const boids: Boid[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      while (boids.length < BOID_COUNT) {
        boids.push(makeBoid(width, height));
      }
    };

    const render = (time: number) => {
      if (document.hidden) return;

      if (time - lastFrameTime < FRAME_INTERVAL) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      lastFrameTime = time;
      ctx.globalCompositeOperation = 'source-over';
      ctx.shadowBlur = 0;
      ctx.fillStyle = `rgba(0, 0, 0, ${TRAIL_ALPHA})`;
      ctx.fillRect(0, 0, width, height);

      if (width === 0 || height === 0 || reducedMotion) {
        return;
      }

      for (const boid of boids) {
        flock(boid, boids);
      }

      for (const boid of boids) {
        add(boid.velocity, boid.acceleration);
        limitVelocity(boid.velocity, MAX_SPEED);
        add(boid.position, boid.velocity);
        boid.acceleration = makeVector();
        boid.hue = (boid.hue + 0.18) % 360;
        wrap(boid, width, height);
        drawBoid(ctx, boid, time);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const syncVisibility = () => {
      cancelAnimationFrame(animationFrameId);
      if (!document.hidden && !reducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    resize();

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', syncVisibility);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', syncVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 size-full" aria-hidden="true" />;
}
