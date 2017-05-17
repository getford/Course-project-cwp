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

/*Замена символов в строке*/
String.prototype.replaceAll = function (search, replace) {
    return this.split(search).join(replace);
}

let text = '';

function myGotoUrlCount() {
    let json = JSON.stringify({
        url: "qwe.com"
    });

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/api/gotourl/infourls"); // async=true
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);
    xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            text = xhr.responseText.toString();
            console.log(text + "\ttext");
            return xhr.responseText;
        }
    };
}

/*Графики число переходов по дням*/
function graph() {
    myGotoUrlCount();
    google.load("visualization", "1", { packages: ["corechart"] });
    google.setOnLoadCallback(drawChart);
    function drawChart() {
        // let l = text.substring(1, text.length - 1);
        // let q = l.replaceAll('\\', '');
        // console.log(text + "\t\t\t\t\tawDcawbidiawucoiawcw");
        // console.log(q + "\t\t\t\tdjchawbjcawb78bc2y873282n");
        // console.log(q);
        //
        // let arr = [];
        // arr = q;

       // console.log(arr + "\t\t\t arr");
        let chart = new google.visualization.ColumnChart(document.getElementById('oil'));
        let data = google.visualization.arrayToDataTable([
            ['url', 'count'],
            ["/AWD", 6], ["/qqq", 3], ["/qqq", 25], ["/q", 15], ["/qwcd", 2], ["/qwc324432cd", 3]
        ]);

        let options = {
            title: 'Статистика переходов за день',
            hAxis: { title: 'URL' },
            vAxis: { title: 'Число переходов' }
        };
        chart.draw(data, options);
    }
}

$(document).ready(() => {
    $("#btnaddsite").click(addsite);
});

$(document).ready(() => {
    $("#btndeletesite").click(delsite);
});

// $(document).ready(() => {
//     $("#urlClick").click(myGotoUrlCount);
// });

$("#oil").load(graph());

/*
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
 row.append($("<td>" + rowData.url + "</td>"));
 row.append($("<td>" + rowData.count + "</td>"));
 row.append($("<td>" + rowData.date + "</td>"));
 }
 */