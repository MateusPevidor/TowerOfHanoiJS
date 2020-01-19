let configButton;
let configModal;
let configCancelButton;
let configApplyButton;

let config_initialState = {
  blind: false
};

document.addEventListener('DOMContentLoaded', () => {
  configButton = document.getElementById('config-button');
  configModal = document.getElementById('config-modal');
  configCancelButton = document.getElementById('config-cancelButton');
  configApplyButton = document.getElementById('config-saveButton');

  configButton.addEventListener('click', () => {
    setInitialState();
    toggleModal('config');
  });

  configCancelButton.addEventListener('click', () => {
    restoreInitialState();
    toggleModal('config');
  });

  configApplyButton.addEventListener('click', () => {
    toggleModal('config');
    applyConfigs();
  });
});

function toggleModal(type) {
  switch(type) {
    case 'config': {
      if (configModal.style.display == 'none' || configModal.style.display == '') configModal.style.display = 'flex'
      else configModal.style.display = 'none';
    
      if (configButton.style.display == 'inline' || configButton.style.display == '') configButton.style.display = 'none'
      else configButton.style.display = 'inline';
      
      break;
    }
  }
}

function setInitialState() {
  config_initialState.blind = document.getElementById('blind-checkbox').checked;
}

function restoreInitialState() {
  document.getElementById('blind-checkbox').checked = config_initialState.blind;
}

function applyConfigs() {
  if (document.getElementById('blind-checkbox').checked) blind = true;
  else blind = false;
}