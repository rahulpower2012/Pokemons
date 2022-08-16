# Pokémons

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Features

Developed using of React `<Suspense>` for lazy loading Pokemon card component (Not for fetching data).

Data is fetched as the user scrolls down the page.

Search filter is used to filter using names. If there are less than 6 Pokemons on the screen, more data is feteched until there are 6 or more than 6 pokemons visble or until there are no more Pokemons left to be fetched.


### Google Authentication

Uses Google Authentication for authenticating and shwing th Pokemon Listing.
