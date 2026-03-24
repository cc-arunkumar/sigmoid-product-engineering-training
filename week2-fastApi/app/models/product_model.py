from pydantic import BaseModel, Field
from typing import Optional


class Product(BaseModel):
    name: str = Field(min_length=3, max_length=50)
    price: float
    category: str
    stock: int


# Model for PATCH API
class ProductPatch(BaseModel):
    name: Optional[str] = Field(default=None, min_length=3, max_length=50)
    price: Optional[float] = None
    category: Optional[str] = None
    stock: Optional[int] = None