var ws = new WebSocket("ws://127.0.0.1:{{WS_PORT}}");
ws.onmessage = function(){ window.location = window.location; }