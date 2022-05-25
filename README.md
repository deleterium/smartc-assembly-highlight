# SmartC Assembly Highlight
Converts SmartC assembly source code into HTML with syntax highlighting

# Setup
This library can be obtained through npm:
```
npm install smartc-assembly-highlight
```

# Usage
Import the library
```
import sah from 'smartc-assembly-highlight';
```

Choose the text to be prepended in all output (preAll), prepended in each line (preLine), appended in each line (postLine) and appended in all output (postAll).
In preLine and postLine it is possible to add the string `%line%` that will be replaced for the line number.
You can choose to change the class name for each type of attribute.
This is the default value:
```js
const Config = {
    preAll: '',
    preLine: '',
    postAll: '',
    postLine: '<br>',
    spanErrorClass: 'asmError',
    spanLabelClass: 'asmLabel',
    spanNumberClass: 'asmNumber',
    spanCommentClass: 'asmComment',
    spanVariableClass: 'asmVariable',
    spanDirectiveClass: 'asmDirective',
    spanInstructionClass: 'asmInstruction'
}
```

To color a entire text use the function `colorText(multiLineText)`. This function will use values set on Config.

To color only one line, use the function `colorLine(justOneLine)`. This function will NOT use values on Config and can be used if you plan to do your own process for each line.

# Example
The following example will create a table and show lines number:

```js
import sah from 'smartc-assembly-highlight'

const sourceCode = `^declare a

SET @a #0000000000000001
INC @a
FIN
`

sah.Config.preAll = '<table><tbody>';
sah.Config.preLine = '<tr><td>Line: %line%</td><td>';
sah.Config.postLine = '</td></tr>';
sah.Config.postAll = '</tbody></table>';

const highlighted = sah.colorText(sourceCode);

```

The following stylesheet is recomended:
```css
.asmInstruction { color: mediumblue; }
.asmVariable { color: purple; }
.asmComment { color: darkgreen; }
.asmLabel { color: sienna; }
.asmNumber { color: red; }
.asmError { background-color: pink; }
.asmDirective {
    color: brown;
    font-weight: bold;
}
```

# Browser usage
You can use jsdelivr.net and import `sah` as global:

```html
<script src='https://cdn.jsdelivr.net/npm/smartc-assembly-highlight/dist/index-min.js'</script>
```

Then, just use the global variable in your script:

```js
const highlighted = sah.colorText(sourceCode);
```
