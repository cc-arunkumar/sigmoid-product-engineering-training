from pydantic import BaseModel, Field 
from typing import Optional

class Product(BaseModel):
    name: str = Field(default=None, min_length=1, max_length=100)
    price: int = Field(default=None, ge=0)
    category: str = Field(default=None, min_length=1, max_length=100)
    stock: int = Field(default=None, ge=0)
    
class ProductPatch(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=100)
    price: Optional[int] = Field(default=None, ge=0)
    category: Optional[str] = Field(default=None, min_length=1, max_length=100)
    stock: Optional[int] = Field(default=None, ge=0)