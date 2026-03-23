from pydantic import BaseModel

class Product(BaseModel):
    id: int | None = None
    name: str
    price: float
    category: str
    stock: int