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
  host: "34.68.38.115",
  user: "arqui",
  password: "arquipractica1",
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

app.post('/ejemplo/', function(req, res){

    //res.send(req.body);  
    res.send(req.body.email);  

});  

  app.post('/registrarUsuario/', function(req, res){

    var usuario = req.body;

    var sql = "insert into usuario (nombre, fechaNacimiento, peso,altura,tipo_idtipo,correo,contra,usuario_idusuario)  values ('"+usuario.nombre+"',STR_TO_DATE('"+usuario.fechaNacimiento+"','%d/%m/%Y'),"+usuario.peso+","+usuario.altura+","+usuario.tipo+",'"+usuario.correo+"','"+usuario.contra+"',1);";
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
  
  });  

  app.get('/cerrarSesion/', function (req, res) {

    //http://localhost:3000/cerrarSesion/?idusuario=2

    let idusuario = req.query.idusuario;
    console.log(idusuario);

    var sql = "update usuario set activo = 0 where idusuario = "+parseInt(idusuario)+";";
    console.log(sql);
    mysqlConnection.query(sql,(err, rows,fields)=>{
      if(!err){
      //console.log(rows.nombre);
      //console.log(typeof(rows));
      res.json( [{"status":1}] );

      
    }else{
        console.log(err);
        res.json( [{"status":0}] );
  }
    });
  });

  app.post('/iniciarSesion/', function(req, res){

    var usuario = req.body;

    var sql = "select b.nombre, b.fecha, b.peso,b.altura,b.tipo,b.correo,b.contra,c.nombre as entrenador from (select u.nombre as nombre, u.fechaNacimiento as fecha,u.peso as peso,u.altura as altura,t.tipo as tipo,u.correo as correo ,u.contra as contra, u.usuario_idusuario as entrenador from usuario as u, tipo as t  where u.tipo_idtipo = t.idtipo and u.correo = '"+usuario.correo+"' and u.contra = '"+usuario.contra+"') as b, (select u.idusuario as id, u.nombre  as nombre from usuario as u  where u.tipo_idtipo = 1 ) as c  where b.entrenador = c.id;";
    console.log(sql);
    mysqlConnection.query(sql,(err, rows,fields)=>{
      if(!err){
      //console.log(rows.nombre);
      //console.log(typeof(rows));

      if(Object.entries(rows).length === 0){
        console.log('vacio');
        res.json( [{"nombre": "",
        "fecha": "",
        "peso": 0,
        "altura": 0,
        "tipo": "",
        "correo": "",
        "contra": "",
        "entrenador": ""}] );
      }else{

        // update usuario  set activo = 1  where correo = '"+usuario.correo+"';
        res.json(rows);

          var sql1 = "update usuario  set activo = 1  where correo = '"+usuario.correo+"';";
          console.log(sql1);
          mysqlConnection.query(sql1,(err, rows,fields)=>{
          if(!err){
          console.log(rows);
      //console.log(typeof(rows));
      //res.json( [{"status":1}] );

      
    }else{
        console.log(err);
        res.json( [{"nombre": "",
        "fecha": "",
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
        res.json( [{"status":0}] );
  }
    });

}); 

    app.post('/actualizarEntrenador/', function(req, res){

        var usuario = req.body;
    
        var sql = "update usuario as u, (select idusuario as id from usuario where nombre = '"+usuario.entrenador+"') as b set u.usuario_idusuario = b.id  where u.idusuario = "+usuario.idusuario+"; ";
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

        var temperatura = req.body;
    
        var sql = "insert into temperatura (temperatura, usuario_idusuario,fecha) values ("+temperatura.temperatura+","+temperatura.idusuario+",STR_TO_DATE('"+temperatura.fecha+"','%d/%m/%Y'));";
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

      var ritmo = req.body;
  
      var sql = "insert into ritmo (ritmo, usuario_idusuario,fecha) values ("+ritmo.ritmo+","+ritmo.idusuario+",STR_TO_DATE('"+ritmo.fecha+"','%d/%m/%Y'));";
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

    var oxigeno = req.body;

    var sql = "insert into oxigeno (oxigeno, usuario_idusuario,fecha) values ("+oxigeno.oxigeno+","+oxigeno.idusuario+",STR_TO_DATE('"+oxigeno.fecha+"','%d/%m/%Y'));";
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
    
        var sql = "select u.idusuario, u.nombre from usuario as u   where u.tipo_idtipo = 1  and u.idusuario not like 1;";
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

    
    app.get('/visualizarUsuarios/', function(req, res){
    
        var sql = "select b.idusuario, b.nombre, b.fecha, b.peso,b.altura,b.tipo,b.correo,b.contra,c.nombre as entrenador from  (select u.idusuario as idusuario, u.nombre as nombre, u.fechaNacimiento as fecha,u.peso as peso,u.altura as altura,t.tipo as tipo,u.correo as correo  ,u.contra as contra, u.usuario_idusuario as entrenador  from usuario as u, tipo as t  where u.tipo_idtipo = t.idtipo and u.tipo_idtipo = 2) as b, (select u.idusuario as id, u.nombre  as nombre  from usuario as u  where u.tipo_idtipo = 1 ) as c  where b.entrenador = c.id;";
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

      let idusuario = req.query.idusuario;
      console.log(idusuario);
    
      var sql = "select u.idusuario, u.nombre as nombre, u.fechaNacimiento as fecha,u.peso as peso,u.altura as altura,t.tipo as tipo,u.correo as correo ,u.contra as contra, u.usuario_idusuario as entrenador  from usuario as u, tipo as t  where u.tipo_idtipo = t.idtipo and u.idusuario not like 1 and u.usuario_idusuario = "+parseInt(idusuario)+";";
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

    app.get('/ritmoHistorial/', function (req, res) {

      //http://localhost:3000/ritmoHistorial/?idusuario=2
  
      let idusuario = req.query.idusuario;
      console.log(idusuario);
  
      var sql = "select usuario_idusuario, ritmo, fecha from ritmo where usuario_idusuario = "+parseInt(idusuario)+";";
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

    app.get('/ritmoPro/', function (req, res) {

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

    app.get('/usuarioLogueado/', function (req, res) {

      //http://localhost:3000/temperaturaPro/?idusuario=2
  

      var sql = "select idusuario from usuario where activo = 1;";
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

  app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
   });
