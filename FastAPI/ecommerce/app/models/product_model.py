from pydantic import BaseModel , Field
from typing import Optional

# class ProductIn(BaseModel):
#     name: str
#     price: int
#     category: str
#     stock: int

# class Product(BaseModel):
#     name: Optional[str] = None
#     price: Optional[int] = None
#     category: Optional[str] = None
#     stock: Optional[int] = None

class Product(BaseModel):
    name: Optional[str] = Field(min_length=3, max_length=50)
    price: int = Field(gt=0, lt=999999)
    category: str = None
    stock: int = None
    