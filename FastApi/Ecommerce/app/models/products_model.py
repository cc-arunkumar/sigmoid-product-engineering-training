from pydantic import BaseModel, Field
from typing import  Optional
class Product(BaseModel):
    name: str = Field(min_length=3,max_length=50, example="Product 1")
    price: float = Field(gt=0,lt=9999)
    category: Optional[str] = Field(None, example="Category A")
    stock: Optional[int] = Field(None, example=50)