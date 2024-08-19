import type { LixPlugin } from "@lix-js/sdk";
import { contentFromDatabase, loadDatabaseInMemory } from "sqlite-wasm-kysely";
import { initKysely } from "../database/initKysely.js";
import { getLastChildOfChange } from "./utilities/getLastChildOfChange.js";

export const applyChanges: LixPlugin["applyChanges"] = async ({
	lix,
	file,
	changes,
}) => {
	if (file.path?.endsWith("db.sqlite") === false) {
		throw new Error(
			"Unimplemented. Only the db.sqlite file can be handled for now."
		);
	}
	const sqlite = await loadDatabaseInMemory(file.data);
	const db = initKysely({ sqlite });

	for (const change of changes) {
		// given that the inlang plugin stores snapshots,
		// taking the last snapshot of the change should be good enough
		const lastChange = await getLastChildOfChange({ change, lix });

		// deletion
		if (lastChange.value === undefined) {
			if (lastChange.parent_id === undefined) {
				throw Error(
					"Unexpected state: change is a deletion but has no parent (insertion)"
				);
			}
			const parent = await lix.db
				.selectFrom("change")
				.selectAll()
				.where("id", "=", lastChange.parent_id)
				.executeTakeFirstOrThrow();

			await db
				.deleteFrom(lastChange.type as "bundle" | "message" | "variant")
				.where("id", "=", parent.value?.id as any)
				.execute();
		}
		// upsert the value
		else {
			await db
				.insertInto(lastChange.type as "bundle" | "message" | "variant")
				.values(lastChange.value as any)
				.onConflict((c) => c.column("id").doUpdateSet(lastChange.value as any))
				.execute();
		}
	}
	return { fileData: contentFromDatabase(sqlite) };
};
