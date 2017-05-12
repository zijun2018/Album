/**
 * Created by Administrator on 2017/5/10.
 */
"use strict";
let fs = require('fs');
let formidable = require('formidable');


const AllAlbums = require('../models/getAlbums.js');
exports.showIndex = function (req, res) {
    AllAlbums.getAlbums(function (Albums) {
        res.render('index', {
            "Albums": Albums,
        });
    });
};

exports.showPic = function (req,res,next) {
    const albumName = req.params.albumName;
    AllAlbums.Pics(albumName,function (err,Pics) {
        if (err) { next(); return; }
        res.render('pictures',{
          "albumname" : albumName,
          "Pics" : Pics,
      });
  });
};
exports.showUpload = function (req, res) {
    AllAlbums.getAlbums(function (Albums) {
        res.render('upload', {
            "Albums": Albums,
        });
    });
};
exports.showPost = function (req,res) {
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = process.cwd()+"/temp/";
    form.parse(req, function (err, fields, files,next) {
        fs.rename(files.file.path, process.cwd()+"/uploads/"+fields.dir + "/" + files.file.name,(err)=>{
            if (err) {
                next();
                return false;
            }
        });
    });
    res.writeHead(200, {'content-type': 'text/html;charset=utf8;'});
    res.write('上传成功');
    res.end();
};