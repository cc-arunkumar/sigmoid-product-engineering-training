from pydantic import BaseModel,Field
from typing import Optional
class Product(BaseModel):
    name : str =Field(min_length=3,max_length=50)
    price: int =Field(gt=0, lt=999)
    category: str
    stock : int



class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[int] = None
    category: Optional[str] = None
    stock: Optional[int] = None