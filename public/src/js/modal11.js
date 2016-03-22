var Modal = React.createClass({

	getInitialState: function() {
		return {show: false};
	},
	show: function(event) {
		this.setState({show: true});
		event.preventDefault();
	},
	hide: function(event) {
		this.setState({show: false});
		event.preventDefault();
	},
	componentWillMount: function() {
		let self = this;
		$(this.props.triggerElement).click(this.show);
	},
	render: function() {
		var i = 0, closeButton, modelHeader = null, modelClass = this.state.show ? 'md-modal md-effect-10 md-show': 'md-modal md-effect-10';
		if (this.props.closeButton) {
			closeButton = <a href="#" className="md-close" onClick={this.hide}>
							<i className="fa fa-times"></i>
						</a>;
		} else {
			closeButton = null;
		}
		for(let child in this.props.children){
			if (child.type == 'ModelHeader') {
				modelHeader =<ModelHeader>{child.props.children}</ModelHeader>;
				this.props.children[i] = null;
				break;
			}
			i++;
		}
		return (
			<div>
				<div className={modelClass} id="modal-10">
					{closeButton}
					<div className="md-content">
						{modelHeader}
						{this.props.children}
					</div>
				</div>
				<div className="md-overlay" onClick={this.props.overlayClose?this.hide:null}></div>
			</div>
		);
	}
});

var ModelHeader = React.createClass({
	render: function() {
		return (
			<h3 className="heading">{this.props.children}</h3>
		);
	}
});

var ModelContent = React.createClass({
	render: function() {
		return (
			<div>{this.props.children}</div>
		);
	}
});


ReactDOM.render(
	<Modal triggerElement="#showModal" closeButton={false} overlayClose={true}>
		<ModelHeader>Modal Dialog</ModelHeader>
		<p>This is a modal window. You can do the following things with it:</p>
		<ul>
			<li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
			<li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
			<li><strong>Close:</strong> click on the button below to close the modal.</li>
		</ul>
	</Modal>,
	document.getElementById('modal')
);