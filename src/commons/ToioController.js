import { NearestScanner } from '@toio/scanner';
import { Note } from '@toio/cube';
const DURATION = 0;
const SPEED = {
  forward: [200, 200],
  back: [-200, -200],
  left: [60, 140],
  right: [140, 60],
  spin: {
    left: [-200, 200],
    right: [200, -200]
  }
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
    return this.cube.move(SPEED[direction][0], SPEED[direction][1], DURATION);
  }

  spinCube(direction) {
    if (this.cube === null) {
      return;
    }
    return this.cube.move(SPEED.spin[direction][0], SPEED.spin[direction][1], DURATION);
  }

  stopCube() {
    if (this.cube !== null) {
      this.cube.stop();
    }
  }

  async playMusic() {
    console.log(this.cube)
    this.cube.playPresetSound(4);
    // this.cube.playSound({
    //
    // }, 1)
  }

  stopMusic() {
    if (this.cube !== null) {
      this.cube.stopSound();
    }
  }

};
