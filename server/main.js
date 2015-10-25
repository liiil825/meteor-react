Meteor.publish("plans", function() {
  return PlansCollection.find({}, { sort: { createAt: -1 } });
})

Meteor.startup(function() {
  if (PlansCollection.find().count() === 0) {
    var plans = ['study meteor', 'study react', 'study flux'];
    plans.forEach(function(item) {
      PlansCollection.insert({ name: item, createAt: new Date(), startAt: new Date() });
    });
  }
});
