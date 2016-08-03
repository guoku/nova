define(function(require){

    var cart_item_view = Backbone.View.extend({
        tagName : "li",
        className : "list-item",
        template : _.template($('#cart_item_tpl').html()),
        initialize:function(){

        },
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

});