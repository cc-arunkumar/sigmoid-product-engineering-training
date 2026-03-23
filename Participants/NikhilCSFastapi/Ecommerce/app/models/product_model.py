from pydantic import BaseModel
from typing import Optional
# THIS MODEL IS A STRUCTURE TO FOLLOW FOR THE REQUEST BODY ALONE 
class Product(BaseModel):
    name:Optional[str]=None
    price:Optional[int]=None
    category:str=None
    stock:int=None