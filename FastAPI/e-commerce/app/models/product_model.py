from typing import Optional
from pydantic import BaseModel, Field

class Product(BaseModel):
    name: Optional[str] = Field(min_length=1, max_length=50, example="Laptop")
    price: float = Field(gt=0, example=100000)
    category: str = Field(..., example="Electronics")
    stock: int = Field(..., example=10)