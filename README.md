# USC-Mapping-Project
LA Assessor Portal: Build modular Esri/ArcGIS API independent of Assessor endpoints with focus on maintainability and reliability.

### Website
[mappingproject.azurewebsites.net](https://mappingproject.azurewebsites.net/)

### Work Flow
We maintain a main branch and a develop branch. The main branch will contain functioning, tested code.  
Main is considered "live." Only merge develop and main when you are sure the develop branch is functioning and tested.

#### New feature
* Branch from `develop` (not `main`) with `feature/<featurename>` format.
  * e.g. `feature/login_form`
* When ready to submit, create a pull request from feature to develop branch.
  * The request will ideally be reviewed by a team member and a stakeholder before merging with dev.
* Team member merges feature to develop branch.
* Remember:
  * Merge `feature/<featurename>` to `develop` and not directly to `main`.
  * Only push `develop` to `main` if you are certain it is functional and tested.

### Build Project Locally
The following instruction require a bash/zsh terminal as well as `dotnet` and `npm` commands.
Consider setting up an environment such as a conda environment to install the necessary commands.
* Open a terminal.
* Clone repo to a directory of your choosing on your system.
  * e.g. `git clone git@github.com:hchacon4/USC-Mapping-Project.git`
* You should now see a `USC-Mapping-Project` directory.
* Run `cd USC-Mapping-Project`
* Run the following commands to build the project:
  * React Build: Install dependencies and React app
    * `cd Mapping-System`
    * `npm install`   // installs this package's dependencies.
    * `npm run buildApp`   // builds this package for web app consumption (as opposed to building the package as an npm React component library).
    * `cd ..`
  * .Net Build: Build, publish, and copy Reach build to .Net directory -- i.e. `./API` directory.
    * `cd API`
    * `cp -a ../Mapping-System/dist/app/. ./wwwroot`
  * The project is now built and ready to lauch.
* Run the .Net web application
  * `dotnet run`
* View the website endpoint
  * Once the web app is running, one of the info line printouts should say:
    * `Now listening on: http://localhost:<####>` where `<####>` is replaced by a port number.
  * Open a browser tab and enter the provided localhost URL.

### Automated Deployment Details
The main branch deploys to Azure Web App when a push to the main branch is successful (i.e. push-to-main trigger).  
The process is automated using a GitHub workflow YAML script. See `.github/workflows/azure-webapps-dotnet-core.yml` for details.
#### Overview
On push-to-main trigger, a GitHub runner (i.e. compute resource instance) spins up and executes the following job steps:
* Build the frontend code located in the `Mapping-System` directory using `npm` cli.
* Build the backend code located in the `API` directory using `dotnet` cli.
* Copy contents of frontend build to `wwwroot` directory of the backend build.
* Zip the backend build -- including the files copied from the frontend -- for deployment.
* Makes a request to the Azure Web App account to post the zipped project.  

GitHub secret environment variables are used to both authenticate post requests from GitHub account to Azure account, and also hide creditials from the public.