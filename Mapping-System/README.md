# Set Up Environment Variables
The mapping layer API access URLs and keys are not public information. The end user of this package must set up a  
`.env` file providing API URLs and keys. Contact LA Assessors office development team regarding permissions and  
details.
1. Create a file named `.env` in the directory containing the code you intend to use this package.
2. Add the following lines to the `.env` file:
  a. `API_KEY=<your_api_key>`
  b. `API_URL=<api_url>`
3. Run `npm install dotenv`
4. Include `require('dotenv').config()` (JavaScript) in the code files that require API access.
  a. `import 'dotnet/config';` (TypeScript)
This package is now ready for use. If you encounter problems utilizing this package, please submit an issues ticket.  


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
