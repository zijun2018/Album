/**
 * Created by Administrator on 2017/5/10.
 */

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
