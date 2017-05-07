function login() {
    $("#result").text("");
    let lgn = {
        "login": $("#login").val(),
        "password": $("#password").val()
    };
    $.ajax({
        url: "http://localhost:3000/api/auth/login",
        type: "POST",
        data: lgn,
        headers: {"Authorization": localStorage.getItem('x-access-token')},
        success: (result) => {
            $("#result").text(JSON.stringify(result));
        },
        error: (err) => {
            $("#result").text(JSON.stringify(err));
        }
    })
}

$(document).ready(() => {
    $("#btnlgn").click(login);
});