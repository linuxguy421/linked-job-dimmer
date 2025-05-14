function applyCustomStyles(settings) {
  const style = document.createElement('style');
  style.id = 'job-dimmer-style';
  style.textContent = `
    .job-dimmed {
      opacity: ${settings.opacity} !important;
      background-color: ${settings.bgColor} !important;
      color: ${settings.textColor} !important;
    }
  `;
  document.head.appendChild(style);
}

function dimJobs(settings) {
  const jobCards = document.querySelectorAll('[data-job-id]');
  jobCards.forEach(card => {
    const textContent = card.textContent.toLowerCase();
    if (textContent.includes('viewed') || textContent.includes('applied')) {
      card.classList.add('job-dimmed');
    }
  });
}

function init() {
  chrome.storage.sync.get({
    enabled: true,
    opacity: 0.4,
    bgColor: '#2a2a2a',
    textColor: '#ccc'
  }, (settings) => {
    if (settings.enabled) {
      if (!document.getElementById('job-dimmer-style')) {
        applyCustomStyles(settings);
      }
      dimJobs(settings);
      const observer = new MutationObserver(() => dimJobs(settings));
      observer.observe(document.body, { childList: true, subtree: true });
    }
  });
}

window.addEventListener('load', init);
