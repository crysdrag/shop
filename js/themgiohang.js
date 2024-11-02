


// Sự kiện khi nhấn nút 'Thêm vào giỏ hàng' trong trang test1.html
let cartbtn = document.querySelector('.cart-button');
cartbtn.addEventListener('click', function () {
    // Lấy thông tin ảnh, tên và giá sản phẩm
    let img = document.querySelector('.slider_left_top img').src; // Lấy thuộc tính src của ảnh
    let name = document.querySelector('.name').textContent.trim(); // Lấy nội dung văn bản tên sản phẩm
    let price = document.querySelector('.price').textContent.trim(); // Lấy nội dung văn bản giá

    // Tạo đối tượng chứa thông tin sản phẩm (được đổi tên thành 'user')
    let user = {
        img: img,
        name: name,
        price: price,
        quantity: 1  // Mặc định số lượng là 1
    };

    // Lấy dữ liệu hiện có trong localStorage (nếu có) và thêm sản phẩm mới
    let userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : [];

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    let existingUser = userData.find(item => item.name === user.name);
    if (existingUser) {
        // Nếu sản phẩm đã có, tăng số lượng
        existingUser.quantity += 1;
    } else {
        // Nếu chưa có, thêm sản phẩm vào mảng
        userData.push(user);
    }

    // Lưu lại vào localStorage dưới dạng chuỗi JSON
    localStorage.setItem('userData', JSON.stringify(userData));

    alert('Sản phẩm đã được thêm vào giỏ hàng ❤️💕😘');
});





