import './commons/android-ble-patch.js';
import ToioController from './commons/ToioController';

const toioStartBtn = document.getElementById('wble-start');
const startBtnWrapper = document.getElementById('start-btn-wrapper');
const ctrlWrapper = document.getElementById('controller-wrapper');
const acceleBtn = document.getElementById('accele');

const support = 'ontouchend' in document;
const TOUCH_START = (support) ? 'touchstart': 'mousedown';
const TOUCH_END = (support) ? 'touchend': 'mouseup';
const TOUCH_MOVE = (support) ? 'touchmove': 'mousemove';

let isMove = false;

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

  acceleBtn.addEventListener(TOUCH_START, event => {
    isMove = true;
    document.getElementById('debug').innerText = event.type;
    window.addEventListener('devicemotion', event => {
      handleOrientation(event, toio);
    });
  });
  // deviceorientation
  acceleBtn.addEventListener(TOUCH_END, event => {
    isMove = false;
    document.getElementById('debug').innerText = event.type;
    toio.stopCube();
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
