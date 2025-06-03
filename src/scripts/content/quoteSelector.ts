// ──────────────────────────────────────────────────────────────────────────
// Terminator Quote Selection System
// ──────────────────────────────────────────────────────────────────────────

/*
Provides functions to select and retrieve Terminator movie quotes.
Handles random selection and quote metadata for AI content replacement.
*/

import { quotes } from "./constants";

export interface Quote {
  quote: string;
  author: string;
  avatar: string;
}

/*
Returns a random Terminator quote from the quotes array.
Invoked by: processAIContainer() to get quote for replacing AI content
*/
export const getRandomQuote = (): Quote => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

/*
Returns a specific quote by index with wraparound.
Invoked by: Testing or specific quote selection (currently unused)
*/
export const getQuoteByIndex = (index: number): Quote => {
  return quotes[index % quotes.length];
};

/*
Returns total number of available quotes.
Invoked by: Statistics or debugging (currently unused)
*/
export const getTotalQuotes = (): number => {
  return quotes.length;
};
