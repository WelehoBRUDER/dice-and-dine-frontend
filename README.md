![Banner image](banner.png)
A React App built for a fictional restaurant where great food meets great board games.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Live app](#live-app)
- [Running locally](#how-to-run-locally)
- [Attributions](#attributions)

## Overview
Dice & Dine is the digital front door to a board game-themed restaurant. Customers can:

- Browse the food and drink menu
- Reserve tables in advance
- Explore a curated board game collection
- Place online orders
- Post in community forums
- Leave reviews and feedback

Designed to enhance both in-person and online experiences, Dice & Dine makes it effortless for guests to plan a visit, engage with the restaurant community, and share their gaming and dining adventures.

## Features
Dice & Dine offers a range of features to enhance the customer experience, from planning a visit to joining the community:

### 🧾 Menu & Ordering
- Browse a categorized menu: Starters, Mains, Desserts, and Beverages
- Add items to a shopping cart with live updates in the header
- Place orders online for dine-in or pickup

### 📅 Table Reservations
- Book tables in advance by selecting date, time, duration, and preferred tables
- Add special instructions before confirming the reservation
- View upcoming reservations in your profile
- (Note: Cancellations must be done by phone)

### 🎲 Game Library
- Explore a curated selection of board games
- Filter games by category
- View summaries and key information at a glance

### 👤 Profile Management
- Create and update your personal profile
- Edit name, email, password, and profile picture
- Access order history and reservations from your profile dashboard

### ⭐ Reviews
- Leave a star-rated review (1–5) with a short comment (up to 150 characters)
- Submit feedback as a guest or logged-in user

### 💬 Forum
- Start new discussion threads or join ongoing conversations
- Each thread has a dedicated page for replies and discussions

### 🗺️ Embedded Map
- Interactive map on the homepage and contact page
- Highlights restaurant location, nearby bus stops, and public scooter stations

## 🚀 Live App
![Screenshot of the app](dash.png)

### ⚠️ Before You Begin
1. Visit the [server](insert-server-link-here).
2. In **Chrome**: Type `thisisunsafe` on your keyboard to bypass the warning screen.  
   In **Firefox**: Click **Advanced**, then choose **Accept the Risk and Continue**.

> This step is required to connect to the server. If skipped, the app will not function properly.

---

### 🔗 Launch the App

Click below to open the React app:

👉 [Dice & Dine](https://localhost:3000)

## 🛠️ How to Run Locally

This guide walks you through setting up the frontend for local development.

> **Note:** The backend is hosted externally and is not publicly available.  
> You must first complete the steps in the [Live App](#-live-app) section to bypass the browser warning and connect to the backend.

---

### 🔧 Setup Instructions
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/dice-and-dine.git
   cd dice-and-dine
2. **Create a `.env` file**  
 Copy from `.env.example` and set your environment variables:
   ```bash
   VITE_API_URL=https://not-yet-hosted-backend.com
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Start the development server
   ```bash
   npm run dev
   ```
5. **Open the app**  
 Visit `http://localhost:5173` in your browser.

## Attributions
- Hero image from [Unsplash](https://unsplash.com/photos/a-man-sitting-at-a-table-playing-a-board-game-7gagNAbWocg?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash)