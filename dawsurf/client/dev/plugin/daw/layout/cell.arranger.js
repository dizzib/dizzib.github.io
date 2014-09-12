(function(){var t=function(t,r){return function(){return t.apply(r,arguments)}};define(["jquery","underscore","./cell.arranger/mason","./cell.arranger/helper","plugin/constants","plugin/lib/ui/viewport"],function(r,e,n,a,s,i){var l;return new(l=function(){function a(){this._arrange_wild=t(this._arrange_wild,this);this.arrange_track=t(this.arrange_track,this)}a.prototype._GROUP_ANIMATE_MS=250;a.prototype.arrange_track=function(t){return this._arrange_wild(t.$track,t.x_size)};a.prototype._arrange_wild=function(t,a){var s,i,l,o,p,u,h,f,_,g,c,d,y,m,v,C,E,b,w;v=t.find(".wild > .cells:not(:empty)");b=[];for(g=0,y=v.length;g<y;g++){o=v[g];l=(s=r(o)).find(".group");C=[[],[],[]],u=C[0],h=C[1],f=C[2];for(c=0,m=l.length;c<m;c++){p=l[c];h.push((i=r(p)).attr("data-group-name"));u.push(i.hasClass("collapsed")?i:i.nextUntil(".group").andSelf());f.push(e.last(u).length)}_=n.build(function(){w=[];for(var t=1,r=h.length;1<=r?t<=r:t>=r;1<=r?t++:t--){w.push(t)}return w}.apply(this),f,a);b.push(this._apply_matrix(s,u,_))}return b};a.prototype._apply_matrix=function(t,e,n){var a,l,o,p,u,h,f,_,g,c,d,y,m,v,C;u=function(){var t,r,n;n=[];for(t=0,r=e.length;t<r;t++){o=e[t];n.push(0)}return n}();for(h=d=0,m=n.length;d<m;h=++d){g=n[h];for(f=y=0,v=g.length;y<v;f=++y){l=g[f];if((p=Math.abs(n[h][f])-1)===-1){continue}a=r(e[p][u[p]++]);C=[f*s.CELL_SIZE,h*s.CELL_SIZE],_=C[0],c=C[1];if(u[p]===1&&i.get_css_left(a)>0){a.animate({left:_,top:c},this._GROUP_ANIMATE_MS)}else{a.css({left:_,top:c})}if(f<g.length-1&&p!==Math.abs(n[h][f+1])-1){a.addClass("sep-r")}else{a.removeClass("sep-r")}if(h<n.length-1&&p!==Math.abs(n[h+1][f])-1){a.addClass("sep-b")}else{a.removeClass("sep-b")}}}return t.height(h*s.CELL_SIZE)};return a}())})}).call(this);