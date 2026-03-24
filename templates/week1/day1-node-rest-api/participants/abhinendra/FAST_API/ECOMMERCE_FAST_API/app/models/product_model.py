from pydantic import BaseModel, Field

from typing import Optional

class Product (BaseModel):
    #implementing validation using field
    name : str = Field(min_length=3 , max_length=50)
    price : int = Field(gt=0, lt=99999)
    category : str
    stock : int

class patch_product( BaseModel):
    name: Optional[str] = Field( default = None, min_length=3, max_length=50)
    price : Optional[int]= None
    category : Optional[str]=None
    stock : Optional[int]=None
