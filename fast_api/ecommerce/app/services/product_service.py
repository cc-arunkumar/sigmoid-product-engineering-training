products=[{
    "id":1,
    "name":"Laptop",
    "price":50000,
    "category":"Electronics",
    "stock":50
},
{
    "id":2,
    "name":"Iphone",
    "price":85000,
    "category":"Electronics",
    "stock":50
},
{
    "id":3,
    "name":"Tablet",
    "price":25000,
    "category":"Electronics",
    "stock":50
}
]

#GET ALL PRODUCTS
def get_all_products():
    return products


#GET PRODUCTS BY ID
def get_product_by_id(product_id:int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None

#CREATE PRODUCTS
def create_product(product_data):
    newprod=product_data.dict()
    newprod["id"]=len(products)+1
    products.append(newprod)
    return products

#PUT PRODUCTS
def put_products(product_id:int,product_data):
    proddata=product_data.dict()
    for product in products:
        if product["id"]==product_id:
            product["name"]=proddata["name"]
            product["price"]=proddata["price"]
            product["category"]=proddata["category"]
            product["stock"]=proddata["stock"]
            return product
    return None



# #PATCH PRODUCT
# def patch_product(product_id:int,product_data):
#     proddata=product_data.dict()
#     for product in products:
#         if product["id"]==product_id:
#             if proddata["name"]!=None:
#                 product["name"]=proddata["name"]
#             if proddata["price"]!=None:
#                 product["price"]=proddata["price"]
#             if proddata["category"]!=None:
#                 product["category"]=proddata["category"]
#             if proddata["stock"]!=None:
#                 product["stock"]=proddata["stock"]
#             return product
#     return None



    
#DELETE PRODUCTS
def delete_product(product_id:int):
    for product in products:
        if product["id"]==product_id:
            del(products[product_id-1])
            return products
    return None


