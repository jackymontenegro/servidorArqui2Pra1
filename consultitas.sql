use mydb;

insert into tipo (tipo) values ('entrenador');
insert into tipo (tipo) values ('atleta');


insert into usuario (nombre,tipo_idtipo,correo,contra) 
values ('Sin Entrenador',1,'prueba@gmail.com','123');

insert into usuario (nombre,apellido, fechaNacimiento,sexo, peso,altura,tipo_idtipo,correo,contra,usuario_idusuario) 
values ('jackelin','montenegro',STR_TO_DATE('19/04/1999','%d/%m/%Y'),'h',155,168,1,'prueba2@gmail.com','123',1);

insert into usuario (nombre,apellido, fechaNacimiento,sexo, peso,altura,tipo_idtipo,correo,contra,usuario_idusuario) 
values ('julio','lopez',STR_TO_DATE('19/04/1999','%d/%m/%Y'),'m',155,168,2,'prueba3@gmail.com','123',1);

update usuario as u, (select idusuario as id from usuario where nombre = 'jacky') as b
set u.usuario_idusuario = b.id
where u.idusuario = 3;

update usuario
set activo = 1
where idusuario = 2;

update usuario
set activo = 0
where idusuario = 2;

select b.nombre, b.fecha, b.peso,b.altura,b.tipo,b.correo,b.contra,c.nombre as entrenador from
(select u.nombre as nombre, u.fechaNacimiento as fecha,u.peso as peso,u.altura as altura,t.tipo as tipo,u.correo as correo
,u.contra as contra, u.usuario_idusuario as entrenador
from usuario as u, tipo as t
where u.tipo_idtipo = t.idtipo
and u.correo = 'test@correo.com'
and u.contra = 'test') as b, (select u.idusuario as id, u.nombre  as nombre
from usuario as u
where u.tipo_idtipo = 1 ) as c
where b.entrenador = c.id;

select u.idusuario, u.nombre 
from usuario as u
where u.tipo_idtipo = 1
and u.idusuario not like 1;

insert into temperatura (temperatura, usuario_idusuario) values (35.5,2);

select * from usuario;

select b.nombre, b.fecha, b.peso,b.altura,b.tipo,b.correo,b.contra,c.nombre as entrenador from
(select u.nombre as nombre, u.fechaNacimiento as fecha,u.peso as peso,u.altura as altura,t.tipo as tipo,u.correo as correo
,u.contra as contra, u.usuario_idusuario as entrenador
from usuario as u, tipo as t
where u.tipo_idtipo = t.idtipo) as b, (select u.idusuario as id, u.nombre  as nombre
from usuario as u
where u.tipo_idtipo = 1 ) as c
where b.entrenador = c.id;

select idusuario from usuario where activo = 1;

select u.idusuario, u.nombre,u.apellido from usuario as u   where u.tipo_idtipo = 1  and u.idusuario not like 1;

select u.idusuario, u.nombre as nombre, u.fechaNacimiento as fecha,u.peso as peso,u.altura as altura,t.tipo as tipo,u.correo as correo
,u.contra as contra, u.usuario_idusuario as entrenador
from usuario as u, tipo as t
where u.tipo_idtipo = t.idtipo and u.idusuario not like 1 and u.usuario_idusuario = 2;

select b.nombre,b.apellido, b.fecha,b.sexo, b.peso,b.altura,b.tipo,b.correo,b.contra,c.nombre as entrenador 
from (select u.nombre as nombre,u.apellido as apellido, u.fechaNacimiento as fecha,u.sexo as sexo,u.peso as peso,u.altura as altura,t.tipo as tipo,u.correo as correo ,
u.contra as contra, u.usuario_idusuario as entrenador from usuario as u, tipo as t  where u.tipo_idtipo = t.idtipo 
and u.correo = 'prueba2@gmail.com' and u.contra = '123') as b, (select u.idusuario as id, u.nombre  as nombre 
from usuario as u  where u.tipo_idtipo = 1 ) as c  where b.entrenador = c.id;

insert into temperatura (temperatura, usuario_idusuario,fecha) values (35.5,2,STR_TO_DATE('19/04/1999','%d/%m/%Y'));