from pydantic import BaseModel, Field
from typing import Optional


class ProductCreate(BaseModel):
    name: str = Field(..., min_length=1)
    price: float = Field(..., gt=0)
    category: Optional[str] = None
    stock: int = Field(default=0, ge=0)


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[int] = Field(default=None, gt=0)
    category: Optional[str] = None
    stock: Optional[int] = Field(default=None, ge=0)

class Product(ProductCreate):
    id : int