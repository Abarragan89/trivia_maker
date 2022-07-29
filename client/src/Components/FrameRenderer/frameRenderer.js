function frameRenderer(size, ball) {
    this.clearRect(0, 0, size.width, size.height);

    const drawBackground = () => {
      this.fillStyle = '#15133C';
      this.fillRect(0, 0, size.width, size.height)
    }
  
    const drawCircle = (x, y, radius, color, alpha) => {
      this.save();
      this.beginPath();
      this.arc(x, y, radius, 0, Math.PI * 2);
      this.fillStyle = color;
      this.globalAlpha = alpha;
      this.fill();
      this.strokeStyle = 'black';
      this.stroke();
      this.closePath();
      this.restore();
    };

    // const winningCirles = (x, y, radius, text, color) => {
    //   this.save();
    //   this.beginPath();
    //   this.arc(x, y, radius, 0, Math.PI * 2);
    //   this.strokeStyle = 'black';
    //   this.stroke();
    //   this.fillStyle = color;
    //   this.fill();
    //   this.closePath();
    //   this.restore();

    //   this.beginPath();
    //   this.font = '20px Monospace'
    //   this.textBaseline = 'middle';
    //   this.textAlign = 'center';
    //   this.fillStyle = 'white';
    //   this.fillText(text, x, y);
    //   this.closePath();
    //   this.restore();
    // }
    // drawBackground()
    
    // winningCirles(150, 175, 15, 'x5', 'green');
    // winningCirles(100, 325, 25, 'x4', 'orange');
    // winningCirles(250, 225, 25, 'x4', 'orange');
    // winningCirles(230, 100, 35, 'x3', 'blue');
    // winningCirles(80, 200, 35, 'x3', 'blue');
    // winningCirles(250, 350, 40, 'x2', 'purple');
    // winningCirles(50, 50, 40, 'x2', 'purple');

    drawCircle(ball.x, ball.y, ball.radius, "white");
  }
  
  export default frameRenderer;
  