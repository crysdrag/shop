const phoneData = {}; //biến lưu dữ liệu đọc từ file
const listPhone = []; // mảng lưu những phone cần so sánh
const max = 3; //giới hạn phone so sánh

//cập nhật dữ liệu vào list những phone muốn so sánh
function updateListPhone(brand, productId, checkbox) {
    const low = str => str.toLowerCase();
    const product = phones[brand].find(obj => obj.id === productId);
    if (checkbox.checked) {
        if (listPhone.length >= max) {
            alert(`Bạn chỉ được chọn tối đa ${max} đối tượng.`);
            checkbox.checked = false;
        } else {
            listPhone.push(product);
            compareBox.style.display = 'flex';
            console.log(listPhone);
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
        // renderCompareData();
        console.log(listPhone);
    }
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
            oldCB.checked = false;
        };

        divToShow.children[1].src = phone.image;
        divToShow.children[2].textContent = phone.model;
    })

    if(listPhone.length <= 1) {
        document.getElementById('confirmBtn').disabled = true;
    }else document.getElementById('confirmBtn').disabled = false;
}

//nạp dữ liệu về list vào session storage để thực hiện việc render dữ liệu
const compareBtn = document.getElementById('confirmBtn');
compareBtn.onclick = () => {
    sessionStorage.setItem('listPhone', JSON.stringify(listPhone));
    window.open('../comparePhone.html', '_blank');
    // renderCompareData();
}
////////bên này là file comparePhone.html dùng để hiển thị những phone được confirm là so sánh

//hiển thị list được confirm
function renderCompareData() {
    const listPhone = JSON.parse(sessionStorage.getItem('listPhone'));
    const table = document.getElementById('table');

    for (let j = 1; j < 4; j++) {
        const mainCell = table.rows[0].cells[j];
        const div = mainCell.children[0];
        div.innerHTML = "";
        for (let i = 2; i < 20; i++) {
            table.rows[i].cells[j].textContent = "";
            table.rows[i].cells[j].id = "";
            // console.log('check');
        }
    }

    listPhone.forEach((phone, index) => {
        const mainCell = table.rows[0].cells[index + 1];
        const div = mainCell.children[0];
        const btn = document.createElement('button');
        btn.innerHTML = `
            <i class="fa-solid fa-circle-xmark i_nor"></i>
            <i class="fa-regular fa-circle-xmark i_hover"></i>
        `
        btn.classList.add('removeBtn');
        // const checkbox = document.createElement("input");
        // checkbox.type = "checkbox";
        // checkbox.checked = true;
        // checkbox.onclick = () => {
        //     deleteProduct(phone);
        // };
        // checkbox.classList.add('removeBtn');
        div.appendChild(btn);

        for (let i = 2; i < 20; i++) {
            if (table.rows[i]) {
                let name = table.rows[i].getAttribute('name');
                const cell = table.rows[i].cells[index + 1];
                // console.log(name);
                cell.textContent = phone[name];
                cell.id = name + "_" + phone.brand + "_" + phone.id;
            }
        }
    })
}

if(window.location.pathname.endsWith('comparePhone.html')) {
    renderCompareData();
    document.addEventListener('DOMContentLoaded', () => {
        const table = document.getElementById('table');
        table.focus();
    })
}