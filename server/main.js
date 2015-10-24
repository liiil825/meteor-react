Meteor.publish("plans", function() {
  return PlansCollection.find({}, { sort: { createAt: -1 } });
})

