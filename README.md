<h1 align="center">🌐 The World Wise 🌐 </h1>

<div align="center">
<img src="https://img.shields.io/npm/v/npm.svg?logo=npm"/>
<img src="https://img.shields.io/badge/react-v18.3.1-blue?logo=react"/>
<img src="https://img.shields.io/badge/reactrouterdom-v6.26.2-red?logo=reactrouter"/>
<img src="https://img.shields.io/badge/leaflet-v1.9.4-green?logo=leaflet"/>
<img src="https://img.shields.io/badge/DatePicker-v7.4.0-yellow"/>
</div>

<p align="center">The World Wise is a web app, that helps you to not lose track of countries that u visited thru out of your journey across the world.</p>

<div align="center">
  
<a href="#quicstart" >Quickstart</a> • <a href="#technologies-used" align="center">Technologies Used</a> •  <a href="#screenshot" align="center"> Screenshot </a> • <a href="#you-may-also-like" align="center"> You may also like  </a> •  <a href="#license" align="center"> License  </a>

•<a href="https://world-wise-aleksandar.netlify.app/" align="Center">Live Server</a>

</div>

## Features

- **Home Page**: Welcomes users and provides quick access to core features.
- **Product Page**: Highlights the app's primary functionalities and unique value.
- **Pricing Page**: Displays available subscription options and pricing details.
- **Application Page**: Features an interactive map and a comprehensive list of cities and countries, helping users manage their travel plans.
- **Authentication**: Secure sign-in and sign-up functionality, powered by Firebase Authentication.

## Technologies Used

- [React](https://react.dev/) for building a responsive and component-based interface.
- [React Router](https://reactrouter.com/en/main) for seamless navigation between pages.
- [React Leaflet](https://leafletjs.com/) for map integration and visualization.
- [React DatePicker](https://reactdatepicker.com/) for convenient date selection in planning.
- [Firebase](https://firebase.google.com/) - for backend services, including **Firebase Authentication** for secure user login and management.
- **Context API** for efficient state management.
- **CSS Modules** for modular and scoped styling.

## Responsive Design

The app is fully responsive and adapts seamlessly for both desktop and mobile devices, ensuring a consistent user experience across screen sizes.

## Quicstart

To clone and run this application, you'll need [Git](https://git-scm.com/) and [NodeJS](https://nodejs.org/en) (which comes with [npm](https://www.npmjs.com/)) installed on your computer. From your command line:

```
# Clone this repository
$ git clone https://github.com/meiyrbek/worldwise.git

# Go into the repository
$ cd worldwise-main

# Install dependencies
$ npm install

# Run the app
$ npm run dev

```

Then, open the app locally by navigating to http://localhost:5173. You can press Ctrl and click the link in the command line or terminal to open it directly in your browser.

> [!NOTE]  
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Usage Guide

- **Home Page Navigation**: From the home page, users can navigate to the Product, Pricing, and Authentication pages.
- **Authentication Flow**: After successful sign-in or registration, users are directed to the main Application Page.
- **Sidebar and Map Features**:
  - Upon entering the Application Page, users will see a sidebar on the left for managing their added cities.
  - Users can interact with the map, placing markers and selecting locations. Upon selecting a location, a form will open in the sidebar to allow users to fill in details about the city.
  - After adding a city, it will appear in the city list on the sidebar. If no cities are added, the app will notify the user that the list is empty.
- **Mobile Navigation**:
  - In the mobile version, the sidebar is hidden by default. It can be accessed by tapping the button in the bottom-right corner of the map panel, which displays the selected city and country.
  - This button opens the sidebar where users can fill out forms or view the list of added cities and countries.

## License

**MIT**
