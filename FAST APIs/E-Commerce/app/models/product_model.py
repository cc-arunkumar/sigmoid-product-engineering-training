from pydantic import BaseModel, Field
from typing import Optional

# Define a Pydantic model for the product
class Product(BaseModel):
    name: str = Field(min_length=3, max_length=50)
    price: int = Field(gt=0, lt=9999)
    category: Optional[str] = None
    stock: Optional[int] = None


class ProductPatch(BaseModel):
    name: Optional[str] = Field(None, min_length=3, max_length=50)
    price: Optional[int] = Field(None, gt=0, lt=9999)
    category: Optional[str] = None
    stock: Optional[int] = None
