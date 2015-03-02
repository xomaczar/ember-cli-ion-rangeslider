# Ember-cli-ion-rangeslider
An Ember and ion.RangeSlider integration, packaged as an Ember-cli addon. Check 
[ion.RangeSlider](//github.com/IonDen/ion.rangeSlider) and [Ember-cli](http://www.ember-cli.com/).

## Browser Support
Should run wherever Ember and Selectize run.

## Demo (coming soon)

## Installation

### As an Ember CLI addon (0.1.5 or later)

Run ember install:addon ember-cli-ion-rangeslider on your project folder.

### As an Ember CLI addon (prior to 0.1.5)

Run npm install --save-dev ember-cli-ion-rangeslider on your project folder.

Run ember g ember-cli-ion-rangeslider to install ion.RangeSlider dependency from bower.

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

## Skin customization

You can customize which skin to use in your Brocfile.

```javascript
//your-app/Brocfile.js

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  'ember-cli-ion-rangeslider': {
    //valid values are `nice`, `modern`, 'html5', 'flat`, `simple` or null
    skin: 'html5'
  }
});

module.exports = app.toTree();
```
If you want to use the default skin (e.g. nice skin), you don't need to specify any option. If you don't want to include any css at all 
for some reason, simply assign false or any "falsy" value to the skin option.

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
