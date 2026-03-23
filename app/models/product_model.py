from pydantic import BaseModel
from typing import Optional
class Product(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    stock: Optional[int] = None


