function register() {
    let reg = {
        "login": $("#login").val(),
        "password": $("#password").val()
    };
    $.ajax({
        url: "http://" + window.location.host.toString() + "/api/auth/register",
        type: "POST",
        dataType: "json",
        data: reg,
        success: (result) => {
            window.location.href = "/login.html";
            alert(JSON.stringify({success: "Registration complete!"}));
        },
        error: (err) => {
            alert(JSON.stringify({error: "Please, try again."}));
        }
    });
}

$(document).ready(() => {
    $("#btnreg").click(register);
});

