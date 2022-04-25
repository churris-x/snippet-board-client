import { useState } from "react";
import AceEditor from "react-ace";
import { Button, Container, Typography, Box, Paper, InputLabel, TextField } from '@mui/material';

import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

const languages = [
	"javascript", "java", "python", "xml", "ruby", "sass", "markdown",
	"mysql", "json", "html", "handlebars", "golang", "csharp", "elixir",
	"typescript", "css", "plain_text", 'jsx'
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
	const [syntax, setSyntax] = useState('plain_text');

	const handleSyntax = newValue => {
		setSyntax(newValue);
		onSyntaxChange(newValue);
	};

	return (
		<Paper variant="outlined" sx={{ p: 1.75 }}>
			<AceEditor
				placeholder="Start coding!"
				mode={syntax}
				theme="monokai"
				value={value}
				width={{}}
				wrapEnabled={true}
				// showGutter={false}
				fontSize={17}
				style={{
					borderRadius: 4,
					width: '100%'
				}}
				showPrintMargin={false}
				onChange={onChange}
				editorProps={{ $blockScrolling: true }}
			/>
		</Paper>
	);
};
