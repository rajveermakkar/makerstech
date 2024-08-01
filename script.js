function loadCategory(category) {
    $.getJSON('products.json', function(data) {
        const categoryProducts = data[category] || [];
        const productList = $('#product-list');
        productList.empty();
        categoryProducts.forEach(product => {
            productList.append(`
                <div class="col-lg-3 col-md-4 col-sm-6 col-12 category-card">
                    <div class="card__wrapper">
                    </div>
                    <div class="card__img">
                        <img src="${product.image[0]}" alt="${product.name}" class="d-block w-100">
                    </div>
                    <div class="card__title">${product.name}</div>
                   <!-- <div class="card__subtitle">${product.description}</div> -->
                    <div class="card__wrapper">
                        <div class="card__price">$${product.price}</div>
                        <a href="${product.buyLink}" class="btn btn-dark category-card-cartButton">Buy</a>
                    </div>
                </div>
            `);
        });
    }).fail(function() {
        console.error('Error loading products');
    });
}
