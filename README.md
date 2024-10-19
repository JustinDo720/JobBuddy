# JobBuddy React Project

# Table of Contents
1) [JobBuddy Description](#jobbuddy-description)
1) [JobBuddy Project Checklist](#jobbuddy-project-checklist)

---

# JobBuddy Description

**JobBuddy** is a personal job tracking dashboard built using React. It helps job seekers efficiently manage and track their job search process. The app includes features like adding job applications, viewing detailed information, tracking upcoming interviews, and setting personal goals for daily tasks like applying for jobs, networking on LinkedIn, and coding practice.

The dashboard also includes:
- A job application table with the ability to add, edit, and remove job entries.
- Visual data representation using `Chart.js` or `Recharts` to show job application trends over time.
- A "Goals" section to keep track of daily achievements and a "Upcoming Interviews" panel to display interview schedules.

The project is designed with React Router for seamless navigation and provides a responsive, user-friendly interface.

---

Technologies used:
- React.js
- React Router
- Chart.js or Recharts
- (Optional) Backend integration with Django REST Framework

--- 

# JobBuddy Project Checklist

## Adding our Styling Kit
~~-[x] Add Tailwind CSS to create **Navbars**, **Modals** and **Tables**~~

~~-[ ](Optional) Tailwind templates?? If exists~~

- [x] Add  Bootstrap to create **Navbars**, **Modals** and **Tables**

## Navbar 
- [x] Set up our Navbar for our router 

## Pages
- [x] Create a Home page using React Router
  - [x] Set up routes for:
    - [x] Home Page
    - [x] Login/Register Page
    - [x] Resources Page

## Middle Section (Job Table)
- [x] Build a table with headers: `Company`, `Position`, `Date Applied`, `Status`
- [x] Insert dummy data to check the table rendering
- [x] Add a Search Functionality 
- [x] Make the company name **clickable**
  - [x] When the company name is clicked, display additional details in:
    - [ ] A separate component with detailed view
    - [x] OR a modal card showing information such as:
      - [x] Job description
      - [x] Salary
      - [x] Other relevant details

## Add/Edit/Remove Jobs
- [x] Build an "Add Job" button (temporarily in Navbar)
  - [x] Add functionality to insert a new job into the table
- [x] Add "Edit" and "Remove" buttons to each job in the table
  - [x] "Edit" button should trigger:
    - [x] A modal to update job details
  - [x] "Remove" button should remove the job entry from the table
- [x] Filter Status Checkbox

## Left Panel (Graph)
- [ ] Build the left panel to visualize data using `Chart.js` or `Recharts`
  - [ ] Show total positions applied each month

## Right Panel (Upcoming Interviews & Goals)
- [ ] Build the "Upcoming Interviews" panel to display upcoming interview dates and times
- [ ] Add a "Goals" feature to set and track personal goals, such as:
  - [ ] Apply for 3 jobs a day
  - [ ] Connect with 2 people on LinkedIn
  - [ ] Daily coding routine
  - [ ] Add checkboxes to mark off completed goals

---

## Suggestions & Additional Tasks

1. **Authentication**:
   - [x] Implement user authentication (Login/Register) using Firebase or JWT (with Django).
   - [x] Store user-specific job data in the database.

2. **Persistent Data**:
   - [x] Connect the table and forms to a backend (Django) to store jobs in a database.
   - [x] Ensure the data persists after refreshing the page.

3. **Responsive Design**:
   - [x] Make the layout responsive for mobile and tablet views.

4. **Notifications**:
   - [ ] Implement reminders or notifications for upcoming interviews and deadlines.

5. **Filter/Search**:
   - [x] Add a filter option to search for jobs based on status (Applied, Interviewing, etc.).

6. **API Integration**:
   - [ ] (Optional) Integrate LinkedIn or Glassdoor APIs to pull in job-related data.

7. **Testing**:
   - [ ] Write unit tests for key components and features using `Jest` or `React Testing Library`.

8. **Dynamic Resources**:
  - [ ] Users can add their own resources based on **THEIR** topic but we have defaults

---

## Tasks After Creating Backend

We need to make sure we hook up **redux** for state management. This allows us to make a **store** that stores our api url.
- `npm install redux react-redux`

1. **User Login**
  - [x] Creating the User Login and Register Form 
  - [x] Use your django Djoser link to create our User 
  - [x] (2/2) Ensure an Email sign in  + Confirmation. Additionally make sure to display username if signed in 
    - [x] After auth display username 
  - [x] Success Confirmation Page (LocalStorage to automatically sign our users)
  - [x] Display err message if form isn't valids 
  - [x] (2/2) Deal with resend confirmation, update username, update password...
    - [x] Tomorrow: Work on password reset 
  - [x] Tomorrow: Work on Redirecting Login, Setting username, Redirecting after Register
  - [x] Reset Email (bceause this is what's used to auth) & Password for **auth** users

2. **Display Jobs on Home page**
  - [x] Jobs must be of the User
  - [x] If no job present display a message 

3. **Banners**
  - [x] Upon a user finished action display a banner/alert 
    - Posting, Editing, Removing etc

4. **Adding Jobs**
  - [x] Grab the Status and State options to update our form
  - [x] Posting should now use our RESTAPI to post data to a specific User 

5. **Editing and Deleting & Job Details**
  - [x] Ensure these HTTP methods follow our backend 
  - [x] Job Details also reflect what we have in the database 
    - Reformat salary to a *$* format 

6. **Images**
  - [x] Backend Storage isn't fully completed yet; however, we could add that to our form field
  - [x] REST API tied with Amazon S3
  - [x] Add a file field to our Add Job form then work to POST 
    - Posting Multiple Images as well
  - [x] Work on the Progress Bar
  - [x] Form Add Form, It reappears with same data from previous formData so here are some methods:
    - Getters clear everytime prop shows 
    - once closed /posted make sure the data clears up 
  - [x] Add a place where we could View those Images (Perhaps a Modal Slideshow)

7. **Refreshing Tokens**
  - [ ] Refresh token availabble 
  - [ ] Use Refresh token to obtain a new auth token

Things to Work on post Launch:
1) Goals + Custom Resource?
1) Charting 
1) Reset Emails (Change message?)
1) Landing Page then dashboard link
1) Access to users could only be FOR THAT USER (if i have an access token i could access other peoples job post via id )
1) Nav Guards
1) Refactor?
  - States and Status choices called on modal instead of parent 