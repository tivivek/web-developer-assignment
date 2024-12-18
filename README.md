# Quote List App

A React-based quote management application built using Vite, which allows users to view, add, and refresh quotes. The application supports infinite scrolling, dynamic loading of new quotes, and easy navigation to a page where new quotes can be created.

## Live Demo

Check out the live demo of this project - https://quote-list-app.netlify.app/

## Features

- **Infinite Scrolling**: Dynamically loads more quotes as you scroll.
- **Quote Creation**: Users can navigate to the Create Quote page to add new quotes.
- **Error Handling**: Displays error messages if there is an issue loading quotes.
- **Smooth Scrolling**: Scrolls smoothly to the newly loaded content.
- **Toast Notifications**: Displays notifications on actions such as refreshing or loading quotes.

## Technologies Used

- **React**: Frontend library for building the UI.
- **Vite**: Next-generation build tool that provides fast development and hot module replacement.
- **React Router Dom**: For navigating between different pages (Login, Quotes List, and Create Quote).
- **React Toastify**: For showing toast notifications.
- **Lucide React**: For icons like Image, Plus, and Refresh.
- **Tailwind CSS**: For styling the components.

## Setup

### Prerequisites

- Node.js (v20.0.0 or higher) installed.
- npm package manager.

### Installation

# Project Setup and Installation Guide

Follow the steps below to set up and run the project locally.

## 1. Clone the repository:

```bash
git clone git@github.com:tivivek/web-developer-assignment.git

```

## 2. Install the Dependencies

To install the required dependencies, run one of the following commands in your terminal.

### Using npm:

```bash
npm install

```

### Using yarn:

```bash
yarn install

```

### 2. Start the Development Server

After the dependencies are installed, you can start the development server with the following commands.

### Using npm:

```bash
npm run dev

```

### Or using Yarn:

```bash
yarn dev

```

### 3. Open the Application

Once the server is running, open your browser and navigate to the following URL to see the application in action:

```
http://localhost:5173

```

That's it! You're all set to start working on the project.

### Folder Structure

```
bash

├── src
│   ├── assets/                # Static assets like images
│   ├── components/            # Reusable components like buttons, loaders, etc.
│   ├── pages/                 # Pages for different routes (e.g., QuoteListPage, CreateQuotePage)
│   ├── api/                   # API calls to interact with the backend
│   ├── App.jsx                # Main entry point of the app
│   ├── index.jsx              # ReactDOM render entry
│   └── styles/                # Tailwind CSS configuration and custom styles
├── public/
│   ├── index.html             # HTML template
└── package.json

```
