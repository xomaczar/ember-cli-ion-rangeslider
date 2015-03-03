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

- `updateTrigger` - Tells Ember-ion-rangeslider how the data-bound to/from will be updated when the user drags the slider. There are two possible values [`change`, `finish`]. `finish` is the default option, and will update the underlying to/from once the user releases a handle. The `change` will be updating the underlying to/from each `throttleTimeout`.

- `throttleTimeout` - Used with `updateTrigger="change"`. It throttles the slider's updates to the bound fields. The default value is `50` milliseconds.

- `type`, `values`, `min`, `max`, `from`, `to `, `step`, `keyboard`, `grid`, `force_edges`, `grid_num`, `prefix`, `postfix`, `disabled` - Each of these properties is bound to the ion.RangeSlider via two-way databinding, so that they will track changes that are made by the user and the slider will reflect that.


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
If you want to use the default skin (e.g. `nice`), you don't need to specify any option or even modify your existing EmberApp. If you don't want to include any css at all
for some reason, simply assign false or any "falsy" value to the skin option and no skin including the related assets will be used.

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
