import { Plugin } from "../plugin"

export const reactIconsPlugin: Plugin = {
  id: "react-icons",
  name: "React Icons",
  description: "Adds support for React Icons",
  active: ({ flags }) => Boolean(flags["react-icons"]),
  devDependencies: [{ name: "react-icons", version: "^4.8.0" }],
  technologies: [
    {
      id: "reactIcons",
      name: "React Icons",
      description:
        "React Icons is SVG icon library. It comprises icons from over 25 of the most popular icon libraries including Ant Design Icons, Bootstrap Icons, Feather, Font Awesome, and Material Design icons. It uses React component syntax, and utilizes ES6 imports to only bundle the icons your app is using.",
      links: [
        { title: "Website", url: "https://react-icons.github.io/react-icons/" },
        { title: "GitHub", url: "https://github.com/react-icons/react-icons" },
      ],
    },
  ],
}
