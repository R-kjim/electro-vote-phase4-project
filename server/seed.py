from app import app,bcrypt
from models import db,User,County,Constituency,Ward


with app.app_context():
    db.drop_all()
    db.create_all()

    user1=User(name="Alpha", email="a@gmail.com", password=bcrypt.generate_password_hash("a123").decode('utf-8'),role="Voter")
    user3=User(name="Alpha1", email="a11@gmail.com", password=bcrypt.generate_password_hash("a123").decode('utf-8'),role="Voter")
    user2=User(name="Alpha2", email="a1@gmail.com", password=bcrypt.generate_password_hash("a123").decode('utf-8'),role="Admin")
    users=[user1,user2,user3]
    db.session.add_all(users)
    db.session.commit()

    county1=County(name="Meru")
    county2=County(name="Mombasa")
    db.session.add_all([county1,county2])
    db.session.commit()

    const1=Constituency(name="Embakasi North", county_id=1)
    const2=Constituency(name="Embakasi", county_id=1)
    const3=Constituency(name="Embakasi South", county_id=2)
    const4=Constituency(name="Embakasi East", county_id=2)
    consts=[const1,const2,const3,const4]
    db.session.add_all(consts)
    db.session.commit()

    ward1=Ward(name="Township",county_id=1, constituency_id=1)
    ward2=Ward(name="Township East",county_id=1, constituency_id=1)
    ward3=Ward(name="Township West",county_id=1, constituency_id=2)
    ward4=Ward(name="Township North",county_id=2, constituency_id=3)
    ward5=Ward(name="Township South",county_id=2, constituency_id=4)
    wards=[ward1,ward2,ward3,ward4,ward5]
    db.session.add_all(wards)
    db.session.commit()