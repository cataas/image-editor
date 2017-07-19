const gm = require('gm');
const jimp = require('jimp');

/**
 * @module ImageEditor
 * @example
 * const ie = require('image-editor');
 *
 * ie.readFile('./input.png')
 *    .then(buffer => ie.edit(buffer, 'image/png', 'square', 'Hello'))
 *    .then(buffer => ie.writeFile(buffer, './output.png'))
 *    .then(() => console.log('Done'));
 */
class ImageEditor {

    constructor() {
        this.font = 'Arial';
    }

    /**
     * Edit an image
     * @param {Buffer} buffer
     * @param {string} mimetype
     * @param {string} [type=default]
     * @param {string} [text=null]
     * @param {string} [color=white]
     * @param {number} [fontSize=30]
     * @param {string} [filter=null]
     * @param {number} [customWidth=null]
     * @param {number} [customHeight=null]
     *
     * @returns {Promise}
     *
     * @alias module:ImageEditor
     */
    edit(buffer, mimetype, type = 'default', text = '', color = '#ffffff', fontSize = 30, filter = null, customWidth = null, customHeight = null) {

        return this.applyType(buffer, mimetype, type, customWidth, customHeight)
            .then(buffer => this.applyFilter(buffer, mimetype, filter))
            .then(buffer => this.size(buffer))
            .then(data => {
                let heightText = Math.floor((data.sizes.height / 2) / 2);
                return this.write(data.buffer, text, 0, heightText, 'Center', color, fontSize);
            })
            .catch(err => console.log(err))
        ;
    }

    /**
     * Read file and return buffer
     * @param {string} path
     *
     * @returns {Promise}
     *
     * @alias module:ImageEditor
     */
    readFile(path) {
        return new Promise((resolve, reject) => {
            gm(path).toBuffer((err, buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
        });
    }

    /**
     * Write file from buffer to path
     * @param {Buffer} buffer
     * @param {string} path
     *
     * @returns {Promise}
     *
     * @alias module:ImageEditor
     */
    writeFile(buffer, path) {
        return new Promise((resolve, reject) => {
            gm(buffer).write(path, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve(path);
                }
            });
        });
    }

    /**
     * Apply type
     * @param {Buffer} buffer
     * @param {string} mimetype
     * @param {string} [type=default]
     * @param {number} [customWidth=null]
     * @param {number} [customHeight=null]
     *
     * @returns {Promise}
     *
     * @alias module:ImageEditor
     */
    applyType(buffer, mimetype, type = 'default', customWidth = null, customHeight = null) {

        if (type === 'sq' || type === 'square') {
            let gravity = mimetype === 'image/gif' ? 'NorthWest' : 'Center';
            return this.resize(buffer, 200, '200^').then(buffer => this.crop(buffer, 200, '200^', gravity));
        }

        if (type === 'md' || type === 'medium') {
            return this.resize(buffer, 400);
        }

        if (type === 'sm' || type === 'small') {
            return this.resize(buffer, 300);
        }

        if (type === 'xs' || type === 'xsmall') {
            return this.resize(buffer, 100);
        }

        if (type === 'or' || type === 'original') {
            return new Promise((resolve, reject) => resolve(buffer));
        }

        if (customWidth !== null || customHeight !== null) {
            return this.resize(buffer, customWidth, customHeight);
        }

        return this.resize(buffer, 600);
    }

    /**
     * Apply filters
     * @param {Buffer} buffer
     * @param {string} mimetype
     * @param {string} filter
     *
     * @returns {Promise}
     *
     * @alias module:ImageEditor
     */
    applyFilter(buffer, mimetype, filter) {
        if (filter === 'blur') {
            return this.blur(buffer, 5, 2);
        }

        if (filter === 'mono') {
            return this.mono(buffer);
        }

        if (filter === 'sepia') {
            return this.sepia(buffer);
        }

        if (filter === 'mosaic') {
            //return this.mosaic(buffer);
        }

        if (filter === 'pixel') {
            return this.pixelate(buffer, mimetype, 8);
        }

        if (filter === 'negative') {
            return this.negative(buffer);
        }

        if (filter === 'paint') {
            return this.paint(buffer, 5);
        }

        return new Promise((resolve, reject) => resolve(buffer));
    }

    /**
     * Get size of picture
     * @param {Buffer} buffer
     *
     * @returns {Promise}
     *
     * @alias module:ImageEditor
     */
    size(buffer) {
        return new Promise((resolve, reject) => {

            gm(buffer).size((err, sizes) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ sizes: sizes, buffer: buffer });
                }
            });
        });
    }

    /**
     * Write something on picture
     * @param {Buffer} buffer
     * @param {string} text
     * @param {number} [width=0]
     * @param {number} [height=0]
     * @param {string} [position=Center]
     * @param {string} [color=white]
     * @param {number}  [fontSize=30]
     *
     * @returns {Promise}
     *
     * @alias module:ImageEditor
     */
    write(buffer, text, width = 0, height = 0, position = 'Center', color = '#ffffff', fontSize = 30) {
        return new Promise((resolve, reject) => {

            if (text === '' || text === null) {
                return resolve(buffer);
            }

            gm(buffer)
                .fill('#000000')
                .font(this.font, fontSize)
                .drawText((width + 1), (height + 1), text, position)
                .fill(color)
                .font(this.font, fontSize)
                .drawText(width, height, text, 'Center')
                .toBuffer((err, buffer) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(buffer);
                    }
                });
        });
    }

    /**
     * Resize picture
     * @param {Buffer} buffer
     * @param {number} width
     * @param {number} [height=null]
     * @param {string} [option=null]
     *
     * @returns {Promise}
     *
     * @alias module:ImageEditor
     */
    resize(buffer, width, height = null, option = null) {
        return new Promise((resolve, reject) => {
            gm(buffer)
                .resize(width, height, option)
                .toBuffer((err, buffer) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(buffer);
                    }
                })
            ;
        });
    }

    /**
     * Crop picture
     * @param {Buffer} buffer
     * @param {number} width
     * @param {number} height
     * @param {string} [gravity=Center]
     * @param {number} [x=0]
     * @param {number} [y=0]
     *
     * @returns {Promise}
     *
     * @alias module:ImageEditor
     */
    crop(buffer, width, height, gravity = 'Center', x = 0, y = 0) {
        return new Promise((resolve, reject) => {
            gm(buffer)
                .gravity(gravity)
                .crop(width, height, x ,y)
                .toBuffer((err, buffer) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(buffer);
                    }
                })
            ;
        });
    }

    /**
     * Blur image
     * @param {Buffer} buffer
     * @param {number} radius
     * @param {string} sigma
     *
     * @returns {Promise}
     *
     * @alias module:ImageEditor
     */
    blur(buffer, radius, sigma) {
        return new Promise((resolve, reject) => {
            gm(buffer)
                .blur(radius, sigma)
                .toBuffer((err, buffer) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(buffer);
                    }
                })
            ;
        });
    }

    /**
     * Mono
     * @param {Buffer} buffer
     *
     * @returns {Promise}
     *
     * @alias module:ImageEditor
     */
    mono(buffer) {
        return new Promise((resolve, reject) => {
            gm(buffer)
                .monochrome()
                .toBuffer((err, buffer) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(buffer);
                    }
                })
            ;
        });
    }

    /**
     * Sepia
     * @param {Buffer} buffer
     *
     * @returns {Promise}
     *
     * @alias module:ImageEditor
     */
    sepia(buffer) {
        return new Promise((resolve, reject) => {
            gm(buffer)
                .sepia()
                .toBuffer((err, buffer) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(buffer);
                    }
                })
            ;
        });
    }

    /**
     * Mosaic
     * @param {Buffer} buffer
     *
     * @returns {Promise}
     *
     * @alias module:ImageEditor
     */
    mosaic(buffer) {
        return new Promise((resolve, reject) => {
            gm(buffer)
                .mosaic()
                .toBuffer((err, buffer) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(buffer);
                    }
                })
            ;
        });
    }

    /**
     * Negative
     * @param {Buffer} buffer
     *
     * @returns {Promise}
     *
     * @alias module:ImageEditor
     */
    negative(buffer) {
        return new Promise((resolve, reject) => {
            gm(buffer)
                .negative()
                .toBuffer((err, buffer) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(buffer);
                    }
                })
            ;
        });
    }

    /**
     * Paint
     * @param {Buffer} buffer
     * @param {number} radius`
     *
     * @returns {Promise}
     *
     * @alias module:ImageEditor
     */
    paint(buffer, radius) {
        return new Promise((resolve, reject) => {
            gm(buffer)
                .paint(radius)
                .toBuffer((err, buffer) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(buffer);
                    }
                })
            ;
        });
    }

    /**
     * Pixelate
     * @param {Buffer} buffer
     * @param {string} mimetype
     * @param {number} size
     *
     * @returns {Promise}
     *
     * @alias module:ImageEditor
     */
    pixelate(buffer, mimetype, size) {
        return new Promise((resolve, reject) => {
            jimp.read(buffer).then(image => {
                image.pixelate(size).getBuffer(mimetype, (err, buffer) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(buffer);
                    }
                });
            }).catch(err => reject(err));
        });
    }
}

module.exports = new ImageEditor();
