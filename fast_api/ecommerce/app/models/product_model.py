from pydantic import BaseModel,Field

class Product(BaseModel):
    name:str=Field(min_length=3,max_length=10)
    price:int=Field(gt=0,lt=100000)
    category:str=Field(min_length=3,max_length=20)
    stock:int=Field(gt=0,lt=5000)

class ProductPatch(BaseModel):
    name: str | None = None
    price: int | None = None
    category: str | None = None
    stock: int | None = None