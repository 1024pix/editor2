import Route from '@ember/routing/route';

export default Route.extend({
  setupController() {
    this._super(...arguments);
    const competenceController = this.controllerFor('competence');
    competenceController.set('section', 'quality');
    competenceController.set('view', null);
    competenceController.set('firstMaximized', false);
  }
});