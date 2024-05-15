#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Review, Restaurant, Location

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        Review.query.delete()
        User.query.delete()
        Restaurant.query.delete()
        Location.query.delete()


        u1 = User(username = "restaurantsguy127", password_hash = "wjbffbw33" )
        u2 = User(username = "iluvfood567", password_hash = "qkjfkje45" )
        u3 = User(username = "nomnom754", password_hash = "djhbkj77" )
        u4 = User(username = "romilk129", password_hash = "Food4life123" )
        db.session.add_all([u1, u2, u3, u4])
        db.session.commit()

        l1 = Location(location = "Upper East Side")
        l2 = Location(location = "Upper West Side")
        l3 = Location(location = "Midtown")
        db.session.add_all([l1, l2, l3])
        db.session.commit()

        r1 = Restaurant(name = "Rio's Tacos", cuisine = "Mexican", location = l1)
        r2 = Restaurant(name = "Emilio's Pizza", cuisine = "Italian", location = l2)
        r3 = Restaurant(name = "Royal India", cuisine = "Indian", location = l3)
        r4 = Restaurant(name = "Han Dynasty", cuisine = "Chinese", location = l1)
        r5 = Restaurant(name = "Bob's Burgers", cuisine = "American", location = l2)
        db.session.add_all([r1, r2, r3, r4, r5])
        db.session.commit()

        re1 = Review(score = 8, message = "Food was amazing and the ambience was fantastic. Reccomend the vodka slice",
                     user=u1, restaurant=r2)
        re2 = Review(score = 7, message = "We had a great time but the service was slow", user = u2, restaurant = r1)
        re3 = Review(score = 9, message = "Must try the paneer tikka! Food was flavorful and the place was delightful", user = u3, restaurant = r3)
        re4 = Review(score = 5, message = "Didn't have a great time. Place wasn't clean and the food was bland", user = u4, restaurant = r4)
        re5 = Review(score = 6, message = "The burgers were ok at best. Worth going if you're in a hurry but not an amazing burger", user = u4, restaurant = r5)
        db.session.add_all([re1,re2,re3,re4,re5])
        db.session.commit()










