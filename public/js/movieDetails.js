'use strict';
const BASE_URL = "http://localhost:8081";
//处理url获取requestID
function UrlSearch() {
    var name, value;
    var str = location.href; //取得整个地址栏
    var num = str.indexOf("?");
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
    var arr = str.split("&"); //各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
        }
    }
}
$(document).ready(function () {
    var Request = new UrlSearch(); //实例化
    $.ajax({
        url: BASE_URL + '/movies' + '?id=' + Request.id,
        type: 'get',
        success: function (data) {
            $(document).attr('title', `${data.title}（${data.original_title}）-思沃影院`);
            $('#movieTitle').text(`${data.title}/${data.original_title}`);
            $('#movieImg').attr('src', data.image);
            $('#movieInfoTitle').html('<span class="name">名称：</span>' + data.title);
            $('#movieInfoOriginTitle').html('<span class="name">别名：</span>' + data.original_title);
            $('#movieInfoYear').html('<span class="name">时间：</span>' + data.year);
            $('#movieInfoRating').html('<span class="name">评分：</span>' + data.rating);
            $('#movieInfoDirectors').html('<span class="nsame">导演：</span>' + data.directors);
            $('#movieInfoCasts').html('<span class="name">主演：</span>' + data.casts);
            $('#movieInfoGenres').html('<span class="name">分类：</span>' + data.genres);
            $('#movieIntroduction').html(`<a href="${data.alt}">${data.alt}</a>`);
        }
    });
    $.ajax({
        url:BASE_URL+'/movies/searchByMovieid'+'?movieid='+Request.id,
        type:'get',
        success:function (s) {
            console.log(s);
            let total1 = `<a href="movieDetails.html?id=${s[0].id}"><img src='${s[0].image}'class='img-responsive img-rounded' height="148" width="210"><p class="text-center">${s[0].title}</p></a>`;
            $("#Recommended1").append(total1);
            let total2 = `<a href="movieDetails.html?id=${s[1].id}"><img src='${s[1].image}'class='img-responsive img-rounded'height="148" width="210"><p class='text-center'>${s[1].title}</p></a>`;
            $("#Recommended2").append(total2);
            let total3 = `<a href="movieDetails.html?id=${s[2].id}"><img src='${s[2].image}'class='img-responsive img-rounded'height="148" width="210"><p class='text-center'>${s[2].title}</p></a>`;
            $("#Recommended3").append(total3);
            let total4 = `<a href="movieDetails.html?id=${s[3].id}"><img src='${s[3].image}'class='img-responsive img-rounded'height="148" width="210"><p class='text-center'>${s[3].title}</p></a>`;
            $("#Recommended4").append(total4);
            let total5 = `<a href="movieDetails.html?id=${s[4].id}"><img src='${s[4].image}'class='img-responsive img-rounded'height="148" width="210"><p class='text-center'>${s[4].title}</p></a>`;
            $("#Recommended5").append(total5);
            let total6 = `<a href="movieDetails.html?id=${s[5].id}"><img src='${s[5].image}'class='img-responsive img-rounded'height="90%" width="90%"><p class='text-center'>${s[5].title}</p></a>`;
            $("#Recommended6").append(total6);
        }
    })
});
$(document).ready(function () {
    var Request = new UrlSearch(); //实例化
    $.ajax({
        url: BASE_URL + '/movie/comments' + '?movieid=' + Request.id,
        type: 'get',
        success: function (data) {
            //console.log(data);
            let total1=`<span class="glyphicon glyphicon-tag">评论人：${data[0].user}</span><p>${data[0].content}</p>`
            $("#movieComment1").append(total1);
            let total2=`<span class="glyphicon glyphicon-tag">评论人：${data[1].user}</span><p>${data[1].content}</p>`
            $("#movieComment2").append(total2);
            let total3=`<span class="glyphicon glyphicon-tag">评论人：${data[2].user}</span><p>${data[2].content}</p>`
            $("#movieComment3").append(total3);
            let total4=`<span class="glyphicon glyphicon-tag">评论人：${data[3].user}</span><p>${data[3].content}</p>`
            $("#movieComment4").append(total4);
        }
    });
});
$(document).ready(function () {
    var Request = new UrlSearch(); //实例化
    $.ajax({
        url: BASE_URL + '/movie/introduction' + '?movieid=' + Request.id,
        type: 'get',
        success: function (data) {
            //console.log(data);
            $('#movieIntroduction').text(data[0].content);
        }
    });
});