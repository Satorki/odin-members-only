create table users ( id serial primary key, name varchar(255) not null, surname varchar(255) not null, nickname varchar(255) not null, status varchar(255) not null, password varchar(255) not null);

create table messages ( id serial primary key, title varchar(255) not null, content varchar(255) not null, name varchar(255) not null, date varchar(255) not null);

alter table messages rename column name to name_id;
alter table messages alter column name_id type integer using name_id::integer;

create table members ( id serial primary key, status_name varchar(255) not null);

insert into members (status_name) values ('Low'), ('Medium'), ('High');