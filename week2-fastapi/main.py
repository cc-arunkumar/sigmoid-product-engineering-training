from fastapi import FastAPI
from sqlalchemy import text
from db.database import engine
from db.base import Base
from controllers.product_controller import router as product_router

app = FastAPI()
Base.metadata.create_all(bind=engine)
# Include router
@app.on_event("startup")
def test_db_connection():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        print("✅ Database connected successfully!")
    except Exception as e:
        print("❌ Database connection failed:", e)
app.include_router(product_router)

@app.get("/")
def home():
    return {"message": "Hello from Mac 🚀"}