from sqlalchemy import Column , Integer , String , Float
from app.db.database import base

class ProductTable(base):
    __tablename__ = "products"

    id = Column(Integer , primary_key = True , index=True)
    name = Column(String(50))
    price = Column(Float)
    category = Column(String(50))
    stock = Column(Integer)
    