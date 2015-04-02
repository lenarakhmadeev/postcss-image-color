# PostCSS Image Color

[PostCSS] PostCSS plugin getting image dominant color.

[PostCSS]: https://github.com/postcss/postcss

```css
.photo {
    background-color: image-color("photos/summer.jpg");
    width: 200px;
}
```

```css
.photo {
    background-color: rgb(151, 189, 212);
    width: 200px;
}
```

## Usage

```js
postcss([ require('postcss-image-color')({basePath: 'assets/images'}) ])
```

See [PostCSS] docs for examples for your environment.