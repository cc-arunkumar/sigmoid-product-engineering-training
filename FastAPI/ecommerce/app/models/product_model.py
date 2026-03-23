from pydantic import BaseModel
from typing import Optional

class ProductIn(BaseModel):
    name: str
    price: int
    category: str
    stock: int

class Product(BaseModel):
    name: Optional[str] = None
    price: Optional[int] = None
    category: Optional[str] = None
    stock: Optional[int] = None
    