from service.db.base import Base
from sqlalchemy import Integer, String, Column, select

class UsersTable(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, nullable=False)
    username = Column(String, nullable=False)
    password = Column(String, nullable=True)
    google = Column(String, nullable=True)
    
    @classmethod
    def new_row(cls, username, session, password = None, google = None):
        if cls.get_by_username(username, session) is not None:
            raise RuntimeError("Username occupied")
        r = cls(username=username)
        if password is None:
            r.google = google
        elif google is None:
            r.password = password
        else:
            raise RuntimeError("Atleast one auth metod is needed")
        session.add(r)
        session.flush()
        return r
    
    @classmethod
    def get_by_id(cls, id:int, session):
        return session.scalars(select(cls).where(cls.id==id)).one_or_none()
    
    @classmethod
    def get_by_username(cls, username:str, session):
        return session.scalars(select(cls).where(cls.username==username)).one_or_none()
    
    @classmethod
    def get_by_google(cls, token:str, session):
        return session.scalars(select(cls).where(cls.google==token)).one_or_none()