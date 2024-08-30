'use client';

import { type Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { Image } from 'p5';

const sketch: Sketch = (p) => {
  let img: Image;
  p.preload = () => {
    img = p.loadImage('images/creatures/BabyWinston.png'); // 이미지 파일 경로를 실제 경로로 변경하세요.
  };

  p.setup = () => {
    p.createCanvas(800, 600);
    // Scene 1
    p.background(235, 247, 255);
    p.fill(0, 85, 255);
    p.textSize(25);
    p.text('The Story of Winston', 10, 200);
  };

  p.draw = () => {
    p.mouseClicked = function () {
      // Scene 2
      p.background(173, 239, 255);
      p.fill(7, 14, 145);
      p.textSize(25);
      p.text('Lil Winston is born!', 10, 100);
      p.image(img, 80, 150);
    };
  };
};

export default function Page() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
