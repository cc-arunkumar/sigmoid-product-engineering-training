from db.database import SessionLocal #sessionLocal is factory

def get_db():
    db = SessionLocal() #to bring all details
    try:
        yield db        #to bring db object
    finally:
        db.close()