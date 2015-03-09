# Ember-cli-ion-rangeslider
An Ember and ion.RangeSlider integration, packaged as an Ember-cli addon. Check
[ion.RangeSlider](//github.com/IonDen/ion.rangeSlider) and [Ember-cli](http://www.ember-cli.com/).

## Browser Support
Should run wherever Ember and ion.RangeSlider run.

## Installation

### As an Ember CLI addon (0.1.5 or later)

In your ember-cli project run

```bash
ember install:addon ember-cli-ion-rangeslider
```

### As an Ember CLI addon (prior to 0.1.5)

In your ember-cli project run

```bash
npm install --save-dev ember-cli-ion-rangeslider
ember g ember-cli-ion-rangeslider
```
`
### As a Standalone Library

Download a release.

Copy to your vendor directory and link up the .js file.

## Usage

This addon provides an ember-ion-rangeslider component.
```handlebars
{{ember-ion-rangeslider
  type="double"
  grid=true
  min=1
  max=100
  step=1
  from=fromItem
  to=toItem}}
```

## Properties
Please review [ion.RangeSlider](//github.com/IonDen/ion.rangeSlider) docs and
[demos](http://ionden.com/a/plugins/ion.rangeSlider/en.html)

- `to`, `from` - Bound via two-way data binding.

- `updateTrigger` - Tells Ember-ion-rangeslider how the data-bound `to` and `from` will be updating while the user drags the slider. There are two possible values [`change`, `finish`].

  - `finish` the default option, and will update the underlying to/from binding source once the user releases a handle.
  - `change` will update the underlying to/from at minimum a `throttleTimeout`.

- `throttleTimeout` - Used with `updateTrigger="change"`. It throttles the slider's updates to the bound fields. The default value is `50` milliseconds.

- `type`, `values`, `min`, `max`, `from`, `to `, `step`, `keyboard`, `grid`, `force_edges`, `grid_num`, `prefix`, `postfix`, `disabled` - Each of these properties is bound to the ion.RangeSlider via one-way data binding (i.e. updating the binding target when binding source changes), so that when any of the bound properties change the slider will reflect that state.


## Skin customization

You can customize which skin to use in your Brocfile.

```javascript
//your-app/Brocfile.js

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  'ember-cli-ion-rangeslider': {

    // valid values are `nice`, `modern`, 'html5', 'flat`, `simple` or false
    skin: 'html5' //default `nice`
  }
});

module.exports = app.toTree();
```
If you want to use the default skin (i.e. `nice`), you don't need to specify any options or even modify your existing EmberApp. If you don't want to use any of the available skins, simply assign false or any "falsy" value to the skin option and no skin including the related assets (css styles & sprites) will be used.

`ion.rangeSlider.css` - is merged and bundled with your `/assets/vendor.css`, regardless of the defined options.
This style defines a bare minimum required to view and interact with ion.rangeSlider.

## Running
```bash
ember serve
```
Visit your app at http://localhost:4200.

## Running Tests
```bash
ember test
ember test --server
```

## Building
```bash
ember build
```
For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/)
