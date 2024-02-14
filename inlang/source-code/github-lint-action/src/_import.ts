import path from "node:path"
import crypto from "node:crypto"
import fs from "node:fs/promises"
import { normalizePath } from "@lix-js/fs"
import type { ImportFunction } from "@inlang/sdk"

/**
 * Wraps the import function to inject the base path.
 *
 * The wrapping is necessary to resolve relative imports.
 */
export function _import(basePath: string): ImportFunction {
	return (uri: string) => {
		if (uri.startsWith("./")) {
			return createImport(normalizePath(basePath + "/" + uri.slice(2)))
		}
		return createImport(uri)
	}
}

const createImport = async (uri: string) => {
	try {
		const module = await import("./../../../../module.js")
		console.log("module imported")
		console.log(module.default.add(1, 2))
	} catch (err) {
		console.log(err)
	}

	if (!uri.startsWith("http")) {
		// support for local modules
		return import(normalizePath(process.cwd() + "/" + uri))
	}

	const moduleAsText = await (await fetch(uri)).text()
	const moduleWithMimeType = "data:application/javascript," + encodeURIComponent(moduleAsText)

	try {
		const module = await import(moduleWithMimeType)
		console.log("module imported")
		console.log(module.default)
	} catch (err) {
		console.log(err)
	}

	// 1. absolute path "/"
	// 2. hash the uri to remove directory blabla stuff and add .mjs to make node load the module as ESM
	// const interimPath = path.resolve(
	// 	process.cwd() + "/" + crypto.createHash("sha256").update(uri).digest("hex") + ".js"
	// )

	// await fs.writeFile(interimPath, moduleWithMimeType, { encoding: "utf-8" })

	// // check if module exists
	// fs.access("./" + crypto.createHash("sha256").update(uri).digest("hex") + ".js", fs.constants.F_OK)
	// 	.then(() => {
	// 		console.log("module exists")
	// 	})
	// 	.catch(() => {
	// 		throw new Error("module does not exist")
	// 	})

	// let module
	// try {
	// 	module = await import("./" + crypto.createHash("sha256").update(uri).digest("hex") + ".js")
	// 	console.log("module imported")
	// 	console.log(module.default)
	// } catch (err) {
	// 	console.log(err)
	// }

	return module
}
