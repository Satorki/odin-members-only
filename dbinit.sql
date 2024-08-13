create table users ( id serial primary key, name varchar(255) not null, surname varchar(255) not null, nickname varchar(255) not null, status varchar(255) not null, password varchar(255) not null);

create table messages ( id serial primary key, title varchar(255) not null, content varchar(255) not null, name varchar(255) not null, date varchar(255) not null);

alter table messages rename column name to name_id;
alter table messages alter column name_id type integer using name_id::integer;

insert into users (name, surname, nickname, status, password) values ('admin', 'admin', 'admin', 'admin', 'admin');