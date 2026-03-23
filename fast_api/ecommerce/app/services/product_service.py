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
    newid=len(products)+1
    newprod["id"]=newid
    products.append(newprod)
    return products
    
#DELETE PRODUCTS
