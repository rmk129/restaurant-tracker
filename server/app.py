#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
from models import User, Restaurant, Review
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Signup(Resource):
    def post(self):
        username = request.get_json().get('username')
        password = request.get_json().get('password')
    
        if not username or not password:
            return {'error': 'Username and password are required'}, 422

        try:
            
            user = User(username=username)
            user.password_hash = password
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            response = user.to_dict(), 201
            return response
    
        except IntegrityError:
            # Handle any integrity constraint violations (e.g., duplicate username)
            db.session.rollback()
            return {'error': 'Username already exists'}, 422
        
class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            response = user.to_dict(), 200
            return response
        else:
            return {}, 401
        

class Login(Resource):
    def post(self):
        user = User.query.filter(
            User.username == request.get_json().get('username')
        ).first()

        if user and user.authenticate(request.get_json().get('password')) == True:
            session['user_id'] = user.id
            response = user.to_dict(), 200
            return response
        else:
            return {}, 401
        
class Logout(Resource):
    def delete(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            session['user_id'] = None
            return {}, 204
        else:
            return {}, 401
        
class AllRestaurants(Resource):
    def get(self):
        restaurants = []
        for res in Restaurant.query.all():
            add_restaurant = res.to_dict()
            restaurants.append(add_restaurant)
        return make_response(restaurants, 200)
    
    def post(self):
        data = request.get_json()
        name = data['name']
        for res in Restaurant.query.all():
            if res.name.lower() == name.lower():
                response = {"message": "Restaurant already exists in the system"}
                return make_response(response)
            
        try:
            new_restaurant = Restaurant(
                name=data['name'],
                cuisine=data['cuisine']
            )
            db.session.add(new_restaurant)
            db.session.commit()

            response_data = {
                'name': new_restaurant.name,
                'cuisine': new_restaurant.cuisine,
            }

            return response_data, 201
        except IntegrityError:
            # Handle any integrity constraint violations (e.g., duplicate username)
            db.session.rollback()
            return {'error': ''}, 422
        
class MyRestaurants(Resource):
    def get(self):
        restaurants = []
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            for res in user.restaurants:
                add_res = res.to_dict()
                restaurants.append(add_res)
            return make_response(restaurants, 200)
        else:
            return {}, 401
            


class ReviewsIndex(Resource):
    def get(self):
        reviews = []
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            for rev in Review.query.all():
                if user.id == rev.user_id:
                    add_review = {
                        'id': rev.id,
                        'score': rev.score,
                        'message': rev.message
                    }
                    reviews.append(add_review)

            return make_response(reviews.to_dict(), 200)
        else:
            return {}, 401
            
        
    def post(self):
        if not session.get('user_id'):
            return {'error':'Unauthorized'}, 401
        user = User.query.filter(User.id == session.get('user_id')).first()
        data = request.get_json()

        try:
            new_review = Review(
                score=data['score'],
                message=data['message'],
                user_id=user.id,
                restaurant_id=data['restaurant_id']
            )

            db.session.add(new_review)
            db.session.commit()

            response_data = {
                'score': new_review.score,
                'message': new_review.message,
                'user': user.username
            }

            return response_data.to_dict(), 201
        except IntegrityError:
            # Handle any integrity constraint violations (e.g., duplicate username)
            db.session.rollback()
            return {'error': ''}, 422
        

class ReviewsById(Resource):
    def get(self, id):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            rev = Review.query.filter_by(id=id).first()
            if user.id == rev.user_id:
                return make_response(rev.to_dict(), 200)
        else:
            return {}, 401
        
    def patch(self, id):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            rev = Review.query.filter_by(id=id).first()
            if user.id == rev.user_id:
                for attr in request.form:
                    setattr(rev, attr, request.form[attr])

            db.session.add(rev)
            db.session.commit()

            response_dict = rev.to_dict()

            response = make_response(response_dict, 200)
            return response
        
    def delete(self, id):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            rev = Review.query.filter_by(id=id).first()
            if user.id == rev.user_id:
                db.session.delete(rev)
                db.session.commit()

            response_dict = {"message": "review successfully deleted"}
            response = make_response(response_dict, 200)
            return response


    


api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(ReviewsIndex, '/reviews', endpoint='reviews')
api.add_resource(ReviewsById, '/reviews/<int:id>')
api.add_resource(AllRestaurants, '/all_restaurants', endpoint='all_restaurants')
api.add_resource(MyRestaurants, '/my_restaurants', endpoint='my_restaurants')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

