from app.models.productModel import Product, PatchProduct

products = [
    {"id": 1, "name": "Laptop", "price": 100000, "category": "Electronics", "stock": 10},
    {"id": 2, "name": "Mobile", "price": 30000, "category": "Electronics", "stock": 80},
    {"id": 3, "name": "Headphones", "price": 3000, "category": "Electronics", "stock": 150}
]


def getAllProducts():
    return products


def getProductById(productId: int):
    return next((p for p in products if p["id"] == productId), None)


def createProduct(product: Product):
    data = product.model_dump()

    new_id = max([p["id"] for p in products], default=0) + 1
    data["id"] = new_id

    products.append(data)
    return data


def updateProduct(productId: int, productData: Product):
    for index, product in enumerate(products):
        if product["id"] == productId:
            data = productData.model_dump()
            data["id"] = productId
            products[index] = data
            return data
    return None


def patchUpdate(productId: int, patchData: PatchProduct):
    for product in products:
        if product["id"] == productId:
            updates = patchData.model_dump(exclude_unset=True)

            if not updates:
                return product

            for key, value in updates.items():
                product[key] = value

            return product

    return None


def deleteProduct(productId: int):
    for index, product in enumerate(products):
        if product["id"] == productId:
            return products.pop(index)

    return None