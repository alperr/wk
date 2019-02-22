var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// THIS FILE IS AUTO GENERATED , DO NOT EDIT
var Component = /** @class */ (function () {
    function Component(root, markup) {
        var _this = this;
        this.find = function (query) {
            query = "." + query;
            return _this.root.querySelector(query);
        };
        this.querySelector = function (query) {
            return _this.root.querySelector(query);
        };
        this.querySelectorAll = function (query) {
            return _this.root.querySelectorAll(query);
        };
        this.loadMarkup = function (key) {
            var w = window;
            if (!w.__markup_data[key])
                throw "there is no markup for " + key;
            _this.root.innerHTML = decodeURIComponent(atob(w.__markup_data[key]));
        };
        this.root = root;
        this.loadMarkup(markup);
    }
    return Component;
}());
function loadTemplate(key) {
    var w = window;
    if (!w.__markup_data[key])
        throw "there is no markup for " + key;
    function htmlToElement(html) {
        var template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html;
        return template.content.firstChild;
    }
    return htmlToElement(decodeURIComponent(atob(w.__markup_data[key])));
}
var MARKUP_APPLICATION = 0;
/// <reference path="../../src/component.ts" />
var Application = /** @class */ (function (_super) {
    __extends(Application, _super);
    function Application(root, options) {
        return _super.call(this, root, MARKUP_APPLICATION) || this;
    }
    return Application;
}(Component));
