(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};define(["jquery","underscore","lib/guardian","plugin/lib/ui/scrollport","plugin/model/setting/is-super-scroll","text!./track.html","css!./track"],function(e,n,r,i,o,s){var a;return new(a=function(){function i(){this._get_track=t(this._get_track,this);this._get_target=t(this._get_target,this);this._expand=t(this._expand,this);this._collapse=t(this._collapse,this);this._create=t(this._create,this);this.rename=t(this.rename,this);this.remove=t(this.remove,this);this.prepend=t(this.prepend,this);this.move=t(this.move,this);this.insert=t(this.insert,this);this.expand=t(this.expand,this);this.disable=t(this.disable,this);this.append=t(this.append,this);this.add=t(this.add,this);this.init=t(this.init,this)}i.prototype.init=function(t){t.$desk.on("safe-tap","#tracks > .track > .head",{collapse:this._collapse},function(t){t.data.collapse({$track:e(this).parent(),is_user:true});return t.handled=true});this._render=n.template(s);return this.on_init(t)};i.prototype.on_add=function(){};i.prototype.on_added=function(){};i.prototype.on_collapse=function(){};i.prototype.on_init=function(){};i.prototype.on_inserted=function(){};i.prototype.on_move=function(){};i.prototype.on_remove=function(){};i.prototype.on_toggle=function(){};i.prototype.add=function(t){var e;this.on_add(e=this._create(t));return this.on_added(n.extend(t,{$track:e}))};i.prototype.append=function(t,e){return e.appendTo(this._get_body(t.$track))};i.prototype.disable=function(t){r.assert(function(){return t.addClass("disabled").hasClass("track")});return this._collapse({$track:t,is_user:false})};i.prototype.enable=function(t){return r.assert(function(){return t.removeClass("disabled").hasClass("track")})};i.prototype.expand=function(t){return this._expand(t)};i.prototype.get_by_descendant=function(t){return t.parents(".track")};i.prototype.get_by_uid=function(t){return e("#"+r.assert(function(){return t})+".track")};i.prototype.insert=function(t){var e,n;n=[this._create(t),this._get_target(t)],t.$track=n[0],e=n[1];if(t.target_placement==="Before"){t.$track.insertBefore(e)}else{t.$track.insertAfter(e)}return this.on_inserted(t)};i.prototype.is_parent=function(t,e){return t.is(e!=null?e.parents(".track"):void 0)};i.prototype.move=function(t){var e;e=[this._get_track(t),this._get_target(t)],t.$track=e[0],t.$target=e[1];return this.on_move(t)};i.prototype.prepend=function(t,e){return e.prependTo(this._get_body(t.$track))};i.prototype.remove=function(t){var e,n=this;return(e=this._get_track(t)).fadeOut(function(){n.on_remove(t);return e.remove()})};i.prototype.rename=function(t){return this._get_track(t).find("h1").html(t.name.fracture())};i.prototype._create=function(t){return e(this._render(t))};i.prototype._collapse=function(t){this.on_collapse(t);this.on_toggle(n.extend(t,{is_collapse:true}));if(t.is_user){return this._indicate(t)}};i.prototype._expand=function(t){this.on_toggle(n.extend(t,{is_expand:true}));return this._indicate(t)};i.prototype._get_body=function(t){return t.find("> .body")};i.prototype._get_target=function(t){return this.get_by_uid(t.target_uid)};i.prototype._get_track=function(t){return this.get_by_uid(t.uid)};i.prototype._indicate=function(t){return t.$track.find("h1").indicate()};return i}())})}).call(this);