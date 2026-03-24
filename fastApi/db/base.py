from sqlalchemy import Column, Integer, String, Float
from db.database import Base

#for specific table one base class for it's structure
#here we have products table

class ProductTable(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50))
    price = Column(Float)
    category = Column(String(50))
    stock = Column(Integer)