payload = {};

window.onload = function () {
    myApp = new Vue({
        el:"#app",
        data:{
            loading:true,
            liff:false,
            qid:Number(location.search.slice(1))
        }
    });
    liff.init(
        data => {
            payload.userId = data.context.userId;
            myApp.liff = true;
            payload.qid = myApp.qid;
            postData(function(res){
                if(res.err){
                    return alert(err);
                }
                else{
                    myApp.loading=false;
                }
            });
        },
        err => {
            myApp.liff = false
        }
    );
    
};

var xhr = new XMLHttpRequest();

function postData(func){
    xhr.open("post", "https://script.google.com/macros/s/AKfycbzUHyDdemyvJ2OZqRGnVrPxjqFrck03vHnMnLlGX2LG2VrXUPQ/exec");
    
    xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
    
// データをリクエスト ボディに含めて送信する
    xhr.send(serialize(payload));
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            myApp.maskview = false;
            func(JSON.parse(xhr.response));
        //データを取得した後の処理を書く
        }
    };
}

function serialize(data) {
    var key, value, type, i, max;
    var encode = window.encodeURIComponent;
    var query = '';
 
    for (key in data) {
        value = data[key];
        type = typeof(value) === 'object' && value instanceof Array ? 'array' : typeof(value);
        switch (type) {
            case 'undefined':
                // キーのみ
                query += key;
                break;
            case 'array':
                // 配列
                for (i = 0, max = value.length; i < max; i++) {
                    query += key + '[]';
                    query += '=';
                    query += encode(value[i]);
                    query += '&';
                }
                query = query.substr(0, query.length - 1);
                break;
            case 'object':
                // ハッシュ
                for (i in value) {
                    query += key + '[' + i + ']';
                    query += '=';
                    query += encode(value[i]);
                    query += '&';
                }
                query = query.substr(0, query.length - 1);
                break;
            default:
                query += key;
                query += '=';
                query += encode(value);
                break;
        }
        query += '&';
    }
    query = query.substr(0, query.length - 1);
    return query;
};