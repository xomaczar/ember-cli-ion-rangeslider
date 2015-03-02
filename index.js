/* jshint node: true */
'use strict';

var packagedSkins = {
  'flat':   ['skinFlat.css', 'sprite-skin-flat.png'],
  'html5':  ['skinHTML5.css', null],
  'modern': ['skinModern.css', 'sprite-skin-flat.png'],
  'nice':   ['skinNice.css', 'sprite-skin-nice.png'],
  'simple': ['skinSimple.css', 'sprite-skin-simple.png']
};

module.exports = {
  name: 'ember-cli-ion-rangeslider',

  envConfig: function(){
    return this.project.config(process.env.EMBER_ENV || 'development');
  },

  importSkin: function(skin, app){
    var skinAssets = packagedSkins[skin.toLowerCase()] || [null, null],
        style = skinAssets[0],
        img = skinAssets[1];

    if (style){
      app.import(app.bowerDirectory + '/ionrangeslider/css/ion.rangeSlider.' + style);
    }
    if (img){
      app.import(app.bowerDirectory + '/ionrangeslider/img/' + img, {
        destDir: 'img'
      });
    }
  },

  included: function(app){
  	this._super.included(app);
    var config = this.envConfig()[this.name] || app.options[this.name] || {};

  	app.import({
      production: app.bowerDirectory + '/ionrangeslider/js/ion.rangeSlider.min.js',
      development: app.bowerDirectory + '/ionrangeslider/js/ion.rangeSlider.js'
    });
    app.import(app.bowerDirectory + '/ionrangeslider/css/ion.rangeSlider.css');

    // Show something on the screen, when no skin is provided
    // If user set the skin to null explicitly, don't load any assets
    if(typeof(config.skin) === 'undefined'){
      this.importSkin('nice', app); // default skin
    }
    else if (config.skin){
      this.importSkin(config.skin, app);
    }
  }
};
