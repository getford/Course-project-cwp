function getlogin() {
    console.log(window.location.host.toString());
    $.ajax({
        url: "http://" + window.location.host.toString() + "/api/auth/getlogin",
        type: "GET",
        headers: {"Authorization": localStorage.getItem('x-access-token')},
        success: (result) => {
            if (result) {
                $('#userLogin').text(result);
                return result;
            }
        }
    })
}

function addsite() {
    $.ajax({
        url: "http://" + window.location.host.toString() + "/api/site/addsite",
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
        url: "http://" + window.location.host.toString() + "/api/site/delsite",
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
        url: "http://" + window.location.host.toString() + "/api/site/mysites",
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
    row.append($("<td id='urlClick'>" + "<span onclick=\"myGotoUrlCount('" + rowData.url + "\');" +
        "graphClicks('" + rowData.url + "\')\">" + rowData.url + "</span></td>"));
}

function myGotoUrlCount(dataUrl) {
    $("#bar-urls").html("");
    switch ($("#graphType").val()) {
        case 'donut':
            if ($("#thisDate").prop("checked", true)) {
                let jsonData = JSON.stringify({url: dataUrl});
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://" + window.location.host.toString() + "/api/gotourl/fordonutthisdata"); // async=true
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
            if ($("#allDate").prop("checked", true)) {
                let jsonData = JSON.stringify({url: dataUrl});
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://" + window.location.host.toString() + "/api/gotourl/fordonutalldate"); // async=true
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
            break;
        case 'bar':
            if ($("#thisDate").prop("checked", true)) {
                let jsonData = JSON.stringify({url: dataUrl});
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://" + window.location.host.toString() + "/api/gotourl/infourls"); // async=true
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
            if ($("#allDate").prop("checked", true)) {
                let jsonData = JSON.stringify({url: dataUrl});
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://" + window.location.host.toString() + "/api/gotourl/infourlsalldata"); // async=true
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
            break;
        default:
            alert("Что-то пошло не так :j");
    }
}

function graphErrors(dataUrl) {
    switch ($("#graphTypeErrors").val()) {
        case 'donut':
            if ($("#thisDate").prop("checked", true)) {
                let jsonData = JSON.stringify({url: dataUrl});
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://localhost:3000/api/gotourl/fordonutthisdata"); // async=true
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
            if ($("#allDate").prop("checked", true)) {
                let jsonData = JSON.stringify({url: dataUrl});
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://localhost:3000/api/gotourl/fordonutalldate"); // async=true
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
            break;
        case 'bar':
            if ($("#thisDate").prop("checked", true)) {
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
            if ($("#allDate").prop("checked", true)) {
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
            break;
        default:
            alert("Что-то пошло не так :j");
    }
}

function graphClicks(dataUrl) {
    $("#bar-clicks").html("");
    switch ($("#graphTypeClicks").val()) {
        case 'donut':
            if ($("#thisDate").prop("checked", true)) {
                let jsonData = JSON.stringify({url: dataUrl});
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://" + window.location.host.toString() + "/api/click/getclicksdonutthisday"); // async=true
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhr.send(jsonData);
                xhr.onload = function (e) {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let graphData = JSON.parse(xhr.responseText);
                        new Morris.Donut({
                            element: 'bar-clicks',
                            data: graphData
                        });
                        return xhr.responseText;
                    }
                };
            }
            if ($("#allDate").prop("checked", true)) {
                let jsonData = JSON.stringify({url: dataUrl});
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://" + window.location.host.toString() + "/api/click/getclickdonutsalldate"); // async=true
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhr.send(jsonData);
                xhr.onload = function (e) {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let graphData = JSON.parse(xhr.responseText);
                        new Morris.Donut({
                            element: 'bar-clicks',
                            data: graphData
                        });
                        return xhr.responseText;
                    }
                };
            }
            break;
        case 'bar':
            if ($("#thisDate").prop("checked", true)) {
                let jsonData = JSON.stringify({url: dataUrl});
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://" + window.location.host.toString() + "/api/click/getclicksthisday"); // async=true
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhr.send(jsonData);
                xhr.onload = function (e) {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let graphData = JSON.parse(xhr.responseText);
                        Morris.Bar({
                            element: 'bar-clicks',
                            data: graphData,
                            xkey: 'element',
                            ykeys: ['count'],
                            labels: ['Count']
                        })
                        ;
                        return xhr.responseText;
                    }
                };
            }
            if ($("#allDate").prop("checked", true)) {
                let jsonData = JSON.stringify({url: dataUrl});
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://" + window.location.host.toString() + "/api/click/getclicksalldate"); // async=true
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhr.send(jsonData);
                xhr.onload = function (e) {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let graphData = JSON.parse(xhr.responseText);
                        Morris.Bar({
                            element: 'bar-clicks',
                            data: graphData,
                            xkey: 'element',
                            ykeys: ['count'],
                            labels: ['Count']
                        });
                        return xhr.responseText;
                    }
                };
            }
            break;
        default:
            alert("Что-то пошло не так :j");
    }
}

function toPDF() {
    let date = new Date();
    let dateNow = date.getDate() +
        "." + (date.getMonth() + 1) +
        "." + date.getFullYear();

    let doc = new jsPDF();

    doc.text("DO THIS!!!!!!!!!!!!!!!!!11111", 100, 100);
    doc.save("Report_" + dateNow + '.pdf');
}

$(document).ready(() => {
    $("#btnaddsite").click(addsite);
});

$(document).ready(() => {
    $("#btndeletesite").click(delsite);
});

$(document).ready(() => {
    $("#topdf").click(toPDF);
});