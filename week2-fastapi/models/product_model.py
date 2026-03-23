from  pydantic import BaseModel,Field

class Product(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    price: float = Field(..., ge=0, le=1000000)  
    stock: int = Field(..., ge=0, le=10000)      
    category: str = Field(..., min_length=2, max_length=50)
class ProductPatch(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=100)
    price: Optional[float] = Field(None, ge=0, le=1000000)  
    stock: Optional[int] = Field(None, ge=0, le=10000)      
    category: Optional[str] = Field(None, min_length=2, max_length=50)
