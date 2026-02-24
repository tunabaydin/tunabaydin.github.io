document.addEventListener("DOMContentLoaded", async () => {
  const nodes = document.querySelectorAll("[data-partial]");

  for (const node of nodes) {
    const partialPath = node.getAttribute("data-partial");
    if (!partialPath) continue;

    try {
      const response = await fetch(partialPath, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Failed to load ${partialPath}`);
      node.innerHTML = await response.text();
    } catch (error) {
      console.error(error);
    }
  }
});
