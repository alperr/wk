#!/usr/bin/env node

const FS = require('fs');
const PATH = require('path');
const EXEC = require('child_process').execSync;
const FG_RED = "\x1b[31m";
const FG_DIM = "\x1b[2m";
const BG_GREEN = "\x1b[42m";
const RESET = "\x1b[0m";

const SOURCE_INDEX = 'PGh0bWw+Cgk8aGVhZD4KCQk8bWV0YSBjaGFyc2V0PSJ1dGYtOCI+CgkJPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCI+CgkJPHRpdGxlPndrPC90aXRsZT4KCTwvaGVhZD4KCTxib2R5PgoJCTx3ZWItYXBwPjwvd2ViLWFwcD4KCTwvYm9keT4KPC9odG1sPg==';
const SOURCE_SAMPLE = 'Y2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudA0Kew0KCWNvbnN0cnVjdG9yKCl7IHN1cGVyKCk7IH0NCgljb25uZWN0ZWRDYWxsYmFjaygpDQoJew0KCQkNCgl9DQp9';
const SOURCE_BASIC_HTML = 'PGRpdiBjbGFzcz0nYXBwJz4KCTxoMj5oZWxsbzwvaDI+Cgk8cD50aGlzIHBhZ2UgaXMgZ2VuZXJhdGVkIGJ5IGEgY29tbWFuZCBsaW5lIGludGVyZmFjZTogPHN0cm9uZz53azwvc3Ryb25nPiA8L3A+Cgk8cD53ZWIgYXBwcyBnZW5lcmF0ZWQgd2l0aCA8c3Ryb25nPndrPC9zdHJvbmc+IGFyZSBjb21wb3NlZCBvZiA8c3Ryb25nPmNvbXBvbmVudHM8L3N0cm9uZz48L3A+Cgk8aDM+d2hhdCBpcyBhIGNvbXBvbmVudD88L2gzPgoJPHVsPgoJCTxsaT5ldmVyeSBpbmRlcGVuZGVudGx5IGZ1bmN0aW9uaW5nIHBhcnQgb2YgYSB1c2VyIGludGVyZmFjZSBpcyBjYWxsZWQgYXMgPHN0cm9uZz5jb21wb25lbnQ8L3N0cm9uZz48L2xpPgoJCTxsaT5ldmVyeSBjb21wb25lbnQgY29udGFpbnMgb25lIDxzdHJvbmc+amF2YXNjcmlwdDwvc3Ryb25nPiwgPHN0cm9uZz5jc3M8L3N0cm9uZz4gYW5kIAoJCTxzdHJvbmc+aHRtbDwvc3Ryb25nPiBmaWxlPC9saT4KCQk8bGk+PHN0cm9uZz5jb21wb25lbnRzPC9zdHJvbmc+IGFyZSBzdG9yZWQgdW5kZXIgPHN0cm9uZz5zcmMvY29tcG9uZW50cy88L3N0cm9uZz4gYXMgaW5kaXZpZHVhbCBmb2xkZXJzPC9saT4KCQk8bGk+ZXZlcnkgcHJvamVjdCBjb250YWlucyBhIG1haW4gY29tcG9uZW50IG5hbWVkIDxzdHJvbmc+d2ViLWFwcDwvc3Ryb25nPjwvbGk+CgkJPGxpIGNsYXNzPSJhY2NlbnQiPnlvdSBjYW4gdHdlYWsgdGhpcyB3ZWItYXBwIGNvbXBvbmVudCdzIHN0eWxlIGJ5IGVkaXRpbmcgCgkJPHN0cm9uZz5zcmMvY29tcG9uZW50cy93ZWItYXBwL3dlYi1hcHAuY3NzPC9zdHJvbmc+IGZpbGU8L2xpPgoJCTxsaT5tYXJrdXAgb2Ygd2ViLWFwcCBjb21wb25lbnQgaXMgd3JpdHRlbiBpbnRvIAoJCTxzdHJvbmc+c3JjL2NvbXBvbmVudHMvd2ViLWFwcC93ZWItYXBwLmh0bWw8L3N0cm9uZz48L2xpPgoJCTxsaT5jb21wb25lbnRzIGFyZSBkZWZpbmVkIGFzIDxzdHJvbmc+ZnVuY3Rpb25zPC9zdHJvbmc+CgkJaW4gLmpzIGZpbGVzIGFuZCBhbnkgY29tcG9uZW50IGNhbiBjcmVhdGUgYW5vdGhlciBvbmUganVzdCBieSBjYWxsaW5nIHRoZSBjb25zdHJ1Y3RvciBvZiB0aGF0IGNvbXBvbmVudDwvbGk+CgkJPGxpPnByb2dyYW0gZW50cnkgcG9pbnQgaXMgPHN0cm9uZz5zcmMvY29tcG9uZW50cy93ZWItYXBwL3dlYi1hcHAuanM8L3N0cm9uZz48L2xpPgoJPC91bD4KCgk8cD4KCQlhbGwgb3RoZXIgLmpzIGZpbGVzIHNob3VsZCBiZSBwbGFjZWQgdW5kZXIgPHN0cm9uZz5zcmMvPC9zdHJvbmc+IGZvbGRlci4KCQl3ayBjb25jYXRhbmF0ZXMgZXZlcnkgLmpzIGZpbGVzIGluIHNyYyBmb2xkZXIgKGluY2x1ZGluZyBqYXZhc2NyaXB0IGZpbGVzIG9mIGVhY2ggY29tcG9uZW50KQoJCWFuZCBzZXJ2ZXMgdGhlbSBhcyBhIHNpbmdsZSBqYXZhc2NyaXB0IGZpbGUsIGhlbmNlIHlvdSBkb24ndCBoYXZlIHRvIHVzZSAKCQk8c3BhbiBjbGFzcz0iYWNjZW50Ij5yZXF1aXJlKCk8L3NwYW4+IG9yIDxzcGFuIGNsYXNzPSJhY2NlbnQiPmltcG9ydDwvc3Bhbj4KCQl0byBkZXZlbG9wIGluIGEJbXVsdGlwbGUgZmlsZSBqYXZhc2NyaXB0IGVudmlyb25tZW50LCBldmVyeXRoaW5nIHlvdSB3cml0ZSBpcyByZWdpc3RlcmVkIHRvIGdsb2JhbC4KCTwvcD4KCgk8aHI+Cgk8cD5ydW4gPHN0cm9uZz53ayBoZWxwPC9zdHJvbmc+IHRvIGxlYXJuIGRldGFpbHMgb2YgQ0xJPC9wPgo8L2Rpdj4=';
const SOURCE_BASIC_CSS = 'LmFwcHsKCW1hcmdpbi1sZWZ0OiBhdXRvOwoJbWFyZ2luLXJpZ2h0OiBhdXRvOwoJbWF4LXdpZHRoOiA3NzBweDsJCglwYWRkaW5nOiA0MHB4OwoJbGluZS1oZWlnaHQ6IDEuNDsKfQoKLmFwcCAqewoJZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmOwp9CgouYXBwIC5hY2NlbnR7Cgljb2xvcjogIzBhZjsKfQoKLmFwcCBsaXsKCWxpbmUtaGVpZ2h0OiAyOwp9';
const SOURCE_START_SCRIPT = 'PHNjcmlwdCBpZD0id2stc2NyaXB0Ij4Kd2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpCnsKLy9IT1RfUkVMT0FEX0NPREUvLwp9Cjwvc2NyaXB0Pg==';
const SOURCE_HOT_RELOAD = 'CXZhciB3cyA9IG5ldyBXZWJTb2NrZXQoIndzOi8vMTI3LjAuMC4xOnt7V1NfUE9SVH19Iik7Cgl3cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpeyB3aW5kb3cubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247IH0=';
const SOURCE_HTTP = 'dmFyIGh0dHBfYmFzZSA9ICJodHRwOi8vbG9jYWxob3N0OjgwNjAvIjsKCmZ1bmN0aW9uIGh0dHBfZ2V0X2ZvbyhpZCwgb25sb2FkKSAvLyBzYW1wbGUgZ2V0IHJlcXVlc3QKewoJaHR0cF94aHIoIkdFVCIsICJmb28/aWQ9IiArIGlkLCBvbmxvYWQpOwp9CgpmdW5jdGlvbiBodHRwX3Bvc3RfYmFyKGRhdGExLCBkYXRhMiwgb25sb2FkKSAvLyBzYW1wbGUgcG9zdCByZXF1ZXN0CnsKCXZhciBib2R5ID0KCXsKCQkiZGF0YTEiOiBkYXRhMSwKCQkiZGF0YTIiOiBkYXRhMgoJfTsKCglodHRwX3hocigiUE9TVCIsICJiYXIiLCBvbmxvYWQsIGJvZHkpOwp9CgpmdW5jdGlvbiBodHRwX3hocihtZXRob2QsIHVybCwgb25sb2FkLCBib2R5KQp7Cgl2YXIgeCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOwoJeC5vcGVuKG1ldGhvZCwgaHR0cF9iYXNlICsgdXJsKTsKCXguc2V0UmVxdWVzdEhlYWRlcigiQ29udGVudC1UeXBlIiwgImFwcGxpY2F0aW9uL2pzb24iKTsKCXgub25sb2FkID0gZnVuY3Rpb24oKQoJewoJCWlmICh4LnN0YXR1cyAhPSAyMDApCgkJewoJCQlvbmxvYWQodW5kZWZpbmVkLCB0cnVlKTsKCQkJcmV0dXJuOwoJCX0KCQl0cnkKCQl7CgkJCXZhciByID0geC5yZXNwb25zZVRleHQ7CgkJCW9ubG9hZChyLCBmYWxzZSk7CgkJfQoJCWNhdGNoKGUpCgkJewoJCQlvbmxvYWQociwgdHJ1ZSk7CgkJfQoJfQoKCXgub25lcnJvciA9IGZ1bmN0aW9uKCkKCXsKCQlvbmxvYWQodW5kZWZpbmVkLCB0cnVlKTsKCX0KCglpZiAobWV0aG9kLnRvVXBwZXJDYXNlKCkgPT0gIlBPU1QiKQoJewoJCWlmICh0eXBlb2YgYm9keSA9PSAib2JqZWN0IikKCQkJYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpOwoKCQl4LnNlbmQoYm9keSk7Cgl9CgllbHNlCgl7CgkJeC5zZW5kKCk7Cgl9Cn0=';
const SOURCE_EVENT = 'Y29uc3QgU0FNUExFX0VWRU5UID0gMDsKY29uc3QgQU5PVEhFUl9FVkVOVCA9IDE7CgpmdW5jdGlvbiBvbihldmVudCwgZm4pCnsKCWRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuKTsKfQoKZnVuY3Rpb24gb2ZmKGV2ZW50LCBmbikKewoJZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgZm4pOwp9CgpmdW5jdGlvbiBkaXNwYXRjaChldmVudCkKewoJZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoZXZlbnQpKTsKfQo=';
const SOURCE_ROUTER = 'dmFyIHJvdXRlcl9wYXRocyA9IHt9CnZhciByb3V0ZXJfbmV4dF9vbmhpZGVfZnVuY3Rpb24gPSBmdW5jdGlvbigpe30KZnVuY3Rpb24gbmF2aWdhdGUocGF0aCwgc2hvdWxkX2FkZF9oaXN0b3J5KQp7CglpZiAodHlwZW9mIHJvdXRlcl9wYXRoc1twYXRoXSA9PSAidW5kZWZpbmVkIikKCQlyZXR1cm47CgkKCXZhciBbY29udGFpbmVyLCB0aXRsZSwgb25zaG93LCBvbmhpZGVdID0gcm91dGVyX3BhdGhzW3BhdGhdOwoJZG9jdW1lbnQudGl0bGUgPSB0aXRsZTsKCglpZiAoc2hvdWxkX2FkZF9oaXN0b3J5KQoJCXdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShwYXRoLCB0aXRsZSwgcGF0aCk7CgoJZm9yICh2YXIga2V5IGluIHJvdXRlcl9wYXRocykKCQlyb3V0ZXJfcGF0aHNba2V5XVswXS5zdHlsZS5kaXNwbGF5ID0gIm5vbmUiOwoKCWNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gImJsb2NrIjsKCXJvdXRlcl9uZXh0X29uaGlkZV9mdW5jdGlvbigpOwoJcm91dGVyX25leHRfb25oaWRlX2Z1bmN0aW9uID0gb25oaWRlOwoJb25zaG93KCk7Cn0KCmZ1bmN0aW9uIGluaXRfcm91dGVyKGRvbSkKewoJdmFyIGNoaWxkcmVuID0gZG9tLmNoaWxkcmVuOwoJZm9yICh2YXIgaT0wO2k8Y2hpbGRyZW4ubGVuZ3RoO2krKykKCXsKCQl2YXIgYyA9IGNoaWxkcmVuW2ldOwoJCXZhciBwYXRoID0gYy5nZXRBdHRyaWJ1dGUoInBhdGgiKTsKCQl2YXIgdGl0bGUgPSBjLmdldEF0dHJpYnV0ZSgidGl0bGUiKTsKCQl2YXIgb25zaG93ID0gYy5vbnNob3c7CgkJdmFyIG9uaGlkZSA9IGMub25oaWRlOwoJCWlmIChwYXRoID09IG51bGwpCgkJCWNvbnRpbnVlOwoJCWlmICh0aXRsZSA9PSBudWxsKQoJCQl0aXRsZSA9ICIiOwoJCWlmICh0eXBlb2Ygb25zaG93ID09ICJ1bmRlZmluZWQiKQoJCQlvbnNob3cgPSBmdW5jdGlvbigpe307CgkJaWYgKHR5cGVvZiBvbmhpZGUgPT0gInVuZGVmaW5lZCIpCgkJCW9uaGlkZSA9IGZ1bmN0aW9uKCl7fTsKCQlyb3V0ZXJfcGF0aHNbcGF0aF0gPSBbYywgdGl0bGUsIG9uc2hvdywgb25oaWRlXTsKCX0KCgl2YXIgYWxsX2xpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgiYVtpbnRlcm5hbF0iKTsKCWZvciAodmFyIGk9MDtpPGFsbF9saW5rcy5sZW5ndGg7aSsrKQoJewoJCXZhciBhID0gYWxsX2xpbmtzW2ldOwoJCWEub25jbGljayA9IGZ1bmN0aW9uKGUpCgkJewoJCQllLnByZXZlbnREZWZhdWx0KCk7CgkJCW5hdmlnYXRlKHRoaXMuZ2V0QXR0cmlidXRlKCJocmVmIiksIHRydWUpOwoJCX0KCX0KCgluYXZpZ2F0ZSh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsIGZhbHNlKTsKCgl3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uKGUpCgl7CgkJdmFyIHBhdGggPSAiLyI7CgkJaWYgKGUuc3RhdGUpCgkJCXBhdGggPSBlLnN0YXRlOwoJCQoJCW5hdmlnYXRlKHBhdGgsIGZhbHNlKTsKCX07Cn0K';
const SOURCE_CLEANSLATE = 'LmNsZWFuc2xhdGUsLmNsZWFuc2xhdGUgYSwuY2xlYW5zbGF0ZSBhYmJyLC5jbGVhbnNsYXRlIGFjcm9ueW0sLmNsZWFuc2xhdGUgYWRkcmVzcywuY2xlYW5zbGF0ZSBhcHBsZXQsLmNsZWFuc2xhdGUgYXJlYSwuY2xlYW5zbGF0ZSBhcnRpY2xlLC5jbGVhbnNsYXRlIGFzaWRlLC5jbGVhbnNsYXRlIGF1ZGlvLC5jbGVhbnNsYXRlIGIsLmNsZWFuc2xhdGUgYmlnLC5jbGVhbnNsYXRlIGJsb2NrcXVvdGUsLmNsZWFuc2xhdGUgYnV0dG9uLC5jbGVhbnNsYXRlIGNhbnZhcywuY2xlYW5zbGF0ZSBjYXB0aW9uLC5jbGVhbnNsYXRlIGNpdGUsLmNsZWFuc2xhdGUgY29kZSwuY2xlYW5zbGF0ZSBjb2wsLmNsZWFuc2xhdGUgY29sZ3JvdXAsLmNsZWFuc2xhdGUgZGF0YWxpc3QsLmNsZWFuc2xhdGUgZGQsLmNsZWFuc2xhdGUgZGVsLC5jbGVhbnNsYXRlIGRmbiwuY2xlYW5zbGF0ZSBkaXYsLmNsZWFuc2xhdGUgZGwsLmNsZWFuc2xhdGUgZHQsLmNsZWFuc2xhdGUgZW0sLmNsZWFuc2xhdGUgZmllbGRzZXQsLmNsZWFuc2xhdGUgZmlnY2FwdGlvbiwuY2xlYW5zbGF0ZSBmaWd1cmUsLmNsZWFuc2xhdGUgZm9vdGVyLC5jbGVhbnNsYXRlIGZvcm0sLmNsZWFuc2xhdGUgaDEsLmNsZWFuc2xhdGUgaDIsLmNsZWFuc2xhdGUgaDMsLmNsZWFuc2xhdGUgaDQsLmNsZWFuc2xhdGUgaDUsLmNsZWFuc2xhdGUgaDYsLmNsZWFuc2xhdGUgaGVhZGVyLC5jbGVhbnNsYXRlIGhyLC5jbGVhbnNsYXRlIGksLmNsZWFuc2xhdGUgaWZyYW1lLC5jbGVhbnNsYXRlIGltZywuY2xlYW5zbGF0ZSBpbnB1dCwuY2xlYW5zbGF0ZSBpbnMsLmNsZWFuc2xhdGUga2JkLC5jbGVhbnNsYXRlIGxhYmVsLC5jbGVhbnNsYXRlIGxlZ2VuZCwuY2xlYW5zbGF0ZSBsaSwuY2xlYW5zbGF0ZSBtYWluLC5jbGVhbnNsYXRlIG1hcCwuY2xlYW5zbGF0ZSBtYXJrLC5jbGVhbnNsYXRlIG1lbnUsLmNsZWFuc2xhdGUgbWV0YSwuY2xlYW5zbGF0ZSBuYXYsLmNsZWFuc2xhdGUgb2JqZWN0LC5jbGVhbnNsYXRlIG9sLC5jbGVhbnNsYXRlIG9wdGdyb3VwLC5jbGVhbnNsYXRlIG9wdGlvbiwuY2xlYW5zbGF0ZSBvdXRwdXQsLmNsZWFuc2xhdGUgcCwuY2xlYW5zbGF0ZSBwcmUsLmNsZWFuc2xhdGUgcHJvZ3Jlc3MsLmNsZWFuc2xhdGUgcSwuY2xlYW5zbGF0ZSBzYW1wLC5jbGVhbnNsYXRlIHNlY3Rpb24sLmNsZWFuc2xhdGUgc2VsZWN0LC5jbGVhbnNsYXRlIHNtYWxsLC5jbGVhbnNsYXRlIHNwYW4sLmNsZWFuc2xhdGUgc3RyaWtlLC5jbGVhbnNsYXRlIHN0cm9uZywuY2xlYW5zbGF0ZSBzdWIsLmNsZWFuc2xhdGUgc3VtbWFyeSwuY2xlYW5zbGF0ZSBzdXAsLmNsZWFuc2xhdGUgc3ZnLC5jbGVhbnNsYXRlIHRhYmxlLC5jbGVhbnNsYXRlIHRib2R5LC5jbGVhbnNsYXRlIHRkLC5jbGVhbnNsYXRlIHRleHRhcmVhLC5jbGVhbnNsYXRlIHRmb290LC5jbGVhbnNsYXRlIHRoLC5jbGVhbnNsYXRlIHRoZWFkLC5jbGVhbnNsYXRlIHRpbWUsLmNsZWFuc2xhdGUgdHIsLmNsZWFuc2xhdGUgdHQsLmNsZWFuc2xhdGUgdWwsLmNsZWFuc2xhdGUgdmFyLC5jbGVhbnNsYXRlIHZpZGVve2JhY2tncm91bmQtYXR0YWNobWVudDpzY3JvbGwhaW1wb3J0YW50O2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQhaW1wb3J0YW50O2JhY2tncm91bmQtaW1hZ2U6bm9uZSFpbXBvcnRhbnQ7YmFja2dyb3VuZC1wb3NpdGlvbjowIDAhaW1wb3J0YW50O2JhY2tncm91bmQtcmVwZWF0OnJlcGVhdCFpbXBvcnRhbnQ7Ym9yZGVyLWNvbG9yOiMwMDAhaW1wb3J0YW50O2JvcmRlci1jb2xvcjpjdXJyZW50Q29sb3IhaW1wb3J0YW50O2JvcmRlci1yYWRpdXM6MCFpbXBvcnRhbnQ7Ym9yZGVyLXN0eWxlOm5vbmUhaW1wb3J0YW50O2JvcmRlci13aWR0aDptZWRpdW0haW1wb3J0YW50O2JvdHRvbTphdXRvIWltcG9ydGFudDtjbGVhcjpub25lIWltcG9ydGFudDtjbGlwOmF1dG8haW1wb3J0YW50O2NvbG9yOmluaGVyaXQhaW1wb3J0YW50O2NvdW50ZXItaW5jcmVtZW50Om5vbmUhaW1wb3J0YW50O2NvdW50ZXItcmVzZXQ6bm9uZSFpbXBvcnRhbnQ7Y3Vyc29yOmF1dG8haW1wb3J0YW50O2RpcmVjdGlvbjppbmhlcml0IWltcG9ydGFudDtkaXNwbGF5OmlubGluZSFpbXBvcnRhbnQ7ZmxvYXQ6bm9uZSFpbXBvcnRhbnQ7Zm9udC1mYW1pbHk6aW5oZXJpdCFpbXBvcnRhbnQ7Zm9udC1zaXplOmluaGVyaXQhaW1wb3J0YW50O2ZvbnQtc3R5bGU6aW5oZXJpdCFpbXBvcnRhbnQ7Zm9udC12YXJpYW50Om5vcm1hbCFpbXBvcnRhbnQ7Zm9udC13ZWlnaHQ6aW5oZXJpdCFpbXBvcnRhbnQ7aGVpZ2h0OmF1dG8haW1wb3J0YW50O2xlZnQ6YXV0byFpbXBvcnRhbnQ7bGV0dGVyLXNwYWNpbmc6bm9ybWFsIWltcG9ydGFudDtsaW5lLWhlaWdodDppbmhlcml0IWltcG9ydGFudDtsaXN0LXN0eWxlLXR5cGU6aW5oZXJpdCFpbXBvcnRhbnQ7bGlzdC1zdHlsZS1wb3NpdGlvbjpvdXRzaWRlIWltcG9ydGFudDtsaXN0LXN0eWxlLWltYWdlOm5vbmUhaW1wb3J0YW50O21hcmdpbjowIWltcG9ydGFudDttYXgtaGVpZ2h0Om5vbmUhaW1wb3J0YW50O21heC13aWR0aDpub25lIWltcG9ydGFudDttaW4taGVpZ2h0OjAhaW1wb3J0YW50O21pbi13aWR0aDowIWltcG9ydGFudDtvcGFjaXR5OjE7b3V0bGluZTppbnZlcnQgbm9uZSBtZWRpdW0haW1wb3J0YW50O292ZXJmbG93OnZpc2libGUhaW1wb3J0YW50O3BhZGRpbmc6MCFpbXBvcnRhbnQ7cG9zaXRpb246c3RhdGljIWltcG9ydGFudDtxdW90ZXM6IiIgIiIhaW1wb3J0YW50O3JpZ2h0OmF1dG8haW1wb3J0YW50O3RhYmxlLWxheW91dDphdXRvIWltcG9ydGFudDt0ZXh0LWFsaWduOmluaGVyaXQhaW1wb3J0YW50O3RleHQtZGVjb3JhdGlvbjppbmhlcml0IWltcG9ydGFudDt0ZXh0LWluZGVudDowIWltcG9ydGFudDt0ZXh0LXRyYW5zZm9ybTpub25lIWltcG9ydGFudDt0b3A6YXV0byFpbXBvcnRhbnQ7dW5pY29kZS1iaWRpOm5vcm1hbCFpbXBvcnRhbnQ7dmVydGljYWwtYWxpZ246YmFzZWxpbmUhaW1wb3J0YW50O3Zpc2liaWxpdHk6aW5oZXJpdCFpbXBvcnRhbnQ7d2hpdGUtc3BhY2U6bm9ybWFsIWltcG9ydGFudDt3aWR0aDphdXRvIWltcG9ydGFudDt3b3JkLXNwYWNpbmc6bm9ybWFsIWltcG9ydGFudDt6LWluZGV4OmF1dG8haW1wb3J0YW50Oy13ZWJraXQtYmFja2dyb3VuZC1vcmlnaW46cGFkZGluZy1ib3ghaW1wb3J0YW50O2JhY2tncm91bmQtb3JpZ2luOnBhZGRpbmctYm94IWltcG9ydGFudDstd2Via2l0LWJhY2tncm91bmQtY2xpcDpib3JkZXItYm94IWltcG9ydGFudDtiYWNrZ3JvdW5kLWNsaXA6Ym9yZGVyLWJveCFpbXBvcnRhbnQ7LXdlYmtpdC1iYWNrZ3JvdW5kLXNpemU6YXV0byFpbXBvcnRhbnQ7LW1vei1iYWNrZ3JvdW5kLXNpemU6YXV0byFpbXBvcnRhbnQ7YmFja2dyb3VuZC1zaXplOmF1dG8haW1wb3J0YW50Oy13ZWJraXQtYm9yZGVyLWltYWdlOm5vbmUhaW1wb3J0YW50Oy1tb3otYm9yZGVyLWltYWdlOm5vbmUhaW1wb3J0YW50Oy1vLWJvcmRlci1pbWFnZTpub25lIWltcG9ydGFudDtib3JkZXItaW1hZ2U6bm9uZSFpbXBvcnRhbnQ7LXdlYmtpdC1ib3JkZXItcmFkaXVzOjAhaW1wb3J0YW50Oy1tb3otYm9yZGVyLXJhZGl1czowIWltcG9ydGFudDtib3JkZXItcmFkaXVzOjAhaW1wb3J0YW50Oy13ZWJraXQtYm94LXNoYWRvdzpub25lIWltcG9ydGFudDtib3gtc2hhZG93Om5vbmUhaW1wb3J0YW50Oy13ZWJraXQtYm94LXNpemluZzpjb250ZW50LWJveCFpbXBvcnRhbnQ7LW1vei1ib3gtc2l6aW5nOmNvbnRlbnQtYm94IWltcG9ydGFudDtib3gtc2l6aW5nOmNvbnRlbnQtYm94IWltcG9ydGFudDstd2Via2l0LWNvbHVtbi1jb3VudDphdXRvIWltcG9ydGFudDstbW96LWNvbHVtbi1jb3VudDphdXRvIWltcG9ydGFudDtjb2x1bW4tY291bnQ6YXV0byFpbXBvcnRhbnQ7LXdlYmtpdC1jb2x1bW4tZ2FwOm5vcm1hbCFpbXBvcnRhbnQ7LW1vei1jb2x1bW4tZ2FwOm5vcm1hbCFpbXBvcnRhbnQ7Y29sdW1uLWdhcDpub3JtYWwhaW1wb3J0YW50Oy13ZWJraXQtY29sdW1uLXJ1bGU6bWVkaXVtIG5vbmUgIzAwMCFpbXBvcnRhbnQ7LW1vei1jb2x1bW4tcnVsZTptZWRpdW0gbm9uZSAjMDAwIWltcG9ydGFudDtjb2x1bW4tcnVsZTptZWRpdW0gbm9uZSAjMDAwIWltcG9ydGFudDstd2Via2l0LWNvbHVtbi1zcGFuOjEhaW1wb3J0YW50Oy1tb3otY29sdW1uLXNwYW46MSFpbXBvcnRhbnQ7Y29sdW1uLXNwYW46MSFpbXBvcnRhbnQ7LXdlYmtpdC1jb2x1bW4td2lkdGg6YXV0byFpbXBvcnRhbnQ7LW1vei1jb2x1bW4td2lkdGg6YXV0byFpbXBvcnRhbnQ7Y29sdW1uLXdpZHRoOmF1dG8haW1wb3J0YW50O2ZvbnQtZmVhdHVyZS1zZXR0aW5nczpub3JtYWwhaW1wb3J0YW50O292ZXJmbG93LXg6dmlzaWJsZSFpbXBvcnRhbnQ7b3ZlcmZsb3cteTp2aXNpYmxlIWltcG9ydGFudDstd2Via2l0LWh5cGhlbnM6bWFudWFsIWltcG9ydGFudDstbW96LWh5cGhlbnM6bWFudWFsIWltcG9ydGFudDtoeXBoZW5zOm1hbnVhbCFpbXBvcnRhbnQ7LXdlYmtpdC1wZXJzcGVjdGl2ZTpub25lIWltcG9ydGFudDstbW96LXBlcnNwZWN0aXZlOm5vbmUhaW1wb3J0YW50Oy1tcy1wZXJzcGVjdGl2ZTpub25lIWltcG9ydGFudDstby1wZXJzcGVjdGl2ZTpub25lIWltcG9ydGFudDtwZXJzcGVjdGl2ZTpub25lIWltcG9ydGFudDstd2Via2l0LXBlcnNwZWN0aXZlLW9yaWdpbjo1MCUgNTAlIWltcG9ydGFudDstbW96LXBlcnNwZWN0aXZlLW9yaWdpbjo1MCUgNTAlIWltcG9ydGFudDstbXMtcGVyc3BlY3RpdmUtb3JpZ2luOjUwJSA1MCUhaW1wb3J0YW50Oy1vLXBlcnNwZWN0aXZlLW9yaWdpbjo1MCUgNTAlIWltcG9ydGFudDtwZXJzcGVjdGl2ZS1vcmlnaW46NTAlIDUwJSFpbXBvcnRhbnQ7LXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OnZpc2libGUhaW1wb3J0YW50Oy1tb3otYmFja2ZhY2UtdmlzaWJpbGl0eTp2aXNpYmxlIWltcG9ydGFudDstbXMtYmFja2ZhY2UtdmlzaWJpbGl0eTp2aXNpYmxlIWltcG9ydGFudDstby1iYWNrZmFjZS12aXNpYmlsaXR5OnZpc2libGUhaW1wb3J0YW50O2JhY2tmYWNlLXZpc2liaWxpdHk6dmlzaWJsZSFpbXBvcnRhbnQ7dGV4dC1zaGFkb3c6bm9uZSFpbXBvcnRhbnQ7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAwcyBlYXNlIDBzIWltcG9ydGFudDt0cmFuc2l0aW9uOmFsbCAwcyBlYXNlIDBzIWltcG9ydGFudDstd2Via2l0LXRyYW5zZm9ybTpub25lIWltcG9ydGFudDstbW96LXRyYW5zZm9ybTpub25lIWltcG9ydGFudDstbXMtdHJhbnNmb3JtOm5vbmUhaW1wb3J0YW50Oy1vLXRyYW5zZm9ybTpub25lIWltcG9ydGFudDt0cmFuc2Zvcm06bm9uZSFpbXBvcnRhbnQ7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjUwJSA1MCUhaW1wb3J0YW50Oy1tb3otdHJhbnNmb3JtLW9yaWdpbjo1MCUgNTAlIWltcG9ydGFudDstbXMtdHJhbnNmb3JtLW9yaWdpbjo1MCUgNTAlIWltcG9ydGFudDstby10cmFuc2Zvcm0tb3JpZ2luOjUwJSA1MCUhaW1wb3J0YW50O3RyYW5zZm9ybS1vcmlnaW46NTAlIDUwJSFpbXBvcnRhbnQ7LXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6ZmxhdCFpbXBvcnRhbnQ7LW1vei10cmFuc2Zvcm0tc3R5bGU6ZmxhdCFpbXBvcnRhbnQ7LW1zLXRyYW5zZm9ybS1zdHlsZTpmbGF0IWltcG9ydGFudDstby10cmFuc2Zvcm0tc3R5bGU6ZmxhdCFpbXBvcnRhbnQ7dHJhbnNmb3JtLXN0eWxlOmZsYXQhaW1wb3J0YW50O3dvcmQtYnJlYWs6bm9ybWFsIWltcG9ydGFudH0uY2xlYW5zbGF0ZSwuY2xlYW5zbGF0ZSBhZGRyZXNzLC5jbGVhbnNsYXRlIGFydGljbGUsLmNsZWFuc2xhdGUgYXVkaW8sLmNsZWFuc2xhdGUgYmxvY2txdW90ZSwuY2xlYW5zbGF0ZSBjYXB0aW9uLC5jbGVhbnNsYXRlIGNvbGdyb3VwLC5jbGVhbnNsYXRlIGRkLC5jbGVhbnNsYXRlIGRpYWxvZywuY2xlYW5zbGF0ZSBkaXYsLmNsZWFuc2xhdGUgZGwsLmNsZWFuc2xhdGUgZHQsLmNsZWFuc2xhdGUgZmllbGRzZXQsLmNsZWFuc2xhdGUgZmlndXJlLC5jbGVhbnNsYXRlIGZvb3RlciwuY2xlYW5zbGF0ZSBmb3JtLC5jbGVhbnNsYXRlIGgxLC5jbGVhbnNsYXRlIGgyLC5jbGVhbnNsYXRlIGgzLC5jbGVhbnNsYXRlIGg0LC5jbGVhbnNsYXRlIGg1LC5jbGVhbnNsYXRlIGg2LC5jbGVhbnNsYXRlIGhlYWRlciwuY2xlYW5zbGF0ZSBoZ3JvdXAsLmNsZWFuc2xhdGUgaHIsLmNsZWFuc2xhdGUgbWFpbiwuY2xlYW5zbGF0ZSBtZW51LC5jbGVhbnNsYXRlIG5hdiwuY2xlYW5zbGF0ZSBvbCwuY2xlYW5zbGF0ZSBvcHRpb24sLmNsZWFuc2xhdGUgcCwuY2xlYW5zbGF0ZSBwcmUsLmNsZWFuc2xhdGUgcHJvZ3Jlc3MsLmNsZWFuc2xhdGUgc2VjdGlvbiwuY2xlYW5zbGF0ZSBzdW1tYXJ5LC5jbGVhbnNsYXRlIHVsLC5jbGVhbnNsYXRlIHZpZGVve2Rpc3BsYXk6YmxvY2shaW1wb3J0YW50fS5jbGVhbnNsYXRlIGgxLC5jbGVhbnNsYXRlIGgyLC5jbGVhbnNsYXRlIGgzLC5jbGVhbnNsYXRlIGg0LC5jbGVhbnNsYXRlIGg1LC5jbGVhbnNsYXRlIGg2e2ZvbnQtd2VpZ2h0OjcwMCFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgaDF7Zm9udC1zaXplOjJlbSFpbXBvcnRhbnQ7cGFkZGluZzouNjdlbSAwIWltcG9ydGFudH0uY2xlYW5zbGF0ZSBoMntmb250LXNpemU6MS41ZW0haW1wb3J0YW50O3BhZGRpbmc6LjgzZW0gMCFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgaDN7Zm9udC1zaXplOjEuMTdlbSFpbXBvcnRhbnQ7cGFkZGluZzouODNlbSAwIWltcG9ydGFudH0uY2xlYW5zbGF0ZSBoNHtmb250LXNpemU6MWVtIWltcG9ydGFudH0uY2xlYW5zbGF0ZSBoNXtmb250LXNpemU6LjgzZW0haW1wb3J0YW50fS5jbGVhbnNsYXRlIHB7bWFyZ2luOjFlbSAwIWltcG9ydGFudH0uY2xlYW5zbGF0ZSB0YWJsZXtkaXNwbGF5OnRhYmxlIWltcG9ydGFudH0uY2xlYW5zbGF0ZSB0aGVhZHtkaXNwbGF5OnRhYmxlLWhlYWRlci1ncm91cCFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgdGJvZHl7ZGlzcGxheTp0YWJsZS1yb3ctZ3JvdXAhaW1wb3J0YW50fS5jbGVhbnNsYXRlIHRmb290e2Rpc3BsYXk6dGFibGUtZm9vdGVyLWdyb3VwIWltcG9ydGFudH0uY2xlYW5zbGF0ZSB0cntkaXNwbGF5OnRhYmxlLXJvdyFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgdGQsLmNsZWFuc2xhdGUgdGh7ZGlzcGxheTp0YWJsZS1jZWxsIWltcG9ydGFudDtwYWRkaW5nOjJweCFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgb2wsLmNsZWFuc2xhdGUgdWx7bWFyZ2luOjFlbSAwIWltcG9ydGFudH0uY2xlYW5zbGF0ZSBvbCBsaSwuY2xlYW5zbGF0ZSBvbCBvbCBsaSwuY2xlYW5zbGF0ZSBvbCBvbCBvbCBsaSwuY2xlYW5zbGF0ZSBvbCBvbCB1bCBsaSwuY2xlYW5zbGF0ZSBvbCB1bCB1bCBsaSwuY2xlYW5zbGF0ZSB1bCBsaSwuY2xlYW5zbGF0ZSB1bCBvbCBvbCBsaSwuY2xlYW5zbGF0ZSB1bCB1bCBsaSwuY2xlYW5zbGF0ZSB1bCB1bCBvbCBsaSwuY2xlYW5zbGF0ZSB1bCB1bCB1bCBsaXtsaXN0LXN0eWxlLXBvc2l0aW9uOmluc2lkZSFpbXBvcnRhbnQ7bWFyZ2luLXRvcDouMDhlbSFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgb2wgb2wsLmNsZWFuc2xhdGUgb2wgb2wgb2wsLmNsZWFuc2xhdGUgb2wgb2wgdWwsLmNsZWFuc2xhdGUgb2wgdWwsLmNsZWFuc2xhdGUgb2wgdWwgdWwsLmNsZWFuc2xhdGUgdWwgb2wsLmNsZWFuc2xhdGUgdWwgb2wgb2wsLmNsZWFuc2xhdGUgdWwgdWwsLmNsZWFuc2xhdGUgdWwgdWwgb2wsLmNsZWFuc2xhdGUgdWwgdWwgdWx7cGFkZGluZy1sZWZ0OjQwcHghaW1wb3J0YW50O21hcmdpbjowIWltcG9ydGFudH0uY2xlYW5zbGF0ZSBuYXYgb2wsLmNsZWFuc2xhdGUgbmF2IHVse2xpc3Qtc3R5bGUtdHlwZTpub25lIWltcG9ydGFudH0uY2xlYW5zbGF0ZSBtZW51LC5jbGVhbnNsYXRlIHVse2xpc3Qtc3R5bGUtdHlwZTpkaXNjIWltcG9ydGFudH0uY2xlYW5zbGF0ZSBvbHtsaXN0LXN0eWxlLXR5cGU6ZGVjaW1hbCFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgbWVudSBtZW51LC5jbGVhbnNsYXRlIG1lbnUgdWwsLmNsZWFuc2xhdGUgb2wgbWVudSwuY2xlYW5zbGF0ZSBvbCB1bCwuY2xlYW5zbGF0ZSB1bCBtZW51LC5jbGVhbnNsYXRlIHVsIHVse2xpc3Qtc3R5bGUtdHlwZTpjaXJjbGUhaW1wb3J0YW50fS5jbGVhbnNsYXRlIG1lbnUgbWVudSBtZW51LC5jbGVhbnNsYXRlIG1lbnUgbWVudSB1bCwuY2xlYW5zbGF0ZSBtZW51IG9sIG1lbnUsLmNsZWFuc2xhdGUgbWVudSBvbCB1bCwuY2xlYW5zbGF0ZSBtZW51IHVsIG1lbnUsLmNsZWFuc2xhdGUgbWVudSB1bCB1bCwuY2xlYW5zbGF0ZSBvbCBtZW51IG1lbnUsLmNsZWFuc2xhdGUgb2wgbWVudSB1bCwuY2xlYW5zbGF0ZSBvbCBvbCBtZW51LC5jbGVhbnNsYXRlIG9sIG9sIHVsLC5jbGVhbnNsYXRlIG9sIHVsIG1lbnUsLmNsZWFuc2xhdGUgb2wgdWwgdWwsLmNsZWFuc2xhdGUgdWwgbWVudSBtZW51LC5jbGVhbnNsYXRlIHVsIG1lbnUgdWwsLmNsZWFuc2xhdGUgdWwgb2wgbWVudSwuY2xlYW5zbGF0ZSB1bCBvbCB1bCwuY2xlYW5zbGF0ZSB1bCB1bCBtZW51LC5jbGVhbnNsYXRlIHVsIHVsIHVse2xpc3Qtc3R5bGUtdHlwZTpzcXVhcmUhaW1wb3J0YW50fS5jbGVhbnNsYXRlIGxpe2Rpc3BsYXk6bGlzdC1pdGVtIWltcG9ydGFudDttaW4taGVpZ2h0OmF1dG8haW1wb3J0YW50O21pbi13aWR0aDphdXRvIWltcG9ydGFudDtwYWRkaW5nLWxlZnQ6MjBweCFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgc3Ryb25ne2ZvbnQtd2VpZ2h0OjcwMCFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgZW17Zm9udC1zdHlsZTppdGFsaWMhaW1wb3J0YW50fS5jbGVhbnNsYXRlIGNvZGUsLmNsZWFuc2xhdGUga2JkLC5jbGVhbnNsYXRlIHByZSwuY2xlYW5zbGF0ZSBzYW1we2ZvbnQtZmFtaWx5Om1vbm9zcGFjZSFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgYXtjb2xvcjojMDBmIWltcG9ydGFudDt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lIWltcG9ydGFudH0uY2xlYW5zbGF0ZSBhOnZpc2l0ZWR7Y29sb3I6IzUyOSFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgYSwuY2xlYW5zbGF0ZSBhICosLmNsZWFuc2xhdGUgYnV0dG9uLC5jbGVhbnNsYXRlIGlucHV0W3R5cGU9YnV0dG9uXSwuY2xlYW5zbGF0ZSBpbnB1dFt0eXBlPWNoZWNrYm94XSwuY2xlYW5zbGF0ZSBpbnB1dFt0eXBlPXJhZGlvXSwuY2xlYW5zbGF0ZSBpbnB1dFt0eXBlPXN1Ym1pdF0sLmNsZWFuc2xhdGUgc2VsZWN0e2N1cnNvcjpwb2ludGVyIWltcG9ydGFudH0uY2xlYW5zbGF0ZSBidXR0b24sLmNsZWFuc2xhdGUgaW5wdXRbdHlwZT1zdWJtaXRde3RleHQtYWxpZ246Y2VudGVyIWltcG9ydGFudDtwYWRkaW5nOjJweCA2cHggM3B4IWltcG9ydGFudDtib3JkZXItcmFkaXVzOjRweCFpbXBvcnRhbnQ7dGV4dC1kZWNvcmF0aW9uOm5vbmUhaW1wb3J0YW50O2ZvbnQtZmFtaWx5OmFyaWFsLGhlbHZldGljYSxzYW5zLXNlcmlmIWltcG9ydGFudDtmb250LXNpemU6c21hbGwhaW1wb3J0YW50O2JhY2tncm91bmQ6I2ZmZiFpbXBvcnRhbnQ7LXdlYmtpdC1hcHBlYXJhbmNlOnB1c2gtYnV0dG9uIWltcG9ydGFudDtjb2xvcjpidXR0b250ZXh0IWltcG9ydGFudDtib3JkZXI6MXB4ICNhNmE2YTYgc29saWQhaW1wb3J0YW50O2JhY2tncm91bmQ6I2QzZDNkMyFpbXBvcnRhbnQ7YmFja2dyb3VuZDojZmZmO2JhY2tncm91bmQ6LW1vei1saW5lYXItZ3JhZGllbnQodG9wLCNmZmYgMCwjZGRkIDEwMCUsI2QxZDFkMSAxMDAlLCNkZGQgMTAwJSkhaW1wb3J0YW50O2JhY2tncm91bmQ6LXdlYmtpdC1ncmFkaWVudChsaW5lYXIsbGVmdCB0b3AsbGVmdCBib3R0b20sY29sb3Itc3RvcCgwLCNmZmYpLGNvbG9yLXN0b3AoMTAwJSwjZGRkKSxjb2xvci1zdG9wKDEwMCUsI2QxZDFkMSksY29sb3Itc3RvcCgxMDAlLCNkZGQpKSFpbXBvcnRhbnQ7YmFja2dyb3VuZDotd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsI2ZmZiAwLCNkZGQgMTAwJSwjZDFkMWQxIDEwMCUsI2RkZCAxMDAlKSFpbXBvcnRhbnQ7YmFja2dyb3VuZDotby1saW5lYXItZ3JhZGllbnQodG9wLCNmZmYgMCwjZGRkIDEwMCUsI2QxZDFkMSAxMDAlLCNkZGQgMTAwJSkhaW1wb3J0YW50O2JhY2tncm91bmQ6LW1zLWxpbmVhci1ncmFkaWVudCh0b3AsI2ZmZiAwLCNkZGQgMTAwJSwjZDFkMWQxIDEwMCUsI2RkZCAxMDAlKSFpbXBvcnRhbnQ7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCNmZmYgMCwjZGRkIDEwMCUsI2QxZDFkMSAxMDAlLCNkZGQgMTAwJSkhaW1wb3J0YW50Oy13ZWJraXQtYm94LXNoYWRvdzoxcHggMXB4IDAgI2VlZSFpbXBvcnRhbnQ7LW1vei1ib3gtc2hhZG93OjFweCAxcHggMCAjZWVlIWltcG9ydGFudDstby1ib3gtc2hhZG93OjFweCAxcHggMCAjZWVlIWltcG9ydGFudDtib3gtc2hhZG93OjFweCAxcHggMCAjZWVlIWltcG9ydGFudDtvdXRsaW5lOmluaXRpYWwhaW1wb3J0YW50fS5jbGVhbnNsYXRlIGJ1dHRvbjphY3RpdmUsLmNsZWFuc2xhdGUgaW5wdXRbdHlwZT1idXR0b25dOmFjdGl2ZSwuY2xlYW5zbGF0ZSBpbnB1dFt0eXBlPXN1Ym1pdF06YWN0aXZle2JhY2tncm91bmQ6IzNiNjc5ZSFpbXBvcnRhbnQ7YmFja2dyb3VuZDotbW96LWxpbmVhci1ncmFkaWVudCh0b3AsIzNiNjc5ZSAwLCMyYjg4ZDkgNTAlLCMyMDdjY2EgNTElLCM3ZGI5ZTggMTAwJSkhaW1wb3J0YW50O2JhY2tncm91bmQ6LXdlYmtpdC1ncmFkaWVudChsaW5lYXIsbGVmdCB0b3AsbGVmdCBib3R0b20sY29sb3Itc3RvcCgwLCMzYjY3OWUpLGNvbG9yLXN0b3AoNTAlLCMyYjg4ZDkpLGNvbG9yLXN0b3AoNTElLCMyMDdjY2EpLGNvbG9yLXN0b3AoMTAwJSwjN2RiOWU4KSkhaW1wb3J0YW50O2JhY2tncm91bmQ6LXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCMzYjY3OWUgMCwjMmI4OGQ5IDUwJSwjMjA3Y2NhIDUxJSwjN2RiOWU4IDEwMCUpIWltcG9ydGFudDtiYWNrZ3JvdW5kOi1vLWxpbmVhci1ncmFkaWVudCh0b3AsIzNiNjc5ZSAwLCMyYjg4ZDkgNTAlLCMyMDdjY2EgNTElLCM3ZGI5ZTggMTAwJSkhaW1wb3J0YW50O2JhY2tncm91bmQ6LW1zLWxpbmVhci1ncmFkaWVudCh0b3AsIzNiNjc5ZSAwLCMyYjg4ZDkgNTAlLCMyMDdjY2EgNTElLCM3ZGI5ZTggMTAwJSkhaW1wb3J0YW50O2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwjM2I2NzllIDAsIzJiODhkOSA1MCUsIzIwN2NjYSA1MSUsIzdkYjllOCAxMDAlKSFpbXBvcnRhbnQ7Ym9yZGVyLWNvbG9yOiM1MjU5YjAhaW1wb3J0YW50fS5jbGVhbnNsYXRlIGJ1dHRvbntwYWRkaW5nOjFweCA2cHggMnB4IDZweCFpbXBvcnRhbnQ7bWFyZ2luLXJpZ2h0OjVweCFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgaW5wdXRbdHlwZT1oaWRkZW5de2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgdGV4dGFyZWF7LXdlYmtpdC1hcHBlYXJhbmNlOnRleHRhcmVhIWltcG9ydGFudDtiYWNrZ3JvdW5kOiNmZmYhaW1wb3J0YW50O3BhZGRpbmc6MnB4IWltcG9ydGFudDttYXJnaW4tbGVmdDo0cHghaW1wb3J0YW50O3dvcmQtd3JhcDpicmVhay13b3JkIWltcG9ydGFudDt3aGl0ZS1zcGFjZTpwcmUtd3JhcCFpbXBvcnRhbnQ7Zm9udC1zaXplOjExcHghaW1wb3J0YW50O2ZvbnQtZmFtaWx5OmFyaWFsLGhlbHZldGljYSxzYW5zLXNlcmlmIWltcG9ydGFudDtsaW5lLWhlaWdodDoxM3B4IWltcG9ydGFudDtyZXNpemU6Ym90aCFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgaW5wdXQsLmNsZWFuc2xhdGUgc2VsZWN0LC5jbGVhbnNsYXRlIHRleHRhcmVhe2JvcmRlcjoxcHggc29saWQgI2NjYyFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgc2VsZWN0e2ZvbnQtc2l6ZToxMXB4IWltcG9ydGFudDtmb250LWZhbWlseTpoZWx2ZXRpY2EsYXJpYWwsc2Fucy1zZXJpZiFpbXBvcnRhbnQ7ZGlzcGxheTppbmxpbmUtYmxvY2t9LmNsZWFuc2xhdGUgaW5wdXQ6Zm9jdXMsLmNsZWFuc2xhdGUgdGV4dGFyZWE6Zm9jdXN7b3V0bGluZTphdXRvIDVweCAtd2Via2l0LWZvY3VzLXJpbmctY29sb3IhaW1wb3J0YW50O291dGxpbmU6aW5pdGlhbCFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgaW5wdXRbdHlwZT10ZXh0XXtiYWNrZ3JvdW5kOiNmZmYhaW1wb3J0YW50O3BhZGRpbmc6MXB4IWltcG9ydGFudDtmb250LWZhbWlseTppbml0aWFsIWltcG9ydGFudDtmb250LXNpemU6c21hbGwhaW1wb3J0YW50fS5jbGVhbnNsYXRlIGlucHV0W3R5cGU9Y2hlY2tib3hdLC5jbGVhbnNsYXRlIGlucHV0W3R5cGU9cmFkaW9de2JvcmRlcjoxcHggIzJiMmIyYiBzb2xpZCFpbXBvcnRhbnQ7Ym9yZGVyLXJhZGl1czo0cHghaW1wb3J0YW50fS5jbGVhbnNsYXRlIGlucHV0W3R5cGU9Y2hlY2tib3hdLC5jbGVhbnNsYXRlIGlucHV0W3R5cGU9cmFkaW9de291dGxpbmU6aW5pdGlhbCFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgaW5wdXRbdHlwZT1yYWRpb117bWFyZ2luOjJweCAycHggM3B4IDJweCFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgYWJiclt0aXRsZV0sLmNsZWFuc2xhdGUgYWNyb255bVt0aXRsZV0sLmNsZWFuc2xhdGUgZGZuW3RpdGxlXXtjdXJzb3I6aGVscCFpbXBvcnRhbnQ7Ym9yZGVyLWJvdHRvbS13aWR0aDoxcHghaW1wb3J0YW50O2JvcmRlci1ib3R0b20tc3R5bGU6ZG90dGVkIWltcG9ydGFudH0uY2xlYW5zbGF0ZSBpbnN7YmFja2dyb3VuZC1jb2xvcjojZmY5IWltcG9ydGFudDtjb2xvcjojMDAwIWltcG9ydGFudH0uY2xlYW5zbGF0ZSBkZWx7dGV4dC1kZWNvcmF0aW9uOmxpbmUtdGhyb3VnaCFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgYmxvY2txdW90ZSwuY2xlYW5zbGF0ZSBxe3F1b3Rlczpub25lIWltcG9ydGFudH0uY2xlYW5zbGF0ZSBibG9ja3F1b3RlOmFmdGVyLC5jbGVhbnNsYXRlIGJsb2NrcXVvdGU6YmVmb3JlLC5jbGVhbnNsYXRlIGxpOmFmdGVyLC5jbGVhbnNsYXRlIGxpOmJlZm9yZSwuY2xlYW5zbGF0ZSBxOmFmdGVyLC5jbGVhbnNsYXRlIHE6YmVmb3Jle2NvbnRlbnQ6IiIhaW1wb3J0YW50fS5jbGVhbnNsYXRlIGlucHV0LC5jbGVhbnNsYXRlIHNlbGVjdHt2ZXJ0aWNhbC1hbGlnbjptaWRkbGUhaW1wb3J0YW50fS5jbGVhbnNsYXRlIHRhYmxle2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZSFpbXBvcnRhbnQ7Ym9yZGVyLXNwYWNpbmc6MCFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgaHJ7ZGlzcGxheTpibG9jayFpbXBvcnRhbnQ7aGVpZ2h0OjFweCFpbXBvcnRhbnQ7Ym9yZGVyOjAhaW1wb3J0YW50O2JvcmRlci10b3A6MXB4IHNvbGlkICNjY2MhaW1wb3J0YW50O21hcmdpbjoxZW0gMCFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgW2Rpcj1ydGxde2RpcmVjdGlvbjpydGwhaW1wb3J0YW50fS5jbGVhbnNsYXRlIG1hcmt7YmFja2dyb3VuZC1jb2xvcjojZmY5IWltcG9ydGFudDtjb2xvcjojMDAwIWltcG9ydGFudDtmb250LXN0eWxlOml0YWxpYyFpbXBvcnRhbnQ7Zm9udC13ZWlnaHQ6NzAwIWltcG9ydGFudH0uY2xlYW5zbGF0ZSBtZW51e3BhZGRpbmctbGVmdDo0MHB4IWltcG9ydGFudDtwYWRkaW5nLXRvcDo4cHghaW1wb3J0YW50fS5jbGVhbnNsYXRlIFtoaWRkZW5dLC5jbGVhbnNsYXRlIHRlbXBsYXRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgYWJiclt0aXRsZV17Ym9yZGVyLWJvdHRvbToxcHggZG90dGVkIWltcG9ydGFudH0uY2xlYW5zbGF0ZSBzdWIsLmNsZWFuc2xhdGUgc3Vwe2ZvbnQtc2l6ZTo3NSUhaW1wb3J0YW50O2xpbmUtaGVpZ2h0OjAhaW1wb3J0YW50O3Bvc2l0aW9uOnJlbGF0aXZlIWltcG9ydGFudDt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZSFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgc3Vwe3RvcDotLjVlbSFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgc3Vie2JvdHRvbTotLjI1ZW0haW1wb3J0YW50fS5jbGVhbnNsYXRlIGltZ3tib3JkZXI6MCFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgZmlndXJle21hcmdpbjowIWltcG9ydGFudH0uY2xlYW5zbGF0ZSB0ZXh0YXJlYXtvdmVyZmxvdzphdXRvIWltcG9ydGFudDt2ZXJ0aWNhbC1hbGlnbjp0b3AhaW1wb3J0YW50fS5jbGVhbnNsYXRle2ZvbnQtc2l6ZTptZWRpdW0haW1wb3J0YW50O2xpbmUtaGVpZ2h0OjEhaW1wb3J0YW50O2RpcmVjdGlvbjpsdHIhaW1wb3J0YW50O3RleHQtYWxpZ246bGVmdCFpbXBvcnRhbnQ7dGV4dC1hbGlnbjpzdGFydCFpbXBvcnRhbnQ7Zm9udC1mYW1pbHk6IlRpbWVzIE5ldyBSb21hbiIsVGltZXMsc2VyaWYhaW1wb3J0YW50O2NvbG9yOiMwMDAhaW1wb3J0YW50O2ZvbnQtc3R5bGU6bm9ybWFsIWltcG9ydGFudDtmb250LXdlaWdodDo0MDAhaW1wb3J0YW50O3RleHQtZGVjb3JhdGlvbjpub25lIWltcG9ydGFudDtsaXN0LXN0eWxlLXR5cGU6ZGlzYyFpbXBvcnRhbnR9LmNsZWFuc2xhdGUgcHJle3doaXRlLXNwYWNlOnByZSFpbXBvcnRhbnR9';

const BASE_PATH_PUBLIC = "./public/";
const BASE_PATH_SRC = "./src/";
const BASE_PATH_COMPONENT = "./src/components/";

const VERSION = "0.5.4";

var commands =
{
	"init"  : init,
	"deinit"  : deinit,
	"start" : start,
	"new" : new_component,
	"build" : build,
	"help" : print_large_help,
	"del" : delete_component,
	"widget": widget_build,
	"deploy": deploy,	// remove
	"commit" : commit,	// remove
	"extras": add_extras,
	"-v" : version,
	"--v" : version,
	"n" : new_component,
	"i"  : init,
	"s" : start,
	"b" : build,
	"d" : delete_component,
	"v" : version,
	"h" : print_large_help,
	"x" : add_extras,
	"ws": widget_start,
	"wb": widget_build
}

var g_changed_files = [];
var g_timer;
var g_css;
var g_js;
var g_socket_clients = {};
var g_ws_port;
var g_transpile_mode = "NORMAL";

var args = process.argv.slice(2);
var command = args[0];
args = args.slice(1);

if (typeof commands[command] == 'undefined')
	print_small_help(command);
else
	commands[command](args);

function print_small_help(c)
{
	if (typeof c != 'undefined')
		error("invalid command: " + c);

	version();
	log("usage:");
	log("	wk init  | initializes a new project");
	log("	wk start | starts development server");
	log("	wk build | creates a production build");
	log("	wk help  | docs");	
}

function print_large_help()
{
	version();
	var msg = `
wk has following 8 commands

  wk init                            (i)
initializes a new project
creates required folders src, public
and app component

  wk start <port?>                   (s)
starts development server on 
http://localhost:6040
takes an optional argument for http port

  wk build                           (b)
creates a production build
minifies javascript and css, puts them
under build/ folder with a time seed

  wk new <component-name>            (n)
generates component folder
generates necessary js,css and html files

  wk del <component-name>            (d)
deletes component folder recursively

  wk extras                          (x)
generates extra utility javascript files

  wk help                            (h)
prints this help text

  wk version                         (v)
prints version
	`;

	log(msg);
}

function init(type)
{
	if (is_project_valid("./"))
	{
		error("current folder is already initialized");
		return;
	}

	log("initializing a new  project");
	
	create_folder_if_not_exits(BASE_PATH_PUBLIC);
	create_folder_if_not_exits(BASE_PATH_SRC);
	create_folder_if_not_exits(BASE_PATH_COMPONENT);
	
	b64_to_file(BASE_PATH_PUBLIC + "index.html", SOURCE_INDEX);

	new_component(["web-app"]);
	
	b64_to_file(BASE_PATH_COMPONENT + "web-app/web-app.css", SOURCE_BASIC_CSS);
	b64_to_file(BASE_PATH_COMPONENT + "web-app/web-app.html", SOURCE_BASIC_HTML);

	var jsconfig = {"include": ["src/**/*" ]};

	FS.writeFileSync("./jsconfig.json", JSON.stringify(jsconfig), "utf8");

	var msg = "project initialized successfully";
	highlight(msg);
	log("you can run **start** command now")
	log("wk start  | auto-builds components and serves them under ./public folder");
}

function deinit()
{
	delete_folder_recursive(BASE_PATH_SRC);
	delete_folder_recursive(BASE_PATH_PUBLIC);
	log("- de initialized project and deleted all files");
}

function widget_build()
{
	g_transpile_mode = "WIDGET";
	build();
}


function widget_start(port)
{
	g_transpile_mode = "WIDGET";
	start(port);
}

function start(port)
{
	if (!is_project_valid("./"))
	{
		if (is_project_valid("../"))
		{
			error("current folder is not the base folder of project");
			error("navigate to up one level and try **wk start** again")
		}
		else if (is_project_valid("../../"))
		{
			error("current folder is not the base folder of project");
			error("navigate to up 2 level and try **wk start** again")
		}
		else
		{
			error("current folder is not a valid wk project, initialize first");
			log("usage:");
			log("	wk init   | initializes a new project with boilerplate code");
		}
		return;
	}
	check_legacy_project();
	check_version();
	if (g_transpile_mode == "WIDGET")
		log("transpile mode: " + g_transpile_mode);

	log("starting file server and auto-builder");
	start_watcher();

	const EXPRESS = require('express');
	const EXPRESS_APP = EXPRESS();

	EXPRESS_APP.get("/index.html", function (request, response)
	{
		response.setHeader("Content-Type", "text/html");
		response.send(render_index_html(true));
		return;
	});

	EXPRESS_APP.use(EXPRESS.static('./public', {index: false}));
	EXPRESS_APP.get('*', function (request, response)
	{
		if (request.originalUrl == "/dev.js")
		{
			response.setHeader("Content-Type", "text/javascript");
			response.send(g_js);
			return;
		}
		
		if (request.originalUrl == "/dev.css")
		{
			response.setHeader("Content-Type", "text/css");
			response.send(g_css);
			return;
		}

		if (request.originalUrl == "/index.html")
		{
			response.setHeader("Content-Type", "text/html");
			response.send(render_index_html(true));
			return;
		}

		response.setHeader("Content-Type", "text/html");
		response.send(render_index_html(true));
	});

	if (typeof port[0] == "undefined")
		port = 6040;
	else
		port = port[0];

	log("trying localhost:" + port);

	var PS = require("portscanner");
	PS.findAPortNotInUse(port, port + 100, "127.0.0.1", function (err, port)
	{
		if (err)
		{
			error("no port available for http server");
			process.exit();
		}

		EXPRESS_APP.listen(port);
		log("listening localhost:" + port);

		setTimeout(function()
		{
			EXEC("xdg-open " + 'http://localhost:' + port);
		}, 250);

		g_ws_port = port + 1;
		const WS = require("ws");
		const WS_SERVER = new WS.Server({ "port": g_ws_port });

		WS_SERVER.on('connection', function connection(ws)
		{
			var s = seed(16);
			ws.data = s;
			g_socket_clients[s] = ws;
			ws.on("close", function()
			{
				delete g_socket_clients[ws.data];
			});
		});
	});
}

function start_watcher()
{
	var watch = require('node-watch');
	watch(BASE_PATH_COMPONENT, { recursive: true }, onchange);
	watch(BASE_PATH_SRC, { recursive: true }, onchange);
	onchange("change",".js");
}

function new_component(a)
{	
	if (a.length > 1)
	{
		error(a.join(" ") + " is not a valid component name, it has whitespaces in it");
		return;
	}

	if (a.length == 0)
	{
		log("usage:")
		log("	wk new component-name | creates a new component under ./com folder with given component-name");
		return;
	}

	if (!print_invalid_project_msg("./"))
		return;

	if ( a[0].toLowerCase() != a[0])
	{
		error(a.join(" ") + " is not a valid component name, component names are lower-case-dash-seperated");
		return;
	}
	if (a[0].indexOf("--") != -1)
	{
		error(a.join(" ") + " is not a valid component name, -- is not allowed");
		return;
	}

	if (a[0].indexOf("_") != -1)
	{
		error(a.join(" ") + " is not a valid component name, _ is not allowed");
		return;
	}

	if (a[0].split("-").length == 1)
	{
		error(a.join(" ") + " is not a valid component name, there should be at least 2 words in component name");
		return;
	}

	if (Number.isInteger(Number(a[0][0])))
	{
		error(a.join(" ") + " is not a valid component name, component name cannot start with a number");
		return;
	}

	create_component_files(a[0]);
}

function bundle()
{
	var CHEERIO = require('cheerio');
	var $ = CHEERIO.load(render_index_html(false));

	var scripts = $("script")
	
}

function export_component()
{
	
}

function delete_component(a)
{
	if (a.length == 0)
	{
		log("usage:")
		log("	wk del component-name |  deletes a component, this command is not reversible");
		return;
	}

	if (!print_invalid_project_msg("./"))
		return;

	var input = BASE_PATH_COMPONENT + a[0] + '/' + a[0];

	if (!FS.existsSync(input + '.html') || !FS.existsSync(input + '.js') || !FS.existsSync(input + '.css'))
	{
		error("there is no component named " + a[0]);
		return;
	}

	delete_folder_recursive(BASE_PATH_COMPONENT + a[0]);
	log("deleted component -> " + a[0])
}

function version()
{
	log("version: " + VERSION);
}

function deploy()
{
	build();
	EXEC("git add -A;");
	EXEC("git commit -m 'release';");
	EXEC("git push;");
	log("deployed");
}

function commit(message)
{
	if (typeof message === "undefined")
		message = "auto release";

	EXEC("git add -A;");
	EXEC("git commit -m '"+message+"';");
	EXEC("git push;");
}

function check_version()
{
	const HTTPS = require('https');
	
	HTTPS.get('https://raw.githubusercontent.com/alperr/wk/master/package.json',
	(resp) =>
	{
		var data = '';
		resp.on('data', (chunk) => { data += chunk; });
		resp.on('end', () =>
		{
			try
			{
				var latestVersion = JSON.parse(data)["version"];
				var l = latestVersion.split(".");
				var latest = Number(l[0]) * 10000 + Number(l[1]) * 100 + Number(l[2]);
			}
			catch(e){ return; }
			
			var p = VERSION.split(".");
			var current = Number(p[0]) * 10000 + Number(p[1]) * 100 + Number(p[2]);

			if (latest > current)
			{
				var msg = "there is a newer version of wk -> " + latestVersion + " (your version is "+VERSION+")";
				error(msg);
				log("to update:")
				msg = "";
				msg += "npm un -g wk-toolkit\n";
				msg += " npm i -g wk-toolkit\n";
				minor_log(msg);
			}
		});
	}).on("error", (err) => {});
}


function build()
{
	check_legacy_project();

	if (g_transpile_mode == "WIDGET")
		log("building widget")
	else
		log("building for production");

	g_changed_files.push(".js");
	transpile_all();
	delete_folder_recursive("./build");
	copy_recursive_sync("./public", "./build");

	FS.unlinkSync("./build/index.html");

	var name;
	var UGLIFYJS = require("uglify-es");
	var CHEERIO = require('cheerio');
	var $ = CHEERIO.load(render_index_html(false));

	name = time_seed();
	$("link[href$='./dev.css']").attr("href" , "./" + name + ".css");
	$("script[src$='./dev.js']").attr("src" , "./" + name + ".js");
	$("#wk-script").remove();
	var h = $.html();

	var options = 
	{
		"mangle" :
		{
			"toplevel" : true,
			"reserved": ['web-app']
		}
	}
	var msg = '\x1b[32m minification\x1b[0m';
	console.time(msg);
	var minified_js = UGLIFYJS.minify(g_js, options);
	if(minified_js.error)
	{
		console.log(minified_js.error);
		error("unable to minify javascript file");
		return;
	}

	var UGLIFYCSS = require('uglifycss');
	var minified_css = UGLIFYCSS.processString(g_css, {});

	FS.writeFileSync( "./build/" + name + ".js", minified_js.code);
	FS.writeFileSync("./build/index.html" , h);
	FS.writeFileSync( "./build/" + name + ".css", minified_css);

	console.timeEnd(msg);
	log("production build completed with seed " + name);
	return name;
}


function add_extras()
{
	var paths = 
	[
		["./src/http.js", SOURCE_HTTP],
		["./src/event.js", SOURCE_EVENT],
		["./src/router.js", SOURCE_ROUTER]
	]

	for (var i=0;i<paths.length;i++)
	{
		var path = paths[i][0];
		var source = paths[i][1];
		if (!FS.existsSync(path))
		{
			b64_to_file(path, source);
			log("written " + path);
		}
	}
}


function create_component_files(name)
{
	if (FS.existsSync(BASE_PATH_COMPONENT + name))
	{
		error("a component with a name " + name + " already exists");
		return;
	}

	var js = to_ascii(SOURCE_SAMPLE);
	var html = '<div></div>';
	var css = name + ' {}';

	FS.mkdirSync(BASE_PATH_COMPONENT + name);
	FS.writeFileSync(BASE_PATH_COMPONENT + name + "/" + name + ".html" , html, "utf8");
	FS.writeFileSync(BASE_PATH_COMPONENT + name + "/" + name + ".css" , css, "utf8");
	FS.writeFileSync(BASE_PATH_COMPONENT + name + "/" + name + ".js" , js, "utf8");

	log("created a new component named " + name);
}

function error(m){ console.log(FG_RED, m, RESET); }
function log(m){ console.log(RESET, m, RESET); }
function highlight(m){ console.log(BG_GREEN, m, RESET); }
function minor_log(m){ console.log(FG_DIM, m, RESET); }

function transpile_all()
{
	var html_changed = false;
	var css_changed = false;
	var js_changed = false;

	for (var i in g_changed_files)
	{
		if (g_changed_files[i].endsWith(".js"))
			js_changed = true;

		if (g_changed_files[i].endsWith(".css"))
			css_changed = true;

		if (g_changed_files[i].endsWith(".html"))
			html_changed = true;

	}

	if (js_changed) msg = "  (js) |"
	if (css_changed) msg = " (css) |";
	if (html_changed) msg = "(html) |";
	msg = FG_DIM + msg + RESET + '\x1b[32m transpile \x1b[0m';
	var start = Date.now();
	
	g_changed_files = [];
	var js = "";
	var css = "";
	var markups = {}
	var js_files = [];
	var names = [];

	var files = FS.readdirSync(BASE_PATH_SRC);
	for (var i=0;i<files.length;i++)
	{
		var f = files[i];
		if (f.endsWith(".js"))
			js_files.push(BASE_PATH_SRC + f);

	}

	files = FS.readdirSync(BASE_PATH_COMPONENT);
	for (var i=0;i<files.length;i++)
	{
		var f = files[i];
		if (f.indexOf('.') == 0)
			return;	

		names.push(f);
	}

	for (var i=0;i<names.length;i++)
	{
		var input = BASE_PATH_COMPONENT + names[i] + '/' + names[i];

		if (!FS.existsSync(input + '.html')) 
		{
			error('missing file ->' + input + '.html  build cancelled');
			return;
		}

		if (!FS.existsSync(input + '.js')) 
		{
			error('missing file ->' + input + '.js  build cancelled');
			return;
		}

		if (markups[names[i]])
		{
			error('duplicate markup file ->' + names[i] + '.html  build cancelled');
			return;
		}

		var markup = FS.readFileSync(input + ".html","utf8");
		markups[names[i]] = markup;

		var js_content = FS.readFileSync(input + ".js","utf8");

		// this is very loose
		// ideally we shoud parse javascript and put this markup injecting
		// code by modifying parsed javascript code
		var search = "connectedCallback()\r\n\t{";
		var target = "connectedCallback()\n\t{\n\t\tthis.root = this.cloneNode(true);\n\t\tthis.innerHTML = `"+markup+"`";
		
		js_content = js_content.replace(search,target);
		js += `customElements.define("${names[i]}", ${js_content});\n`;

		if (FS.existsSync(input + '.css'))
		{
			if (g_transpile_mode == "WIDGET")
			{
				var cp = FS.readFileSync(input + ".css","utf8");
				cp = cp.split(";").join(" !important;");
				cp = cp.split('ttf") !important;').join('ttf");');
				cp = cp.split('-font" !important;').join('-font";');
				css += cp;
			}
			else
				css += FS.readFileSync(input + ".css","utf8") + '\n';
		}
	}

	try
	{
		var i18n = FS.readFileSync(BASE_PATH_SRC + "i18n.json", "utf8");
		i18n = JSON.stringify(JSON.parse(i18n)); // this minifies
		js += "__i18n.data = " + i18n + ";";
	}
	catch(e){}
	
	for (var i=0;i<js_files.length;i++)
	{
		var jf = js_files[i]
		js += FS.readFileSync(jf, "utf8") + '\n';
	}

	g_js = js;
	g_css = css;

	console.log(msg + ": " + (Date.now() - start) + "ms");

	for (var i in g_socket_clients)
		g_socket_clients[i].send("reload-all");
}

function onchange(event, file_name)
{
	// write a better file watch handler
	if (	!file_name.endsWith(".js") && 
		!file_name.endsWith(".css") && 
		!file_name.endsWith(".html") &&
		!file_name.endsWith(".json"))
		return;

	clearTimeout(g_timer);
	g_changed_files.push(file_name);
	g_timer = setTimeout(transpile_all, 40);
}


function print_invalid_project_msg(path)
{
	if (!is_project_valid(path))
	{
		error("current folder is not a valid wk project, initialize first");
		log("usage:");
		log("	wk init   | initializes a new project with boilerplate code");
		return  false;
	}
	return true;
}

function is_project_valid(path)
{
	if (!FS.existsSync(path + "public"))
		return false;

	if (!FS.existsSync(path + "src"))
		return false;

	if (!FS.existsSync(path + "src/components"))
		return false;

	return true;
}

function check_legacy_project()
{
	var files = FS.readdirSync(BASE_PATH_SRC);
	files.forEach(function(file)
	{
		if (file.endsWith(".ts"))
		{
			error("Incompatible CLI");
			minor_log("this is a legacy project !");
			minor_log("wk dropped typescript support starting with version 0.3.0");
			minor_log("uninstall current CLI ("+VERSION+") and install latest");
			minor_log("typescript-compatible CLI (0.2.22) to work on this project");
			log("npm un -g wk-toolkit");
			log("npm i -g wk-toolkit@0.2.22");
			process.exit();
		}
	});
}

function create_folder_if_not_exits(path)
{
	if (!FS.existsSync(path)){FS.mkdirSync(path);}
}

function delete_folder_recursive(path)
{
	if (FS.existsSync(path))
	{
		FS.readdirSync(path).forEach(function(file, index)
		{
			var curPath = path + "/" + file;
			if (FS.lstatSync(curPath).isDirectory())
				delete_folder_recursive(curPath);
			else
				FS.unlinkSync(curPath);
		});
		FS.rmdirSync(path);
	}
}

function copy_recursive_sync(src, dest)
{
	var exists = FS.existsSync(src);
	var stats = exists && FS.statSync(src);
	var is_directory = exists && stats.isDirectory();
	if (exists && is_directory)
	{
		FS.mkdirSync(dest);
		FS.readdirSync(src).forEach(function(child_name)
		{
			copy_recursive_sync(PATH.join(src, child_name), PATH.join(dest, child_name));
		});
	}
	else
	{
		FS.linkSync(src, dest);
	}
};

function to_ascii(source)
{
	return Buffer.from(source, 'base64').toString('ascii');
}

function b64_to_file(path, source)
{
	FS.writeFileSync(path, to_ascii(source), "utf8");
}

function seed(length)
{
	var alphabet = '0123456789abcdefghijklmnopqrstuwvxyz';
	var s = "";
	for (var i=0;i<length;i++)
	{
		var ind = Math.floor(Math.random() * alphabet.length);
		s += alphabet[ind]
	}
	return s;
}

function time_seed()
{
	var alphabet = '0123456789abcdefghijklmnopqrstuwvxyz';
	function int2str(i)
	{
		var r = "";
		while(i > alphabet.length - 1)
		{
			r = alphabet[i % alphabet.length] + r;
			i = Math.floor(i / alphabet.length);
		}
		r = alphabet[i] + r;
		return r;
	}

	const SEED_LENGTH = 4;
	var id = int2str(Math.floor((Date.now()) / 1000));
	id = id.substr(id.length - SEED_LENGTH, SEED_LENGTH);
	return id;
}


function render_index_html(development_mode)
{
	var CHEERIO = require('cheerio');
	var index = FS.readFileSync(BASE_PATH_PUBLIC + "index.html", "utf8");
	var $ = CHEERIO.load(index);
	$("head").append('<link rel="stylesheet" href="./dev.css">');
	$("head").append('<script src="./dev.js"></script>');
	var src = to_ascii(SOURCE_START_SCRIPT);
	if (development_mode)
	{
		var reloader = to_ascii(SOURCE_HOT_RELOAD);
		src = src.replace("//HOT_RELOAD_CODE//", reloader);
	}
	else
	{
		src = src.replace("//HOT_RELOAD_CODE//", "");
	}

	$("html").append(src);
	var h = $.html();
	h = h.replace("{{WS_PORT}}" , g_ws_port);
	return h;
}