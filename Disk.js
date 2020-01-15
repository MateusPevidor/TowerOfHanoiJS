class Disk {
  constructor(size) {
    this.size = size;
    this.width = this.size * 20 + 40;
    this.height = 25;
  }

  draw(baseX, y) {
    c.fillStyle = this.getColor(this.size);
    c.fillRect(
      baseX - this.width / 2,
      canvas.height - (y + 1) * this.height,
      this.width,
      this.height
    );
  }

  getColor(i) {
    let n = i % 8;
    switch(n) {
      case 0:
        return '#ff5555';
      case 1:
        return '#ffb86c';
      case 2:
        return '#f1fa8c';
      case 3:
        return '#50fa7b';
      case 4:
        return '#8be9fd';
      case 5:
        return '#6272a4';
      case 6:
        return '#bd93f9';
      case 7:
        return '#ff79c6';
    }
  }
}