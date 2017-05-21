function register() {
    let reg = {
        "login": $("#login").val(),
        "password": $("#password").val()
    };
    $.ajax({
        url: "http://" + window.location.host.toString() + "/api/auth/register",
        type: "POST",
        data: reg,
        success: (result) => {
            if (result) {
                window.location.href = "../login.html";
                //alert(JSON.stringify({success: "Registration complete!"}));
            }
        },
        error: (err) => {
           // alert(JSON.stringify({error: "Please, try again."}));
            window.location.href = "../registration.html";
        }
    });
}

$(document).ready(() => {
    $("#btnreg").click(register);
});

