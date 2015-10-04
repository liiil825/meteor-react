ItemsCollection = new Mongo.Collection("items");

Meteor.methods({
  addItem: function(content) {
    ItemsCollection.insert({'content': content});
  },
  removeItem: function(id) {
    ItemsCollection.remove(id);
  },
  updateItem: function(item) {
    if (!!item && !!item.id)
      ItemsCollection.update({_id: item.id}, { $set: { content: item.content } });
  }
});
