const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool();
module.exports = {

  getProductById: function (id) {
    return pool.query(`SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price, JSON_AGG (json_build_object('feature', f.feature, 'value', f.value)) AS features FROM products AS p LEFT JOIN features AS f ON p.id = f.productid WHERE p.id=${id} GROUP BY p.id, p.name;`)
      .then(res => {
        return res.rows[0]
      })
      .catch(err => console.log('error executing query', err.stack))
  },

  getRelated: function (id) {
    return pool.query(`SELECT ARRAY_AGG(related_product_id) FROM related_products WHERE current_product_id = ${id};`)
      .then((res) => { return res.rows[0].array_agg })
      .catch(err => console.log('error executing query', err.stack))
  },

  getStyles: function (id) {
    return pool.query(`
   SELECT
      s.*,
      JSON_AGG(json_build_object('thumbnail_url', p.thumbnail_url, 'url', p.url)) AS photos,
      (
        SELECT JSON_AGG(json_build_object(id, (json_build_object('quantity', quantity, 'size', size))))
        AS skus
        FROM inventory  where s.style_id=inventory.styleid
     )
      FROM styles s
      LEFT JOIN photos p ON (s.style_id=p.styleid)
      WHERE s.product_id=${id}
      GROUP BY s.style_id;
`)
      .then((res) => { return res.rows[0] })
      .catch(err => console.log('error executing query', err.stack))
  },


}