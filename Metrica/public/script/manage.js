let user = "";
function getlogin() {
    let cookieBrowser = $.cookie('x-access-token');
    if (cookieBrowser !== undefined) {
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
    else {
        window.location.href = "../login.html";
    }
}

function logout() {
    $.ajax({
        url: "http://" + window.location.host.toString() + "/api/auth/logout",
        type: "GET",
        success: (result) => {
            $.removeCookie('x-access-token');
            window.location.href = "../login.html";
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

function toDrive() {
    let Dropbox = require('dropbox');
    let dbx = new Dropbox({accessToken: 'd_8uW4mJ0pAAAAAAAAABIbxYkfaSBMzCD3SRLf1PZC6y5PYcaqzwMr2AOFEnr0QP'});
    dbx.filesListFolder({path: ''})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    // $.ajax({
    //     url: "https://cloud-api.yandex.net/v1/disk/resources/upload?path=",
    //     type: "GET"
    //
    // })

    // let file = $('input[type="file"]').prop("files")[0];
    // let formData = new FormData();
    // formData.append('file-input', file);
    //
    // $.ajax({
    //     url: 'https://webdav.yandex.ru:443',
    //     type: 'PUT',
    //     data: formData,
    //     path: 'images/',
    //     beforeSend: function (xhr) {
    //         xhr.setRequestHeader('Authorization', 'OAuth <token>');
    //         xhr.setRequestHeader('Expect', '100-continue');
    //         xhr.setRequestHeader('Content-Type', 'application/binary');
    //         xhr.setRequestHeader('Content-Length', file.size);
    //         xhr.setRequestHeader('Host', 'webdav.yandex.ru');
    //         xhr.setRequestHeader('Accept', '*/*');
    //     },
    //     success: function(data) {
    //         console.dir(data);
    //     }
    // });

    // document.getElementById('upload').addEventListener('change', function(e) {
    //     let file = this.files[0];
    //     let xhr = new XMLHttpRequest();
    //     xhr.file = file; // not necessary if you create scopes like this
    //     xhr.addEventListener('progress', function(e) {
    //         let done = e.position || e.loaded, total = e.totalSize || e.total;
    //         console.log('xhr progress: ' + (Math.floor(done/total*1000)/10) + '%');
    //     }, false);
    //     if ( xhr.upload ) {
    //         xhr.upload.onprogress = function(e) {
    //             let done = e.position || e.loaded, total = e.totalSize || e.total;
    //             console.log('xhr.upload progress: ' + done + ' / ' + total + ' = ' + (Math.floor(done/total*1000)/10) + '%');
    //         };
    //     }
    //     xhr.onreadystatechange = function(e) {
    //         if ( 4 === this.readyState ) {
    //             console.log(['xhr upload complete', e]);
    //         }
    //     };
    //     xhr.open('put', url, true);
    //     xhr.setRequestHeader("Content-Type","multipart/form-data");
    //     xhr.send(file);
    // }, false);

    // if (!class_exists('webdav_client')) {
    //     require('classes/YandexApi/Yandex.Disk_client.php');
    // }
    // /* * * в следующих строках устанавливаем url сервера, порт, версию протокола и * передаем логин и пароль от Яндекс диска для авторизации */
    // $wdc = new webdav_client();
    // $wdc - &gt; set_server('ssl://webdav.yandex.ru');
    // $wdc - &gt; set_port(443);
    // $wdc - &gt; set_user(login);
    // $wdc - &gt; set_pass(password);
    // $wdc - &gt; set_protocol(1);
    // // enable debugging $wdc-&gt;set_debug(false);
    // // если не удалось установить соединение, выводим ошибку if (!$wdc-&gt;open())
    // // { print 'Ошибка: не удалось установить соединение с сервером!'; exit; }
    // // Проверяем поддерживает ли webdav rfc 2518 if (!$wdc-&gt;check_webdav())
    // // { print 'Ошибка: сервер не поддерживает WebDAV или неверный логин/пароль '; exit; }
    // // Создаем папку $folder = '/myfolder'; $http_status = $wdc-&gt;mkcol($folder);
    // // отправляем файл put методом класса $target_path = '/images/myfile.png';
    // // $filename = 'myfile.png'; $http_status = $wdc-&gt;put_file($target_path, $filename);
    // // print 'статус загрузки ' . $http_status . '<br/>'; $wdc-&gt;close(); flush();
}

function toPDF() {
    toDrive();

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