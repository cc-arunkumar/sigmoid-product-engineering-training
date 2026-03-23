from pydantic import BaseModel
from typing import Optional
class Product(BaseModel):
    id: int
    name: str
    price: float
    category: str
    stock: int

class ProductPartialUpdate(BaseModel):
    name: Optional[str]= None
    price: Optional[float]= None
    category: Optional[str]= None
    stock: Optional[int]= None