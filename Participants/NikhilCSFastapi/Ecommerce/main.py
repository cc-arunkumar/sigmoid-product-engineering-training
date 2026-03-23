from fastapi import FastAPI
from app.controllers.product_controller import router as product_router
# imports in python start with from indicating the entire path of import then we import the ecported object which is a function reference or object 
app=FastAPI()
# we will not change app.py unless and until we are creating another entity to track right now only products are bing tracked if we had orders we would create its controller and its services to include it as a router here until then do not change anything here 
app.include_router(product_router)
@app.get("/")
def home():
    return {"message":"FastAPI server is running "}
# default api endpoint is creted once we run this file at default port 
# this is a default route defined using the @app route 