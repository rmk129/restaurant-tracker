# Welcome To the Restaurant Tracking Application!

# Description:
- This website allows you to keep tracking of restaurants you've been to as well as giving you ideas of new places to go to. 

# How it Works:
- The first thing you can do is utilize the full login/signup/logout feature. This part of the application keeps    track of each user and the reviews associated with each user. 
- The second thing you can do is go to the All Restaurants Tab to see all the restaurants in the database. 
  Below each restaurant, you will see all the reveiws(message and score) associated with each restaurant that either the user or other users have posted. 
  With this, you can add reviews for each restaurant after you've visited them. The reviews that you posted show in Red Font. This tells you which restaurants you've been to and which ones you haven't. You can also delete or update reviews that uou have created. 
- The third thing you can do is go to the Add restaurants tab to add a new restaurant in the database. All users will be able to see this restaurant and make their reviews accordingly.

# How to Get Started
- Start with the following code in a terminal:
1. npm install --prefix client
2. pipenv install && pipenv shell
3. cd server
4. flask db upgrade
5. python seed.py
6. python app.py
- Then Open another terminal:
1. npm start --prefix client