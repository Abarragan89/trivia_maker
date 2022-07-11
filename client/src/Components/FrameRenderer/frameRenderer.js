function frameRenderer(size, ball) {
    this.clearRect(0, 0, size.width, size.height);
  
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

    const winningCirles = (x, y, radius, text, color) => {
      this.save();
      this.beginPath();
      this.arc(x, y, radius, 0, Math.PI * 2);
      this.strokeStyle = 'black';
      this.stroke();
      this.fillStyle = color;
      this.fill();
      this.closePath();
      this.restore();

      this.beginPath();
      this.textBaseline = 'middle';
      this.textAlign = 'center';
      this.fillStyle = 'black';
      this.fillText(text, x, y);
      this.closePath();
      this.restore();
    }
    
    winningCirles(150, 75, 10, 'x5', 'green');
    winningCirles(100, 125, 20, 'x4', 'yellow');
    winningCirles( 50, 50, 30, 'x3', 'orange');
    winningCirles(230, 100, 40, 'x2', 'purple');

    drawCircle(ball.x, ball.y, ball.radius, "green");
  }
  
  export default frameRenderer;
  