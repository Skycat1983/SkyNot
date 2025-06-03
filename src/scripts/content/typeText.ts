export function typeText(
  targetEl: HTMLElement,
  text: string,
  delayMs = 50
): void {
  targetEl.textContent = `"`;

  for (let i = 0; i < text.length; i++) {
    setTimeout(() => {
      targetEl.textContent += text[i];
    }, i * delayMs);
  }

  setTimeout(() => {
    targetEl.textContent += `"`;
  }, text.length * delayMs);
}
