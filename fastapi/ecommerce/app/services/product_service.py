products=[
    {
      "id":101,
      "name":"Laptop",
      "price":100000.0,  
      "category":"Electronics",
      "stock":20
    },
    {
      "id":102,
      "name":"Mobile",
      "price":25000.0,  
      "category":"Electronics",
      "stock":45
    },
    {
      "id":103,
      "name":"Headphones",
      "price":25000.0,  
      "category":"Electronics",
      "stock":50      
    }
  ]
# Get all products
def get_all_products():
    return products
# Get product by ID
def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None
# Add product
def create_product(product_data):
    new_product ={ "id": len(products) + 101 , **product_data.dict() } 
    products.append(new_product)
    return new_product

# Update product
def update_product(product_id: int, product_data):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            updated_product = { "id": product_id, **product_data.dict() }
            products[index] = updated_product
            return updated_product
    return None

