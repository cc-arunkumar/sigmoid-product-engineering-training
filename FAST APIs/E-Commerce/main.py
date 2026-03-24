from fastapi import FastAPI
from app.controllers.product_controller import router as product_router
from app.db.database import engine, base

app = FastAPI()


# Create tables on startup
@app.on_event("startup")
def startup_event():
    try:
        base.metadata.create_all(bind=engine)
        print("Tables created / DB connected")
    except Exception as e:
        print(" DB Error:", e)


# Root route
@app.get("/")
def home():
    return {"message": "FASTAPI SERVER IS RUNNING"}


# Include routes
app.include_router(product_router)
