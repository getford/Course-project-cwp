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
            $("#errlogin").text(JSON.stringify(err));
        }
    })
}

$(document).ready(() => {
    $("#btnlgn").click(login);
});