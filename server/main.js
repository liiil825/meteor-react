Meteor.publish("items", function() {
  return ItemsCollection.find({});
})

Meteor.publish("plans", function() {
  return PlansCollection.find({});
})
