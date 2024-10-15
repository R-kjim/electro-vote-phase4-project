from models import db,User,Constituency,County,Ward
from flask_migrate import Migrate
from flask import Flask, request, make_response
from flask_restful import Api, Resource
import os
from flask_bcrypt import Bcrypt


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)
api=Api(app)
bcrypt = Bcrypt(app)

class Signup(Resource):
    def post(self):
        data=request.get_json()
        email=data['email']
        password=data['password']
        name=data['name']
        role='Voter'
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        if '@' in email and name!='' and name!=' ':
            user=User.query.filter_by(email=email).first()
            if user:
                return make_response({"error":[f"{email} is already registered as a user. Proceed to login"]},404)
            new_user=User(name=name,email=email, password=hashed_password, role=role)
            if new_user:
                db.session.add(new_user)
                db.session.commit()
                return make_response(new_user.to_dict(),201)
        else:
            return make_response({"error":["validation errors"]},400)
api.add_resource(Signup,'/signup')

class Add_Get_County(Resource):
    def get(self):
        counties=County.query.all()
        return make_response([county.to_dict() for county in counties],200)

    def post(self):
        data=request.get_json()
        name=data['name']
        if '  ' not in name and len(name)>3:
            county=County.query.filter_by(name=name).first()
            if county:
                return make_response({"error":f"{name} county already exists"},404)
            new_county=County(name=name)
            if new_county:
                db.session.add(new_county)
                db.session.commit()
                return make_response(new_county.to_dict(),201)
            else:
                return make_response({"error":"Error creating county"},500)
        else:
            return make_response({"error":"Invalid name"},500)
api.add_resource(Add_Get_County,'/county')

class County_by_id(Resource):
    def get(self,id):
        county=County.query.filter_by(id=id).first()
        if county:
            return make_response(county.to_dict(),200)
        else:
            return make_response({"error":f"county id {id} does not exist"})
    def delete(self,id):
        county=County.query.filter_by(id=id).first()
        if county:
            db.session.delete(county)
            db.session.commit()
            return make_response({"message":"County deleted successfully"},204)
        else:
            return make_response({"error":f"county id {id} does not exist"},404)
api.add_resource(County_by_id,'/county/<int:id>')

class Add_Get_Constituency(Resource):
    def get(self):
        constituencies=Constituency.query.all()
        return make_response([constituency.to_dict() for constituency in constituencies],200)
    def post(self):
        data=request.get_json()
        name=data['name']
        county_id=data['county_id']
        if '  ' not in name and len(name)>3:
            constituency=Constituency.query.filter_by(name=name).first()
            if constituency:
                return make_response({"error":f"{name} constituency already exists"},404)
            new_constituency=Constituency(name=name,county_id=county_id)
            if new_constituency:
                db.session.add(new_constituency)
                db.session.commit()
                return make_response(new_constituency.to_dict(),201)
            else:
                return make_response({"error":"Internal server error"},500)
        else:
            return make_response({"error":"Invalid data"},404)
api.add_resource(Add_Get_Constituency,'/constituency')

class Constituency_By_Id(Resource):
    def get(self,id):
        constituency=Constituency.query.filter_by(id=id).first()
        if constituency:
            return make_response(constituency.to_dict(),200)
        return make_response({"error":f"Constituency {id} does not exist"},404)
    def patch(self,id):
        data=request.get_json()
        constituency=Constituency.query.filter_by(id=id).first()
        
        if constituency:
            # constituency=constituency.to_dict()
            for key in data:
                setattr(constituency,key,data.get(key))
            db.session.add(constituency)
            db.session.commit()
            return make_response(constituency.to_dict(),200)
        return make_response({"error":f"Constituency {id} does not exist"},404)
    def delete(self,id):
        constituency=Constituency.query.filter_by(id=id).first()
        if constituency:
            db.session.delete(constituency)
            db.session.commit()
            return make_response({"messsage":["Delete successful"]},204)
        return make_response({"error":f"Constituency {id} does not exist"},404)
api.add_resource(Constituency_By_Id,'/constituency/<int:id>')

class Add_Get_Ward(Resource):
    def post(self):
        data=request.get_json()
        name=data["name"]
        county_id=data["county_id"]
        constituency_id=data["constituency_id"]
        if "  " not in name and len(name)>3:
            ward=Ward.query.filter_by(id=id).first()
            if ward:
                return make_response({"error":[f"{name} ward already exists"]})
            new_ward=Ward(name=name, county_id=county_id,constituency_id=constituency_id)
            db.session.add(new_ward)
            db.session.commit()
            return make_response(new_ward.to_dict(),204)
        return make_response({"error":["Invalid name entry"]},400)
    def get(self):
        ward=Ward.query.all()
        return make_response([wards.to_dict() for wards in ward],200)
api.add_resource(Add_Get_Ward,'/ward')

class Ward_By_Id(Resource):
    def get(self,id):
        ward=Ward.query.filter_by(id=id).first()
        if ward:
            return make_response(ward.to_dict(),200)
        return make_response({"error":[f"Ward {id} does not exist"]})
    def delete(self,id):
        ward=Ward.query.filter_by(id=id).first()
        if ward:
            db.session.delete(ward)
            db.session.commit()
            return make_response({"message":["deleted successfully"]},204)
        return make_response({"error":[f"Ward {id} does not exist"]})
    def patch(self,id):
        ward=Ward.query.filter_by(id=id).first()
        if ward:
            data=request.get_json()
            name=data["name"]
            if "  " not in name and len(name)>3:
                for attr in data:
                    setattr(ward,attr,data[attr])
                db.session.add(ward)
                db.session.commit()
            return make_response({"errors":["Invalid name value"]},404)
        return make_response({"error":[f"Ward {id} does not exist"]},404)

api.add_resource(Ward_By_Id,'/ward/<int:id>')
    

# dict1={"a":"names","b":2}
# dict2={}
# print(dict1)
# for key,value in dict1.items():
#     if key=='a' and len(value)>3:
#         dict2[key]=value
# print(dict2)
if __name__ == '__main__':
    app.run(port=5555, debug=True)

