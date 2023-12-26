# Open Gea - Front End v2.0.0

## Origin in YvY

In this project, you will see the word YvY many times. YvY means Earth in Guaraní, just like Gea in ancient Greek. YvY is the original, non-open source project from which Gea is inspired. 

## Types of Users

   Gea offers two possibilities when registering:

- <b> Producer: </b> Control your farms, calculations such as water or carbon footprint, agronomic data, QR code, and among other functions available in Gea.

- <b> Organization: </b> Control the members of your organization and their respective farms, calculations, georeferencing, among other functions available in Gea.
  
Also, there is an admin role for developers and administrators of Gea:

- <b> Administrator: </b> Control the access to Gea, other general data and statistics.

## Modules Available

The application covers these principal modules for Producers:

- User Profile.
- Farms and Product Management.
- Calculation of Carbon Footprint and Water Footprint.
- Watering Needs.
- Agronomic Data.
- Weather Forecast.
- Seasonal Forecast.
- Historical Records with Farms/Lots Information, Agriculture Production, Accounting and Staffing.
- Soil Regeneration Plan.
- Historical Records
- Sustainability Self-Assessment. 
- QR Code.
- Organizations with their Invitations and Requests.

Also, we have these modules available for Organizations:
- Organization Profile.
- Farms Management.
- Carbon Footprint and Water Footprint Management.
- General Management.
- Agronomic Data Management.
- Members Management.
- Georeferencing.

And we have these modules available for Administrators:
- Administration, handle users and countries available in the application with their permissions.
- Statistics, get information about the users per country and number of users registered per year/country.

## Project Roadmap

Participation is welcomed from software developers, designers, testers, agronomists/agri experts/soil experts, IoT engineers, researchers, students, farmers, and others who can help improve the quality and value of the solution for small farmers around the world.

Please check the issues to see how you can contribute to the project

## Getting Started

### Technologies

The main technology used in client gea app are:

*  <div style="display: flex; justify-items: center;">
    <img src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="react.js" width="20" height="20" style="margin-right: 10px;">
    <p style="color: white; font-weight: bold;">React Js</p>
    <p style="color:white; padding-left:10px;">For components</p>
</div>

*  <div style="display: flex; justify-items: center; ">
    <img src="https://user-images.githubusercontent.com/25181517/187896150-cc1dcb12-d490-445c-8e4d-1275cd2388d6.png" alt="redux" width="20" height="20" style="margin-right: 10px;">
    <p style="color: white; font-weight: bold;">Redux</p>
    <p style="color:white; padding-left:10px;">For local storage, routers and guards</p>
</div>

*  <div style="display: flex; justify-items: center; ">
    <img src="https://user-images.githubusercontent.com/25181517/189716630-fe6c084c-6c66-43af-aa49-64c8aea4a5c2.png" alt="material-ui" width="20" height="20" style="margin-right: 10px;">
    <p style="color: white; font-weight: bold;">Material UI</p>
    <p style="color:white; padding-left:10px;">For styling</p>
</div>

*  <div style="display: flex; justify-items: center;">
    <img src="https://avatars.githubusercontent.com/u/8546082?s=280&v=4" alt="i18n" width="30" height="30" style="margin-right: 10px;">
    <p style="color: white; font-weight: bold;">i18 Next:</p>
    <p style="color: white; padding-left: 10px;">For translations English and Spanish</p>
</div>

*  <div style="display: flex; justify-items: center; ">
    <img src="https://branditechture.agency/brand-logos/wp-content/uploads/wpdm-cache/Axios-900x0.png" alt="axios" width="50" height="30" style="margin-right: 10px;">
    <p style="color: white; font-weight: bold;">Axios</p>
    <p style="color:white; padding-left:10px;">For http client-server communication</p>
</div>

*  <div style="display: flex; justify-items: center;">
    <img src="https://github.com/marwin1991/profile-technology-icons/assets/62091613/b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35" alt="vite" width="20" height="20" style="margin-right: 10px;">
    <p style="color: white; font-weight: bold;">Vite</p>
    <p style="color:white; padding-left:10px;">For building and developments tools</p>
</div>

##  Gea App - Setup Guide

### Cloning the Repository


```
https://github.com/open-gea/Client-Gea
```

```
cd gea-app
```

### Dependencies Installation

_You require [npm](https://phoenixnap.com/kb/install-node-js-npm-on-windows) installed_ 🤷‍♀️
```
npm install
```

### Running the Client Gea Locally

To set up and run the gea-app for a local environment:


- Create a `.env` file in the root directory of your `gea-app` and populate with the following:
   
```js

# Must be the url endpoint where the backend server is running. 
VITE_YVY_BACKEND_BASE_URL=http://localhost:8001 

#Vite uses this port to run the app locally in development mode. Check the port once you run it and change this variable if you need to.
VITE_YVY_APPDOMAIN=http://localhost:5173 

# In order to restart the local storage, redux uses numbers version of it. Every time you change it, localstarage will be reset. Can be any number
VITE_YVY_LOCALSTORAGE_VERSION=1

```


### Starting the Project

```
npm run dev
```


## Contributors


## Contributing

Please contact the members of this list:

- Sofia Ferro - Project Coordinator - sferro@plan21.org
- Guadalupe Carbó  - Project Coordinator - sferro@plan21.org
- Federico Interlandi Zoireff - Software Developer and Cloud Administrator - finterlandi@plan21.org

<!-- Slack space -->

<!-- IMAGE SHIELDS -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=008B4A
[React-url]: https://reactjs.org/
[Redux.js]: https://user-images.githubusercontent.com/25181517/187896150-cc1dcb12-d490-445c-8e4d-1275cd2388d6.png
[Redux-url]: https://redux.js.org/
[Javascript.js]: https://img.shields.io/badge/Javascript-20232A?style=for-the-badge&logo=javascript&logoColor=008B4A
[Javascript-url]: https://developer.mozilla.org/es/docs/Web/JavaScript
[Redux.js]: https://img.shields.io/badge/Redux-20232A?style=for-the-badge&logo=redux&logoColor=008B4A
[Redux-url]: https://es.redux.js.org/
[Mui.js]: https://img.shields.io/badge/Mui-20232A?style=for-the-badge&logo=mui&logoColor=008B4A
[Mui-url]: https://mui.com/
[Axios.js]: https://img.shields.io/badge/Axios-20232A?style=for-the-badge&logo=axios&logoColor=008B4A
[Axios-url]: https://axios-http.com/docs/intro


