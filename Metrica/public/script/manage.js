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
            $('#').text("Сайт " + $("#siteurl").val() + " успешно добавлен.");
            location.reload();
            return result;
        },
        error: (err) => {
            $("#").text(JSON.stringify(err));
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
            $("#").text(JSON.stringify(result));
            location.reload();
        },
        error: (err) => {
            $("#").text(JSON.stringify(err));
        }
    })

}

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

function myGotoUrlCount(dataUrl) {
    switch ($("#graphType").val()) {
        case 'donut':
            if ($("#thisDate").attr('checked', 'checked')) {
                let jsonData = JSON.stringify({url: dataUrl});
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://localhost:3000/api/gotourl/fordonutdlldate"); // async=true
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhr.send(jsonData);
                xhr.onload = function (e) {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let graphData = JSON.parse(xhr.responseText);
                        new Morris.Donut({
                            element: 'bar-urls',
                            data: graphData
                        });
                        return xhr.responseText;
                    }
                };
            }
            else {
            }
            if ($("#allDate").attr('checked', 'checked')) {
            }
            else {
            }
            break;
        case 'bar':
            if ($("#thisDate").attr('checked', 'checked')) {
                let jsonData = JSON.stringify({url: dataUrl});
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://localhost:3000/api/gotourl/infourls"); // async=true
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhr.send(jsonData);
                xhr.onload = function (e) {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let graphData = JSON.parse(xhr.responseText);
                        Morris.Bar({
                            element: 'bar-urls',
                            data: graphData,
                            xkey: 'url',
                            ykeys: ['count'],
                            labels: ['Count']
                        });
                        return xhr.responseText;
                    }
                };
            }
            else {
            }
            if ($("#allDate").attr('checked', 'checked')) {
                let jsonData = JSON.stringify({url: dataUrl});
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://localhost:3000/api/gotourl/infourlsalldata"); // async=true
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhr.send(jsonData);
                xhr.onload = function (e) {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let graphData = JSON.parse(xhr.responseText);
                        Morris.Bar({
                            element: 'bar-urls',
                            data: graphData,
                            xkey: 'url',
                            ykeys: ['count'],
                            labels: ['Count']
                        });
                        return xhr.responseText;
                    }
                };
            }
            else {
            }
            break;
        default:
            alert("Что-то пошло не так :j");
    }
}

$(document).ready(() => {
    $("#btnaddsite").click(addsite);
});

$(document).ready(() => {
    $("#btndeletesite").click(delsite);
});
