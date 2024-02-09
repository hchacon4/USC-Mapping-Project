# USC-Mapping-Project
LA Assessor Portal: Build modular Esri/ArcGIS API independent of Assessor endpoints with focus on maintainability and reliability.

### Work Flow
We maintain a main branch and a develop branch. The main branch will contain functioning, tested code.  
Main is considered "live." Only merge develop and main when you are sure the develop branch is functioning and tested.

#### New feature
* Branch from dev with `feature/` format.
* When ready to submit, create a pull request.
  * The request will ideally be reviewed by a team member and a stakeholder before merging with dev.
* Team member merges develop to main branch.  

Remember:
* Merge `feature/<featurename>` to `dev` and not directly to `main`.
* Only push `dev` to `main` if you are certain it is functional and tested.
