function frameRenderer(size, ball, backgroundAlpha) {
    this.clearRect(0, 0, size.width, size.height);

    const drawBackground = () => {
      this.fillStyle = `rgba(0,0,0,${backgroundAlpha})`;
      this.fillRect(0, 0, size.width, size.height)
    }
  
    const drawCircle = (x, y, radius, color, alpha) => {
      this.save();
      this.beginPath();
      this.arc(x, y, radius, 0, Math.PI * 2);
      this.fillStyle = color;
      this.globalAlpha = alpha;
      this.fill();
      this.closePath();
      this.restore();
    };

    const winningCirles = (x, y, radius, text, color) => {
      this.save();
      this.beginPath();
      this.arc(x, y, radius, 0, Math.PI * 2);
      this.fillStyle = color;
      this.fill();
      this.closePath();
      this.restore();

      this.beginPath();
      this.font = '20px Monospace'
      this.textBaseline = 'middle';
      this.textAlign = 'center';
      this.fillStyle = 'white';
      this.fillText(text, x, y);
      this.closePath();
      this.restore();
    }
    drawBackground()
    
    winningCirles(200, 250, 15, 'x5', 'green');
    
    winningCirles(100, 450, 25, 'x4', 'orange');
    winningCirles(300, 230, 25, 'x4', 'orange');

    winningCirles(290, 100,35, 'x3', 'blue');
    winningCirles(80, 300, 35, 'x3', 'blue');

    winningCirles(320, 420, 45, 'x2', 'purple');
    winningCirles(70, 70, 45, 'x2', 'purple');

    drawCircle(ball.x, ball.y, ball.radius, "#F1EEE9");
  }
  
  export default frameRenderer;
  