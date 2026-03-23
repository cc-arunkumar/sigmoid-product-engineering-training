from pydantic import BaseModel, validator
from typing import Optional


class Product(BaseModel):
  name: Optional[str] = None
  price: Optional[int] = None
  category: Optional[str] = None
  stock: Optional[int] = None

  @validator("price")
  def price_must_be_positive(cls, v):
    if v is not None and v < 0:
      raise ValueError("Price cannot be negative")
    return v
 