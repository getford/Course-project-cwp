function register() {
    let reg = {
        "login": $("#login").val(),
        "password": $("#password").val()
    };
    $.ajax({
        url: "http://" + window.location.host.toString() + "/api/auth/register",
        type: "POST",
        // async: true,
        dataType: "json",
        // crossDomain: true,
        data: reg,
        success: (result) => {
            window.location.href = "/login.html";
            alert(JSON.stringify({success: "Registration complete!"}));
        },
        error: (err) => {
            alert(JSON.stringify(err));
        }
    });
}

$(document).ready(() => {
    $("#btnreg").click(register);
});

