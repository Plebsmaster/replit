// Quotes for the SalonID Design form
// Add your 200 quotes to this array. Each quote will appear and disappear above the footer.

export const quotes: string[] = [
  // Add your quotes here in this format:
  // "Your first inspiring quote here",
  // "Second quote about beauty and style",
  // "Third motivational message",
  
  // Example quotes (replace with your 200 quotes):
  "Beauty begins the moment you decide to be yourself",
  "Style is a way to say who you are without having to speak",
  "Your salon is your canvas, make it a masterpiece",
  "Great hair doesn't happen by chance, it happens by appointment",
  "Confidence is the best accessory",
  
  // Add the remaining 195 quotes below...
  // Simply paste them as strings separated by commas
]

// Function to get a random quote
export function getRandomQuote(): string {
  return quotes[Math.floor(Math.random() * quotes.length)]
}

// Function to get quotes in sequence
export function getQuoteByIndex(index: number): string {
  return quotes[index % quotes.length]
}