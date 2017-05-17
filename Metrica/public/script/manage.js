let user = "";
function getlogin() {
    $.ajax({
        url: "http://" + window.location.host.toString() + "/api/auth/getlogin",
        type: "GET",
        headers: {"Authorization": localStorage.getItem('x-access-token')},
        success: (result) => {
            if (result) {
                user = JSON.stringify(result);
                $('#userLogin').text(JSON.stringify(result));
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
        "graphClicks('" + rowData.url + "\');" +
        "graphErrors('" + rowData.url + "\')\">" + rowData.url + "</span></td>"
    ))
    ;
}

/* Графики */
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
    $("#bar-errors").html("");
    switch ($("#graphTypeErrors").val()) {
        case 'donut':
            if ($("#thisDate").prop("checked", true)) {
                let jsonData = JSON.stringify({url: dataUrl});
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://" + window.location.host.toString() + "/api/error/gedountthisdata"); // async=true
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhr.send(jsonData);
                xhr.onload = function (e) {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let graphData = JSON.parse(xhr.responseText);
                        new Morris.Donut({
                            element: 'bar-errors',
                            data: graphData
                        });
                        return xhr.responseText;
                    }
                };
            }
            if ($("#allDate").prop("checked", true)) {
                let jsonData = JSON.stringify({url: dataUrl});
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://" + window.location.host.toString() + "/api/error/gedountalldata"); // async=true
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhr.send(jsonData);
                xhr.onload = function (e) {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let graphData = JSON.parse(xhr.responseText);
                        new Morris.Donut({
                            element: 'bar-errors',
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
                xhr.open("POST", "http://" + window.location.host.toString() + "/api/error/gethisdata"); // async=true
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhr.send(jsonData);
                xhr.onload = function (e) {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let graphData = JSON.parse(xhr.responseText);
                        Morris.Bar({
                            element: 'bar-errors',
                            data: graphData,
                            xkey: 'number',
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
                xhr.open("POST", "http://" + window.location.host.toString() + "/api/error/gealldata"); // async=true
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhr.send(jsonData);
                xhr.onload = function (e) {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let graphData = JSON.parse(xhr.responseText);
                        Morris.Bar({
                            element: 'bar-errors',
                            data: graphData,
                            xkey: 'number',
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

    let takeImageUrl = document.getElementById("bar-urls");
    let takeImageError = document.getElementById("bar-errors");
    let takeImageClick = document.getElementById("bar-clicks");

    let imgUrl = new Image();
    let imgError = new Image();
    let imgClick = new Image();

    domtoimage.toPng(takeImageUrl)
        .then((dataUrl) => {
            imgUrl = new Image();
            imgUrl.src = dataUrl;

            domtoimage.toPng(takeImageError)
                .then((dataUrl) => {
                    imgError = new Image();
                    imgError.src = dataUrl;

                    domtoimage.toPng(takeImageClick)
                        .then((dataUrl) => {
                            imgClick = new Image();
                            imgClick.src = dataUrl;

                            doc.text("Report Metrica API", 69, 10);
                            doc.text("User: " + user, 9, 17);
                            doc.text("Data: " + dateNow, 9, 25);

                            doc.text("All data", 60, 65);
                            doc.text("This data: " + dateNow, 60, 100);
                            doc.text("URL's", 9, 40);
                            doc.addImage(imgUrl, 'PNG', 9, 50, 50, 70);

                            doc.text("All data", 60, 150);
                            doc.text("This data: " + dateNow, 60, 185);
                            doc.text("Error's", 9, 125);
                            doc.addImage(imgError, 'PNG', 9, 130, 50, 70);

                            doc.text("All data", 60, 225);
                            doc.text("This data: " + dateNow, 60, 269);
                            doc.text("Click's", 9, 205);
                            doc.addImage(imgClick, 'PNG', 9, 210, 50, 70);

                            doc.text("All data", 60, 65);
                            doc.text("This data: " + dateNow, 60, 100);
                            doc.save("Report_" + dateNow + '.pdf');
                        });
                });
        });

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