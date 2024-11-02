document.addEventListener('DOMContentLoaded', () => {
    const cartTable = document.getElementById('cartTable');
    const totalSpan = document.getElementById('total-span');

    // Lấy dữ liệu từ localStorage và hiển thị sản phẩm
    function loadCart() {
        const userData = JSON.parse(localStorage.getItem('userData')) || [];
        cartTable.innerHTML = ''; // Xóa giỏ hàng trước khi hiển thị lại

        if (userData.length === 0) {
            displayEmptyMessage();
        } else {
            userData.forEach(item => {
                const row = createCartRow(item);
                cartTable.appendChild(row);
            });
        }

        updateTotalPrice(); // Cập nhật tổng giá sau khi tải sản phẩm
        updateElements(); // Cập nhật sự kiện cho các phần tử mới
    }

    // Tạo hàng sản phẩm trong giỏ hàng
    function createCartRow(item) {
        const row = document.createElement('tr');

        // Chuyển đổi giá trị price từ chuỗi sang số
        const price = parseFloat(item.price.replace(/\./g, '').replace('đ', '').trim()) || 0; // Loại bỏ dấu "." và "đ"
        const quantity = parseInt(item.quantity) || 1;
        const totalPrice = price * quantity; // Tính tổng giá cho sản phẩm

        row.innerHTML = `
            <td><img src="${item.img}" alt="${item.name}" style="width:50px;height:50px;"></td>
            <td>${item.name}</td>
            <td class="unit-price">${item.price}</td> <!-- Hiển thị giá gốc -->
            <td><input type="number" class="quantity" value="${quantity}" min="0" max="100"></td>
            <td class="total-price">${totalPrice.toLocaleString('vi-VN')}đ</td> <!-- Hiển thị tổng giá cho hàng -->
            <td><button class="del-icon">Xóa</button></td>
        `;
        return row;
    }

    // Hiển thị thông báo giỏ hàng trống nếu chưa có
    function displayEmptyMessage() {
        if (!cartTable.querySelector('.empty-row')) { // Kiểm tra nếu chưa có dòng trống
            const emptyRow = document.createElement('tr');
            emptyRow.classList.add('empty-row'); // Thêm lớp để dễ nhận biết
            const emptyCell = document.createElement('td');
            emptyCell.colSpan = 6;
            emptyCell.textContent = 'Giỏ hàng của bạn trống.';
            emptyCell.style.textAlign = 'center';
            emptyRow.appendChild(emptyCell);
            cartTable.appendChild(emptyRow);
        }
    }

    // Cập nhật lại localStorage
    function updateLocalStorage() {
        const rows = cartTable.querySelectorAll('tr:not(.empty-row)'); // Chỉ lấy các hàng không phải là dòng trống
        const updatedData = [];

        rows.forEach(row => {
            const img = row.querySelector('img').src;
            const name = row.querySelector('td:nth-child(2)').textContent;
            const price = row.querySelector('.unit-price').textContent;
            const quantity = parseInt(row.querySelector('.quantity').value);

            if (quantity > 0) { // Chỉ thêm sản phẩm có số lượng lớn hơn 0
                updatedData.push({ img, name, price, quantity });
            }
        });

        localStorage.setItem('userData', JSON.stringify(updatedData));
    }

    // Cập nhật tất cả các phần tử cần thiết
    function updateElements() {
        const quantityInputs = cartTable.querySelectorAll('.quantity');
        const deleteButtons = cartTable.querySelectorAll('.del-icon');

        quantityInputs.forEach((input) => {
            input.addEventListener('input', handleQuantityChange);
        });

        deleteButtons.forEach((button) => {
            button.addEventListener('click', handleDelete);
        });
    }

    // Xử lý thay đổi số lượng
    function handleQuantityChange(event) {
        const input = event.target;
        let quantity = parseInt(input.value);
        const unitPriceElem = input.closest('tr').querySelector('.unit-price');
        const totalPriceElem = input.closest('tr').querySelector('.total-price');
        
        if (isNaN(quantity) || quantity < 0) {
            quantity = 0;
        } else if (quantity > 100) {
            quantity = 100;
        }
        input.value = quantity;
        
        // Lấy giá đơn vị từ phần tử
        const unitPrice = parseFloat(unitPriceElem.textContent.replace(/\./g, '').replace('đ', '').trim()) || 0; // Chuyển đổi giá từ chuỗi sang số
        const totalPrice = quantity * unitPrice; // Tính tổng giá cho hàng
        totalPriceElem.textContent = totalPrice.toLocaleString('vi-VN') + 'đ'; // Cập nhật tổng giá với định dạng

        updateTotalPrice(); // Cập nhật tổng giá của giỏ hàng
        updateLocalStorage(); // Cập nhật localStorage
    }

    // Xử lý sự kiện xóa sản phẩm
    function handleDelete(event) {
        const row = event.target.closest('tr');
        row.remove(); // Xóa hàng
        updateTotalPrice(); // Cập nhật tổng giá
        updateLocalStorage(); // Cập nhật localStorage
        checkCartEmpty(); // Kiểm tra xem giỏ hàng có trống không
    }

    // Cập nhật tổng giá của giỏ hàng
    function updateTotalPrice() {
        let total = 0;
        const totalPrices = cartTable.querySelectorAll('.total-price');

        totalPrices.forEach(price => {
            // Chuyển đổi giá từ chuỗi sang số thực
            const priceValue = parseFloat(price.textContent.replace(/\./g, '').replace('đ', '').trim()) || 0;
            total += priceValue; // Cộng dồn tổng giá
        });

        totalSpan.textContent = total.toLocaleString('vi-VN') + 'đ'; // Hiển thị tổng giá với định dạng
    }

    // Xóa tất cả sản phẩm trong giỏ hàng
    document.querySelector('.btn-clear').addEventListener('click', function () {
        cartTable.innerHTML = ''; // Xóa tất cả hàng
        updateTotalPrice(); // Cập nhật tổng giá
        updateLocalStorage(); // Cập nhật localStorage
        displayEmptyMessage(); // Hiển thị thông báo giỏ hàng trống
    });

    // Kiểm tra giỏ hàng trống và hiển thị thông báo
    function checkCartEmpty() {
        const rows = cartTable.querySelectorAll('tr');
        if (rows.length === 0 || (rows.length === 1 && rows[0].classList.contains('empty-row'))) {
            // Nếu không có sản phẩm nào hoặc chỉ có hàng thông báo giỏ hàng trống
            displayEmptyMessage();
            return false;
        }
        return true;
    }

    // Thêm sự kiện khi nhấn nút thanh toán
    document.querySelector('.btn-total').addEventListener('click', function(event) {
        event.preventDefault();

        // Kiểm tra xem giỏ hàng có trống hay không
        const cartNotEmpty = checkCartEmpty(); // Kiểm tra và hiển thị thông báo nếu giỏ hàng trống
        if (!cartNotEmpty) {
            alert('Ô kìa bạn đã mua gì đâu!');
            return; // Ngăn không cho chuyển hướng khi giỏ hàng trống
        }
        
        // Chuyển hướng nếu có sản phẩm trong giỏ hàng
        window.location.href = 'thanhtoan.html';
    });

    // Gọi hàm khởi tạo giỏ hàng
    loadCart();
});
