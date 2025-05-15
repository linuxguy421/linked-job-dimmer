
chrome.storage.sync.get(["opacity", "color", "keywords"], (settings) => {
  const opacity = settings.opacity ?? 0.5;
  const color = settings.color ?? "#dddddd";
  const keywords = settings.keywords ?? [];

  const dimJob = (job) => {
    job.style.opacity = opacity;
    job.style.backgroundColor = color;
  };

  const shouldDimByKeyword = (text) => {
    const lowerText = text.toLowerCase();
    return keywords.some(keyword => lowerText.includes(keyword));
  };

  const observer = new MutationObserver(() => {
    try {
      const jobs = document.querySelectorAll(".job-card-container");
      jobs.forEach(job => {
        const alreadyDimmed = job.dataset.dimmed;
        if (!alreadyDimmed) {
          const textContent = job.innerText;
          if (textContent.includes("Applied") || textContent.includes("Viewed") || shouldDimByKeyword(textContent)) {
            dimJob(job);
            job.dataset.dimmed = "true";
          }
        }
      });
    } catch (e) {
      console.error("Job Dimmer error:", e);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
