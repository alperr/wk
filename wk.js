#!/usr/bin/env node

const FS = require('fs');
const PATH = require('path');
const FG_RED = "\x1b[31m";
const FG_DIM = "\x1b[2m";
const BG_GREEN = "\x1b[42m";
const RESET = "\x1b[0m";

const SOURCE_INDEX = 'PGh0bWw+Cgk8aGVhZD4KCQk8bWV0YSBjaGFyc2V0PSJ1dGYtOCI+CgkJPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCI+CgkJPHRpdGxlPndrPC90aXRsZT4KCTwvaGVhZD4KCTxib2R5PgoJCTx3ZWItYXBwPjwvd2ViLWFwcD4KCTwvYm9keT4KPC9odG1sPg==';
const SOURCE_SAMPLE = 'Y2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudA0Kew0KCWNvbnN0cnVjdG9yKCl7IHN1cGVyKCk7IH0NCgljb25uZWN0ZWRDYWxsYmFjaygpDQoJew0KCQkNCgl9DQp9';
const SOURCE_SAMPLE_PAGE = 'Y2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudAp7Cgljb25zdHJ1Y3RvcigpeyBzdXBlcigpOyB9Cgljb25uZWN0ZWRDYWxsYmFjaygpCgl7CgkJaW5pdF9wYWdlKHRoaXMpOwoJfQoKCW9uc2hvdygpCgl7CgkJdmFyIHBhdGggPSAiLyIgKyB0aGlzLnRhZ05hbWUudG9Mb3dlckNhc2UoKS5zdWJzdHJpbmcoNSk7CgkJY29uc29sZS5sb2cocGF0aCArICIgc2hvd24iKTsKCX0KCglvbmhpZGUoKQoJewoJCXZhciBwYXRoID0gIi8iICsgdGhpcy50YWdOYW1lLnRvTG93ZXJDYXNlKCkuc3Vic3RyaW5nKDUpOwoJCWNvbnNvbGUubG9nKHBhdGggKyAiIGhpZGRlbiIpOwoJfQp9';
const SOURCE_BASIC_HTML = 'PGRpdiBjbGFzcz0nYXBwJz4KCTxoMj5oZWxsbzwvaDI+Cgk8cD50aGlzIHBhZ2UgaXMgZ2VuZXJhdGVkIGJ5IGEgY29tbWFuZCBsaW5lIGludGVyZmFjZTogPHN0cm9uZz53azwvc3Ryb25nPiA8L3A+Cgk8cD53ZWIgYXBwcyBnZW5lcmF0ZWQgd2l0aCA8c3Ryb25nPndrPC9zdHJvbmc+IGFyZSBjb21wb3NlZCBvZiA8c3Ryb25nPmNvbXBvbmVudHM8L3N0cm9uZz48L3A+Cgk8aDM+d2hhdCBpcyBhIGNvbXBvbmVudD88L2gzPgoJPHVsPgoJCTxsaT5ldmVyeSBpbmRlcGVuZGVudGx5IGZ1bmN0aW9uaW5nIHBhcnQgb2YgYSB1c2VyIGludGVyZmFjZSBpcyBjYWxsZWQgYXMgPHN0cm9uZz5jb21wb25lbnQ8L3N0cm9uZz48L2xpPgoJCTxsaT5ldmVyeSBjb21wb25lbnQgY29udGFpbnMgb25lIDxzdHJvbmc+amF2YXNjcmlwdDwvc3Ryb25nPiwgPHN0cm9uZz5jc3M8L3N0cm9uZz4gYW5kIAoJCTxzdHJvbmc+aHRtbDwvc3Ryb25nPiBmaWxlPC9saT4KCQk8bGk+PHN0cm9uZz5jb21wb25lbnRzPC9zdHJvbmc+IGFyZSBzdG9yZWQgdW5kZXIgPHN0cm9uZz5zcmMvY29tcG9uZW50cy88L3N0cm9uZz4gYXMgaW5kaXZpZHVhbCBmb2xkZXJzPC9saT4KCQk8bGk+ZXZlcnkgcHJvamVjdCBjb250YWlucyBhIG1haW4gY29tcG9uZW50IG5hbWVkIDxzdHJvbmc+d2ViLWFwcDwvc3Ryb25nPjwvbGk+CgkJPGxpIGNsYXNzPSJhY2NlbnQiPnlvdSBjYW4gdHdlYWsgdGhpcyB3ZWItYXBwIGNvbXBvbmVudCdzIHN0eWxlIGJ5IGVkaXRpbmcgCgkJPHN0cm9uZz5zcmMvY29tcG9uZW50cy93ZWItYXBwL3dlYi1hcHAuY3NzPC9zdHJvbmc+IGZpbGU8L2xpPgoJCTxsaT5tYXJrdXAgb2Ygd2ViLWFwcCBjb21wb25lbnQgaXMgd3JpdHRlbiBpbnRvIAoJCTxzdHJvbmc+c3JjL2NvbXBvbmVudHMvd2ViLWFwcC93ZWItYXBwLmh0bWw8L3N0cm9uZz48L2xpPgoJCTxsaT5jb21wb25lbnRzIGFyZSBkZWZpbmVkIGFzIDxzdHJvbmc+ZnVuY3Rpb25zPC9zdHJvbmc+CgkJaW4gLmpzIGZpbGVzIGFuZCBhbnkgY29tcG9uZW50IGNhbiBjcmVhdGUgYW5vdGhlciBvbmUganVzdCBieSBjYWxsaW5nIHRoZSBjb25zdHJ1Y3RvciBvZiB0aGF0IGNvbXBvbmVudDwvbGk+CgkJPGxpPnByb2dyYW0gZW50cnkgcG9pbnQgaXMgPHN0cm9uZz5zcmMvY29tcG9uZW50cy93ZWItYXBwL3dlYi1hcHAuanM8L3N0cm9uZz48L2xpPgoJPC91bD4KCgk8cD4KCQlhbGwgb3RoZXIgLmpzIGZpbGVzIHNob3VsZCBiZSBwbGFjZWQgdW5kZXIgPHN0cm9uZz5zcmMvPC9zdHJvbmc+IGZvbGRlci4KCQl3ayBjb25jYXRhbmF0ZXMgZXZlcnkgLmpzIGZpbGVzIGluIHNyYyBmb2xkZXIgKGluY2x1ZGluZyBqYXZhc2NyaXB0IGZpbGVzIG9mIGVhY2ggY29tcG9uZW50KQoJCWFuZCBzZXJ2ZXMgdGhlbSBhcyBhIHNpbmdsZSBqYXZhc2NyaXB0IGZpbGUsIGhlbmNlIHlvdSBkb24ndCBoYXZlIHRvIHVzZSAKCQk8c3BhbiBjbGFzcz0iYWNjZW50Ij5yZXF1aXJlKCk8L3NwYW4+IG9yIDxzcGFuIGNsYXNzPSJhY2NlbnQiPmltcG9ydDwvc3Bhbj4KCQl0byBkZXZlbG9wIGluIGEJbXVsdGlwbGUgZmlsZSBqYXZhc2NyaXB0IGVudmlyb25tZW50LCBldmVyeXRoaW5nIHlvdSB3cml0ZSBpcyByZWdpc3RlcmVkIHRvIGdsb2JhbC4KCTwvcD4KCgk8aHI+Cgk8cD5ydW4gPHN0cm9uZz53ayBoZWxwPC9zdHJvbmc+IHRvIGxlYXJuIGRldGFpbHMgb2YgQ0xJPC9wPgo8L2Rpdj4=';
const SOURCE_BASIC_CSS = 'LmFwcHsKCW1hcmdpbi1sZWZ0OiBhdXRvOwoJbWFyZ2luLXJpZ2h0OiBhdXRvOwoJbWF4LXdpZHRoOiA3NzBweDsJCglwYWRkaW5nOiA0MHB4OwoJbGluZS1oZWlnaHQ6IDEuNDsKfQoKLmFwcCAqewoJZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmOwp9CgouYXBwIC5hY2NlbnR7Cgljb2xvcjogIzBhZjsKfQoKLmFwcCBsaXsKCWxpbmUtaGVpZ2h0OiAyOwp9';
const SOURCE_START_SCRIPT = 'PHNjcmlwdCBpZD0id2stc2NyaXB0Ij4Kd2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpCnsKLy9IT1RfUkVMT0FEX0NPREUvLwp9Cjwvc2NyaXB0Pg==';
const SOURCE_HOT_RELOAD = 'CXZhciB3cyA9IG5ldyBXZWJTb2NrZXQoIndzOi8vMTI3LjAuMC4xOnt7V1NfUE9SVH19Iik7Cgl3cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpeyB3aW5kb3cubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247IH0=';
const SOURCE_HTTP = 'dmFyIGh0dHBfYmFzZSA9ICJodHRwczovL3JlbW90ZWFwaS5jb20vIjsKCmlmIChsb2NhdGlvbi5ob3N0bmFtZSA9PSAibG9jYWxob3N0IikKCWh0dHBfYmFzZSA9ICJodHRwOi8vbG9jYWxob3N0OjcxMjQvIjsKCmZ1bmN0aW9uIGh0dHBfc2VyaWFsaXplKG9iaikKewoJdmFyIHEgPSAiIjsKCXZhciBjb3VudCA9IDA7Cglmb3IgKHZhciBrZXkgaW4gb2JqKQoJewoJCWlmICh0eXBlb2Ygb2JqW2tleV0gPT0gInVuZGVmaW5lZCIpCgkJCWNvbnRpbnVlOwoKCQlpZiAoY291bnQgPiAwKQoJCQlxKz0gIiYiOwoKCQlxICs9IGtleTsKCQlxICs9ICI9IjsKCQlxICs9IGVuY29kZVVSSUNvbXBvbmVudChvYmpba2V5XSk7CgkJY291bnQrKzsKCX0KCWlmIChxLmxlbmd0aCAhPSAwKQoJCXEgPSAiPyIgKyBxOwoKCXJldHVybiBxOwp9CgoKZnVuY3Rpb24gaHR0cF9wb3N0X2JhcihkYXRhMSwgZGF0YTIsIG9ubG9hZCkgLy8gc2FtcGxlIHBvc3QgcmVxdWVzdAp7Cgl2YXIgYm9keSA9Cgl7CgkJImRhdGExIjogZGF0YTEsCgkJImRhdGEyIjogZGF0YTIKCX07CgoJaHR0cF94aHIoIlBPU1QiLCAiYmFyIiwgb25sb2FkLCBib2R5KTsKfQoKZnVuY3Rpb24gaHR0cF94aHIobWV0aG9kLCB1cmwsIG9ubG9hZCwgYm9keSwgc2hvdWxkX3BhcnNlKQp7CglpZiAodHlwZW9mIHNob3VsZF9wYXJzZSA9PSAidW5kZWZpbmVkIikKCQlzaG91bGRfcGFyc2UgPSB0cnVlOwoKCXZhciB4ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7Cgl4Lm9wZW4obWV0aG9kLCBodHRwX2Jhc2UgKyB1cmwpOwoJeC5zZXRSZXF1ZXN0SGVhZGVyKCJDb250ZW50LVR5cGUiLCAiYXBwbGljYXRpb24vanNvbiIpOwoJeC5vbmxvYWQgPSBmdW5jdGlvbigpCgl7CgkJaWYgKHguc3RhdHVzID09IDQwMSkKCQl7CgkJCWRpc3BhdGNoKEFDQ0VTU19WSU9MQVRJT04pOwoJCQlvbmxvYWQodW5kZWZpbmVkLCB0cnVlKTsKCQkJcmV0dXJuOwoJCX0KCgkJaWYgKHguc3RhdHVzICE9IDIwMCkKCQl7CgkJCW9ubG9hZCh1bmRlZmluZWQsIHRydWUsIHguc3RhdHVzKTsKCQkJcmV0dXJuOwoJCX0KCQl0cnkKCQl7CgkJCXZhciByID0geC5yZXNwb25zZVRleHQ7CgkJCWlmIChzaG91bGRfcGFyc2UpCgkJCQlyID0gSlNPTi5wYXJzZShyKTsKCgkJCXRyeXsKCQkJCW9ubG9hZChyLCBmYWxzZSwgeC5zdGF0dXMpOwoJCQl9IGNhdGNoKGUpIHsgCgkJCQljb25zb2xlLmxvZygiaHR0cCBoYW5kbGVyIGVycm9yIik7CgkJCQljb25zb2xlLmxvZyhlKTsKCQkJfQoJCX0KCQljYXRjaChlKQoJCXsKCQkJY29uc29sZS5sb2coImVycjIiKQoJCQlvbmxvYWQociwgdHJ1ZSwgeC5zdGF0dXMpOwoJCX0KCX0KCgl4Lm9uZXJyb3IgPSBmdW5jdGlvbigpCgl7CgkJb25sb2FkKHVuZGVmaW5lZCwgdHJ1ZSwgeC5zdGF0dXMpOwoJfQoKCWlmIChtZXRob2QudG9VcHBlckNhc2UoKSA9PSAiUE9TVCIpCgl7CgkJaWYgKHR5cGVvZiBib2R5ID09ICJvYmplY3QiKQoJCQlib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7CgoJCXguc2VuZChib2R5KTsKCX0KCWVsc2UKCXsKCQl4LnNlbmQoKTsKCX0KfQo=';
const SOURCE_EVENT = 'Y29uc3QgUk9VVEVfQ0hBTkdFID0gMDsKY29uc3QgQUNDRVNTX1ZJT0xBVElPTiA9IDE7CgpmdW5jdGlvbiBvbihldmVudCwgZm4pCnsKCWRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuKTsKfQoKZnVuY3Rpb24gb2ZmKGV2ZW50LCBmbikKewoJZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgZm4pOwp9CgpmdW5jdGlvbiBkaXNwYXRjaChldmVudCkKewoJZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoZXZlbnQpKTsKfQo=';
const SOURCE_ROUTER = 'dmFyIHJvdXRlcl9wYXRocyA9IHt9CgpmdW5jdGlvbiBuYXZpZ2F0ZShwYXRoLCBzaG91bGRfYWRkX2hpc3RvcnkpCnsKCWlmICh0eXBlb2Ygcm91dGVyX3BhdGhzW3BhdGhdID09ICJ1bmRlZmluZWQiKQoJewoJCWNvbnNvbGUuZXJyb3IoImNhbnQgZmluZCBwYXRoICIgKyBwYXRoKTsKCQloaWRlX2FsbCgpOwoJCXJldHVybjsKCX0KCglmdW5jdGlvbiBoaWRlX2FsbCgpCgl7CgkJZm9yICh2YXIga2V5IGluIHJvdXRlcl9wYXRocykKCQkJcm91dGVyX3BhdGhzW2tleV1bMF0uc3R5bGUuZGlzcGxheSA9ICJub25lIjsJCQoJfQoKCXZhciBpc19wdWJsaWMgPSByb3V0ZXJfcGF0aHNbcGF0aF1bMl07CgoJaWYgKCFpc19wdWJsaWMpCgl7CgkJaWYgKHR5cGVvZiBnX3Rva2VuID09ICJ1bmRlZmluZWQiKQoJCXsKCQkJZGlzcGF0Y2goQUNDRVNTX1ZJT0xBVElPTik7CgkJCXJldHVybjsKCQl9Cgl9CgoJdmFyIHRpdGxlID0gcm91dGVyX3BhdGhzW3BhdGhdWzFdOwoJZG9jdW1lbnQudGl0bGUgPSB0aXRsZTsKCglpZiAoc2hvdWxkX2FkZF9oaXN0b3J5KQoJCXdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShwYXRoLCB0aXRsZSwgcGF0aCk7CgoJZ19sYXN0X3Nob3duX3JvdXRlID0gZ19jdXJyZW50X3JvdXRlOwoJZ19jdXJyZW50X3JvdXRlID0gcGF0aDsKCQoJaGlkZV9hbGwoKTsKCXJvdXRlcl9wYXRoc1twYXRoXVswXS5zdHlsZS5kaXNwbGF5ID0gImJsb2NrIjsKCWRpc3BhdGNoKFJPVVRFX0NIQU5HRSk7Cn0KCmZ1bmN0aW9uIGluaXRfcm91dGVyKGRvbSkKewoJdmFyIGNoaWxkcmVuID0gZG9tLmNoaWxkcmVuOwoJZm9yICh2YXIgaT0wO2k8Y2hpbGRyZW4ubGVuZ3RoO2krKykKCXsKCQl2YXIgYyA9IGNoaWxkcmVuW2ldOwoJCXZhciB0aXRsZSA9IGMuZ2V0QXR0cmlidXRlKCJ0aXRsZSIpOwoJCXZhciBpc19wdWJsaWMgPSBjLmhhc0F0dHJpYnV0ZSgicHVibGljIik7CgkJdmFyIHRhZ19uYW1lID0gYy50YWdOYW1lLnRvTG93ZXJDYXNlKCk7CgoJCXZhciBwYXRoOwoJCWlmICh0YWdfbmFtZSA9PSAicGFnZS1tYWluIikKCQkJcGF0aCA9ICIvIgoJCWVsc2UgaWYgKHRhZ19uYW1lLnN0YXJ0c1dpdGgoInBhZ2UtIikpCgkJCXBhdGggPSAiLyIgKyB0YWdfbmFtZS5zdWJzdHJpbmcoNSk7CgkJZWxzZQoJCQljb250aW51ZTsKCgkJaWYgKHRpdGxlID09IG51bGwpCgkJCXRpdGxlID0gIiI7CgoJCXJvdXRlcl9wYXRoc1twYXRoXSA9IFtjLCB0aXRsZSwgaXNfcHVibGljXTsKCX0KCgl2YXIgYWxsX2xpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgiYVtpbnRlcm5hbF0iKTsKCWZvciAodmFyIGk9MDtpPGFsbF9saW5rcy5sZW5ndGg7aSsrKQoJewoJCXZhciBhID0gYWxsX2xpbmtzW2ldOwoJCWEub25jbGljayA9IGZ1bmN0aW9uKGUpCgkJewoJCQllLnByZXZlbnREZWZhdWx0KCk7CgkJCW5hdmlnYXRlKHRoaXMuZ2V0QXR0cmlidXRlKCJocmVmIiksIHRydWUpOwoJCX0KCX0KCgluYXZpZ2F0ZSh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsIGZhbHNlKTsKCgl3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uKGUpCgl7CgkJY29uc29sZS5sb2coZSk7CgkJdmFyIHBhdGggPSAiLyI7CgkJaWYgKGUuc3RhdGUpCgkJCXBhdGggPSBlLnN0YXRlOwoJCQkKCQluYXZpZ2F0ZShwYXRoLCBmYWxzZSk7Cgl9Owp9CgpmdW5jdGlvbiBpbml0X3BhZ2UocGF0aCwgb25zaG93LCBvbmhpZGUpCnsKCWlmICh0eXBlb2Ygb25oaWRlID09ICJ1bmRlZmluZWQiKQoJCW9uaGlkZSA9IGZ1bmN0aW9uKCl7fQoKCWZ1bmN0aW9uIGYoKQoJewoJCWlmIChnX2N1cnJlbnRfcm91dGUgPT0gcGF0aCkKCQkJb25zaG93KCk7CgkKCQlpZiAoZ19sYXN0X3Nob3duX3JvdXRlID09IHBhdGgpCgkJCW9uaGlkZSgpOwoJfQoKCW9uKFJPVVRFX0NIQU5HRSwgZik7Cn0K';
const SOURCE_UTIL = 'ZnVuY3Rpb24gbm9kZV9maW5kZXIocm9vdCkKewoJdmFyICQgPSBmdW5jdGlvbihxKQoJeyAKCQl2YXIgZG9tID0gcm9vdC5xdWVyeVNlbGVjdG9yKHEpOwoJCWRvbS5oaWRlID0gZnVuY3Rpb24oKQoJCXsKCQkJZG9tLmNsYXNzTGlzdC5hZGQoImQtbm9uZSIpOwoJCX0KCQlkb20uc2hvdyA9IGZ1bmN0aW9uKCkKCQl7CgkJCWRvbS5jbGFzc0xpc3QucmVtb3ZlKCJkLW5vbmUiKTsKCQl9CgoJCWRvbS50b2dnbGUgPSBmdW5jdGlvbihzdGF0ZSwgYSwgYikKCQl7CgkJCWlmKHR5cGVvZiBiID09ICJ1bmRlZmluZWQiKSBiID0gIiI7CgoJCQlpZiAoc3RhdGUpCgkJCXsKCQkJCWlmIChhICE9ICIiKSBkb20uY2xhc3NMaXN0LmFkZChhKTsKCQkJCWlmIChiICE9ICIiKSBkb20uY2xhc3NMaXN0LnJlbW92ZShiKTsKCQkJfQoJCQllbHNlCgkJCXsKCQkJCWlmIChhICE9ICIiKSBkb20uY2xhc3NMaXN0LnJlbW92ZShhKTsKCQkJCWlmIChiICE9ICIiKSBkb20uY2xhc3NMaXN0LmFkZChiKTsKCQkJfQoJCX0KCQlyZXR1cm4gZG9tOwoJfQoJcmV0dXJuICQ7Cn0K';

const BASE_PATH_PUBLIC = "./public/";
const BASE_PATH_SRC = "./src/";
const BASE_PATH_COMPONENT = "./src/components/";

const VERSION = "0.5.15";

var commands =
{
	"init"  : init,
	"deinit"  : deinit,
	"start" : start,
	"new" : new_component,
	"build" : build,
	"help" : print_large_help,
	"del" : delete_component,
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
}

var g_changed_files = [];
var g_timer;
var g_css;
var g_js;
var g_socket_clients = {};
var g_ws_port;
var g_transpile_mode = "STANDART";
var g_library_name;

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
	var msg = `
wk (version ${VERSION}) has following 6 commands

  wk init                                    (i)
initializes the project

  wk start <port?>                           (s)
starts development server on localhost:6040

  wk build                                   (b)
creates build/ folder, minifies js&css

  wk new <component-name>                    (n)
generates given component folder and
necessary js,css and html files

  wk del <component-name>                    (d)
deletes given component folder recursively

  wk extras                                  (x)
generates extra utility javascript files

for more info, visit -> wk.js.org
	`;

	log(msg);
}

function init()
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
	if (g_transpile_mode == "LIBRARY")
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
	check_build_type();

	if (g_transpile_mode == "LIBRARY")
		log("building library")
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
			"toplevel" : true
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

	if (g_transpile_mode == "LIBRARY")
	{
		FS.writeFileSync( "./build/" + g_library_name + ".js", `(function(){${minified_js.code}})()`);
		FS.writeFileSync( "./build/" + g_library_name + ".css", minified_css);
		log("library build completed with name " + g_library_name);
	}
	else
	{
		FS.writeFileSync( "./build/" + name + ".js", minified_js.code);
		FS.writeFileSync("./build/index.html" , h);
		FS.writeFileSync( "./build/" + name + ".css", minified_css);
		log("production build completed with seed " + name);
	}

	function size(s)
	{
		return Math.floor(s / 1000) + "kB";
	}

	log(`JS: ${size(minified_js.code.length)} CSS: ${size(minified_css.length)}`);

	console.timeEnd(msg);
	return name;
}


function add_extras()
{
	var paths = 
	[
		["./src/http.js", SOURCE_HTTP],
		["./src/event.js", SOURCE_EVENT],
		["./src/router.js", SOURCE_ROUTER],
		["./src/util.js", SOURCE_UTIL]
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

	if (name.startsWith("page-"))
	{
		log("page component detected!");
		log("page boilerplate will be generated");
		js = to_ascii(SOURCE_SAMPLE_PAGE);
	}

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
	
	var names = [];

	var files = FS.readdirSync(BASE_PATH_SRC);
	for (var i=0;i<files.length;i++)
	{
		var f = files[i];
		if (f.endsWith(".js"))
			js += FS.readFileSync(BASE_PATH_SRC + f, "utf8") + '\n';
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
		
		var lines = js_content.split("\n");
		for (var j=0;j<lines.length;j++)
		{
			var l = lines[j];
			if (l.indexOf("connectedCallback()") != -1)
			{
				lines.splice(j+2, 0, "\n\t\tthis.root = this.cloneNode(true);\n\t\tthis.innerHTML = `"+markup+"`")
				break;
			}
		}
		
		js_content = lines.join("\n");

		if ((g_transpile_mode == "LIBRARY") && (names[i] == "web-app"))
		{
			js += `customElements.define("${g_library_name}", ${js_content});\n`;
		}
		else
		{
			js += `customElements.define("${names[i]}", ${js_content});\n`;
		}

		if (FS.existsSync(input + '.css'))
		{
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


function check_build_type()
{
	try{
		var conf = JSON.parse(FS.readFileSync("./jsconfig.json", "utf8"));
	} catch(e) { error("can't read jsconfig.json"); }
	
	if (typeof conf["lib"] != "undefined")
	{
		g_library_name = conf["lib"];
		g_transpile_mode = "LIBRARY";
	}
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
