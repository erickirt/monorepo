import { parse } from "./messageReferenceMatchers.js"
import type { PluginOptions } from "../settings.js"
import type { Plugin } from "@inlang/plugin"

export const ideExtensionConfig =
	(options: PluginOptions): Plugin["addAppSpecificApi"] =>
	() => ({
		"inlang.ide-extension": {
			messageReferenceMatchers: [
				async (sourceCode: string) => {
					return parse(sourceCode, options)
				},
			],
			extractMessageOptions: [
				{
					callback: (messageId: string) => `{t("${messageId}")}`,
				},
			],
			documentSelectors: [
				{
					language: "javascript",
				},
				{
					language: "typescript",
				},
				{
					language: "svelte",
				},
			],
		},
	})
