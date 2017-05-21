function login() {
    let lgn = {
        "login": $("#login").val(),
        "password": $("#password").val()
    };
    $.ajax({
        url: "http://" + window.location.host.toString() + "/api/auth/login",
        type: "POST",
        data: lgn,
        success: (result) => {
            if (result) {
                window.location.href = "../manage.html";
            }
        },
        error: (err) => {
            alert(err);
            window.location.href = "../login.html";
        }
    })
}

$(document).ready(() => {
    $("#btnlgn").click(login);
});