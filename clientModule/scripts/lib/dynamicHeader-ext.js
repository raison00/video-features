/*
 RequireJS 2.1.8 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
var requirejs, require, define;
(function(Z) {
    function H(b) {
        return "[object Function]" === L.call(b)
    }

    function I(b) {
        return "[object Array]" === L.call(b)
    }

    function y(b, c) {
        if (b) {
            var d;
            for (d = 0; d < b.length && (!b[d] || !c(b[d], d, b)); d += 1);
        }
    }

    function M(b, c) {
        if (b) {
            var d;
            for (d = b.length - 1; - 1 < d && (!b[d] || !c(b[d], d, b)); d -= 1);
        }
    }

    function s(b, c) {
        return ga.call(b, c)
    }

    function l(b, c) {
        return s(b, c) && b[c]
    }

    function F(b, c) {
        for (var d in b)
            if (s(b, d) && c(b[d], d)) break
    }

    function Q(b, c, d, h) {
        c && F(c, function(c, j) {
            if (d || !s(b, j)) h && "string" !== typeof c ? (b[j] || (b[j] = {}), Q(b[j],
                c, d, h)) : b[j] = c
        });
        return b
    }

    function u(b, c) {
        return function() {
            return c.apply(b, arguments)
        }
    }

    function aa(b) {
        throw b;
    }

    function ba(b) {
        if (!b) return b;
        var c = Z;
        y(b.split("."), function(b) {
            c = c[b]
        });
        return c
    }

    function A(b, c, d, h) {
        c = Error(c + "\nhttps://requirejs.org/docs/errors.html#" + b);
        c.requireType = b;
        c.requireModules = h;
        d && (c.originalError = d);
        return c
    }

    function ha(b) {
        function c(a, f, b) {
            var e, m, c, g, d, h, j, i = f && f.split("/");
            e = i;
            var n = k.map,
                p = n && n["*"];
            if (a && "." === a.charAt(0))
                if (f) {
                    e = l(k.pkgs, f) ? i = [f] : i.slice(0, i.length -
                        1);
                    f = a = e.concat(a.split("/"));
                    for (e = 0; f[e]; e += 1)
                        if (m = f[e], "." === m) f.splice(e, 1), e -= 1;
                        else if (".." === m)
                        if (1 === e && (".." === f[2] || ".." === f[0])) break;
                        else 0 < e && (f.splice(e - 1, 2), e -= 2);
                    e = l(k.pkgs, f = a[0]);
                    a = a.join("/");
                    e && a === f + "/" + e.main && (a = f)
                } else 0 === a.indexOf("./") && (a = a.substring(2));
            if (b && n && (i || p)) {
                f = a.split("/");
                for (e = f.length; 0 < e; e -= 1) {
                    c = f.slice(0, e).join("/");
                    if (i)
                        for (m = i.length; 0 < m; m -= 1)
                            if (b = l(n, i.slice(0, m).join("/")))
                                if (b = l(b, c)) {
                                    g = b;
                                    d = e;
                                    break
                                }
                    if (g) break;
                    !h && (p && l(p, c)) && (h = l(p, c), j = e)
                }!g &&
                    h && (g = h, d = j);
                g && (f.splice(0, d, g), a = f.join("/"))
            }
            return a
        }

        function d(a) {
            z && y(document.getElementsByTagName("script"), function(f) {
                if (f.getAttribute("data-requiremodule") === a && f.getAttribute("data-requirecontext") === i.contextName) return f.parentNode.removeChild(f), !0
            })
        }

        function h(a) {
            var f = l(k.paths, a);
            if (f && I(f) && 1 < f.length) return d(a), f.shift(), i.require.undef(a), i.require([a]), !0
        }

        function $(a) {
            var f, b = a ? a.indexOf("!") : -1; - 1 < b && (f = a.substring(0, b), a = a.substring(b + 1, a.length));
            return [f, a]
        }

        function n(a,
            f, b, e) {
            var m, B, g = null,
                d = f ? f.name : null,
                h = a,
                j = !0,
                k = "";
            a || (j = !1, a = "_@r" + (L += 1));
            a = $(a);
            g = a[0];
            a = a[1];
            g && (g = c(g, d, e), B = l(r, g));
            a && (g ? k = B && B.normalize ? B.normalize(a, function(a) {
                return c(a, d, e)
            }) : c(a, d, e) : (k = c(a, d, e), a = $(k), g = a[0], k = a[1], b = !0, m = i.nameToUrl(k)));
            b = g && !B && !b ? "_unnormalized" + (M += 1) : "";
            return {
                prefix: g,
                name: k,
                parentMap: f,
                unnormalized: !!b,
                url: m,
                originalName: h,
                isDefine: j,
                id: (g ? g + "!" + k : k) + b
            }
        }

        function q(a) {
            var f = a.id,
                b = l(p, f);
            b || (b = p[f] = new i.Module(a));
            return b
        }

        function t(a, f, b) {
            var e = a.id,
                m = l(p,
                    e);
            if (s(r, e) && (!m || m.defineEmitComplete)) "defined" === f && b(r[e]);
            else if (m = q(a), m.error && "error" === f) b(m.error);
            else m.on(f, b)
        }

        function v(a, f) {
            var b = a.requireModules,
                e = !1;
            if (f) f(a);
            else if (y(b, function(f) {
                    if (f = l(p, f)) f.error = a, f.events.error && (e = !0, f.emit("error", a))
                }), !e) j.onError(a)
        }

        function w() {
            R.length && (ia.apply(G, [G.length - 1, 0].concat(R)), R = [])
        }

        function x(a) {
            delete p[a];
            delete T[a]
        }

        function E(a, f, b) {
            var e = a.map.id;
            a.error ? a.emit("error", a.error) : (f[e] = !0, y(a.depMaps, function(e, c) {
                var g = e.id,
                    d = l(p, g);
                d && (!a.depMatched[c] && !b[g]) && (l(f, g) ? (a.defineDep(c, r[g]), a.check()) : E(d, f, b))
            }), b[e] = !0)
        }

        function C() {
            var a, f, b, e, m = (b = 1E3 * k.waitSeconds) && i.startTime + b < (new Date).getTime(),
                c = [],
                g = [],
                j = !1,
                l = !0;
            if (!U) {
                U = !0;
                F(T, function(b) {
                    a = b.map;
                    f = a.id;
                    if (b.enabled && (a.isDefine || g.push(b), !b.error))
                        if (!b.inited && m) h(f) ? j = e = !0 : (c.push(f), d(f));
                        else if (!b.inited && (b.fetched && a.isDefine) && (j = !0, !a.prefix)) return l = !1
                });
                if (m && c.length) return b = A("timeout", "Load timeout for modules: " + c, null, c), b.contextName =
                    i.contextName, v(b);
                l && y(g, function(a) {
                    E(a, {}, {})
                });
                if ((!m || e) && j)
                    if ((z || da) && !V) V = setTimeout(function() {
                        V = 0;
                        C()
                    }, 50);
                U = !1
            }
        }

        function D(a) {
            s(r, a[0]) || q(n(a[0], null, !0)).init(a[1], a[2])
        }

        function J(a) {
            var a = a.currentTarget || a.srcElement,
                b = i.onScriptLoad;
            a.detachEvent && !W ? a.detachEvent("onreadystatechange", b) : a.removeEventListener("load", b, !1);
            b = i.onScriptError;
            (!a.detachEvent || W) && a.removeEventListener("error", b, !1);
            return {
                node: a,
                id: a && a.getAttribute("data-requiremodule")
            }
        }

        function K() {
            var a;
            for (w(); G.length;) {
                a =
                    G.shift();
                if (null === a[0]) return v(A("mismatch", "Mismatched anonymous define() module: " + a[a.length - 1]));
                D(a)
            }
        }
        var U, X, i, N, V, k = {
                waitSeconds: 7,
                baseUrl: "./",
                paths: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            p = {},
            T = {},
            Y = {},
            G = [],
            r = {},
            S = {},
            L = 1,
            M = 1;
        N = {
            require: function(a) {
                return a.require ? a.require : a.require = i.makeRequire(a.map)
            },
            exports: function(a) {
                a.usingExports = !0;
                if (a.map.isDefine) return a.exports ? a.exports : a.exports = r[a.map.id] = {}
            },
            module: function(a) {
                return a.module ? a.module : a.module = {
                    id: a.map.id,
                    uri: a.map.url,
                    config: function() {
                        var b =
                            l(k.pkgs, a.map.id);
                        return (b ? l(k.config, a.map.id + "/" + b.main) : l(k.config, a.map.id)) || {}
                    },
                    exports: r[a.map.id]
                }
            }
        };
        X = function(a) {
            this.events = l(Y, a.id) || {};
            this.map = a;
            this.shim = l(k.shim, a.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0
        };
        X.prototype = {
            init: function(a, b, c, e) {
                e = e || {};
                if (!this.inited) {
                    this.factory = b;
                    if (c) this.on("error", c);
                    else this.events.error && (c = u(this, function(a) {
                        this.emit("error", a)
                    }));
                    this.depMaps = a && a.slice(0);
                    this.errback = c;
                    this.inited = !0;
                    this.ignore = e.ignore;
                    e.enabled || this.enabled ? this.enable() : this.check()
                }
            },
            defineDep: function(a, b) {
                this.depMatched[a] || (this.depMatched[a] = !0, this.depCount -= 1, this.depExports[a] = b)
            },
            fetch: function() {
                if (!this.fetched) {
                    this.fetched = !0;
                    i.startTime = (new Date).getTime();
                    var a = this.map;
                    if (this.shim) i.makeRequire(this.map, {
                        enableBuildCallback: !0
                    })(this.shim.deps || [], u(this, function() {
                        return a.prefix ? this.callPlugin() : this.load()
                    }));
                    else return a.prefix ? this.callPlugin() : this.load()
                }
            },
            load: function() {
                var a =
                    this.map.url;
                S[a] || (S[a] = !0, i.load(this.map.id, a))
            },
            check: function() {
                if (this.enabled && !this.enabling) {
                    var a, b, c = this.map.id;
                    b = this.depExports;
                    var e = this.exports,
                        m = this.factory;
                    if (this.inited)
                        if (this.error) this.emit("error", this.error);
                        else {
                            if (!this.defining) {
                                this.defining = !0;
                                if (1 > this.depCount && !this.defined) {
                                    if (H(m)) {
                                        if (this.events.error && this.map.isDefine || j.onError !== aa) try {
                                            e = i.execCb(c, m, b, e)
                                        } catch (d) {
                                            a = d
                                        } else e = i.execCb(c, m, b, e);
                                        this.map.isDefine && ((b = this.module) && void 0 !== b.exports && b.exports !==
                                            this.exports ? e = b.exports : void 0 === e && this.usingExports && (e = this.exports));
                                        if (a) return a.requireMap = this.map, a.requireModules = this.map.isDefine ? [this.map.id] : null, a.requireType = this.map.isDefine ? "define" : "require", v(this.error = a)
                                    } else e = m;
                                    this.exports = e;
                                    if (this.map.isDefine && !this.ignore && (r[c] = e, j.onResourceLoad)) j.onResourceLoad(i, this.map, this.depMaps);
                                    x(c);
                                    this.defined = !0
                                }
                                this.defining = !1;
                                this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                            }
                        } else this.fetch()
                }
            },
            callPlugin: function() {
                var a = this.map,
                    b = a.id,
                    d = n(a.prefix);
                this.depMaps.push(d);
                t(d, "defined", u(this, function(e) {
                    var m, d;
                    d = this.map.name;
                    var g = this.map.parentMap ? this.map.parentMap.name : null,
                        h = i.makeRequire(a.parentMap, {
                            enableBuildCallback: !0
                        });
                    if (this.map.unnormalized) {
                        if (e.normalize && (d = e.normalize(d, function(a) {
                                return c(a, g, !0)
                            }) || ""), e = n(a.prefix + "!" + d, this.map.parentMap), t(e, "defined", u(this, function(a) {
                                this.init([], function() {
                                    return a
                                }, null, {
                                    enabled: !0,
                                    ignore: !0
                                })
                            })),
                            d = l(p, e.id)) {
                            this.depMaps.push(e);
                            if (this.events.error) d.on("error", u(this, function(a) {
                                this.emit("error", a)
                            }));
                            d.enable()
                        }
                    } else m = u(this, function(a) {
                        this.init([], function() {
                            return a
                        }, null, {
                            enabled: !0
                        })
                    }), m.error = u(this, function(a) {
                        this.inited = !0;
                        this.error = a;
                        a.requireModules = [b];
                        F(p, function(a) {
                            0 === a.map.id.indexOf(b + "_unnormalized") && x(a.map.id)
                        });
                        v(a)
                    }), m.fromText = u(this, function(e, c) {
                        var d = a.name,
                            g = n(d),
                            B = O;
                        c && (e = c);
                        B && (O = !1);
                        q(g);
                        s(k.config, b) && (k.config[d] = k.config[b]);
                        try {
                            j.exec(e)
                        } catch (ca) {
                            return v(A("fromtexteval",
                                "fromText eval for " + b + " failed: " + ca, ca, [b]))
                        }
                        B && (O = !0);
                        this.depMaps.push(g);
                        i.completeLoad(d);
                        h([d], m)
                    }), e.load(a.name, h, m, k)
                }));
                i.enable(d, this);
                this.pluginMaps[d.id] = d
            },
            enable: function() {
                T[this.map.id] = this;
                this.enabling = this.enabled = !0;
                y(this.depMaps, u(this, function(a, b) {
                    var c, e;
                    if ("string" === typeof a) {
                        a = n(a, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap);
                        this.depMaps[b] = a;
                        if (c = l(N, a.id)) {
                            this.depExports[b] = c(this);
                            return
                        }
                        this.depCount += 1;
                        t(a, "defined", u(this, function(a) {
                            this.defineDep(b,
                                a);
                            this.check()
                        }));
                        this.errback && t(a, "error", u(this, this.errback))
                    }
                    c = a.id;
                    e = p[c];
                    !s(N, c) && (e && !e.enabled) && i.enable(a, this)
                }));
                F(this.pluginMaps, u(this, function(a) {
                    var b = l(p, a.id);
                    b && !b.enabled && i.enable(a, this)
                }));
                this.enabling = !1;
                this.check()
            },
            on: function(a, b) {
                var c = this.events[a];
                c || (c = this.events[a] = []);
                c.push(b)
            },
            emit: function(a, b) {
                y(this.events[a], function(a) {
                    a(b)
                });
                "error" === a && delete this.events[a]
            }
        };
        i = {
            config: k,
            contextName: b,
            registry: p,
            defined: r,
            urlFetched: S,
            defQueue: G,
            Module: X,
            makeModuleMap: n,
            nextTick: j.nextTick,
            onError: v,
            configure: function(a) {
                a.baseUrl && "/" !== a.baseUrl.charAt(a.baseUrl.length - 1) && (a.baseUrl += "/");
                var b = k.pkgs,
                    c = k.shim,
                    e = {
                        paths: !0,
                        config: !0,
                        map: !0
                    };
                F(a, function(a, b) {
                    e[b] ? "map" === b ? (k.map || (k.map = {}), Q(k[b], a, !0, !0)) : Q(k[b], a, !0) : k[b] = a
                });
                a.shim && (F(a.shim, function(a, b) {
                    I(a) && (a = {
                        deps: a
                    });
                    if ((a.exports || a.init) && !a.exportsFn) a.exportsFn = i.makeShimExports(a);
                    c[b] = a
                }), k.shim = c);
                a.packages && (y(a.packages, function(a) {
                    a = "string" === typeof a ? {
                        name: a
                    } : a;
                    b[a.name] = {
                        name: a.name,
                        location: a.location || a.name,
                        main: (a.main || "main").replace(ja, "").replace(ea, "")
                    }
                }), k.pkgs = b);
                F(p, function(a, b) {
                    !a.inited && !a.map.unnormalized && (a.map = n(b))
                });
                if (a.deps || a.callback) i.require(a.deps || [], a.callback)
            },
            makeShimExports: function(a) {
                return function() {
                    var b;
                    a.init && (b = a.init.apply(Z, arguments));
                    return b || a.exports && ba(a.exports)
                }
            },
            makeRequire: function(a, f) {
                function d(e, c, h) {
                    var g, k;
                    f.enableBuildCallback && (c && H(c)) && (c.__requireJsBuild = !0);
                    if ("string" === typeof e) {
                        if (H(c)) return v(A("requireargs",
                            "Invalid require call"), h);
                        if (a && s(N, e)) return N[e](p[a.id]);
                        if (j.get) return j.get(i, e, a, d);
                        g = n(e, a, !1, !0);
                        g = g.id;
                        return !s(r, g) ? v(A("notloaded", 'Module name "' + g + '" has not been loaded yet for context: ' + b + (a ? "" : ". Use require([])"))) : r[g]
                    }
                    K();
                    i.nextTick(function() {
                        K();
                        k = q(n(null, a));
                        k.skipMap = f.skipMap;
                        k.init(e, c, h, {
                            enabled: !0
                        });
                        C()
                    });
                    return d
                }
                f = f || {};
                Q(d, {
                    isBrowser: z,
                    toUrl: function(b) {
                        var d, f = b.lastIndexOf("."),
                            g = b.split("/")[0];
                        if (-1 !== f && (!("." === g || ".." === g) || 1 < f)) d = b.substring(f, b.length), b =
                            b.substring(0, f);
                        return i.nameToUrl(c(b, a && a.id, !0), d, !0)
                    },
                    defined: function(b) {
                        return s(r, n(b, a, !1, !0).id)
                    },
                    specified: function(b) {
                        b = n(b, a, !1, !0).id;
                        return s(r, b) || s(p, b)
                    }
                });
                a || (d.undef = function(b) {
                    w();
                    var c = n(b, a, !0),
                        f = l(p, b);
                    delete r[b];
                    delete S[c.url];
                    delete Y[b];
                    f && (f.events.defined && (Y[b] = f.events), x(b))
                });
                return d
            },
            enable: function(a) {
                l(p, a.id) && q(a).enable()
            },
            completeLoad: function(a) {
                var b, c, e = l(k.shim, a) || {},
                    d = e.exports;
                for (w(); G.length;) {
                    c = G.shift();
                    if (null === c[0]) {
                        c[0] = a;
                        if (b) break;
                        b = !0
                    } else c[0] ===
                        a && (b = !0);
                    D(c)
                }
                c = l(p, a);
                if (!b && !s(r, a) && c && !c.inited) {
                    if (k.enforceDefine && (!d || !ba(d))) return h(a) ? void 0 : v(A("nodefine", "No define call for " + a, null, [a]));
                    D([a, e.deps || [], e.exportsFn])
                }
                C()
            },
            nameToUrl: function(a, b, c) {
                var e, d, h, g, i, n;
                if (j.jsExtRegExp.test(a)) g = a + (b || "");
                else {
                    e = k.paths;
                    d = k.pkgs;
                    g = a.split("/");
                    for (i = g.length; 0 < i; i -= 1)
                        if (n = g.slice(0, i).join("/"), h = l(d, n), n = l(e, n)) {
                            I(n) && (n = n[0]);
                            g.splice(0, i, n);
                            break
                        } else if (h) {
                        a = a === h.name ? h.location + "/" + h.main : h.location;
                        g.splice(0, i, a);
                        break
                    }
                    g = g.join("/");
                    g += b || (/\?/.test(g) || c ? "" : ".js");
                    g = ("/" === g.charAt(0) || g.match(/^[\w\+\.\-]+:/) ? "" : k.baseUrl) + g
                }
                return k.urlArgs ? g + ((-1 === g.indexOf("?") ? "?" : "&") + k.urlArgs) : g
            },
            load: function(a, b) {
                j.load(i, a, b)
            },
            execCb: function(a, b, c, e) {
                return b.apply(e, c)
            },
            onScriptLoad: function(a) {
                if ("load" === a.type || ka.test((a.currentTarget || a.srcElement).readyState)) P = null, a = J(a), i.completeLoad(a.id)
            },
            onScriptError: function(a) {
                var b = J(a);
                if (!h(b.id)) return v(A("scripterror", "Script error for: " + b.id, a, [b.id]))
            }
        };
        i.require = i.makeRequire();
        return i
    }
    var j, w, x, C, J, D, P, K, q, fa, la = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        ma = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        ea = /\.js$/,
        ja = /^\.\//;
    w = Object.prototype;
    var L = w.toString,
        ga = w.hasOwnProperty,
        ia = Array.prototype.splice,
        z = !!("undefined" !== typeof window && navigator && window.document),
        da = !z && "undefined" !== typeof importScripts,
        ka = z && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
        W = "undefined" !== typeof opera && "[object Opera]" === opera.toString(),
        E = {},
        t = {},
        R = [],
        O = !1;
    if ("undefined" === typeof define) {
        if ("undefined" !== typeof requirejs) {
            if (H(requirejs)) return;
            t = requirejs;
            requirejs = void 0
        }
        "undefined" !== typeof require && !H(require) && (t = require, require = void 0);
        j = requirejs = function(b, c, d, h) {
            var q, n = "_";
            !I(b) && "string" !== typeof b && (q = b, I(c) ? (b = c, c = d, d = h) : b = []);
            q && q.context && (n = q.context);
            (h = l(E, n)) || (h = E[n] = j.s.newContext(n));
            q && h.configure(q);
            return h.require(b, c, d)
        };
        j.config = function(b) {
            return j(b)
        };
        j.nextTick = "undefined" !== typeof setTimeout ? function(b) {
            setTimeout(b,
                4)
        } : function(b) {
            b()
        };
        require || (require = j);
        j.version = "2.1.8";
        j.jsExtRegExp = /^\/|:|\?|\.js$/;
        j.isBrowser = z;
        w = j.s = {
            contexts: E,
            newContext: ha
        };
        j({});
        y(["toUrl", "undef", "defined", "specified"], function(b) {
            j[b] = function() {
                var c = E._;
                return c.require[b].apply(c, arguments)
            }
        });
        if (z && (x = w.head = document.getElementsByTagName("head")[0], C = document.getElementsByTagName("base")[0])) x = w.head = C.parentNode;
        j.onError = aa;
        j.createNode = function(b) {
            var c = b.xhtml ? document.createElementNS("https://www.w3.org/1999/xhtml", "html:script") :
                document.createElement("script");
            c.type = b.scriptType || "text/javascript";
            c.charset = "utf-8";
            c.async = !0;
            return c
        };
        j.load = function(b, c, d) {
            var h = b && b.config || {};
            if (z) return h = j.createNode(h, c, d), h.setAttribute("data-requirecontext", b.contextName), h.setAttribute("data-requiremodule", c), h.attachEvent && !(h.attachEvent.toString && 0 > h.attachEvent.toString().indexOf("[native code")) && !W ? (O = !0, h.attachEvent("onreadystatechange", b.onScriptLoad)) : (h.addEventListener("load", b.onScriptLoad, !1), h.addEventListener("error",
                b.onScriptError, !1)), h.src = d, K = h, C ? x.insertBefore(h, C) : x.appendChild(h), K = null, h;
            if (da) try {
                importScripts(d), b.completeLoad(c)
            } catch (l) {
                b.onError(A("importscripts", "importScripts failed for " + c + " at " + d, l, [c]))
            }
        };
        z && M(document.getElementsByTagName("script"), function(b) {
            x || (x = b.parentNode);
            if (J = b.getAttribute("data-main")) return q = J, t.baseUrl || (D = q.split("/"), q = D.pop(), fa = D.length ? D.join("/") + "/" : "./", t.baseUrl = fa), q = q.replace(ea, ""), j.jsExtRegExp.test(q) && (q = J), t.deps = t.deps ? t.deps.concat(q) : [q], !0
        });
        define = function(b, c, d) {
            var h, j;
            "string" !== typeof b && (d = c, c = b, b = null);
            I(c) || (d = c, c = null);
            !c && H(d) && (c = [], d.length && (d.toString().replace(la, "").replace(ma, function(b, d) {
                c.push(d)
            }), c = (1 === d.length ? ["require"] : ["require", "exports", "module"]).concat(c)));
            if (O) {
                if (!(h = K)) P && "interactive" === P.readyState || M(document.getElementsByTagName("script"), function(b) {
                    if ("interactive" === b.readyState) return P = b
                }), h = P;
                h && (b || (b = h.getAttribute("data-requiremodule")), j = E[h.getAttribute("data-requirecontext")])
            }(j ? j.defQueue :
                R).push([b, c, d])
        };
        define.amd = {
            jQuery: !0
        };
        j.exec = function(b) {
            return eval(b)
        };
        j(t)
    }
})(this);

define("requirelib", function() {});

/**
 * @license RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */
/*jslint */
/*global require: false, define: false, requirejs: false,
  window: false, clearInterval: false, document: false,
  self: false, setInterval: false */


define('domReady', [], function() {


    var isTop, testDiv, scrollIntervalId,
        isBrowser = typeof window !== "undefined" && window.document,
        isPageLoaded = !isBrowser,
        doc = isBrowser ? document : null,
        readyCalls = [];

    function runCallbacks(callbacks) {
        var i;
        for (i = 0; i < callbacks.length; i += 1) {
            callbacks[i](doc);
        }
    }

    function callReady() {
        var callbacks = readyCalls;

        if (isPageLoaded) {
            //Call the DOM ready callbacks
            if (callbacks.length) {
                readyCalls = [];
                runCallbacks(callbacks);
            }
        }
    }

    /**
     * Sets the page as loaded.
     */
    function pageLoaded() {
        if (!isPageLoaded) {
            isPageLoaded = true;
            if (scrollIntervalId) {
                clearInterval(scrollIntervalId);
            }

            callReady();
        }
    }

    if (isBrowser) {
        if (document.addEventListener) {
            //Standards. Hooray! Assumption here that if standards based,
            //it knows about DOMContentLoaded.
            document.addEventListener("DOMContentLoaded", pageLoaded, false);
            window.addEventListener("load", pageLoaded, false);
        } else if (window.attachEvent) {
            window.attachEvent("onload", pageLoaded);

            testDiv = document.createElement('div');
            try {
                isTop = window.frameElement === null;
            } catch (e) {}

            //DOMContentLoaded approximation that uses a doScroll, as found by
            //Diego Perini: http://javascript.nwbox.com/IEContentLoaded/,
            //but modified by other contributors, including jdalton
            if (testDiv.doScroll && isTop && window.external) {
                scrollIntervalId = setInterval(function() {
                    try {
                        testDiv.doScroll();
                        pageLoaded();
                    } catch (e) {}
                }, 30);
            }
        }

        //Check if document already complete, and if so, just trigger page load
        //listeners. Latest webkit browsers also use "interactive", and
        //will fire the onDOMContentLoaded before "interactive" but not after
        //entering "interactive" or "complete". More details:
        //http://dev.w3.org/html5/spec/the-end.html#the-end
        //http://stackoverflow.com/questions/3665561/document-readystate-of-interactive-vs-ondomcontentloaded
        //Hmm, this is more complicated on further use, see "firing too early"
        //bug: https://github.com/requirejs/domReady/issues/1
        //so removing the || document.readyState === "interactive" test.
        //There is still a window.onload binding that should get fired if
        //DOMContentLoaded is missed.
        if (document.readyState === "complete") {
            pageLoaded();
        }
    }

    /** START OF PUBLIC API **/

    /**
     * Registers a callback for DOM ready. If DOM is already ready, the
     * callback is called immediately.
     * @param {Function} callback
     */
    function domReady(callback) {
        if (isPageLoaded) {
            callback(doc);
        } else {
            readyCalls.push(callback);
        }
        return domReady;
    }

    domReady.version = '2.0.1';

    /**
     * Loader Plugin API method
     */
    domReady.load = function(name, req, onLoad, config) {
        if (config.isBuild) {
            onLoad(null);
        } else {
            domReady(onLoad);
        }
    };

    /** END OF PUBLIC API **/

    return domReady;
});

define('base', ['jquery'], function($) {
    //constants
    var TOP = "top",
        BOTTOM = "bottom",
        RIGHT = "right",
        LEFT = "left",
        ALIGN_TOP = "alignTop",
        ALIGN_BOTTOM = "alignBottom",
        FLEX_LABEL_PREFIX = "flexLabel_",
        SITE = "SITE",
        REGISTRY = "REGISTRY",
        HTTPS = "https://",
        HTTP = "http://";

    var getCurrentChannel = function(testURL) {
        var url = testURL || window.location.href;
        var channel = !~url.indexOf("registry") ? this.SITE : this.REGISTRY;
        return channel;
    };

    var isThirdParty = function(testHostName) {
        var host = testHostName || window.location.host;
        //var isProd = (host.indexOf("www.macys.com") > -1) || (host.indexOf("www1.macys.com") > -1);
        //var isTestEnv = host.indexOf(".fds.com") > -1;
        //var isLocalTestEnv = host.indexOf("localhost") > -1;
        var isConfigSet = typeof macysConfig === 'object';

        return isConfigSet; //!isProd && !isTestEnv && !isLocalTestEnv && isConfigSet;
    };
    //All of macys is either www.macys.com or www1.macys.com"
    var isProduction = function(testHost) {
        var host = testHost || window.location.host;
        return host.indexOf("www.macys.com") > -1 || host.indexOf("www1.macys.com") > -1;
    };

    //navApp pages will NOT have this element, length will be zero
    var isNavApp = function() {
        var len = $("div.globalHiddenDefaultTopNav").length;
        return len === 0;
    };

    var getProtocol = function(testURL) {
        var href = testURL || location.href; //override for testing
        if (href.indexOf(this.HTTPS) > -1) {
            return this.HTTPS;
        } else if (href.indexOf(this.HTTP) > -1) {
            return this.HTTP;
        } else {
            //return everything before double slashes //
            //ftp://
            //ftps://
            if (href.indexOf(":") > -1) {
                var index = href.indexOf(":");
                return href.substr(0, index + 3);
            } else {
                return "";
            }
        }
    };

    var isTouch = function() {
        var touchStart = !!('ontouchstart' in window);
        var msTouch = !!(window.navigator.msMaxTouchPoints) && window.navigator.msMaxTouchPoints > 0; /*IE 10*/
        return touchStart || msTouch;
    };

    var removePrefix = function(str) {
        var id = str.substr(str.indexOf("_") + 1);

        if (id.match(/[a-zA-Z]+/))
            throw new Error("base.removePrefix has failed. Invalid id value.");
        return Number(id);
    };
    //input example:
    //flexLink_<ID>
    //returns ID
    //or
    //flyout_<ID>
    //returns ID
    var getSuffixId = function(str) {
        if (!~str.indexOf("_")) {
            throw new Error("Invalid flyout id format, should be flyout_<ID> for flyouts OR " + this.FLEX_LABEL_PREFIX + "<ID> for topnav " + str);
        } else {
            return this.removePrefix(str);
        }
    };

    var getUserAgent = function() {
        var a = (navigator.userAgent || navigator.vendor || window.opera);
        return a;
    };

    var getIEVersion = function(userAgentStringTest) {
        var ua = userAgentStringTest || this.getUserAgent();
        var groups = ua.match(/(MSIE )([0-9\.b]+)/);
        return groups == null ? false : eval(groups[2].substring(0, groups[2].indexOf(".") + 2));
    };

    var sign = function(p1, p2, p3) {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    };

    var pointInTriangle = function(point, v1, v2, v3) {
        if (point == undefined || v1 == undefined || v2 == undefined || v3 == undefined || v1.x == 0 || v1.y == 0) {
            return false;
        }
        var b1, b2, b3;
        b1 = this.sign(point, v1, v2) < 0;
        b2 = this.sign(point, v2, v3) < 0;
        b3 = this.sign(point, v3, v1) < 0;
        return ((b1 == b2) && (b2 == b3));
    };

    var makeIdIfUnknown = function(str) {
        if (typeof str === 'string') {
            if (str.substring(0, 1) != '#' && str.substring(0, 1) != '.') {
                str = '#' + str;
            }
        }
        return str;
    };

    var removeEndSlash = function(str) {
        return str.charAt(str.length - 1) === "/" ? str.substr(0, str.length - 1) : str;
    };

    var getServiceUrl = function(host, port, path, secureHost) {
        var servicePath = path,
            serviceHost = host,
            serviceHostSecure = secureHost || "",
            serviceHostPort = port;


        //Retrieve and construct the autocomplete ajax url from *base*
        var baseURL = serviceHost;
        if (window && window.location && window.location.protocol.indexOf('https') != -1) {
            baseURL = serviceHostSecure;
        }
        if (serviceHostPort != "80" && serviceHostPort != "443" && serviceHostPort != '') {
            baseURL = removeEndSlash(baseURL) + ":" + serviceHostPort;
        }
        baseURL += servicePath;

        //STEP: Clean up URL, remove any double slashes, make certain it ends with a slash
        baseURL = removeEndSlash((baseURL).replace(/([^:]\/)\/+/g, "$1"));
        return baseURL;
    };
    //convert html snippet that contain ROOT relative links to absolute links
    //var example = Base.absoluteLinkatize("<p>html content<br/><a href='/shop/somelink/blah/'>Cool Product</a>", "https://www.macys.com");
    //updated to be: <p>html content<br/><a href='https://www.macys.com/shop/somelink/blah/'>Cool Product</a>
    var absoluteLinkatize = function(str, host) {
        if (!host) {
            throw new Error("Base.absoluteLinkatize failed. Required host parameter is missing.");
        } else {
             var newStr=str.replace(/href=("|')\//g, "href=$1" + host + "/");
            return newStr.replace(/src=("|')\//g, "src=$1" + host + "/");
        }

    }

    return {
        isProduction: isProduction,
        getIEVersion: getIEVersion,
        removePrefix: removePrefix,
        getSuffixId: getSuffixId,
        getUserAgent: getUserAgent,
        getCurrentChannel: getCurrentChannel,
        pointInTriangle: pointInTriangle,
        isThirdParty: isThirdParty,
        isNavApp: isNavApp,
        removeEndSlash: removeEndSlash,
        getServiceUrl: getServiceUrl,
        absoluteLinkatize: absoluteLinkatize,
        makeIdIfUnknown: makeIdIfUnknown,
        isTouch: isTouch,
        sign: sign,
        getProtocol: getProtocol,
        HTTP: HTTP,
        HTTPS: HTTPS,
        FLEX_LABEL_PREFIX: FLEX_LABEL_PREFIX,
        SITE: SITE,
        REGISTRY: REGISTRY
    }
});

define('headerFOBNav', ['jquery', 'base'], function($, Base) {
    //when
    var fobCategoryIds = [],
        IS_TOUCH,
        FLYOUTS_ENABLED,
        fobListItems,
        CLIENT_Y = 0,
        MOUSEMOVE_VDIR,
        MAX_FLYOUT_COLUMNS = 4,
        readyCallback,
        onOverCallback,
        onOutCallback,
        onMoveCallback,
        channelOverride,
        mouseCoords,
        presstimeout;

    return {
        UP: "up",
        DOWN: "down",
        TOPNAV_CLASS: "macysDynFlyout",
        onReady: function(callback) {
            readyCallback = callback;
        },

        //for iship we need shipping country code
        //need to add parameter to service to accept country shipping
        //1 iteration to add per Tiago

        fetchFOBList: function() {
            var _this = this,
                base = Base.isThirdParty() ? (location.href.indexOf("https") > -1) ? "https://www.macys.com" : "https://www.macys.com" : "";

            var url = base + "/shop/topnav?application=" + (channelOverride || Base.getCurrentChannel());
            //var url = "https://realtime-shopping.herokuapp.com/jsonp-test";

            $.ajax({
                url: url,
                type: 'GET',
                crossDomain: true,
                dataType: 'jsonp',
                jsonpCallback: 'flyoutCallback',
                cache: true,
                timeout: 2000,
                success: function(data, textStatus, xhr) {
                    var topLinks = Base.isThirdParty() ? Base.absoluteLinkatize(data.html, "https://www.macys.com") : data.html;
                    _this.fetchFOBListSuccess(topLinks, textStatus, xhr);
                },
                error: function(xhr, textStatus, errorThrown) {
                    _this.fetchFOBListError(xhr, textStatus, errorThrown);
                }
            });
        },
        //distribute topnav elements if more than 50px difference
        distributeWidths: function() {

            var ulWidth = $("header#globalMastheadContainer div#globalMastheadCategoryMenu > ul").width(),
                elementWidths = 0,
                totalElements = 0,
                padding = 0,
                margin = 0,
                adjMargin = 0,
                defaultPaddingPerSide = 5;

            //registry pages are duplicating entire header block
            //both dynamic header AND static header

            //this collection will account for that
            var collection = $("header#globalMastheadContainer").length > 1 ? $("header#globalMastheadContainer div#globalMastheadCategoryMenu > ul:not('.nav') > li") : $("header#globalMastheadContainer div#globalMastheadCategoryMenu > ul > li");

            collection.each(function(index) {
                var $el = $(this);
                elementWidths += $el.width();
                elementWidths += 10; //5px padding on right & left
                totalElements++;
            });
            //add right margin to each except last one
            margin = Math.floor((ulWidth - elementWidths) / (totalElements - 1));

            if (margin < 0) {
                //reduce padding
                var paddingAdj = Math.ceil(((elementWidths - ulWidth) / totalElements) / 2);
                defaultPaddingPerSide = defaultPaddingPerSide - paddingAdj;

            } else {
                $("header#globalMastheadContainer div#globalMastheadCategoryMenu > ul > li").each(function(index) {
                    if (index < (totalElements - 1)) {
                        $(this).css("margin-right", margin + "px");
                    }
                });
            }

            $("header#globalMastheadContainer div#globalMastheadCategoryMenu > ul > li").css("padding-right", defaultPaddingPerSide + "px").css("padding-left", defaultPaddingPerSide + "px");

        },
        fetchFOBListSuccess: function(data, textStatus, xhr) {
            var _this = this;
            if (data.length > 0) {
                var menu = $("div#globalMastheadCategoryMenu");
                menu.html(data);
                setTimeout(function() {
                    fobListItems = $("div#globalMastheadCategoryMenu > ul > li");
                    readyCallback(true);
                }, 25);


            } else {
                readyCallback(false);
            }
        },
        getFOBSelectorId: function(id) {
            return Base.FLEX_LABEL_PREFIX + id;
        },
        fetchFOBListError: function(xhr, textStatus, errorThrown) {
            readyCallback(false);
        },
        //number will be passed in
        deselect: function(id) {
            var selector = "li#" + this.getFOBSelectorId(id);
            $(selector).removeClass("selected-flyout");
            if (Base.getIEVersion() < 10) {
                $(this).removeClass("flyout-iefix");
            }
        },
        //de-couple css class names from component
        deselectOthers: function(id, className) {
            var _this = this;
            if (className == undefined) {
                className = "selected-flyout";
            }
            if (id == undefined) {
                fobListItems.removeClass(className);
            } else {
                fobListItems.each(function(index) {
                    if (_this.getFOBSelectorId(id) != $(this).attr("id")) {
                        $(this).removeClass(className);
                    }
                });
            }
        },
        getCategoryIds: function(str) {
            var arr, i, ids = [],
                s, tmp;
            s = str || $("div#globalMastheadCategoryMenu > ul").html();
            s = s.toLowerCase();
            arr = s.match(/id=("|')?(f|F)lexlabel_[0-9]+("|')?/g); //IE 7 makes tags uppercase

            if (arr != null && arr.length > 0) {
                for (i = 0; i < arr.length; i++) {
                    tmp = arr[i];
                    if (tmp[tmp.length - 1] === '"')
                        tmp = tmp.substring(0, tmp.length - 1);
                    var catId = tmp.substr(tmp.indexOf("_") + 1);
                    if (!isNaN(catId)) {
                        ids.push(eval(catId));
                    }
                }
            }
            return ids;
        },
        getVerticalMouseMoveDirection: function() {
            return MOUSEMOVE_VDIR || this.UP;
        },
        trackVerticalMouseDirection: function(event) {
            if (!FLYOUTS_ENABLED)
                return;

            //ignore horizontal movement
            if (event.clientY != CLIENT_Y) {
                MOUSEMOVE_VDIR = event.clientY < CLIENT_Y ? this.UP : this.DOWN;
                CLIENT_Y = event.clientY;
            }
            return;
        },
        init: function(flyoutsEnabled, override) {
            channelOverride = override || false;
            IS_TOUCH = Base.isTouch();
            FLYOUTS_ENABLED = flyoutsEnabled || false; //fallback to false

            if (!Base.isNavApp() || Base.isThirdParty()) {
                this.fetchFOBList();
            } else {
                readyCallback(this.getCategoryIds().length > 0);
            }
        },
        bind: function() {
            //don't bind events if Flyouts are NOT enabled
            if (!FLYOUTS_ENABLED)
                return;
            //Top FOB collection of <li>'s should already be on page
            fobListItems = $("div#globalMastheadCategoryMenu > ul > li");
            if (fobListItems.length === 0) {
                throw new Error("Top FOB navigation bar is empty.");
            } else {
                if (IS_TOUCH) {
                    this.bindTouchEvents();
                } else {
                    this.bindEvents();
                }
            }
        },
        bindTouchEvents: function() {
            var _this = this;
            //over & out
            fobListItems.click(function(e) {
                e.preventDefault();
                _this.doEnter($(this), onClickCallback);
            });
            //long press for TOUCH DEVICES; double tap work around
            $("div#globalMastheadCategoryMenu > ul > li > a").mouseup(function(e) {
                e.preventDefault();
                clearTimeout(presstimeout);
                return false;
            });
            $("div#globalMastheadCategoryMenu > ul > li > a").mousedown(function(e) {
                e.preventDefault();
                var _this = this;
                presstimeout = window.setTimeout(function() {
                    window.location.href = $(_this).attr("href");
                }, 1000);
                return false;
            });
        },
        onOver: function(cb) {
            onOverCallback = cb;
        },
        onOut: function(cb) {
            onOutCallback = cb;
        },
        onMove: function(cb) {
            onMoveCallback = cb;
        },
        onClick: function(cb) {
            onClickCallback = cb;
        },
        getMouseCoords: function() {
            return mouseCoords;
        },
        doEnter: function(obj, cb) {
            if (typeof cb === "function") {
                var id = Base.getSuffixId(obj.attr("id"));
                var totalFOBs = obj.context.parentNode.childElementCount
                var selectedIndex = obj.index();
                var offset = obj.offset();
                cb(id, totalFOBs, selectedIndex, offset, obj);
            }
        },
        bindEvents: function() {
            var _this = this;
            fobListItems.bind('mouseover', function(e) {
                //_this.trackVerticalMouseDirection(e);
                mouseCoords = {
                    x: e.clientX,
                    y: e.clientY
                };
                onMoveCallback(e);
            });
            //over
            fobListItems.mouseenter(function(e) {
                _this.doEnter($(this), onOverCallback);
            });


            //out
            fobListItems.mouseleave(function(e) {
                var id = $(this).attr("id"),
                    numericID;
                numericID = Base.getSuffixId(id);
                onOutCallback(numericID);
            });
        }
    }
});

define('headerFlyout', ["jquery", "base"], function($, Base) {
    var IS_TOUCH = false,
        DEFAULT_COLUMNS = 4,
        MAX_FLYOUT_COLUMNS = DEFAULT_COLUMNS,
        DEFAULT_FLYOUT_COLUMN_WIDTH = 213,
        FLYOUT_COLUMN_WIDTH = DEFAULT_FLYOUT_COLUMN_WIDTH,
        FLYOUT_LAST_COLUMN_EXTRA_SPACE = 14,
        DEFAULT_FLYOUT_COLUMN_LEFT_PADDING = 12,
        FLYOUT_COLUMN_LEFT_PADDING = DEFAULT_FLYOUT_COLUMN_LEFT_PADDING,
        DEFAULT_FLYOUT_COLUMN_WIDTHS = ['100%', '100%', '47%', '30%', '23.25%', '18%'],
        COLUMN_WIDTHS = DEFAULT_FLYOUT_COLUMN_WIDTHS,
        DEFAULT_FLYOUTS_ENABLED = true,
        USE_FLYOUT = DEFAULT_FLYOUTS_ENABLED,
        readyCallback,
        onOverCallback,
        onOutCallback,
        flyoutAlignment = Base.ALIGN_BOTTOM,
        channelOverride,
        flyoutRequestUrl, /*used for testing only*/
        PROTOCOL = "http://";




    return {
        DEFAULT_FLYOUTS_ENABLED: DEFAULT_FLYOUTS_ENABLED,
        DEFAULT_COLUMNS: DEFAULT_COLUMNS,
        DEFAULT_FLYOUT_COLUMN_LEFT_PADDING: DEFAULT_FLYOUT_COLUMN_LEFT_PADDING,
        DEFAULT_FLYOUT_COLUMN_WIDTH: DEFAULT_FLYOUT_COLUMN_WIDTH,
        getFlyoutRequestUrl: function() {
            return flyoutRequestUrl;
        },
        setMaxFlyoutColumns: function(num) {
            MAX_FLYOUT_COLUMNS = num || DEFAULT_COLUMNS;
        },
        setFlyoutColumnWidth: function(num) {
            FLYOUT_COLUMN_WIDTH = num || DEFAULT_FLYOUT_COLUMN_WIDTH;
        },
        setFlyoutColumnLeftPadding: function(num) {
            FLYOUT_COLUMN_LEFT_PADDING = num || DEFAULT_FLYOUT_COLUMN_LEFT_PADDING;
        },
        setFlyoutColumnWidths: function(arr) {
            FLYOUT_COLUMN_WIDTHS = typeof arr === "object" && typeof arr.length === "number" ? arr : DEFAULT_FLYOUT_COLUMN_WIDTHS;
        },
        enabled: function() {
            return USE_FLYOUT;
        },
        disable: function() {
            USE_FLYOUT = false;
        },
        enable: function() {
            USE_FLYOUT = true;
        },
        getEdgeCoords: function(id, edge) {
            var sel = this.getFlyoutSelectorId(id);
            var obj = $(sel);
            var coords = {
                v1: {},
                v2: {}
            };
            //flyout does not exist
            if (obj.length == 0) return false;
            //flyout is not visible
            if (obj.css("display") == "none") return false;
            if (edge == Base.TOP) {
                coords.vert2 = {
                    x: obj.offset().left,
                    y: obj.offset().top
                };
                coords.vert3 = {
                    x: obj.offset().left + obj.width(),
                    y: obj.offset().top
                };
            }
            return coords;
        },
        closeAll: function() {
            if ($("div.flyout-on").length > 0) {
                $("div.flyout-on").addClass("flyout-off");
                $("div.flyout-on").removeClass("flyout-on");
            }
        },
        close: function(id) {
            var fid = this.getFlyoutSelectorId(id);
            var flyoutObj = $(fid);
            flyoutObj.removeClass("flyout-on");
            flyoutObj.addClass("flyout-off");
        },
        getRightAlignment: function(columns, topNavLeftPosition) {
            if (columns > MAX_FLYOUT_COLUMNS)
                throw new Error("header.getRightAlignment Failed! Columns argument has exceeded MAXIMUM.");

            var w = FLYOUT_COLUMN_WIDTH * columns;
            var p = FLYOUT_COLUMN_LEFT_PADDING * columns;
            var offset = ((MAX_FLYOUT_COLUMNS * FLYOUT_COLUMN_WIDTH) + (MAX_FLYOUT_COLUMNS * FLYOUT_COLUMN_LEFT_PADDING)) - (w + p)
            return topNavLeftPosition + offset;
        },
        /*
        http://mingle/projects/seo/cards/3548
        OLD LOGIC :: DOES NOT SUPPORT VARIABLE NUMBER OF TOPNAV ITEMS

        Placement       Current Category        1 column        2 columns       3-4 columns
        FOB 1           FOR THE HOME            left            left            left
        FOB 2           BED & BATH              with FOB        with FOB        left
        FOB 3           WOMEN                   with FOB        with FOB        left
        FOB 4           MEN                     with FOB        with FOB        left
        FOB 5           JUNIORS                 with FOB        with FOB        left
        FOB 6           KIDS                    with FOB        with FOB        left
        FOB 7           BEAUTY                  with FOB        with FOB        right
        FOB 8           SHOES                   with FOB        right           right
        FOB 9           HANDBAGS & ACCESSORIES  with FOB        right           right
        FOB 10          JEWELRY & WATCHES       right           right           right
        FOB 11          SALE                    right           right           right

        selectedIndex is zero based index


        NEW :: UPDATED 4 JUNE 2013

        The follow variables are required to calculate flyout left position;
        Flyout megamenu will be positioned based on topnav items index
        LOGIC

        * left of center FOB items selected *
            if FOB_SELECTED_ITEM_INDEX < (FOB_TOTAL_ITEMS/2)

                if FOB_SELECTED_ITEM_LEFT > FLYOUT_MIDPOINT
                    FLYOUT_LEFT = (TOPNAV_WIDTH - FLYOUT_WIDTH) * (FOB_SELECTED_ITEM_INDEX/TOTAL_FOB_ITEMS)
                else
                    FLYOUT_LEFT = TOPNAV_LEFT

        * right of center FOB items selected *
            else
                if (FOB_SELECTED_ITEM_LEFT + FOB_SELECTED_ITEM_WIDTH) - TOPNAV_WIDTH) < (FLYOUT_LEFT + FLYOUT_MIDPOINT)
                    FLYOUT_LEFT =

        TOPNAV_WIDTH
        FOB_LEFT
        FLYOUT_LEFT
        FLYOUT_WIDTH

        //ulOffset = $("div#globalMastheadCategoryMenu ul").offset()

        //align left
        //if selectedIndex == 0 || (selectedFOBWidth/2 + ulOffset) < (FlyoutWidth/2 + ulOffset)



        //align right
        //else if selectedIndex == totalFOB-1 || (selectedFOBWidth/2) > (flyoutWidth/2)+ + ((ulWitdh-flyoutWIdth)+ulOffsetLeft)


        //else
        //center align


        */
        //(flyout.width(),selectedIndex,fobOffset)
        getLeftPosition: function(flyoutWidth, selectedIndex, fobOffsetLeft, totalFOBs, fobWidth) {
            var ulOffsetLeft = $("#globalMastheadCategoryMenu > ul").offset().left;
            var ulWidth = $("#globalMastheadCategoryMenu > ul").width();
            var fobMid = fobWidth / 2;
            var flyoutMid = flyoutWidth / 2;


            //align left
            if ((fobMid + fobOffsetLeft) < (flyoutMid + ulOffsetLeft)) {
                return ulOffsetLeft;
            }
            //align right
            else if ((fobMid + fobOffsetLeft) > (ulOffsetLeft + (ulWidth - flyoutWidth) + flyoutMid)) {
                return ulOffsetLeft + (ulWidth - flyoutWidth);
            }
            //center over FOB midpoint
            else {
                return fobOffsetLeft - (flyoutMid - fobMid);
            }
        },
        init: function(categoryIDs, alignment, override) {
            flyoutAlignment = alignment || Base.ALIGN_BOTTOM;
            channelOverride = override || false;
            IS_TOUCH = Base.isTouch() || false;
            if ((!Base.isNavApp() && USE_FLYOUT) || Base.isThirdParty()) {
                this.fetchFlyouts(categoryIDs || []);
            } else {
                readyCallback(true);
            }
            return true;
        },
        bind: function() {
            if (!IS_TOUCH) {
                this.bindEvents();
            }
            //touch will toggle flyout with clicks, do not bind mouse events
        },
        bindEvents: function() {
            var _this = this;
            $("div.subnav").mouseenter(function(e) {
                onOverCallback($(this));
            });

            $("div.subnav").mouseleave(function(e) {
                var obj = $(this),
                    id = Base.getSuffixId(obj.attr("id")); //numeric portion only flyout_XXXX
                onOutCallback(id);
            });
        },
        hideExtraColumns: function(flyout) {
            flyout.find("div div").each(function(index) {
                if (index >= MAX_FLYOUT_COLUMNS) {
                    $(this).css("display", "none");
                }
            });
        },
        adjustFlyoutWidth: function(flyout, columns) {
            var width = columns * FLYOUT_COLUMN_WIDTH; //column width per spec
            var padding = columns * FLYOUT_COLUMN_LEFT_PADDING; //column left padding per spec
            var w = (width + padding + FLYOUT_LAST_COLUMN_EXTRA_SPACE) + "px";


            flyout.css("width", w);
            flyout.find("div div").css("width", COLUMN_WIDTHS[columns]);

            var lastColumn = flyout.find("div div:last-child");
            if (lastColumn.has("img").length > 0) {
                lastColumn.css("background", "none").css("padding-left", "0px").css("width", (FLYOUT_COLUMN_WIDTH + FLYOUT_COLUMN_LEFT_PADDING + FLYOUT_LAST_COLUMN_EXTRA_SPACE) + "px");
            } else {
                lastColumn.css("width", (FLYOUT_COLUMN_WIDTH + FLYOUT_LAST_COLUMN_EXTRA_SPACE) + "px");
            }
            return true;
        },
        //flyoutObj, totalFOBs, selectedIndex, offset, cols, fobWidth
        adjustFlyoutPosition: function(flyout, totalFOBs, selectedIndex, fobOffset, columns, fobWidth) {
            if (flyoutAlignment === Base.ALIGN_BOTTOM) {
                var left = this.getLeftPosition(flyout.width(), selectedIndex, fobOffset.left, totalFOBs, fobWidth); //this.getLeftPosition(totalFOBs,selectedIndex,fobOffset.left,columns);
                flyout.css("left", left + "px");
            }
            //add other alignments here if NEEDED ...RIGHT, LEFT, TOP
        },
        fetchFlyouts: function(categoryIDs) {
            var i = 0,
                tmpStr = "",
                tmp;
            if (categoryIDs == undefined || categoryIDs.length == 0)
                throw new Error("HeaderFlyout.fetchFlyouts(ids) failed! ids are empty.");
            if (typeof categoryIDs.push == "undefined")
                throw new Error("HeaderFlyout.fetchFlyouts(ids) failed! ids must be an array.");
            var _this = this,
                base = Base.isThirdParty() ? (location.href.indexOf("https") > -1) ? "https://www.macys.com" : "https://www.macys.com" : "";

            flyoutRequestUrl = base + "/shop/flyout?application=" + (channelOverride || Base.getCurrentChannel());


            for (i = 0; i < categoryIDs.length; i++) {
                tmp = categoryIDs[i];
                if (typeof tmp != "number") {
                    if (tmp.match(/[^[0-9]/).length > 0)
                        throw new Error("HeaderFlyout.fetchFlyouts(ids) failed! id in ids is not valid id: " + tmp);
                    else
                        tmpStr += tmp;
                } else {
                    tmpStr += tmp;
                    if (i < categoryIDs.length - 1)
                        tmpStr += ",";
                }
            }
            flyoutRequestUrl += "&categoryIds=" + tmpStr;


            //var url = "https://realtime-shopping.herokuapp.com/jsonp-test";

            $.ajax({
                url: flyoutRequestUrl,
                type: 'GET',
                crossDomain: true,
                dataType: 'jsonp',
                jsonpCallback: 'flyoutCallback',
                cache: true,
                timeout: 2000,
                success: function(data, textStatus, xhr) {
                    var contents = Base.isThirdParty() ? Base.absoluteLinkatize(data.html, "https://www.macys.com") : data.html;
                    _this.flyoutsLoadedSuccess(contents, textStatus, xhr);
                },
                error: function(xhr, textStatus, errorThrown) {
                    _this.flyoutsLoadedError(xhr, textStatus, errorThrown);
                }
            });
            return true;
        },
        flyoutsLoadedSuccess: function(data, textStatus, xhr) {
            var topnav = $("#globalMastheadCategoryMenu"),
                _this = this;


            if (!~data.indexOf("Flyout_")) {
                readyCallback(false);
            } else {
                $("body").append("<div id='globalMastheadFlyout'></div>");
                setTimeout(function() {
                    $("div#globalMastheadFlyout").html(data);
                    readyCallback(true);
                }, 50);
            }
        },
        flyoutsLoadedError: function(xhr, textStatus, errorThrown) {
            readyCallback(false);
        },
        getFlyoutSelectorId: function(numericID) {
            if (typeof numericID != "number" || !numericID)
                throw new Error("header.getFlyoutSelectorId() failed! Required number is invalid or missing.");

            return "div#globalMastheadFlyout > div#Flyout_" + numericID;
        },
        open: function(id, totalFOBs, selectedIndex, offset, fobWidth) {
            var fid = this.getFlyoutSelectorId(id);
            var flyoutObj = $(fid);
            var cols = flyoutObj.find("div div").length;
            if (cols > MAX_FLYOUT_COLUMNS) {
                cols = MAX_FLYOUT_COLUMNS;
                this.hideExtraColumns(flyoutObj);
            }

            this.adjustFlyoutWidth(flyoutObj, cols);

            this.adjustFlyoutPosition(flyoutObj, totalFOBs, selectedIndex, offset, cols, fobWidth);


            flyoutObj.removeClass("flyout-off");
            flyoutObj.addClass("flyout-on");
        },
        onReady: function(callback) {
            readyCallback = callback;
        },
        onOver: function(callback) {
            onOverCallback = callback;
        },
        onOut: function(callback) {
            onOutCallback = callback;
        },

        replaceCoreMetrics: function() {
            $("div#globalMastheadCategoryMenu>ul>li").each(function(index) {
                var category_name = $(this).text();
                category_name = $.trim(category_name);
                category_name = category_name.replace(/ - /g, "-");
                category_name = category_name.replace(/ /g, "-");
                category_name = category_name.toLowerCase();
                category_name = category_name.replace(/'/g, "%27");
                category_name = encodeURIComponent(category_name);

                $("div#Flyout_" + Base.getSuffixId($(this).attr("id"))).find("a").each(
                    function(index) {
                        $(this).attr("href", $(this).attr("href").replace("FYtrackingBreadcrumb", category_name));
                    }
                );
            });
        }
    }
});

define('hostConfig', ["jquery", "base"], function($, Base) {
    if (!Base.isThirdParty()) {
        var HostConfig = {};
        HostConfig.cookieDomainInputFieldName = 'macysCookieDomain';
        HostConfig.cookieDomain = document.getElementById(HostConfig.cookieDomainInputFieldName).value;
        HostConfig.baseHost = document.getElementById("MACYS_baseHostName").value;
        HostConfig.secureHost = document.getElementById("MACYS_secureHostName").value;
        HostConfig.assetsHost = document.getElementById("MACYS_assetsHostName").value;
        HostConfig.imageHost = document.getElementById("MACYS_imageHostName").value;

        //google
        HostConfig.googleAccessKey = "AIzaSyAzXauC8RAX_qxgaP_qC9rPQye5HQHy8fc";
        HostConfig.googleGeolocation = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + HostConfig.googleAccessKey;

        return HostConfig;
    } else {
        return {};
    }


});

define('cookie', ['hostConfig'], function(hostConfig) {
    //### Description
    //Cookie utility class for managing cookies
    //consolidate/cleanup cookie functionality
    //https://www.macys.com/javascript/cookieJar.js and
    //https://www.macys.com/web20/assets/script/macys/util/cookie-min.js
    //and https://www.macys.com/web20/assets/script/yahoo/cookie/cookie-beta-min.js
    //and https://www.macys.com/web20/assets/script/macys/base/cmFunctions.js
    //cookie and store up to 4K
    //Group cookies; decrease time to access groups in cookie
    //macys.com cookie reference on confluence
    //http://confluence/display/WDS/current+macys+cookies

    //###constants
    //description of cookie constants to follow
    //example
    var MVC_SEPARATOR = "3_87_",
        MVC_EQUATOR = "1_92_",
        MVC_EMPTY_STRING = "4_02_",

        //###properties
        //description of cookie properties to follow
        path = "/",
        expires = null,
        domain = null,
        secure = false,
        Cookie = {};

    // we want to decode the data in the cookie
    // but we want to call this only once
    // this is for browsers that do not have decodeURIComponent
    if (typeof decodeURIComponent === "undefined") {
        decodeURIComponent = (typeof decodeURI === "undefined") ? unescape : decodeURI;
    }

    // we want to encode the data in the cookie
    // but we want to call this only once
    // this is for browsers that do not have encodeURLComponent
    if (typeof encodeURIComponent === "undefined") {
        encodeURIComponent = (typeof encodeURI === "undefined") ? escape : encodeURI;
    }

    //deprecate; pass in as option in Cookie.set
    Cookie.setExpires = function(str) {
        expires = str;
    };

    //###Cookie.parse([cookieString])
    //[optional] cookieString
    //description to follow
    // taken in part from YUI 3.4.1 _parseCookieString
    //addtion parse documentation goes here
    Cookie.parse = function(cookieString) {
        var j, cookies, clen, rmap = {},
            dc, cparts, cname, cvalue;

        // where we get the cookies
        dc = cookieString || document.cookie;
        cookies = dc.split(/;\s/g);
        clen = cookies.length;
        // put all cookies in an object
        for (j = 0; j < clen; j += 1) {
            cparts = cookies[j].match(/([^=]+)=/i);
            if (cparts instanceof Array) {
                cname = decodeURIComponent(cparts[1]);
                cvalue = decodeURIComponent(cookies[j].substring(cparts[1].length + 1));
            } else {
                cname = decodeURIComponent(cookies[j]);
                cvalue = "";
            }
            rmap[cname.replace(/ /g, '')] = cvalue;
        }
        return rmap;
    };

    //###Cookie.get(name, [multiValueCookie])
    //name the name of the cookie to get
    //[optional] multiValueCookie
    Cookie.get = function(name, multiValueCookie) {
        var result = null,
            hash, mvc_parts, plen, j, items;
        hash = this.parse();
        if (!hash || hash.length < 1) {
            // no cookies
            result = false;
        } else if (typeof multiValueCookie === "undefined") {
            // return cookies at the hash value or false
            result = hash[name] || false;
        } else if (hash[multiValueCookie] == undefined) {
            return false;
        } else {
            mvc_parts = hash[multiValueCookie].split(MVC_SEPARATOR);
            plen = mvc_parts.length;
            for (j = 0; j < plen; j++) {
                items = mvc_parts[j].split(MVC_EQUATOR);
                if (items[0] === name) {
                    result = (items[1] === MVC_EMPTY_STRING) ? "" : items[1];
                    break;
                }
            }
            result = (result) ? result : false;
        }
        return result;
    };

    var buildMVCValue = function(multiValueCookie, name, value) {
        var mvc_value, sub_cookie, mvc_subs, j,
            resultValue, slen, pairs;
        // get the whole multi value cookie
        mvc_value = Cookie.get(multiValueCookie);
        sub_cookie = name + MVC_EQUATOR + ((value == "") ? MVC_SEPARATOR : value);
        if (!mvc_value || mvc_value == null) {
            // no cookie with the multiValueCookie name
            resultValue = sub_cookie;
        } else if (mvc_value.indexOf(name) == -1) {
            // multiValueCookie exists but the name value pair we want does not
            resultValue = mvc_value + MVC_SEPARATOR + sub_cookie;
        } else {
            // multiValueCookie exists and there is a sub cookie with that name
            mvc_subs = mvc_value.split(MVC_SEPARATOR);
            new_value = "";
            slen = mvc_subs.length;
            for (j = 0; j < slen; j++) {
                pairs = mvc_subs[j].split(MVC_EQUATOR);
                if (pairs[0] == name) {
                    mvc_subs[j] = name + MVC_EQUATOR + value;
                }
            }
            resultValue = mvc_subs.join(MVC_SEPARATOR);
        }
        return resultValue;
    };

    //from rddp.js using
    //deprecate, use option as parameter in set
    Cookie.setDomain = function(host) {
        var urlArray;
        if (typeof host === 'string') {
            urlArray = host.split('.');
            domain = '';
            for (var i = 0; i < urlArray.length; i++) {
                if (urlArray[i] != "www" && urlArray[i] != "www1") {
                    domain += ("." + urlArray[i]);
                }
            }
        } else {
            if (typeof domain === 'undefined' || domain === null) {
                domain = (typeof hostConfig !== "undefined") ? hostConfig.cookieDomain : undefined;
            }
            if (typeof domain === 'undefined' || domain === null) {
                domainInput = document.getElementById(hostConfig.cookieDomainInputFieldName);
                if (domainInput) {
                    domain = domainInput.value;
                }
            }
        }
        //remove port for local testing
        domain = (domain && domain.indexOf(":") !== -1) ? domain.substring(domain.indexOf(":") + 1) : domain;
    };


    //###Cookie.set(name, value, [multiValueCookie])
    //[optional] multiValueCookie
    //description to follow
    //TODO add options
    //- expire
    //- domain
    //- secure
    //- path
    Cookie.set = function(name, value, multiValueCookie, dom) {
        var domainInput, self, data, encodeValue, setName = name;

        value = typeof value == "boolean" ? value.toString() : value;
        if (value == undefined) {
            if (!multiValueCookie) {
                return false;
            }
        }

        Cookie.setDomain(dom);
        encodeValue = value;
        if (multiValueCookie) {
            setName = multiValueCookie;
            encodeValue = buildMVCValue(multiValueCookie, name, value);
        }

        data = encodeURIComponent(setName) + "=" + encodeURIComponent(encodeValue);
        if (expires) {
            data += "; expires=" + expires;
        }
        data += "; path=" + path;
        if (domain) {
            data += "; domain=" + domain;
        }
        if (secure) {
            data += ";secure=" + secure;
        }
        document.cookie = data;
        return true;
    };

    //###Cookie.remove(name, [multiValueCookie])
    //name the name of the cookie to remove
    //[optional] multiValueCookie
    Cookie.remove = function(name, multiValueCookie) {
        var mvc_value, mvc_subs, new_value, j, self, mvc_parts, mvc_remove = "";
        if (multiValueCookie) {
            mvc_value = this.get(multiValueCookie);
            if (mvc_value && mvc_value.indexOf(name) !== -1) {
                mvc_subs = mvc_value.split(MVC_SEPARATOR);
                new_value = "";
                for (j = 0; j < mvc_subs.length; j++) {
                    mvc_parts = mvc_subs[j].split(MVC_EQUATOR);
                    if (mvc_parts[0] !== name) {
                        if (new_value !== "") {
                            new_value += MVC_SEPARATOR;
                        }
                        new_value += mvc_subs[j];
                    }
                }
                this.set(multiValueCookie, new_value);
            }
        } else {
            // set expires to yesterday
            expires = new Date(new Date().getTime() - 86400000);
            Cookie.set(name, "");
            expires = null;
        }
    };
    return Cookie;
});

//client side testing framework
//example usage

define('trafficSplitter', ["jquery", "cookie"], function($, Cookie) {
    var DEFAULT_SPLIT_DATA_URL = 'http://netstorage.macys.com/netstorage/ABTesting/@CAMPAIGN@.json',
        HTTPS_SPLIT_DATA_URL = 'https://secure-netstorage.macys.com/netstorage/ABTesting/@CAMPAIGN@.json',
        SPLIT_DATA_URL = "",
        MISCGCS = "MISCGCs",
        EXP = "_exp";

    //initCB add global function to handle hard-coded 'initCB' in jsonp response
    //static callback function defined in trafficSplitter json configuration file on netstorage
    var initCB = function() {
        window.splitCB = function(json) {
            return json;
        };
    };

    //getTestValue uses native javascript randomization to 'pick' value from array
    //some simple validations happen here, weights must add up to 1
    //arr can not be larger than 100
    //arr: [value:'foo',weight:.5},{value:'bar',weight:.5}]
    //return weighted value

    var getTestValue = function(arr) {
        var v = 0,
            i = 0;
        for (i = 0; i < arr.length; i++) {
            v += arr[i].weight;
        }
        if (arr.length > 100) {
            throw new Error("MacysTester.getTestValue(arr) is invalid. arr length can not be greater than 100.");
        }
        if (v != 1) {
            throw new Error("MacysTester.getTestValue(arr) is invalid. arr element weights must equal 1");
        } else {
            if (arr.length == 1) {
                return arr[0].value;
            } else {
                var key = Math.round(Math.random() * 99);
                var flattened = this.flatten(arr);
                return flattened[key];
            }
        }
    };
    var flatten = function(arr) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            var num = arr[i].weight * 100;
            while (num > 0) {
                newArr.push(arr[i].value);
                num--;
            }
        }
        return newArr;
    };


    var getSplitData = function(campaignName, callback, timeout) {
        this.initCB();
        if (!campaignName || !callback) {
            throw new Error("TrafficSplitter.getSplitData failure. Invalid inputs.");
        }
        var to = timeout || 1000,
            _this = this;
        var u = this.getSplitDataUrl(campaignName);
        $.ajax({
            url: u,
            type: 'GET',
            dataType: 'jsonp',
            timeout: to,
            jsonp: false,
            jsonpCallback: "splitCB",
            success: function(json) {
                callback(true, json);
            },
            error: function(x, t, m) {
                callback(false, {
                    error: t + ",message:" + m.message + " loading: " + u
                });
            }
        });
    };

    var getSplitDataUrl = function(campaignName, testURL) {
        if (!campaignName) {
            throw new Error("TrafficSplitter.getSplitDataUrl failure, invalid or missing 'campaignName'.");
        }
        var url = testURL || window.location.href;
        return url.indexOf("https") > -1 ? HTTPS_SPLIT_DATA_URL.replace("@CAMPAIGN@", campaignName) : DEFAULT_SPLIT_DATA_URL.replace("@CAMPAIGN@", campaignName);
    };
    //inputs
    //cookieName:String
    //expirationDate:object (Date object)
    //json:object traffic splitter config json response
    var applyABTestLogic = function(cookieName, expirationDate, json, defaultValue) {
        if (!cookieName || !expirationDate || !json || (typeof expirationDate != "object") || defaultValue === undefined) {
            throw new Error("TrafficSplitter.applyABTestLogic failure. Invalid inputs. applyABTestLogic(cookieName, expirationDate, json, defaultValue)");
        }
        var today = new Date(),
            exp = new Date(),
            gcExpDateStr = Cookie.get(cookieName + EXP, MISCGCS),
            cookieValue = Cookie.get(cookieName, MISCGCS),
            value = "";


        if (today > expirationDate) {
            //clean up group cookie
            Cookie.remove(cookieName, MISCGCS); //key/value
            Cookie.remove(cookieName + EXP, MISCGCS); //expiration date
            return defaultValue;
        }

        //clone our date object w/o help of jquery
        //extend MISCGCs expiration date by 1 month
        //to prevent group cookie expiring before campaign expiration date
        exp.setMonth(expirationDate.getMonth() + 1);
        exp.setFullYear(expirationDate.getFullYear());
        exp.setDate(expirationDate.getDate());

        //no campaign cookie set
        if (!cookieValue) {
            value = this.getTestValue(json) || defaultValue;

            //push out group cookie expiration to match this, so it does not expire bofore
            Cookie.setExpires(exp.toUTCString());
            Cookie.set(cookieName, value, MISCGCS); //key/value
            Cookie.set(cookieName + EXP, expirationDate.toUTCString(), MISCGCS); //expiration date
        } else {
            //we're supporting the ability to extend campaign
            var gcExpDate = new Date(gcExpDateStr);
            if (expirationDate > gcExpDate) {
                Cookie.set(cookieName + EXP, expirationDate.toUTCString(), MISCGCS);
            }
            value = cookieValue;

        }

        return value;
    };

    return {
        initCB: initCB,
        getTestValue: getTestValue,
        flatten: flatten,
        getSplitData: getSplitData,
        getSplitDataUrl: getSplitDataUrl,
        applyABTestLogic: applyABTestLogic
    };
});

/*
 * Copyright 2013 Small Batch, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
;
(function(window, document, undefined) {
    var j = void 0,
        k = !0,
        l = null,
        p = !1;

    function q(a) {
        return function() {
            return this[a]
        }
    }
    var aa = this;

    function ba(a, b) {
        var c = a.split("."),
            d = aa;
        !(c[0] in d) && d.execScript && d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());) !c.length && b !== j ? d[e] = b : d = d[e] ? d[e] : d[e] = {}
    }
    aa.Ba = k;

    function ca(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }

    function da(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }

    function s(a, b, c) {
        s = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ca : da;
        return s.apply(l, arguments)
    }
    var ea = Date.now || function() {
        return +new Date
    };

    function fa(a, b) {
        this.G = a;
        this.u = b || a;
        this.z = this.u.document;
        this.R = j
    }
    fa.prototype.createElement = function(a, b, c) {
        a = this.z.createElement(a);
        if (b)
            for (var d in b)
                if (b.hasOwnProperty(d))
                    if ("style" == d) {
                        var e = a,
                            f = b[d];
                        ga(this) ? e.setAttribute("style", f) : e.style.cssText = f
                    } else a.setAttribute(d, b[d]);
        c && a.appendChild(this.z.createTextNode(c));
        return a
    };

    function t(a, b, c) {
        a = a.z.getElementsByTagName(b)[0];
        a || (a = document.documentElement);
        a && a.lastChild && a.insertBefore(c, a.lastChild)
    }

    function u(a, b) {
        return a.createElement("link", {
            rel: "stylesheet",
            href: b
        })
    }

    function ha(a, b) {
        return a.createElement("script", {
            src: b
        })
    }

    function v(a, b) {
        for (var c = a.className.split(/\s+/), d = 0, e = c.length; d < e; d++)
            if (c[d] == b) return;
        c.push(b);
        a.className = c.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "")
    }

    function w(a, b) {
        for (var c = a.className.split(/\s+/), d = [], e = 0, f = c.length; e < f; e++) c[e] != b && d.push(c[e]);
        a.className = d.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "")
    }

    function ia(a, b) {
        for (var c = a.className.split(/\s+/), d = 0, e = c.length; d < e; d++)
            if (c[d] == b) return k;
        return p
    }

    function ga(a) {
        if (a.R === j) {
            var b = a.z.createElement("p");
            b.innerHTML = '<a style="top:1px;">w</a>';
            a.R = /top/.test(b.getElementsByTagName("a")[0].getAttribute("style"))
        }
        return a.R
    }

    function x(a) {
        var b = a.u.location.protocol;
        "about:" == b && (b = a.G.location.protocol);
        return "https:" == b ? "https:" : "http:"
    };

    function y(a, b, c) {
        this.w = a;
        this.T = b;
        this.Aa = c
    }
    ba("webfont.BrowserInfo", y);
    y.prototype.qa = q("w");
    y.prototype.hasWebFontSupport = y.prototype.qa;
    y.prototype.ra = q("T");
    y.prototype.hasWebKitFallbackBug = y.prototype.ra;
    y.prototype.sa = q("Aa");
    y.prototype.hasWebKitMetricsBug = y.prototype.sa;

    function z(a, b, c, d) {
        this.e = a != l ? a : l;
        this.o = b != l ? b : l;
        this.ba = c != l ? c : l;
        this.f = d != l ? d : l
    }
    var ja = /^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/;
    z.prototype.toString = function() {
        return [this.e, this.o || "", this.ba || "", this.f || ""].join("")
    };

    function A(a) {
        a = ja.exec(a);
        var b = l,
            c = l,
            d = l,
            e = l;
        a && (a[1] !== l && a[1] && (b = parseInt(a[1], 10)), a[2] !== l && a[2] && (c = parseInt(a[2], 10)), a[3] !== l && a[3] && (d = parseInt(a[3], 10)), a[4] !== l && a[4] && (e = /^[0-9]+$/.test(a[4]) ? parseInt(a[4], 10) : a[4]));
        return new z(b, c, d, e)
    };

    function B(a, b, c, d, e, f, g, h, n, m, r) {
        this.J = a;
        this.Ha = b;
        this.za = c;
        this.ga = d;
        this.Fa = e;
        this.fa = f;
        this.xa = g;
        this.Ga = h;
        this.wa = n;
        this.ea = m;
        this.k = r
    }
    ba("webfont.UserAgent", B);
    B.prototype.getName = q("J");
    B.prototype.getName = B.prototype.getName;
    B.prototype.pa = q("za");
    B.prototype.getVersion = B.prototype.pa;
    B.prototype.la = q("ga");
    B.prototype.getEngine = B.prototype.la;
    B.prototype.ma = q("fa");
    B.prototype.getEngineVersion = B.prototype.ma;
    B.prototype.na = q("xa");
    B.prototype.getPlatform = B.prototype.na;
    B.prototype.oa = q("wa");
    B.prototype.getPlatformVersion = B.prototype.oa;
    B.prototype.ka = q("ea");
    B.prototype.getDocumentMode = B.prototype.ka;
    B.prototype.ja = q("k");
    B.prototype.getBrowserInfo = B.prototype.ja;

    function C(a, b) {
        this.a = a;
        this.H = b
    }
    var ka = new B("Unknown", new z, "Unknown", "Unknown", new z, "Unknown", "Unknown", new z, "Unknown", j, new y(p, p, p));
    C.prototype.parse = function() {
        var a;
        if (-1 != this.a.indexOf("MSIE")) {
            a = D(this);
            var b = E(this),
                c = A(b),
                d = F(this.a, /MSIE ([\d\w\.]+)/, 1),
                e = A(d);
            a = new B("MSIE", e, d, "MSIE", e, d, a, c, b, G(this.H), new y("Windows" == a && 6 <= e.e || "Windows Phone" == a && 8 <= c.e, p, p))
        } else if (-1 != this.a.indexOf("Opera")) a: {
                a = "Unknown";
                var b = F(this.a, /Presto\/([\d\w\.]+)/, 1),
                    c = A(b),
                    d = E(this),
                    e = A(d),
                    f = G(this.H);
                c.e !== l ? a = "Presto" : (-1 != this.a.indexOf("Gecko") && (a = "Gecko"), b = F(this.a, /rv:([^\)]+)/, 1), c = A(b));
                if (-1 != this.a.indexOf("Opera Mini/")) {
                    var g =
                        F(this.a, /Opera Mini\/([\d\.]+)/, 1),
                        h = A(g);
                    a = new B("OperaMini", h, g, a, c, b, D(this), e, d, f, new y(p, p, p))
                } else {
                    if (-1 != this.a.indexOf("Version/") && (g = F(this.a, /Version\/([\d\.]+)/, 1), h = A(g), h.e !== l)) {
                        a = new B("Opera", h, g, a, c, b, D(this), e, d, f, new y(10 <= h.e, p, p));
                        break a
                    }
                    g = F(this.a, /Opera[\/ ]([\d\.]+)/, 1);
                    h = A(g);
                    a = h.e !== l ? new B("Opera", h, g, a, c, b, D(this), e, d, f, new y(10 <= h.e, p, p)) : new B("Opera", new z, "Unknown", a, c, b, D(this), e, d, f, new y(p, p, p))
                }
            } else if (/AppleWeb(K|k)it/.test(this.a)) {
                a = D(this);
                var b = E(this),
                    c = A(b),
                    d = F(this.a, /AppleWeb(?:K|k)it\/([\d\.\+]+)/, 1),
                    e = A(d),
                    f = "Unknown",
                    g = new z,
                    h = "Unknown",
                    n = p; - 1 != this.a.indexOf("Chrome") || -1 != this.a.indexOf("CrMo") || -1 != this.a.indexOf("CriOS") ? f = "Chrome" : /Silk\/\d/.test(this.a) ? f = "Silk" : "BlackBerry" == a || "Android" == a ? f = "BuiltinBrowser" : -1 != this.a.indexOf("Safari") ? f = "Safari" : -1 != this.a.indexOf("AdobeAIR") && (f = "AdobeAIR");
                "BuiltinBrowser" == f ? h = "Unknown" : "Silk" == f ? h = F(this.a, /Silk\/([\d\._]+)/, 1) : "Chrome" == f ? h = F(this.a, /(Chrome|CrMo|CriOS)\/([\d\.]+)/, 2) : -1 !=
                    this.a.indexOf("Version/") ? h = F(this.a, /Version\/([\d\.\w]+)/, 1) : "AdobeAIR" == f && (h = F(this.a, /AdobeAIR\/([\d\.]+)/, 1));
                g = A(h);
                n = "AdobeAIR" == f ? 2 < g.e || 2 == g.e && 5 <= g.o : "BlackBerry" == a ? 10 <= c.e : "Android" == a ? 2 < c.e || 2 == c.e && 1 < c.o : 526 <= e.e || 525 <= e.e && 13 <= e.o;
                a = new B(f, g, h, "AppleWebKit", e, d, a, c, b, G(this.H), new y(n, 536 > e.e || 536 == e.e && 11 > e.o, "iPhone" == a || "iPad" == a || "iPod" == a || "Macintosh" == a))
            } else -1 != this.a.indexOf("Gecko") ? (a = "Unknown", b = new z, c = "Unknown", d = E(this), e = A(d), f = p, -1 != this.a.indexOf("Firefox") ? (a =
                "Firefox", c = F(this.a, /Firefox\/([\d\w\.]+)/, 1), b = A(c), f = 3 <= b.e && 5 <= b.o) : -1 != this.a.indexOf("Mozilla") && (a = "Mozilla"), g = F(this.a, /rv:([^\)]+)/, 1), h = A(g), f || (f = 1 < h.e || 1 == h.e && 9 < h.o || 1 == h.e && 9 == h.o && 2 <= h.ba || g.match(/1\.9\.1b[123]/) != l || g.match(/1\.9\.1\.[\d\.]+/) != l), a = new B(a, b, c, "Gecko", h, g, D(this), e, d, G(this.H), new y(f, p, p))) : a = ka;
        return a
    };

    function D(a) {
        var b = F(a.a, /(iPod|iPad|iPhone|Android|Windows Phone|BB\d{2}|BlackBerry)/, 1);
        if ("" != b) return /BB\d{2}/.test(b) && (b = "BlackBerry"), b;
        a = F(a.a, /(Linux|Mac_PowerPC|Macintosh|Windows|CrOS)/, 1);
        return "" != a ? ("Mac_PowerPC" == a && (a = "Macintosh"), a) : "Unknown"
    }

    function E(a) {
        var b = F(a.a, /(OS X|Windows NT|Android) ([^;)]+)/, 2);
        if (b || (b = F(a.a, /Windows Phone( OS)? ([^;)]+)/, 2)) || (b = F(a.a, /(iPhone )?OS ([\d_]+)/, 2))) return b;
        if (b = F(a.a, /(?:Linux|CrOS) ([^;)]+)/, 1))
            for (var b = b.split(/\s/), c = 0; c < b.length; c += 1)
                if (/^[\d\._]+$/.test(b[c])) return b[c];
        return (a = F(a.a, /(BB\d{2}|BlackBerry).*?Version\/([^\s]*)/, 2)) ? a : "Unknown"
    }

    function F(a, b, c) {
        return (a = a.match(b)) && a[c] ? a[c] : ""
    }

    function G(a) {
        if (a.documentMode) return a.documentMode
    };

    function la(a) {
        this.va = a || "-"
    }
    la.prototype.f = function(a) {
        for (var b = [], c = 0; c < arguments.length; c++) b.push(arguments[c].replace(/[\W_]+/g, "").toLowerCase());
        return b.join(this.va)
    };

    function H(a, b) {
        this.J = a;
        this.U = 4;
        this.K = "n";
        var c = (b || "n4").match(/^([nio])([1-9])$/i);
        c && (this.K = c[1], this.U = parseInt(c[2], 10))
    }
    H.prototype.getName = q("J");

    function I(a) {
        return a.K + a.U
    }

    function ma(a) {
        var b = 4,
            c = "n",
            d = l;
        a && ((d = a.match(/(normal|oblique|italic)/i)) && d[1] && (c = d[1].substr(0, 1).toLowerCase()), (d = a.match(/([1-9]00|normal|bold)/i)) && d[1] && (/bold/i.test(d[1]) ? b = 7 : /[1-9]00/.test(d[1]) && (b = parseInt(d[1].substr(0, 1), 10))));
        return c + b
    };

    function na(a, b, c) {
        this.c = a;
        this.h = b;
        this.M = c;
        this.j = "wf";
        this.g = new la("-")
    }

    function pa(a) {
        v(a.h, a.g.f(a.j, "loading"));
        J(a, "loading")
    }

    function K(a) {
        w(a.h, a.g.f(a.j, "loading"));
        ia(a.h, a.g.f(a.j, "active")) || v(a.h, a.g.f(a.j, "inactive"));
        J(a, "inactive")
    }

    function J(a, b, c) {
        if (a.M[b])
            if (c) a.M[b](c.getName(), I(c));
            else a.M[b]()
    };

    function L(a, b) {
        this.c = a;
        this.C = b;
        this.s = this.c.createElement("span", {
            "aria-hidden": "true"
        }, this.C)
    }

    function M(a, b) {
        var c = a.s,
            d;
        d = [];
        for (var e = b.J.split(/,\s*/), f = 0; f < e.length; f++) {
            var g = e[f].replace(/['"]/g, ""); - 1 == g.indexOf(" ") ? d.push(g) : d.push("'" + g + "'")
        }
        d = d.join(",");
        e = "normal";
        f = b.U + "00";
        "o" === b.K ? e = "oblique" : "i" === b.K && (e = "italic");
        d = "position:absolute;top:-999px;left:-999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + d + ";" + ("font-style:" + e + ";font-weight:" + f + ";");
        ga(a.c) ? c.setAttribute("style", d) : c.style.cssText =
            d
    }

    function N(a) {
        t(a.c, "body", a.s)
    }
    L.prototype.remove = function() {
        var a = this.s;
        a.parentNode && a.parentNode.removeChild(a)
    };

    function qa(a, b, c, d, e, f, g, h) {
        this.V = a;
        this.ta = b;
        this.c = c;
        this.q = d;
        this.C = h || "BESbswy";
        this.k = e;
        this.F = {};
        this.S = f || 5E3;
        this.Z = g || l;
        this.B = this.A = l;
        a = new L(this.c, this.C);
        N(a);
        for (var n in O) O.hasOwnProperty(n) && (M(a, new H(O[n], I(this.q))), this.F[O[n]] = a.s.offsetWidth);
        a.remove()
    }
    var O = {
        Ea: "serif",
        Da: "sans-serif",
        Ca: "monospace"
    };
    qa.prototype.start = function() {
        this.A = new L(this.c, this.C);
        N(this.A);
        this.B = new L(this.c, this.C);
        N(this.B);
        this.ya = ea();
        M(this.A, new H(this.q.getName() + ",serif", I(this.q)));
        M(this.B, new H(this.q.getName() + ",sans-serif", I(this.q)));
        ra(this)
    };

    function sa(a, b, c) {
        for (var d in O)
            if (O.hasOwnProperty(d) && b === a.F[O[d]] && c === a.F[O[d]]) return k;
        return p
    }

    function ra(a) {
        var b = a.A.s.offsetWidth,
            c = a.B.s.offsetWidth;
        b === a.F.serif && c === a.F["sans-serif"] || a.k.T && sa(a, b, c) ? ea() - a.ya >= a.S ? a.k.T && sa(a, b, c) && (a.Z === l || a.Z.hasOwnProperty(a.q.getName())) ? P(a, a.V) : P(a, a.ta) : setTimeout(s(function() {
            ra(this)
        }, a), 25) : P(a, a.V)
    }

    function P(a, b) {
        a.A.remove();
        a.B.remove();
        b(a.q)
    };

    function R(a, b, c, d) {
        this.c = b;
        this.t = c;
        this.N = 0;
        this.ca = this.Y = p;
        this.S = d;
        this.k = a.k
    }

    function ta(a, b, c, d, e) {
        if (0 === b.length && e) K(a.t);
        else {
            a.N += b.length;
            e && (a.Y = e);
            for (e = 0; e < b.length; e++) {
                var f = b[e],
                    g = c[f.getName()],
                    h = a.t,
                    n = f;
                v(h.h, h.g.f(h.j, n.getName(), I(n).toString(), "loading"));
                J(h, "fontloading", n);
                (new qa(s(a.ha, a), s(a.ia, a), a.c, f, a.k, a.S, d, g)).start()
            }
        }
    }
    R.prototype.ha = function(a) {
        var b = this.t;
        w(b.h, b.g.f(b.j, a.getName(), I(a).toString(), "loading"));
        w(b.h, b.g.f(b.j, a.getName(), I(a).toString(), "inactive"));
        v(b.h, b.g.f(b.j, a.getName(), I(a).toString(), "active"));
        J(b, "fontactive", a);
        this.ca = k;
        ua(this)
    };
    R.prototype.ia = function(a) {
        var b = this.t;
        w(b.h, b.g.f(b.j, a.getName(), I(a).toString(), "loading"));
        ia(b.h, b.g.f(b.j, a.getName(), I(a).toString(), "active")) || v(b.h, b.g.f(b.j, a.getName(), I(a).toString(), "inactive"));
        J(b, "fontinactive", a);
        ua(this)
    };

    function ua(a) {
        0 == --a.N && a.Y && (a.ca ? (a = a.t, w(a.h, a.g.f(a.j, "loading")), w(a.h, a.g.f(a.j, "inactive")), v(a.h, a.g.f(a.j, "active")), J(a, "active")) : K(a.t))
    };

    function S(a, b, c) {
        this.G = a;
        this.W = b;
        this.a = c;
        this.O = this.P = 0
    }

    function T(a, b) {
        U.W.$[a] = b
    }
    S.prototype.load = function(a) {
        var b = a.context || this.G;
        this.c = new fa(this.G, b);
        b = new na(this.c, b.document.documentElement, a);
        if (this.a.k.w) {
            var c = this.W,
                d = this.c,
                e = [],
                f;
            for (f in a)
                if (a.hasOwnProperty(f)) {
                    var g = c.$[f];
                    g && e.push(g(a[f], d))
                }
            a = a.timeout;
            this.O = this.P = e.length;
            a = new R(this.a, this.c, b, a);
            f = 0;
            for (c = e.length; f < c; f++) d = e[f], d.v(this.a, s(this.ua, this, d, b, a))
        } else K(b)
    };
    S.prototype.ua = function(a, b, c, d) {
        var e = this;
        d ? a.load(function(a, d, h) {
            var n = 0 == --e.P;
            n && pa(b);
            setTimeout(function() {
                ta(c, a, d || {}, h || l, n)
            }, 0)
        }) : (a = 0 == --this.P, this.O--, a && (0 == this.O ? K(b) : pa(b)), ta(c, [], {}, l, a))
    };
    var va = window,
        wa = (new C(navigator.userAgent, document)).parse(),
        U = va.WebFont = new S(window, new function() {
            this.$ = {}
        }, wa);
    U.load = U.load;

    function V(a, b) {
        this.c = a;
        this.d = b
    }
    V.prototype.load = function(a) {
        var b, c, d = this.d.urls || [],
            e = this.d.families || [];
        b = 0;
        for (c = d.length; b < c; b++) t(this.c, "head", u(this.c, d[b]));
        d = [];
        b = 0;
        for (c = e.length; b < c; b++) {
            var f = e[b].split(":");
            if (f[1])
                for (var g = f[1].split(","), h = 0; h < g.length; h += 1) d.push(new H(f[0], g[h]));
            else d.push(new H(f[0]))
        }
        a(d)
    };
    V.prototype.v = function(a, b) {
        return b(a.k.w)
    };
    T("custom", function(a, b) {
        return new V(b, a)
    });

    function W(a, b) {
        this.c = a;
        this.d = b
    }
    var xa = {
        regular: "n4",
        bold: "n7",
        italic: "i4",
        bolditalic: "i7",
        r: "n4",
        b: "n7",
        i: "i4",
        bi: "i7"
    };
    W.prototype.v = function(a, b) {
        return b(a.k.w)
    };
    W.prototype.load = function(a) {
        t(this.c, "head", u(this.c, x(this.c) + "//webfonts.fontslive.com/css/" + this.d.key + ".css"));
        for (var b = this.d.families, c = [], d = 0, e = b.length; d < e; d++) c.push.apply(c, ya(b[d]));
        a(c)
    };

    function ya(a) {
        var b = a.split(":");
        a = b[0];
        if (b[1]) {
            for (var c = b[1].split(","), b = [], d = 0, e = c.length; d < e; d++) {
                var f = c[d];
                if (f) {
                    var g = xa[f];
                    b.push(g ? g : f)
                }
            }
            c = [];
            for (d = 0; d < b.length; d += 1) c.push(new H(a, b[d]));
            return c
        }
        return [new H(a)]
    }
    T("ascender", function(a, b) {
        return new W(b, a)
    });

    function X(a, b, c) {
        this.a = a;
        this.c = b;
        this.d = c;
        this.m = []
    }
    X.prototype.v = function(a, b) {
        var c = this,
            d = c.d.projectId,
            e = c.d.version;
        if (d) {
            var f = c.c.u,
                g = c.c.createElement("script");
            g.id = "__MonotypeAPIScript__" + d;
            var h = p;
            g.onload = g.onreadystatechange = function() {
                if (!h && (!this.readyState || "loaded" === this.readyState || "complete" === this.readyState)) {
                    h = k;
                    if (f["__mti_fntLst" + d]) {
                        var e = f["__mti_fntLst" + d]();
                        if (e)
                            for (var m = 0; m < e.length; m++) c.m.push(new H(e[m].fontfamily))
                    }
                    b(a.k.w);
                    g.onload = g.onreadystatechange = l
                }
            };
            g.src = c.D(d, e);
            t(this.c, "head", g)
        } else b(k)
    };
    X.prototype.D = function(a, b) {
        var c = x(this.c),
            d = (this.d.api || "fast.fonts.com/jsapi").replace(/^.*http(s?):(\/\/)?/, "");
        return c + "//" + d + "/" + a + ".js" + (b ? "?v=" + b : "")
    };
    X.prototype.load = function(a) {
        a(this.m)
    };
    T("monotype", function(a, b) {
        var c = (new C(navigator.userAgent, document)).parse();
        return new X(c, b, a)
    });

    function Y(a, b) {
        this.c = a;
        this.d = b;
        this.m = []
    }
    Y.prototype.D = function(a) {
        var b = x(this.c);
        return (this.d.api || b + "//use.typekit.net") + "/" + a + ".js"
    };
    Y.prototype.v = function(a, b) {
        var c = this.d.id,
            d = this.d,
            e = this.c.u,
            f = this;
        c ? (e.__webfonttypekitmodule__ || (e.__webfonttypekitmodule__ = {}), e.__webfonttypekitmodule__[c] = function(c) {
            c(a, d, function(a, c, d) {
                for (var e = 0; e < c.length; e += 1) {
                    var g = d[c[e]];
                    if (g)
                        for (var Q = 0; Q < g.length; Q += 1) f.m.push(new H(c[e], g[Q]));
                    else f.m.push(new H(c[e]))
                }
                b(a)
            })
        }, c = ha(this.c, this.D(c)), t(this.c, "head", c)) : b(k)
    };
    Y.prototype.load = function(a) {
        a(this.m)
    };
    T("typekit", function(a, b) {
        return new Y(b, a)
    });

    function za(a, b, c) {
        this.L = a ? a : b + Aa;
        this.p = [];
        this.Q = [];
        this.da = c || ""
    }
    var Aa = "//fonts.googleapis.com/css";
    za.prototype.f = function() {
        if (0 == this.p.length) throw Error("No fonts to load !");
        if (-1 != this.L.indexOf("kit=")) return this.L;
        for (var a = this.p.length, b = [], c = 0; c < a; c++) b.push(this.p[c].replace(/ /g, "+"));
        a = this.L + "?family=" + b.join("%7C");
        0 < this.Q.length && (a += "&subset=" + this.Q.join(","));
        0 < this.da.length && (a += "&text=" + encodeURIComponent(this.da));
        return a
    };

    function Ba(a) {
        this.p = a;
        this.aa = [];
        this.I = {}
    }
    var Ca = {
            latin: "BESbswy",
            cyrillic: "&#1081;&#1103;&#1046;",
            greek: "&#945;&#946;&#931;",
            khmer: "&#x1780;&#x1781;&#x1782;",
            Hanuman: "&#x1780;&#x1781;&#x1782;"
        },
        Da = {
            thin: "1",
            extralight: "2",
            "extra-light": "2",
            ultralight: "2",
            "ultra-light": "2",
            light: "3",
            regular: "4",
            book: "4",
            medium: "5",
            "semi-bold": "6",
            semibold: "6",
            "demi-bold": "6",
            demibold: "6",
            bold: "7",
            "extra-bold": "8",
            extrabold: "8",
            "ultra-bold": "8",
            ultrabold: "8",
            black: "9",
            heavy: "9",
            l: "3",
            r: "4",
            b: "7"
        },
        Ea = {
            i: "i",
            italic: "i",
            n: "n",
            normal: "n"
        },
        Fa = RegExp("^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$");
    Ba.prototype.parse = function() {
        for (var a = this.p.length, b = 0; b < a; b++) {
            var c = this.p[b].split(":"),
                d = c[0].replace(/\+/g, " "),
                e = ["n4"];
            if (2 <= c.length) {
                var f;
                var g = c[1];
                f = [];
                if (g)
                    for (var g = g.split(","), h = g.length, n = 0; n < h; n++) {
                        var m;
                        m = g[n];
                        if (m.match(/^[\w]+$/)) {
                            m = Fa.exec(m.toLowerCase());
                            var r = j;
                            if (m == l) r = "";
                            else {
                                r = j;
                                r = m[1];
                                if (r == l || "" == r) r = "4";
                                else var oa = Da[r],
                                    r = oa ? oa : isNaN(r) ? "4" : r.substr(0, 1);
                                r = [m[2] == l || "" == m[2] ? "n" : Ea[m[2]], r].join("")
                            }
                            m = r
                        } else m = "";
                        m && f.push(m)
                    }
                0 < f.length && (e = f);
                3 == c.length && (c = c[2],
                    f = [], c = !c ? f : c.split(","), 0 < c.length && (c = Ca[c[0]]) && (this.I[d] = c))
            }
            this.I[d] || (c = Ca[d]) && (this.I[d] = c);
            for (c = 0; c < e.length; c += 1) this.aa.push(new H(d, e[c]))
        }
    };

    function Z(a, b, c) {
        this.a = a;
        this.c = b;
        this.d = c
    }
    var Ga = {
        Arimo: k,
        Cousine: k,
        Tinos: k
    };
    Z.prototype.v = function(a, b) {
        b(a.k.w)
    };
    Z.prototype.load = function(a) {
        var b = this.c;
        if ("MSIE" == this.a.getName() && this.d.blocking != k) {
            var c = s(this.X, this, a),
                d = function() {
                    b.z.body ? c() : setTimeout(d, 0)
                };
            d()
        } else this.X(a)
    };
    Z.prototype.X = function(a) {
        for (var b = this.c, c = new za(this.d.api, x(b), this.d.text), d = this.d.families, e = d.length, f = 0; f < e; f++) {
            var g = d[f].split(":");
            3 == g.length && c.Q.push(g.pop());
            var h = "";
            2 == g.length && "" != g[1] && (h = ":");
            c.p.push(g.join(h))
        }
        d = new Ba(d);
        d.parse();
        t(b, "head", u(b, c.f()));
        a(d.aa, d.I, Ga)
    };
    T("google", function(a, b) {
        var c = (new C(navigator.userAgent, document)).parse();
        return new Z(c, b, a)
    });

    function $(a, b) {
        this.c = a;
        this.d = b;
        this.m = []
    }
    $.prototype.D = function(a) {
        return x(this.c) + (this.d.api || "//f.fontdeck.com/s/css/js/") + (this.c.u.location.hostname || this.c.G.location.hostname) + "/" + a + ".js"
    };
    $.prototype.v = function(a, b) {
        var c = this.d.id,
            d = this.c.u,
            e = this;
        c ? (d.__webfontfontdeckmodule__ || (d.__webfontfontdeckmodule__ = {}), d.__webfontfontdeckmodule__[c] = function(a, c) {
            for (var d = 0, n = c.fonts.length; d < n; ++d) {
                var m = c.fonts[d];
                e.m.push(new H(m.name, ma("font-weight:" + m.weight + ";font-style:" + m.style)))
            }
            b(a)
        }, c = ha(this.c, this.D(c)), t(this.c, "head", c)) : b(k)
    };
    $.prototype.load = function(a) {
        a(this.m)
    };
    T("fontdeck", function(a, b) {
        return new $(b, a)
    });
    window.WebFontConfig && U.load(window.WebFontConfig);
})(this, document);

define("webfont", function() {});

define('header', ['jquery', 'base', 'headerFOBNav', 'headerFlyout', 'trafficSplitter', 'cookie', 'webfont', 'require'], function($, Base, HeaderFOBNav, HeaderFlyout, TrafficSplitter, Cookie, Webfont, require) {

    var NAME = "Header",
        SEARCH_BOX_HINT = "Search or enter web ID",
        SITE_CHANNEL = "SITE",
        REGISTRY_CHANNEL = "REGISTRY",
        tid, /*   timeout id   */
        pauseOnMoveDetection = false,
        DEFAULT_SPLIT_DATA_URL = 'http://netstorage.macys.com/netstorage/ABTesting/headerFlyouts.json',
        HTTPS_SPLIT_DATA_URL = 'https://secure-netstorage.macys.com/netstorage/ABTesting/headerFlyouts.json',
        SPLIT_DATA_URL,
        selectedID,
        /*
            vars to support mouse direction movement
            used w/Base.pointInTriangle() call
            if moving towards open flyout return true
            else false
        */
        point,
        vert1 = {
            x: 0,
            y: 0
        },
        vert2,
        vert3,
        toFlyoutIntent = false; //whether or not moving in direction of open flyout

    function splitCB(json) {
        return json;
    }



    return {
        SITE: SITE_CHANNEL,
        REGISTRY: REGISTRY_CHANNEL,
        getName: function() {
            return NAME;
        },
        getCurrentChannel: function(testURL) {
            //Channel getter method
            var url = testURL || window.location.href;
            return ~url.indexOf("registry") ? REGISTRY_CHANNEL : SITE_CHANNEL;
        },
        useFlyouts: function(bool) {
            var enable = bool === undefined ? HeaderFlyout.DEFAULT_FLYOUTS_ENABLED : bool; //defualt is true, use flyouts!
            if (enable) {
                HeaderFlyout.enable();
            } else {
                HeaderFlyout.disable();
            }
        },
        setSplitDataUrl: function(url) {
            SPLIT_DATA_URL = url || window.location.href.indexOf("https") > -1 ? HTTPS_SPLIT_DATA_URL : DEFAULT_SPLIT_DATA_URL;
        },
        getSplitDataUrl: function() {
            return SPLIT_DATA_URL || window.location.href.indexOf("https") > -1 ? HTTPS_SPLIT_DATA_URL : DEFAULT_SPLIT_DATA_URL;
        },
        //"parsererror loading: http://netstorage.macys.com/netstorage/flyoutABTesting/split.json"
        getSplitData: function(callback, timeout) {
            var to = timeout || 1000;
            var url = this.getSplitDataUrl();
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'jsonp',
                timeout: to,
                jsonpCallback: 'splitCB',
                success: function(json) {
                    callback(true, json);
                },
                error: function(x, t, m) {
                    callback(false, {
                        error: t + ",message:" + m.message + " loading: " + url
                    });
                }
            });
        },
        pdfFixToggle: function(openFlag) {
            var iev = Base.getIEVersion();
            var margin = openFlag ? "412px" : "0px";
            if (iev && iev < 10 && (window.location.href.indexOf("privacy_dnsbank.jsp") > -1)) {
                //fixed height
                $("div#bd").css("margin-top", margin);
            }

        },
        preInit: function(flyoutsKillSwitch, timeoutMS) {
            var _this = this;
            //killswitch turned off go to default condition init()
            if (!flyoutsKillSwitch) {
                _this.init(flyoutsKillSwitch);
            } else {
                this.getSplitData(function(success, json) {
                    if (success && json.enabled) {
                        _this.applytABTestLogic(json.trafficSplit); //test
                    } else {
                        //loading split.json failed goto default init()
                        _this.init(flyoutsKillSwitch);
                    }
                });
            }
        },
        applytABTestLogic: function(json) {
            var cookieValue = Cookie.get("flyoutEnabled");
            var useFlyouts = true;
            //already have flyoutEnabledCookie
            if (!cookieValue) {
                //new user; no cookie set
                useFlyouts = TrafficSplitter.getTestValue(json) || false;
                var exp = new Date(2013, 7, 31); //per business Sat, 31 Aug 2013 07:00:00 GMT
                Cookie.setExpires(exp.toGMTString());
                Cookie.set("flyoutEnabled", useFlyouts);
            } else {
                useFlyouts = eval(cookieValue);
            }
            this.init(useFlyouts);
        },
        searchHintToggle: function(bool, input) {
            if (bool && input.val() === SEARCH_BOX_HINT) {
                input.val("");
            }

            if (!bool && input.val() === "") {
                input.val(SEARCH_BOX_HINT);
            }

            input.css("color", (bool) ? '#333' : '#8C8C8C');
        },
        initSearchHint: function() {
            var _this = this,
                searchTextBox = $("#nav-search-box input#globalSearchInputField");
            if (searchTextBox) {
                searchTextBox.val(SEARCH_BOX_HINT);
                searchTextBox.css("color", '#8C8C8C');

                searchTextBox.on("focus", function() {
                    _this.searchHintToggle(true, searchTextBox);
                });

                searchTextBox.on("blur", function() {
                    _this.searchHintToggle(false, searchTextBox);
                });

                searchTextBox.parent().parent().on("submit", function(e) {
                    if (searchTextBox.val() === "" || searchTextBox.val() === SEARCH_BOX_HINT) {
                        e.preventDefault();
                        searchTextBox.focus();
                        return false;
                    }
                    return true;
                });
            }
        },
        loadFont: function(cb) {

            var fontBaseUrl = (typeof macysConfig == "object") ? macysConfig.fontBaseUrl || "" : "";
            var cssurl = "https://secure-netstorage.macys.com/netstorage/css/";

            if (Base.getIEVersion() >= 9) {
                cssurl = macysConfig.fontRootRelativePath + "avenirblack_ie9.css";
            } else {
                cssurl += "avenirblack.css";
            }

            WebFont.load({
                custom: {
                    families: ['Avenir Black', 'Avenir Black:n'],
                    urls: [cssurl]
                },
                loading: function() {
                    //console.log("font loading");
                    //cb();
                },
                active: function() {},
                inactive: function() {
                    //console.log("unable to render font");
                },
                fontloading: function(familyName, fvd) {},
                fontactive: function(familyName, fvd) {
                    //console.log("fontactive");
                    cb();
                },
                fontinactive: function(familyName, fvd) {
                    //console.log("fontinactive");
                    //console.log(familyName);
                    //console.log(fvd);
                    cb();
                }
            });
        },
        init: function(flyoutsKillSwitch) {
            var _this = this;
            this.useFlyouts(flyoutsKillSwitch);
            if (Base.isThirdParty()) {
                try {
                    if ((typeof macysConfig == "undefined") || (typeof macysConfig.headerTarget == "undefined") || (typeof macysConfig.footerTarget == "undefined")) {
                        throw new Error("Third Party Header/Footer failed! Missing required 'macysConfig' object. Please reference guide: http://ui-standards.herokuapp.com/components/header");
                    }
                } catch (e) {
                    return;
                }
                require(["handlebars", "headerTemplate", "textBoxAutoComplete"], function(Handlebars, HeaderTemplate, TextBoxAutoComplete) {
                    var macysBaseUrl = macysConfig.fontBaseUrl || "";
                    //render header component
                    Handlebars.partials = Handlebars.templates;
                    if ($(macysConfig.headerTarget).length > 0) {
                        var template = HeaderTemplate({
                            macysBaseUrl: macysBaseUrl
                        });
                        $(macysConfig.headerTarget).html(template);

                        _this.getBagCount();
                        setTimeout(function() {
                            _this.initSearchHint();
                        }, 100); //let DOM render
                    } else {
                        throw new Error("Third party header failed! Missing required headerTarget configuration property");
                    }


                    //let's wait 1/4 of a sec to allow DOM elements to render before w/try to attach
                    //autocomplete component
                    setTimeout(function() {
                        //does not support jsonp! for our 3rd Party Partners
                        //TextBoxAutoComplete.setConfig({serviceHost:'http://www.macys.com',serviceHostPort:'80', servicePath:'/suggester'});
                        //TextBoxAutoComplete.attachTo("globalSearchInputField");
                        //TextBoxAutoComplete.setSource();
                    }, 250);

                    //get back on track with the regular Header flow of things
                    _this.start();
                });
            } else {
                this.start();
            }
        },
        getBagCount: function() {
            var userId = $.cookie("macys_online_uid");

            if (userId) {
            $.ajax({
                url: "/api.macys.com/order/v1/bags?userId=" + userId,
                type: 'GET',
                dataType: 'json',
                cache: true,
                timeout: 2000,
                success: function(data) {
                    if(data.hasOwnProperty("bag") && data.bag.hasOwnProperty("bagSummary")&&data.bag.bagSummary.hasOwnProperty("itemCount")){
                     $("#itemCount").html("("+data.bag.bagSummary.itemCount+")");
                    }
                }
            });
            }

        },
        removeHiddenClass: function() {
            var m = $("div#globalMastheadCategoryMenu");

            if (m.hasClass("globalHiddenDefaultTopNav")) {
                m.removeClass("globalHiddenDefaultTopNav");
            }
        },
        start: function() {
            var _this = this;
            HeaderFOBNav.onReady(function(success) {
                if (success) {
                    if (HeaderFlyout.enabled()) {
                        var catIDs;
                        catIDs = HeaderFOBNav.getCategoryIds();
                        HeaderFlyout.init(catIDs, Base.ALIGN_BOTTOM);
                    } else {
                        //we have dynamic topnav but flyouts are disabled
                        _this.removeHiddenClass();
                        if (Base.isNavApp()) {
                            if ($("header#globalMastheadContainer div#globalMastheadCategoryMenu").hasClass(HeaderFOBNav.TOPNAV_CLASS)) {
                                $("header#globalMastheadContainer div#globalMastheadCategoryMenu").removeClass(HeaderFOBNav.TOPNAV_CLASS);
                            }
                            //add old css
                            $("header#globalMastheadContainer div#globalMastheadCategoryMenu > ul").addClass("nav").addClass("nav-pills");

                        }

                        //ensure all FOB items show and links are uppercase
                        $("header#globalMastheadContainer div#globalMastheadCategoryMenu > ul > li > a").css({
                            textTransform: "uppercase",
                            paddingRight: "0px",
                            paddingLeft: "0px"
                        });
                        _this.loadFont(function() {
                            HeaderFOBNav.distributeWidths();
                        });

                    }
                } else {
                    _this.removeHiddenClass();
                }


            });

            //this will get triggered hover:desktop click:touchDevices
            HeaderFOBNav.onOver(function(id, totalFOBs, selectedIndex, offset, domElement) {
                //adding support for autocomplete
                //close autocomplete on hover
                //try{
                //MACYS.AutoComplete.globalSearchInputField.autocomplete("close");
                // }catch(e){}
                var domid = domElement.attr("id");
                selectedID = Base.getSuffixId(domid);
                clearTimeout(tid);
                if (!domElement.hasClass("selected-flyout")) {
                    //short delay to allow user to mouseover corner of adjacent topnav FOB items on way to flyout
                    //onmouse enter on flyout we'll clear the timeoutID, because we know it wasn't the intention of the use to select
                    if (toFlyoutIntent) {
                        tid = setTimeout(function() {
                            pauseOnMoveDetection = false;
                            domElement.addClass("selected-flyout");
                            HeaderFOBNav.deselectOthers(selectedID, "selected-flyout");
                            HeaderFlyout.closeAll();
                            _this.pdfFixToggle(selectedID, true);
                            HeaderFlyout.open(selectedID, totalFOBs, selectedIndex, offset, domElement.width());
                        }, 500);
                    } else {
                        HeaderFOBNav.deselectOthers(selectedID, "selected-flyout");
                        HeaderFlyout.closeAll();
                        domElement.addClass("selected-flyout");
                        selectedID = Base.getSuffixId(domElement.attr("id"));
                        _this.pdfFixToggle(selectedID, true);
                        HeaderFlyout.open(selectedID, totalFOBs, selectedIndex, offset, domElement.width());
                    }
                } else {
                    clearTimeout(tid);
                    //console.log("open don't close");
                    //dont close flyout
                }
                if ($("#sortBy").length > 0 && $("#ppp").length > 0) {
                    $('#sortBy, #ppp').each(function() {
                        var parent = $(this).parent();
                        var combo = parent.html();
                        parent.html('');
                        parent.html(combo);
                    });
                    try {
                        var arr = MACYS.Faceted.facetCtrl.newHashString.split("&");
                        for (var x = 0; x < arr.length; x++) {
                            if (arr[x].indexOf("sortBy") > -1) {
                                YAHOO.util.Dom.get("sortBy").value = arr[x].split("=")[1];
                            }
                            if (arr[x].indexOf("productsPerPage") > -1) {
                                YAHOO.util.Dom.get("ppp").value = arr[x].split("=")[1];
                            }
                        }
                        MACYS.Pagination.init();
                    } catch (e) {}
                }
            });

            HeaderFOBNav.onOut(function(id) {
                clearTimeout(tid);
                //console.log("toFlyoutIntent fob.onOut: "+toFlyoutIntent);
                //moving in direction of open flyout
                if (toFlyoutIntent) {
                    pauseOnMoveDetection = true;
                    clearTimeout(tid);
                    tid = setTimeout(function() {
                        //console.log("timeout onOut call");
                        HeaderFOBNav.deselectOthers();
                        _this.pdfFixToggle();
                        HeaderFlyout.closeAll();
                    }, 250);
                } else {
                    //console.log("no timeout onOut call");
                    HeaderFOBNav.deselect(id);
                    _this.pdfFixToggle();
                    HeaderFlyout.closeAll();

                }
            });
            HeaderFOBNav.onMove(function(e) {
                if (!selectedID || pauseOnMoveDetection) return;

                var p = HeaderFOBNav.getMouseCoords();
                var tmp = HeaderFlyout.getEdgeCoords(selectedID, Base.TOP);


                //mouse movemnent is towards flyout
                toFlyoutIntent = Base.pointInTriangle(p, vert1, tmp.vert2, tmp.vert3) || false;

                //do not entire object, updates to p will also update vert1
                vert1.x = p.x;
                vert1.y = p.y;
            });

            //ONLY TOUCH DEVICES WILL FIRE THIS CALLBCK
            HeaderFOBNav.onClick(function(id, totalFOBs, selectedIndex, offset, domElement) {
                if (!domElement.hasClass("selected-flyout")) {
                    domElement.addClass("selected-flyout");
                    selectedID = Base.getSuffixId(domElement.attr("id"));
                    HeaderFOBNav.deselectOthers(selectedID, "selected-flyout");
                    HeaderFlyout.closeAll();
                    HeaderFlyout.open(selectedID, totalFOBs, selectedIndex, offset, domElement.width());
                } else {
                    HeaderFOBNav.deselectOthers(selectedID, "selected-flyout");
                    HeaderFlyout.closeAll();
                    domElement.removeClass("selected-flyout");
                }
            });




            if (HeaderFlyout.enabled()) {
                //callback function for ajax support of when flyouts are loaded
                HeaderFlyout.onReady(function(success) {
                    var isFlyoutPresent = $("#globalMastheadFlyout").length > 0;
                    if (success && isFlyoutPresent) {
                        //if (!Base.isThirdParty()) {
                        HeaderFlyout.replaceCoreMetrics();
                        //}

                        HeaderFOBNav.bind();
                        HeaderFlyout.bind();
                        _this.removeHiddenClass();

                        $("div#globalMastheadCategoryMenu").addClass("macysDynFlyout");
                        $("div#globalMastheadCategoryMenu > ul").removeClass("nav").removeClass("nav-pills");
                        //ensure all FOB items show and links are uppercase
                        $("div#globalMastheadCategoryMenu > ul > li > a").css({
                            textTransform: "uppercase",
                            paddingRight: "0px",
                            paddingLeft: "0px"
                        });
                        _this.loadFont(function() {
                            HeaderFOBNav.distributeWidths();
                        });

                    } else {
                        $("div#globalMastheadCategoryMenu").removeClass("macysDynFlyout");
                        $("div#globalMastheadCategoryMenu > ul").addClass("nav").addClass("nav-pills");
                        _this.removeHiddenClass();
                        _this.loadFont(function() {
                            HeaderFOBNav.distributeWidths();
                        });
                    }
                    //dont bind events if this fails
                });

                HeaderFlyout.onOver(function() {
                    clearTimeout(tid);
                    //console.log("flyout over: toFlyoutIntent "+ toFlyoutIntent);
                    pauseOnMoveDetection = toFlyoutIntent = false;



                });

                HeaderFlyout.onOut(function(id) {
                    clearTimeout(tid);
                    tid = setTimeout(function() {
                        _this.pdfFixToggle();
                        HeaderFlyout.closeAll();
                        HeaderFOBNav.deselectOthers();
                    }, 400);
                });
            }



            //start application
            HeaderFOBNav.init(HeaderFlyout.enabled());
        }
    };
});


var https = location.href.indexOf('https') > -1;
var netstorage = https ? 'https://secure-netstorage.macys.com' : 'http://netstorage.macys.com';
var assets = https ? 'https://www.macys.com' : 'http://assets.macys.com';

var jQuery = window.jQuery,
    // check for old versions of jQuery
    oldjQuery = jQuery && !!jQuery.fn.jquery.match(/^1\.[0-4](\.|$)/),
    jqueryRemoteURL = assets + '/web20/assets/script/jquery/jquery-1.9.1',
    paths = {
        'handlebars': netstorage + '/netstorage/components/handlebars.runtime-amd',
        'jqueryui': assets + '/web20/assets/script/jqueryui/jquery-ui-1.10.2.custom',
        'footer': netstorage + '/netstorage/components/Footer',
        'logger': netstorage + '/netstorage/components/logger',
        'headerTemplate': netstorage + '/netstorage/templates/HeaderTemplate',
        'textBoxAutoComplete': netstorage + '/netstorage/components/TextBoxAutoComplete'
    },
    noConflict;

// check for jQuery
if (!jQuery || oldjQuery) {
    // load if it's not available or doesn't meet min standards
    paths.jquery = jqueryRemoteURL;
    noConflict = !!oldjQuery;
} else {
    // register the current jQuery
    define('jquery', [], function() {
        return jQuery;
    });
}

// set up require
require.config({
    paths: paths,
    shim: {
        jqueryui: {
            deps: ['jquery'],
            exports: 'jqueryui'
        }
    },
    waitSeconds: 0
});



// function loadJQuery(){
//     if(location.href.indexOf("https") > -1){
//         paths.jquery = "https://www.macys.com/navapp/web20/assets/script/jquery/jquery-1.9.1"
//     }
//     return 'jquery';
// }
// function loadHeader(){
//     return location.href.indexOf("https") > -1 ? 'headerHTTPS':'header';}

// function loadFooter(){ return location.href.indexOf("https") > -1 ? 'footerHTTPS' : 'footer';}
// // Let's kick off the application
require(['domReady!', 'jquery', 'header', 'cookie', 'base', 'footer'], function(dom, $, Header, Cookie, Base, Footer) {

    //bug http://mingle/projects/seo/cards/3785
    //not sure why on some pages this gets fired twice, which breaks the event bindings by doubling everything
    //I suspect it's due to the large number of 3rd party JS
    //facebook, monetate, bizaarvoice, etc
    if (dom.dynamicHeaderIsReady != undefined) {
        return;
    } else {
        dom.dynamicHeaderIsReady = true;
    }


    var USE_AB_TESTING = false,
        HeaderFlyoutKillSwitch = false;

    //access KILL SWITCHES HERE
    if (!Base.isThirdParty()) {
        HeaderFlyoutKillSwitch = typeof MACYS.topnav.killswitchFlyout == "string" ? eval(MACYS.topnav.killswitchFlyout) : true; //true means flyouts are enabled
    } else {
        HeaderFlyoutKillSwitch = true; //enable for third party sites
    }

    //disable flyouts if touchDevice AND killswitch is set to true(enabled)
    if (Base.isTouch() && HeaderFlyoutKillSwitch) {
        HeaderFlyoutKillSwitch = false;
    }


    if (USE_AB_TESTING) {
        Header.preInit(HeaderFlyoutKillSwitch);
    } else {
        Header.init(HeaderFlyoutKillSwitch);
    }

    Footer.render();

});

define("src/mcom/features/header/main-header-footer-combined", function() {});
