export function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table.uuid("id").primary();

    table.string("fullName", 255).nullable();
    table.string("email", 255).unique().nullable();
    table.string("password", 255).nullable();
    table.enum("role", ["admin", "user"]).nullable();
    table.boolean("is_active").nullable().defaultTo(false);

    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable("users");
}