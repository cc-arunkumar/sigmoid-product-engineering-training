from pydantic import BaseModel, Field
from typing import Optional

class Product(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)
    price: int = Field(..., gt=0, lt=99999)
    category: str = Field(..., min_length=3, max_length=30)
    stock: int = Field(..., ge=0)

#model for patch api
class ProductPatch(BaseModel):
    name:Optional[str] = Field(default=None , min_length=3,max_length=50)
    price:Optional[float] = None
    category: Optional[str] = None
    stock: Optional[int] = None

