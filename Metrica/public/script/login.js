function login() {
    let lgn = {
        "login": $("#login").val(),
        "password": $("#password").val()
    };
    console.log(JSON.stringify(lgn));
    $.ajax({
        url: "http://localhost:3000/api/auth/login",
        type: "POST",
        data: lgn,
        //  headers: {"Authorization": localStorage.getItem('x-access-token')},
        success: (result) => {
            if (result) {
                window.location.href = "../manage.html";
            }
        },
        error: (err) => {
            $("#errlogin").text(JSON.stringify(err));
        }
    })
}

$("#btnlgn").click(login);