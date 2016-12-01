'use strict';

var Image = require('../../..');

Image.load('./node_modules/ij-test/img/BW11x11.png').then(function (img) {
    console.log('Width: ',img.width);
    console.log('Height: ',img.height);
    var roiManager=img.getRoiManager();
    var mask=img.grey().mask();
    roiManager.fromMask(mask);
    var rois=roiManager.getRois();

    rois.length.should.equal(4);

    /*
    for (var i=0; i<rois.length; i++) {
        var roi=rois[i];
        console.log("Roi ID:",roi.id,
            ' surround:', roi.surround,
            ' surface:', roi.surface,
            ' boxPixels:', roi.boxPixels,
            ' contourMask:', roi.contourMask,
            ' border:', roi.border)
    }
    */
  //  console.log(rois);

});



