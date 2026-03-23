products = [
    {
        "id" : 1,
        "name" : "computer",
        "price" : 250000,
        "category": "electronics",
        "stock" : 10
    },
    {
        "id" : 2,
        "name" : "laptop",
        "price" : 50000,
        "category": "electronics",
        "stock" : 20
    }
]


# GET ALL PRODUCTS
def get_all_products():
    return products


#GET PRODUCTS BY ID
def get_product_by_id(product_id : int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None    
