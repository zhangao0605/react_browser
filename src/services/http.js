export const $http = {
    // URL:'https://browser.thinkey.org/PublicChainBrowser',
    URL: 'http://publicchain.thinkey.xyz/PublicChainBrowser',
    UrlEncode: (obj) => {
        if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
            return '';
        }
        let params = [];
        for (let key in obj) {
            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return params.join('&');
    },
    get: (Nothis, Objson) => {
        let Alldata = '';
        if (Objson.data) {
            Alldata = '?' + $http.UrlEncode(Objson.data);
        }
        fetch(`${$http.URL}${Objson.url}${Alldata}`, {
            method: 'get',
            mode: 'cors',
            headers: {
                // 'Access-Token': localStorage.getItem('token')
                'content-type': 'application/json; charset=utf-8'
            },
        }).then((res) => {
            // 如果http状态码正常，则直接返回数据
            if (res.status !== 200) {
                throw res.status
            } else {
                let Data;
                switch (Objson.dataType) {
                    case 'json': {
                        Data = res.json()
                    }
                        break;

                    case 'text': {
                        Data = res.test()
                    }
                        break;
                }
                return Data
            }
        }).then((res) => {
            Objson.success.call(Nothis, res)
        }).catch((error) => {
            if (Objson.error) {
                Objson.error.call(Nothis, error)
            }
        });
    },

    post: (Nothis, Objson) => {
        fetch(`${$http.URL}${Objson.url}`, {
            method: 'post',
            mode: 'cors',
            headers: {
                // 'Access-Token' : localStorage.getItem('token')
                'content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(Objson.data)
        }).then((res) => {
            if (res.status !== 200) {
                throw res.status
            } else {
                let Data;
                switch (Objson.dataType) {
                    case 'json': {
                        Data = res.json()
                    }
                        break;
                    case 'text': {
                        Data = res.test()
                    }
                        break;
                }
                return Data
            }
        }).then((res) => {
            Objson.success.call(Nothis, res)
        }).catch((error) => {
            if (Objson.error) {
                Objson.error.call(Nothis, error)
            }
        });
    }
}