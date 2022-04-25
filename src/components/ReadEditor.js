import { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-jsx";

const languages = [
	"javascript", "java", "python", "xml", "ruby", "sass", "markdown",
	"mysql", "json", "html", "handlebars", "golang", "csharp", "elixir",
	"typescript", "css",
];

const themes = [
	"monokai",
];

languages.forEach(lang => {
	require(`ace-builds/src-noconflict/mode-${lang}`);
	require(`ace-builds/src-noconflict/snippets/${lang}`);
});
themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

export const ReadEditor = ({ body = '' }) => {

	return (
		<AceEditor
			mode="jsx"
			theme="monokai"
			showGutter={false}
			height='200px'
			width='100%'
			style={{ padding: 10, borderRadius: 4 }}
			wrapEnabled={true}
			highlightActiveLine={false}
			focus={false}
			readOnly={true}
			value={body}
			editorProps={{ $blockScrolling: true }}
		/>
	);
};
