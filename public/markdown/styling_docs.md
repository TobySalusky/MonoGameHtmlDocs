# Styling Docs

---

## The Basics

There are two ways to apply styling to an `HtmlNode`.
* with **inline-style-attributes**

* with `.css` files and the `class` attribute


### Inline-Style-Attributes
*example usage:*
```html
<div backgroundColor='red'>
    <p fontSize={30}>text here</p>
</div>
```


### CSS and Classes
*example usage:*

`.css`:
```css
.Background {background-color: red;}

p {font-size: 30px;}
```
`.monohtml`:
```html
<div class='Background'>
    <p>text here</p>
</div>
```

>Unlike *Inline-Style-Attributes*, using **CSS** requires some setup.

*Class and Tag* **CSS-definitions** from `.css` files can only be applied if `SetCSS` is called on `CSSHandler` with `params` of **absolute paths** to each css-file you want to use.

> Like `HtmlMain`'s `Initialize`, this method should also be called before any HTML is generated.

```cs
CSSHandler.SetCSS(absolutePathToCSSFile1,
    absolutePathToCSSFile2);
```

---

>The only *major difference* between the two methods is that inlining allows **per-frame recalculation** of style-attributes.

```html
<div -backgroundColor={color: ((int)@t % 2 == 0) ? 'yellow' : 'blue'}>
    <p -fontSize={int~: sin(@t) * 10 + 20}>text here</p>
</div>
```

---

## Fonts

An `HtmlNode`'s font is determined by the css-attribute `fontFamily`.
```cs 
// set path to font-folder
HtmlMain.Initialize(this,
    fontPath: pathToFolderContainingFonts);
```
To use fonts other than the default, an **absolute path** to the folder containing your font files *(at the root level)* must be via `HtmlMain`'s `Initialize` method.

Fonts must be provided as `.ttf` files.

The name of each font-file will determine how it is referenced in css.

ex. `Arial.ttf` => `fontFamily: Arial;`

---

## Currently-Implemented Style Attributes

| Attribute-Name | Type(s) | Supports Dynamic |
|---|---|:-:|
|class|`string`|❌|
|color|`string` & `Color`|✔|
|backgroundColor|`string` & `Color`|✔|
|tint|`string` & `Color`|✔|
|borderColor|`string` & `Color`|✔|
|borderWidth|`int`|✔|
|borderRadius|`int` & `string`(%)|✔|
|dimens|`int` & `string`(%)|✔|
|width|`int` & `string`(%)|✔|
|height|`int` & `string`(%)|✔|
|position|`string`|❌|
|top|`int`|✔|
|left|`int`|✔|
|flexDirection|`string`|❌|
|justifyContent|`string`|❌|
|alignItems|`string`|❌|
|alignX|`string`|❌|
|alignY|`string`|❌|
|align|`string`|❌|
|flex|`float`|✔|
|margin|`int` & `string`(%)|❌|
|marginTop|`int` & `string`(%)|❌|
|marginLeft|`int` & `string`(%)|❌|
|marginRight|`int` & `string`(%)|❌|
|marginBottom|`int` & `string`(%)|❌|
|marginInline|`int` & `string`(%)|❌|
|marginBlock|`int` & `string`(%)|❌|
|padding|`int` & `string`(%)|❌|
|paddingTop|`int` & `string`(%)|❌|
|paddingLeft|`int` & `string`(%)|❌|
|paddingRight|`int` & `string`(%)|❌|
|paddingBottom|`int` & `string`(%)|❌|
|paddingInline|`int` & `string`(%)|❌|
|paddingBlock|`int` & `string`(%)|❌|
