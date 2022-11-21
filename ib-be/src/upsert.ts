import {
  InsertQueryBuilder,
  InsertResult,
  UpdateQueryBuilder,
  UpdateResult,
} from "kysely";

export default async <Database, Table extends keyof Database>(
  updateQuery: UpdateQueryBuilder<
    Database,
    Table,
    keyof Database,
    UpdateResult
  >,
  insertQuery: InsertQueryBuilder<Database, Table, InsertResult>
) => {
  const c = await updateQuery.executeTakeFirst();
  if (!c.numUpdatedRows) {
    await insertQuery.executeTakeFirst();
  }
  return true;
};
