# config/get_db.py
from db.database import sessionLocal 

def get_db():
    db = sessionLocal()              
    try:
        yield db 
    finally: 
        db.close()