(() => {
  const input = document.getElementById("actual-value");
  if (!input) return;

  function normalizeDigits(value) {
    return value
      .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x660))
      .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x6f0))
      .replace(/٫/g, ".")
      .replace(/٬/g, "")
      .replace(/,/g, ".")
      .replace(/[%٪]/g, "");
  }

  function syncValue() {
    const normalized = normalizeDigits(input.value);
    if (normalized !== input.value) input.value = normalized;
    const numeric = Number(input.value);
    if (input.value.trim() && Number.isFinite(numeric) && numeric >= 0) {
      input.setAttribute("aria-valuenow", String(numeric));
    } else {
      input.removeAttribute("aria-valuenow");
    }
  }

  function adjustBy(points) {
    const text = normalizeDigits(input.value).trim();
    const current = text ? Number(text) : Number(input.dataset.initialValue);
    const base = Number.isFinite(current) ? current : Number(input.dataset.initialValue);
    const next = Math.max(0, Math.round((base + points) * 100) / 100);
    input.value = String(next);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.focus();
  }

  input.addEventListener("input", syncValue);
  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      adjustBy(event.key === "ArrowUp" ? 1 : -1);
    }
  });
  document.querySelectorAll("[data-percent-step]").forEach((button) => {
    button.addEventListener("click", () => adjustBy(Number(button.dataset.percentStep)));
  });
  syncValue();
})();
