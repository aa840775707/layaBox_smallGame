var path = require("path");
var fs = require("fs");
var xlsx = require('node-xlsx');
var dirs = [];
//读取文件夹里所有的文件
fs.readdir('../excel/', function (err, files) {
    (function iterator(i) {
        if (i == files.length) {
            // console.log('所有文件在一个数组里：', dirs);
            //把文件名提取出来
            for (let i1 = 0; i1 < dirs.length; i1++) {
                let ss = dirs[i1].split(".");
                // console.log('把文件名提取出来:', ss[0]);
                //开始将excel文件转变成json文件
                //读取文件内容
                var obj = xlsx.parse('../excel/' + dirs[i1]);
                var excelObj = obj[0].data;
                // console.log(excelObj);
                var data = [];

                //是否有嵌套
                let isCom = false;
                for (let index1 = 0; index1 < excelObj.length; index1++) {
                    let itemArr = excelObj[index1];
                    if (itemArr[0] === undefined) {
                        isCom = true;
                        break;
                    }        
                }

                if (isCom) {
                    //嵌套导表
                    let descArr = excelObj[0];
                    let nameArr = excelObj[1];
                    let typeArr = excelObj[2];
                    var obj1 = {};
                    var group = [];
                    let namekey1 = 0;
                    for (let index1 = 0; index1 < excelObj.length; index1++) {
                        if (index1 < 2) continue;
                        let itemArr = excelObj[index1];
                        let namekey2 = itemArr[0] !== undefined ? itemArr[0] : namekey1;
                        namekey1 = namekey2;
                        var obj2 = {};

                        // console.log(namekey2);
                        for (let index2 = 0; index2 < itemArr.length; index2++) {
                            let itemValue = itemArr[index2];
                            let itemNmae = nameArr[index2];
                            obj2[itemNmae] = itemValue !== undefined ? itemValue : namekey2;
                        }
                        group.push(obj2);
                        // console.log(group);
                    }
                    for (let index2 = 0; index2 < excelObj.length; index2++) {
                        let itemArr = excelObj[index2];
                        if (index2 < 2) continue;
                        if (itemArr[0] === undefined) continue;
                        obj1[itemArr[0]] = {};
                        obj1[itemArr[0]][nameArr[0]] = itemArr[0];
                    }
                    var array_json = {};
                    for (const key1 in obj1) {
                        let objitem = obj1[key1];
                        for (const key2 in objitem) {
                            let arr = [];
                            group.forEach(element => {
                                if (element[key2] == objitem[key2]) {
                                    delete element[key2];
                                    arr.push(element);
                                }
                            });
                            array_json[key1] = {};
                            array_json[key1][key2] = objitem[key2]
                            array_json[key1]["group"] = arr;
                        }
                    }
                } else {
                    //普通导表
                    for (var i in excelObj) {
                        var value = excelObj[i];
                        let arr = [];
                        for (var j in value) {
                            arr.push(value[j]);
                        }
                        data.push(arr);
                    }
                    // console.log('data:', data);
                    var array_json = {};
                    var array_json_index = [];
                    for (let i = 1, j = 0; i < data.length; i++, j++) {
                        array_json_index[j] = data[i];
                    }
                    for (let i = 1; i < array_json_index.length; i++) {
                        array_json[array_json_index[i][0]] = {};
                        for (let j = 1; j < array_json_index[0].length; j++) {
                            array_json[array_json_index[i][0]][array_json_index[0][j]] = array_json_index[i][j];
                        }
                    }
                }
                let str = JSON.stringify(array_json)
                let dir_json = ss[0] + '.json';
                fs.writeFile(__dirname + '/bin/json/' + dir_json, str, function (err) {
                    if (err) { res.status(500).send('Server is error...') }
                })
            }
            return;
        }
        fs.stat(path.join('../excel/', files[i]), function (err, data) {
            if (data.isFile()) {
                dirs.push(files[i]);
            }
            iterator(i + 1);
        });
    })(0);
});