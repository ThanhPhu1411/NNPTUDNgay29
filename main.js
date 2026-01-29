fetch("db.json")
    .then(res => res.json())
    .then(products => {
        const container = document.getElementById("productList");

        products.forEach(p => {
            const div = document.createElement("div");
            div.style.border = "1px solid #ccc";
            div.style.padding = "12px";
            div.style.marginBottom = "12px";

            div.innerHTML = `
                <img src="${p.images[0]}" style="width:200px;display:block;margin-bottom:8px">
                <h3>${p.title}</h3>
                <p>Danh mục: ${p.category.name}</p>
                <p>Giá: ${p.price}</p>
                <p>${p.description}</p>
            `;

            container.appendChild(div);
        });
    })
    .catch(err => console.log(err));
