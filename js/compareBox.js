// const phoneData = {}; //biến lưu dữ liệu đọc từ file
const listPhone = []; // mảng lưu những phone cần so sánh
const max = 3; //giới hạn phone so sánh

//tạo nút hiển thị số điện thoại nằm trong list so sánh và làm hiện những điện thoại đang trong danh sách
const isComparing = document.createElement('button');
isComparing.id = 'displayCompareBox';
isComparing.onclick = () => {
    document.getElementById('compareBox').style.display = 'flex';
}
isComparing.style.display = 'none';
function isComparingDisplay() {
    if (listPhone.length > 0) {
        isComparing.innerHTML = `
            So sánh (${listPhone.length})
        `
        isComparing.style.display = 'block';

    } else isComparing.style.display = 'none';
}

//tạo box để hiển thị những điện thoại muốn so sánh
const compare = document.createElement('div');
compare.innerHTML = `
    <div class="comparePhone" id="phoneBox1">
        <button class="compareBtn" id="compareBtn1">
            <i class="fa-solid fa-mobile big_i"></i>
            <label name="choosenPhone1">Choose device!</label>
        </button>
        <!---->
        <div class="choosenPhone" id="choosenBoxPhone1" style="display: none;">
            <button class="inner_close" id="removePhone1">
                <i class="fa-solid fa-x small_i"></i>
            </button>
            <img src="" alt="phone_img">
            <label for="" id="comparePhone1">Phone 1</label>
        </div>
    </div>

    <div class="comparePhone" id="phoneBox2">
        <button class="compareBtn" id="compareBtn2">
            <i class="fa-solid fa-mobile big_i"></i>
            <label name="choosenPhone2">Choose device!</label>
        </button>
        <!---->
        <div class="choosenPhone" id="choosenBoxPhone2" style="display: none;">
            <button class="inner_close" id="removePhone2">
                <i class="fa-solid fa-x small_i"></i>                
            </button>
            <img src="" alt="phone_img">
            <label for="" id="comparePhone2">Phone 2</label>
        </div>
    </div>

    <div class="comparePhone" id="phoneBox3">
        <button class="compareBtn" id="compareBtn3">
            <i class="fa-solid fa-mobile big_i"></i>
            <label name="choosenPhone3">Choose device!</label>
        </button>
        <!---->
        <div class="choosenPhone" id="choosenBoxPhone3" style="display: none;">
            <button class="inner_close" id="removePhone3">
                <i class="fa-solid fa-x small_i"></i>
            </button>
            <img src="" alt="phone_img">
            <label for="" id="comparePhone3">Phone 3</label>
        </div>
    </div>

    <div class="confirmBtnBox">
        <button id="confirmBtn" >So sánh!</button>
        <button id="removeListBtn" >Xóa toàn bộ sanh sách</button>
    </div>
    <div class="collapseBtn">
        <button id="collapseBtn" >Thu gọn</button>
    </div>

`
compare.classList.add('compareBox');
compare.id = 'compareBox';
compare.style.display = 'none';
document.getElementsByTagName('body')[0].appendChild(compare);
document.getElementsByTagName('body')[0].appendChild(isComparing);

//nút "xóa toàn bộ danh sách"
const check = document.getElementById('removeListBtn');
check.onclick = () => {

    listPhone.forEach(phone => {
        const oldCB = document.getElementById(`${phone.brand}_${phone.id}`);
        oldCB.checked = false;
    })
    listPhone.splice(0, listPhone.length);

    const toast = document.getElementById('toast');
    if (toast) removeToast(toast);

    renderChoosingPhone();
    isComparingDisplay();

    compare.style.display = 'none';
}

//nút "Thu gọn"
document.getElementById('collapseBtn').onclick = () => {
    compare.style.display = 'none';
}

//hiển thị thông báo khi số lượng phone trong danh sách so sánh vượt quá 3
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.id = 'toast';

    const text = document.createElement("span");
    text.innerText = message;

    const button = document.createElement("button");
    button.innerText = "OK";
    button.onclick = () => removeToast(toast);

    toast.appendChild(text);
    toast.appendChild(button);

    toast.style.bottom = `165px`

    const container = document.getElementsByTagName("body");
    container[0].appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);

    const autoHide = setTimeout(() => removeToast(toast), 2000);
    toast.dataset.autoHide;
}

//xóa thông báo khi bỏ 1 phone/ khi xóa toàn bộ danh sách/ khi bấm nút OK trên thông báo
function removeToast(toast) {
    toast.classList.remove("show");

    const autoHide = toast.dataset.autoHide;
    clearTimeout(autoHide);

    setTimeout(() => toast.remove(), 500);
}

//cập nhật dữ liệu vào list những phone muốn so sánh
function updateListPhone(brand, productId, checkbox) {
    const low = str => str.toLowerCase();
    const product = phones[brand].find(obj => obj.id === productId);

    if (checkbox.checked) {
        if (listPhone.length >= max) {
            showToast(`Bạn chỉ được chọn tối đa 3 đối tượng!`)
            checkbox.checked = false;
        } else {
            listPhone.push(product);

            isComparingDisplay();
            compareBox.style.display = 'flex';
            renderChoosingPhone();
        }
    } else {
        deleteProduct(product);
    }
}

//xóa phone khỏi list muốn so sánh
function deleteProduct(product) {
    const index = listPhone.indexOf(product);

    if (index > -1) {
        listPhone.splice(index, 1);

        renderChoosingPhone();
        isComparingDisplay();
    }

    const toast = document.getElementById('toast');
    if (toast) removeToast(toast);

    if (listPhone.length === 0) {
        compareBox.style.display = 'none';
    }
}

//render những phone muốn so sánh
function renderChoosingPhone() {
    for (let i = 0; i < 3; i++) {
        document.getElementById(`compareBtn${i + 1}`).style.display = 'flex';
        document.getElementById(`choosenBoxPhone${i + 1}`).style.display = 'none';
    }
    
    listPhone.forEach((phone, index) => {
        const divToHide = document.getElementById(`compareBtn${index + 1}`);
        divToHide.style.display = 'none';

        const divToShow = document.getElementById(`choosenBoxPhone${index + 1}`);
        divToShow.style.display = 'flex';

        divToShow.children[0].onclick = () => {
            deleteProduct(phone);

            const oldCB = document.getElementById(`${phone.brand}_${phone.id}`);
            if(oldCB) oldCB.checked = false;
        };

        divToShow.children[1].src = phone.image;
        divToShow.children[2].textContent = phone.model;
    })

    if (listPhone.length <= 1) {
        document.getElementById('confirmBtn').disabled = true;

    } else document.getElementById('confirmBtn').disabled = false;
}

//nạp dữ liệu về list vào session storage để thực hiện việc render dữ liệu
const compareBtn = document.getElementById('confirmBtn');
compareBtn.onclick = () => {
    sessionStorage.setItem('listPhone', JSON.stringify(listPhone));
    window.open('shop/comparePhone.html', '_blank');
    // renderCompareData();
}
////////bên này là file comparePhone.html dùng để hiển thị những phone được confirm là so sánh

//hiển thị list được confirm
function renderCompareData(listPhone) {
    const table = document.getElementById('table');
    const appleIcon = '<i class="fa-brands fa-apple"></i>';
    const androidIcon = '<i class="fa-brands fa-android"></i>'

    //clear toàn bộ các cell trong table trước khi render dữ liệu
    for (let j = 1; j < 4; j++) {
        const mainCell = table.rows[0].cells[j];
        const div = mainCell.children[0];
        div.innerHTML = "";
        for (let i = 2; i < 20; i++) {
            table.rows[i].cells[j].textContent = "";
            table.rows[i].cells[j].id = "";
        }
    }

    //đọc dữ liệu từng phone và render theo cột
    listPhone.forEach((phone, index) => {
        const div = document.getElementById(`phone${index + 1}`);
        const priceNum = phone.price.toLocaleString('vi-VN');

        //hàng đầu tiên hiện ảnh, model, giá tiền, màu sắc
        div.innerHTML = `
            <img src="${phone.image}" alt="${phone.model} ${phone.storage}" class="imgPhone">
            <span class="phoneName">${phone.model} ${phone.storage}</span>
            <span class="phonePrice">${priceNum} VNĐ</span>
            <span class="phoneColor">Màu sắc: ${phone.color}</span>
            <button class="removeBtn" id="removeBtn${index + 1}">
                <i class="fa-solid fa-circle-xmark i_nor"></i>
                <i class="fa-regular fa-circle-xmark i_hover"></i>
            </button>
        `
        document.getElementById(`removeBtn${index + 1}`).onclick = () => {
            listPhone.splice(index, 1);
            renderCompareData(listPhone);
        }
        for (let i = 2; i < 30; i++) {
            if (table.rows[i]) {
                let name = table.rows[i].getAttribute('name');

                const cell = table.rows[i].cells[index + 1];
                if (phone[name] === true) {
                    cell.textContent = 'Có';
                    cell.style.color = '#485fc7';
                }
                else if (phone[name] === false) {
                    cell.textContent = 'Không';
                    cell.style.color = 'red';
                }
                else cell.textContent = phone[name];

                if (name === 'operatingSystem') {
                    if (phone.brand === 'apple') {
                        cell.innerHTML = appleIcon + ' ' + cell.innerHTML;
                    }
                    else cell.innerHTML = androidIcon + ' ' + cell.innerHTML;
                }
                cell.id = name + "_" + phone.brand + "_" + phone.id;
            }
        }
    })
}


if (window.location.pathname.endsWith('comparePhone.html')) {
    const listPhone = JSON.parse(sessionStorage.getItem('listPhone'));
    renderCompareData(listPhone);

    // window.addEventListener('pageshow', () => {
    //     renderCompareData(listPhone);
    // })

    // document.addEventListener('DOMContentLoaded', () => {
    //     renderCompareData(listPhone);
    // })
}
