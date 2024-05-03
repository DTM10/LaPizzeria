# Pizza Store Web Application

## Overview

The Pizza Store Web Application is a full-featured online ordering system designed for a pizza restaurant. It allows customers to browse the menu, register, login, place orders, and track the status of their orders in real-time. This application is built using React and Firebase to offer a responsive and interactive user experience.

## Features

- **Home Page**: Showcases daily and weekly pizza specials and promotions using an auto-rotating carousel.
- **Menu Page**: Displays all available pizzas and allows users to add items to their cart.
- **Login/Registration Page**: Secure user authentication for order tracking and history.
- **Order Tracker**: Real-time updates on order preparation and delivery status. Just shown, when the user is logged in.
- **Shopping Cart**: Review and modify orders before checkout, including quantity adjustments and item removals.
- **Responsive Design**: Ensures a great experience across desktop and mobile devices.

## Technologies Used

- **React**: For building the user interface.
- **Firebase**: Backend as a Service (BaaS) - used for authentication, database (Firestore) management, and hosting.
- **SCSS**: For styling components with modular and maintainable CSS.
- **React Router**: For navigation and routing management.

## Setup and Installation

### Prerequisites

- Node.js
- npm (Node Package Manager)
- A Firebase account

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/DTM10/LaPizzeria.git
   cd lapizzeria

   ```

2. **Install Dependencies**

   npm install

3. **Set Up Firebase**

- Create a project in Firebase.
- Enable Firestore and Authentication.
- Set up the Firestore data as described in the Firebase Setup section below.

Firebase Setup

Firestore Collections: Users, Orders
Authentication: Email/Password setup

4. **Configure Environment Variables**

Cretate a .env.local file and copy and paste the below with your Firebase Config Info

REACT_APP_FIREBASE_API_KEY=YourValue
REACT_APP_FIREBASE_AUTH_DOMAIN=YourValue
REACT_APP_FIREBASE_PROJECT_ID=YourValue
REACT_APP_FIREBASE_STORAGE_BUCKET=YourValue
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YourValue
REACT_APP_FIREBASE_APP_ID=YourValue
REACT_APP_FIREBASE_MEASUREMENT_ID=YourValue

5. **Start the Development Server**

npm start

6. **Start the Development Server**

After starting the app, navigate through the different pages using the navbar. You can register a new user, log in, place orders, and track them through the tracker interface.
