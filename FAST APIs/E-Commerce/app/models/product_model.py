from pydantic import BaseModel

# Define a Pydantic model for the product
class Product(BaseModel):
    name: str
    price: float
    category: str
    stock: int
