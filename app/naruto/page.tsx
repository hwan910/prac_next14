'use client';

import { P5CanvasInstance, Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { useRef, useState, useEffect } from 'react';
import { Image } from 'p5';

interface Molecule {
  x: number;
  y: number;
  initialX: number;
  initialY: number;
  angle: number;
  initialAngle: number;
}

const sketch: Sketch = (p: P5CanvasInstance) => {
  const canvasWidth = 640;
  const canvasHeight = 640;
  let x = 0;
  let y = 400;
  let stand: Image;
  let up: Image;
  let down: Image;
  let grass: Image;
  let angle = 0;
  const grassXs: number[] = [];
  const sticks: any[] = [];

  p.preload = () => {
    stand = p.loadImage('images/naruto/stand.png');
    up = p.loadImage('images/naruto/up.png');
    down = p.loadImage('images/naruto/down.png');
    grass = p.loadImage('images/naruto/grass.png');
  };

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    for (let i = 0; i < 25; i++) {
      grassXs.push(i * 24);
      sticks.push(i * 24);
    }
  };

  p.draw = () => {
    p.background(227, 254, 255);
    p.image(stand, 5, y, 150, 150);

    if (p.keyIsPressed && p.keyCode === 32) {
      handleJump('up');
    } else {
      handleJump('down');
    }
    p.fill(130, 79, 43);
    p.rect(0, p.height * 0.9 + 20, p.width, p.height * 0.1);

    for (let i = 0; i < grassXs.length; i++) {
      p.image(grass, grassXs[i], p.height * 0.86, 0, 50);
      grassXs[i] -= 1;
      if (grassXs[i] <= -20) {
        grassXs[i] = p.width;
      }
    }
  };

  const handleJump = (type: 'up' | 'down') => {
    if (!type) {
      return false;
    }
    switch (type) {
      case 'up':
        if (y > 0) {
          y -= 8;
          p.background(227, 254, 255);

          p.image(up, 5, y, 160, 160);
        }
        break;
      case 'down':
        if (y < 430) {
          p.background(227, 254, 255);

          p.image(down, 5, y, 160, 160);

          y += 8;
        }
        break;
    }
  };
};

export default function Page() {
  return (
    <div className="p-16">
      <h1 className="text-3xl font-semibold mb-4">나루토 점프</h1>
      <div
        className="border-2"
        style={{ position: 'relative', width: 650, height: 650 }}
      >
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
}
