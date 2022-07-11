import './bonusRound.css'
import { useRef, useEffect } from "react";
import frameRenderer from "../FrameRenderer/frameRenderer";

function BonusRound() {
  const canvasRef = useRef(null);
  const requestIdRef = useRef(null);
  const ballRef = useRef({ x: 50, y: 50, vx: 6, vy: 6, radius: 5 });
  const size = { width: 300, height: 400 };

  const updateBall = () => {
    const ball = ballRef.current;
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.x + ball.radius >= size.width) {
      ball.vx = -ball.vx;
      ball.x = size.width - ball.radius;
    }
    if (ball.x - ball.radius <= 0) {
      ball.vx = -ball.vx;
      ball.x = ball.radius;
    }
    if (ball.y + ball.radius >= size.height) {
      ball.vy = -ball.vy;
      ball.y = size.height - ball.radius;
    }
    if (ball.y - ball.radius <= 0) {
      ball.vy = -ball.vy;
      ball.y = ball.radius;
    }
  };

  const renderFrame = () => {
    const ctx = canvasRef.current.getContext("2d");
    updateBall();
    // draws the circle
    frameRenderer.call(ctx, size, ballRef.current);
  };

  const tick = () => {
    if (!canvasRef.current) return;
    renderFrame();
    requestIdRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    requestIdRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  }, []);

  function stop() {
    console.log('stop')
    cancelAnimationFrame(requestIdRef.current)
    console.log(ballRef)
  }

  return (
  <>
      <h1>Bonus Round!!!</h1>
      <canvas id='canvas' height="400" width="300" ref={canvasRef} />
      <button onClick={stop}>Stop</button>
  </>
    
  ) 
}

export default BonusRound;
