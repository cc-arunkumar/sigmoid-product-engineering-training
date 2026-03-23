products=[
    {
        "id":1,
        "name":"Laptop",
        "price":500000,
        "category":"Electronics",
        "stock":10
    },
    {
        "id":2,
        "name":"Mobile",
        "price":250000,
        "category":"Electronics",
        "stock":15
    }
]
# GET PRODUCT BY ID 
def get_product_by_id(product_id: int):
    # mention datatype of product id always 
    for product in products:
        if product["id"]==product_id:
            return product
    return None
# GET ALL PRODUCTS
def get_all_products():
    return products
#CREATING A NEW PRODUCT
def create_product(product_data):
    new_product=product_data.dict()
    # THIS WILL CONVERT INCOMING REQUEST BODY DATA INTO A DICTIONARY 
    new_product["id"]=len(products)+1
    products.append(new_product)
    return new_product
# UPDATE A PRODUCT
def update_product(product_data,product_id:int):
    # pydantic is a class,product data is an instance or an object of pydantic class so we convert it to a dictinoary for easier processing for us 
    updated_product=product_data.dict()
    for product in products:
        if product["id"]==product_id:
            product["name"]=updated_product["name"]
            product["price"]=updated_product["price"]
            product["category"]=updated_product["category"]
            product["stock"]=updated_product["stock"]
            return product
    return None