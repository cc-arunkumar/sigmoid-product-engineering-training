from pydantic import BaseModel
# THIS MODEL IS A STRUCTURE TO FOLLOW FOR THE REQUEST BODY ALONE 
class Product(BaseModel):
    name:str
    price:int
    category:str
    stock:int