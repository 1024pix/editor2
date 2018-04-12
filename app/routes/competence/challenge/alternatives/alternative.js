import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.get("store").findRecord("workbenchChallenge", params.alternative_id);
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set("maximized", false);
    controller.set("edition", false);
  },
  actions: {
    willTransition(transition) {
      if (this.controller.get("edition") &&
          !confirm('Êtes-vous sûr de vouloir abandonner la modification en cours ?')) {
        transition.abort();
      } else {
        return true;
      }
    }
  },
  templateName: "competence/challenge"
});
