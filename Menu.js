document.addEventListener('DOMContentLoaded', () => {
  const configButton = document.getElementById('config-button');
  const configModal = document.getElementById('config-modal');
  const configCancelButton = document.getElementById('config-cancelButton');

  configButton.addEventListener('click', () => {
    configModal.style.display = 'flex';
    configButton.style.display = 'none';
  });

  configCancelButton.addEventListener('click', () => {
    configModal.style.display = 'none';
    configButton.style.display = 'inline';
  });
});