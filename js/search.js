fetch('phone.json')
    .then(response => response.json())
    .then(jsonData => { 
        data = jsonData; // Lưu dữ liệu vào biến
    })
    .catch(error => console.error("Error loading data:", error));

function searchProducts() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    
    // Kiểm tra nếu ô input có chữ thì hiện div, ngược lại thì ẩn
    if (query === '') {
        resultsDiv.style.display = 'none';
        return;
    } else {
        resultsDiv.style.display = 'block';
    }

    resultsDiv.innerHTML = ''; // Xóa kết quả cũ

    // Duyệt qua các hãng để tìm kiếm theo từ khóa
    let count = 0;
    Object.keys(data).forEach(brand => {
        data[brand].forEach(product => {
            // Kiểm tra xem từ khóa có nằm trong tên hãng hoặc model
            if ((brand.toLowerCase().includes(query) || product.model.toLowerCase().includes(query)) && count < 5) {
                const productDiv = document.createElement('div');

                // Hàm định dạng số với dấu phẩy
                function formatPrice(price) {
                    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }

                const formattedPrice = formatPrice(product.priceSale);

                productDiv.classList.add('product');
                productDiv.innerHTML = `
                    <div class="product">
                        <img class="product-image" src="${product.image}" alt="${product.model}" />
                        <div class="product-info">
                            <p class="product-name">${product.model} <span>${formattedPrice} VNĐ</span> </p>
                            <p class="product-specs">${product.ram} / ${product.storage}</p>
                        </div>
                    </div>
                `;
                resultsDiv.appendChild(productDiv);
                count++;
            }
        });
    });

    // Nếu không có sản phẩm khớp với từ khóa, hiển thị thông báo
    if (count === 0) {
        resultsDiv.innerHTML = '<p>Không tìm thấy sản phẩm nào.</p>';
    }
}
