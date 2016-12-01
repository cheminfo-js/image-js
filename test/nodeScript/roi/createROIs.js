'use strict';

var Image = require('../../..');

var histogram=new Uint8Array(2);
histogram[0]=63;
histogram[1]=192;

var mask=new Image(4,4, histogram, {
    kind: 'BINARY'
});


var roiManager=mask.getRoiManager();
roiManager.fromMask(mask);
var rois=roiManager.getRois();

for (var i=0; i<rois.length; i++) {
    console.log("ROIs width and height: ",rois[i].width, rois[i].height)
}


for (var i=0; i<rois.length; i++) {
    console.log("Roi ID and surrounding ids: ",rois[i].id, rois[i].surround);
    console.log("Roi info: ",rois[i].id, ' contourMask:', rois[i].external, ' border:', rois[i].border)
}



//console.log(rois);

