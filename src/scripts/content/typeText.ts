// ──────────────────────────────────────────────────────────────────────────
// Typing Animation Effect
// ──────────────────────────────────────────────────────────────────────────

/*
Creates typewriter-style animation for displaying quotes character by character.
*/

/*
Animates text appearing character by character with configurable delay.
Invoked by: processAIContainer() to animate quote text after DOM replacement
*/
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
