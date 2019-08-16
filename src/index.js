import './commons/android-ble-patch.js';
import ToioController from './commons/ToioController';

const toioStartBtn = document.getElementById('wble-start');
const startBtnWrapper = document.getElementById('start-btn-wrapper');
const ctrlWrapper = document.getElementById('controller-wrapper');

toioStartBtn.addEventListener('click', async () => {
  const toio = new ToioController();
  const isConnect = await toio.startConnect();
  if (isConnect === true) {
    startBtnWrapper.classList.add('none');
    ctrlWrapper.classList.remove('none');
    window.addEventListener("deviceorientation", (event) => {
      let isMove = false;
      let direction = 'forward';
      switch(true) {
        case (event.beta === -45): {
          isMove = true;
          direction = 'forward';
          break;
        }
        case (event.alpha === 45): {
          isMove = true;
          direction = 'left';
          break;
        }
        case (event.alpha === -45): {
          isMove = true;
          direction = 'right';
          break;
        }
        default: {
          break;
        }
      };
      if (isMove) {
        toio.moveCube(direction);
      }
    }, true);
  }
});
