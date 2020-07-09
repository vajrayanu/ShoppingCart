﻿/**
 * bootbox.js v3.2.0
 *
 * http://bootboxjs.com/license.txt
 */
var bootbox = window.bootbox || function (w, n) {
    function k(b, a) {
        "undefined" === typeof a && (a = p);
        return "string" === typeof j[a][b] ? j[a][b] : a != t ? k(b, t) : b
    }
    var p = "en",
        t = "en",
        u = !0,
        s = "static",
        v = "",
        l = {}, g = {}, m = {
            setLocale: function (b) {
                for (var a in j)
                    if (a == b) {
                        p = b;
                        return
                    }
                throw Error("Invalid locale: " + b);
            },
            addLocale: function (b, a) {
                "undefined" === typeof j[b] && (j[b] = {});
                for (var c in a) j[b][c] = a[c]
            },
            setIcons: function (b) {
                g = b;
                if ("object" !== typeof g || null === g) g = {}
            },
            setBtnClasses: function (b) {
                l = b;
                if ("object" !== typeof l || null ===
                    l) l = {}
            },
            alert: function () {
                var b = "",
                    a = k("OK"),
                    c = null;
                switch (arguments.length) {
                    case 1:
                        b = arguments[0];
                        break;
                    case 2:
                        b = arguments[0];
                        "function" == typeof arguments[1] ? c = arguments[1] : a = arguments[1];
                        break;
                    case 3:
                        b = arguments[0];
                        a = arguments[1];
                        c = arguments[2];
                        break;
                    default:
                        throw Error("Incorrect number of arguments: expected 1-3");
                }
                return m.dialog(b, {
                    label: a,
                    icon: g.OK,
                    "class": l.OK,
                    callback: c
                }, {
                    onEscape: c || !0
                })
            },
            confirm: function () {
                var b = "",
                    a = k("CANCEL"),
                    c = k("CONFIRM"),
                    e = null;
                switch (arguments.length) {
                    case 1:
                        b = arguments[0];
                        break;
                    case 2:
                        b = arguments[0];
                        "function" == typeof arguments[1] ? e = arguments[1] : a = arguments[1];
                        break;
                    case 3:
                        b = arguments[0];
                        a = arguments[1];
                        "function" == typeof arguments[2] ? e = arguments[2] : c = arguments[2];
                        break;
                    case 4:
                        b = arguments[0];
                        a = arguments[1];
                        c = arguments[2];
                        e = arguments[3];
                        break;
                    default:
                        throw Error("Incorrect number of arguments: expected 1-4");
                }
                var h = function () {
                    if ("function" === typeof e) return e(!1)
                };
                return m.dialog(b, [{
                    label: a,
                    icon: g.CANCEL,
                    "class": l.CANCEL,
                    callback: h
                }, {
                    label: c,
                    icon: g.CONFIRM,
                    "class": l.CONFIRM,
                    callback: function () {
                        if ("function" === typeof e) return e(!0)
                    }
                }], {
                    onEscape: h
                })
            },
            prompt: function () {
                var b = "",
                    a = k("CANCEL"),
                    c = k("CONFIRM"),
                    e = null,
                    h = "";
                switch (arguments.length) {
                    case 1:
                        b = arguments[0];
                        break;
                    case 2:
                        b = arguments[0];
                        "function" == typeof arguments[1] ? e = arguments[1] : a = arguments[1];
                        break;
                    case 3:
                        b = arguments[0];
                        a = arguments[1];
                        "function" == typeof arguments[2] ? e = arguments[2] : c = arguments[2];
                        break;
                    case 4:
                        b = arguments[0];
                        a = arguments[1];
                        c = arguments[2];
                        e = arguments[3];
                        break;
                    case 5:
                        b = arguments[0];
                        a = arguments[1];
                        c = arguments[2];
                        e = arguments[3];
                        h = arguments[4];
                        break;
                    default:
                        throw Error("Incorrect number of arguments: expected 1-5");
                }
                var q = n("<form></form>");
                q.append("<input autocomplete=off type=text value='" + h + "' />");
                var h = function () {
                    if ("function" === typeof e) return e(null)
                }, d = m.dialog(q, [{
                    label: a,
                    icon: g.CANCEL,
                    "class": l.CANCEL,
                    callback: h
                }, {
                    label: c,
                    icon: g.CONFIRM,
                    "class": l.CONFIRM,
                    callback: function () {
                        if ("function" === typeof e) return e(q.find("input[type=text]").val())
                    }
                }], {
                    header: b,
                    show: !1,
                    onEscape: h
                });
                d.on("shown",
                    function () {
                        q.find("input[type=text]").focus();
                        q.on("submit", function (a) {
                            a.preventDefault();
                            d.find(".btn-primary").click()
                        })
                    });
                d.modal("show");
                return d
            },
            dialog: function (b, a, c) {
                function e() {
                    var a = null;
                    "function" === typeof c.onEscape && (a = c.onEscape());
                    !1 !== a && f.modal("hide")
                }
                var h = "",
                    l = [];
                c || (c = {});
                "undefined" === typeof a ? a = [] : "undefined" == typeof a.length && (a = [a]);
                for (var d = a.length; d--;) {
                    var g = null,
                        k = null,
                        j = null,
                        m = "",
                        p = null;
                    if ("undefined" == typeof a[d].label && "undefined" == typeof a[d]["class"] && "undefined" ==
                        typeof a[d].callback) {
                        var g = 0,
                            k = null,
                            r;
                        for (r in a[d])
                            if (k = r, 1 < ++g) break;
                        1 == g && "function" == typeof a[d][r] && (a[d].label = k, a[d].callback = a[d][r])
                    }
                    "function" == typeof a[d].callback && (p = a[d].callback);
                    a[d]["class"] ? j = a[d]["class"] : d == a.length - 1 && 2 >= a.length && (j = "btn-primary");
                    g = a[d].label ? a[d].label : "Option " + (d + 1);
                    a[d].icon && (m = "<i class='" + a[d].icon + "'></i> ");
                    k = a[d].href ? a[d].href : "javascript:;";
                    h = "<a data-handler='" + d + "' class='btn " + j + "' href='" + k + "'>" + m + "" + g + "</a>" + h;
                    l[d] = p
                }
                d = ["<div class='bootbox modal-alert' tabindex='-1' style='overflow:hidden;'>"];
                if (c.header) {
                    j = "";
                    if ("undefined" == typeof c.headerCloseButton || c.headerCloseButton) j = "<a href='javascript:;' class='close'>&times;</a>";
                    d.push("<div class='modal-header'>" + j + "<h3>" + c.header + "</h3></div>")
                }
                d.push("<div class='modal-body'></div>");
                h && d.push("<div class='modal-footer'>" + h + "</div>");
                d.push("</div>");
                var f = n(d.join("\n"));
                ("undefined" === typeof c.animate ? u : c.animate) && f.addClass("fade");
                (h = "undefined" === typeof c.classes ? v : c.classes) && f.addClass(h);
                f.find(".modal-body").html(b);
                f.on("keyup.dismiss.modal",
                    function (a) {
                        27 === a.which && c.onEscape && e("escape")
                    });
                f.on("click", "a.close", function (a) {
                    a.preventDefault();
                    e("close")
                });
                f.on("shown", function () {
                    f.find("a.btn-primary:first").focus()
                });
                f.on("hidden", function () {
                    f.remove()
                });
                f.on("click", ".modal-footer a", function (b) {
                    var c = n(this).data("handler"),
                        d = l[c],
                        e = null;
                    "undefined" !== typeof c && "undefined" !== typeof a[c].href || (b.preventDefault(), "function" === typeof d && (e = d()), !1 !== e && f.modal("hide"))
                });
                n("body").append(f);
                f.modal({
                    backdrop: "undefined" === typeof c.backdrop ? s : c.backdrop,
                    keyboard: !1,
                    show: !1
                });
                f.on("show", function () {
                    n(w).off("focusin.modal")
                });
                ("undefined" === typeof c.show || !0 === c.show) && f.modal("show");
                return f
            },
            modal: function () {
                var b, a, c, e = {
                    onEscape: null,
                    keyboard: !0,
                    backdrop: s
                };
                switch (arguments.length) {
                    case 1:
                        b = arguments[0];
                        break;
                    case 2:
                        b = arguments[0];
                        "object" == typeof arguments[1] ? c = arguments[1] : a = arguments[1];
                        break;
                    case 3:
                        b = arguments[0];
                        a = arguments[1];
                        c = arguments[2];
                        break;
                    default:
                        throw Error("Incorrect number of arguments: expected 1-3");
                }
                e.header = a;
                c = "object" == typeof c ? n.extend(e, c) : e;
                return m.dialog(b, [], c)
            },
            hideAll: function () {
                n(".bootbox").modal("hide")
            },
            animate: function (b) {
                u = b
            },
            backdrop: function (b) {
                s = b
            },
            classes: function (b) {
                v = b
            }
        }, j = {
            en: {
                OK: "OK",
                CANCEL: "Cancel",
                CONFIRM: "OK"
            },
            fr: {
                OK: "OK",
                CANCEL: "Annuler",
                CONFIRM: "D'accord"
            },
            de: {
                OK: "OK",
                CANCEL: "Abbrechen",
                CONFIRM: "Akzeptieren"
            },
            es: {
                OK: "OK",
                CANCEL: "Cancelar",
                CONFIRM: "Aceptar"
            },
            br: {
                OK: "OK",
                CANCEL: "Cancelar",
                CONFIRM: "Sim"
            },
            nl: {
                OK: "OK",
                CANCEL: "Annuleren",
                CONFIRM: "Accepteren"
            },
            ru: {
                OK: "OK",
                CANCEL: "\u041e\u0442\u043c\u0435\u043d\u0430",
                CONFIRM: "\u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c"
            },
            it: {
                OK: "OK",
                CANCEL: "Annulla",
                CONFIRM: "Conferma"
            }
        };
    return m
}(document, window.jQuery);
window.bootbox = bootbox;