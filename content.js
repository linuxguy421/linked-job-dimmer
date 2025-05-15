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
    return keywords.some(keyword =>
      new RegExp(`\\b${keyword}\\b`, 'i').test(lowerText)
    );
  };

  const observer = new MutationObserver(() => {
    try {
      const jobs = document.querySelectorAll(".job-card-container");
      jobs.forEach(job => {
        const alreadyDimmed = job.dataset.dimmed;
        if (!alreadyDimmed) {
          const statusEl = job.querySelector(".job-card-container__footer-job-state");
          const statusText = statusEl?.innerText ?? "";
          const fullText = job.innerText;

          const shouldDim =
            statusText.includes("Applied") ||
            statusText.includes("Viewed") ||
            shouldDimByKeyword(fullText);

          if (shouldDim) {
            dimJob(job);
            job.dataset.dimmed = "true";
          }
        }
      });
    } catch (e) {
      console.error("Job Dimmer error:", e);
    }
  });

  const jobListContainer = document.querySelector(".jobs-search-results-list");
  if (jobListContainer) {
    observer.observe(jobListContainer, { childList: true, subtree: true });
  } else {
    observer.observe(document.body, { childList: true, subtree: true });
  }
});
