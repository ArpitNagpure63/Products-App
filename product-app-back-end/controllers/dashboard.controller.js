const dashboardController = async (req, res) => {
    try {
        const user = req.user;
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        res.status(200).send({
            products: data.products,
            name: user.name,
            age: user.age,
        });
    } catch (error) {
        res.status(200).send({
            error: 'Unexpected error in dashboard controller',
            errorDescription: error
        });
    }
};

module.exports = dashboardController;