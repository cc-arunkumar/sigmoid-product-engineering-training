from pydantic import BaseModel, Field

class Product(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)
    price: int = Field(..., gt=0, lt=99999)
    category: str = Field(..., min_length=3, max_length=30)
    stock: int = Field(..., ge=0)