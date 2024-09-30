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
   - [ ] Implement user authentication (Login/Register) using Firebase or JWT (with Django).
   - [ ] Store user-specific job data in the database.

2. **Persistent Data**:
   - [ ] Connect the table and forms to a backend (Django) to store jobs in a database.
   - [ ] Ensure the data persists after refreshing the page.

3. **Responsive Design**:
   - [ ] Make the layout responsive for mobile and tablet views.

4. **Notifications**:
   - [ ] Implement reminders or notifications for upcoming interviews and deadlines.

5. **Filter/Search**:
   - [ ] Add a filter option to search for jobs based on status (Applied, Interviewing, etc.).

6. **API Integration**:
   - [ ] (Optional) Integrate LinkedIn or Glassdoor APIs to pull in job-related data.

7. **Testing**:
   - [ ] Write unit tests for key components and features using `Jest` or `React Testing Library`.

8. **Dynamic Resources**:
  - [ ] Users can add their own resources based on **THEIR** topic but we have defaults

---
