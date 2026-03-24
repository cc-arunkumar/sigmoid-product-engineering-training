from pydantic import BaseModel, Field
from typing import Optional

class Product(BaseModel):
    name: str = Field(min_length = 3, max_lenght = 50)
    price: int = float
    category: str 
    stock: int 


 #patch
class ProductPath(BaseModel):
    name: Optional[str] = Field(default=None, min_length=3, max_length=50)
    price: Optional[str] = None
    category: Optional[str] = None
    stock: Optional[str] = None