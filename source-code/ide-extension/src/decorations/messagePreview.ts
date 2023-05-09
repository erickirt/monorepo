import * as vscode from "vscode"
import { debounce } from "throttle-debounce"
import { query } from "@inlang/core/query"
import { state } from "../state.js"

const MAXIMUM_PREVIEW_LENGTH = 40
const messageReferenceMatchersDefault = [
	//@ts-ignore
	async (/** @type {{ "documentText": string; }} */ args) => {
		const regex = /(?<!\w){?i\(['"](?<messageId>\S+)['"]\)}?/gm
		const str = args.documentText
		let match
		const result = []

		while ((match = regex.exec(str)) !== null) {
			const startLine = (str.slice(0, Math.max(0, match.index)).match(/\n/g) || []).length + 1
			const startPos = match.index - str.lastIndexOf("\n", match.index - 1)
			const endPos =
				match.index + match[0].length - str.lastIndexOf("\n", match.index + match[0].length - 1)
			const endLine =
				(str.slice(0, Math.max(0, match.index + match[0].length)).match(/\n/g) || []).length + 1

			if (match.groups && "messageId" in match.groups) {
				result.push({
					messageId: match.groups["messageId"],
					position: {
						start: {
							line: startLine,
							character: startPos,
						},
						end: {
							line: endLine,
							character: endPos,
						},
					},
				})
			}
		}
		return result
	},
]

export async function messagePreview(args: {
	activeTextEditor: vscode.TextEditor
	context: vscode.ExtensionContext
}) {
	const { context } = args
	let activeTextEditor = vscode.window.activeTextEditor

	const messagePreview = vscode.window.createTextEditorDecorationType({
		after: {
			margin: "0 0.5rem",
		},
	})

	updateDecorations()

	async function updateDecorations() {
		if (!activeTextEditor) {
			return
		}

		// TODO: this is a hack to prevent the message preview from showing up in the inlang.config.js file
		if (args.activeTextEditor.document.fileName.includes("inlang.config.js")) {
			return activeTextEditor.setDecorations(messagePreview, [])
		}

		// Get the reference language
		const { referenceLanguage } = state().config

		// Get the message reference matchers
		const messageReferenceMatchers =
			state().config.ideExtension?.messageReferenceMatchers || messageReferenceMatchersDefault
		if (referenceLanguage === undefined) {
			return vscode.window.showWarningMessage(
				"The `referenceLanguage` must be defined in the inlang.config.js to show patterns inline.",
			)
		}

		const ref = state().resources.find(
			(resource) => resource.languageTag.name === referenceLanguage,
		)
		if (!ref) {
			return vscode.window.showWarningMessage(
				`The reference language '${referenceLanguage}' is not defined in the inlang.config.js.`,
			)
		}

		// Get the message references
		const wrappedDecorations = messageReferenceMatchers.map(async (matcher) => {
			const messages = await matcher({
				documentText: args.activeTextEditor.document.getText(),
			})
			return messages.map((message) => {
				const translation = query(ref).get({
					id: message.messageId,
				})?.pattern.elements

				const translationText =
					translation && translation.length > 0 ? (translation[0]!.value as string) : undefined

				const truncatedTranslationText =
					translationText &&
					(translationText.length > (MAXIMUM_PREVIEW_LENGTH || 0)
						? `${translationText.slice(0, MAXIMUM_PREVIEW_LENGTH)}...`
						: translationText)
				const range = new vscode.Range(
					// VSCode starts to count lines and columns from zero
					new vscode.Position(
						message.position.start.line - 1,
						message.position.start.character - 1,
					),
					new vscode.Position(message.position.end.line - 1, message.position.end.character - 1),
				)
				const decoration: vscode.DecorationOptions = {
					range,
					renderOptions: {
						after: {
							contentText:
								truncatedTranslationText ??
								`ERROR: '${message.messageId}' not found in reference language '${referenceLanguage}'`,
							backgroundColor: translationText ? "rgb(45 212 191/.15)" : "drgb(244 63 94/.15)",
							border: translationText
								? "1px solid rgb(45 212 191/.50)"
								: "1px solid rgb(244 63 94/.50)",
						},
					},
					hoverMessage: translationText,
				}
				return decoration
			})
		})
		const decorations = (await Promise.all(wrappedDecorations || [])).flat()
		activeTextEditor.setDecorations(messagePreview, decorations)
	}

	const debouncedUpdateDecorations = debounce(500, updateDecorations)

	vscode.window.onDidChangeActiveTextEditor(
		(editor) => {
			if (editor) {
				activeTextEditor = editor
				debouncedUpdateDecorations()
			}
		},
		undefined,
		context.subscriptions,
	)

	vscode.workspace.onDidChangeTextDocument(
		(event) => {
			if (activeTextEditor && event.document === activeTextEditor.document) {
				updateDecorations()
			}
		},
		undefined,
		context.subscriptions,
	)
}
