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

def get_product_by_id(product_id: int):
    for product in products:
        if product["id"]==product_id:
            return product
        
    return None   

def create_product(product_data):
     newProduct=product_data.dict()

     newProduct["id"]=len(products)+1

     products.append(newProduct)

     return products