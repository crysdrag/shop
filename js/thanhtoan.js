document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('phone-number').addEventListener('input', function(event) {
        let input = event.target.value.replace(/\D/g, ''); // Lấy chỉ số
        let formattedNumber = '';

        // Định dạng số điện thoại
        if (input.length > 0) {
            formattedNumber += '(' + input.substring(0, 3);
        }
        if (input.length >= 4) {
            formattedNumber += ') ' + input.substring(3, 6);
        }
        if (input.length >= 7) {
            formattedNumber += '-' + input.substring(6, 10);
        }

        event.target.value = formattedNumber; // Cập nhật giá trị ô nhập
    });

    document.getElementById('check-pay').addEventListener('click', function() {
        // Lấy giá trị từ các trường
        var city = document.getElementById('citys').value;
        var address = document.querySelector('input[name="diachi"]').value;
        var phoneNumber = document.querySelector('input[name="phone-number"]').value.replace(/\D/g, ''); // Lấy số điện thoại mà không có định dạng
        var paymentMethod = document.querySelector('input[name="pay"]:checked');

        // Kiểm tra điều kiện
        if (city === '#' || city === '') {
            alert('Vui lòng chọn thành phố.');
            return;
        }
        
        if (address.trim() === '') {
            alert('Vui lòng nhập địa chỉ.');
            return;
        }
        
        // Kiểm tra số điện thoại theo định dạng 0xxxxxxxxx
        if (!isValidVietnamesePhoneNumber(phoneNumber)) {
            alert('Vui lòng nhập số điện thoại hợp lệ theo định dạng 0xxxxxxxxx.');
            return;
        }
        
        if (!paymentMethod) {
            alert('Vui lòng chọn phương thức thanh toán.');
            return;
        }

        // Nếu tất cả điều kiện đều hợp lệ
        window.location.href = 'https://www.youtube.com/';
        
    });
});

// Hàm kiểm tra số điện thoại Việt Nam
function isValidVietnamesePhoneNumber(phoneNumber) {
    const regex = /^(0[1-9]\d{8})$/; // Định dạng cho số điện thoại Việt Nam
    return regex.test(phoneNumber);
}