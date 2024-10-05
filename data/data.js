const fileStructure = {
  id: 1,
  name: "root", // Root folder
  isFolder: true, // Indicates it's a folder
  items: [
    {
      id: 2,
      name: "public", // Child folder
      isFolder: true,
      items: [
        { id: 3, name: "index.html", isFolder: false, items: [] },
        { id: 4, name: "favicon.ico", isFolder: false, items: [] },
      ],
    },
    {
      id: 5,
      name: "src", // Child folder
      isFolder: true,
      items: [
        { id: 6, name: "App.js", isFolder: false, items: [] },
        { id: 7, name: "index.js", isFolder: false, items: [] },
        { id: 8, name: "App.css", isFolder: false, items: [] },
        {
          id: 9,
          name: "components", // Nested child folder inside 'src'
          isFolder: true,
          items: [
            { id: 10, name: "Header.js", isFolder: false, items: [] },
            { id: 11, name: "Footer.js", isFolder: false, items: [] },
          ],
        },
      ],
    },
    { id: 12, name: "package.json", isFolder: false, items: [] },
    { id: 13, name: "package-lock.json", isFolder: false, items: [] },
    { id: 14, name: "README.md", isFolder: false, items: [] },
  ],
};
export default fileStructure;
