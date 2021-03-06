import * as React from 'react';
import { connect } from 'react-redux';

import { Store } from 'client/redux/store';
import { changeTitle } from 'client/redux/action';

interface HomeProps {
	title: string;
	updateTitle: any;
}

class Home extends React.Component<HomeProps> {
	private titleList: string[];

	constructor(props: HomeProps) {
		super(props);

		this.titleList = [
			'Hello World!',
			'High five from React',
			'Wow. Much skills.',
		];

		this.setRandomTitle = this.setRandomTitle.bind(this);
	}

	public setRandomTitle() {
		let titleIndex = this.titleList.indexOf(this.props.title) + 1;
		if (titleIndex >= this.titleList.length) {
			titleIndex = 0;
		}

		const newTitle = this.titleList[titleIndex];
		this.props.updateTitle(newTitle);
	}

	public render() {
		return (
			<>
				Home page
				<button onClick={() => console.log('Hello world!')} />
			</>
		);
	}
}

const mapStateToProps = (state: Store) => {
	return {
		title: state.title,
	};
};

const mapDispatchToProps = {
	updateTitle: changeTitle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
