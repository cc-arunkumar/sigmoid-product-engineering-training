from pydantic import BaseModel,Field
from typing import Optional
# THIS MODEL IS A STRUCTURE TO FOLLOW FOR THE REQUEST BODY ALONE 
# better to have seperate model sone for put+post wher everything is requiresd and one for patch similar to nodejs 
class Product(BaseModel):
    name:Optional[str]=None,Field(min_length=3,max_length=20)
    price:Optional[int]=None,Field(lt=90000,gt=800)
    category:str=None
    stock:int=None,Field(gt=3)