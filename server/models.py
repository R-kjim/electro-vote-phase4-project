from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)




from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})


db = SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)  
    role = db.Column(db.String)

    # Relationships 
    voters = db.relationship('Voter', back_populates='user')
    candidates = db.relationship('Candidate', back_populates='user')



class Voter(db.Model, SerializerMixin):
    __tablename__ = 'voters'

    id = db.Column(db.Integer, primary_key=True)
    national_id = db.Column(db.Integer, unique=True)
    registration_date = db.Column(db.DateTime, default=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    county_id = db.Column(db.Integer, db.ForeignKey('counties.id'))
    constituency_id = db.Column(db.Integer, db.ForeignKey('constituencies.id'))
    ward_id = db.Column(db.Integer, db.ForeignKey('wards.id'))

    # Relationships 
    user = db.relationship('User', back_populates='voters')
    county = db.relationship('County', back_populates='voters')
    constituency = db.relationship('Constituency', back_populates='voters')
    ward = db.relationship('Ward', back_populates='voters')
    votes = db.relationship('Vote', back_populates='voter')



class Candidate(db.Model, SerializerMixin):
    __tablename__ = 'candidates'
    
    id = db.Column(db.Integer, primary_key=True)
    votes_received = db.Column(db.Integer, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    position_id = db.Column(db.Integer, db.ForeignKey('positions.id'))

    # Relationships 
    user = db.relationship('User', back_populates='candidates')
    position = db.relationship('Position', back_populates='candidates')
    votes = db.relationship('Vote', back_populates='candidate')


# Vote model
class Vote(db.Model, SerializerMixin):
    __tablename__ = 'votes'

    id = db.Column(db.Integer, primary_key=True)
    vote_date = db.Column(db.DateTime, default=db.func.now())
    voting_status = db.Column(db.Boolean, default=False)
    voter_id = db.Column(db.Integer, db.ForeignKey('voters.id'))
    position_id = db.Column(db.Integer, db.ForeignKey('positions.id'))
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidates.id'))

    # Relationships
    voter = db.relationship('Voter', back_populates='votes')
    position = db.relationship('Position', back_populates='votes')
    candidate = db.relationship('Candidate', back_populates='votes')


# County model
class County(db.Model, SerializerMixin):
    __tablename__ = 'counties'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    voters = db.relationship('Voter', back_populates='county')


# Constituency model
class Constituency(db.Model, SerializerMixin):
    __tablename__ = 'constituencies'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    county_id = db.Column(db.Integer, db.ForeignKey('counties.id'))
    voters = db.relationship('Voter', back_populates='constituency')


# Ward model
class Ward(db.Model, SerializerMixin):
    __tablename__= 'wards'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    constituency_id = db.Column(db.Integer, db.ForeignKey('constituencies.id'))
    voters = db.relationship('Voter', back_populates='ward')


# Position model
class Position(db.Model, SerializerMixin):
    __tablename__ = 'positions'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    candidates = db.relationship('Candidate', back_populates='position')
