var RSearch = React.createClass({
    onclick: function() {
        console.log("Clicked!");
        tag = $("input")[0]
        url = "/search/" + tag.value
        $.getJSON(url, function(data) {
            this.props.setGlobalState({eventList: data.data});
        });
    },
    render: function() {
        return (
            <form className="search">
                <input type="text"/>
                <button onClick={this.onclick}> Search </button>
            </form>
        );
    }
})

var RReset = React.createClass({
    onclick: function() {
        $.getJSON('/events/', function(data) {
            this.props.setGlobalState({eventList: data.data});
        }.bind(this));

        $.getJSON('/users', function(data) {
            this.props.setGlobalState({userList: data.data});
        }.bind(this));
    },
    render: function() {
        return (
            <div className="reset">
                <button onClick={this.onclick}> Reset Events </button>
            </div>
        );
    }
})

var RFiltering = React.createClass({
    remove: function(uid) {
        this.props.removeUser(uid)
    },

    render: function() {
        var users = [];
        for (var i = 0; i < this.props.userList.length; i++) {
            var user = this.props.userList[i];

            users.push(
                <button onClick={ this.remove.bind(this, user.id) } name={ user.id }> Remove {user.name}</button>
            );
        }

        return (
            <div className="filtering"> 
                { users }
            </div>
        );
    }
})

var RQuery = React.createClass({
    render: function() {
        return (
            <div className="query">
                <RSearch setGlobalState={this.props.setGlobalState} />
                <RReset setGlobalState={this.props.setGlobalState} />
                <RFiltering userList={ this.props.userList } removeUser={this.props.removeUser} />
            </div>
        );
    }
})
