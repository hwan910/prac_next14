'use client';

import { P5CanvasInstance, Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { useRef, useState, useEffect } from 'react';

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
  const oxygenRadius = 20;
  const hydrogenRadius = 10;
  const bondLength = 20;
  const numMolecules = 12;
  const bottleWidth = 400;
  const bottleHeight = 500;
  const bottleX = 50;
  const bottleY = 100;

  let amplitude = 1;
  let frequency = 0.1;
  let molecules: Molecule[] = [];

  let temperature = 20; // 기본 온도
  const minTemp = -20;
  const maxTemp = 100;
  const sliderX = 560;
  const sliderYStart = 20;
  const sliderYEnd = 620;
  const sliderWidth = 20;

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);

    while (molecules.length < numMolecules) {
      const angle = p.random(p.TWO_PI);
      const x = p.random(
        bottleX + bondLength,
        bottleX + bottleWidth - bondLength,
      );
      const y = p.random(
        bottleY + bondLength,
        bottleY + bottleHeight - bondLength,
      );

      if (isValidPosition(x, y)) {
        molecules.push({
          x,
          y,
          initialX: x,
          initialY: y,
          angle,
          initialAngle: angle,
        });
      }
    }
  };

  p.draw = () => {
    p.background(255);

    // 물병 그리기
    p.stroke(0);
    p.fill(255);

    p.rect(bottleX, bottleY, bottleWidth, bottleHeight, 10);
    p.fill('skyblue');
    p.rect(50, 500, 400, 100, 0, 0, 10, 10);
    p.line(500, 0, 500, 650);

    p.fill('#f5df93');
    p.noStroke();
    p.rect(40, 50, 420, 50, 10);
    p.fill('#f5ce42');
    p.rect(80, 50, 15, 50);
    p.rect(120, 50, 15, 50);
    p.rect(160, 50, 15, 50);
    p.rect(200, 50, 15, 50);
    p.rect(240, 50, 15, 50);
    p.rect(280, 50, 15, 50);
    p.rect(320, 50, 15, 50);
    p.rect(360, 50, 15, 50);
    p.rect(400, 50, 15, 50);

    // 물 분자 그리기
    for (const molecule of molecules) {
      const shakeX =
        amplitude * p.sin(p.frameCount * frequency + p.random(0, p.TWO_PI));
      const shakeY =
        amplitude * p.cos(p.frameCount * frequency + p.random(0, p.TWO_PI));
      molecule.x = molecule.initialX + shakeX;
      molecule.y = molecule.initialY + shakeY;

      const shakeAngle =
        amplitude *
        0.05 *
        p.sin(p.frameCount * frequency + p.random(0, p.TWO_PI));
      molecule.angle = molecule.initialAngle + shakeAngle;

      drawWaterMolecule(molecule.x, molecule.y, molecule.angle);
    }

    // 온도계 그리기
    p.stroke(0);
    p.fill(255);
    p.rect(sliderX, sliderYStart, sliderWidth, sliderYEnd - sliderYStart, 10);

    const temperatureHeight = p.map(
      temperature,
      minTemp,
      maxTemp,
      sliderYEnd,
      sliderYStart,
    );
    p.fill('red');
    p.rect(
      sliderX,
      temperatureHeight,
      sliderWidth,
      sliderYEnd - temperatureHeight,
      10,
    );

    // 현재 온도 값 텍스트
    p.fill(0);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`${temperature}°C`, sliderX + sliderWidth / 2, sliderYStart - 10);
  };

  function drawWaterMolecule(x: number, y: number, angle: number) {
    const hydrogenAngle = p.PI / 3; // H-O-H 각도 (약 120도)

    const hx1 = x + (bondLength / 2) * p.cos(angle + hydrogenAngle);
    const hy1 = y + (bondLength / 2) * p.sin(angle + hydrogenAngle);
    const hx2 = x + (bondLength / 2) * p.cos(angle - hydrogenAngle);
    const hy2 = y + (bondLength / 2) * p.sin(angle - hydrogenAngle);

    // 결합 그리기
    p.stroke(0);
    p.strokeWeight(2);
    p.line(x, y, hx1, hy1);
    p.line(x, y, hx2, hy2);

    // 원자 그리기
    p.noStroke();

    // 산소 원자 (O)
    p.fill(255, 0, 0);
    p.ellipse(x, y, oxygenRadius);

    // 수소 원자 (H)
    p.fill(0, 0, 255);
    p.ellipse(hx1, hy1, hydrogenRadius);
    p.ellipse(hx2, hy2, hydrogenRadius);
  }

  function isValidPosition(x: number, y: number): boolean {
    for (const molecule of molecules) {
      const d = p.dist(x, y, molecule.x, molecule.y);
      if (d < bondLength * 2) {
        return false;
      }
    }
    return true;
  }

  p.mouseDragged = () => {
    if (
      p.mouseX >= sliderX &&
      p.mouseX <= sliderX + sliderWidth &&
      p.mouseY >= sliderYStart &&
      p.mouseY <= sliderYEnd
    ) {
      temperature = p.map(p.mouseY, sliderYEnd, sliderYStart, minTemp, maxTemp);
      updateTemperature(temperature);
    }
  };

  const updateTemperature = (temp: number) => {
    temperature = Math.floor(temp);
    amplitude = 1 + temperature * 0.05;
    frequency = 0.1 + temperature * 0.01;
    return true;
  };
};

export default function Page() {
  return (
    <div className="p-16">
      <h1 className="text-3xl font-semibold ">물의상태</h1>
      <h2 className="text-xl font-semibold mb-4 text-gray-500">
        온도를 바꿔보세요
      </h2>
      <div
        className="border-2"
        style={{ position: 'relative', width: 650, height: 650 }}
      >
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
}
