(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define(["jquery","plugin/constants","plugin/element/track","./element/desk.panner","lib/platform/document","lib/platform/window","lib/guardian"],function(b,c,d,e,f,g){var h;return h=function(){function b(){this._pan_desk=a(this._pan_desk,this),this._get_dx_to_pan_track_into_view=a(this._get_dx_to_pan_track_into_view,this),this._get_dx_to_close_void_on_right=a(this._get_dx_to_close_void_on_right,this),this._get_dx_to_close_void_on_left=a(this._get_dx_to_close_void_on_left,this),this.pan_zoom=a(this.pan_zoom,this),this.pan_track=a(this.pan_track,this),this.pan_gutter=a(this.pan_gutter,this)}return b.prototype._AUTOPAN_DURATION_MS=500,b.prototype.pan_gutter=function(a){var b,c;return b=e.get_pan_pos(),c=this._get_dy_to_close_void_on_bottom(b),this._pan_desk(b,0,c)},b.prototype.pan_track=function(a){var b,f;if((a!=null?a.$track:void 0)==null)return;assert(function(){return a.is_expand||a.is_collapse}),b=e.get_pan_pos(),f=d.is_last(a.$track)?0:c.CELL_SIZE/2,a.is_expand&&this._pan_desk(b,this._get_dx_to_pan_track_into_view(a.$track,b,f),0);if(a.is_collapse)return this._pan_desk(b,this._get_dx_to_close_void_on_right(b,f),0)},b.prototype.pan_zoom=function(a){var b,c,d;return b=e.get_pan_pos(),a.is_zoom_out?(c=this._get_dx_to_close_void_on_right(b),d=this._get_dy_to_close_void_on_bottom(b)):(c=this._get_dx_to_close_void_on_left(b),d=0),this._pan_desk(b,c,d)},b.prototype._get_dx_to_close_void_on_left=function(a){return 0},b.prototype._get_dx_to_close_void_on_right=function(a,b){return b==null&&(b=0),Math.min(0,d.get_xmax()-a.x-f.width()+b)},b.prototype._get_dy_to_close_void_on_bottom=function(a){return Math.min(0,d.get_ymax()-a.y-g.height)},b.prototype._get_dx_to_pan_track_into_view=function(a,b,c){return a.pos().x-b.x+Math.min(0,a.width()+c-f.width())},b.prototype._pan_desk=function(a,b,c){var d,f;return d=Math.max(0,a.x+b),f=Math.max(0,a.y+c),e.set_pan_pos(d,f,this._AUTOPAN_DURATION_MS)},b}(),new h})}).call(this);