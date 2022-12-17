# Aura application - Pierre-Etienne Soury

Based the the [instructions](https://docs.google.com/document/d/1cfYaSmm_OWko2ds7axmPjQwQl8JhwUxlGAI99DohwgE/edit), I tried to create a dashboard presenting the revenues of the different games, by country.

Firstly, during the project setup/creation, I decided to go with React / Typescript / Tailwind, because I'm most familiar with these framework, and they are the standard of the industry today.

A first challenge was to understand the API, and to compare what the documentation was saying vs what the API was sending back.
Then I created a small data model to handle the types properly, with Typescript being in string mode.

Then I tried to create a readable dashboard, comparable to what the instructions were. This led me to need a data formatting function _formatMonetizationForDashboard_, which does a lot of the heavy lifting in getting the data easily presentable.

I then added some filters, to be able to easily read and display a dashboard with the infos wanted: on game, on ad format, on date-span, on the OS.

With all this done I could do a bit of styling, mostly using tailwind. This is far from being pretty, but I think the data is readable in a clear manner.

Finally, I removed what was useless or trials and errors, made sure the variable had understandable names, removed unsused libraries, and pushed everything ready for review.

## Feedback

Overall this little project was a lot of fun, and I appreciated in particular that the choice of framework and library was open.
The setup was very easy, because the API was provided, with a (out-of-date) documentation.
I spent roughly 4-5h on this test !

Thanks for considering me.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
