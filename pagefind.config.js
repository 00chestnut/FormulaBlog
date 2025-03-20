// pagefind.config.js
export default {
    excludeSelectors: [
      ".pagination",
      ".Subtext" // Add this to exclude the excerpt/description class from Card2
    ],
    excludePaths: ["page/1"],
    rootSelector: "body",
    processStyles: true, // Note: fixed typo from "processStlyes"
    ignoreContent: [
      // You can also specify custom selectors to ignore for content extraction
      ".Subtext",
      "[data-pagefind-ignore]" // Add this to allow elements to be ignored via attribute
    ]
  }