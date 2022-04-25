import { useState } from "react";
import AceEditor from "react-ace";
import { Button, Container, Typography, Box, Paper, InputLabel, TextField, Grid, Select, MenuItem } from '@mui/material';

import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

const languages = [
	"plain_text", "javascript", 'jsx', "java", "python", "xml", "ruby", "sass", "markdown",
	"mysql", "json", "html", "handlebars", "golang", "csharp", "elixir",
	"typescript", "css",
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

export const Editor = ({ value = '', onChange = () => { }, onSyntaxChange = () => { } }) => {
	const [font, setFont] = useState('16');
	const [syntax, setSyntax] = useState('plain_text');

	const handleSyntax = event => {
		setSyntax(event.target.value);
		onSyntaxChange(event.target.value);
	};

	return (
		<Paper variant="outlined" sx={{ p: 1.75 }}>
			<Grid container spacing={2}>
				<Grid item>
					<TextField
						value={syntax}
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
						onChange={event => setFont(event.target.value)}
						select
						label="Font"
					>
						{['15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'].map(i => (
							<MenuItem key={i} value={i}>{i}</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={12} >
					<AceEditor
						placeholder="Start coding!"
						mode={syntax}
						theme="monokai"
						value={value}
						// width={{}}
						wrapEnabled={true}
						// showGutter={false}
						fontSize={Number(font)}
						style={{
							borderRadius: 4,
							width: '100%'
						}}
						showPrintMargin={false}
						onChange={onChange}
						editorProps={{ $blockScrolling: true }}
					/>
				</Grid>
			</Grid>
		</Paper>
	);
};
