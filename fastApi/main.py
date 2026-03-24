from fastapi import FastAPI
import controllers.product_controller as product_controller
from db.database import engine
from db.base import Base
from sqlalchemy import text

app = FastAPI()

@app.on_event("startup")
def test_db_connection():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        print("✅ Database connected successfully!")
    except Exception as e:
        print("❌ Database connection failed:", e)

app.include_router(product_controller.router)

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "FastAPI server is running"}