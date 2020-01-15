let poleCount = 0;
class Pole {
  constructor() {
    this.disks = new Array();
    this.id = poleCount;
    this.width = 30;
    this.height = 350;
    this.x = 0;

    poleCount++;
  }

  draw() {
    c.fillStyle = '#f8f8f2';
    let offset = 75;
    let spacing = canvas.width / (poleCount + 1);
    this.x = spacing * (this.id + 1) - offset + (offset * this.id);
    c.fillRect(
      this.x - this.width / 2,
      canvas.height - this.height,
      this.width,
      this.height
    );
    if (!blind)
      this.disks.forEach((disk, i) => {
        disk.draw(this.x, i);
      });
  }

  getUpper() {
    if (this.disks.length == 0) return 999;
    return this.disks[this.disks.length - 1].size;
  }
}