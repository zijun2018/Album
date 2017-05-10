/**
 * Created by Administrator on 2017/5/10.
 */
"use strict";
const fs = require('fs');
//获取相册数据
exports.getAlbums = function (callback) {
    fs.readdir(process.cwd()+'/uploads',(err,files)=>{
        if (err){callback('出错了');return;}
        let Albums = [];
        (function iterator(i) {
            if (i === files.length){
                callback(Albums);
                return false;
            }
            fs.stat(process.cwd()+"/uploads/"+files[i], (err,stats)=>{
                if (err){callback('出错了');return;}
                if (stats.isDirectory()) {
                    Albums.push(files[i])
                }
                iterator(i+1);
            });
        }(0))
    });
};

exports.Pics = function (albumName,callback) {
    fs.readdir(process.cwd() + '/uploads/'+  albumName, (err, files) => {
        if (err) {callback('出错了',null);return;}
        let Pics = [];
        (function iterator(i) {
            if (i === files.length) {
                callback(null,Pics);
                return false;
            }
            fs.stat(process.cwd() + "/uploads/" + albumName + '/'+ files[i], (err, stats) => {
                if (err) {callback('出错了',null);return;}
                if (stats.isFile()) {
                    Pics.push(files[i])
                }
                iterator(i + 1);
            });
        }(0))
    });
};