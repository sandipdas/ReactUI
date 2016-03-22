var Modal = React.createClass({

	getInitialState: function() {
		return {show: false};
	},
	getDefaultProps:function() {
		return {
			id: "mdModel",
			heading: null,
			position: null,
			closeButton: true,
			overlayClose: true,
			effect: "md-effect-3d-sign"
		};
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
		let triggerElement = document.querySelectorAll(this.props.triggerElement);
		for(let i =0 ; i < triggerElement.length; i++){
			triggerElement[i].addEventListener('click', this.show);
		}
	},
	render: function() {
		var closeButton = null,
			heading = null,
			headerIcon = null,
			effect = "md-effect-3d-sign",
			modelClass = 'md-modal md-effect-3d-sign';
		if (this.props.position == 'left') {
			modelClass += " md-left";
		}
		if (this.props.position == 'right') {
			modelClass += " md-right";
		}
		if (this.state.show) {
			modelClass += " md-show";
		}
		if (this.props.closeButton) {
			// closeButton = <a href="#" className="md-close" onClick={this.hide}>
			// 				<i className="fa fa-times"></i>
			// 			</a>;
			closeButton = <a href="#" className="md-close" onClick={this.hide}> </a>;
		}

		if (this.props.heading) {
			if (this.props.headerIconClass) {
				headerIcon = <i className={this.props.headerIconClass} style={{float:'left'}}></i>
			}
			heading = <h3 className="heading">
						{headerIcon}
						{this.props.heading}
					</h3>;
		}
		return (
			<div id={this.props.id}>
				<div className={modelClass}>
					{closeButton}
					<div className="md-content">
						{heading}
						<div>
							{this.props.children}
						</div>
					</div>
				</div>
				<div className="md-overlay" onClick={this.props.overlayClose?this.hide:null}></div>
			</div>
		);
	}
});

ReactDOM.render(
	<Modal id="mymodel1" 
		triggerElement="#showModal1" 
		closeButton={true} 
		overlayClose={true} 
		heading="Custom Header"
		headerIconClass="fa fa-gift"
		position="right"
		effect="md-effect-3d-sign">
		<p>This is a modal window. You can do the following things with it:</p>
		<ul>
			<li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
			<li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
			<li><strong>Close:</strong> click on the button below to close the modal.</li>
		</ul>
	</Modal>,
	document.getElementById('modal1')
);

ReactDOM.render(
	<Modal triggerElement="#showModal2">
		<p>This is a modal window. You can do the following things with it:</p>
		<ul>
			<li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
			<li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
			<li><strong>Close:</strong> click on the button below to close the modal.</li>
		</ul>
	</Modal>,
	document.getElementById('modal2')
);
