import Ember from 'ember';
import SliderMixin from './mixins/ion-slider';

var get = Ember.get;

export default Ember.Component.extend(SliderMixin, {
  tagName: 'input',
  classNames: ['ember-ion-rangeslider'],
  slider: null,

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
		
		return options;
    //var oneWayOptions = this.get('ionOneWayProperties');
    //return Ember.merge(options, oneWayOptions);
  }).readOnly(),

  //## Setup/destroy
  setupRangeSlider: function(){
    var options = get(this, 'sliderOptions');
    //console.log("Got options: ", options);
    this.$().ionRangeSlider(options);
    this.slider = this.$().data('ionRangeSlider');
    this.startObservingOneWayProps();
  }.on('didInsertElement'),

  destroyRangeSlider: function(){
    this.stopObservingOneWayProps();
    this.slider.destroy();
  }.on('willDestroyElement'),

  //## Bound values observers
  _onToFromValuesChanged: Ember.observer(
    'to', 'from',
    function(){
      var propName = arguments[1];

      //## slider.update removes the focus from the currently active element.
      //## In case where multiple sliders bound to the same property
      //## don't update the active slider values (to/from) as it results in a
      //## a loss of focus in a currently active slider
      if(!this.slider.is_active){
        this.slider.update(this.getProperties(propName));
      }
    }),

  _oneWayPropertyDidChange: function(){
    console.log("Got this thing....", arguments[1]);
    this.slider.update(this.getProperties(arguments[1]));
  },

  //## ion.RangeSlider callbacks
  _sliderDidChange: function(throttleTimeout, changes){
    var args = {'to': changes.to, 'from': changes.from };
    Ember.run.debounce(this, this.setProperties, args, throttleTimeout);
  },
  _sliderDidFinish: function(changes){
    this.setProperties({'to': changes.to, 'from': changes.from});
  },
});
