/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust according to your project structure
      "./node_modules/flowbite/**/*.js"   // Include Flowbite components
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('flowbite/plugin')           // Add Flowbite as a plugin
    ],
  };
  