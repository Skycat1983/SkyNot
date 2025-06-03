import { quotes } from "./constants";

export interface Quote {
  quote: string;
  author: string;
  avatar: string;
}

export const getRandomQuote = (): Quote => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

export const getQuoteByIndex = (index: number): Quote => {
  return quotes[index % quotes.length];
};

export const getTotalQuotes = (): number => {
  return quotes.length;
};
