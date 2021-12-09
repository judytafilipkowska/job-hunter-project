# job-hunter-project


**Description**


Job hunter is a job board where you can find the latest career opportunities that most adequate your professional profile. 

**User stories**


* **Signup** \- here you will have two options - sign up as employee or employer
* **Login**\- choosing your typeof account and getting you to your private page according to it.
* **Homepage** \- Here will be our main page - board with job offers plus map with dropped pins according to the areas where there’s job offers  \- and then you will only be able to check for details of the job and apply to it if logged in.
* **My Profile -** The website will display profiles with different features according to the kind of the profile of the user. 
* **My Profile/JobSeeker** \- access to latest applied jobs and CV.
* **My Profile/Employer**\- access to the Job Panel, where you can check the jobs you are inserting into the platform.
* **Edit Profile** \- As users, we want to be able to edit our profiles whenever we need it
* **Add Job** - Employer and add a job to the platform.
* **Edit Job** - Employer will be able to edit a job whenever he/she needs to.
* **Job Panel** - Employer has access to the created jobs.
* **Applied Jobs**- JobSeeker has access to the applied jobs. 
* **404** \- As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
* **500** \- As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

 

**Server Routes (Back-end):**

  

|      |                            |                                                              |                                                         |
| ---- | -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| GET  | `/`                        | Main page route. Renders home index view with job offers.    |                                                         |
| GET  | `/jobs/details-jobs`       | Renders jobs details view                                    |                                                         |
|      | `/jobs/details-jobs`       | Renders jobs details view                                    |                                                         |
| GET  | `/jobs/search/`            | Renders job Id search view.                                  |                                                         |
| GET  | `/signup/`                 | Renders auth/signup form view.                               |                                                         |
| POST | `/signup`                  | Sends Sign Up info to the server and creates user in the DB. Renders auth/signup view. | {name, email, password}                                 |
| GET  | `/login`                   | Renders auth/login form view.                                |                                                         |
| POST | `/login`                   | Sends Log In form data to the server and redirects to homepage. | {email, password}                                       |
| GET  | `/logout`                  | Logges user out and redirects to index view.                 |                                                         |
| GET  | `/private/profile/:userId` | Private route. Renders private/profile view.                 |                                                         |
| POST | `/private/profile/:userId` | Private route.  Sends data profile info to server and display it in profile view. |                                                         |
| GET  | `/private/edit-user`       | Private route. Renders private/edit-user form view.          |                                                         |
| POST | `/private/edit-user`       | Private route. Sends edit-profile info to server and updates user in DB and in profile view. | {\[imageUrl\], name, email, password}                   |
| GET  | `/private/add-job`         | Private route. Renders private/add-job form view.            |                                                         |
| POST | `/private/add-job`         | Private route. Sends add-job info to server and creates job in DB. | {Position, location, description, company name, salary} |
| GET  | `/private/jobs/job-panel`  | /jobs/appliPrivate route. Sends info to server to update DB.ed-jobs |                                                         |
| POST | `/private/jobs/job-panel`  | Sends to Employer the jobs created in the platform.          |                                                         |
| GET  | `/jobs/applied-jobs`       | Private route. Sends info to server to update DB.            |                                                         |
| POST | `/jobs/applied-jobs`       | PrivateRoute. Returns the jobs jobseeker applied.            |                                                         |
| POST | `/private/delete-job`      | Executes delete button function and updated DB. Redirects to / |                                                         |

  


**Models**

User:

{

  accountType: { type: String, required: true, possibleValues: \["Employer", "Job seeker"\]},
  
  username: { type: String, required: true },
  
  password: { type: String, required: true },
  
  email: { type: String, required: true },
  
  firstName: { type: String, required: true },
  
  lastName: { type: String, required: true },
  
  companyName: { type: String },
  
  location: { type: String, required: true },
  
  addPicture: String,
  addResume: String,
  jobsIApplied: \[{ type: Schema.Types.ObjectId, ref: "Job" }\],
  },
  
  {
  
  timestamps: true
  
  }
  
  };
  


Job:

{

  addedBy: { type: Schema.Types.ObjectId, ref: "User" },
  
  position: { type: String, required: true },
  
  remote: { type: Boolean, required: true },
  
  wage: { type: Number, required: true },
  
  description: { type: String, required: true },
  
  companyName: { type: String },
  
  address: {
  type: String,
  required: true
  },
  
  location: { type: { type: String,  enum: \["Point"\]},
  
  coordinates: {  type: \[Number\],  index: "2dsphere"},
  
  formattedAddress: String
  
  };
