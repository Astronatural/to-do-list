CREATE TABLE "chores" (
	"id" serial primary key,
	"task" varchar(250) not null,
	"status" varchar(1) default 'n'
);