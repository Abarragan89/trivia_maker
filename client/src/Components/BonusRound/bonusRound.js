import './bonusRound.css'
import { useRef, useEffect } from "react";
import frameRenderer from "../FrameRenderer/frameRenderer";

function BonusRound() {
  const canvasRef = useRef(null);
  const requestIdRef = useRef(null);
  // Make speed 6
  const ballRef = useRef({ x: Math.floor(Math.random() * 299), y: Math.floor(Math.random() * 299), vx: 3, vy: 3, radius: 5 });
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
    document.getElementById('stop-ball-btn').focus()
    requestIdRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  }, []);

  function stop() {
    console.log('stop')
    cancelAnimationFrame(requestIdRef.current)
    console.log(ballRef.current.x)
    console.log(ballRef.current.y)
    const bonusBallX = ballRef.current.x;
    const bonusBallY = ballRef.current.y;
    
    // If close to the two X2, multiply points by two for user
    let distance2x1 = bonusBallX - 50;
    let distance2y1 = bonusBallY - 50;
    let distance2x2 = bonusBallX - 250;
    let distance2y2 = bonusBallY - 350;
    let radii_sum2 = 5 + 40;
    if (distance2x1 * distance2x1 + distance2y1 * distance2y1 <= radii_sum2 * radii_sum2
      || 
      distance2x2 * distance2x2 + distance2y2 * distance2y2 <= radii_sum2 * radii_sum2) {
        console.log('collided with two')
      }
      // If close to the two X3, multiply points by two for user
      let distance3x1 = bonusBallX - 80;
      let distance3y1 = bonusBallY - 200;
      let distance3x2 = bonusBallX - 230;
      let distance3y2 = bonusBallY - 100;
      let radii_sum3 = 5 + 35;
      if (distance3x1 * distance3x1 + distance3y1 * distance3y1 <= radii_sum3 * radii_sum3
        || 
        distance3x2 * distance3x2 + distance3y2 * distance3y2 <= radii_sum3 * radii_sum3) {
          console.log('collided with three')
        }
      
      // If close to the two X4, multiply points by two for user
      let distance4x1 = bonusBallX - 250;
      let distance4y1 = bonusBallY - 225;
      let distance4x2 = bonusBallX - 100;
      let distance4y2 = bonusBallY - 325;
      let radii_sum4 = 5 + 35;
      if (distance4x1 * distance4x1 + distance4y1 * distance4y1 <= radii_sum4 * radii_sum4
        || 
        distance4x2 * distance4x2 + distance4y2 * distance4y2 <= radii_sum4 * radii_sum4) {
          console.log('collided with four')
        }
      
      // If close to the two x5, multiply points by two for user
      let distance5x1 = bonusBallX - 150;
      let distance5y1 = bonusBallY - 175;
      let radii_sum5 = 5 + 35;
      if (distance5x1 * distance5x1 + distance5y1 * distance5y1 <= radii_sum5 * radii_sum5) {
          console.log('collided with five')
        }
      
      // If you hit nothing
      
    }

  return (
  <>
      <h1>Bonus Round!!!</h1>
      <canvas id='canvas' height="400" width="300" ref={canvasRef} />
      <button id='stop-ball-btn' onClick={stop}>Stop</button>
  </>
    
  ) 
}

export default BonusRound;
