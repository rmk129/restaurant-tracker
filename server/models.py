from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, db.CheckConstraint('len(username) > 5'), nullable=False, unique=True)
    password = db.Column(db.String, db.CheckConstraint('len(password) > 5'))

    reviews = db.relationship('Review', back_populates="user", cascade='all, delete-orphan')
    restaurants = association_proxy('reviews', 'restaurant', creator=lambda restaurant_obj: Review(restaurant=restaurant_obj))


    def __repr__(self):
        return f'<User {self.id}, {self.username}, {self.password}>'
    

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer)
    message = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Intenger, db.ForeignKey(users.id))
    restaurant_id = db.Column(db.Intenger, db.ForeignKey(restaurants.id))

    user = db.relationship('User', back_populates="reviews")
    restaurant = db.relatonship('Restaurant', back_populates="reviews")

    @validates('score')
    def validate_score(self, key, score):
        if not score.isdigit():
            raise ValueError("Score must be a number")
        elif len(score) < 1 or len(score) > 10:
            raise ValueError("Score must be a number between 0 to 10.")
        return score
    
    @validates('message')
    def validate_message(self, key, message):
        if len(message) > 201 or len(message) < 10:
            raise ValueError("Reviews must be between 10 to 200 characters long")
        return message

    def __repr__(self):
        return f'<Review {self.id}, {self.score}, {self.message}>'
    

class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.string, nullable=False, unique=True)
    cuisine = db.Column(db.string, nullable=False)

    reviews = db.relationship('Review', back_populates="restaurant", cascade='all, delete-orphan')
    users = association_proxy('reviews', 'User', creator=lambda user_obj: Review(user=user_obj))

    @validates('cuisine')
    def validates_cuisine(self, key, cuisine):
        categories = ["Chinese", "Indian", "Thai", "Greek", "Asian", "Brazillian", "Lebanese", "Italian", "Mexican",
                      "German", "Caribbean", "Japanese", "Spanish", "American", "African", "French", "Other"]
        y = ""
        for c in categories:
            if cuisine == c:
                y = "yes"
        if not y:
            raise ValueError("Cuisine needs to be listed in the category")
        return cuisine




    def __repr__(self):
        return f'<Restaurant {self.id}, {self.name}, {self.cuisine}>'


    