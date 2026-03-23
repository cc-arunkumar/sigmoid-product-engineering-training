from pydantic import BaseModel , Field
from typing import Optional

class Product(BaseModel):
    name : str
    price : int
    category : str
    stock : int

class ProductUpdate(BaseModel):
    name : Optional[str] = Field(min_length = 3 , max_length = 50)
    price : Optional[int] = Field(gt = 0 , lt = 99999)
    category : Optional[str] = None
    stock : Optional[int] = None
    