from sqlalchemy import Column, Integer, String, Float
from app.db.database import Base

class ProductTable(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    price = Column(Float, nullable=False)
    category = Column(String(100), nullable=True)
    stock = Column(Integer, nullable=True)