// khai bao lop Product
function Product(id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
}
// Khoi tao mang Product có 6 sp thuoc 2 danh muc
const products = [
    new Product(1, "iPhone 15 Pro Max", 38000000, 5, "iPhone", true),
    new Product(2, "iPhone 14 Pro", 29000000, 3, "iPhone", true),
    new Product(3, "iPhone 13", 19000000, 8, "iPhone", true),

    new Product(4, "MacBook Air M2", 32000000, 4, "Computer", true),
    new Product(5, "MacBook Pro M3", 48000000, 2, "Computer", true),
    new Product(6, "Laptop Dell XPS 13", 35000000, 0, "Computer", false)
];

// Sử dụng phương thức map để tạo mảng mới chỉ chứa name và price của từng sản phẩm
const nameAndPrice = products.map(p => ({
    name: p.name,
    price: p.price
}));
// Loc sp qonlity > 0
console.log(nameAndPrice);
const inStockProducts = products.filter(p => p.quantity > 0);

console.log(inStockProducts);
// Kiểm tra giá Pri > 30tr
const hasExpensiveProduct = products.some(p => p.price > 30000000);

console.log(hasExpensiveProduct);
// Kiểm tra tất cả sp trong danh mục Accessories có isAvailable = true
const accessoriesAvailable = products
    .filter(p => p.category === "Accessories")
    .every(p => p.isAvailable === true);

console.log(accessoriesAvailable);
//Tính tổng giá trị kho hàng
const totalInventoryValue = products.reduce(
    (total, p) => total + p.price * p.quantity,
    0
);

console.log(totalInventoryValue);
//Dùng for of in duyệt mảng và in ra thông tin sản phẩm
for (const p of products) {
    console.log(
        `${p.name} - ${p.category} - ${p.isAvailable ? "Đang bán" : "Ngừng bán"}`
    );
}
//Dùng for in in tên thuộc tính và giá trị tương ứng
for (const key in products[0]) {
    console.log(`${key}: ${products[0][key]}`);
}
//Lấy danh sách tên sản phẩm đang bán và còn hàng
const sellingAndInStockNames = products
    .filter(p => p.isAvailable && p.quantity > 0)
    .map(p => p.name);

console.log(sellingAndInStockNames);


