products = [
  {
    "id" : 1,
    "name" : "laptop",
    "price" : 50000,
    "category" : "Electronics",
    "stock" : 10
  },
  {
    "id" : 2,
    "name" : "mouse",
    "price" : 500,
    "category" : "Electronics",
    "stock" : 50
  }
  
]

def get_all_products():
  return products

  # GET Products By Id

def get_product_by_id(product_id: int):
  for product in products:
    if product["id"] == product_id:
      return product
  return None

def create_product(product_data):
  new_product = product_data.dict()
  new_product["id"] = len(products) + 1
  products.append(new_product)
  return new_product

def update_product(product_id: int, product_data):
  for index, product in enumerate(products):
    if product["id"] == product_id:
      products[index].update(product_data.dict(exclude_unset=True))
      return products[index]
  return None

def delete_product(product_id: int):
  for index, product in enumerate(products):
    if product["id"] == product_id:
      return products.pop(index)
  return None

def replace_product(product_id: int, product_data):
  for index, product in enumerate(products):
    if product["id"] == product_id:
      replaced = product_data.dict()
      replaced["id"] = product_id
      products[index] = replaced
      return products[index]
  return None