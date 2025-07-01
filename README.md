# Expenset

This project was generated using Angular version 19.2.13.

# dependencies :

- PrimeNG : (UI components + icons)
- TailwindCSS:(utility-first styling)
- ngx-translate : (localization)
- ngx-cookie-service : (used to store a fake token)

# architecture :

- SCSS Design System
`7-in-1` Design Pattern: A centralized styling architecture that includes variables, mixins, functions, themes, base styles, utilities, and component styles.

These styles are organized under /public/styles/ and are shared globally using SCSS @use and @forward.


- Project Structure

src/
└── app/
├── core/ # Core singleton services, guards, enums, helpers
|
├── features/ # Feature modules
│ ├── auth/ # Authentication module
│ └── expense/ # Expense module
|
├── shared/ # Reusable components, pipes, directives

- Main Keys:

core/ : Holds app-wide singletons such as services, guards, helpers and enums 

features/ :	Contains feature-isolated modules like auth and expense, promoting lazy loading and maintainability.
 Each folder includes its own components, and routing logic.

shared/ :Includes reusable UI components, pipes, directives, and utilities. These can be imported and used across all features.


# API Integration Strategy

1. Used 'mockapi.io' to Simulate Real API

2. Environment-based URLs 
   All API base URLs are managed inside `environment.ts` files.

3. Service-Oriented Architecture
   Dedicated services created for each feature to manage data operations and communication.

4. Dependency Injection
   Services are injected wherever needed (components, guards, etc.) for reusability and maintainability.



---

# Pagination strategy

- Client-side infinite scroll 
  Pagination is implemented on the client using scroll detection on the `window`. It loads more items in chunks (e.g., 10 at a time) as the user scrolls near the bottom.

---

# U I screenshots
I can`t provide screenshots in the readme file
************

# trade - offs or assumptions : 

- Missing Definitions:
It's unclear what the following labels refer to:

1-Total Balance
2-Total Expense

(in expense dashboard)

- Missing Design Sources:
No Figma or desktop designs were provided. UI decisions were based solely on available mobile screenshots and best assumptions.


## To run the project :

ng serve -o 
or
ng dev
then open :`http://localhost:4200/`

you will need this credentials to can login

* email : admin@inovola.com
* password : 123456


## to run unit tests :

ng test

