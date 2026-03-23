from pydantic import BaseModel

from typing import Optional

class Product (BaseModel):
    name : str
    price : int
    category : str
    stock : int

class patch_product( BaseModel):
    name: Optional[str] = None
    price : Optional[int]= None
    category : Optional[str]=None
    stock : Optional[int]=None
