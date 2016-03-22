"use strict";

var Modal = React.createClass({
	displayName: "Modal",


	getInitialState: function getInitialState() {
		return { show: false };
	},
	getDefaultProps: function getDefaultProps() {
		return {
			id: "mdModel",
			heading: null,
			position: null,
			closeButton: true,
			overlayClose: true,
			effect: "md-effect-3d-sign"
		};
	},
	show: function show(event) {
		this.setState({ show: true });
		event.preventDefault();
	},
	hide: function hide(event) {
		this.setState({ show: false });
		event.preventDefault();
	},
	componentWillMount: function componentWillMount() {
		var triggerElement = document.querySelectorAll(this.props.triggerElement);
		for (var i = 0; i < triggerElement.length; i++) {
			triggerElement[i].addEventListener('click', this.show);
		}
	},
	render: function render() {
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
			closeButton = React.createElement(
				"a",
				{ href: "#", className: "md-close", onClick: this.hide },
				" "
			);
		}

		if (this.props.heading) {
			if (this.props.headerIconClass) {
				headerIcon = React.createElement("i", { className: this.props.headerIconClass, style: { float: 'left' } });
			}
			heading = React.createElement(
				"h3",
				{ className: "heading" },
				headerIcon,
				this.props.heading
			);
		}
		return React.createElement(
			"div",
			{ id: this.props.id },
			React.createElement(
				"div",
				{ className: modelClass },
				closeButton,
				React.createElement(
					"div",
					{ className: "md-content" },
					heading,
					React.createElement(
						"div",
						null,
						this.props.children
					)
				)
			),
			React.createElement("div", { className: "md-overlay", onClick: this.props.overlayClose ? this.hide : null })
		);
	}
});

ReactDOM.render(React.createElement(
	Modal,
	{ id: "mymodel1",
		triggerElement: "#showModal1",
		closeButton: true,
		overlayClose: true,
		heading: "Custom Header",
		headerIconClass: "fa fa-gift",
		position: "right",
		effect: "md-effect-3d-sign" },
	React.createElement(
		"p",
		null,
		"This is a modal window. You can do the following things with it:"
	),
	React.createElement(
		"ul",
		null,
		React.createElement(
			"li",
			null,
			React.createElement(
				"strong",
				null,
				"Read:"
			),
			" modal windows will probably tell you something important so don't forget to read what they say."
		),
		React.createElement(
			"li",
			null,
			React.createElement(
				"strong",
				null,
				"Look:"
			),
			" a modal window enjoys a certain kind of attention; just look at it and appreciate its presence."
		),
		React.createElement(
			"li",
			null,
			React.createElement(
				"strong",
				null,
				"Close:"
			),
			" click on the button below to close the modal."
		)
	)
), document.getElementById('modal1'));

ReactDOM.render(React.createElement(
	Modal,
	{ triggerElement: "#showModal2" },
	React.createElement(
		"p",
		null,
		"This is a modal window. You can do the following things with it:"
	),
	React.createElement(
		"ul",
		null,
		React.createElement(
			"li",
			null,
			React.createElement(
				"strong",
				null,
				"Read:"
			),
			" modal windows will probably tell you something important so don't forget to read what they say."
		),
		React.createElement(
			"li",
			null,
			React.createElement(
				"strong",
				null,
				"Look:"
			),
			" a modal window enjoys a certain kind of attention; just look at it and appreciate its presence."
		),
		React.createElement(
			"li",
			null,
			React.createElement(
				"strong",
				null,
				"Close:"
			),
			" click on the button below to close the modal."
		)
	)
), document.getElementById('modal2'));