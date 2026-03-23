from fastapi import FastAPI 
from Controller.product_controller import router as product_router ; 
app = FastAPI()


app.include_router(product_router) ; 

@app.get("/")

def home():
    return {"Massage": "Fastapi server is running"}

@app.get("/home2")
def home2():
    return {"Massage": "Fastapi 2 server is running"}

@app.post("/")
def create(name: str, age: int):
    return {
        "name is nikhil": name,
        "age": age
    }