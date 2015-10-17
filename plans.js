PlansCollection = new Mongo.Collection('plans');

Meteor.methods({
  '/plans/new': function(plan) {
    PlansCollection.insert({
      name: plan.name,
      createAt: new Date()
    });
  },
  '/plans/reset': function(plan) {
    if (plan._id) {
      PlansCollection.update(plan._id, plan);
    }
  }
});



