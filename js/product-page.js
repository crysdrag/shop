document.addEventListener('DOMContentLoaded', function() {
  clearStarRating();
});
//---------------------slider-----------------------
let index=0;
const imgNumber=document.querySelectorAll('.slider_left_top img');
const rightbtn=document.querySelector('.fa-chevron-right');
const leftbtn=document.querySelector('.fa-chevron-left');
rightbtn.addEventListener('click', function(){
    if(index > imgNumber.length-1){
        index = 0;
    }  
    removeActive();
    index+=1;
    if(index >= imgNumber.length) index = 0;
    imgNumberLi[index].classList.add("active");
    document.querySelector('.slider_left_top').style.right=100*index+"%";
    })
leftbtn.addEventListener('click', function(){
    if(index < 0){
        index = imgNumber.length-1;
    } 
    removeActive();
    index-=1;
    if(index < 0) index = imgNumber.length-1;
    imgNumberLi[index].classList.add("active");
    document.querySelector('.slider_left_top').style.right=100*index+"%";
})
const imgNumberLi=document.querySelectorAll('.slider_left_bottom div');
let unactive= document.querySelector('.active');
index
imgNumberLi.forEach(function(image, index){
  //image chính là các img 
  // document.querySelector('.slider_content_left_top').style.right=100*index+"%";

  image.addEventListener("click", function(){
    removeActive();
    document.querySelector('.slider_left_top').style.right=100*index+"%";
    image.classList.add("active");
  })
})
function removeActive(){
  let unactive= document.querySelector('.active');
    unactive.classList.remove("active");
}
//------------------auto_slider--------------
function imgAuto(){
    index =index+1;
    if(index > imgNumber.length-1){
      index = 0;
    }
    // console.log(index);
    removeActive();
    imgNumberLi[index].classList.add("active");


    document.querySelector('.slider_left_top').style.right=100*index+"%";
  }
  setInterval(imgAuto,5000)// tinh theo ms
  
//---linh tinh---
 let rong= imgNumber[0].offsetWidth;
 document.querySelector('.slider_left_top_btn').style.width = `${rong}px`
 //------------review-----------------------
 const reviewButton = document.querySelector('#review');
 const closeButton = document.querySelector('#xclose');
 const formElement = document.querySelector('.review');
   const videoReview = document.querySelector('#video_review');
  const videoForm = document.querySelector('.video');
  reviewButton.addEventListener("click", function() {
    // Toggle the display of the form element
    // formElement.style.display = formElement.style.display === "flex" ? "none" : "flex"; nếu để như này thì tính cả trường hợp mình click vào cái container con nó sẽ tự tắt
       videoForm.style.display = "none";
       formElement.style.display = "flex";
 
  });
  closeButton.addEventListener("click", ()=>{
    formElement.style.display = "none";
  })
  //-------------video_review----------

  videoReview.addEventListener("click", ()=>{ 
     formElement.style.display = "none";
    videoForm.style.display = videoForm.style.display ==='flex' ? 'none' : 'flex';
  });

  const BinhLuan=document.querySelector('#BinhLuan');
  const BinhLuanForm=document.querySelector('.comments');
  BinhLuan.addEventListener("click", ()=>{
    BinhLuanForm.style.display= BinhLuanForm.style.display ==='block' ? 'none' : 'block';
  })
//--------------------comment----------------------------
const showHideBtn = document.querySelector('.show-hide');
const commentWraper = document.querySelector('.comment-wraper');
// commentWraper.style.display = "none";
showHideBtn.addEventListener("click", ToggleComments());
// showHideBtn.addEventListener("keydown", HandleKeyDown());
function ToggleComments(){
  let showHideText = showHideBtn.textContent;
  if(showHideText === "..."){
    showHideBtn.textContent = "ẩn bình luận";
    commentWraper.style.display = "block";
    showHideBtn.setAttribute('aria-expaned','true');
  }
  else {
    showHideBtn.textContent = "...";
    commentWraper.style.display = "none";
    showHideBtn.setAttribute('aria-expaned','false');
  }
}
//-------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#submit-btn');
  const commentList = document.getElementById('comment-list');
  const starRating = document.querySelector('.star-rating-comment');
  const stars = starRating.querySelectorAll('input[type="radio"]');

  // Lấy dữ liệu từ localStorage
  let comments = JSON.parse(localStorage.getItem('comments')) || [];

  // Hàm hiển thị comment
  function displayComments() {
      commentList.innerHTML = '';
      comments.forEach((comment, index) => {
          const commentElement = document.createElement('li');
          commentElement.className = 'comment';
          commentElement.innerHTML = `
              <p>${comment.name}</p>
              <p class="comment-stars">${getStarRating(comment.rating)}</p>
              <p>${comment.comment}</p>
          `;
          commentList.appendChild(commentElement);
      });
  }

  // Hàm tạo chuỗi sao dựa trên rating
  function getStarRating(rating) {
      return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  // Hàm lưu comment vào localStorage
  function saveComment(name, rating, comment) {
      comments.push({ name, rating, comment });
      localStorage.setItem('comments', JSON.stringify(comments));
  }

  // Hiển thị comment khi trang tải
  displayComments();

  // Xử lý sự kiện khi chọn sao
  stars.forEach(star => {
      star.addEventListener('change', function() {
          const rating = this.value;
          console.log(`Đã chọn ${rating} sao cho bình luận`);
      });
  });

  // Thêm sự kiện cho form
  form.addEventListener("click", (e) => {
      e.preventDefault();

      // Lấy dữ liệu từ form
      const name = document.getElementById('name').value;
      const ratingInput = document.querySelector('input[name="rating-comment"]:checked');
      const comment = document.getElementById('comment').value;

      if (!name || !ratingInput || !comment) {
          alert('Vui lòng điền đầy đủ thông tin và chọn số sao.');
          return;
      }

      // Lưu comment vào localStorage
      const rating = parseInt(ratingInput.value);
      saveComment(name, rating, comment);

      // Hiển thị comment
      displayComments();

      // Reset form
      document.querySelector('.comment-form').reset();
      clearStarRating();
      // Cuộn xuống phần bình luận mới nhất
      // window.scrollTo(0, document.body.scrollHeight);
  });

  function clearStarRating() {
      stars.forEach(star => star.checked = false);
  }

  // Khởi tạo dữ liệu mẫu nếu chưa có
  if (comments.length === 0) {
      localStorage.setItem('comments', JSON.stringify([
          {
            "name": "admin",
            "rating": 5, 
            "comment": "Shop uy tín top 1 sever trái đất. Các bạn có ý kiến gì vui lòng nhập zô đây nhé!"
          }
      ]));
      comments = JSON.parse(localStorage.getItem('comments'));
      displayComments();
  }

  // Thêm chức năng sắp xếp bình luận
  function sortComments(order) {
      comments.sort((a, b) => {
          if (order === 'asc') {
              return a.rating - b.rating;
          } else {
              return b.rating - a.rating;
          }
      });
      displayComments();
  }

  // Thêm nút sắp xếp vào HTML
  const sortContainer = document.createElement('div');
  sortContainer.innerHTML = `
      <button id="sortAsc">Sắp xếp tăng dần</button>
      <button id="sortDesc">Sắp xếp giảm dần</button>
  `;
  commentList.parentNode.insertBefore(sortContainer, commentList);

  document.getElementById('sortAsc').addEventListener('click', () => sortComments('asc'));
  document.getElementById('sortDesc').addEventListener('click', () => sortComments('desc'));

  // Thêm chức năng tính trung bình đánh giá
  function calculateAverageRating() {
      if (comments.length === 0) return 0;
      const sum = comments.reduce((acc, comment) => acc + comment.rating, 0);
      return (sum / comments.length).toFixed(1);
  }
  
  // Hiển thị trung bình đánh giá
  function displayAverageRating() {
      const averageRating = calculateAverageRating();
      
      // Xóa phần tử hiển thị đánh giá trung bình cũ (nếu có)
      const oldRatingDisplay = document.getElementById('average-rating-display');
      if (oldRatingDisplay) {
          oldRatingDisplay.remove();
      }
      
      // Tạo phần tử mới để hiển thị đánh giá trung bình
      const ratingDisplay = document.createElement('div');
      ratingDisplay.id = 'average-rating-display';
      ratingDisplay.className = 'average-rating';
      ratingDisplay.innerHTML = `Đánh giá trung bình: ${averageRating} sao`;
      
      // Chèn phần tử mới vào trước danh sách bình luận
      commentList.parentNode.insertBefore(ratingDisplay, commentList);
  }
  
  // Hiển thị đánh giá trung bình ban đầu
  displayAverageRating();
  
  // Cập nhật hiển thị khi có bình luận mới
  const originalSaveComment = saveComment;
  saveComment = function(name, rating, comment) {
      originalSaveComment(name, rating, comment);
      displayAverageRating();
}
});


/////
(function (window) {
  "use strict"
  
  var animateIcon = function (element) {
    var img = new Image();
    img.onload = function() {
      img.className = element.className + ' icon_animate_effect';
      document.body.appendChild(img);
      
      setTimeout(function() {
        if (img.parentNode) {
          img.parentNode.removeChild(img);
        }
      }, 2620);
    };
    
    img.onerror = function() {
      console.error('Failed to load image:', this.src);
    };
    
    img.src = element.dataset.src;
  }

  var startAnimation = function(element) {
    if (element.dataset.src) {
      var animate = function() {
        animateIcon(element);
      };

      animate();
      setInterval(animate, element.classList.contains('ghost') ? 40000 : 60000);
    } else {
      console.error('No data-src attribute found on element:', element);
    }
  }

  var init = function () {
    var icons = document.getElementsByClassName('icon_animate');
    for (var i = 0; i < icons.length; i++) {
      startAnimation(icons[i]);
    }
  };

  window.addEventListener('load', init);

})(window);
//hieu ung fade-in
window.addEventListener('scroll', () => {
  document.querySelectorAll('.fade-slide').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) {
          el.classList.add('visible');
      }
  });
});
//hieu ung cuon len dau trang
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
    scrollToTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
});
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Shopping cart functionality
document.addEventListener('DOMContentLoaded', function() {
  const cartButton = document.querySelector('.cart-button');
  const notification = document.createElement('div');
  notification.className = 'notification'; // Thêm class cho thông báo
  document.body.appendChild(notification); // Thêm thông báo vào body

  cartButton.addEventListener('click', function() {
      // Get current product info
      // const productName = document.querySelector('.product-name').textContent;
      // const productPrice = document.querySelector('#current').textContent;

      // // Create cart item object
      // const cartItem = {
      //     name: productName,
      //     price: productPrice,
      //     quantity: 1
      // };

      // // Get existing cart from localStorage
      // let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // // Check if item already exists in cart
      // const existingItemIndex = cart.findIndex(item => item.name === cartItem.name);

      // if (existingItemIndex > -1) {
      //     // Update quantity if item exists
      //     cart[existingItemIndex].quantity += 1;
      // } else {
      //     // Add new item if it doesn't exist
      //     cart.push(cartItem);
      // }

      // // Save updated cart to localStorage
      // localStorage.setItem('cart', JSON.stringify(cart));

      // Show confirmation message
      notification.textContent = 'Sản phẩm đã được thêm vào giỏ hàng!';
      notification.classList.add('show'); // Thêm class để hiển thị thông báo

      // Tự động ẩn thông báo sau 3 giây
      setTimeout(() => {
          notification.classList.remove('show');
      }, 3000);
  });
});



document.addEventListener("DOMContentLoaded", function() {
  const params = new URLSearchParams(window.location.search);
  const brands = params.get('brand');
  const id = params.get('id');
  function convertBrandToLowerCase(brands) {
      return brands.toLowerCase();
  }
  const lowerCaseBrand = convertBrandToLowerCase(brands);
  const brand = lowerCaseBrand;

  fetch('phone.json')
      .then(response => response.json())
      .then(data => {
          const productData = data[brand].find(item => item.id === id);
          const originalVideoUrl = productData.video; // URL video gốc

          // // Hàm để chuyển đổi URL
          function convertToEmbedUrl(originalUrl) {
              const videoId = originalUrl.split('v=')[1].split('&')[0]; // Lấy ID video
              return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`; // Tạo URL "embed"
          }
          const embedUrl = convertToEmbedUrl(originalVideoUrl);
          console.log(embedUrl);

          if (productData) {
              // Cập nhật thông tin sản phẩm trong HTML
              // document.querySelector('.video iframe').src = embedUrl;
              // document.querySelector('.name').textContent = `${productData.model} | Chính hãng VN/A`;
              // document.querySelector('.slider_left_top img').src = productData.image;
              // document.querySelector('.price').textContent = `${productData.priceSale.toLocaleString()}đ`;
              // document.querySelector('.original-price').textContent = `${productData.price.toLocaleString()}đ`;
              // document.querySelector('.discount').textContent = `-${productData.sale}%`;
              // document.querySelector('.batteryCapacity').textContent = productData.batteryCapacity;
              // ... thêm các thuộc tính khác tương tự
              document.querySelector('.price').textContent = `${productData.priceSale.toLocaleString()}đ`;
              document.querySelector('.original-price').textContent = `${productData.price.toLocaleString()}đ`;
              document.querySelector('.name2').textContent = `${productData.model}`;
              document.querySelector('.name').textContent = `${productData.model} | Chính hãng VN/A`;
              document.querySelector('.brand').textContent = `${productData.brand}`;
              document.querySelector('.ram').textContent = `${productData.ram}`;
              document.querySelector('.storage').textContent = `${productData.storage}`;
              document.querySelector('.batteryCapacity').textContent = `${productData.batteryCapacity}`;
              document.querySelector('.wired').textContent = `${productData.wired}`;
              document.querySelector('.wireless').textContent = `${productData.wireless}`;
              document.querySelector('.cameraSpecs').textContent = `${productData.cameraSpecs}`;
              document.querySelector('.network').textContent = `${productData.network}`;
              document.querySelector('.wifi').textContent = `${productData.wifi}`;
              document.querySelector('.bluetooth').textContent = `${productData.bluetooth}`;
              document.querySelector('.processor').textContent = `${productData.processor}`;
              document.querySelector('.condition').textContent = `${productData.condition}`;
              document.querySelector('.waterResistance').textContent = `${productData.waterResistance}`;
              document.querySelector('.screenType').textContent = `${productData.screenType}`;
              document.querySelector('.bioSecurity').textContent = `${productData.bioSecurity}`;
              document.querySelector('.dimensions').textContent = `${productData.dimensions}`;
              document.querySelector('.weight').textContent = `${productData.weight}`;
              document.querySelector('.releaseDate').textContent = `${productData.releaseDate}`;
              document.querySelector('.stockStatus').textContent = `${productData.stockStatus}`;
              document.querySelector('.simType').textContent = `${productData.simType.join(", ")}`;
              document.querySelector('.chargingPort').textContent = `${productData.chargingPort}`;
              document.querySelector('.refreshRate').textContent = `${productData.refreshRate}`;
              document.querySelector('.audioFeatures').textContent = `${productData.audioFeatures}`;
              document.querySelector('.buildMaterial').textContent = `${productData.buildMaterial}`;
              document.querySelector('.video iframe').src = embedUrl;
              document.querySelector('.image').src = productData.image;
              document.querySelector('.imageGallery').innerHTML = productData.imageGallery.map(img => `<img src="${img}">`).join("");
          } else {
              console.error('Product not found');
          }
      })
      .catch(error => console.error('Error fetching JSON:', error));
});

