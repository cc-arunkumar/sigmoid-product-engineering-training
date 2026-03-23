products = [
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

# CRUD Operations

# Read All
def get_all_products():
    return products

# Read by id
def get_product_by_id(product_id:int):
    for product in products:
        if product["id"]==product_id:
            return product
    return None

# Create
def create_product(product_data):
    new_product=product_data.dict()
    new_product["id"]=len(products)+1
    products.append(new_product)
    return new_product

# Update
def update_product(product_id:int, updated_data):
    for product in products:
        if product["id"]==product_id:
            product.update(updated_data.dict())
            return product
    return None

# Delete
def delete_product(product_id:int):
    for product in products:
        if product["id"]==product_id:
            products.remove(product)
            return True
    return False