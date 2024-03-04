#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource

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

            response =  {
                'user_id': user.id,
                'username': user.username
            }, 201
            return response
    
        except IntegrityError:
            # Handle any integrity constraint violations (e.g., duplicate username)
            db.session.rollback()
            return {'error': 'Username already exists'}, 422
        
class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            response =  {
                'id': user.id,
                'username': user.username
            }, 200
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
            response =  {
                'id': user.id,
                'username': user.username
            }, 200
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


api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

