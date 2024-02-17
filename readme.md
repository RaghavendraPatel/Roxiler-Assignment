
# Transactions Dashboard

This project provides a comprehensive solution for displaying and managing transaction data. It includes a React-based frontend that features a transactions table with capabilities for month-based filtering, text search, pagination, and detailed visualization through bar and pie charts. The backend, built with Node.js and Express, offers RESTful APIs to support these features.

## Features

- **Transactions Table:** Displays transaction data with columns for ID, Title, Price, Description, Category, Sold status, and Date. Supports pagination and text-based search.
- **Search Functionality:** Users can search transactions by Title, Description, or Price.
- **Pagination:** Navigate through transactions data in a paginated manner.
- **Statistics Display:** Shows total sales amount, total number of sold and not sold items for the selected month.
- **Charts Visualization:** Includes bar and pie charts to visualize transaction data for better insights.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repo

```bash 
    git clone https://github.com/RaghavendraPatel/Roxiler-Assignment
```

2. Install NPM packages for the backend

```bash
    cd yourproject/Server
    npm install
```
3. Install NPM packages for the frontend

```bash
    cd yourproject/frontend
    npm install
```
### Running the project

1. Start the backend server

```bash
    cd Server
    npm start
```

2. Start the frontend application

```bash
    cd Client
    npm start
```

# Usage

After starting both the backend and frontend, navigate to `http://localhost:5173` (or the port you specified for the React app) in your browser to view the transactions dashboard.

## Built With

- [React](https://reactjs.org/) - The web framework used
- [Node.js](https://nodejs.org/) - Runtime environment
- [Express](https://expressjs.com/) - Web application framework for Node.js
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js
- [Chart.js](https://www.chartjs.org/) and [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2) - For charts visualization
