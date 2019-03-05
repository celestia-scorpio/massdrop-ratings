module.exports = {
  schema: `CREATE TABLE reviews(\
      id serial primary key,\
      date date,\
      review_star_rating integer,\
      review_item_rating integer,\
      comments jsonb,\
      author_id integer,\
      author_name varchar(400),\
      body text,\
      likes integer\
  );`,
};
