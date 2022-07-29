import './bonusRound.css'
import { useRef, useEffect, useState } from "react";
import frameRenderer from "../FrameRenderer/frameRenderer";
import { Link, useParams } from 'react-router-dom';
import bonusReceived from '../../assets/sounds/bonus-received.wav'
import missedBonus from '../../assets/sounds/missed-bonus.wav'

function BonusRound({
  pointValue,
  game,
  scoreChange,
  setScoreChange,
  closeModal,
  increasePlayerScore
}) {

  // Bonus received sound
  const gotBonus = new Audio(bonusReceived)
  gotBonus.volume = .60;
  // Bonus missed sound
  const missedBonusSound = new Audio(missedBonus)
  gotBonus.volume = .60;

  const gameId = useParams().gameId


  const canvasRef = useRef(null);
  const requestIdRef = useRef(null);
  // Make speed 5
  const ballRef = useRef({ x: Math.floor(Math.random() * 299), y: Math.floor(Math.random() * 299), vx: 6, vy: 6, radius: 5 });
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


  const [multiplier, setMultiplier] = useState(1);
  function stop() {
    cancelAnimationFrame(requestIdRef.current)
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
      setMultiplier(2);
      pointMultiplier(pointValue, 2);
      gotBonus.play();
      return;
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
      setMultiplier(3);
      pointMultiplier(pointValue, 3);
      gotBonus.play();
      return;
    }

    // If close to the two X4, multiply points by two for user
    let distance4x1 = bonusBallX - 250;
    let distance4y1 = bonusBallY - 225;
    let distance4x2 = bonusBallX - 100;
    let distance4y2 = bonusBallY - 325;
    let radii_sum4 = 5 + 25;
    if (distance4x1 * distance4x1 + distance4y1 * distance4y1 <= radii_sum4 * radii_sum4
      ||
      distance4x2 * distance4x2 + distance4y2 * distance4y2 <= radii_sum4 * radii_sum4) {
      setMultiplier(4)
      pointMultiplier(pointValue, 4)
      gotBonus.play();
      return;
    }

    // If close to the two x5, multiply points by two for user
    let distance5x1 = bonusBallX - 150;
    let distance5y1 = bonusBallY - 175;
    let radii_sum5 = 5 + 15;
    if (distance5x1 * distance5x1 + distance5y1 * distance5y1 <= radii_sum5 * radii_sum5) {
      setMultiplier(5);
      pointMultiplier(pointValue, 5);
      gotBonus.play();
      return;
    }
    missedBonusSound.play();
    setMultiplier(1);
    pointMultiplier(pointValue, 1);
  }

  const [ballStopped, setBallStopped] = useState(false);
  function pointMultiplier(points, multiplier) {
    game.currentPlayer.addPoints(points * multiplier);
    setScoreChange(scoreChange + 1);
    setBallStopped(true);
    increasePlayerScore(points * multiplier)
  }

  return (
    <>
      <h1 id='bonus-title'>Bonus Round!!!</h1>
      <canvas id='canvas' height="400" width="300" ref={canvasRef} />
      {
        ballStopped ?
          <>
            {
              multiplier > 1
                ?
                <>
                <div id='number-multiplier'>x{multiplier}!!</div>
                <div className='bonus-text' id='got-bonus-text'>Way to Go!</div>
                </>
                :
                <div className='bonus-text' id='no-bonus-text'>Aw, nice try.</div>
            }
            {game.endGame() ? 
              <Link id='end-game-link' state={game} to={`/winner-podium/${gameId}`}><button id='end-game-bonus'>End Game</button></Link>
            :
            <button id='next-player-btn' className='bonus-buttons' onClick={closeModal}>Next Player</button>
            
            }
          </>
          :
          <>
            <div className='bonus-text'>Hit stop or press spacebar.</div>
            <button className='bonus-buttons' id='stop-ball-btn' onClick={stop}>Stop</button>
          </>
      }
    </>

  )
}

export default BonusRound;
