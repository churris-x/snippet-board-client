import AceEditor from "react-ace";

import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

const languages = [
	"javascript", "java", "python", "xml", "ruby", "sass", "markdown",
	"mysql", "json", "html", "handlebars", "golang", "csharp", "elixir",
	"typescript", "css", "plain_text", 'jsx'
];

const themes = [
	"monokai", "github",
];

languages.forEach(lang => {
	require(`ace-builds/src-noconflict/mode-${lang}`);
	require(`ace-builds/src-noconflict/snippets/${lang}`);
});
themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

export const ReadEditor = ({ body = '', syntax = 'plain_text' }) => {

	const mode = languages.find(i => i === syntax) ? syntax : 'plain_text';

	return (
		<AceEditor
			mode={mode}
			theme={localStorage.getItem("theme") || 'monokai'}
			showGutter={false}
			height='200px'
			width='100%'
			style={{ borderRadius: 4 }}
			showPrintMargin={false}
			wrapEnabled={true}
			highlightActiveLine={false}
			focus={false}
			readOnly={true}
			value={body}
			editorProps={{ $blockScrolling: true }}
		/>
	);
};
