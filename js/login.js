$(document).ready(function(){
    $('.eye-toggle').click(function(){
        $(this).toggleClass('open');
        $(this).toggleClass(' fa-eye-slash fa-eye');
        if($(this).hasClass('open')){
            $(this).prev().attr('type','text')
        }else{
            $(this).prev().attr('type','password')
        }
    });
   
});

function register(event){
    event.preventDefault();
    let username = document.getElementById('user').value.trim();
    let password = document.getElementById('password').value.trim();
    let repassword = document.getElementById('repassword').value.trim();
    let mesage = document.getElementById('mesage');

    let chuthuong = /[a-z]/g;
    let chuhoa = /[A-Z]/g;
    let chuso = /[0-9]/g;

    mesage.style.color='red';

    if(!username || !password || !repassword){
        mesage.innerText="Nhập đầy đủ!";
        return;

    }
   
    if(password.length <8){
        mesage.innerText="mật khẩu phải dài hơn 8 kí tự";
        return;
    }
    if(!chuthuong.test(password)){
        mesage.innerText="mật khẩu phải có chữ thường";
        return;
    }
    if(!chuhoa.test(password)){
        mesage.innerText="mật khẩu phải có chữ hoa";
        return;
    }
    if(!chuso.test(password)){
        mesage.innerText="mật khẩu phải có chữ số";
        return;
    }
    if(password !== repassword){
        mesage.innerText="mật khẩu không khớp";
        return;
    }

    let user ={
        username: username,
        password: password,
    };
    let  users = localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):{};
    
    if(users[username]){
        mesage.innerText="tên đã tồn tại";
    }else{
        users[username] = user;
        localStorage.setItem('users',JSON.stringify(users));
        alert(`Đăng kí thành công`);
        window.location.href=`login.html`;
    }
    
}
function login(event){
    event.preventDefault();

    let username = document.getElementById('login-user').value.trim();
    let password = document.getElementById('login-password').value.trim();
    let logmesage = document.getElementById('login-mesage');

    if(!username || !password){
        logmesage.innerText='vui lòng điền đầy đủ !';
        logmesage.style.color='red';
        return;
    }

    let users = localStorage.getItem('users')? JSON.parse(localStorage.getItem('users')): {};
    let storeduser = users[username];

    
    if (!storeduser) {
        logmesage.innerText = 'Tài khoản không tồn tại';
        logmesage.style.color = 'red';
    }else if(storeduser.password === password){
        window.location.href='https://www.google.com/';
    }else{
        logmesage.innerText = 'tài khoản hoặc mật khẩu không đúng';
        logmesage.style.color='red';
    }

}

