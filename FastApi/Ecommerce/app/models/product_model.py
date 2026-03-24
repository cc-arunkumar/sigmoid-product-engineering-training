from pydantic import BaseModel, Field
from typing import Optional

class Product(BaseModel):
    name: str = Field(min_length=3, max_length=50)
    price: int
    category: str
    stock: int


class ProductPatch(BaseModel):
    name: Optional[str] = Field(default=None, min_length=3, max_length=50)
    price: Optional[int] = Field(gt=0, lt=99999)
    category: Optional[str] = Field(min_length=3, max_length=50)
    stock: Optional[int] = Field(gt=0)
