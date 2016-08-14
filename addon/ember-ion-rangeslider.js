import Ember from 'ember';
import IonSliderMixin from './mixins/ion-slider';

const {
  merge,
  computed,
  run,
  Component,
  addObserver,
  removeObserver,
  observer
} = Ember;

export default Component.extend(IonSliderMixin, {
  tagName: 'input',
  classNames: ['ember-ion-rangeslider'],
  _slider: null,

  _readOnlyPropertiesChanged() {
    this._slider.update(this.getProperties(arguments[1]));
  },

  _startObserving() {
    let options = this.get('ionReadOnlyOptions');
    for (const optName in options) {
      if (options.hasOwnProperty(optName)) {
        addObserver(this, optName, this, '_readOnlyPropertiesChanged');
      }
    }
  },

  _stopObserving() {
    let options = this.get('ionReadOnlyOptions');
    for (const optName in options) {
      if (options.hasOwnProperty(optName)) {
        removeObserver(this, optName, this, '_readOnlyPropertiesChanged');
      }
    }
  },

  onToFromChange: observer('to', 'from', function() {
    if (this._slider) {
      this._slider.update(this.getProperties('to', 'from'));
    }
  }),

  didInsertElement(){
    this._super(...arguments);
    this._startObserving();
    const options = this.get('sliderOptions');
    this.$().ionRangeSlider(options);
    this._slider = this.$().data('ionRangeSlider');
  },

  willDestroyElement(){
    this._super(...arguments);
    this._stopObserving();
    this._slider.destroy();
  },

  sliderOptions: computed('to', 'from', function(){
    const to = this.getWithDefault('to', 10);
    const from = this.getWithDefault('from', 100);
    const options = {
      to,
      from,
      onStart: run.bind(this, this.bootstrapEvent, 'onStart'),
      onChange: run.bind(this, this.bootstrapEvent, 'onChange'),
      onFinish: run.bind(this, this.bootstrapEvent, 'onFinish'),
      onUpdate: run.bind(this, this.bootstrapEvent, 'onUpdate')
    };

    merge(options, this.get('ionReadOnlyOptions'));
    return options;
  }).readOnly(),

  bootstrapEvent(actionName, slider) {
    if (typeof this.get(actionName) === 'function') {
      this.get(actionName)(slider);
    }
  }
});
