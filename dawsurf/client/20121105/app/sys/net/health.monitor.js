(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define(function(){var b;return b=function(){function b(){this._check_for_timely_response=a(this._check_for_timely_response,this),this.packet_out=a(this.packet_out,this),this.packet_in=a(this.packet_in,this)}return b.prototype._RESPONSE_TIMEOUT_MS=1e3,b.prototype.on_alert=function(){},b.prototype.packet_in=function(){if(this._is_measuring)return this._is_packet_in=!0},b.prototype.packet_out=function(){var a;if(this._is_measuring)return;return a=[!0,!1],this._is_measuring=a[0],this._is_packet_in=a[1],setTimeout(this._check_for_timely_response,this._RESPONSE_TIMEOUT_MS)},b.prototype._check_for_timely_response=function(){return this._is_packet_in||this.on_alert("The network is down :-("),this._is_measuring=!1},b}(),new b})}).call(this);