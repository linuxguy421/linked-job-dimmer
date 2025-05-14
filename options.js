document.addEventListener('DOMContentLoaded', () => {
  const enabled = document.getElementById('enabled');
  const opacity = document.getElementById('opacity');
  const bgColor = document.getElementById('bgColor');
  const textColor = document.getElementById('textColor');

  chrome.storage.sync.get({
    enabled: true,
    opacity: 0.4,
    bgColor: '#2a2a2a',
    textColor: '#ccc'
  }, (settings) => {
    enabled.checked = settings.enabled;
    opacity.value = settings.opacity;
    bgColor.value = settings.bgColor;
    textColor.value = settings.textColor;
  });

  document.getElementById('save').addEventListener('click', () => {
    chrome.storage.sync.set({
      enabled: enabled.checked,
      opacity: parseFloat(opacity.value),
      bgColor: bgColor.value,
      textColor: textColor.value
    }, () => alert('Settings saved!'));
  });
});
