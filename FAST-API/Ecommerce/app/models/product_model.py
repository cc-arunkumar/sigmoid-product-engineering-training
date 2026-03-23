from pydantic import BaseModel, Field
from typing import Optional 

##adding pydantic Field validation

class Product(BaseModel):
    name : str = Field(min_length=3 , max_length=20)
    price : int = Field(gt = 0 , lt = 99999)
    category : str
    stock : int = Field(gt = -1)


class ProductPartial(BaseModel):
    name : Optional[str] = Field(default=None, min_length=3 , max_length=20)
    price : Optional[int] = Field(default=None,gt = 0 , lt = 99999)
    category :Optional[str] = None
    stock : Optional[int] = Field(default=None,gt = -1)

