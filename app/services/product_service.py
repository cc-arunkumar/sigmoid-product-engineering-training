from app.models.product_model import Product

products = [
    {
        "id": 1,
        "name": "Product 1",
        "price": 100,
        "category": "Category A",
        "stock": 10
    },
    {
        "id": 2,
        "name": "Product 2",
        "price": 200,
        "category": "Category B",
        "stock": 20
    }
]

def get_all_products():
    return products

def get_product_by_id(product_id: int):
    for product in products:
        if product['id'] == product_id:
            return product
        

def create_product(product_data):
    new_product = product_data.dict()
    new_product['id'] = len(products) + 1
    products.append(new_product)
    return new_product

def replace_product(product_id: int, product_data: Product):
    for index, prod in enumerate(products):
        if prod["id"] == product_id:
            updated_product = {
                "id": product_id,
                **product_data.dict()
            }
            products[index] = updated_product
            return updated_product
    return None


def delete_product(product_id: int):
    for index, prod in enumerate(products):
        if prod["id"] == product_id:
            del products[index]
            return True
    return False   



