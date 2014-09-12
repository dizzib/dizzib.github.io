(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e=[].slice;define(["jquery","underscore","test/lib.3p/chai","./stub/socket","input/touch"],function(r,n,s,a,u){var i;return new(i=function(){function i(){this._touch=t(this._touch,this);this._assert=t(this._assert,this);this.touch_end=t(this.touch_end,this);this.touch_move=t(this.touch_move,this);this.touch_start=t(this.touch_start,this);this.rem_dev=t(this.rem_dev,this);this.ins_trk=t(this.ins_trk,this);this.add_trk=t(this.add_trk,this);this.add_dev=t(this.add_dev,this)}i.prototype.add_dev=function(){var t,r,n,s;s=arguments[0],n=arguments[1],r=arguments[2],t=4<=arguments.length?e.call(arguments,3):[];a.add_device(s,n);a.add_groups(s,r);return this._assert.apply(this,t)};i.prototype.add_trk=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];a.add_track(r);return this._assert.apply(this,t)};i.prototype.ins_trk=function(){var t,r,n;n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[];a.insert_track(n,r);return this._assert.apply(this,t)};i.prototype.rem_dev=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];a.remove_device(r);return this._assert.apply(this,t)};i.prototype.tap=function(t,e){if(e==null){e=1}return n.delay(function(){return r(t).trigger("safe-tap")},e)};i.prototype.touch_start=function(){var t,r,n;r=arguments[0],n=arguments[1],t=3<=arguments.length?e.call(arguments,2):[];return this._touch.apply(this,[r,u.event_name_start,n].concat(e.call(t)))};i.prototype.touch_move=function(){var t,r,n;r=arguments[0],n=arguments[1],t=3<=arguments.length?e.call(arguments,2):[];return this._touch.apply(this,[r,u.event_name_move,n].concat(e.call(t)))};i.prototype.touch_end=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];return this._touch.apply(this,[r,u.event_name_end,0].concat(e.call(t)))};i.prototype._assert=function(){var t,n,a,u,i,h,c,o;n=1<=arguments.length?e.call(arguments,0):[];o=[];for(u=h=0,c=n.length;h<c;u=++h){t=n[u];if(!(t!=null)){continue}a=t.starts("!")?0:1;i=this._gen_sel(t.replace("!",""));o.push(s.expect(r(i).length,i).to.equal(a))}return o};i.prototype._gen_sel=function(t){t=t.replace(/G(\(.+\))/g,"div.gutter-o:has(div.gutter-i:has$1)");t=t.replace(/t(\d+)/g,"#$1[class='track disabled']");t=t.replace(/T(\d+)/g,"#$1[class='track']");return t=t.replace(/D(\d+)/g,"#$1[class='device']")};i.prototype._touch=function(){var t,n,s,a;s=arguments[0],n=arguments[1],a=arguments[2],t=4<=arguments.length?e.call(arguments,3):[];r(s).trigger(r.Event(n,u.__create_event_by_raw({pageX:a,pageY:0})));return this._assert.apply(this,t)};return i}())})}).call(this);