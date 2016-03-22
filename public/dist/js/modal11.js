'use strict';

var Modal = React.createClass({
	displayName: 'Modal',


	getInitialState: function getInitialState() {
		return { show: false };
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
		var self = this;
		$(this.props.triggerElement).click(this.show);
	},
	render: function render() {
		var i = 0,
		    closeButton,
		    modelHeader = null,
		    modelClass = this.state.show ? 'md-modal md-effect-10 md-show' : 'md-modal md-effect-10';
		if (this.props.closeButton) {
			closeButton = React.createElement(
				'a',
				{ href: '#', className: 'md-close', onClick: this.hide },
				React.createElement('i', { className: 'fa fa-times' })
			);
		} else {
			closeButton = null;
		}
		for (var child in this.props.children) {
			if (child.type == 'ModelHeader') {
				modelHeader = React.createElement(
					ModelHeader,
					null,
					child.props.children
				);
				this.props.children[i] = null;
				break;
			}
			i++;
		}
		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				{ className: modelClass, id: 'modal-10' },
				closeButton,
				React.createElement(
					'div',
					{ className: 'md-content' },
					modelHeader,
					this.props.children
				)
			),
			React.createElement('div', { className: 'md-overlay', onClick: this.props.overlayClose ? this.hide : null })
		);
	}
});

var ModelHeader = React.createClass({
	displayName: 'ModelHeader',

	render: function render() {
		return React.createElement(
			'h3',
			{ className: 'heading' },
			this.props.children
		);
	}
});

var ModelContent = React.createClass({
	displayName: 'ModelContent',

	render: function render() {
		return React.createElement(
			'div',
			null,
			this.props.children
		);
	}
});

ReactDOM.render(React.createElement(
	Modal,
	{ triggerElement: '#showModal', closeButton: false, overlayClose: true },
	React.createElement(
		ModelHeader,
		null,
		'Modal Dialog'
	),
	React.createElement(
		'p',
		null,
		'This is a modal window. You can do the following things with it:'
	),
	React.createElement(
		'ul',
		null,
		React.createElement(
			'li',
			null,
			React.createElement(
				'strong',
				null,
				'Read:'
			),
			' modal windows will probably tell you something important so don\'t forget to read what they say.'
		),
		React.createElement(
			'li',
			null,
			React.createElement(
				'strong',
				null,
				'Look:'
			),
			' a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.'
		),
		React.createElement(
			'li',
			null,
			React.createElement(
				'strong',
				null,
				'Close:'
			),
			' click on the button below to close the modal.'
		)
	)
), document.getElementById('modal'));