const express = require("express");
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());       

var mysql1 = require('mysql');
var mysqlConnection = mysql1.createConnection({
  host: "127.0.0.1",
  /*user: "arqui",
  password: "arquipractica1",
  database: "mydb"*/

  user: "jmontenegro",
  password: "123456",
  database: "mydb"

});

mysqlConnection.connect((err)=>{
  if(!err)
    console.log('DB CONNCTION')
    else
    console.log('DB FAILED' + JSON.stringify(err,undefined,2));
});

app.get('/', function (req, res) {
    res.send('inicio');
  });

app.get('/ejemplo/', function(req, res){

    //res.send(req.body);  

    var arraytimes = [];
    arraytimes.push('t1');
    arraytimes.push('t2');
    arraytimes.push('t3');


    var arraymed = [];
    arraymed.push('m1');
    arraymed.push('m2');
    arraymed.push('m3');



    var array = [];
    array.push(arraytimes);
    array.push(arraymed);

    console.log(array);
    var myJSON = JSON.stringify(array);
    console.log(myJSON);

    res.send(array);  

});  

  app.post('/registrarUsuario/', function(req, res){

    var usuario = req.body;

    var sql = "insert into usuario (nombre,apellido, fechaNacimiento,sexo, peso,altura,tipo_idtipo,correo,contra,usuario_idusuario)  values ('"+usuario.firstname+"','"+usuario.lastname+"',STR_TO_DATE('"+usuario.birthdate.split('-').reverse().join('/')+"','%d/%m/%Y'),'"+usuario.sex+"',"+usuario.weight+","+usuario.height+","+usuario.role+",'"+usuario.email+"','"+usuario.password+"',1);";
    console.log(sql);
    mysqlConnection.query(sql,(err, rows,fields)=>{
      if(!err){
      console.log(rows);

      res.json( [{"status":1}] );
    }else{
        console.log(err);
        res.json( [{"status":0}] );
  }
    });

    /*{
      "firstname":"usuario",
      "lastname":"usuarioapellido",
      "birthdate":"01/01/1990",
      "sex":"h",
      "weight":"110",
      "height":"1.50",
      "role":"2",
      "email":"test@correo.com",
      "password":"test"
      }
      */
  
  });  

  app.get('/cerrarSesion/', function (req, res) {

    //http://localhost:3000/cerrarSesion/?idusuario=2

    let idusuario = req.query.idusuario;
    console.log(idusuario);

    var sql = "update usuario set activo = 0 where idusuario = "+parseInt(idusuario)+";";
    console.log(sql);
    mysqlConnection.query(sql,(err, rows,fields)=>{
      if(!err){

      res.json( [{"status":1}] );

      
    }else{
        console.log(err);
        res.json( [{"status":0}] );
  }
    });
  });

  app.post('/iniciarSesion/', function(req, res){

    /*
    {
    "email":"test@correo.com",
    "password":"test"
    }
    */
    var usuario = req.body;

    var sql = "select b.status as status, b.idusuario as idusuario, b.nombre,b.apellido, b.fecha,b.sexo, b.peso,b.altura,b.tipo,b.correo,b.contra,c.nombre as entrenador from (select u.status as status,u.idusuario as idusuario,  u.nombre as nombre,u.apellido as apellido, cast(u.fechaNacimiento as date) as fecha,u.sexo as sexo,u.peso as peso,u.altura as altura,t.tipo as tipo,u.correo as correo , u.contra as contra, u.usuario_idusuario as entrenador from usuario as u, tipo as t  where u.tipo_idtipo = t.idtipo  and u.correo = '"+usuario.email+"' and u.contra = '"+usuario.password+"') as b, (select u.idusuario as id, u.nombre  as nombre from usuario as u  where u.tipo_idtipo = 1 ) as c  where b.entrenador = c.id;";
    console.log(sql);
    mysqlConnection.query(sql,(err, rows,fields)=>{
      if(!err){
      //console.log(rows.nombre);
      //console.log(typeof(rows));

      if(Object.entries(rows).length === 0){
        console.log('vacio');
        res.json( [{
          "status": "false",
          "idusuario": 0,
          "nombre": "",
          "apellido": "",
          "fecha": "",
          "sexo": "",
          "peso": 0,
          "altura": 0,
          "tipo": "",
          "correo": "",
          "contra": "",
          "entrenador": ""}] );
      }else{


        res.json(rows);

          var sql1 = "update usuario  set activo = 1  where correo = '"+usuario.email+"';";
          console.log(sql1);
          mysqlConnection.query(sql1,(err, rows,fields)=>{
          if(!err){
          console.log(rows);

      
    }else{
        console.log(err);
        res.json( [{
        "status": "false",
        "idusuario": 0,
        "nombre": "",
        "apellido": "",
        "fecha": "",
        "sexo": "",
        "peso": 0,
        "altura": 0,
        "tipo": "",
        "correo": "",
        "contra": "",
        "entrenador": ""}] );
  }
    });
      }
            

      
    }else{
        console.log(err);
        res.json( [{
          "status": "false",
          "idusuario": 0,
          "nombre": "",
          "apellido": "",
          "fecha": "",
          "sexo": "",
          "peso": 0,
          "altura": 0,
          "tipo": "",
          "correo": "",
          "contra": "",
          "entrenador": ""}] );
  }
    });

}); 

    app.post('/actualizarEntrenador/', function(req, res){

      /*
      {
      "identrenador":1,
      "idusuario": 2
      }
      */

        var usuario = req.body;
    
        var sql = "update usuario as u set u.usuario_idusuario = "+usuario.identrenador+"  where u.idusuario = "+usuario.idusuario+"; ";
        console.log(sql);
        mysqlConnection.query(sql,(err, rows,fields)=>{
          if(!err){
          console.log(rows.nombre);
          res.json( [{"status":1}] );
    
          
        }else{
            console.log(err);
            res.json( [{"status":0}] );
      }
        });
    }); 

    app.post('/temperatura/', function(req, res){

      /*
      {
      "idusuario": 2,
      "fecha": "26/02/2021",
      "temperatura": 2
      }
      */      

        var temperatura = req.body;
    
        var sql = "insert into temperatura (temperatura, usuario_idusuario,fecha) values ("+temperatura.temperatura+","+temperatura.idusuario+",STR_TO_DATE('"+temperatura.fecha+"','%d%m%Y %H%i%s'));";
        console.log(sql);
        mysqlConnection.query(sql,(err, rows,fields)=>{
          if(!err){
          console.log(rows.nombre);
          res.json( [{"status":1}] );
    
          
        }else{
            console.log(err);
            res.json( [{"status":0}] );
      }
        });
    }); 

    app.post('/ritmoCardiaco/', function(req, res){

      /*
      {
      "idusuario": 2,
      "fecha": "26/02/2021",
      "temperatura": 2
      }
      */   

      var ritmo = req.body;
  
      var sql = "insert into ritmo (ritmo, usuario_idusuario,fecha) values ("+ritmo.ritmo+","+ritmo.idusuario+",STR_TO_DATE('"+ritmo.fecha+"','%d%m%Y %H%i%s'));";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        console.log(rows.nombre);
        res.json( [{"status":1}] );
  
        
      }else{
          console.log(err);
          res.json( [{"status":0}] );
    }
      });
  }); 

  app.post('/oxigeno/', function(req, res){

    /*
      {
      "idusuario": 2,
      "fecha": "26/02/2021",
      "temperatura": 2
      }
      */   

    var oxigeno = req.body;

    var sql = "insert into oxigeno (oxigeno, usuario_idusuario,fecha) values ("+oxigeno.oxigeno+","+oxigeno.idusuario+",STR_TO_DATE('"+oxigeno.fecha+"','%d%m%Y %H%i%s'));";
    console.log(sql);
    mysqlConnection.query(sql,(err, rows,fields)=>{
      if(!err){
      console.log(rows.nombre);
      res.json( [{"status":1}] );

      
    }else{
        console.log(err);
        res.json( [{"status":0}] );
  }
    });
}); 

 

    app.get('/visualizarEntrenadores/', function(req, res){

      //http://localhost:3000/visualizarEntrenadores/
    
        var sql = "select u.idusuario as identrenador, u.nombre as nombre,u.apellido as apellido from usuario as u   where u.tipo_idtipo = 1  and u.idusuario not like 1;";
        console.log(sql);
        mysqlConnection.query(sql,(err, rows,fields)=>{
          if(!err){
          console.log(rows.nombre);
          res.json( rows);
    
          
        }else{
            console.log(err);
            res.json( [{
              "identrenador": 0,
              "nombre": "",
              "apellido": "",}] );
      }
        });
    }); 

    
    app.get('/visualizarUsuarios/', function(req, res){
    
        var sql = "select b.idusuario as idusuario, b.nombre as nombre, b.fecha as fecha, b.peso as peso,b.altura as altura,b.tipo as tipo,b.correo as correo,b.contra as contraseña,c.nombre as entrenador from  (select u.idusuario as idusuario, u.nombre as nombre, u.fechaNacimiento as fecha,u.peso as peso,u.altura as altura,t.tipo as tipo,u.correo as correo  ,u.contra as contra, u.usuario_idusuario as entrenador  from usuario as u, tipo as t  where u.tipo_idtipo = t.idtipo and u.tipo_idtipo = 2) as b, (select u.idusuario as id, u.nombre  as nombre  from usuario as u  where u.tipo_idtipo = 1 ) as c  where b.entrenador = c.id;";
        console.log(sql);
        mysqlConnection.query(sql,(err, rows,fields)=>{
          if(!err){
            console.log(rows.nombre);
            res.json( rows);
      
            
          }else{
              console.log(err);
              res.json(rows);
        }
        });
    });

    app.get('/visualizarUsuariosAsignados/', function(req, res){

      //http://localhost:3000/visualizarUsuariosAsignados/?idusuario=2
     
      let idusuario = req.query.idusuario;
      console.log(idusuario);
    
      var sql = "select u.status as status, u.idusuario as idusuario, u.nombre as nombre, u.apellido as apellido, u.fechaNacimiento as fecha,u.peso as peso,u.altura as altura,t.tipo as tipo,u.correo as correo ,u.contra as contra, u.usuario_idusuario as entrenador  from usuario as u, tipo as t  where u.tipo_idtipo = t.idtipo and u.idusuario not like 1 and u.usuario_idusuario = "+parseInt(idusuario)+";";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
          console.log(rows.nombre);
          res.json( rows);
    
          
        }else{
            console.log(err);
            res.json( [{
              "status": "false",
              "idusuario":0,
              "nombre": "",
              "apellido": "",
              "fecha": "",
              "sexo": "",
              "peso": 0,
              "altura": 0,
              "tipo": "",
              "correo": "",
              "contra": "",
              "entrenador": ""}] );
      }
      });
  });

   
    app.post('/Historial/', function (req, res) {

  
      var historial = req.body;

    

      if(parseInt(historial.tipo)== 1){
        //pulso

        var sql = "select b.ritmo, b.fecha from (select idritmo, ritmo, cast(fecha as time) as fecha from ritmo where usuario_idusuario = "+parseInt(historial.idusuario)+" order by idritmo desc limit 10) as b order by b.idritmo asc;";
        console.log(sql);
        mysqlConnection.query(sql,(err, rows,fields)=>{

          var arraytimes = [];
          var arraymed = [];
          var array = [];


         // Object.entries(rows).forEach(([key, value]) => console.log(`${key}: ${value.ritmo}`));
          Object.entries(rows).forEach(([key, value]) => arraymed.push(value.ritmo));

         // Object.entries(rows).forEach(([key, value]) => console.log(`${key}: ${value.fecha}`));
          Object.entries(rows).forEach(([key, value]) => arraytimes.push(value.fecha));

          array.push(arraytimes);
          array.push(arraymed);

          console.log(array);
          var myJSON = JSON.stringify(array);
          console.log(myJSON);
          if(!err){
          //console.log(rows.nombre);
          //console.log(typeof(rows));
          

          res.json( array);
    
          
          }else{
              console.log(err);
              res.json(array);
          }
        });

      }else if (parseInt(historial.tipo)== 2){
        //temperatura
      var sql = "select b.temperatura, b.fecha from (select idtemperatura, temperatura, cast(fecha as time) as fecha from temperatura where usuario_idusuario = "+parseInt(historial.idusuario)+" order by idtemperatura desc limit 10) as b order by b.idtemperatura asc;";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        var arraytimes = [];
        var arraymed = [];
        var array = [];


       // Object.entries(rows).forEach(([key, value]) => console.log(`${key}: ${value.ritmo}`));
        Object.entries(rows).forEach(([key, value]) => arraymed.push(value.temperatura));

       // Object.entries(rows).forEach(([key, value]) => console.log(`${key}: ${value.fecha}`));
        Object.entries(rows).forEach(([key, value]) => arraytimes.push(value.fecha));

        array.push(arraytimes);
        array.push(arraymed);

        console.log(array);
        var myJSON = JSON.stringify(array);
        console.log(myJSON);
        if(!err){
        //console.log(rows.nombre);
        //console.log(typeof(rows));
        

        res.json( array);
  
        
        }else{
            console.log(err);
            res.json(array);
        }
    });

      }else if (parseInt(historial.tipo)== 3){
        //oxigeno
      
        
       var sql = "select b.oxigeno, b.fecha from (select idoxigeno, oxigeno, cast(fecha as time) as fecha from oxigeno where usuario_idusuario = "+parseInt(historial.idusuario)+" order by idoxigeno desc limit 10) as b order by b.idoxigeno asc;";
       console.log(sql);
       mysqlConnection.query(sql,(err, rows,fields)=>{
         var arraytimes = [];
         var arraymed = [];
         var array = [];


        // Object.entries(rows).forEach(([key, value]) => console.log(`${key}: ${value.ritmo}`));
         Object.entries(rows).forEach(([key, value]) => arraymed.push(value.oxigeno));

        // Object.entries(rows).forEach(([key, value]) => console.log(`${key}: ${value.fecha}`));
         Object.entries(rows).forEach(([key, value]) => arraytimes.push(value.fecha));

         array.push(arraytimes);
         array.push(arraymed);

         console.log(array);
         var myJSON = JSON.stringify(array);
         console.log(myJSON);
         if(!err){
         //console.log(rows.nombre);
         //console.log(typeof(rows));
         

         res.json( array);
   
         
         }else{
             console.log(err);
             res.json(array);
         }
     });
       

      }

    });

    app.post('/TiempoReal/', function (req, res) {

  
      var historial = req.body;

    

      if(parseInt(historial.tipo)== 1){
        //pulso
        var sql = "select b.ritmo, b.fecha from (select idritmo, ritmo, cast(fecha as time) as fecha from ritmo where usuario_idusuario = "+parseInt(historial.idusuario)+" order by idritmo desc limit 20) as b order by b.idritmo asc;";
        console.log(sql);
        mysqlConnection.query(sql,(err, rows,fields)=>{

          var arraytimes = [];
          var arraymed = [];
          var array = [];


         // Object.entries(rows).forEach(([key, value]) => console.log(`${key}: ${value.ritmo}`));
          Object.entries(rows).forEach(([key, value]) => arraymed.push(value.ritmo));

         // Object.entries(rows).forEach(([key, value]) => console.log(`${key}: ${value.fecha}`));
          Object.entries(rows).forEach(([key, value]) => arraytimes.push(value.fecha));

          array.push(arraytimes);
          array.push(arraymed);

          console.log(array);
          var myJSON = JSON.stringify(array);
          console.log(myJSON);
          if(!err){
          //console.log(rows.nombre);
          //console.log(typeof(rows));
          

          res.json( array);
    
          
          }else{
              console.log(err);
              res.json(array);
          }
        });

      }else if (parseInt(historial.tipo)== 2){
        //temperatura
      var sql = "select b.temperatura, b.fecha from (select idtemperatura, temperatura, cast(fecha as time) as fecha from temperatura where usuario_idusuario = "+parseInt(historial.idusuario)+" order by idtemperatura desc limit 20) as b order by b.idtemperatura asc;";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        var arraytimes = [];
        var arraymed = [];
        var array = [];


       // Object.entries(rows).forEach(([key, value]) => console.log(`${key}: ${value.ritmo}`));
        Object.entries(rows).forEach(([key, value]) => arraymed.push(value.temperatura));

       // Object.entries(rows).forEach(([key, value]) => console.log(`${key}: ${value.fecha}`));
        Object.entries(rows).forEach(([key, value]) => arraytimes.push(value.fecha));

        array.push(arraytimes);
        array.push(arraymed);

        console.log(array);
        var myJSON = JSON.stringify(array);
        console.log(myJSON);
        if(!err){
        //console.log(rows.nombre);
        //console.log(typeof(rows));
        

        res.json( array);
  
        
        }else{
            console.log(err);
            res.json(array);
        }
    });

      }else if (parseInt(historial.tipo)== 3){
        //oxigeno
      
        
       var sql = "select b.oxigeno, b.fecha from (select idoxigeno, oxigeno, cast(fecha as time) as fecha from oxigeno where usuario_idusuario = "+parseInt(historial.idusuario)+" order by idoxigeno desc limit 20) as b order by b.idoxigeno asc;";
       console.log(sql);
       mysqlConnection.query(sql,(err, rows,fields)=>{
         var arraytimes = [];
         var arraymed = [];
         var array = [];


        // Object.entries(rows).forEach(([key, value]) => console.log(`${key}: ${value.ritmo}`));
         Object.entries(rows).forEach(([key, value]) => arraymed.push(value.oxigeno));

        // Object.entries(rows).forEach(([key, value]) => console.log(`${key}: ${value.fecha}`));
         Object.entries(rows).forEach(([key, value]) => arraytimes.push(value.fecha));

         array.push(arraytimes);
         array.push(arraymed);

         console.log(array);
         var myJSON = JSON.stringify(array);
         console.log(myJSON);
         if(!err){
         //console.log(rows.nombre);
         //console.log(typeof(rows));
         

         res.json( array);
   
         
         }else{
             console.log(err);
             res.json(array);
         }
     });
       

      }

    });

    app.post('/Medidas/', function (req, res) {

  
      var historial = req.body;

    

      if(parseInt(historial.tipo)== 1){
        //pulso
    
        var sql = "select usuario_idusuario, avg(ritmo) as promedio from ritmo where usuario_idusuario = "+parseInt(historial.idusuario)+" group by usuario_idusuario;";
        console.log(sql);
        mysqlConnection.query(sql,(err, rows,fields)=>{

          if(!err){
          //console.log(rows.nombre);
          //console.log(typeof(rows));
          

          res.json( rows);
    
          
          }else{
              console.log(err);
              res.json(rows);
          }
        });

      }else if (parseInt(historial.tipo)== 2){
        //temperatura
      var sql = "select usuario_idusuario, avg(temperatura) as promedio, max(temperatura) as maximo,min(temperatura) as minimo from temperatura where usuario_idusuario = "+parseInt(historial.idusuario)+" group by usuario_idusuario ;";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
          //console.log(rows.nombre);
          //console.log(typeof(rows));
          

          res.json( rows);
    
          
          }else{
              console.log(err);
              res.json(rows);
          }
    });

      }else if (parseInt(historial.tipo)== 3){
        //oxigeno
      
        
       var sql = "select usuario_idusuario, avg(oxigeno) as oxigeno from oxigeno where usuario_idusuario = "+parseInt(historial.idusuario)+" group by usuario_idusuario;";
       console.log(sql);
       mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
          //console.log(rows.nombre);
          //console.log(typeof(rows));
          

          res.json( rows);
    
          
          }else{
              console.log(err);
              res.json(rows);
          }
     });
       

      }

    });

    app.get('/usuarioLogueado/', function (req, res) {

      //http://localhost:3000/temperaturaPro/?idusuario=2
      //var sql = "update usuario set activo = 0 where idusuario = "+parseInt(idusuario)+";";

      var sql = " select idusuario from usuario where activo = 1; ";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        //console.log(rows.nombre);
        //console.log(typeof(rows));
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json(rows);
    }
      });
    });

  app.listen(5000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
   });

   app.post('/inicioEntrenamiento/', function(req, res){

    /*
        {
        "idusuario": 2
        }
      */   
  
    var usuario = req.body;
  
    var sql = "insert into entrenamiento (usuario_idusuario) values ("+usuario.idusuario+"); ";
    console.log(sql);
    mysqlConnection.query(sql,(err, rows,fields)=>{
      if(!err){
      console.log(rows.nombre);
     // res.json( [{"status":1}] );
  
      var sql1 = "insert into repeticion (numero, entrenamiento_identrenamiento)  select 1, identrenamiento   from entrenamiento  order by identrenamiento desc  limit 1;;";
      console.log(sql1);
      mysqlConnection.query(sql1,(err, rows,fields)=>{
        if(!err){
        console.log(rows.nombre);
        res.json( [{"status":1}] );
  
        
    
        
      }else{
          console.log(err);
          res.json( [{"status":0}] );
    }
      });

  
      
    }else{
        console.log(err);
        res.json( [{"status":0}] );
  }
    });
  }); 
  

  app.post('/completarRepeticion/', function(req, res){

    /*
        {
        "idusuario": 2,
        "numeroRepeticion": 2,   #el numero de repeticion que comenzara
        "distancia": 5.1,        #la distancia de la repeticion que acaba de finalizar
        "fecha": "01012013 113010"    
        }
      */   
  
    var entrenamiento = req.body;
  
    var sql = " update repeticion as re, (select  idrepeticion as ultimoid from repeticion order by idrepeticion desc limit 1) as ure  set re.distanciaTotal = "+entrenamiento.distancia+", re.fechadistancia = STR_TO_DATE('"+entrenamiento.fecha+"','%d%m%Y %H%i%s')  where re.idrepeticion = ure.ultimoid;"; 
    console.log(sql);
    mysqlConnection.query(sql,(err, rows,fields)=>{
      if(!err){
      console.log(rows.nombre);
     // res.json( [{"status":1}] );
  
      var sql1 = "insert into repeticion (numero, entrenamiento_identrenamiento)  select "+entrenamiento.numeroRepeticion+", identrenamiento   from entrenamiento  order by identrenamiento desc  limit 1;";
      console.log(sql1);
      mysqlConnection.query(sql1,(err, rows,fields)=>{
        if(!err){
        console.log(rows.nombre);
        res.json( [{"status":1}] );
  
        
    
        
      }else{
          console.log(err);
          res.json( [{"status":0}] );
    }
      });

  
      
    }else{
        console.log(err);
        res.json( [{"status":0}] );
  }
    });
  }); 


  app.post('/finalizarEntrenamiento/', function(req, res){

    /*
        #hay tres formas de terminar el entrenamiento:
            1 = fallo
            2 = rendirse
            3 = completo el entrenamiento 
        {
        "idusuario": 2,
        "distancia": 5.1,        #la distancia de la repeticion que acaba de finalizar
        "fecha": "01012013 113010" 
        "tipo" : 1   
        }
      */   
  
    var entrenamiento = req.body;

    if(parseInt(entrenamiento.tipo)== 1){ //fallo

      var sql = "update repeticion as re, (select  idrepeticion as ultimoid  from repeticion  order by idrepeticion desc  limit 1) as ure set re.distanciaTotal = "+entrenamiento.distancia+", re.fechadistancia = STR_TO_DATE('"+entrenamiento.fecha+"','%d%m%Y %H%i%s'), re.fallo = 1  where re.idrepeticion = ure.ultimoid;"; 
    console.log(sql);
    mysqlConnection.query(sql,(err, rows,fields)=>{
      if(!err){
      console.log(rows.nombre);
     // res.json( [{"status":1}] );
  
      var sql1 = " update entrenamiento as re, (select  numero as ultimo   from repeticion  order by idrepeticion desc  limit 1) as ure, (select identrenamiento as ultimoid  from entrenamiento  order by identrenamiento desc  limit 1) as uen   set re.repeticion = ure.ultimo, re.fecha = STR_TO_DATE('"+entrenamiento.fecha+"','%d%m%Y %H%i%s'), re.estado = 1  where re.identrenamiento = uen.ultimoid;";
      console.log(sql1);
      mysqlConnection.query(sql1,(err, rows,fields)=>{
        if(!err){
        console.log(rows.nombre);
        res.json( [{"status":1}] );
  
        
    
        
      }else{
          console.log(err);
          res.json( [{"status":0}] );
    }
      });

  
      
    }else{
        console.log(err);
        res.json( [{"status":0}] );
  }
    });

    }else if(parseInt(entrenamiento.tipo)== 2){//rendirse

      var sql = "update repeticion as re, (select  idrepeticion as ultimoid  from repeticion  order by idrepeticion desc  limit 1) as ure set re.distanciaTotal = "+entrenamiento.distancia+", re.fechadistancia = STR_TO_DATE('"+entrenamiento.fecha+"','%d%m%Y %H%i%s'), re.rendir = 1  where re.idrepeticion = ure.ultimoid;"; 
    console.log(sql);
    mysqlConnection.query(sql,(err, rows,fields)=>{
      if(!err){
      console.log(rows.nombre);
     // res.json( [{"status":1}] );
  
      var sql1 = " update entrenamiento as re, (select  numero as ultimo   from repeticion  order by idrepeticion desc  limit 1) as ure, (select identrenamiento as ultimoid  from entrenamiento  order by identrenamiento desc  limit 1) as uen   set re.repeticion = ure.ultimo, re.fecha = STR_TO_DATE('"+entrenamiento.fecha+"','%d%m%Y %H%i%s'), re.estado = 2  where re.identrenamiento = uen.ultimoid;";
      console.log(sql1);
      mysqlConnection.query(sql1,(err, rows,fields)=>{
        if(!err){
        console.log(rows.nombre);
        res.json( [{"status":1}] );
  
        
    
        
      }else{
          console.log(err);
          res.json( [{"status":0}] );
    }
      });

  
      
    }else{
        console.log(err);
        res.json( [{"status":0}] );
  }
    });

    }else if(parseInt(entrenamiento.tipo)== 3){//completo entrenamiento


    var sql = " update repeticion as re, (select  idrepeticion as ultimoid from repeticion order by idrepeticion desc limit 1) as ure  set re.distanciaTotal = "+entrenamiento.distancia+", re.fechadistancia = STR_TO_DATE('"+entrenamiento.fecha+"','%d%m%Y %H%i%s')  where re.idrepeticion = ure.ultimoid;"; 
    console.log(sql);
    mysqlConnection.query(sql,(err, rows,fields)=>{
      if(!err){
      console.log(rows.nombre);
     // res.json( [{"status":1}] );
  
     var sql = "update entrenamiento as re, (select  numero as ultimo from repeticion  order by idrepeticion desc  limit 1) as ure, (select identrenamiento as ultimoid   from entrenamiento  order by identrenamiento desc  limit 1) as uen   set re.repeticion = ure.ultimo, re.fecha = STR_TO_DATE('"+entrenamiento.fecha+"','%d%m%Y %H%i%s'), re.estado = 3   where re.identrenamiento = uen.ultimoid;";
      console.log(sql1);
      mysqlConnection.query(sql1,(err, rows,fields)=>{
        if(!err){
        console.log(rows.nombre);
        res.json( [{"status":1}] );
  
        
    
        
      }else{
          console.log(err);
          res.json( [{"status":0}] );
    }
      });

  
      
    }else{
        console.log(err);
        res.json( [{"status":0}] );
  }
    });

      

    }
  
    
  }); 

  app.post('/velocidad/', function(req, res){

    /*
      {
      "idusuario": 2,
      "fecha": "26/02/2021",
      "velocidad": 2
      }
      */   

    var velocidad = req.body;

    var sql = "insert into velocidad (velocidad,fecha, repeticion_idrepeticion) select "+velocidad.velocidad+",STR_TO_DATE('"+velocidad.fecha+"','%d%m%Y %H%i%s'), idrepeticion from repeticion order by idrepeticion desc limit 1;";
    console.log(sql);
    mysqlConnection.query(sql,(err, rows,fields)=>{
      if(!err){
      console.log(rows.nombre);
      res.json( [{"status":1}] );

      
    }else{
        console.log(err);
        res.json( [{"status":0}] );
  }
    });
}); 

  app.post('/conteoxrepeticiones/', function(req, res){

    /*
      {
      "idusuario": 2
      }
      */
  
    var usuario = req.body;

      var sql = "select en.identrenamiento as identrenamiento, en.usuario_idusuario as idusuario, en.repeticion as repeticion, en.estado as estado, en.fecha as fecha  from entrenamiento as en  where  en.usuario_idusuario ="+usuario.idusuario+"; ";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        console.log(rows.nombre);
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json( [{
            "identrenamiento": 0,
            "idusuario": 0,
            "repeticion": 0,
            "estado": "",
            "fecha": ""}] );
    }
      });
  });

  app.post('/repeticionesxsemana/', function(req, res){

    /*
      {
      "idusuario": 2,
      "fechaInicial" : "",
      "fechaFinal" :""
      }
      */
  
    var usuario = req.body;

      var sql = "select avg(en.repeticion) as promedioRepeticion, max(en.repeticion) as maximoRepeticion, min(en.repeticion) as minimoRepeticion, en.fecha as fecha  from entrenamiento as en where  en.usuario_idusuario = "+usuario.idusuario+"  and cast(en.fecha as date) BETWEEN STR_TO_DATE('"+usuario.fechaInicial.split('-').reverse().join('/')+"','%d/%m/%Y') AND STR_TO_DATE('"+usuario.fechaFinal.split('-').reverse().join('/')+"','%d/%m/%Y')  group by en.fecha ;";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        console.log(rows.nombre);
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json( [{
            "promedioRepeticion": 0,
            "maximoRepeticion": 0,
            "minimoRepeticion": 0,
            "fecha": ""}] );
    }
      });
  });


  app.post('/detallexentrenamiento/', function(req, res){

    /*
      {
      "idusuario": 2,
      "fechaInicial" : "",
      "fechaFinal" :""
      }
      */
  
    var usuario = req.body;

      var sql = "select re.idrepeticion as idrepeticion, avg(ve.velocidad) as promedioVelocidad,min(ve.velocidad) as minimaVelocidad,max(ve.velocidad) as maximaVelocidad, re.distanciaTotal as distanciaTotal  from entrenamiento as en, repeticion as re, velocidad as ve   where en.identrenamiento = re.entrenamiento_identrenamiento  and re.idrepeticion = ve.repeticion_idrepeticion  and en.identrenamiento = "+usuario.identrenamiento +"  group by re.idrepeticion,re.distanciaTotal;";  
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        console.log(rows.nombre);
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json( [{
            "idrepeticion": 0,
            "promedioVelocidad": 0,
            "minimaVelocidad": 0,
            "maximaVelocidad": 0,
            "distanciaTotal": 0}] );
    }
      });
  });


  app.post('/conteoxentrenamiento/', function(req, res){

    /*#es un listado de los entrenamientos donde fallo, rindio, completo
        #hay 3 tipos de conteo
        1 =  fallo
        2 = rendicion
        3 = completo
      {
      "idusuario": 2,
      "estado" : 1
      }
      */
  
    var usuario = req.body;

      var sql = "select en.identrenamiento as identrenamiento,  en.repeticion as repeticion, en.estado as estado from entrenamiento as en  where  en.usuario_idusuario = "+usuario.idusuario+"  and en.estado = "+usuario.estado+"; ";  
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        console.log(rows.nombre);
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json( [{
            "identrenamiento": 0,
            "repeticion": 0,
            "estado": 0}] );
    }
      });
  });


  app.post('/totalxentrenamiento/', function(req, res){

    /*#es un total de los entrenamientos que fallo rindio o completo
        #hay 3 tipos de conteo
        1 =  fallo
        2 = rendicion
        3 = completo
      {
      "idusuario": 2,
      "estado" : 1
      }
      */
  
    var usuario = req.body;

      var sql = "select count(en.identrenamiento) as total  from entrenamiento as en  where  en.usuario_idusuario = "+usuario.idusuario+"  and en.estado = "+usuario.estado+"; ";  
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        console.log(rows.nombre);
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json( [{
            "total": 0}] );
    }
      });
  });


  app.post('/velocidadTR/', function(req, res){ //velocidad en tiempo real

    /*
      {
      "idusuario": 2
      }
      */
  
    var usuario = req.body;

      var sql = "select b.idvelocidad as idvelocidad, b.velocidad as velocidad,b.fecha as fecha from (select ve.idvelocidad, ve.velocidad as velocidad, CAST(ve.fecha AS TIME) as fecha   from entrenamiento as en, repeticion as re, velocidad as ve  where en.identrenamiento = re.entrenamiento_identrenamiento  and re.idrepeticion = ve.repeticion_idrepeticion  and en.usuario_idusuario = "+usuario.idusuario+"  order by ve.idvelocidad desc  limit 10) as b   order by b.idvelocidad asc;";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        console.log(rows.nombre);
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json( [{
            "idvelocidad": 0,
            "velocidad": 0,
            "fecha": ""}] );
    }
      });
  });


  app.post('/distancia/', function(req, res){ 

    /*
      #trae dos tipos de distancia
      1  = lista de distancias por repeticion
      2 = total de distancia por entrenamiento
      {
      "identrenamiento": 2,
      "tipo" : 1
      }
      */
  
    var usuario = req.body;

    if(parseInt(entrenamiento.tipo)== 1){ 

      var sql = "select re.idrepeticion as idrepeticion, re.distanciaTotal as distanciaTotal  from entrenamiento as en, repeticion as re  where en.identrenamiento = re.entrenamiento_identrenamiento  and en.identrenamiento = "+usuario.identrenamiento+"  group by re.idrepeticion,re.distanciaTotal;";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        console.log(rows.nombre);
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json( [{
            "idrepeticion": 0,
            "distanciaTotal": 0}] );
    }
      });

    } else if(parseInt(entrenamiento.tipo)== 2){ 

      var sql = "select en.identrenamiento as identrenamiento, sum(re.distanciaTotal ) as distanciaEntremiento  from entrenamiento as en, repeticion as re  where en.identrenamiento = re.entrenamiento_identrenamiento and en.identrenamiento = "+usuario.identrenamiento+"  group by en.identrenamiento;  ";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        console.log(rows.nombre);
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json( [{
            "idrepeticion": 0,
            "distanciaEntremiento": 0}] );
    }
      });

    }

      
  });

  app.get('/repeticionActual/', function(req, res){ //las repeticion en la que va el usuario


      var sql = "select  numero as repeticionactual  from repeticion  order by idrepeticion desc  limit 1;";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        console.log(rows.nombre);
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json( [{
            "repeticionactual": 0}] );
    }
      });
  });


   /*

       app.get('/ritmoHistorial/', function (req, res) {

      //http://localhost:3000/ritmoHistorial/?idusuario=2
  
      let idusuario = req.query.idusuario;
      console.log(idusuario);
  
      var sql = "select b.ritmo, b.fecha from (select usuario_idusuario, ritmo, fecha from ritmo where usuario_idusuario = "+parseInt(idusuario)+" order by usuario_idusuario desc limit 10) as b order by b.usuario_idusuario asc;";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        //console.log(rows.nombre);
        //console.log(typeof(rows));
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json(rows);
    }
      });
    });

    app.get('/oxigenoHistorial/', function (req, res) {

      //http://localhost:3000/oxigenoHistorial/?idusuario=2
  
      let idusuario = req.query.idusuario;
      console.log(idusuario);
  
      var sql = "select usuario_idusuario, oxigeno, fecha from oxigeno where usuario_idusuario = "+parseInt(idusuario)+";";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        //console.log(rows.nombre);
        //console.log(typeof(rows));
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json(rows);
    }
      });
    });

    app.get('/temperaturaHistorial/', function (req, res) {

      //http://localhost:3000/temperaturaHistorial/?idusuario=2
  
      let idusuario = req.query.idusuario;
      console.log(idusuario);
  
      var sql = "select usuario_idusuario, temperatura, fecha from temperatura where usuario_idusuario = "+parseInt(idusuario)+";";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        //console.log(rows.nombre);
        //console.log(typeof(rows));
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json(rows);
    }
      });
    });
*/

/*

 app.get('/ritmoTR/', function (req, res) {

      //http://localhost:3000/ritmoTR/?idusuario=2
  
      let idusuario = req.query.idusuario;
      console.log(idusuario);
  
      var sql = "select usuario_idusuario, ritmo, fecha from ritmo where usuario_idusuario = "+parseInt(idusuario)+" order by idritmo desc limit 1;";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        //console.log(rows.nombre);
        //console.log(typeof(rows));
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json(rows);
    }
      });
    });


    app.get('/oxigenoTR/', function (req, res) {

      //http://localhost:3000/oxigenoTR/?idusuario=2
  
      let idusuario = req.query.idusuario;
      console.log(idusuario);
  
      var sql = "select usuario_idusuario, oxigeno, fecha from oxigeno where usuario_idusuario = "+parseInt(idusuario)+" order by idoxigeno desc limit 1;";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        //console.log(rows.nombre);
        //console.log(typeof(rows));
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json(rows);
    }
      });
    });

    app.get('/temperaturaTR/', function (req, res) {

      //http://localhost:3000/temperaturaTR/?idusuario=2
  
      let idusuario = req.query.idusuario;
      console.log(idusuario);
  
      var sql = "select usuario_idusuario, temperatura, fecha from temperatura where usuario_idusuario = "+parseInt(idusuario)+" order by idtemperatura desc limit 1;";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        //console.log(rows.nombre);
        //console.log(typeof(rows));
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json(rows);
    }
      });
    });

    */



   /* app.post('/ritmoPro/', function (req, res) {

      //http://localhost:3000/ritmoPro/?idusuario=2
  
      let idusuario = req.query.idusuario;
      console.log(idusuario);
  
      var sql = "select usuario_idusuario, avg(ritmo) from ritmo where usuario_idusuario = "+parseInt(idusuario)+" group by usuario_idusuario;";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        //console.log(rows.nombre);
        //console.log(typeof(rows));
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json(rows);
    }
      });
    });

    app.get('/oxigenoPro/', function (req, res) {

      //http://localhost:3000/oxigenoPro/?idusuario=2
  
      let idusuario = req.query.idusuario;
      console.log(idusuario);
  
      var sql = "select usuario_idusuario, avg(oxigeno) from oxigeno where usuario_idusuario = "+parseInt(idusuario)+" group by usuario_idusuario;";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        //console.log(rows.nombre);
        //console.log(typeof(rows));
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json(rows);
    }
      });
    });

    app.get('/temperaturaMax/', function (req, res) {

      //http://localhost:3000/temperaturaPro/?idusuario=2
  
      let idusuario = req.query.idusuario;
      console.log(idusuario);
  
      var sql = "select usuario_idusuario, max(temperatura) from temperatura where usuario_idusuario = "+parseInt(idusuario)+" group by usuario_idusuario ; ";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        //console.log(rows.nombre);
        //console.log(typeof(rows));
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json(rows);
    }
      });

 app.get('/temperaturaMin/', function (req, res) {

      //http://localhost:3000/temperaturaPro/?idusuario=2
  
      let idusuario = req.query.idusuario;
      console.log(idusuario);
  
      var sql = "select usuario_idusuario, min(temperatura) from temperatura where usuario_idusuario = "+parseInt(idusuario)+" group by usuario_idusuario ; ";
      console.log(sql);
      mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
        //console.log(rows.nombre);
        //console.log(typeof(rows));
        res.json( rows);
  
        
      }else{
          console.log(err);
          res.json(rows);
    }
      });
    });

    });*/