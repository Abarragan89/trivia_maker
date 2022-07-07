import { useEffect, useRef, useState } from 'react';
import './bonusRound.css'


function BonusRound() {
    const canvasRef = useRef(null)
    const [pause, setPause] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        // Particle constructor
        class Particle {
            constructor(xPos, yPos, radius, color, speed, ) {
                this.x = xPos;
                this.y = yPos;
                this.color = color;
                this.speed = speed;
                this.radius = radius

                this.dx = 1 * this.speed
            }
            update() {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                this.draw(ctx)
                if((this.x + this.radius) > canvas.width) {
                    this.dx = -this.dx
                }
                if((this.x - this.radius) < 0) {
                    this.dx = -this.dx
                }
                
                this.x += this.dx;
            }
            draw () {
                ctx.fillStyle = this.color;
                ctx.lineWidth = 1
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
                ctx.fill()
            }
        }


        const bumper = new Particle(15, 15, 8, 'green', 3)
        function animate() {
            if(pause) {
                return
            }  
            requestAnimationFrame(animate);
            bumper.update()
        }
        animate();
    },[])
    
    function hitBonus () {
        setPause(!pause)
        console.log(pause)
    }
    return (
        <section>
            <p>This is the bonus round!!!</p>
            <canvas id='canvas'ref={canvasRef} />
            <button onClick={hitBonus}>stop</button>
        </section>
    )
}

export default BonusRound;