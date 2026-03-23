from pydantic import BaseModel

class Product(BaseModel):
    name:str
    price:int
    category:str
    stock:int

class ProductPatch(BaseModel):
    name: str | None = None
    price: int | None = None
    category: str | None = None
    stock: int | None = None