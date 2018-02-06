import { GREY } from '../model/model';
import { getOutputImage } from '../internal/getOutputImage';

import { methods } from './greyAlgorithms';

/**
 * Converts the current image to greyscale.
 * The source image has to be RGB.
 * If there is an alpha channel we need to decide what to do:
 * * keepAlpha : we will keep the alpha channel and you will get a GREY / A image
 * * mergeAlpha : we will multiply each pixel of the image by the alpha
 * @memberof Image
 * @instance
 * @param {object} [options]
 * @param {GreyAlgorithm} [options.algorithm='luma709'] - Algorithm to get the grey value from RGB values
 * @param {boolean} [options.keepAlpha=false] - If true, the RGB values are treated
 *          separately from the alpha channel and the method returns a GREYA image.
 * @param {boolean} [options.mergeAlpha=true] - If true, the alpha channel will be used to scale the grey pixel.
 * @param {boolean} [options.allowGrey=false] - By default only RGB images are allowed.
 *          If true grey images are also allowed and will either return a copy or
 *          apply the alpha channel depending the options
 * @param {Image} [options.out]
 * @return {Image}
 */
export default function grey(options = {}) {
  let {
    algorithm = 'luma709',
    keepAlpha = false,
    mergeAlpha = true
  } = options;

  this.checkProcessable('grey', {
    bitDepth: [8, 16],
    alpha: [0, 1]
  });

  if (this.components === 1) {
    algorithm = 'red'; // actually we just take the first channel if it is a grey image
  }

  keepAlpha &= this.alpha;
  mergeAlpha &= this.alpha;
  if (keepAlpha) {
    mergeAlpha = false;
  }

  let newImage = getOutputImage(this, options, {
    components: 1,
    alpha: keepAlpha,
    colorModel: GREY
  });

  let method = methods[algorithm.toLowerCase()];
  if (!method) {
    throw new Error(`unsupported grey algorithm: ${algorithm}`);
  }

  let ptr = 0;
  for (let i = 0; i < this.data.length; i += this.channels) {
    if (mergeAlpha) {
      newImage.data[ptr++] = method(this.data, i, this) * this.data[i + this.components] / this.maxValue;
    } else {
      newImage.data[ptr++] = method(this.data, i, this);
      if (newImage.alpha) {
        newImage.data[ptr++] = this.data[i + this.components];
      }
    }
  }

  return newImage;
}
