from pydantic import BaseModel, Field
from typing import Optional

# Use this for POST
class Product(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)
    price: int = Field(..., gt=0, lt=999999)
    category: str = Field(..., min_length=3, max_length=30)
    stock: int = Field(..., ge=0)

# Use this for PATCH and PUT
class ProductPatch(BaseModel):
    name: Optional[str] = Field(None, min_length=3, max_length=50)
    price: Optional[int] = Field(None, gt=0, lt=999999)
    category: Optional[str] = Field(None, min_length=3, max_length=30)
    stock: Optional[int] = Field(None, ge=0)