import { NearestScanner } from '@toio/scanner';
const DURATION = 700;
const SPEED = {
  forward: [100, 100],
  back: [-100, -100],
  left: [30, 70],
  right: [70, 30]
};

export default class ToioController {
  constructor() {
    this.cube = null;
  };

  async startConnect() {
    try {
      const cube = await new NearestScanner().start();
      await cube.connect();
      this.cube = cube;
      return true;
    } catch(err) {
      this.cube = null;
      alert(err);
      return false;
    }
  };

  moveCube(direction) {
    if (this.cube === null) {
      return;
    }
    this.cube.move(SPEED[direction][0], SPEED[direction][1], DURATION)
  }

};
