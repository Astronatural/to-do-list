CREATE TABLE "chores" (
	"id" serial primary key,
	"task" varchar(250) not null,
	"status" varchar(1) default 'n'
);

SELECT * FROM "chores" ORDER BY "id";

INSERT INTO "chores" ("task")
VALUES('Wash the dishes');


INSERT INTO "chores" ("task")
VALUES('Shovel the driveway');


INSERT INTO "chores" ("task")
VALUES('Feed the cat');


INSERT INTO "chores" ("task")
VALUES('Make dinner');


INSERT INTO "chores" ("task")
VALUES('Buy groceries');


INSERT INTO "chores" ("task")
VALUES('Get the mail');


INSERT INTO "chores" ("task")
VALUES('Pay bills');


INSERT INTO "chores" ("task")
VALUES('Call your mother');
