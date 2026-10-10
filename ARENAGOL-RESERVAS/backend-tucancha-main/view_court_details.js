const { Client } = require('pg');
const c = new Client({
  host: 'aws-0-us-east-1.pooler.supabase.com',
  port: 5432,
  user: 'postgres.fartlyhtwqgklcvweetb',
  password: 'Tucancha20206',
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
});
async function main() {
  await c.connect();
  const courts = await c.query('SELECT c.id, c.name, c.type, c."isActive", c."clubId", c.schedule_template_id, cl.name as club_name, cl.status as club_status FROM court c LEFT JOIN club cl ON c."clubId" = cl.id');
  console.log("COURTS:");
  console.table(courts.rows);
  const clubs = await c.query('SELECT id, name, status FROM club');
  console.log("CLUBS:");
  console.table(clubs.rows);
  const tpls = await c.query('SELECT id, name, days, "clubId" FROM schedule_template');
  console.log("TEMPLATES:");
  console.table(tpls.rows);
  await c.end();
}
main().catch(console.error);
