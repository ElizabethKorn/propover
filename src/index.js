import "./style.css";

const button = document.getElementById("popover-btn");

let popoverEl = null;

button.addEventListener("click", () => {
  if (popoverEl) {
    popoverEl.remove();
    popoverEl = null;
    return;
  }

  popoverEl = document.createElement("div");
  popoverEl.className = "popover";
  popoverEl.innerHTML = `
    <div class="popover-header">Popover title</div>
    <div class="popover-body">And here's some amazing content. It's very engaging. Right?</div>
  `;

  document.body.appendChild(popoverEl);

  const { top, left, width } = button.getBoundingClientRect();
  const { offsetHeight } = popoverEl;

  popoverEl.style.left = `${left + width / 2 - 100 + window.scrollX}px`;
  popoverEl.style.top = `${top - offsetHeight - 10 + window.scrollY}px`;
});

document.addEventListener("click", (e) => {
  if (
    popoverEl &&
    !e.target.closest(".popover") &&
    !e.target.closest("#popover-btn")
  ) {
    popoverEl.remove();
    popoverEl = null;
  }
});
