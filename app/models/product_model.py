from pydantic import BaseModel, Field

class Product(BaseModel):
    id: int | None = None
    name: str = Field(min_length=3, max_length=50)
    price: int = Field(gt=0, lt=99999)
    category: str
    stock: int