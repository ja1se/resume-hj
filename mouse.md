## 샘플코드
```html
<section>
	<button><span>button</span></button>
</section>
```

```css
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

section {
  width: 30%;
  margin: 15% auto;
  background: #f2f2f2;
  padding: 5%;
}

button {
  border: 3px solid #222;
  background: transparent;
  overflow: hidden;
  width: 100%;
  outline: none;
}
button span {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.5em;
  color: #222;
  display: block;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  position: relative;
  overflow: hidden;
  padding: 20px;
}
button span:hover {
  cursor: pointer;
}

.circle {
  display: block;
  position: absolute;
  background: rgba(0, 0, 0, 0.075);
  border-radius: 50%;
  transform: scale(0);
}
.circle.animate {
  -webkit-animation: effect 0.65s linear;
          animation: effect 0.65s linear;
}

@-webkit-keyframes effect {
  100% {
    opacity: 0;
    transform: scale(2.5);
  }
}

@keyframes effect {
  100% {
    opacity: 0;
    transform: scale(2.5);
  }
}

```

```js
// credit where credit's due; http://thecodeplayer.com/walkthrough/ripple-click-effect-google-material-design

var element, circle, d, x, y;
$("button span").click(function (e) {
  element = $(this);

  if (element.find(".circle").length == 0)
    element.prepend("<span class='circle'></span>");

  circle = element.find(".circle");
  circle.removeClass("animate");

  if (!circle.height() && !circle.width()) {
    d = Math.max(element.outerWidth(), element.outerHeight());
    circle.css({ height: d, width: d });
  }

  x = e.pageX - element.offset().left - circle.width() / 2;
  y = e.pageY - element.offset().top - circle.height() / 2;

  circle.css({ top: y + "px", left: x + "px" }).addClass("animate");
});

```


















