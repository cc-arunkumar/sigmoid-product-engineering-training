# from app.db.database import SessionLocal

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


from app.db.database import SessionLocal

async def get_db():
    async with SessionLocal() as session:
        yield session