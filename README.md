# Project - CSCI 5410 - Group 24 - Serverless B&B

- _Date Created_: 1 JUN 2022
- _Last Modification Date_: 24 JUL 2022
- _Deployed Application URL_: <https://bnb-til6sazzwa-uc.a.run.app/>
- _Git Repository URL_: <https://git.cs.dal.ca/benny/csci5410_Group24>

## Authors

- [Benny Tharigopala](Benny.Daniel@dal.ca) - _(Maintainer)_
- [Jaswanth Mandava](Js402569@dal.ca) - _(Maintainer)_
- [Kandarp Parikh](kandarp.parikh@dal.ca) - _(Maintainer)_
- [Prit Thakkar](prit.thakkar@dal.ca) - _(Maintainer)_
- [Ruchi Shinde](rc382783@dal.ca) - _(Maintainer)_
- [Viren Malavia](viren.malavia@dal.ca) - _(Maintainer)_

## Getting Started

See the following section for detailed step-by-step instructions on how to run this project locally and See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To have a local copy of this tutorial up and running on your local machine, you will first need to install the following software

- [Node.js](https://nodejs.org/en/) - a JavaScript runtime (includes npm)
- [npm](https://docs.npmjs.com/about-npm) - a package manager for Node environment

### Installing

To get a development env running on local machine, run the following command in the project directory

Below command installs all the packages provided in package.json file into the folder called node_modules at the root of the project directory. You can see node_modules folder created at the root of the project directory when installation gets successful.

```
npm install
```

Below command runs the project in development mode. You can visit [http://localhost:3000](http://localhost:3000) to view it in your browser.

```
npm start
```

### Deployment
The deployment of Serverless B&B is on Google Cloud Run, which allows us to run containerized application invocable by requests. We have packaged the image using Docker with base image of node and NGINX.

Below command creates a build and pushes it to the Container Registry

```
gcloud builds submit --tag gcr.io/[YOUR_PROJECT_ID]/cra-cloud-run
```

Below command deploys the container image to CloudRun.

```
gcloud run deploy --image gcr.io/[YOUR_PROJECT_ID]/cra-cloud-run --platform managed
```


## Built With

- [React](https://reactjs.org/docs/getting-started.html) - A JS library for building UIs
- [React router dom](https://reactrouter.com/docs/en/v6/getting-started/installation) - A library for frontend routing for Single Page Application (SPA)
- [Material UI](https://mui.com/getting-started/installation/) - The React UI library
- [Bootstrap](https://getbootstrap.com/) - Build fast, responsive sites with Bootstrap
- [Google Cloud](https://cloud.google.com/) - Cloud Provider
- [Amazon Web Services](https://aws.amazon.com/) - Cloud Provider


## Acknowledgments

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
