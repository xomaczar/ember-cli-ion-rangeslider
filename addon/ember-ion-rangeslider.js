import Ember from 'ember';
import IonSlider from './mixins/ion-slider';
import { assert } from 'ember-metal/utils';
const {
  merge,
  computed,
  run
} = Ember;

export default Ember.Component.extend(IonSlider, {
  tagName: 'input',
  classNames: ['ember-ion-rangeslider'],
  type: 'single', //## explicit, waiting for this.attr.type
  _slider: null,

  didReceiveAttrs() {
    this._super(...arguments);
    assert(`{{ion-range-slider}} requires an onFromChange option`, typeof this.get('onFromChange') === 'function');
    if (this.get('type') === 'double')
      assert(`{{ion-range-slider}} requires an onToChange option`, typeof this.get('onToChange') === 'function');
    if (this._slider) {
      this._slider.update(this.getProperties('from', 'to'));
    }
  },

  sliderOptions: computed(function(){
    const throttleTimeout = this.get('throttleTimeout') || 50;
    const to = this.get('to') || 10;
    const from = this.get('from') || 100;
    const options = {
      to,
      from,
      onChange: Ember.K,
      onFinish: run.bind(this, '_sliderDidFinish')
    };

    merge(options, this.get('ionReadOnlyOptions'));
    return options;
  }).readOnly(),

  didInsertElement(){
    this._super(...arguments);
    let options = this.get('sliderOptions');
    this.$().ionRangeSlider(options);
    this._slider = this.$().data('ionRangeSlider');
  },

  willDestroyElement(){
    this._super(...arguments);
    this._slider.destroy();
  },

  _readOnlyPropertiesChanged(){
    this._slider.update(this.getProperties(arguments[1]));
  },

  _sliderDidFinish(changes){
    this.get('onFromChange')(changes.from);
    this.get('onToChange')(changes.to);
  },
});
