use mydb;

DROP DATABASE mydb;

insert into tipo (tipo) values ('entrenador');
insert into tipo (tipo) values ('atleta');


insert into usuario (nombre,tipo_idtipo,correo,contra) 
values ('Sin Entrenador',1,'prueba@gmail.com','123');

insert into usuario (nombre,apellido, fechaNacimiento,sexo, peso,altura,tipo_idtipo,correo,contra,usuario_idusuario) 
values ('jackelin','montenegro',STR_TO_DATE('19/04/1999','%d/%m/%Y'),'h',155,168,1,'prueba2@gmail.com','123',1);

insert into usuario (nombre,apellido, fechaNacimiento,sexo, peso,altura,tipo_idtipo,correo,contra,usuario_idusuario) 
values ('julio','lopez',STR_TO_DATE('19/04/1999','%d/%m/%Y'),'m',155,168,2,'prueba3@gmail.com','123',1);

update usuario as u, (select idusuario as id from usuario where nombre = 'jackelin') as b
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

select * from temperatura;

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

insert into temperatura (temperatura, usuario_idusuario,fecha) values (40.01,2,STR_TO_DATE('01012013 113010','%d%m%Y %h%i%s'));

insert into ritmo (ritmo, usuario_idusuario,fecha) values (170,2,STR_TO_DATE('01012013 113010','%d%m%Y %h%i%s'));

insert into temperatura (temperatura, usuario_idusuario,fecha) values (35.0,2,STR_TO_DATE('01012013','%d%m%Y'));

select cast(fecha as date)  from temperatura;
 


select b.temperatura, b.fecha from 
(select usuario_idusuario, temperatura, fecha from temperatura where usuario_idusuario = 2 order by usuario_idusuario asc limit 10) as b 
order by b.usuario_idusuario asc;

select usuario_idusuario, temperatura, fecha from temperatura where usuario_idusuario = 2 order by idtemperatura desc limit 10;

select usuario_idusuario, avg(temperatura), max(temperatura),min(temperatura) from temperatura where usuario_idusuario = 2 group by usuario_idusuario;

--  PROYECTO --

select * from entrenamiento;
select * from repeticion;
select * from velocidad;


-- INICIO

insert into entrenamiento (usuario_idusuario) values (2);

insert into repeticion (numero, entrenamiento_identrenamiento) 
select 1, identrenamiento 
from entrenamiento
order by identrenamiento desc
limit 1;
 
 -- COMPLETAR REPETICION
 
 update repeticion as re, (select  idrepeticion as ultimoid
from repeticion
order by idrepeticion desc
limit 1) as ure
 set re.distanciaTotal = 15.5, re.fechadistancia = STR_TO_DATE('01012013 113010','%d%m%Y %h%i%s')
 where re.idrepeticion = ure.ultimoid;
 
 insert into repeticion (numero, entrenamiento_identrenamiento) 
select 2, identrenamiento 
from entrenamiento
order by identrenamiento desc
limit 1;

--  FALLO

 update repeticion as re, (select  idrepeticion as ultimoid
from repeticion
order by idrepeticion desc
limit 1) as ure
 set re.distanciaTotal = 15.5, re.fechadistancia = STR_TO_DATE('01012013 113010','%d%m%Y %h%i%s'), re.fallo = 1
 where re.idrepeticion = ure.ultimoid;
 
 update entrenamiento as re, (select  numero as ultimo
from repeticion
order by idrepeticion desc
limit 1) as ure, (select identrenamiento as ultimoid
from entrenamiento
order by identrenamiento desc
limit 1) as uen
 set re.repeticion = ure.ultimo, re.fecha = STR_TO_DATE('01012013 113010','%d%m%Y %h%i%s'), re.estado = 1
 where re.identrenamiento = uen.ultimoid;
 
 -- RENDIR
 
  update repeticion as re, (select  idrepeticion as ultimoid
from repeticion
order by idrepeticion desc
limit 1) as ure
 set re.distanciaTotal = 15.5, re.fechadistancia = STR_TO_DATE('01012013 113010','%d%m%Y %h%i%s'), re.rendir = 1
 where re.idrepeticion = ure.ultimoid;
 
 
 update entrenamiento as re, (select  numero as ultimo
from repeticion
order by idrepeticion desc
limit 1) as ure, (select identrenamiento as ultimoid
from entrenamiento
order by identrenamiento desc
limit 1) as uen
 set re.repeticion = ure.ultimo, re.fecha = STR_TO_DATE('01012013 113010','%d%m%Y %h%i%s'), re.estado = 2
 where re.identrenamiento = uen.ultimoid;
 
 -- VELOCIDAD
 
insert into velocidad (velocidad,fecha, repeticion_idrepeticion) 
select 12,STR_TO_DATE('01012013 113010','%d%m%Y %h%i%s'), idrepeticion 
from repeticion
order by idrepeticion desc
limit 1;
 
 -- COMPLETO EL ENTRENAMIENTO
 
 update entrenamiento as re, (select  numero as ultimo
from repeticion
order by idrepeticion desc
limit 1) as ure, (select identrenamiento as ultimoid
from entrenamiento
order by identrenamiento desc
limit 1) as uen
 set re.repeticion = ure.ultimo, re.fecha = STR_TO_DATE('01012013 113010','%d%m%Y %h%i%s'), re.estado = 3
 where re.identrenamiento = uen.ultimoid;
 
 -- CONTEO X REPETICIONES
select en.identrenamiento, en.usuario_idusuario, en.repeticion, en.estado, en.fecha 
from entrenamiento as en
where  en.usuario_idusuario = 2; 

-- REPETICIONES X SEMANA

select avg(en.repeticion), max(en.repeticion), min(en.repeticion), en.fecha 
from entrenamiento as en
where  en.usuario_idusuario = 2
and cast(en.fecha as date) BETWEEN '2013-01-01' AND '2013-01-02'
group by en.fecha ; 

-- DETALLE X ENTRENAMIENTO

select re.idrepeticion, avg(ve.velocidad),min(ve.velocidad),max(ve.velocidad), re.distanciaTotal
from entrenamiento as en, repeticion as re, velocidad as ve
where en.identrenamiento = re.entrenamiento_identrenamiento
and re.idrepeticion = ve.repeticion_idrepeticion
and en.identrenamiento = 3
group by re.idrepeticion,re.distanciaTotal;

-- esta falta no se que me estara fallando

select re.idrepeticion, avg(ve.velocidad),min(ve.velocidad),max(ve.velocidad), re.distanciaTotal
from repeticion as re, velocidad as ve, entrenamiento as en
where re.idrepeticion = ve.repeticion_idrepeticion
and en.identrenamiento = re.entrenamiento_identrenamiento
group by re.idrepeticion;

-- CONTEO X ENTRENAMIENTO

select en.identrenamiento,  en.repeticion, en.estado
from entrenamiento as en
where  en.usuario_idusuario = 2
and en.estado = 1; 

select en.identrenamiento,  en.repeticion, en.estado
from entrenamiento as en
where  en.usuario_idusuario = 2
and en.estado = 2; 

select en.identrenamiento,  en.repeticion, en.estado
from entrenamiento as en
where  en.usuario_idusuario = 2
and en.estado = 3; 

select en.identrenamiento,  en.repeticion, en.estado
from entrenamiento as en
where  en.usuario_idusuario = 2
and en.estado = 0; 

-- VELOCIDAD X TIEMPOREAL

select * from (select ve.idvelocidad, ve.velocidad as velocidad, CAST(ve.fecha AS TIME) as fecha
from entrenamiento as en, repeticion as re, velocidad as ve
where en.identrenamiento = re.entrenamiento_identrenamiento
and re.idrepeticion = ve.repeticion_idrepeticion
and en.usuario_idusuario = 2
order by ve.idvelocidad desc
limit 10) as b
order by b.idvelocidad asc;

-- CUANTOS COMPLETOS, FALLIDOS, RENDIDO HAY

select count(en.identrenamiento)
from entrenamiento as en
where  en.usuario_idusuario = 2
and en.estado = 1; 

select count(en.identrenamiento)
from entrenamiento as en
where  en.usuario_idusuario = 2
and en.estado = 2; 

select count(en.identrenamiento)
from entrenamiento as en
where  en.usuario_idusuario = 2
and en.estado = 3; 

-- DISTANCIA

select re.idrepeticion, re.distanciaTotal
from entrenamiento as en, repeticion as re
where en.identrenamiento = re.entrenamiento_identrenamiento
and en.identrenamiento = 3
group by re.idrepeticion,re.distanciaTotal;

select en.identrenamiento, sum(re.distanciaTotal )
from entrenamiento as en, repeticion as re
where en.identrenamiento = re.entrenamiento_identrenamiento
and en.identrenamiento = 3
group by en.identrenamiento;

-- REPETICION ACTUAL

select  numero as ultimoid
from repeticion
order by idrepeticion desc
limit 1;
