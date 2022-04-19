import { Color } from './';

export const Layout = {
	margin: 16,
	padding: 16,
	screen: {
		display: 'flex',
		padding: 16,
		backgroundColor: Color.backgroundColor,
	},
	title: { color: Color.highlight, fontSize: 30, fontWeight: 'bold' },
	body: { color: Color.text, fontSize: 18 },
};