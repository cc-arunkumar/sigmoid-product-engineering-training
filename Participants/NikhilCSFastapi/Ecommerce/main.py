from fastapi import FastAPI
from app.controllers.product_controller import router as product_router
app=FastAPI()
# we will not change app.py unless and until we are creating another entity to track right now only products are bing tracked if we had orders we would create its controller and its services to include it as a router here until then do not change anything here 
app.include_router(product_router)
@app.get("/")
def home():
    return {"message":"FastAPI server is running "}
# default api endpoint is creted once we run this file at default port 