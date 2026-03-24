from sqlalchemy.orm import Session
from app.db.base import ProductTable

products=[
    {
       "id":1,
       "name":"laptop",
       "price":80000,
       "category":"electronics",
       "stock":20

    },
    {
      "id":2,
       "name":"phone",
       "price":50000,
       "category":"electronics",
       "stock":20
    }
]

# get all products
def getallProduct(db:Session):
   return db.query(ProductTable).all()
 

# get product by id

def get_product_by_id(db:Session,product_id):
    # for product in products:
    #     if product["id"]==product_id:
    #         return product
        
    return db.query(ProductTable).filter(ProductTable.id==product_id).first()

#add product
def create_product(db:Session,product_data):
     newProduct=ProductTable(**product_data.dict())

     db.add(newProduct)
     db.commit()
     db.refresh(newProduct)

     return newProduct

#update by using put
def update_product(db:Session,product_id, product_data):
     product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

     if not product:
        return {"error": "Product not found"}

     update_data = product_data.dict()

     for key, value in update_data.items():
        setattr(product, key, value)

    # 4. Commit changes
     db.commit()
     db.refresh(product)

     return product
            
     return {"error": "Product not found"}

#update by using patch
def patch_product(db:Session,product_id, product_data):
     product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

     if not product:
        return {"error": "Product not found"}

     update_data = product_data.dict(exclude_unset=True)

     for key, value in update_data.items():
        setattr(product, key, value)

    # 4. Commit changes
     db.commit()
     db.refresh(product)

     return product
            
#delete product
def del_product(db:Session,product_id):
     product = db.query(ProductTable).filter(ProductTable.id == product_id).first()
     if not product:
        return {"error": "Product not found"}
     db.delete(product)
     db.commit() 
     return {"error": "Product not found"}    