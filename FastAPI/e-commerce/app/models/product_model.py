from typing import Optional
from pydantic import BaseModel

class Product(BaseModel):
    name: str = None
    price: float
    category: str
    stock: int

class ProductPatch(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    stock: Optional[int] = None