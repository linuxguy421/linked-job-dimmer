
document.getElementById("save").addEventListener("click", () => {
  const opacity = parseFloat(document.getElementById("opacity").value);
  const color = document.getElementById("color").value;
  const keywords = document.getElementById("keywords").value.split(',').map(k => k.trim().toLowerCase());

  chrome.storage.sync.set({ opacity, color, keywords }, () => {
    document.getElementById("status").textContent = "Options saved!";
    setTimeout(() => document.getElementById("status").textContent = "", 2000);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["opacity", "color", "keywords"], (data) => {
    document.getElementById("opacity").value = data.opacity ?? 0.5;
    document.getElementById("color").value = data.color ?? "#dddddd";
    document.getElementById("keywords").value = (data.keywords || []).join(", ");
  });
});
