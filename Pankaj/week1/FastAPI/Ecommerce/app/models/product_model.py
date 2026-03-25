from typing import Optional
from pydantic import BaseModel, Field

class Product(BaseModel):
    name: str = Field(...,min_length=1,max_length=100)
    price: float = Field(..., gt=0)
    category: str = Field(..., min_length=1, max_length=100)
    stock: int = Field(..., ge=0)

class ProductPatch(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    price: Optional[float] = Field(None, gt=0)
    category: Optional[str] = Field(None, min_length=1, max_length=100)
    stock: Optional[int] = Field(None, ge=0)