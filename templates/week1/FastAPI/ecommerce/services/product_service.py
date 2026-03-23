products = [
    {
        "id": 1,
        "name": "Laptop",
        "price": 500000,
        "category": "Electronics",
        "stock": 10
    },
    {
        "id": 2,
        "name": "Mobile",
        "price": 250000,
        "category": "Electronics",
        "stock": 15
    }
]

# GET All Products
def get_all_products():
    return products

# GET Products By Id
def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None

#POST Product
def create_product(product_data):
    new_product = product_data.dict()

    #Generating ID manually
    new_product["id"] = len(products) + 1

    products.append(new_product)

    return new_product