from pydantic import BaseModel, Field
from typing import Optional
class Product(BaseModel):
    name: str = Field(min_length=3, max_length=50)
    price: float= Field(gt=0,lt=99999)
    category: str
    stock: int

class ProductPartialUpdate(BaseModel):
    name: Optional[str]= None
    price: Optional[float]= None
    category: Optional[str]= None
    stock: Optional[int]= None