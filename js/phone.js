        // Lấy tất cả các div để nhấn và các div nội dung
        const toggleDivs = document.querySelectorAll('.toggle');
        const contentDivs = document.querySelectorAll('.content-div');

        // Thêm sự kiện click cho mỗi div để nhấn
        toggleDivs.forEach(toggleDiv => {
            toggleDiv.addEventListener('click', function() {
                // Ẩn tất cả các div nội dung
                contentDivs.forEach(contentDiv => {
                    contentDiv.style.display = 'none';
                });
                // Xóa border đỏ của tất cả các div để nhấn
                toggleDivs.forEach(div => {
                    div.style.border = 'none';
                    div.querySelector('span').style.color = 'black';
                    div.style.borderBottom = 'none';
                });

                // Thêm border đỏ cho div hiện tại
                toggleDiv.style.border = 'none';
                toggleDiv.querySelector('span').style.color = 'red';
                toggleDiv.style.borderBottom = '2px solid red';

                // Lấy ID của div cần hiển thị từ thuộc tính data-target
                const targetId = toggleDiv.getAttribute('data-target');
                
                // Hiển thị div tương ứng
                document.getElementById(targetId).style.display = 'block';
            });
        });

        // Lấy tất cả các radio input và các phần tử nội dung
        const tabs = document.querySelectorAll('input[name="tab"]');
        const contents = document.querySelectorAll('.filter_contain');

        // Gắn sự kiện click cho từng radio button
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                // Kiểm tra nếu tab đang mở, thì đóng lại nó
                if (contents[index].style.display === 'block') {
                    contents[index].style.display = 'none';
                    tab.checked = false;
                } else {
                    // Đóng tất cả nội dung
                    contents.forEach(content => content.style.display = 'none');
                    // Hiển thị nội dung tương ứng với tab đã chọn
                    contents[index].style.display = 'block';
                }
            });
        });

        var slideQC = new Swiper(".slideQC", {
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });

        var Khuyen_Mai = new Swiper(".Khuyen_Mai", {
            slidesPerView: 5,
            spaceBetween: 12,
            slidesPerGroup: 1,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".button-next",
                prevEl: ".button-prev",
            },
        });

        // Chọn tất cả các nút "Đóng" có class là .close-btn
        document.querySelectorAll('.close-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Tìm phần tử cha gần nhất có class .filter_contain và ẩn nó
                this.closest('.filter_contain').style.display = 'none';
            });
        });

        