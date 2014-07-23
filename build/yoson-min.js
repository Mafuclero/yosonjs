/*! frontendlabs comunity */
if("undefined"==typeof yOSON)var yOSON={};yOSON.Components={},function(a){var b=function(a){this.url=a,this.status="request",this.message="",this.events={}};b.prototype.getStatus=function(){return this.status},b.prototype.request=function(a){var b=this;"undefined"!=typeof a&&(b.events=a),b.onRequest();var c=b.createNewScript(b.url);b.requestIE(c,function(){c.onload=function(){b.onReadyRequest()},c.onerror=function(){b.onErrorRequest()}}),document.getElementsByTagName("head")[0].appendChild(c)},b.prototype.createNewScript=function(a){var b=document.createElement("script");return b.type="text/javascript",b.src=a,b},b.prototype.onRequest=function(){this.requestCallBackEvent("onRequest")},b.prototype.onReadyRequest=function(){this.status="ready",this.requestCallBackEvent("onReady")},b.prototype.onErrorRequest=function(){this.status="error",this.requestCallBackEvent("onError")},b.prototype.requestCallBackEvent=function(a){var b=this.events[a];"function"==typeof b&&b.call(this)},b.prototype.requestIE=function(a,b){var c=this;a.readyState?a.onreadystatechange=function(){"loaded"==a.readyState||"complete"==a.readyState?(a.onreadystatechange=null,c.onReadyRequest()):c.onErrorRequest()}:b.call(c)},yOSON.Components.Dependency=b;var c=function(){this.data={},this.loaded={},this.config={staticHost:"",versionUrl:""}};c.prototype.setStaticHost=function(a){this.config.staticHost=a},c.prototype.getStaticHost=function(){return this.config.staticHost},c.prototype.setVersionUrl=function(a){this.config.versionUrl=a},c.prototype.getVersionUrl=function(){var a="";return""!==this.config.versionUrl&&(a=this.config.versionUrl),a},c.prototype.transformUrl=function(a){var b="",c=/((http?|https):\/\/)(www)?([\w-]+\.\w+)+(\/[\w-]+)+\.\w+/g;return b=c.test(a)?a:this.config.staticHost+a+this.getVersionUrl()},c.prototype.generateId=function(a){return-1!=a.indexOf("//")?a.split("//")[1].split("?")[0].replace(/[/.:]/g,"_"):a.split("?")[0].replace(/[/.:]/g,"_")},c.prototype.addScript=function(a){var c=this.generateId(a);return this.alreadyInCollection(c)?"the dependence already appended":(this.data[c]=new b(a),this.data[c].request(),!0)},c.prototype.ready=function(a,b){var c=0,d=this,e=function(f){var g=d.transformUrl(f[c]);c<f.length?(d.addScript(g),d.avaliable(g,function(){c++,e(a)})):b.apply(d)};e(a)},c.prototype.avaliable=function(a,b){var c=this,d=c.generateId(a),e=c.getDependency(a);if(this.alreadyLoaded(d))return!0;var f=setInterval(function(){"ready"==e.getStatus()&&(c.loaded[d]=!0,clearInterval(f),b.apply(c)),"error"==e.getStatus()&&(b=null,clearInterval(f))},500)},c.prototype.getDependency=function(a){var b=this.generateId(a);return this.data[b]},c.prototype.alreadyInCollection=function(a){return this.data[a]},c.prototype.alreadyLoaded=function(a){return this.loaded[a]},yOSON.Components.DependencyManager=c;var d=function(){this.modules={},this.runningModules={},this.skeletonModule={},this.entityBridge={},this.alreadyAllModulesBeRunning=null};d.prototype.addMethodToBrigde=function(a,b){this.entityBridge[a]=b},d.prototype.addModule=function(a,b){this.existsModule(a)||(this.modules[a]=this.createDefinitionModule(a,b))},d.prototype.getModuleDefinition=function(a){var b=this,c=b.getModule(a),d=c.moduleDefinition(b.entityBridge);for(var e in d){var f=d[e];d[e]=b.addFunctionToDefinitionModule(a,e,f)}return d},d.prototype.addFunctionToDefinitionModule=function(a,b,c){return"function"==typeof c?function(){try{return c.apply(this,arguments)}catch(d){console.log("Modulo:"+a+"."+b+"(): "+d.message)}}:c},d.prototype.existsModule=function(a){var b=!1;return this.getModule(a)&&(b=!0),b},d.prototype.getModule=function(a){return this.modules[a]},d.prototype.createDefinitionModule=function(a,b){return this.skeletonModule[a]={moduleDefinition:b},this.skeletonModule[a]},d.prototype.runModule=function(a,b){var c=this.dealParamaterOfModule(b);c.moduleName=a,this.existsModule(a)&&this.runInitMethodOfModule(a,c)},d.prototype.dealParamaterOfModule=function(a){var b={};return"undefined"!=typeof a&&(b=a),b},d.prototype.runInitMethodOfModule=function(a,b){var c=this.getModuleDefinition(a);"function"==typeof c.init&&(this.setStatusModule(a,"run"),c.init(b))},d.prototype.runModules=function(a){if(a instanceof Array)for(var b in a)this.runModule(a[a])},d.prototype.setStatusModule=function(a,b){this.modules[a].status=b},d.prototype.getStatusModule=function(a){return this.modules[a].status},d.prototype.eachModules=function(a){for(var b in this.modules)a.call(this,b)},d.prototype.getTotalModulesRunning=function(){var a=0;return this.eachModules(function(b){"run"===this.getStatusModule(b)&&a++}),a},d.prototype.getTotalModulesStarted=function(){var a=0;return this.eachModules(function(b){"start"===this.getStatusModule(b)&&a++}),a+this.getTotalModulesRunning()},d.prototype.allModulesRunning=function(a,b){var c=this;if(this.alreadyAllModulesBeRunning)b.call(c);else var d=setInterval(function(){c.getTotalModulesStarted()>0?c.getTotalModulesStarted()==c.getTotalModulesRunning()?(this.alreadyAllModulesBeRunning=!0,b.call(c),clearInterval(d)):a.call(c):(this.alreadyAllModulesBeRunning=!0,b.call(c),clearInterval(d))},200)},yOSON.Components.Modular=d;var e=function(){this.events={}};e.prototype.subscribe=function(a,b,c){var d=this;this.finderEvents(a,function(){},function(a){d.addEvent(a,b,c)})},e.prototype.publish=function(a,b){var c=this;this.finderEvents([a],function(a,d){var e=d.instanceOrigin,f=d.functionSelf,g=c.validateArguments(b);f.apply(e,g)},function(){})},e.prototype.validateArguments=function(a){var b=[];return"undefined"!=typeof a&&(b=a),b},e.prototype.stopSubscribe=function(a){var b=this;this.finderEvents(a,function(a,c){b.removeEvent(a)},function(){})},e.prototype.addEvent=function(a,b,c){var d={};return d.instanceOrigin=c,d.functionSelf=b,this.events[a]=d,this},e.prototype.removeEvent=function(a){delete this.events[a]},e.prototype.eventAlreadyRegistered=function(a){var b=!1;return this.getEvent(a)&&(b=!0),b},e.prototype.getEvent=function(a){return this.events[a]},e.prototype.finderEvents=function(a,b,c){for(var d=this,e=0;e<a.length;e++)d.eachFindEvent(a[e],b,c)},e.prototype.eachFindEvent=function(a,b,c){var d=this;if(d.eventAlreadyRegistered(a)){var e=d.getEvent(a);b.call(d,a,e)}else c.call(d,a)},yOSON.Components.Comunicator=e;var f=function(a){this.schema=a,this.modules=this.schema.modules,this.controllers={},this.actions={}};f.prototype.init=function(a,b,c){var d=this.checkLevelName(a),e=this.checkLevelName(b),f=this.checkLevelName(c);this.runModuleLevel(d,function(a){this.runControllerLevel(a,e,function(a){this.runActionLevel(a,f,function(a){a()},function(a){this.getByDefaultInActionLevel(a)})},function(a){this.getByDefaultInControllerLevel(a)})},function(){this.getByDefaultInModuleLevel()})},f.prototype.checkLevelName=function(a){var b="";return"undefined"==typeof a||(b=a),b},f.prototype.getModuleByName=function(a){return this.modules[a]},f.prototype.existsModuleByName=function(a){var b=!1;return this.getModuleByName(a)&&(b=!0),b},f.prototype.getByDefaultInModuleLevel=function(){if("function"!=typeof this.modules.byDefault)throw new Error("The level module dont have the default module or not is a function");this.modules.byDefault()},f.prototype.runModuleLevel=function(a,b,c){if(this.schema.modules.allModules(),this.existsModuleByName(a)){var d=this.getModuleByName(a);b.call(this,d)}else c.call(this)},f.prototype.getControllerByNameInModule=function(a,b){return b.controllers[a]},f.prototype.existsControllerByName=function(a,b){var c=!1;return this.getControllerByNameInModule(b,a)&&(c=!0),c},f.prototype.getByDefaultInControllerLevel=function(a){if("function"!=typeof a.controllers.byDefault)throw new Error("The level controller don't have the default controller or not is a function");a.controllers.byDefault()},f.prototype.runControllerLevel=function(a,b,c,d){if(a.allControllers(),this.existsControllerByName(a,b)){var e=this.getControllerByNameInModule(b,a);c.call(this,e)}else d.call(this,a)},f.prototype.getActionByNameInController=function(a,b){return b.actions[a]},f.prototype.existsActionInController=function(a,b){var c=!1;return this.getActionByNameInController(b,a)&&(c=!0),c},f.prototype.getByDefaultInActionLevel=function(a){if("function"!=typeof a.actions.byDefault)throw new Error("The level action don't have the default controller or not is a function");a.actions.byDefault()},f.prototype.runActionLevel=function(a,b,c,d){if(a.allActions(),this.existsActionInController(a,b)){var e=this.getActionByNameInController(b,a);c.call(this,e)}else d.call(this,a)},yOSON.Components.Loader=f;var g=new yOSON.Components.Modular,h=new yOSON.Components.DependencyManager,i=new yOSON.Components.Comunicator,j={};return yOSON.AppCore=function(){g.addMethodToBrigde("events",function(a,b,c){i.subscribe(a,b,c)}),g.addMethodToBrigde("trigger",function(a,b){var c={};g.allModulesRunning(function(){c[a]=b},function(){for(var d in c)i.publish(d,c[d]);i.publish(a,b)})});var a=function(a,b){j[a]=b},b=function(a){var b=[];return j[a]&&(b=j[a]),b};return{getComponents:function(){return{Modular:g,Comunicator:i,DependencyManager:h}},addModule:function(b,c,d){a(b,d),g.addModule(b,c)},runModule:function(a,c){var d=b(a);g.setStatusModule(a,"start"),h.ready(d,function(){g.runModule(a,c)})},setStaticHost:function(a){h.setStaticHost(a)},setVersionUrl:function(a){h.setVersionUrl(a)}}}(),yOSON}(yOSON);
//# sourceMappingURL=yoson.min.map