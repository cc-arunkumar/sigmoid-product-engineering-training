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
def getallProduct():
   return products
 

# get product by id

def get_product_by_id(product_id):
    for product in products:
        if product["id"]==product_id:
            return product
        
    return None   

#add product
def create_product(product_data):
     newProduct=product_data.dict()

     newProduct["id"]=len(products)+1

     products.append(newProduct)

     return newProduct

#update by using put
def update_product(product_id, product_data):
     updateproduct=product_data.dict()
     for product in products:
        if product["id"]==product_id:
           product.update(updateproduct)
           return product  
            
     return {"error": "Product not found"}

#update by using patch
def patch_product(product_id, product_data):
    updateproduct=product_data.dict(exclude_unset = True)
    for product in products:
        if product["id"]==product_id:
           product.update(updateproduct)
           return product  
            
    return {"error": "Product not found"}

#delete product
def del_product(product_id):
    for product in products:
        if product["id"]==product_id:
        
           products.remove(product)
           return {"message":"product deleted" ,"products":products}
        
    return {"error": "Product not found"}    