from contextlib import contextmanager
from sqlalchemy import create_engine

from sqlalchemy.orm import Session as DbSession

class Database:
    def __init__(self, url: str, password: str = None, username: str = None, base=None, create_db_tables=False):
        self._base = base
        if not "postgresql" in url:
            raise ValueError("Not a PostgreSQL DB url")
        if username is not None and password is not None:
            a, b = url.split("://", 1)
            url = f"{a}://{username}:{password}@{b}"
        else:
            print("Warning: NO DB CREDENTIALS FOUND")
        self.init_db(url, create_db_tables)
    
    def init_db(self, url:str, create_db_tables = False):
        self._engine = create_engine(url, echo=False, future=True)
        if create_db_tables:
            if self._base is not None:
                self._base.metadata.create_all(self._engine)
            else:
                raise ValueError("Base is None")
    
    @contextmanager
    def db_session(self):
        session = DbSession(self._engine)
        try:
            yield session
            session.commit()
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()

