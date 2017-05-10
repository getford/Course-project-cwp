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
    row.append($("<td>" + rowData.url + "</td>"));
}

/*Число переходов по страницам*/

function myGotoUrlCount(data) {
    $.ajax({
        url: "http://localhost:3000/api/gotourl/infourls",
        type: "POST",
        dataType: "json",
        data: {"url": data},
        success: (data) => {
            dt(data);
        }
    })
}

function dt(data) {
    for (let i = 0; i < data.length; i++) {
        dr(data[i]);
    }
}

function dr(rowData) {
    let row = $("<tr />");
    $("#mygotourltable").append(row);
    row.append($("<td>" + rowData.url + "</a></td>"));
    row.append($("<td>" + rowData.count + "</td>"));
    row.append($("<td>" + rowData.date + "</td>"));
}

$(document).ready(() => {
    $("#btnaddsite").click(addsite);
});

$(document).ready(() => {
    $("#btndeletesite").click(delsite);
});