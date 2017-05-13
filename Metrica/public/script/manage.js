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
            bleat = xhr.responseText.toString();
            console.log(bleat + "\tbleat");
            return xhr.responseText;

        }
    };


    /*
     $.ajax({
     url: "http://localhost:3000/api/gotourl/infourls",
     async: false,
     type: "POST",
     dataType: "json",
     data: {"url": "qwe.com"},
     success: (result) => {
     alert(result);
     $("#tmpData").text(result);
     }
     });*/


}
let bleat = '';
/*Графики число переходов по дням*/
function graph() {
    let x = myGotoUrlCount();
    console.log(bleat + "\thelloy bleat'");

    google.load("visualization", "1", {packages: ["corechart"]});
    google.setOnLoadCallback(drawChart);
    function drawChart() {
        let data = google.visualization.arrayToDataTable([
            ['url', 'count'],
            //  ["/AWD", 6], ["/qqq", 3], ["/q", 13], ["/q", 3]
            //bleat
        ]);
        let options = {
            title: 'Статистика переходов за день',
            hAxis: {title: 'URL'},
            vAxis: {title: 'Число переходов'}
        };
        let chart = new google.visualization.ColumnChart(document.getElementById('oil'));
        chart.draw(data, options);
    }
}

$(document).ready(() => {
    $("#btnaddsite").click(addsite);
});

$(document).ready(() => {
    $("#btndeletesite").click(delsite);
});

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