from pydantic import BaseModel, Field
from typing import Optional

class Product(BaseModel):
    name: str = Field(min_length=3, max_length=50)
    price: int = Field(gt=0, lt=99999)
    category: str = None
    stock: int = None

class PatchProduct(BaseModel):
    name: Optional[str] = Field(None, min_length=3, max_length=50)
    price: Optional[int] = Field(None, gt=0, lt=99999)
    category: Optional[str] = None
    stock: Optional[int] = None