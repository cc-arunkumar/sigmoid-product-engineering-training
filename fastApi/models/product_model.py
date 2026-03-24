# from pydantic import BaseModel, Field
# from typing import Optional

# class Product(BaseModel):
#     name: str = Field(min_length=3, max_length=50)
#     price: int = Field(gt=0,lt=99999)
#     category: str = None
#     stock: int = Field(gt=0)


# class ProductUpdate(BaseModel):
#     name: Optional[str] = None
#     price: Optional[int] = Field(None, ge=0)
#     stock: Optional[int] = Field(None, ge=0)
#     category: Optional[str] = None

# app/models/product_model.py
from pydantic import BaseModel, Field
from typing import Optional

# Model for full product data (POST / PUT)
class Product(BaseModel):
    name: str
    price: float
    category: str
    stock: int

# Model for PATCH API (partial updates)
class ProductPatch(BaseModel):
    name: Optional[str] = Field(default=None, min_length=3, max_length=50)
    price: Optional[float] = None
    category: Optional[str] = None
    stock: Optional[int] = None