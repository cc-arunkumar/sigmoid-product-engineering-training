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
