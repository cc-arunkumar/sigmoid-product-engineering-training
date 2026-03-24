from pydantic import BaseModel,Field
from typing import Optional
class Product(BaseModel):
    # with validations
    name: str = Field(min_length=3,max_length=50) 
    price: float = Field(gt=0,lt=99999)
    category: str 
    stock: int = Field(gt=0)

# Model for PATCH API
class ProductPatch(BaseModel):
    name : Optional[str] = Field(default=None, min_length=3, max_length=50)
    price: Optional[float] = None
    category: Optional[str] = None
    stock: Optional[int] = None
