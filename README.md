# React image show

Simple React images slide show (carousel)

## Install

`npm i react-image-show`

## Demo

Check out demo [online](https://quanlieu.github.io/react-image-show/)

## Example

```js
import React from 'react';
import SlideShow from 'react-image-show';

class MyComponent extends React.Component {
  render() {
    return (
      <SlideShow
        images={urlArray}
        width="920px"
        imagesWidth="800px"
        imagesHeight="450px"
        imagesHeightMobile="56vw"
        thumbnailsWidth="920px"
        thumbnailsHeight="12vw"
        indicators thumbnails fixedImagesHeight
      />
    );
  }

}
```

##  Props

|      Property     |  Type  |          Description          | Default |
| ----------------  | ------ |          -----------          | ------- |
| images            | array   | Array of images URL | none |
| fixedImagesHeight  | bool   | Enables fixed images height mode, fit height and then crop width to main aspect ratio, too narrow images will be center and arrow key navigation | false |
| infinite           | bool   | Enable infinite scrolling mode | false |
| indicators         | bool   | Show indicator | false |
| thumbnails         | bool   | Show thumbnails | false |
| arrows             | bool   | Show arrows | true |
| width              | string | Horizontal width of the carousel, include arrows, no apply in mobile mode, always 100% | 920px |
| imagesWidth        | string | Horizontal width of the image inside carousel, exclude arrows, always 100% on mobile | 800px |
| imagesHeight       | string | Height of the images when fixedImagesHeight is set | 450px |
| imagesHeightMobile | string | Height of the images on mobile when fixedImagesHeight is set | 56vw |
| thumbnailsWidth   | string | Horizontal width of the thumbnails strip, always 100% on mobile | 920px |
| thumbnailsHeight  | string | Height of thumbnails strip width of the carousel | 12vw |

##  Polyfill

For IE = 10, need dataset polyfill.
Check out [Moderndize Wiki page](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills)