# Style Guide Additional Rules

use double-quotes for strings that contain single-quotes

Top-level numeric calculations should always be wrapped in parentheses:

```  
// Yep
.foo {
  width: (100% / 3);
}

// Nope
.foo {
  width: 100% / 3;
}
```

**Magic Numbers (unnamed numerical constants) are a plague and should be avoided at all costs.** When you cannot manage to find a reasonable explanation for why a number works, add an extensive comment explaining how you got there and why you think it works.

Preferences for color formats:
* HSL notation;
* RGB notation;
* Hexadecimal notation (lowercase and shortened).
  
When using a color more than once, store it in a variable with a meaningful name representing the color.

Lists should respect the following guidelines:

* either inlined or multilines;
* necessarily on multilines if too long to fit on an 80-character line;
* unless used as is for CSS purposes, always comma separated;
* always wrapped in parenthesis;
* trailing comma if multilines, not if inlined.

```
// Yep
$font-stack: ('Helvetica', 'Arial', sans-serif);
      
// Yep
$font-stack: (
  'Helvetica',
  'Arial',
  sans-serif,
);
```

When adding new items to a list, always use the provided API. Do not  attempt to add new items manually.

```
$shadows: (0 42px 13.37px hotpink);

// Yep
$shadows: append($shadows, $shadow, comma);

// Nope
$shadows: $shadows, $shadow;
```

Maps should be written as follows:

* space after the colon (:);
* opening brace (() on the same line as the colon (:);
* quoted keys if they are strings (which represents 99% of the cases);
* each key/value pair on its own new line;
* comma (,) at the end of each key/value;
* trailing comma (,) on last item to make it easier to add, remove or   reorder items;
* closing brace ()) on its own new line;
* no space or new line between closing brace ()) and semi-colon (;).

```
Illustration:

// Yep
$breakpoints: (
  'small': 767px,
  'medium': 992px,
  'large': 1200px,
);

// Nope
$breakpoints: ( small: 767px, medium: 992px, large: 1200px );
```