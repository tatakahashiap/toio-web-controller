import './commons/android-ble-patch.js';
import ToioController from './commons/ToioController';

const toioStartBtn = document.getElementById('wble-start');
const startBtnWrapper = document.getElementById('start-btn-wrapper');
const ctrlWrapper = document.getElementById('controller-wrapper');
const acceleBtn = document.getElementById('accele');
const spinBtn = document.getElementById('spin');
const spinRightBtn = document.getElementById('spin-right');
const playMusic = document.getElementById('musix');

const support = 'ontouchend' in document;
const TOUCH_START = (support) ? 'touchstart': 'mousedown';
const TOUCH_END = (support) ? 'touchend': 'mouseup';
const TOUCH_MOVE = (support) ? 'touchmove': 'mousemove';

let isMove = false;
let isSpin = false;

toioStartBtn.addEventListener('click', async () => {
  const toio = new ToioController();
  const isConnect = await toio.startConnect();
  if (isConnect === true) {
    handleDevice(toio);
  }
});

const handleDevice = (toio) => {
  startBtnWrapper.classList.add('none');
  ctrlWrapper.classList.remove('none');

  // deviceorientation
  acceleBtn.addEventListener(TOUCH_START, event => {
    isMove = true;
    window.addEventListener('devicemotion', event => {
      if (!isSpin) {
        handleOrientation(event, toio);
      }
    });
  });

  spinBtn.addEventListener(TOUCH_START, event => {
    isSpin = true;
    toio.spinCube('left');
  });
  spinRightBtn.addEventListener(TOUCH_START, event => {
    isSpin = true;
    toio.spinCube('right');
  });

  acceleBtn.addEventListener(TOUCH_END, event => {
    isMove = false;
    toio.stopCube();
  });
  spinBtn.addEventListener(TOUCH_END, event => {
    isSpin = false;
    toio.stopCube();
  });
  spinRightBtn.addEventListener(TOUCH_END, event => {
    isSpin = false;
    toio.stopCube();
  });

  playMusic.addEventListener(TOUCH_START, event => {
    isSpin = false;
    isMove = false;
    toio.playMusic();
  });

  playMusic.addEventListener(TOUCH_END, event => {
    isSpin = false;
    isMove = false;
    toio.stopMusic();
  });
};

const handleOrientation = (event, toio) => {
  if (!isMove) {
    toio.stopCube();
    event.preventDefault();
    return false;
  }
  const ganma = event.rotationRate.gamma;
  let direction = 'forward';
  switch(true) {
    case (ganma > 30): {
      direction = 'left';
      break;
    }
    case (ganma < -30): {
      direction = 'right';
      break;
    }

    default: {
      break;
    }
  };
  toio.moveCube(direction);
}
