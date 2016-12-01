import Image from '../Image';

/**
 * Rotates an image
 * @memberof Image
 * @instance
 * @param {number} angle - angle of the rotation in degrees
 * @return {Image} The new rotated image
 */
export function rotate(angle) {
    if (typeof angle !== 'number') {
        throw new TypeError('angle must be a number');
    }

    if (angle < 0) {
        angle = Math.ceil(-angle / 360) * 360 + angle;
    }

    switch (angle % 360) {
        case 0:
            return this.clone();
        case 90:
            return rotateRight.call(this);
        case 180:
            return rotate180.call(this);
        case 270:
            return rotateLeft.call(this);
        default:
            // todo add support for free angle rotation
            throw new Error('free angle rotation is currently not supported');
    }
}

/**
 * Rotates an image counter-clockwise
 * @memberof Image
 * @instance
 * @return {Image} The new rotated image
 */
export function rotateLeft() {
    const newImage = Image.createFrom(this, {width: this.height, height: this.width});
    const newMaxHeight = newImage.height - 1;
    for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
            for (let k = 0; k < this.channels; k++) {
                newImage.setValueXY(i, newMaxHeight - j, k, this.getValueXY(j, i, k));
            }
        }
    }
    return newImage;
}

/**
 * Rotates an image clockwise
 * @memberof Image
 * @instance
 * @return {Image} The new rotated image
 */

export function rotateRight() {
    const newImage = Image.createFrom(this, {width: this.height, height: this.width});
    const newMaxWidth = newImage.width - 1;
    for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
            for (let k = 0; k < this.channels; k++) {
                newImage.setValueXY(newMaxWidth - i, j, k, this.getValueXY(j, i, k));
            }
        }
    }
    return newImage;
}

function rotate180() {
    const newImage = Image.createFrom(this);
    const newMaxWidth = newImage.width - 1;
    const newMaxHeight = newImage.height - 1;
    for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
            for (let k = 0; k < this.channels; k++) {
                newImage.setValueXY(newMaxWidth - j, newMaxHeight - i, k, this.getValueXY(j, i, k));
            }
        }
    }
    return newImage;
}
