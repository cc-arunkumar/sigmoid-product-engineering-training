products= [
    {
        "id":1,
        "name":"Laptop",
        "price":30000,
        "category":"electronics",
        "stock":4

    },
    {
        "id":2,
        "name":"shoe",
        "price":300,
        "category":"fashion",
        "stock":7

    }
]
# get all the products 
def get_all_products():
    return products

# get product by id
def get_product_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None
