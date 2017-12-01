# Readable

Readable is the assignment for project 2 of the Udacity React Nanodegree course. It is a content and a content and comment web app. Users can post content to predefined categories, comment on posts, and vote on posts and comments. The posts and comments can also be edited or deleted. The project requirements include utilization of react-redux.

## Installation

The app requires Node.js and npm. 

#### Running the Server

The code for the server was provided and needs to be be running for the app to work. From the 'readable-SNH' directory, change to the 'readable-SNH/api-server' directory using a terminal window. Installing the dependencies using the following:

​	npm install

Run the server with the following:

​	node server

#### Running the Frontend App

Open another terminal window. Change directory to 'readable-SNH/frontend/'

Install the dependencies:

​	npm install

Run the app

​	npm start

A browser window should open with the app running. If not, manually go to //localhost:3000

## Instructions

The home view shows the categories and posts. Sorting of the posts is based on a sort parameter (vote score, time stamp, or author) and on an order (ascending vs descending). The sorting criteria are chosen by dropdown selection menus. The list of posts will automatically update after a selection. Each post can be edited or deleted. Posts can also be added. Buttons are available for these commands. Each post also has buttons for voting the post up or down. The vote score is automatically updated.

The category names act a links to a category view, which shows a single category with only the posts under the category. The sorting, voting, post adding, post editing, and post deleting are otherwise accomplished in the same manner.

Clicking on a post ID on either of these pages will take the user to a post view, which shows the post as well as all of its comments. Similar sorting, voting, adding, deleting, and editing controls are available.

Simple navigation buttons for returning to the home page or going back to the previous page are available when useful, such as on the editing and adding forms for the posts and comments. The browser back arrow can also be used.

### About the App

The project was bootstrapped with create-react-app.
