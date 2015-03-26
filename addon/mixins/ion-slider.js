import Ember from 'ember';

var ionProperties = {
    type               : 'double',
    values             : [],
    min                : 10,
    max                : 100,
    step               : 1,
    min_interval       : null,
    max_interval       : null,
    drag_interval      : false,

    from_fixed         : false,
    from_min           : 10,
    from_max           : 100,
    from_shadow        : false,
    to_fixed           : false,
    to_min             : 10,
    to_max             : 100,
    to_shadow          : false,

    prettify_enabled   : true,
    prettify_seperator : ' ',
    prettify           : null,

    force_edges        : false,
    keyboard           : false,
    keyboard_step      : 5,

    grid               : false,
    grid_margin        : true,
    grid_num           : 4,
    grid_snap          : false,
    hide_min_max       : false,
    hide_from_to       : false,

    prefix             : '',
    postfix            : '',
    max_postfix        : '',
    decorate_both      : true,
    values_separator   : ' - ',
    disabled           : false
};

export default Ember.Mixin.create({

  isObserving: false,

  ionOneWayProperties: Ember.computed(function(){
    var defProps = [];
    var propNames = Object.keys(ionProperties);
    for(var i = 0; i < propNames.length; i++){
      var pName = propNames[i];
      var pValue = this.get(pName);

      if (typeof pValue !== 'undefined'){
        defProps[pName] = pValue;
      }
      else if (pName === 'type'){
        defProps[pName] = ionProperties[pName];
      }
    }
    return defProps;
  }).readOnly(),

  startObservingOneWayProps: function(){
    var props = this.get('ionOneWayProperties');
    if (props && !this.get('isObserving')){

      Object.keys(props).forEach(function(key){
        Ember.addObserver(this, key, this, '_oneWayPropertyDidChange');
      }.bind(this));
      this.toggleProperty('isObserving');
    }
  },

  stopObservingOneWayProps: function() {
    var props = this.get('ionOneWayProperties');
    if (props && this.get('isObserving')){
      Object.keys(props).forEach(function(key){
        Ember.removeObserver(this, key, this, '_oneWayPropertyDidChange');
      });
      this.toggleProperty('isObserving');
    }
  }
});
