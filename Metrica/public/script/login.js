function login() {
    let lgn = {
        "login": $("#login").val(),
        "password": $("#password").val()
    };
    $.ajax({
        url: "http://localhost:3000/api/auth/login",
        type: "POST",
        data: lgn,
      //  headers: {"Authorization": localStorage.getItem('x-access-token')},
        success: (result) => {
            alert(JSON.stringify(result));
            if (result) {
                //$("#result").text(JSON.stringify(result));
                window.location.href = "../manage.html";
            }
        },
        error: (err) => {
            $("#errlogin").text(JSON.stringify(err));
        }
    })
}

$(document).ready(() => {
    $("#btnlgn").click(login);
});