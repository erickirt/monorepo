import type { paraglideVitePlugin } from "@inlang/paraglide-js"

type VitePluginUserConfig = Parameters<typeof paraglideVitePlugin>[0]

export type UserConfig = VitePluginUserConfig & {
	/**
	 * The preprocessor rewrites any links in your markup
	 * and translates them according to the routing strategy.
	 *
	 * If you don't want this, you can disable it here.
	 *
	 * @default false
	 */
	disablePreprocessor?: boolean
}

/**
 * The full config for @inlang/paraglide-sveltekit.
 * Any values not provided by the user are filled in with defaults.
 */
export type Config = VitePluginUserConfig & {
	disablePreprocessor: boolean
}

/**
 * Takes in the config provided by the user and returns the full config used internally.
 * All values not provided by the user are filled in with defaults.
 *
 * @param userConfig The user config
 * @returns The internal full config
 */
export function resolveConfig(userConfig: UserConfig): Config {
	const fullConfig: Config = {
		...userConfig,
		disablePreprocessor: userConfig.disablePreprocessor ?? false,
	}

	return fullConfig
}
