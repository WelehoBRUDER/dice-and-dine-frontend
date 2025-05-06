# Dice & Dine
A React App built for a hypothetical board game focused restaurant.

## Table of Contents
- [Purpose](#purpose)
- [Features](#features)
- [Live app](#live-app)
- [Running locally](#how-to-run-locally)
- [Localization](#how-to-use-localization)
- [Attributions](#attributions)

## Purpose

### What does this app do?
Dice & Dine app is the home page for a fictional restaurant that specializes in board games.  
Users can view the menu, place orders, reserve tables, browse the game collection, post on the forums and leave reviews.

### What makes it useful?
Without this app, it would very inconvenient for customers to do business with the restaurant.  
Features like online ordering, table reservations, and game browsing make it easy for customers to interact with the restaurant.  
Most importantly, the app provides a platform for customers to share their experiences and opinions with others.

## Features
This is a list of features that are currently implemented in the app:

### Menu
Users can view the menu and place orders for food and drinks.   
When the shopping cart has items, it is shown in the website header.   
The menu is divided into categories like starters, mains, desserts and beverages.

### Table reservations
Users can reserve tables for their desired date and time.  
Users can pick their date, time, length of reservation and tables.  
Before submitting the reservation, it is possible to include extra information in freeform.  
Reservations can be viewed on the profile page. Canceling must be done by calling the restaurant.

### Browse games
The website has a collection of board games that users can browse.  
Games can be filtered by category. The page shows basic information about each game.

### Profile management
Users can create a profile and manage their information.  
It is possible to change the profile picture, name, email and password.  
On the profile page, users can view their reservations and orders.

### Reviews
Users and guests can leave a review for the restaurant.  
Reviews are given in stars (1-5) and a comment up to 150 characters.

### Forum
Users can post on the forum and reply to other users.  
Posts are separated into "threads" which are created when a user posts a new topic.  
Each thread is its own separate page, where users can reply to the original post and other replies.

### Embedded map
Both the home page and the contact page have an embedded map.  
The map shows the location of the restaurant and the closest bus stops and public scooters.

## Live app
![Screenshot of the app](dash.png)

### To do before using the app
- 1. Go to [the server](insert-server-link-here)
- 2. Type "thisisunsafe" if on chrome, or click "Advanced" and then "Accept the risk and continue" if on Firefox.  
This is a self-signed certificate, so you need to bypass the warning

You will be unable to access the server if you do not complete this step.

Click the link below to access the app:  
[Dice & Dine](https://localhost:3000)

## How to run locally
This guide explains how you can run the app locally on your machine.  
The backend is hosted elsewhere and its repository is not publicly available.  
You must also follow the instructions for using the live hosted version of the app.

### Set up the frontend
1. Clone the repository
2. Navigate to the project directory
3. Create a `.env` file in the root directory, based on the `.env.example` file.  
   This file contains the API keys for the app.
   ```bash
   VITE_API_URL=
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Start the development server
   ```bash
   npm run dev
   ```
5. Open your browser and go to `http://localhost:5173`

### Attributions
- Hero image from [Unsplash](https://unsplash.com/photos/a-man-sitting-at-a-table-playing-a-board-game-7gagNAbWocg?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash)