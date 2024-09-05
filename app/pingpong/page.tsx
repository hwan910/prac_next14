'use client';

import { P5CanvasInstance, Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

// 바와 공이 충돌할 때 공의 위치를 변경하려면 충돌 감지(Collision Detection)를 구현해야함.

interface Block {
  x: number;
  y: number;
  width: number;
  height: number;
  isVisible: boolean;
}

const sketch: Sketch = (p: P5CanvasInstance) => {
  const canvasWidth = 650;
  const canvasHeight = 650;
  const blocks: Block[] = [];

  // 공의 초기 위치와 속도
  let ballX = canvasWidth / 2;
  let ballY = canvasHeight / 2 + 50;
  let ballXSpeed = 8;
  let ballYSpeed = -8;
  let barWidth = 150;
  let barHeight = 20;
  let score = 0;
  let start = false;

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.background(150);
    ball(p, canvasWidth, canvasHeight);
    bar(p, ballX, canvasHeight);
    p.frameRate(60); // 초당 프레임 수를 설정
    // 초기화 함수 호출
    initBlocks(80, 20, { x: 50, y: 100 });
  };

  p.draw = () => {
    if (score === 280) {
      p.background(150);
      p.fill(0);
      p.textSize(32);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('축하합니다!!!', canvasWidth / 2, canvasHeight / 2);
      ballXSpeed = 8;
      ballYSpeed = -8;
      ballX = canvasWidth / 2;
      ballY = canvasHeight / 2 + 50;

      return;
    }
    p.textSize(24);
    if (start) {
      p.background(150);
      p.text(`score: ${score}`, 100, 30);

      drawBlocks(p, ballX, ballY);
      // 바의 위치를 업데이트하고 그리기
      const barPosition = bar(p, p.mouseX, canvasHeight);
      ball(p, canvasWidth, canvasHeight);

      // 충돌 감지
      if (isBallColliding(ballX, ballY, barPosition)) {
        ballYSpeed *= -1; // 공의 y-방향 속도를 반전시킴
      }
    }

    if (!start) {
      // 게임이 멈춰있을 때 화면을 갱신하지 않습니다.
      p.fill(0);
      p.textSize(32);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(
        '게임 오버. 마우스를 클릭해서 재시작하세요',
        canvasWidth / 2,
        canvasHeight / 2,
      );
      ballXSpeed = 8;
      ballYSpeed = -8;
      ballX = canvasWidth / 2;
      ballY = canvasHeight / 2 + 50;
    }
  };

  p.mouseClicked = () => {
    start = true;
    score = 0;
    p.setup();
  };

  const ball = (
    p: P5CanvasInstance,
    canvasWidth: number,
    canvasHeight: number,
  ) => {
    const size = 20;
    p.fill(255);

    // 공 이동
    ballX += ballXSpeed;
    ballY += ballYSpeed;

    // 공이 캔버스 경계에 닿으면 방향 변경
    if (ballX <= 0 || ballX >= canvasWidth) {
      ballXSpeed *= -1;
    }
    if (ballY <= 0 || ballY >= canvasHeight) {
      ballYSpeed *= -1;
    }

    p.ellipse(ballX, ballY, size);

    if (ballY > canvasHeight) {
      start = false;
    }
  };

  const bar = (p: P5CanvasInstance, mouseX: number, canvasHeight: number) => {
    // 바의 위치를 화면 경계선 안으로 제한
    const barX = p.constrain(mouseX - barWidth / 2, 0, p.width - barWidth);
    const barY = canvasHeight - 50;
    p.fill(255);
    // 바 그리기
    p.rect(barX, barY, barWidth, barHeight, 5, 5, 0, 0);

    return { x: barX, y: barY, width: barWidth, height: barHeight };
  };

  // 충돌 감지 함수
  const isBallColliding = (
    ballX: number,
    ballY: number,
    barPosition: { x: number; y: number; width: number; height: number },
  ): boolean => {
    const ballRadius = 10; // 공의 반지름
    const isCollidingX =
      ballX + ballRadius > barPosition.x &&
      ballX - ballRadius < barPosition.x + barPosition.width;
    const isCollidingY =
      ballY + ballRadius > barPosition.y &&
      ballY - ballRadius < barPosition.y + barPosition.height;
    return isCollidingX && isCollidingY;
  };

  // 블록 초기화
  const initBlocks = (
    blockWidth: number,
    blockHeight: number,
    init: { x: number; y: number },
  ) => {
    blocks.length = 0; // 기존 블록 배열 초기화
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 7; col++) {
        blocks.push({
          x: init.x + col * blockWidth,
          y: init.y + row * blockHeight,
          width: blockWidth,
          height: blockHeight,
          isVisible: true,
        });
      }
    }
  };

  // 블록을 그리고 공과의 충돌을 감지
  const drawBlocks = (p: P5CanvasInstance, ballX: number, ballY: number) => {
    const blockWidth = 80; // 블록의 너비

    for (let block of blocks) {
      if (block.isVisible) {
        const color = (block.x / blockWidth) % 2 === 0 ? 150 : 200;
        p.fill(color);
        p.rect(block.x, block.y, block.width, block.height);

        if (
          isBallColliding(ballX, ballY, {
            x: block.x,
            y: block.y,
            width: block.width,
            height: block.height,
          })
        ) {
          ballYSpeed *= -1.05; // 공의 방향 변경
          block.isVisible = false; // 블록 숨기기
          score += 10;
        }
      }
    }
  };

  // 초기화 함수 호출
  initBlocks(80, 20, { x: 50, y: 100 });
};

export default function Page() {
  return (
    <div className="p-16">
      <h1 className="text-3xl font-semibold mb-4">핑퐁 게임</h1>
      <div
        className="border-2 border-black"
        style={{ position: 'relative', width: 654, height: 654 }}
      >
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
}
