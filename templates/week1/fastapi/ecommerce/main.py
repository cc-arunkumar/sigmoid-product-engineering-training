# from fastapi import FastAPI
# from controllers.product_controller import router as products_router
# app = FastAPI()

# app.include_router(products_router)

# @app.get("/")
# def home():
#     return "hello_hi"


# from fastapi import FastAPI
# from controllers.product_controller import router as product_router
# from db.database import engine, base

# app = FastAPI()


# # Create tables on startup
# @app.on_event("startup")
# def startup_event():
#     try:
#         base.metadata.create_all(bind=engine)
#         print("Tables created / DB connected")
#     except Exception as e:
#         print(" DB Error:", e)


# # 🔹 Root route
# @app.get("/")
# def home():
#     return {"message": "FASTAPI SERVER IS RUNNING"}


# # 🔹 Include routes
# app.include_router(product_router)




from fastapi import FastAPI
from controllers.product_controller import router as product_router
from db.database import engine, base

app = FastAPI()

app.include_router(product_router)
from db.database import engine,base

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(base.metadata.create_all)

@app.on_event("startup")
async def on_startup():
    await create_tables()