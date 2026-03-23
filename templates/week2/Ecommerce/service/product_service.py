products = (
    {
        "id" : 1,
        "name" : "Laptop",
        "price" : 2000,
        "category" : "Electronics",
        "stock" : 10
    },
    {
        "id" : 2,
        "name" : "Mobile",
        "price" : 10000,
        "category" : "Electronics",
        "stock" : 4
    }
)

def get_all_products(): #GET ALL PRODUCTS
    return products

def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None