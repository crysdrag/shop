// tối màn hình
const menuIcon = document.getElementById('menu-icon');
const overlay = document.getElementById('overlay');
const mainMenu = document.querySelector('.main-menu');

// Khi nhấn vào menu, hiển thị overlay

menuIcon.addEventListener('mouseover', () => {
    overlay.style.display = 'block'; // Hiển thị nền tối
    mainMenu.style.display = 'block'; // Hiển thị menu
});

// Khi nhấn ra ngoài overlay hoặc menu, ẩn overlay và menu
document.addEventListener('mouseover', (event) => {
    if (!menuIcon.contains(event.target) && !mainMenu.contains(event.target)) {
        overlay.style.display = 'none'; // Ẩn nền tối
        mainMenu.style.display = 'none'; // Ẩn menu
    }
});

var mySwiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  }
});

window.onload = function() {
    var video = document.getElementById("myVideo");
    video.play();
};

var slide1 = new Swiper(".slide11", {
  spaceBetween: 10, // Khoảng cách giữa các ảnh (bạn có thể chỉnh lại số này)
  slidesPerView: 2, // Hiển thị đúng 2 ảnh cùng lúc
  slidesPerGroup: 1, // Chuyển 1 ảnh khi click
  loop: true,
  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next_1",
    prevEl: ".swiper-button-prev_1",
  },
});

var slide2 = new Swiper(".slide22", {
  spaceBetween: 10, // Khoảng cách giữa các ảnh (bạn có thể chỉnh lại số này)
  slidesPerView: 3, // Hiển thị đúng 2 ảnh cùng lúc
  slidesPerGroup: 1, // Chuyển 1 ảnh khi click
  loop: true,
  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next_3",
    prevEl: ".swiper-button-prev_3",
  },
});


function initializeSwiper() {
  // Xác định slidesPerView dựa trên kích thước màn hình
  const slidesPerView = window.innerWidth < 765 ? 2 : 
                        window.innerWidth < 1022 ? 3 : 
                        window.innerWidth < 1290 ? 4 : 5;

  return new Swiper(".SMP_hot", {
    spaceBetween: 12,
    slidesPerView: slidesPerView,
    slidesPerGroup: 1,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next_2",
      prevEl: ".swiper-button-prev_2",
    },
    on: {
      slideChange: function () {
        var swiper = this;
        if (swiper.activeIndex === swiper.slides.length - 1) {
          setTimeout(function() {
            swiper.slideTo(0);
          }, 500);
        }
      },
    },
  });
}

// Khởi tạo Swiper lần đầu
let SMP_hot = initializeSwiper();

// Lắng nghe sự kiện thay đổi kích thước cửa sổ và cập nhật Swiper nếu cần
window.addEventListener('resize', function() {
  const newSlidesPerView = window.innerWidth < 765 ? 2 : 
                           window.innerWidth < 1022 ? 3 : 
                           window.innerWidth < 1290 ? 4 : 5;

  // Kiểm tra nếu số slidesPerView cần thay đổi
  if (SMP_hot.params.slidesPerView !== newSlidesPerView) {
    SMP_hot.destroy(true, true); // Xóa instance hiện tại
    SMP_hot = initializeSwiper(); // Tạo instance mới với cấu hình mới
  }
});


function initializeIpadSwiper() {
  // Xác định slidesPerView dựa trên kích thước màn hình
  const slidesPerView = window.innerWidth < 765 ? 2 : 
                        window.innerWidth < 1022 ? 3 : 
                        window.innerWidth < 1290 ? 4 : 5;

  return new Swiper(".Ipad", {
    spaceBetween: 12,
    slidesPerView: slidesPerView,
    slidesPerGroup: 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next_4",
      prevEl: ".swiper-button-prev_4",
    },
    on: {
      slideChange: function () {
        var swiper = this;
        if (swiper.activeIndex === swiper.slides.length - 1) {
          setTimeout(function() {
            swiper.slideTo(0); // Quay về slide đầu tiên (S1)
          }, 500); // Thời gian ngắn để chuyển mượt
        }
      },
    },
  });
}

// Khởi tạo Swiper lần đầu cho phần Ipad
let Ipad = initializeIpadSwiper();

// Lắng nghe sự kiện thay đổi kích thước cửa sổ và cập nhật Swiper nếu cần
window.addEventListener('resize', function() {
  const newSlidesPerView = window.innerWidth < 765 ? 2 : 
                           window.innerWidth < 1022 ? 3 : 
                           window.innerWidth < 1290 ? 4 : 5;

  // Kiểm tra nếu số slidesPerView cần thay đổi
  if (Ipad.params.slidesPerView !== newSlidesPerView) {
    Ipad.destroy(true, true); // Xóa instance hiện tại
    Ipad = initializeIpadSwiper(); // Tạo instance mới với cấu hình mới
  }
});
