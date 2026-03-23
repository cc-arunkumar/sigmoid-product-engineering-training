products = [
    {
        "id": 1,
        "name": "Laptop",
        "price": 100000,
        "category": "Electronics",
        "stock": 10
    }, {
        "id": 2,
        "name": "Mobile",
        "price": 30000,
        "category": "Electronics",
        "stock": 80
    }, {
        "id": 3,
        "name": "Headphones",
        "price": 3000,
        "category": "Electronics",
        "stock": 150
    }
]

def getAllProducts():
    return products

def getProductById(productId: int):
    for product in products:
        if(product["id"] == productId): return product
    return None