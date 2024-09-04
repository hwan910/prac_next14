'use client';

import { P5CanvasInstance, type Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { Image } from 'p5';

const sketch: Sketch = (p: P5CanvasInstance) => {
  const canvasWidth = 650;
  const canvasHeight = 650;
  let x: number = 10;
  let y: number = 500;

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.rect(x, y, 400, 100, 0, 0, 10, 50);
  };

  p.draw = () => {
    p.background(255);
    p.mouseDragged = () => {
      console.log('draged');
      x = p.mouseX;
      y = p.mouseY;
    };

    p.rect(x, y, 400, 100, 0, 0, 10, 50);
  };
};

export default function Page() {
  return (
    <div className="p-16">
      <h1 className="text-3xl font-semibold mb-4">PUZZLE</h1>
      <div
        className="border-2"
        style={{ position: 'relative', width: 660, height: 660 }}
      >
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
}
