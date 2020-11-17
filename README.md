# Restaurant Collection: EAT or DIE
  A web application that provides users to collect restaurants as well as view or edit restaurants info.


![Image](https://raw.githubusercontent.com/etheriuman/restaurant-list/master/restaurant-list_image.png)
---
- ## Environment required:
  Node.js

- ## Database required:
  MongoDB

- ## Dependencies used :
1. npm
2. Express
3. Express-handlebars
4. Mongoose
5. Body-parser
6. Nodemon
7. Method-override

- ## Features :
1. View all collected restaurant in the index page.
2. Checkout more restaurant information by clicking cards in the index page.
3. Search restaurants with search bar.
4. Edit and delete restaurants.
5. Sort restaurants by name, location, category, and rating.

- ## Application installation :
1. ### For macOS users: open Terminal, Widows users should open Git Bash as well.

2. To clone this project, you should command this in your Terminal or Git Bash.
```
git clone https://github.com/etheriuman/restaurant-list.git
```
3. Hop into the project file.
```
cd restaurant-list
```
4. Install npm.
```
npm init -y
```
5. Install all dependencies needed with npm.
```
npm i
```
6. Store seed data into your mongoDB
```
npm run seed
```
7. Start running the server with command below.
```
npm run dev
```
8. It should print the message below, copy the address and paste it into your browser.
```
this server is now running on http://localhost:3000
```