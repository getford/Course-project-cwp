function getlogin() {
    $.ajax({
        url: "http://localhost:3000/api/auth/getlogin",
        type: "GET",
        headers: {"Authorization": localStorage.getItem('x-access-token')},
        success: (result) => {
            if (result) {
                $('#userLogin').text(result);
                return result;
            }
        },
        error: (err) => {
            return err;
        }
    })
}

function addsite() {
    $.ajax({
        url: "http://localhost:3000/api/site/addsite",
        type: "POST",
        dataType: "json",
        crossDomain: true,
        data: {"url": $("#siteurl").val()},
        headers: localStorage.getItem('x-access-token'),
        success: (result) => {
            $('#messageAddSite').text("Сайт " + $("#siteurl").val() + " успешно добавлен.");
            return result;
        },
        error: (err) => {
            $("#result").text(JSON.stringify(err));
        }
    })
}

function delsite() {
    $.ajax({
        url: "http://localhost:3000/api/site/delsite",
        type: "DELETE",
        dataType: "json",
        crossDomain: true,
        data: {"url": $("#siteurl").val()},
        headers: localStorage.getItem('x-access-token'),
        success: (result) => {
            $("#result").text(JSON.stringify(result));
        },
        error: (err) => {
            $("#result").text(JSON.stringify(err));
        }
    })
}

/*Сайты в табцицу*/
function mySites() {
    $.ajax({
        url: "http://localhost:3000/api/site/mysites",
        type: "GET",
        dataType: "json",
        headers: {"Authorization": localStorage.getItem('x-access-token')},
        success: (data) => {
            drawTable(data);
        }
    })
}

function drawTable(data) {
    for (let i = 0; i < data.length; i++) {
        drawRow(data[i]);
    }
}

function drawRow(rowData) {
    let row = $("<tr />");
    $("#mysitetable").append(row);
    row.append($("<td id='urlClick'>" + "<span onclick=\"myGotoUrlCount('" + rowData.url + "\')\">" + rowData.url + "</span></td>"));
}

function myGotoUrlCount() {

}


$(document).ready(() => {
    $("#btnaddsite").click(addsite);
});

$(document).ready(() => {
    $("#btndeletesite").click(delsite);
});


/*

 */

/*
 function myGotoUrlCount() {
 let json = JSON.stringify({
 url: "qwe.com"
 });

 $.ajax({
 url: "http://localhost:3000/api/gotourl/infourls",
 type: "POST",
 dataType: "json",
 data: json,
 success: (result) => {
 console.log(JSON.stringify(result) + "\t\t\t\twdadawdawd");
 if (result) {
 let a = JSON.stringify(result);
 console.log(a + "\t\t\t\t\taaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
 Morris.Bar({
 element: 'bar-example',
 data: a,
 xkey: 'url',
 ykeys: ['count'],
 labels: ['Count']
 });
 console.log(JSON.stringify(result) + "\t\t\t\twdadawdawd");
 }
 }
 })
 }
 */