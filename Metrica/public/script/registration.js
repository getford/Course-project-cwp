function register() {
    $("#result").text("");
    let reg = {
        "login": $("#login").val(),
        "password": $("#password").val()
    };
    $.ajax({
        url: "http://localhost:3000/api/auth/register",
        type: "POST",
        async: true,
        dataType: "json",
        crossDomain: true,
        data: reg,
        success: (result) => {
            $("#result").text(JSON.stringify(result));
        },
        error: (err) => {
            $("#result").text(JSON.stringify(err));
        }
    });
}

$(document).ready(() => {
    $("#btnreg").click(register);
});

