let products = [];
let filteredProducts = [];

fetch("db.json")
    .then(res => res.json())
    .then(data => {
        products = data;
        filteredProducts = [...products];
        renderProducts(filteredProducts);
    })
    .catch(err => console.log(err));

function renderProducts(products) {
    const container = document.getElementById("productList");
    container.innerHTML = ""; // Clear existing content

    products.forEach(p => {
        const row = document.createElement("tr");
        row.className = "product-row";
        row.innerHTML = `
            <td><img src="${p.images[0]}" style="width:100px;height:80px;object-fit:cover;"></td>
            <td>${p.title}</td>
            <td>${p.category.name}</td>
            <td>${p.price}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="updateProduct(${p.id})">Sửa</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">Xóa</button>
            </td>
        `;
        container.appendChild(row);
    });
}

function onSearch() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    filteredProducts = products.filter(p => p.title.toLowerCase().includes(query));
    renderProducts(filteredProducts);
}

function sortByName() {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    renderProducts(filteredProducts);
}

function sortByPrice() {
    filteredProducts.sort((a, b) => a.price - b.price);
    renderProducts(filteredProducts);
}

function filterByAscendingPrice() {
    filteredProducts = products.filter(p => p.price >= 0).sort((a, b) => a.price - b.price);
    renderProducts(filteredProducts);
}

function filterByDescendingPrice() {
    filteredProducts = products.filter(p => p.price >= 0).sort((a, b) => b.price - a.price);
    renderProducts(filteredProducts);
}

function filterByAscendingName() {
    filteredProducts = products.slice().sort((a, b) => a.title.localeCompare(b.title));
    renderProducts(filteredProducts);
}

function filterByDescendingName() {
    filteredProducts = products.slice().sort((a, b) => b.title.localeCompare(a.title));
    renderProducts(filteredProducts);
}

function addProduct() {
    const newProduct = {
        id: Date.now(),
        title: "Sản phẩm mới",
        slug: "san-pham-moi",
        price: 0,
        description: "Mô tả sản phẩm mới",
        category: { id: 1, name: "Clothes", slug: "clothes" },
        images: ["https://placehold.co/600x400"],
        creationAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    products.push(newProduct);
    filteredProducts = [...products];
    renderProducts(filteredProducts);
}

function createProduct() {
    const title = prompt("Nhập tên sản phẩm:");
    const price = parseFloat(prompt("Nhập giá sản phẩm:"));
    const description = prompt("Nhập mô tả sản phẩm:");
    const category = prompt("Nhập danh mục sản phẩm:");
    const image = prompt("Nhập URL hình ảnh sản phẩm:");

    if (title && !isNaN(price) && description && category && image) {
        const newProduct = {
            id: Date.now(),
            title,
            slug: title.toLowerCase().replace(/\s+/g, "-"),
            price,
            description,
            category: { id: 1, name: category, slug: category.toLowerCase() },
            images: [image],
            creationAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        products.push(newProduct);
        filteredProducts = [...products];
        renderProducts(filteredProducts);
    } else {
        alert("Vui lòng nhập đầy đủ thông tin hợp lệ.");
    }
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        const newTitle = prompt("Nhập tên sản phẩm mới:", product.title);
        if (newTitle) {
            product.title = newTitle;
            product.updatedAt = new Date().toISOString();
            filteredProducts = [...products];
            renderProducts(filteredProducts);
        }
    }
}

function updateProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        const title = prompt("Nhập tên sản phẩm mới:", product.title);
        const price = parseFloat(prompt("Nhập giá sản phẩm mới:", product.price));
        const description = prompt("Nhập mô tả sản phẩm mới:", product.description);
        const category = prompt("Nhập danh mục sản phẩm mới:", product.category.name);
        const image = prompt("Nhập URL hình ảnh sản phẩm mới:", product.images[0]);

        if (title && !isNaN(price) && description && category && image) {
            product.title = title;
            product.price = price;
            product.description = description;
            product.category.name = category;
            product.images[0] = image;
            product.updatedAt = new Date().toISOString();
            filteredProducts = [...products];
            renderProducts(filteredProducts);
        } else {
            alert("Vui lòng nhập đầy đủ thông tin hợp lệ.");
        }
    }
}

function deleteProduct(id) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
        products = products.filter(p => p.id !== id);
        filteredProducts = [...products];
        renderProducts(filteredProducts);
    }
}

document.addEventListener("mousemove", (e) => {
    const tooltips = document.querySelectorAll(".description-tooltip");
    tooltips.forEach(tooltip => {
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
    });
});
