from pydantic import BaseModel, Field, ConfigDict
from typing import Optional


class Product(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str = Field(min_length=3, max_length=50)
    price: int = Field(gt=0, lt=999)
    category: str
    stock: int


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[int] = None
    category: Optional[str] = None
    stock: Optional[int] = None


class ProductOut(Product):
    id: int
    model_config = ConfigDict(from_attributes=True)