'use client';

import { P5CanvasInstance, type Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { Image } from 'p5';

const sketch: Sketch = (p: P5CanvasInstance) => {
  p.setup = () => {
    p.createCanvas(650, 650);
    p.fill('#f5df93');
    p.noStroke();
    p.rect(50, 50, 350, 50, 10);
    p.fill('#f5ce42');
    p.rect(80, 50, 15, 50);
    p.rect(120, 50, 15, 50);
    p.rect(160, 50, 15, 50);
    p.rect(200, 50, 15, 50);
    p.rect(240, 50, 15, 50);
    p.rect(280, 50, 15, 50);
    p.rect(320, 50, 15, 50);
    p.rect(360, 50, 15, 50);
    p.stroke(1);
    p.fill(255);
    p.rect(55, 100, 340, 500, 0, 0, 20, 20);
    p.noStroke();
    p.fill('skyblue');
    p.rect(56, 499, 338, 100, 0, 0, 20, 20);
    p.stroke(1);
    p.line(450, 0, 450, 650);

    const oxygenRadius = 50;
    const hydrogenRadius = 20;
    const bondLength = 100;
    p.noLoop();
  };

  p.draw = () => {};

  // p.mouseMoved = () => {
  //   p.redraw();
  // };
};

export default function Page() {
  return (
    <div className="p-16">
      <h1 className="text-3xl font-semibold mb-4">물의상태</h1>
      <div className="border-2" style={{ width: 650, height: 650 }}>
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
}
