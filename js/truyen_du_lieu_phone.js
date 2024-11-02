

// Hàm để hiển thị từng sản phẩm vào trong 'product-container'
function renderProductById(product, containerClass) {
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
                        <span>${product.screenType}, ${product.screenSize || "Không xác định"}</span>
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

// Hàm lấy tham số từ URL
function getProductFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('product'); // Lấy tham số 'product' từ URL
}

document.addEventListener("DOMContentLoaded", function() {
    const selectedProduct = getProductFromURL(); // Lấy loại sản phẩm từ URL
    const productContainer = document.querySelector(".product-container");
    const productLink = document.getElementById('productLink'); // Lấy liên kết sản phẩm
    let currentIndex = 0; // Biến theo dõi số sản phẩm đã hiển thị
    const limit = 20; // Giới hạn sản phẩm mỗi lần hiển thị
    let products = []; // Mảng chứa sản phẩm
    let filteredProducts = []; // Mảng chứa sản phẩm đã lọc

    if (selectedProduct) {
        // Thay đổi nội dung liên kết sản phẩm dựa trên sản phẩm đã chọn
        productLink.textContent = selectedProduct.charAt(0).toUpperCase() + selectedProduct.slice(1); // Chữ cái đầu tiên in hoa

        // Tải dữ liệu từ file JSON
        fetch('phone.json') // Thay 'path/to/phone.json' bằng đường dẫn thực tế tới file JSON của bạn
            .then(response => response.json())
            .then(data => {
                // Lọc sản phẩm theo loại
                if (selectedProduct === 'iphone') {
                    products = data.apple;
                } else if (selectedProduct === 'samsung') {
                    products = data.samsung;
                } else if (selectedProduct === 'oppo') {
                    products = data.oppo;
                } else if (selectedProduct === 'xiaomi') {
                    products = data.xiaomi;
                } else if (selectedProduct === 'vivo') {
                    products = data.vivo;
                } else if (selectedProduct === 'redmi') {
                    products = data.redmi;
                } else if (selectedProduct === 'huawei') {
                    products = data.huawei;
                } else if (selectedProduct === 'nokia') {
                    products = data.nokia;
                } else if (selectedProduct === 'oneplus') {
                    products = data.oneplus;
                }

                // Hiển thị sản phẩm ban đầu
                displayProducts();
                
                // Gắn sự kiện cho nút "Thêm 20 sản phẩm"
                const addButton = document.querySelector(".them_item");
                addButton.addEventListener("click", function() {
                    displayProducts(); // Gọi hàm để hiển thị thêm sản phẩm
                });
                
                // Gắn sự kiện cho nút sắp xếp
                const sortHighToLow = document.querySelector(".Sap_xep button:first-child");
                const sortLowToHigh = document.querySelector(".Sap_xep button:last-child");
                
                sortHighToLow.addEventListener("click", function() {
                    products.sort((a, b) => b.price - a.price); // Sắp xếp theo giá cao -> thấp
                    currentIndex = 0; // Đặt lại chỉ số sản phẩm đã hiển thị
                    productContainer.innerHTML = ""; // Xóa sản phẩm hiện tại
                    displayProducts(); // Hiển thị lại sản phẩm đã sắp xếp
                });
                
                sortLowToHigh.addEventListener("click", function() {
                    products.sort((a, b) => a.price - b.price); // Sắp xếp theo giá thấp -> cao
                    currentIndex = 0; // Đặt lại chỉ số sản phẩm đã hiển thị
                    productContainer.innerHTML = ""; // Xóa sản phẩm hiện tại
                    displayProducts(); // Hiển thị lại sản phẩm đã sắp xếp
                });
                
                // Gắn sự kiện cho nút "Xem kết quả" với class xem_ket_qua
                const viewResultsButton = document.querySelector(".filter-container .xem_ket_qua4");
                viewResultsButton.addEventListener("click", applyFilters); // Gọi hàm applyFilters khi nhấn "Xem kết quả"
                

                const viewResultsButtonStorage = document.querySelector("#contain-4 .xem_ket_qua4");
                viewResultsButtonStorage.addEventListener("click", applyStorageFilter);
                function applyStorageFilter() {
                    const storageFilters = [
                        { id: "GB32", value: "32GB" },
                        { id: "GB64", value: "64GB" },
                        { id: "GB128", value: "128GB" },
                        { id: "GB256", value: "256GB" },
                        { id: "GB512", value: "512GB" },
                        { id: "TB1", value: "1TB" }
                    ].filter(filter => document.getElementById(filter.id).checked);
                
                    // Lọc sản phẩm dựa trên dung lượng lưu trữ
                    filteredProducts = products.filter(product => {
                        return storageFilters.length === 0 || storageFilters.some(filter => product.storage === filter.value);
                    });
                
                    currentIndex = 0;
                    productContainer.innerHTML = "";
                
                    // Kiểm tra nếu không có sản phẩm nào khớp
                    if (filteredProducts.length === 0) {
                        productContainer.innerHTML = "<p>Sản phẩm đang được nhập về.</p>";
                    } else {
                        displayProducts(); // Hiển thị các sản phẩm đã lọc nếu có
                    }
                }

                const viewResultsButtonRam = document.querySelector("#contain-3 .xem_ket_qua3");
                viewResultsButtonRam.addEventListener("click", applyStorageFilter); // Đã sửa lại thành viewResultsButtonRam
                function applyStorageFilter() {
                    const storageFilters = [
                        { id: "GB4", value: "4GB" },
                        { id: "GB6", value: "6GB" },
                        { id: "GB8", value: "8GB" },
                        { id: "GB12", value: "12GB" },
                        { id: "GB16", value: "16GB" }
                    ].filter(filter => document.getElementById(filter.id).checked);

                    // Lọc sản phẩm dựa trên RAM
                    filteredProducts = products.filter(product => {
                        return storageFilters.length === 0 || storageFilters.some(filter => product.ram === filter.value);
                    });

                    currentIndex = 0;
                    productContainer.innerHTML = "";

                    // Kiểm tra nếu không có sản phẩm nào khớp
                    if (filteredProducts.length === 0) {
                        productContainer.innerHTML = "<p>Sản phẩm đang được nhập về.</p>";
                    } else {
                        displayProducts(); // Hiển thị các sản phẩm đã lọc nếu có
                    }
                }

                const viewResultsButtonPrice = document.querySelector("#contain-2 .xem_ket_qua2");
                viewResultsButtonPrice.addEventListener("click", applyPriceFilter);
                function applyPriceFilter() {
                    const priceFilters = [
                        { id: "tr3", max: 3000000 },
                        { id: "tr73", min: 3000000, max: 7000000 },
                        { id: "tr107", min: 7000000, max: 10000000 },
                        { id: "tr1510", min: 10000000, max: 15000000 },
                        { id: "tr15", min: 15000000 }
                    ].filter(filter => document.getElementById(filter.id).checked);

                    // Lọc sản phẩm dựa trên giá
                    filteredProducts = products.filter(product => {
                        return priceFilters.length === 0 || priceFilters.some(filter => {
                            const isWithinPriceRange = (filter.min === undefined || product.price >= filter.min) &&
                                                        (filter.max === undefined || product.price < filter.max);
                            return isWithinPriceRange;
                        });
                    });

                    currentIndex = 0;
                    productContainer.innerHTML = "";

                    // Kiểm tra nếu không có sản phẩm nào khớp
                    if (filteredProducts.length === 0) {
                        productContainer.innerHTML = "<p>Sản phẩm đang được nhập về.</p>";
                    } else {
                        displayProducts(); // Hiển thị các sản phẩm đã lọc nếu có
                    }
                }


                if (products.length === 0) {
                    productContainer.innerHTML = "<p>Sản phẩm đang được nhập về.</p>";
                }
            })
            .catch(error => console.error("Lỗi khi tải dữ liệu:", error));
    } else {
        productContainer.innerHTML = "<p>Sản phẩm đang được nhập về.</p>";
    }

    // Hàm để hiển thị sản phẩm
    function displayProducts() {
        const nextProducts = filteredProducts.length > 0 ? filteredProducts.slice(currentIndex, currentIndex + limit) : products.slice(currentIndex, currentIndex + limit);
        if (products.length <= 20) {
            const addButton = document.querySelector(".them_item");
            addButton.style.display = "none";
        }
        if (nextProducts.length > 0) {
            nextProducts.forEach(product => {
                renderProductById(product, 'product-container');
            });
            currentIndex += nextProducts.length; // Cập nhật chỉ số
        } else {
            const addButton = document.querySelector(".them_item");
            addButton.style.display = "none"; // Ẩn nút nếu không còn sản phẩm
        }
    }

    const viewResultsButton = document.querySelector("#contain-1 .xem_ket_qua1");
    viewResultsButton.addEventListener("click", applyFilters);
    function applyFilters() {
        // Lọc theo giá
        const priceFilters = [
            { id: "t3", max: 3000000 },
            { id: "t73", min: 3000000, max: 7000000 },
            { id: "t107", min: 7000000, max: 10000000 },
            { id: "t1510", min: 10000000, max: 15000000 },
            { id: "t15", min: 15000000 }
        ].filter(filter => document.getElementById(filter.id).checked);
    
        // Lọc theo RAM
        const ramFilters = [
            { id: "G4", value: "4GB" },
            { id: "G6", value: "6GB" },
            { id: "G8", value: "8GB" },
            { id: "G12", value: "12GB" },
            { id: "G16", value: "16GB" }
        ].filter(filter => document.getElementById(filter.id).checked);
    
        // Lọc theo dung lượng
        const storageFilters = [
            { id: "G32", value: "32GB" },
            { id: "G64", value: "64GB" },
            { id: "G128", value: "128GB" },
            { id: "G256", value: "256GB" },
            { id: "G512", value: "512GB" },
            { id: "T1", value: "1TB" }
        ].filter(filter => document.getElementById(filter.id).checked);
    
        // Lọc sản phẩm dựa trên giá, RAM và dung lượng
        filteredProducts = products.filter(product => {
            const isPriceMatch = priceFilters.length === 0 || priceFilters.some(filter => {
                return (filter.min === undefined || product.price >= filter.min) &&
                       (filter.max === undefined || product.price < filter.max);
            });
    
            const isRamMatch = ramFilters.length === 0 || ramFilters.some(filter => product.ram === filter.value);
            
            const isStorageMatch = storageFilters.length === 0 || storageFilters.some(filter => product.storage === filter.value);
    
            return isPriceMatch && isRamMatch && isStorageMatch;
        });
    
        currentIndex = 0;
        productContainer.innerHTML = "";
    
        // Kiểm tra nếu không có sản phẩm nào khớp
        if (filteredProducts.length === 0) {
            productContainer.innerHTML = "<p>Sản phẩm đang được nhập về.</p>";
        } else {
            displayProducts(); // Hiển thị các sản phẩm đã lọc nếu có
        }
    }
    
});
