console.log("hello");
(function(){
    'use strict';
    
    var TodoBanner = React.createClass({
      render: function(){
        return (
            <div classname="jumbotron">
                <h3> Persional shopping List</h3>
            </div>
        );
      }
    });

    var TodoList = React.createClass({
        removeItem:function(dItem){
        console.log('remove:'+dItem);
        this.props.onDelete(dItem);
    },
      render: function() {
          var self=this;
      var createItem = function(itemText) {
        return (
            <TodoListItem rmItem={self.removeItem} >{itemText}</TodoListItem>
          );
      };
      return <ul className="list-group">{this.props.items.map(createItem)}</ul>;
      }
    });

    var TodoListItem = React.createClass({
        delete:function(e){
            e.preventDefault();
            console.log(this.props.children);
            this.props.rmItem(this.props.children);
        },
      render: function(){
        return (
          <li className="{list-group-item}">{this.props.children}
            <form onSubmit={this.delete}>
                    <button>&times;</button>
                </form>
            
            </li>
        );
      }
    });

    var TodoForm = React.createClass({
      getInitialState: function() {
        return {item: ''};
        },
      handleSubmit: function(e){
        e.preventDefault();
        this.props.onFormSubmit(this.state.item);
        this.setState({item: ''});
        React.findDOMNode(this.refs.item).focus();
        return;
      },
      onChange: function(e){
        this.setState({
          item: e.target.value
        });
      },
      render: function(){
        return (
          <form onSubmit={this.handleSubmit}>
            <input type='text' ref='item' onChange={this.onChange} value={this.state.item}/>
            <input type='submit' value='Add'/>
          </form>
        );
      }
    });		

    var TodoApp = React.createClass({
      getInitialState: function() {
      return {items: ['item1', 'item2']};
      },
      updateItems: function(newItem) {
        var allItems = this.state.items.concat([newItem]);
        this.setState({
        items: allItems
      });
      },
      deleteItems:function(dItem){
        console.log('delete:');
          var index;
        this.state.items.filter(function(_item, _index){
            if (_item == dItem){
                index = _index;
            }
        });
          
        this.state.items.splice(index,1);
          this.setState({
        items: this.state.items
      });
          
      },
      render: function() {
      return (
        <div className="container">
        <TodoBanner/>
        <TodoList items={this.state.items} onDelete={this.deleteItems}/>
        <TodoForm onFormSubmit={this.updateItems}/>
        </div>
      );
      }
    });

    React.render(<TodoApp/>, document.getElementById('root'));
    
})();