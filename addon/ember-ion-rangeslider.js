import Ember from 'ember';

var get = Ember.get,
    set = Ember.set,
    isArray = Ember.isArray,
    isNone = Ember.isNone;

export default Ember.Component.extend({
	tagName: 'input',
	attributeBindings: ['type'],
	type: 'input',
	classNames: 'ember-ion-rangeslider',
	slider: null,

	sliderOptions: Ember.computed(function(){
		//## Update trigger: change|finish
		var updateTrigger = get(this, 'updateTrigger') || 'finish',
		    throttleTimeout = get(this, 'throttleTimeout') || 50;

		var options = {
			type: get(this, 'type') || 'single',
			values: get(this, 'values') || [],
			min: get(this, 'min'),
			max: get(this, 'max'),
			from: get(this, 'from'),
			to : get(this, 'to'),
			step: get(this, 'step'),
			keyboard: get(this, 'keyboard'),
			grid: get(this, 'grid') || false,
			force_edges: get(this, 'force_edges') || false,
			grid_num: get(this, 'grid_num') || 4,
			prefix: get(this, 'prefix') || '',
			postfix: get(this, 'postfix') || '',
			disabled: get(this, 'disabled') || false,
			onChange: Ember.K,
			onFinish: Ember.run.bind(this, '_onSliderFinish'),
		};

		//## Setup update trigger
		if (updateTrigger === 'change') {
			options.onChange = Ember.run.bind(this, '_onSliderChange', throttleTimeout);
			options.onFinish = Ember.K;
		}
		return options;
	}),

	//## Setup/destroy
	setupRangeSlider: function(){
		var options = get(this, 'sliderOptions');
		this.$().ionRangeSlider(options);
		this.slider = this.$().data('ionRangeSlider');
	}.on('didInsertElement'),

	destroyRangeSlider: function(){
		this.slider.destroy();
	}.on('willDestroyElement'),


	//## Bound values observers
	_onToAndFromValuesChanged: Ember.observer(
		'to', 'from',
		function(){
			var propName = arguments[1];

			//## slider.update removes the focus from the currently active element.
			//## In case where multiple sliders bound to the same property
			//## don't update internal slider values as it forces control to loose focus
			if(!this.slider.is_active){
				this.slider.update(this.getProperties(propName));
			}
	}),
	_onOtherValuesChanged: Ember.observer(
		'min', 'max', 'step',
		'values', 'disabled', 'grid',
		'grid_num', 'force_edge',
		function(){
			this.slider.update(this.getProperties(arguments[1]));
	}),

	//## ion.RangeSlider callbacks
	_onSliderChange: function(throttleTimeout, changes){
		var args = {'to': changes.to, 'from': changes.from };
		Ember.run.debounce(this, this.setProperties, args, throttleTimeout);
	},
	_onSliderFinish: function(changes){
		this.setProperties({'to': changes.to, 'from': changes.from});
	},
});
