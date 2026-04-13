
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("contacts", (table)=>{
        table.uuid("id").primary();
        table.string("name").nullable();
        table.string("email").nullable();
        table.string("phone_number").nullable();
        table.text("subject").nullable();
        table.text("description").nullable();
        table.enum("status",['pending', 'resolved', 'rejected']).defaultTo('pending');
        table.boolean("is_active").defaultTo(false);
        table.timestamps(true, true);
    })
  
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("contacts");
}
