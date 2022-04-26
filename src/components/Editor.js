import { useEffect, useState } from "react";
import AceEditor from "react-ace";

import { Button, Container, Typography, Box, Paper, InputLabel, TextField, Grid, Select, MenuItem, ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import ChatIcon from '@mui/icons-material/Chat';
import WrapTextIcon from '@mui/icons-material/WrapText';

import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

const languages = [
	"plain_text", 'csharp', 'css', 'elixir', 'golang', 'html', 'java',
	'javascript', 'json', 'jsx', 'markdown', 'mysql', 'python', 'ruby', 'sass',
	'typescript', 'xml'
];
const themes = [
	"monokai", "github", "tomorrow", "kuroir", "twilight", "xcode",
	"textmate", "solarized_dark", "solarized_light", "terminal",
];

languages.forEach(lang => {
	require(`ace-builds/src-noconflict/mode-${lang}`);
	require(`ace-builds/src-noconflict/snippets/${lang}`);
});
themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

export const Editor = ({ value = '', onChange = () => { }, initialSyntax = 'plain_text', onSyntaxChange = () => { } }) => {
	const [font, setFont] = useState('16');
	const [tabSize, setTabSize] = useState('4');
	const [syntax, setSyntax] = useState('plain_text');
	const [theme, setTheme] = useState('monokai');
	const [formats, setFormats] = useState(() => ['gutter', 'numbers']);

	const handleFormat = (event, newFormats) => {
		setFormats(newFormats);
	};

	const handleSyntax = event => {
		setSyntax(event.target.value);
		onSyntaxChange(event.target.value);
	};

	useEffect(() => {
		setSyntax(initialSyntax);
	}, [initialSyntax]);

	return (

		<Grid container spacing={2}>
			<Grid item xs={3}>
				<TextField
					value={syntax}
					size="small"
					onChange={handleSyntax}
					select
					label="Syntax"
					fullWidth
				>
					{languages.map(i => i === 'plain_text'
						? <MenuItem key={i} value={i}>text</MenuItem>
						: <MenuItem key={i} value={i}>{i}</MenuItem>
					)}
				</TextField>
			</Grid>
			<Grid item>
				<TextField
					value={font}
					size="small"
					onChange={event => setFont(event.target.value)}
					select
					label="Font"
				>
					{['15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'].map(i => (
						<MenuItem key={i} value={i}>{i}</MenuItem>
					))}
				</TextField>
			</Grid>

			<Grid item>

				<ToggleButtonGroup
					value={formats}
					onChange={handleFormat}
					aria-label="text formatting"
					// size="large"
					size="small"
				>
					<Tooltip value="numbers" title="Line numbers" placement="bottom">
						<ToggleButton value="numbers" aria-label="line numbers">
							<FormatListNumberedIcon />
						</ToggleButton>
					</Tooltip>

					<Tooltip value="gutter" title="Gutter" placement="bottom">
						<ToggleButton value="gutter" aria-label="editor gutter">
							<ChromeReaderModeIcon />
						</ToggleButton>
					</Tooltip>

					<Tooltip value="autocomplete" title="Autocomplete" placement="bottom">
						<ToggleButton value="autocomplete" aria-label="autocomplete">
							<ChatIcon />
						</ToggleButton>
					</Tooltip>

					<Tooltip value="wrap" title="Wrap text" placement="bottom">
						<ToggleButton value="wrap" aria-label="wrap text">
							<WrapTextIcon />
						</ToggleButton>
					</Tooltip>
				</ToggleButtonGroup>
			</Grid>
			<Grid item xs={3}>
				<TextField
					value={theme}
					size="small"
					onChange={event => setTheme(event.target.value)}
					select
					label="Theme"
					fullWidth
				>
					{themes.map(i => <MenuItem key={i} value={i}>{i}</MenuItem>)}
				</TextField>
			</Grid>
			<Grid item>
				<TextField
					value={tabSize}
					size="small"
					onChange={event => setTabSize(event.target.value)}
					select
					label="Tab"
				>
					{['2', '4'].map(i => (
						<MenuItem key={i} value={i}>{i}</MenuItem>
					))}
				</TextField>
			</Grid>

			<Grid item xs={12} >
				<AceEditor
					placeholder="Start coding!"
					mode={syntax}
					theme={theme}
					value={value}
					wrapEnabled={!!formats.find(i => i === 'wrap')}
					showGutter={!!formats.find(i => i === 'gutter')}
					fontSize={Number(font)}
					style={{
						borderRadius: 4,
						width: '100%'
					}}
					showPrintMargin={false}
					onChange={onChange}
					editorProps={{ $blockScrolling: true }}
					setOptions={{
						showLineNumbers: !!formats.find(i => i === 'numbers'),
						tabSize: tabSize,
						enableBasicAutocompletion: !!formats.find(i => i === 'autocomplete'),
						enableLiveAutocompletion: !!formats.find(i => i === 'autocomplete'),
						enableSnippets: !!formats.find(i => i === 'autocomplete'),
						// navigateWithinSoftTabs: true,
					}}
				/>
			</Grid>
		</Grid>
	);
};
