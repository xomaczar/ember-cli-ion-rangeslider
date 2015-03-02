module.exports = {
  description: 'Sets up required ember-cli-ion-rangeslider dependencies',
  normalizeEntityName: function(){}, 

  afterInstall: function(){
    return this.addBowerPackageToProject('ionrangeslider');
  }
};
