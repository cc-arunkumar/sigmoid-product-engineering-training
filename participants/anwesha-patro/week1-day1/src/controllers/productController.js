let products = require("../data/products");

exports.getAllProducts = (req, res) => {
    res.json(products)
}

exports.getOneProducts = (req, res) => {
    const id = parseInt(req.params.id);
    const prod = products.find(i => i.id === id)
    if (!prod) {
        return res.status(404).json(
            {
                message: "Product not found"
            }
        )
    }
    res.json(prod)

}


// exports.create = (req, res) => {
//     const { name, price, category, stock } = req.body;
//     const add = {
//         id: 100 + products.length + 1,
//         name: name,
//         price: price,
//         category: category,
//         stock: stock
//     }

//     products.push(add)

//     res.status(201).json(add)
// }

// exports.updateById = (req, res) => {
//     const id = parseInt(req.params.id);
//     const prod = products.find(i => i.id === id)
//     if (!prod) {
//         res.send("Nothing to update")
//     }

//     const { name, price, category, stock } = req.body;
//     prod.name = name;
//     prod.price = price;
//     prod.category = category;
//     prod.stock = stock;

//     res.status(200).json(prod)

// }


// exports.deleteById = (req, res) => {
//     const id = parseInt(req.params.id);
//     const prod = products.find(i => i.id === id)
//     if (!prod) {
//         res.send("Nothing to delete")
//     }
//     products = products.filter(i => i.id !== id)
//     res.status(200).json(products)

// }

// exports.updatePartial = (req, res) => {
//     const id = parseInt(req.params.id);
//     const prod = products.find(i => i.id === id)
//     if (!prod) {
//         res.send("Nothing to update")
//     }

//     const { name, price, category, stock } = req.body;

//     if (name != undefined) {
//         prod.name = name;
//     }
//     if (price != undefined) {
//         prod.price = price;
//     }
//     if (category != undefined) {
//         prod.category = category;
//     }
//     if (stock != undefined) {
//         prod.stock = stock;
//     }

//     res.json(prod)


// }
