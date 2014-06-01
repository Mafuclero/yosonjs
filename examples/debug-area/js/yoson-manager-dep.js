//Creando el manejo de dependencias
//Clase que trata con una url
//Objeto que como objetivo invoca a la dependencia a travez de su url
//y notifica el status del mismo
yOSON.Dependency = function(url){
    this.url = url;
    this.status = false;
};
//realiza el request
yOSON.Dependency.prototype.request = function(){
    console.log('solicitando url', this.url);
    var that = this,
        newScript = document.createElement("script");
    newScript.type = "text/javascript";
    newScript.src = this.url;
    if( newScript.readyState ){
        this.requestIE(newScript);
    } else {
        newScript.onload = function(){
            that.status = true;
        }
    }
    document.getElementsByTagName("head")[0].appendChild(newScript);
};
//en caso sea IExplorer realiza el request
yOSON.Dependency.prototype.requestIE = function(src){
    var that = this;
    src.onreadystatechange = function(){
        if(src.readyState=="loaded" || scr.readyState=="complete"){
          scr.onreadystatechange=null;
          that.status = true;
        }
    };
};
//retorna el status del request
yOSON.Dependency.prototype.getStatus = function(){
    return this.status;
};

//clase manager de los objetos Dependency
//Administrador de dependencias
yOSON.DependencyManager = function(){
    this.data = {};
    this.veriferAvaliability = {};
    this.loaded = {};
};
//método que crea el id segun la url ingresada
yOSON.DependencyManager.prototype.generateId = function(url){
 return (url.indexOf('//')!=-1)?url.split('//')[1].split('?')[0].replace(/[/.:]/g,'_'):url.split('?')[0].replace(/[/.:]/g,'_');
};

//Adiciona la dependencia a administrar con su url
yOSON.DependencyManager.prototype.addScript = function(url){
    var id = this.generateId( url );
    if(!this.alreadyInCollection(id)){
        this.data[id] = new yOSON.Dependency(url);
        console.log('new dependency', this.data[id]);
        //Hago la consulta del script
        //debe pasar en el flujo del ready para evitar errores de dependencias
        this.data[id].request();
    } else {
        console.log('dependency in cache', this.data[id]);
    }
};
//Metodo que indica que está lista la dependencia
yOSON.DependencyManager.prototype.ready = function(urlList, callback){
    //for(var index = 0; index < urlList.length; index++){
        var index = 0,
            that = this;
        var queueQuering = function(list){
            if(index < list.length){
                console.log('queueQuering', list[index]);
                that.avaliable(list[index], function(){
                    console.log('ey!!!!', index);
                    index++;
                    queueQuering(urlList);
                });
            } else {
                callback();
            }
        };
        queueQuering(urlList);
    //}
};

yOSON.DependencyManager.prototype.avaliable = function(url, cb){
    var that = this,
        id = that.generateId(url),
        dependency = that.getDependency(url);
    console.log('consultando disponibilidad', dependency);
    if(!this.alreadyLoaded(id)){
        var veriferAvaliability = setInterval(function(){
            if(dependency.getStatus() == true){
                console.log( "cargo!" , dependency);
                that.loaded[id] = true;
                clearInterval(veriferAvaliability);
                cb();
            }
        }, 500);
    } else {
        return true;
    }
};
//retorna la dependencia en memoria
yOSON.DependencyManager.prototype.getDependency = function(url){
    var id = this.generateId(url);
    return this.data[id];
};
//Consulta si está agregada en la data del administrador
yOSON.DependencyManager.prototype.alreadyInCollection = function(id){
    return this.data[id];
};
yOSON.DependencyManager.prototype.alreadyLoaded = function(id){
    return this.loaded[id];
};
