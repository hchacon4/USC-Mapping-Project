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
