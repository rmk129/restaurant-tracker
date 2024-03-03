from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String)


    def __repr__(self):
        return f'<User {self.id}, {self.username}, {self.password}>'
    

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer)
    message = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<Review {self.id}, {self.score}, {self.message}>'
    

class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.string)
    cuisine = db.Column(db.string)

    def __repr__(self):
        return f'<Restaurant {self.id}, {self.name}, {self.cuisine}>'


    