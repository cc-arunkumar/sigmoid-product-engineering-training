from pydantic import BaseModel,Field
from typing import Optional
class Product(BaseModel):
    # with validations
    name: Optional[str] = Field(None,min_length=3,max_length=50) 
    price: Optional[float] = Field(None,gt=0,lt=99999)
    category: Optional[str] = None
    stock: Optional[int] = Field(None,gt=0)


