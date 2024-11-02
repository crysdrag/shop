function renderProduct(product, containerClass) {
    const container = document.querySelector(`#${containerClass}`);
    if (container) {
        container.innerHTML += `
        <div class="item">
            <a href="product_page.html?brand=${product.brand}&id=${product.id}">
                <img src="${product.image}" alt="${product.model}">
                <div>
                    <span>${product.model} ${product.storage}</span>
                    <span>Giá: ${product.priceSale.toLocaleString()} VNĐ</span>
                </div>
            </a>
        </div>
        `;
    }
}

function renderProductById(product, containerClass) {
    const container = document.querySelector(`.${containerClass}`);
    if (container) {
        container.innerHTML += `
        <div class="san_pham">
            <a href="product_page.html?brand=${product.brand}&id=${product.id}">
                <div class="Tra_gop"><span>Trả góp 0%</span></div>
                <div class="img_phone">
                    <img src="${product.image}" alt="${product.model}">
                </div>
                <div class="Chi_tiet">
                    <div class="Thong_So">
                        <span>${product.processor}</span>
                        <span>${product.ram}</span>
                        <span>${product.screenType}</span>
                    </div>
                    <div class="Thong_tin">
                        <div>
                            <span>${product.model} - ${product.storage}</span>
                        </div>
                        <div class="money">
                            <span>${product.price.toLocaleString()} VNĐ</span><br>
                            <span class="tien">${product.priceSale.toLocaleString()} VNĐ</span>
                        </div>
                    </div>
                    <hr>
                    <div class="box">
                        <span>Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6 tháng.</span>
                    </div>
                </div>
            </a>
            <button>
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 10C6.5 9.72386 6.72386 9.5 7 9.5H10V6.5C10 6.22386 10.2239 6 10.5 6C10.7761 6 11 6.22386 11 6.5V9.5H14C14.2761 9.5 14.5 9.72386 14.5 10C14.5 10.2761 14.2761 10.5 14 10.5H11V13.5C11 13.7761 10.7761 14 10.5 14C10.2239 14 10 13.7761 10 13.5V10.5H7C6.72386 10.5 6.5 10.2761 6.5 10ZM10.5 18C14.9183 18 18.5 14.4183 18.5 10C18.5 5.58172 14.9183 2 10.5 2C6.08172 2 2.5 5.58172 2.5 10C2.5 14.4183 6.08172 18 10.5 18ZM10.5 17C6.63401 17 3.5 13.866 3.5 10C3.5 6.13401 6.63401 3 10.5 3C14.366 3 17.5 6.13401 17.5 10C17.5 13.866 14.366 17 10.5 17Z" fill="#090D14"></path>
                </svg>
                <span id="SS1">So sánh</span>
                <span id="SS2">Đã thêm</span>
            </button>
        </div>
        `;
    }
}
function renderProductBy(product, containerClass) {
    const container = document.querySelector(`#${containerClass}`);
    if (container) {
        container.innerHTML += `
        <div class="san_pham">
            <a href="product_page.html?brand=${product.brand}&id=${product.id}">
                <div class="Tra_gop"><span>Trả góp 0%</span></div>
                <div class="img_phone">
                    <img src="${product.image}" alt="${product.model}">
                </div>
                <div class="Chi_tiet">
                    <div class="Thong_So">
                        <span>${product.processor}</span>
                        <span>${product.ram}</span>
                        <span>${product.screenType}</span>
                    </div>
                    <div class="Thong_tin">
                        <div>
                            <span>${product.model} - ${product.storage}</span>
                        </div>
                        <div class="money">
                            <span>${product.price.toLocaleString()} VNĐ</span><br>
                            <span class="tien">${product.priceSale.toLocaleString()} VNĐ</span>
                        </div>
                    </div>
                    <hr>
                    <div class="box">
                        <span>Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6 tháng.</span>
                    </div>
                </div>
            </a>
            <button>
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 10C6.5 9.72386 6.72386 9.5 7 9.5H10V6.5C10 6.22386 10.2239 6 10.5 6C10.7761 6 11 6.22386 11 6.5V9.5H14C14.2761 9.5 14.5 9.72386 14.5 10C14.5 10.2761 14.2761 10.5 14 10.5H11V13.5C11 13.7761 10.7761 14 10.5 14C10.2239 14 10 13.7761 10 13.5V10.5H7C6.72386 10.5 6.5 10.2761 6.5 10ZM10.5 18C14.9183 18 18.5 14.4183 18.5 10C18.5 5.58172 14.9183 2 10.5 2C6.08172 2 2.5 5.58172 2.5 10C2.5 14.4183 6.08172 18 10.5 18ZM10.5 17C6.63401 17 3.5 13.866 3.5 10C3.5 6.13401 6.63401 3 10.5 3C14.366 3 17.5 6.13401 17.5 10C17.5 13.866 14.366 17 10.5 17Z" fill="#090D14"></path>
                </svg>
                <span id="SS1">So sánh</span>
                <span id="SS2">Đã thêm</span>
            </button>
        </div>
        `;
    }
}

let allProducts = [];

// Fetch dữ liệu từ file JSON
fetch('phone.json')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        // Lấy sản phẩm từ các hãng
        const apple = data.apple || [];
        const samsung = data.samsung || [];
        const oppo = data.oppo || [];
        const redmi = data.redmi || [];
        
        // Hiển thị sản phẩm Apple
        apple.forEach((smart, index) => {
            renderProductBy(smart, `S${index + 1}Apple`); // Render sản phẩm Apple vào div có id="S1Apple", "S2Apple", ...
            renderProduct(smart, `B${index + 1}Apple`);
        });

        // Hiển thị sản phẩm Samsung
        samsung.forEach((smart, index) => {
            renderProductBy(smart, `S${index + 1}Samsung`); // Render sản phẩm Samsung vào div có id="S1Samsung", "S2Samsung", ...
            renderProduct(smart, `B${index + 1}Samsung`);
        });

        // Hiển thị sản phẩm oppo
        oppo.forEach((smart, index) => {
            renderProductBy(smart, `S${index + 1}oppo`); // Render sản phẩm Samsung vào div có id="S1Samsung", "S2Samsung", ...
            renderProduct(smart, `B${index + 1}oppo`);
        });

        // Hiển thị sản phẩm Samsung
        redmi.forEach((smart, index) => {
            renderProductBy(smart, `S${index + 1}redmi`); // Render sản phẩm Samsung vào div có id="S1Samsung", "S2Samsung", ...
            renderProduct(smart, `B${index + 1}redmi`);
        });

        // Kết hợp tất cả sản phẩm từ các hãng khác nhau vào mảng allProducts
        allProducts = [...apple, ...samsung];

        // Hiển thị 20 sản phẩm đầu tiên ngẫu nhiên
        addRandomProducts('product-container', 20);
    })
    .catch(error => console.error('Lỗi khi tải dữ liệu JSON:', error));

// Thêm sự kiện nhấn cho nút "Thêm sản phẩm"
document.querySelector('.them_item').addEventListener('click', () => {
    addRandomProducts('product-container', 20);
});

// Hàm trộn ngẫu nhiên một mảng (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Hàm thêm 20 sản phẩm ngẫu nhiên vào container
function addRandomProducts(containerClass, count = 20) {
    const container = document.querySelector(`.${containerClass}`);

    // Nếu không còn sản phẩm nào trong allProducts, thông báo hết sản phẩm
    if (allProducts.length === 0) {
        const item = document.querySelector('.them_item');
        item.style.display = 'none';
        return;
    }

    // Trộn ngẫu nhiên các sản phẩm còn lại
    shuffleArray(allProducts);

    // Lấy 20 sản phẩm ngẫu nhiên từ `allProducts`
    const productsToAdd = allProducts.splice(0, count); // Lấy và xóa 20 sản phẩm khỏi `allProducts`

    // Hiển thị sản phẩm lên giao diện
    productsToAdd.forEach((product) => {
        renderProductById(product, containerClass);
    });
}
