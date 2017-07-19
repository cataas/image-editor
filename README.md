# Image editor

A image editor library

## Example

```javascript
const ie = require('image-editor');

ie.readFile('./input.png')
    .then(buffer => ie.edit(buffer, 'image/png', 'square', 'Hello'))
    .then(buffer => ie.writeFile(buffer, './output.png'))
    .then(() => console.log('Done'));
```

## Dependencies

Like [gm](https://www.npmjs.com/package/gm) library, you need install `GraphicsMagick` on your computer.

# API Reference

## ImageEditor

* ImageEditor
    * ImageEditor#edit(buffer, mimetype, [type], [text], [color], [fontSize], [filter], [customWidth], [customHeight]) => <code>Promise</code>
    * ImageEditor#readFile(path) => <code>Promise</code>
    * ImageEditor#writeFile(buffer, path) => <code>Promise</code>
    * ImageEditor#applyType(buffer, mimetype, [type], [customWidth], [customHeight]) => <code>Promise</code>
    * ImageEditor#applyFilter(buffer, mimetype, filter) => <code>Promise</code>
    * ImageEditor#size(buffer) => <code>Promise</code>
    * ImageEditor#write(buffer, text, [width], [height], [position], [color], [fontSize]) => <code>Promise</code>
    * ImageEditor#resize(buffer, width, [height], [option]) => <code>Promise</code>
    * ImageEditor#crop(buffer, width, height, [gravity], [x], [y]) => <code>Promise</code>
    * ImageEditor#blur(buffer, radius, sigma) => <code>Promise</code>
    * ImageEditor#mono(buffer) => <code>Promise</code>
    * ImageEditor#sepia(buffer) => <code>Promise</code>
    * ImageEditor#mosaic(buffer) => <code>Promise</code>
    * ImageEditor#negative(buffer) => <code>Promise</code>
    * ImageEditor#paint(buffer, radius&#x60;) => <code>Promise</code>
    * ImageEditor#pixelate(buffer, mimetype, size) => <code>Promise</code>

### ImageEditor#edit(buffer, mimetype, [type], [text], [color], [fontSize], [filter], [customWidth], [customHeight])=> <code>Promise</code>
Edit an image

**Kind**: Exported function  

| Param | Type | Default |
| --- | --- | --- |
| buffer | <code>Buffer</code> |  |
| mimetype | <code>string</code> |  |
| [type] | <code>string</code> | <code>&quot;default&quot;</code> |
| [text] | <code>string</code> | <code>null</code> |
| [color] | <code>string</code> | <code>&quot;white&quot;</code> |
| [fontSize] | <code>number</code> | <code>30</code> |
| [filter] | <code>string</code> | <code>null</code> |
| [customWidth] | <code>number</code> | <code></code> |
| [customHeight] | <code>number</code> | <code></code> |

### ImageEditor#readFile(path) => <code>Promise</code>
Read file and return buffer

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| path | <code>string</code> |

### ImageEditor#writeFile(buffer, path) => <code>Promise</code>
Write file from buffer to path

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| buffer | <code>Buffer</code> |
| path | <code>string</code> |

### ImageEditor#applyType(buffer, mimetype, [type], [customWidth], [customHeight]) => <code>Promise</code>
Apply type

**Kind**: Exported function  

| Param | Type | Default |
| --- | --- | --- |
| buffer | <code>Buffer</code> |  |
| mimetype | <code>string</code> |  |
| [type] | <code>string</code> | <code>&quot;default&quot;</code> |
| [customWidth] | <code>number</code> | <code></code> |
| [customHeight] | <code>number</code> | <code></code> |

### ImageEditor#applyFilter(buffer, mimetype, filter) => <code>Promise</code>
Apply filters

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| buffer | <code>Buffer</code> |
| mimetype | <code>string</code> |
| filter | <code>string</code> |

### ImageEditor#size(buffer) => <code>Promise</code>
Get size of picture

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| buffer | <code>Buffer</code> |

### ImageEditor#write(buffer, text, [width], [height], [position], [color], [fontSize]) => <code>Promise</code>
Write something on picture

**Kind**: Exported function  

| Param | Type | Default |
| --- | --- | --- |
| buffer | <code>Buffer</code> |  |
| text | <code>string</code> |  |
| [width] | <code>number</code> | <code>0</code> |
| [height] | <code>number</code> | <code>0</code> |
| [position] | <code>string</code> | <code>&quot;Center&quot;</code> |
| [color] | <code>string</code> | <code>&quot;white&quot;</code> |
| [fontSize] | <code>number</code> | <code>30</code> |

### ImageEditor#resize(buffer, width, [height], [option]) => <code>Promise</code>
Resize picture

**Kind**: Exported function  

| Param | Type | Default |
| --- | --- | --- |
| buffer | <code>Buffer</code> |  |
| width | <code>number</code> |  |
| [height] | <code>number</code> | <code></code> |
| [option] | <code>string</code> | <code>null</code> |

### ImageEditor#crop(buffer, width, height, [gravity], [x], [y]) => <code>Promise</code>
Crop picture

**Kind**: Exported function  

| Param | Type | Default |
| --- | --- | --- |
| buffer | <code>Buffer</code> |  |
| width | <code>number</code> |  |
| height | <code>number</code> |  |
| [gravity] | <code>string</code> | <code>&quot;Center&quot;</code> |
| [x] | <code>number</code> | <code>0</code> |
| [y] | <code>number</code> | <code>0</code> |

### ImageEditor#blur(buffer, radius, sigma) => <code>Promise</code>
Blur image

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| buffer | <code>Buffer</code> |
| radius | <code>number</code> |
| sigma | <code>string</code> |

### ImageEditor#mono(buffer) => <code>Promise</code>
Mono

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| buffer | <code>Buffer</code> |

### ImageEditor#sepia(buffer) => <code>Promise</code>
Sepia

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| buffer | <code>Buffer</code> |

### ImageEditor#mosaic(buffer) => <code>Promise</code>
Mosaic

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| buffer | <code>Buffer</code> |

### ImageEditor#negative(buffer) => <code>Promise</code>
Negative

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| buffer | <code>Buffer</code> |

### ImageEditor#paint(buffer, radius&#x60;) => <code>Promise</code>
Paint

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| buffer | <code>Buffer</code> |
| radius` | <code>number</code> |

### ImageEditor#pixelate(buffer, mimetype, size) => <code>Promise</code>
Pixelate

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| buffer | <code>Buffer</code> |
| mimetype | <code>string</code> |
| size | <code>number</code> |
