// pagefind.config.js
export default {
  excludeSelectors: [
    ".pagination",
    ".Subtext"
  ],
  excludePaths: ["page/1"],
  rootSelector: "body",
  processStyles: true,
  forceLanguage: "en",
  
  // Add custom processing rules for extraction
  elements: {
    // Specify how to handle each data-pagefind-meta attribute
    title: {
      // Use the exact data-pagefind-meta="title" content
      selector: "[data-pagefind-meta='title']",
      processText: (text) => text
    }
  }
}