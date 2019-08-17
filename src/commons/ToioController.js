import { NearestScanner } from '@toio/scanner';
const DURATION = 0;
const SPEED = {
  forward: [200, 200],
  back: [-200, -200],
  left: [60, 140],
  right: [140, 60]
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

  async moveCube(direction) {
    if (this.cube === null) {
      return;
    }
    return this.cube.move(SPEED[direction][0], SPEED[direction][1], DURATION);
  }

  stopCube() {
    if (this.cube !== null) {
      this.cube.stop();
    }
  }

};
