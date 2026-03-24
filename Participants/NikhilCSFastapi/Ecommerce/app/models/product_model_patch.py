from pydantic import BaseModel,Field
from typing import Optional
#the field library is used for extra validation such as number of characters in the variable and so on 
# THIS MODEL IS A STRUCTURE TO FOLLOW FOR THE REQUEST BODY ALONE 
# better to have seperate model sone for put+post wher everything is requiresd and one for patch similar to nodejs 
class ProductPatch(BaseModel):
    name:Optional[str]=Field(None,min_length=3,max_length=20)
    # either can be string or none both works means Optional[str],now optional[str]=Field(some validation) means validation has to be followed 
    #None or default=None also works 
    price:Optional[int]=Field(None,lt=90000,gt=800)
    category:Optional[str]=None
    # must be string or crash 
    stock:Optional[int]=Field(None, gt=3)

