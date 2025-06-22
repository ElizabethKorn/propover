/**
 * @jest-environment jest-environment-jsdom
 */

import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/dom";

describe("Popover widget", () => {
  let button;
  let popoverEl = null;

  beforeEach(() => {
    document.body.innerHTML = `
      <button id="popover-btn">Нажми меня</button>
    `;
    button = document.getElementById("popover-btn");
    popoverEl = null;

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
      const rect = button.getBoundingClientRect();
      const top = rect.top || 100;
      const left = rect.left || 100;
      const width = rect.width || 50;

      const offsetHeight = popoverEl.offsetHeight || 40;

      popoverEl.style.left = `${left + width / 2 - 100}px`;
      popoverEl.style.top = `${top - offsetHeight - 10}px`;
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
  });

  test("popover появляется и исчезает при клике на кнопку", () => {
    expect(document.querySelector(".popover")).toBeNull();

    fireEvent.click(button);
    let popover = document.querySelector(".popover");
    expect(popover).toBeInTheDocument();
    expect(popover).toHaveTextContent("Popover title");
    expect(popover).toHaveTextContent(
      "And here's some amazing content. It's very engaging. Right?"
    );

    fireEvent.click(button);
    expect(document.querySelector(".popover")).toBeNull();
  });

  test("popover закрывается при клике вне", () => {
    fireEvent.click(button);
    let popover = document.querySelector(".popover");
    expect(popover).toBeInTheDocument();

    fireEvent.click(document.body);
    expect(document.querySelector(".popover")).toBeNull();
  });

  test("popover не закрывается при клике внутри", () => {
    fireEvent.click(button);
    let popover = document.querySelector(".popover");
    expect(popover).toBeInTheDocument();

    fireEvent.click(popover);
    expect(document.querySelector(".popover")).toBeInTheDocument();

    fireEvent.click(button);
    expect(document.querySelector(".popover")).toBeNull();
  });
});
