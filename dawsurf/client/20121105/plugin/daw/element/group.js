(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define(["jquery","underscore","./box","./param","lib/guardian","css!./cell","css!./group"],function(b,c,d,e){var f;return new(f=function(){function c(){this.auto_expand=a(this.auto_expand,this),this.create=a(this.create,this),this.add=a(this.add,this),this.init=a(this.init,this)}return c.prototype._AUTO_EXPAND_WILD_GROUP_THRESHOLD=8,c.prototype.init=function(a){return a.$desk.on("safe-tap",".wild .group",{on_toggle:this.on_toggle},function(a){var c,d;return(d=b(this)).toggleClass("collapsed"),(c=d.siblings(".param[data-group-id='"+d.attr("id")+"']")).toggleClass("hidden"),a.data.on_toggle({$target:d}),d.animate({left:"+=0"},0,function(){return c.indicate(),d.indicate()}),a.handled=!0}),a.$desk.on("safe-tap",".tame .group",{toggle:d.toggle},function(a){return a.data.toggle(b(this)),a.handled=!0})},c.prototype.on_toggle=function(){},c.prototype.add=function(a){var b,c,d,f,g;b=a.$box.find("#"+assert(function(){return a!=null?a.group_uid:void 0})),g=a.group_params.reverse();for(d=0,f=g.length;d<f;d++)c=g[d],b.after(e.create(a,c));if(b.parents(".box.wild").length)return b.siblings(".param[data-group-id='"+a.group_uid+"']").addClass("hidden")},c.prototype.create=function(a){var c;a.$cells.append(c=b(["<div id='"+a.uid+"' class='cell group tint_"+a.tint+"' data-group-name='"+a.name+"'>","<div><h3 class='"+a.name.lenclass()+"'>"+a.name.fracture()+"</h3></div>","</div>"].join("")));if(c.parents(".wild").length)return c.addClass("collapsed")},c.prototype.auto_expand=function(a){var b,c;if((c=(b=a.find(".wild")).find(".group")).length<=this._AUTO_EXPAND_WILD_GROUP_THRESHOLD)return c.removeClass("collapsed"),b.find(".param").removeClass("hidden"),this.on_toggle()},c}())})}).call(this);