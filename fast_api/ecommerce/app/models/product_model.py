from pydantic import BaseModel, Field
from typing import Optional


class Product(BaseModel):
    name: str = Field(min_length=3, max_length=10)
    price: int = Field(gt=0, lt=100000)
    category: str = Field(min_length=3, max_length=20)
    stock: int = Field(gt=0, lt=5000)


class ProductPatch(BaseModel):
    name: Optional[str] = Field(default=None, min_length=3, max_length=10)
    price: Optional[int] = Field(default=None, gt=0, lt=100000)
    category: Optional[str] = Field(default=None, min_length=3, max_length=20)
    stock: Optional[int] = Field(default=None, gt=0, lt=5000)