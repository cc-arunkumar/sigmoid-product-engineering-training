from pydantic import BaseModel
from typing import Optional

class Product(BaseModel):
    name: str
    price: float
    category: str
    stock: int

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    stock: Optional[int] = None