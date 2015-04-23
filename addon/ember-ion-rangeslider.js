import Ember from 'ember';
import IonSlider from './mixins/ion-slider';

var get = Ember.get;
var merge = Ember.merge;

export default Ember.Component.extend(IonSlider, {
  tagName: 'input',
  classNames: ['ember-ion-rangeslider'],
  type: 'single', //## explicit, waiting for this.attr.type
  _slider: null,

  sliderOptions: Ember.computed(function(){
    //## Update trigger: change|finish
    var updateTrigger = get(this, 'updateTrigger') || 'finish',
        throttleTimeout = get(this, 'throttleTimeout') || 50,
        options = {
          to: get(this, 'to') || 10,
          from: get(this, 'from') || 100,
          onChange: Ember.K,
          onFinish: Ember.run.bind(this, '_sliderDidFinish'),
        };

    //## Setup change update trigger
    if (updateTrigger === 'change') {
      options.onChange = Ember.run.bind(this, '_sliderDidChange', throttleTimeout);
      options.onFinish = Ember.K;
    }
    merge(options, this.get('ionReadOnlyOptions'));
    return options;
  }).readOnly(),

  //## Setup/destroy
  setupRangeSlider: function(){
    var options = get(this, 'sliderOptions');
    this.$().ionRangeSlider(options);
    this._slider = this.$().data('ionRangeSlider');

  }.on('didInsertElement'),

  destroyRangeSlider: function(){
    this._slider.destroy();

  }.on('willDestroyElement'),

  //## Bound values observers
  _onToFromPropertiesChanged: Ember.observer(
    'to', 'from',
    function(){
      var propName = arguments[1];

      //## slider.update removes the focus from the currently active element.
      //## In case where multiple sliders bound to the same property
      //## don't update the active slider values (to/from) as it results in a
      //## a loss of focus in a currently active slider
      if(!this._slider.is_active){
        this._slider.update(this.getProperties(propName));
      }
  }),

  _readOnlyPropertiesChanged: function(){
    this._slider.update(this.getProperties(arguments[1]));
  },

  _sliderDidChange: function(throttleTimeout, changes){
    var args = {'to': changes.to, 'from': changes.from };
    Ember.run.debounce(this, this.setProperties, args, throttleTimeout);
  },
  _sliderDidFinish: function(changes){
    this.setProperties({'to': changes.to, 'from': changes.from});
  },
});
