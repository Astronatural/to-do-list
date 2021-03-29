CREATE TABLE "chores" (
	"id" serial primary key,
	"task" varchar(250) not null,
	"status" varchar(1) default 'n'
);

SELECT * FROM "chores" ORDER BY "id";

INSERT INTO "chores" ("task", "status")
VALUES('Wash the dishes', 'n');


INSERT INTO "chores" ("task", "status")
VALUES('Shovel the driveway', 'n');


INSERT INTO "chores" ("task", "status")
VALUES('Feed the cat', 'n');


INSERT INTO "chores" ("task", "status")
VALUES('Make dinner', 'n');


INSERT INTO "chores" ("task", "status")
VALUES('Buy groceries', 'n');


INSERT INTO "chores" ("task", "status")
VALUES('Get the mail', 'n');


INSERT INTO "chores" ("task", "status")
VALUES('Pay bills', 'n');


INSERT INTO "chores" ("task", "status")
VALUES('Call your mother', 'n');