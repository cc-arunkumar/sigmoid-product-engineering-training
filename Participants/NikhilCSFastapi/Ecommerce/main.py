from fastapi import FastAPI
app=FastAPI()
@app.get("/")
def home():
    return {"message":"FastAPI server is running "}
# default api endpoint is creted once we run this file at default port 