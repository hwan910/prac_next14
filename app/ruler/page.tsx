'use client';

import { P5CanvasInstance, type Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { Image } from 'p5';

const sketch: Sketch = (p: P5CanvasInstance) => {
  p.setup = () => {
    p.createCanvas(800, 400);
    p.background(225);
    p.quad(0, 300, 800, 300, 800, 400, 0, 400);
  };

  p.draw = () => {
    p.background(225);
    p.fill(255);
    p.stroke(0);
    p.strokeWeight(4);
    p.quad(0, 350, 800, 350, 800, 400, 0, 400);
    drawRuler(p);

    if (p.mouseY < 400 && p.mouseX < 800) {
      if (p.mouseY > p.height - 50) {
        const cm = p.map(p.mouseX, 0, p.width, 0, 30);
        const inches = cm / 2.54;
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.text(`${inches.toFixed(2)} inches`, p.width / 2, p.height / 2);
      }
    }
  };

  const drawRuler = (p: P5CanvasInstance) => {
    const y = p.height - 30;
    p.stroke(0);
    p.fill(0);
    p.textSize(12);
    p.textAlign(p.CENTER, p.BOTTOM);

    for (let i = 0; i <= 30; i++) {
      const x = p.map(i, 0, 30, 0, p.width);

      p.strokeWeight(2);
      p.line(x, y, x, y - 20);
      p.text(i, x, y + 15);

      if (i < 30) {
        for (let j = 1; j < 10; j++) {
          const mmX = x + p.map(j, 0, 10, 0, p.width / 30);
          p.strokeWeight(1);
          p.line(mmX, y, mmX, y - 10);
        }
      }
    }
  };

  p.mouseMoved = () => {
    p.redraw();
  };
};

export default function Page() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
