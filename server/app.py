from models import db,User,Constituency,County,Ward,Voter,Candidate
from flask_migrate import Migrate
from flask import Flask, request, make_response
from flask_restful import Api, Resource
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager,create_access_token, create_refresh_token,jwt_required,get_jwt_identity
import secrets,datetime,os
from datetime import timedelta

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] =secrets.token_hex(32)
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)
api=Api(app)
bcrypt = Bcrypt(app)
jwt=JWTManager(app)

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
                return make_response(ward.to_dict(),201)
            return make_response({"errors":["Invalid name value"]},404)
        return make_response({"error":[f"Ward {id} does not exist"]},404)
api.add_resource(Ward_By_Id,'/ward/<int:id>')

class Login(Resource):
    def post(self):
        data=request.get_json()
        email=data["email"]
        password=data["password"]
        user=User.query.filter_by(email=email).first()
        if user:
            if bcrypt.check_password_hash(user.password, password):
                access_token=create_access_token(identity={"email":email}, expires_delta=timedelta(minutes=30))
                return {"access_token":access_token}
            return make_response({"error":["Wrong password"]})
        return make_response({"error":[f"{email} not registered. Proceed to signup?"]},404)
api.add_resource(Login,'/login')

class Voter_Details(Resource):
    # @jwt_required()
    def post(self,id):
        data=request.get_json()
        national_id=data["national_id"]
        registration_date=datetime.datetime.now()
        voter=Voter.query.filter_by(national_id=national_id).first()
        voter1=Voter.query.filter_by(user_id=id).first()
        if voter or voter1:
            return make_response({"error":[f"{national_id} is already registered as a voter"]},404)
        if len(str(national_id))==8 :
            new_voter=Voter(
                national_id=national_id,registration_date=registration_date,
                user_id=id,
                county_id=data["county_id"],
                constituency_id=data["constituency_id"],
                ward_id=data["ward_id"]
                )
            db.session.add(new_voter)
            db.session.commit()
            return make_response(new_voter.to_dict(),201)
        return make_response({"error":["Invalid data entry"]})
    @jwt_required()
    def patch(self,id):
        data=request.get_json()
        voter=Voter.query.filter_by(id=id).first()
        if voter:
            national_id=data["national_id"]
            if len(str(national_id))==8 and isinstance(str,national_id):
                for attr in data:
                    setattr(voter,attr,data[attr])
            db.session.add(voter)
            db.session.commit()
            return make_response(voter.to_dict(),200)
    # @jwt_required()
    def get(self,id):
        voter=Voter.query.filter_by(id=id).first()
        if voter:
            return make_response(voter.to_dict(),200)
        else:
            return make_response({"error":["Voter doesn't exist"]})
api.add_resource(Voter_Details,'/add-voter-details/<int:id>')

class Add_Get_Candidate(Resource):
    # @jwt_required
    def post(self):
        data=request.get_json()
        positions=['President',"Governor","Senator","Member of Parliament","MCA"]
        position=data["position"]
        voter_id=data["voter_id"]
        voter=Voter.query.filter_by(id=voter_id).first()
        if voter:
            if position in positions:
                candidate=Candidate(position=position,voter_id=voter_id)
                if candidate:
                    db.session.add(candidate)
                    db.session.commit()
                    return make_response(candidate.to_dict(),201)
                else:
                    return make_response({"error":["An error occured. Kindly try again later"]},500)
            else:
                return make_response({"error":[f"Select a position from {positions}"]})
        else:
            return make_response({"error":["Not a registered voter"]},404)
    
    def get(self):
        candidates=Candidate.query.filter_by(id=id).all()
        return make_response([candidate.to_dict() for candidate in candidates],200)
api.add_resource(Add_Get_Candidate,'/candidates')

class Candidate_By_Id(Resource):
    def get(self,id):
        candidate=Candidate.query.filter_by(id=id).first()
        if candidate:
            return make_response(candidate.to_dict(),200)
        else:
            return make_response({"error":[f"Candidate {id} not found"]},404)
    def patch(self,id):
        candidate=Candidate.query.filter_by(id=id).first()
        if candidate:
            data=request.get_json()
            position=data["position"]
            if position in ['President',"Governor","Senator","Member of Parliament","MCA"]:
                for attr in data:
                    setattr(candidate,attr,data[attr])
                db.session.add(candidate)
                db.session.commit()
                return make_response(candidate.to_dict(),200)
            else:
                return make_response({"error":[f"Select a position from ['President','Governor','Senator','Member of Parliament','MCA']"]},400)
        else:
            return make_response({"error":[f"Candidate {id} not found"]},404)
    def delete(self,id):
        candidate=Candidate.query.filter_by(id=id).first()
        if candidate:
            db.session.delete(candidate)
            db.session.commit()
            return make_response({"message":["Candidate deleted successfully"]},204)
        else:
            return make_response({"error":[f"Candidate {id} not found"]},404)
api.add_resource(Candidate_By_Id,'/candidate/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

