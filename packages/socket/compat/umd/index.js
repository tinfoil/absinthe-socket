(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports)
    : typeof define === "function" && define.amd
    ? define(["exports"], factory)
    : factory((global.AbsintheSocket = {}));
})(this, exports => {
  let commonjsGlobal =
    typeof window !== "undefined"
      ? window
      : typeof global !== "undefined"
      ? global
      : typeof self !== "undefined"
      ? self
      : {};

  function unwrapExports(x) {
    return x &&
      x.__esModule &&
      Object.prototype.hasOwnProperty.call(x, "default")
      ? x.default
      : x;
  }

  function createCommonjsModule(fn, module) {
    return (module = {exports: {}}), fn(module, module.exports), module.exports;
  }

  const _global = createCommonjsModule(module => {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    let global = (module.exports =
      typeof window !== "undefined" && window.Math == Math
        ? window
        : typeof self !== "undefined" && self.Math == Math
        ? self
        : // eslint-disable-next-line no-new-func
          Function("return this")());
    if (typeof __g === "number") __g = global; // eslint-disable-line no-undef
  });

  const _core = createCommonjsModule(module => {
    let core = (module.exports = {version: "2.6.0"});
    if (typeof __e === "number") __e = core; // eslint-disable-line no-undef
  });
  const _core_1 = _core.version;

  const _isObject = function(it) {
    return typeof it === "object" ? it !== null : typeof it === "function";
  };

  const _anObject = function(it) {
    if (!_isObject(it)) throw TypeError(`${it} is not an object!`);
    return it;
  };

  const _fails = function(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  const _descriptors = !_fails(() => (
      Object.defineProperty({}, "a", {
        get: function() {
          return 7;
        }
      }).a != 7
    ));

  const document = _global.document;
  // typeof document.createElement is 'object' in old IE
  const is = _isObject(document) && _isObject(document.createElement);
  const _domCreate = function(it) {
    return is ? document.createElement(it) : {};
  };

  const _ie8DomDefine =
    !_descriptors &&
    !_fails(() => (
        Object.defineProperty(_domCreate("div"), "a", {
          get: function() {
            return 7;
          }
        }).a != 7
      ));

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  const _toPrimitive = function(it, S) {
    if (!_isObject(it)) return it;
    let fn;
    let val;
    if (
      S &&
      typeof (fn = it.toString) === "function" &&
      !_isObject((val = fn.call(it)))
    )
      return val;
    if (
      typeof (fn = it.valueOf) === "function" &&
      !_isObject((val = fn.call(it)))
    )
      return val;
    if (
      !S &&
      typeof (fn = it.toString) === "function" &&
      !_isObject((val = fn.call(it)))
    )
      return val;
    throw TypeError("Can't convert object to primitive value");
  };

  const dP = Object.defineProperty;

  const f = _descriptors
    ? Object.defineProperty
    : function defineProperty(O, P, Attributes) {
        _anObject(O);
        P = _toPrimitive(P, true);
        _anObject(Attributes);
        if (_ie8DomDefine)
          try {
            return dP(O, P, Attributes);
          } catch (e) {
            /* empty */
          }
        if ("get" in Attributes || "set" in Attributes)
          throw TypeError("Accessors not supported!");
        if ("value" in Attributes) O[P] = Attributes.value;
        return O;
      };

  const _objectDp = {
    f
  };

  const _propertyDesc = function(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value
    };
  };

  const _hide = _descriptors
    ? function(object, key, value) {
        return _objectDp.f(object, key, _propertyDesc(1, value));
      }
    : function(object, key, value) {
        object[key] = value;
        return object;
      };

  const hasOwnProperty = {}.hasOwnProperty;
  const _has = function(it, key) {
    return hasOwnProperty.call(it, key);
  };

  let id = 0;
  const px = Math.random();
  const _uid = function(key) {
    return "Symbol(".concat(
      key === undefined ? "" : key,
      ")_",
      (++id + px).toString(36)
    );
  };

  const _redefine = createCommonjsModule(module => {
    let SRC = _uid("src");
    let TO_STRING = "toString";
    let $toString = Function[TO_STRING];
    let TPL = (`${  $toString}`).split(TO_STRING);

    _core.inspectSource = function(it) {
      return $toString.call(it);
    };

    (module.exports = function(O, key, val, safe) {
      let isFunction = typeof val === "function";
      if (isFunction) _has(val, "name") || _hide(val, "name", key);
      if (O[key] === val) return;
      if (isFunction)
        _has(val, SRC) ||
          _hide(val, SRC, O[key] ? `${  O[key]}` : TPL.join(String(key)));
      if (O === _global) {
        O[key] = val;
      } else if (!safe) {
        delete O[key];
        _hide(O, key, val);
      } else if (O[key]) {
        O[key] = val;
      } else {
        _hide(O, key, val);
      }
      // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, TO_STRING, function toString() {
      return (typeof this === "function" && this[SRC]) || $toString.call(this);
    });
  });

  const _aFunction = function(it) {
    if (typeof it !== "function") throw TypeError(`${it} is not a function!`);
    return it;
  };

  // optional / simple context binding

  const _ctx = function(fn, that, length) {
    _aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1:
        return function(a) {
          return fn.call(that, a);
        };
      case 2:
        return function(a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function(a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function(/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  const PROTOTYPE = "prototype";

  var $export = function(type, name, source) {
    const IS_FORCED = type & $export.F;
    const IS_GLOBAL = type & $export.G;
    const IS_STATIC = type & $export.S;
    const IS_PROTO = type & $export.P;
    const IS_BIND = type & $export.B;
    const target = IS_GLOBAL
      ? _global
      : IS_STATIC
      ? _global[name] || (_global[name] = {})
      : (_global[name] || {})[PROTOTYPE];
    const exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
    const expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
    let key;
    let own;
    let out;
    let exp;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      // export native or passed
      out = (own ? target : source)[key];
      // bind timers to global for call from export context
      exp =
        IS_BIND && own
          ? _ctx(out, _global)
          : IS_PROTO && typeof out === "function"
          ? _ctx(Function.call, out)
          : out;
      // extend global
      if (target) _redefine(target, key, out, type & $export.U);
      // export
      if (exports[key] != out) _hide(exports, key, exp);
      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
    }
  };
  _global.core = _core;
  // type bitmap
  $export.F = 1; // forced
  $export.G = 2; // global
  $export.S = 4; // static
  $export.P = 8; // proto
  $export.B = 16; // bind
  $export.W = 32; // wrap
  $export.U = 64; // safe
  $export.R = 128; // real proto method for `library`
  const _export = $export;

  // fast apply, http://jsperf.lnkit.com/fast-apply/5
  const _invoke = function(fn, args, that) {
    const un = that === undefined;
    switch (args.length) {
      case 0:
        return un ? fn() : fn.call(that);
      case 1:
        return un ? fn(args[0]) : fn.call(that, args[0]);
      case 2:
        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
      case 3:
        return un
          ? fn(args[0], args[1], args[2])
          : fn.call(that, args[0], args[1], args[2]);
      case 4:
        return un
          ? fn(args[0], args[1], args[2], args[3])
          : fn.call(that, args[0], args[1], args[2], args[3]);
    }
    return fn.apply(that, args);
  };

  const arraySlice = [].slice;
  const factories = {};

  const construct = function(F, len, args) {
    if (!(len in factories)) {
      for (var n = [], i = 0; i < len; i++) n[i] = `a[${i}]`;
      // eslint-disable-next-line no-new-func
      factories[len] = Function("F,a", `return new F(${n.join(",")})`);
    }
    return factories[len](F, args);
  };

  const _bind =
    Function.bind ||
    function bind(that /* , ...args */) {
      const fn = _aFunction(this);
      const partArgs = arraySlice.call(arguments, 1);
      var bound = function(/* args... */) {
        const args = partArgs.concat(arraySlice.call(arguments));
        return this instanceof bound
          ? construct(fn, args.length, args)
          : _invoke(fn, args, that);
      };
      if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
      return bound;
    };

  // 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)

  _export(_export.P, "Function", {bind: _bind});

  function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }

  const newArrowCheck = _newArrowCheck;

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  const arrayWithoutHoles = _arrayWithoutHoles;

  function _iterableToArray(iter) {
    if (
      Symbol.iterator in Object(iter) ||
      Object.prototype.toString.call(iter) === "[object Arguments]"
    )
      return Array.from(iter);
  }

  const iterableToArray = _iterableToArray;

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  const nonIterableSpread = _nonIterableSpread;

  function _toConsumableArray(arr) {
    return (
      arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread()
    );
  }

  const toConsumableArray = _toConsumableArray;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  const defineProperty = _defineProperty;

  function _objectSpread(target) {
    for (let i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      let ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys = ownKeys.concat(
          Object.getOwnPropertySymbols(source).filter(sym => Object.getOwnPropertyDescriptor(source, sym).enumerable)
        );
      }

      ownKeys.forEach(key => {
        defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  const objectSpread = _objectSpread;

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    const target = {};
    const sourceKeys = Object.keys(source);
    let key;
    let i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  const objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    const target = objectWithoutPropertiesLoose(source, excluded);
    let key;
    let i;

    if (Object.getOwnPropertySymbols) {
      const sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  const objectWithoutProperties = _objectWithoutProperties;

  const _this;

  const cancel = function cancel(_ref) {
    const activeObservers = _ref.activeObservers;

    let canceledObservers = _ref.canceledObservers;

    let rest = objectWithoutProperties(_ref, [
      "activeObservers",
      "canceledObservers"
    ]);

    newArrowCheck(this, _this);

    return objectSpread({}, rest, {
      isActive: false,
      activeObservers: [],
      canceledObservers: toConsumableArray(activeObservers).concat(
        toConsumableArray(canceledObservers)
      )
    });
  }.bind(undefined);

  const _library = false;

  const _shared = createCommonjsModule(module => {
    let SHARED = "__core-js_shared__";
    let store = _global[SHARED] || (_global[SHARED] = {});

    (module.exports = function(key, value) {
      return store[key] || (store[key] = value !== undefined ? value : {});
    })("versions", []).push({
      version: _core.version,
      mode: _library ? "pure" : "global",
      copyright: "© 2018 Denis Pushkarev (zloirock.ru)"
    });
  });

  const _wks = createCommonjsModule(module => {
    let store = _shared("wks");

    let Symbol = _global.Symbol;
    let USE_SYMBOL = typeof Symbol === "function";

    let $exports = (module.exports = function(name) {
      return (
        store[name] ||
        (store[name] =
          (USE_SYMBOL && Symbol[name]) ||
          (USE_SYMBOL ? Symbol : _uid)(`Symbol.${  name}`))
      );
    });

    $exports.store = store;
  });

  // 22.1.3.31 Array.prototype[@@unscopables]
  const UNSCOPABLES = _wks("unscopables");
  const ArrayProto = Array.prototype;
  if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
  const _addToUnscopables = function(key) {
    ArrayProto[UNSCOPABLES][key] = true;
  };

  const _iterStep = function(done, value) {
    return {value, done: !!done};
  };

  const _iterators = {};

  const toString = {}.toString;

  const _cof = function(it) {
    return toString.call(it).slice(8, -1);
  };

  // fallback for non-array-like ES3 and non-enumerable old V8 strings

  // eslint-disable-next-line no-prototype-builtins
  const _iobject = Object("z").propertyIsEnumerable(0)
    ? Object
    : function(it) {
        return _cof(it) == "String" ? it.split("") : Object(it);
      };

  // 7.2.1 RequireObjectCoercible(argument)
  const _defined = function(it) {
    if (it == undefined) throw TypeError(`Can't call method on  ${it}`);
    return it;
  };

  // to indexed object, toObject with fallback for non-array-like ES3 strings

  const _toIobject = function(it) {
    return _iobject(_defined(it));
  };

  // 7.1.4 ToInteger
  const ceil = Math.ceil;
  const floor = Math.floor;
  const _toInteger = function(it) {
    return isNaN((it = +it)) ? 0 : (it > 0 ? floor : ceil)(it);
  };

  // 7.1.15 ToLength

  const min = Math.min;
  const _toLength = function(it) {
    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  const max = Math.max;
  const min$1 = Math.min;
  const _toAbsoluteIndex = function(index, length) {
    index = _toInteger(index);
    return index < 0 ? max(index + length, 0) : min$1(index, length);
  };

  // false -> Array#indexOf
  // true  -> Array#includes

  const _arrayIncludes = function(IS_INCLUDES) {
    return function($this, el, fromIndex) {
      const O = _toIobject($this);
      const length = _toLength(O.length);
      let index = _toAbsoluteIndex(fromIndex, length);
      let value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el)
        while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare
          if (value != value) return true;
          // Array#indexOf ignores holes, Array#includes - not
        }
      else
        for (; length > index; index++)
          if (IS_INCLUDES || index in O) {
            if (O[index] === el) return IS_INCLUDES || index || 0;
          }
      return !IS_INCLUDES && -1;
    };
  };

  const shared = _shared("keys");

  const _sharedKey = function(key) {
    return shared[key] || (shared[key] = _uid(key));
  };

  const arrayIndexOf = _arrayIncludes(false);
  const IE_PROTO = _sharedKey("IE_PROTO");

  const _objectKeysInternal = function(object, names) {
    const O = _toIobject(object);
    let i = 0;
    const result = [];
    let key;
    for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i)
      if (_has(O, (key = names[i++]))) {
        ~arrayIndexOf(result, key) || result.push(key);
      }
    return result;
  };

  // IE 8- don't enum bug keys
  const _enumBugKeys = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
    ","
  );

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)

  const _objectKeys =
    Object.keys ||
    function keys(O) {
      return _objectKeysInternal(O, _enumBugKeys);
    };

  const _objectDps = _descriptors
    ? Object.defineProperties
    : function defineProperties(O, Properties) {
        _anObject(O);
        const keys = _objectKeys(Properties);
        const length = keys.length;
        let i = 0;
        let P;
        while (length > i) _objectDp.f(O, (P = keys[i++]), Properties[P]);
        return O;
      };

  const document$1 = _global.document;
  const _html = document$1 && document$1.documentElement;

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])

  const IE_PROTO$1 = _sharedKey("IE_PROTO");
  const Empty = function() {
    /* empty */
  };
  const PROTOTYPE$1 = "prototype";

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict = function() {
    // Thrash, waste and sodomy: IE GC bug
    const iframe = _domCreate("iframe");
    let i = _enumBugKeys.length;
    const lt = "<";
    const gt = ">";
    let iframeDocument;
    iframe.style.display = "none";
    _html.appendChild(iframe);
    iframe.src = "javascript:"; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(`${lt}script${gt}document.F=Object${lt}/script${gt}`);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
    return createDict();
  };

  const _objectCreate =
    Object.create ||
    function create(O, Properties) {
      let result;
      if (O !== null) {
        Empty[PROTOTYPE$1] = _anObject(O);
        result = new Empty();
        Empty[PROTOTYPE$1] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO$1] = O;
      } else result = createDict();
      return Properties === undefined ? result : _objectDps(result, Properties);
    };

  const def = _objectDp.f;

  const TAG = _wks("toStringTag");

  const _setToStringTag = function(it, tag, stat) {
    if (it && !_has((it = stat ? it : it.prototype), TAG))
      def(it, TAG, {configurable: true, value: tag});
  };

  const IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  _hide(IteratorPrototype, _wks("iterator"), function() {
    return this;
  });

  const _iterCreate = function(Constructor, NAME, next) {
    Constructor.prototype = _objectCreate(IteratorPrototype, {
      next: _propertyDesc(1, next)
    });
    _setToStringTag(Constructor, `${NAME} Iterator`);
  };

  // 7.1.13 ToObject(argument)

  const _toObject = function(it) {
    return Object(_defined(it));
  };

  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)

  const IE_PROTO$2 = _sharedKey("IE_PROTO");
  const ObjectProto = Object.prototype;

  const _objectGpo =
    Object.getPrototypeOf ||
    function(O) {
      O = _toObject(O);
      if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
      if (typeof O.constructor === "function" && O instanceof O.constructor) {
        return O.constructor.prototype;
      }
      return O instanceof Object ? ObjectProto : null;
    };

  const ITERATOR = _wks("iterator");
  const BUGGY = !([].keys && "next" in [].keys()); // Safari has buggy iterators w/o `next`
  const FF_ITERATOR = "@@iterator";
  const KEYS = "keys";
  const VALUES = "values";

  const returnThis = function() {
    return this;
  };

  const _iterDefine = function(
    Base,
    NAME,
    Constructor,
    next,
    DEFAULT,
    IS_SET,
    FORCED
  ) {
    _iterCreate(Constructor, NAME, next);
    const getMethod = function(kind) {
      if (!BUGGY && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS:
          return function keys() {
            return new Constructor(this, kind);
          };
        case VALUES:
          return function values() {
            return new Constructor(this, kind);
          };
      }
      return function entries() {
        return new Constructor(this, kind);
      };
    };
    const TAG = `${NAME} Iterator`;
    const DEF_VALUES = DEFAULT == VALUES;
    let VALUES_BUG = false;
    var proto = Base.prototype;
    const $native =
      proto[ITERATOR] || proto[FF_ITERATOR] || (DEFAULT && proto[DEFAULT]);
    let $default = $native || getMethod(DEFAULT);
    const $entries = DEFAULT
      ? !DEF_VALUES
        ? $default
        : getMethod("entries")
      : undefined;
    const $anyNative = NAME == "Array" ? proto.entries || $native : $native;
    let methods;
    let key;
    let IteratorPrototype;
    // Fix native
    if ($anyNative) {
      IteratorPrototype = _objectGpo($anyNative.call(new Base()));
      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        _setToStringTag(IteratorPrototype, TAG, true);
        // fix for some old engines
        if (!_library && typeof IteratorPrototype[ITERATOR] !== "function")
          _hide(IteratorPrototype, ITERATOR, returnThis);
      }
    }
    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEF_VALUES && $native && $native.name !== VALUES) {
      VALUES_BUG = true;
      $default = function values() {
        return $native.call(this);
      };
    }
    // Define iterator
    if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
      _hide(proto, ITERATOR, $default);
    }
    // Plug for library
    _iterators[NAME] = $default;
    _iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries
      };
      if (FORCED)
        for (key in methods) {
          if (!(key in proto)) _redefine(proto, key, methods[key]);
        }
      else
        _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };

  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  const es6_array_iterator = _iterDefine(
    Array,
    "Array",
    function(iterated, kind) {
      this._t = _toIobject(iterated); // target
      this._i = 0; // next index
      this._k = kind; // kind
      // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
    },
    function() {
      const O = this._t;
      const kind = this._k;
      const index = this._i++;
      if (!O || index >= O.length) {
        this._t = undefined;
        return _iterStep(1);
      }
      if (kind == "keys") return _iterStep(0, index);
      if (kind == "values") return _iterStep(0, O[index]);
      return _iterStep(0, [index, O[index]]);
    },
    "values"
  );

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  _iterators.Arguments = _iterators.Array;

  _addToUnscopables("keys");
  _addToUnscopables("values");
  _addToUnscopables("entries");

  const ITERATOR$1 = _wks("iterator");
  const TO_STRING_TAG = _wks("toStringTag");
  const ArrayValues = _iterators.Array;

  const DOMIterables = {
    CSSRuleList: true, // TODO: Not spec compliant, should be false.
    CSSStyleDeclaration: false,
    CSSValueList: false,
    ClientRectList: false,
    DOMRectList: false,
    DOMStringList: false,
    DOMTokenList: true,
    DataTransferItemList: false,
    FileList: false,
    HTMLAllCollection: false,
    HTMLCollection: false,
    HTMLFormElement: false,
    HTMLSelectElement: false,
    MediaList: true, // TODO: Not spec compliant, should be false.
    MimeTypeArray: false,
    NamedNodeMap: false,
    NodeList: true,
    PaintRequestList: false,
    Plugin: false,
    PluginArray: false,
    SVGLengthList: false,
    SVGNumberList: false,
    SVGPathSegList: false,
    SVGPointList: false,
    SVGStringList: false,
    SVGTransformList: false,
    SourceBufferList: false,
    StyleSheetList: true, // TODO: Not spec compliant, should be false.
    TextTrackCueList: false,
    TextTrackList: false,
    TouchList: false
  };

  for (
    let collections = _objectKeys(DOMIterables), i = 0;
    i < collections.length;
    i++
  ) {
    const NAME = collections[i];
    const explicit = DOMIterables[NAME];
    const Collection = _global[NAME];
    const proto = Collection && Collection.prototype;
    var key;
    if (proto) {
      if (!proto[ITERATOR$1]) _hide(proto, ITERATOR$1, ArrayValues);
      if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
      _iterators[NAME] = ArrayValues;
      if (explicit)
        for (key in es6_array_iterator)
          if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
    }
  }

  // 7.2.2 IsArray(argument)

  const _isArray =
    Array.isArray ||
    function isArray(arg) {
      return _cof(arg) == "Array";
    };

  const SPECIES = _wks("species");

  const _arraySpeciesConstructor = function(original) {
    let C;
    if (_isArray(original)) {
      C = original.constructor;
      // cross-realm fallback
      if (typeof C === "function" && (C === Array || _isArray(C.prototype)))
        C = undefined;
      if (_isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    }
    return C === undefined ? Array : C;
  };

  // 9.4.2.3 ArraySpeciesCreate(originalArray, length)

  const _arraySpeciesCreate = function(original, length) {
    return new (_arraySpeciesConstructor(original))(length);
  };

  // 0 -> Array#forEach
  // 1 -> Array#map
  // 2 -> Array#filter
  // 3 -> Array#some
  // 4 -> Array#every
  // 5 -> Array#find
  // 6 -> Array#findIndex

  const _arrayMethods = function(TYPE, $create) {
    const IS_MAP = TYPE == 1;
    const IS_FILTER = TYPE == 2;
    const IS_SOME = TYPE == 3;
    const IS_EVERY = TYPE == 4;
    const IS_FIND_INDEX = TYPE == 6;
    const NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    const create = $create || _arraySpeciesCreate;
    return function($this, callbackfn, that) {
      const O = _toObject($this);
      const self = _iobject(O);
      const f = _ctx(callbackfn, that, 3);
      const length = _toLength(self.length);
      let index = 0;
      const result = IS_MAP
        ? create($this, length)
        : IS_FILTER
        ? create($this, 0)
        : undefined;
      let val;
      let res;
      for (; length > index; index++)
        if (NO_HOLES || index in self) {
          val = self[index];
          res = f(val, index, O);
          if (TYPE) {
            if (IS_MAP) result[index] = res;
            // map
            else if (res)
              switch (TYPE) {
                case 3:
                  return true; // some
                case 5:
                  return val; // find
                case 6:
                  return index; // findIndex
                case 2:
                  result.push(val); // filter
              }
            else if (IS_EVERY) return false; // every
          }
        }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };

  const _strictMethod = function(method, arg) {
    return (
      !!method &&
      _fails(() => {
        // eslint-disable-next-line no-useless-call
        arg
          ? method.call(
              null,
              () => {
                /* empty */
              },
              1
            )
          : method.call(null);
      })
    );
  };

  const $forEach = _arrayMethods(0);
  const STRICT = _strictMethod([].forEach, true);

  _export(_export.P + _export.F * !STRICT, "Array", {
    // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
    forEach: function forEach(callbackfn /* , thisArg */) {
      return $forEach(this, callbackfn, arguments[1]);
    }
  });

  const dP$1 = _objectDp.f;
  const FProto = Function.prototype;
  const nameRE = /^\s*function ([^ (]*)/;
  const NAME$1 = "name";

  // 19.2.4.2 name
  NAME$1 in FProto ||
    (_descriptors &&
      dP$1(FProto, NAME$1, {
        configurable: true,
        get() {
          try {
            return (`${  this}`).match(nameRE)[1];
          } catch (e) {
            return "";
          }
        }
      }));

  const _this$1;

  const getNotifier = function getNotifier(handlerName, payload) {
    const _this2 = this;

    newArrowCheck(this, _this$1);

    return function(observer) {
      newArrowCheck(this, _this2);

      return observer[handlerName] && observer[handlerName](payload);
    }.bind(this);
  }.bind(undefined);

  const getHandlerName = function getHandlerName(_ref) {
    const name = _ref.name;

    newArrowCheck(this, _this$1);

    return "on".concat(name);
  }.bind(undefined);

  const notifyAll = function notifyAll(observers, event) {
    newArrowCheck(this, _this$1);

    return observers.forEach(getNotifier(getHandlerName(event), event.payload));
  }.bind(undefined);

  const _this$2;

  const notifyCanceled = function notifyCanceled(notifier, event) {
    newArrowCheck(this, _this$2);

    notifyAll(notifier.canceledObservers, event);
    return notifier;
  }.bind(undefined);

  const eventNames = {
    abort: "Abort",
    cancel: "Cancel",
    error: "Error",
    result: "Result",
    start: "Start"
  };

  const _this$3;

  const createStartEvent = function createStartEvent(payload) {
    newArrowCheck(this, _this$3);

    return {
      payload,
      name: eventNames.start
    };
  }.bind(undefined);

  const createResultEvent = function createResultEvent(payload) {
    newArrowCheck(this, _this$3);

    return {
      payload,
      name: eventNames.result
    };
  }.bind(undefined);

  const createErrorEvent = function createErrorEvent(payload) {
    newArrowCheck(this, _this$3);

    return {
      payload,
      name: eventNames.error
    };
  }.bind(undefined);

  const createCancelEvent = function createCancelEvent() {
    newArrowCheck(this, _this$3);

    return {
      name: eventNames.cancel,
      payload: undefined
    };
  }.bind(undefined);

  const createAbortEvent = function createAbortEvent(payload) {
    newArrowCheck(this, _this$3);

    return {
      payload,
      name: eventNames.abort
    };
  }.bind(undefined);

  const _this$4;

  const clearCanceled = function clearCanceled(notifier) {
    newArrowCheck(this, _this$4);

    return objectSpread({}, notifier, {
      canceledObservers: []
    });
  }.bind(undefined);

  const flushCanceled = function flushCanceled(notifier) {
    newArrowCheck(this, _this$4);

    return notifier.canceledObservers.length > 0
      ? clearCanceled(notifyCanceled(notifier, createCancelEvent()))
      : notifier;
  }.bind(undefined);

  // 7.1.4 ToInteger
  const ceil$1 = Math.ceil;
  const floor$1 = Math.floor;
  const _toInteger$1 = function(it) {
    return isNaN((it = +it)) ? 0 : (it > 0 ? floor$1 : ceil$1)(it);
  };

  // 7.2.1 RequireObjectCoercible(argument)
  const _defined$1 = function(it) {
    if (it == undefined) throw TypeError(`Can't call method on  ${it}`);
    return it;
  };

  // true  -> String#at
  // false -> String#codePointAt
  const _stringAt = function(TO_STRING) {
    return function(that, pos) {
      const s = String(_defined$1(that));
      const i = _toInteger$1(pos);
      const l = s.length;
      let a;
      let b;
      if (i < 0 || i >= l) return TO_STRING ? "" : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 ||
        a > 0xdbff ||
        i + 1 === l ||
        (b = s.charCodeAt(i + 1)) < 0xdc00 ||
        b > 0xdfff
        ? TO_STRING
          ? s.charAt(i)
          : a
        : TO_STRING
        ? s.slice(i, i + 2)
        : ((a - 0xd800) << 10) + (b - 0xdc00) + 0x10000;
    };
  };

  const _library$1 = true;

  const _global$1 = createCommonjsModule(module => {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    let global = (module.exports =
      typeof window !== "undefined" && window.Math == Math
        ? window
        : typeof self !== "undefined" && self.Math == Math
        ? self
        : // eslint-disable-next-line no-new-func
          Function("return this")());
    if (typeof __g === "number") __g = global; // eslint-disable-line no-undef
  });

  const _core$1 = createCommonjsModule(module => {
    let core = (module.exports = {version: "2.5.1"});
    if (typeof __e === "number") __e = core; // eslint-disable-line no-undef
  });
  const _core_1$1 = _core$1.version;

  const _aFunction$1 = function(it) {
    if (typeof it !== "function") throw TypeError(`${it} is not a function!`);
    return it;
  };

  // optional / simple context binding

  const _ctx$1 = function(fn, that, length) {
    _aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1:
        return function(a) {
          return fn.call(that, a);
        };
      case 2:
        return function(a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function(a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function(/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  const _isObject$1 = function(it) {
    return typeof it === "object" ? it !== null : typeof it === "function";
  };

  const _anObject$1 = function(it) {
    if (!_isObject$1(it)) throw TypeError(`${it} is not an object!`);
    return it;
  };

  const _fails$1 = function(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  const _descriptors$1 = !_fails$1(() => (
      Object.defineProperty({}, "a", {
        get: function() {
          return 7;
        }
      }).a != 7
    ));

  const document$2 = _global$1.document;
  // typeof document.createElement is 'object' in old IE
  const is$1 = _isObject$1(document$2) && _isObject$1(document$2.createElement);
  const _domCreate$1 = function(it) {
    return is$1 ? document$2.createElement(it) : {};
  };

  const _ie8DomDefine$1 =
    !_descriptors$1 &&
    !_fails$1(() => (
        Object.defineProperty(_domCreate$1("div"), "a", {
          get: function() {
            return 7;
          }
        }).a != 7
      ));

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  const _toPrimitive$1 = function(it, S) {
    if (!_isObject$1(it)) return it;
    let fn;
    let val;
    if (
      S &&
      typeof (fn = it.toString) === "function" &&
      !_isObject$1((val = fn.call(it)))
    )
      return val;
    if (
      typeof (fn = it.valueOf) === "function" &&
      !_isObject$1((val = fn.call(it)))
    )
      return val;
    if (
      !S &&
      typeof (fn = it.toString) === "function" &&
      !_isObject$1((val = fn.call(it)))
    )
      return val;
    throw TypeError("Can't convert object to primitive value");
  };

  const dP$2 = Object.defineProperty;

  const f$1 = _descriptors$1
    ? Object.defineProperty
    : function defineProperty(O, P, Attributes) {
        _anObject$1(O);
        P = _toPrimitive$1(P, true);
        _anObject$1(Attributes);
        if (_ie8DomDefine$1)
          try {
            return dP$2(O, P, Attributes);
          } catch (e) {
            /* empty */
          }
        if ("get" in Attributes || "set" in Attributes)
          throw TypeError("Accessors not supported!");
        if ("value" in Attributes) O[P] = Attributes.value;
        return O;
      };

  const _objectDp$1 = {
    f: f$1
  };

  const _propertyDesc$1 = function(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value
    };
  };

  const _hide$1 = _descriptors$1
    ? function(object, key, value) {
        return _objectDp$1.f(object, key, _propertyDesc$1(1, value));
      }
    : function(object, key, value) {
        object[key] = value;
        return object;
      };

  const PROTOTYPE$2 = "prototype";

  var $export$1 = function(type, name, source) {
    const IS_FORCED = type & $export$1.F;
    const IS_GLOBAL = type & $export$1.G;
    const IS_STATIC = type & $export$1.S;
    const IS_PROTO = type & $export$1.P;
    const IS_BIND = type & $export$1.B;
    const IS_WRAP = type & $export$1.W;
    const exports = IS_GLOBAL ? _core$1 : _core$1[name] || (_core$1[name] = {});
    const expProto = exports[PROTOTYPE$2];
    const target = IS_GLOBAL
      ? _global$1
      : IS_STATIC
      ? _global$1[name]
      : (_global$1[name] || {})[PROTOTYPE$2];
    let key;
    let own;
    let out;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      if (own && key in exports) continue;
      // export native or passed
      out = own ? target[key] : source[key];
      // prevent global pollution for namespaces
      exports[key] =
        IS_GLOBAL && typeof target[key] !== "function"
          ? source[key]
          : // bind timers to global for call from export context
          IS_BIND && own
          ? _ctx$1(out, _global$1)
          : // wrap global constructors for prevent change them in library
          IS_WRAP && target[key] == out
          ? (function(C) {
              const F = function(a, b, c) {
                if (this instanceof C) {
                  switch (arguments.length) {
                    case 0:
                      return new C();
                    case 1:
                      return new C(a);
                    case 2:
                      return new C(a, b);
                  }
                  return new C(a, b, c);
                }
                return C.apply(this, arguments);
              };
              F[PROTOTYPE$2] = C[PROTOTYPE$2];
              return F;
              // make static versions for prototype methods
            })(out)
          : IS_PROTO && typeof out === "function"
          ? _ctx$1(Function.call, out)
          : out;
      // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
      if (IS_PROTO) {
        (exports.virtual || (exports.virtual = {}))[key] = out;
        // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
        if (type & $export$1.R && expProto && !expProto[key])
          _hide$1(expProto, key, out);
      }
    }
  };
  // type bitmap
  $export$1.F = 1; // forced
  $export$1.G = 2; // global
  $export$1.S = 4; // static
  $export$1.P = 8; // proto
  $export$1.B = 16; // bind
  $export$1.W = 32; // wrap
  $export$1.U = 64; // safe
  $export$1.R = 128; // real proto method for `library`
  const _export$1 = $export$1;

  const _redefine$1 = _hide$1;

  const hasOwnProperty$1 = {}.hasOwnProperty;
  const _has$1 = function(it, key) {
    return hasOwnProperty$1.call(it, key);
  };

  const _iterators$1 = {};

  const toString$1 = {}.toString;

  const _cof$1 = function(it) {
    return toString$1.call(it).slice(8, -1);
  };

  // fallback for non-array-like ES3 and non-enumerable old V8 strings

  // eslint-disable-next-line no-prototype-builtins
  const _iobject$1 = Object("z").propertyIsEnumerable(0)
    ? Object
    : function(it) {
        return _cof$1(it) == "String" ? it.split("") : Object(it);
      };

  // to indexed object, toObject with fallback for non-array-like ES3 strings

  const _toIobject$1 = function(it) {
    return _iobject$1(_defined$1(it));
  };

  // 7.1.15 ToLength

  const min$2 = Math.min;
  const _toLength$1 = function(it) {
    return it > 0 ? min$2(_toInteger$1(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  const max$1 = Math.max;
  const min$3 = Math.min;
  const _toAbsoluteIndex$1 = function(index, length) {
    index = _toInteger$1(index);
    return index < 0 ? max$1(index + length, 0) : min$3(index, length);
  };

  // false -> Array#indexOf
  // true  -> Array#includes

  const _arrayIncludes$1 = function(IS_INCLUDES) {
    return function($this, el, fromIndex) {
      const O = _toIobject$1($this);
      const length = _toLength$1(O.length);
      let index = _toAbsoluteIndex$1(fromIndex, length);
      let value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el)
        while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare
          if (value != value) return true;
          // Array#indexOf ignores holes, Array#includes - not
        }
      else
        for (; length > index; index++)
          if (IS_INCLUDES || index in O) {
            if (O[index] === el) return IS_INCLUDES || index || 0;
          }
      return !IS_INCLUDES && -1;
    };
  };

  const SHARED = "__core-js_shared__";
  const store = _global$1[SHARED] || (_global$1[SHARED] = {});
  const _shared$1 = function(key) {
    return store[key] || (store[key] = {});
  };

  let id$1 = 0;
  const px$1 = Math.random();
  const _uid$1 = function(key) {
    return "Symbol(".concat(
      key === undefined ? "" : key,
      ")_",
      (++id$1 + px$1).toString(36)
    );
  };

  const shared$1 = _shared$1("keys");

  const _sharedKey$1 = function(key) {
    return shared$1[key] || (shared$1[key] = _uid$1(key));
  };

  const arrayIndexOf$1 = _arrayIncludes$1(false);
  const IE_PROTO$3 = _sharedKey$1("IE_PROTO");

  const _objectKeysInternal$1 = function(object, names) {
    const O = _toIobject$1(object);
    let i = 0;
    const result = [];
    let key;
    for (key in O) if (key != IE_PROTO$3) _has$1(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i)
      if (_has$1(O, (key = names[i++]))) {
        ~arrayIndexOf$1(result, key) || result.push(key);
      }
    return result;
  };

  // IE 8- don't enum bug keys
  const _enumBugKeys$1 = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
    ","
  );

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)

  const _objectKeys$1 =
    Object.keys ||
    function keys(O) {
      return _objectKeysInternal$1(O, _enumBugKeys$1);
    };

  const _objectDps$1 = _descriptors$1
    ? Object.defineProperties
    : function defineProperties(O, Properties) {
        _anObject$1(O);
        const keys = _objectKeys$1(Properties);
        const length = keys.length;
        let i = 0;
        let P;
        while (length > i) _objectDp$1.f(O, (P = keys[i++]), Properties[P]);
        return O;
      };

  const document$3 = _global$1.document;
  const _html$1 = document$3 && document$3.documentElement;

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])

  const IE_PROTO$4 = _sharedKey$1("IE_PROTO");
  const Empty$1 = function() {
    /* empty */
  };
  const PROTOTYPE$3 = "prototype";

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict$1 = function() {
    // Thrash, waste and sodomy: IE GC bug
    const iframe = _domCreate$1("iframe");
    let i = _enumBugKeys$1.length;
    const lt = "<";
    const gt = ">";
    let iframeDocument;
    iframe.style.display = "none";
    _html$1.appendChild(iframe);
    iframe.src = "javascript:"; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(`${lt}script${gt}document.F=Object${lt}/script${gt}`);
    iframeDocument.close();
    createDict$1 = iframeDocument.F;
    while (i--) delete createDict$1[PROTOTYPE$3][_enumBugKeys$1[i]];
    return createDict$1();
  };

  const _objectCreate$1 =
    Object.create ||
    function create(O, Properties) {
      let result;
      if (O !== null) {
        Empty$1[PROTOTYPE$3] = _anObject$1(O);
        result = new Empty$1();
        Empty$1[PROTOTYPE$3] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO$4] = O;
      } else result = createDict$1();
      return Properties === undefined
        ? result
        : _objectDps$1(result, Properties);
    };

  const _wks$1 = createCommonjsModule(module => {
    let store = _shared$1("wks");

    let Symbol = _global$1.Symbol;
    let USE_SYMBOL = typeof Symbol === "function";

    let $exports = (module.exports = function(name) {
      return (
        store[name] ||
        (store[name] =
          (USE_SYMBOL && Symbol[name]) ||
          (USE_SYMBOL ? Symbol : _uid$1)(`Symbol.${  name}`))
      );
    });

    $exports.store = store;
  });

  const def$1 = _objectDp$1.f;

  const TAG$1 = _wks$1("toStringTag");

  const _setToStringTag$1 = function(it, tag, stat) {
    if (it && !_has$1((it = stat ? it : it.prototype), TAG$1))
      def$1(it, TAG$1, {configurable: true, value: tag});
  };

  const IteratorPrototype$1 = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  _hide$1(IteratorPrototype$1, _wks$1("iterator"), function() {
    return this;
  });

  const _iterCreate$1 = function(Constructor, NAME, next) {
    Constructor.prototype = _objectCreate$1(IteratorPrototype$1, {
      next: _propertyDesc$1(1, next)
    });
    _setToStringTag$1(Constructor, `${NAME} Iterator`);
  };

  // 7.1.13 ToObject(argument)

  const _toObject$1 = function(it) {
    return Object(_defined$1(it));
  };

  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)

  const IE_PROTO$5 = _sharedKey$1("IE_PROTO");
  const ObjectProto$1 = Object.prototype;

  const _objectGpo$1 =
    Object.getPrototypeOf ||
    function(O) {
      O = _toObject$1(O);
      if (_has$1(O, IE_PROTO$5)) return O[IE_PROTO$5];
      if (typeof O.constructor === "function" && O instanceof O.constructor) {
        return O.constructor.prototype;
      }
      return O instanceof Object ? ObjectProto$1 : null;
    };

  const ITERATOR$2 = _wks$1("iterator");
  const BUGGY$1 = !([].keys && "next" in [].keys()); // Safari has buggy iterators w/o `next`
  const FF_ITERATOR$1 = "@@iterator";
  const KEYS$1 = "keys";
  const VALUES$1 = "values";

  const returnThis$1 = function() {
    return this;
  };

  const _iterDefine$1 = function(
    Base,
    NAME,
    Constructor,
    next,
    DEFAULT,
    IS_SET,
    FORCED
  ) {
    _iterCreate$1(Constructor, NAME, next);
    const getMethod = function(kind) {
      if (!BUGGY$1 && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS$1:
          return function keys() {
            return new Constructor(this, kind);
          };
        case VALUES$1:
          return function values() {
            return new Constructor(this, kind);
          };
      }
      return function entries() {
        return new Constructor(this, kind);
      };
    };
    const TAG = `${NAME} Iterator`;
    const DEF_VALUES = DEFAULT == VALUES$1;
    let VALUES_BUG = false;
    var proto = Base.prototype;
    const $native =
      proto[ITERATOR$2] || proto[FF_ITERATOR$1] || (DEFAULT && proto[DEFAULT]);
    let $default = $native || getMethod(DEFAULT);
    const $entries = DEFAULT
      ? !DEF_VALUES
        ? $default
        : getMethod("entries")
      : undefined;
    const $anyNative = NAME == "Array" ? proto.entries || $native : $native;
    let methods;
    let key;
    let IteratorPrototype;
    // Fix native
    if ($anyNative) {
      IteratorPrototype = _objectGpo$1($anyNative.call(new Base()));
      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        _setToStringTag$1(IteratorPrototype, TAG, true);
        // fix for some old engines
        if (!_library$1 && !_has$1(IteratorPrototype, ITERATOR$2))
          _hide$1(IteratorPrototype, ITERATOR$2, returnThis$1);
      }
    }
    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEF_VALUES && $native && $native.name !== VALUES$1) {
      VALUES_BUG = true;
      $default = function values() {
        return $native.call(this);
      };
    }
    // Define iterator
    if (
      (!_library$1 || FORCED) &&
      (BUGGY$1 || VALUES_BUG || !proto[ITERATOR$2])
    ) {
      _hide$1(proto, ITERATOR$2, $default);
    }
    // Plug for library
    _iterators$1[NAME] = $default;
    _iterators$1[TAG] = returnThis$1;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES$1),
        keys: IS_SET ? $default : getMethod(KEYS$1),
        entries: $entries
      };
      if (FORCED)
        for (key in methods) {
          if (!(key in proto)) _redefine$1(proto, key, methods[key]);
        }
      else
        _export$1(
          _export$1.P + _export$1.F * (BUGGY$1 || VALUES_BUG),
          NAME,
          methods
        );
    }
    return methods;
  };

  const $at = _stringAt(true);

  // 21.1.3.27 String.prototype[@@iterator]()
  _iterDefine$1(
    String,
    "String",
    function(iterated) {
      this._t = String(iterated); // target
      this._i = 0; // next index
      // 21.1.5.2.1 %StringIteratorPrototype%.next()
    },
    function() {
      const O = this._t;
      const index = this._i;
      let point;
      if (index >= O.length) return {value: undefined, done: true};
      point = $at(O, index);
      this._i += point.length;
      return {value: point, done: false};
    }
  );

  // call something on iterator step with safe closing on error

  const _iterCall = function(iterator, fn, value, entries) {
    try {
      return entries ? fn(_anObject$1(value)[0], value[1]) : fn(value);
      // 7.4.6 IteratorClose(iterator, completion)
    } catch (e) {
      const ret = iterator.return;
      if (ret !== undefined) _anObject$1(ret.call(iterator));
      throw e;
    }
  };

  // check on default Array iterator

  const ITERATOR$3 = _wks$1("iterator");
  const ArrayProto$1 = Array.prototype;

  const _isArrayIter = function(it) {
    return (
      it !== undefined &&
      (_iterators$1.Array === it || ArrayProto$1[ITERATOR$3] === it)
    );
  };

  const _createProperty = function(object, index, value) {
    if (index in object)
      _objectDp$1.f(object, index, _propertyDesc$1(0, value));
    else object[index] = value;
  };

  // getting tag from 19.1.3.6 Object.prototype.toString()

  const TAG$2 = _wks$1("toStringTag");
  // ES3 wrong here
  const ARG =
    _cof$1(
      (function() {
        return arguments;
      })()
    ) == "Arguments";

  // fallback for IE11 Script Access Denied error
  const tryGet = function(it, key) {
    try {
      return it[key];
    } catch (e) {
      /* empty */
    }
  };

  const _classof = function(it) {
    let O;
    let T;
    let B;
    return it === undefined
      ? "Undefined"
      : it === null
      ? "Null"
      : // @@toStringTag case
      typeof (T = tryGet((O = Object(it)), TAG$2)) === "string"
      ? T
      : // builtinTag case
      ARG
      ? _cof$1(O)
      : // ES3 arguments fallback
      (B = _cof$1(O)) == "Object" && typeof O.callee === "function"
      ? "Arguments"
      : B;
  };

  const ITERATOR$4 = _wks$1("iterator");

  const core_getIteratorMethod = (_core$1.getIteratorMethod = function(it) {
    if (it != undefined)
      return it[ITERATOR$4] || it["@@iterator"] || _iterators$1[_classof(it)];
  });

  const ITERATOR$5 = _wks$1("iterator");
  let SAFE_CLOSING = false;

  try {
    const riter = [7][ITERATOR$5]();
    riter.return = function() {
      SAFE_CLOSING = true;
    };
  } catch (e) {
    /* empty */
  }

  const _iterDetect = function(exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING) return false;
    let safe = false;
    try {
      const arr = [7];
      const iter = arr[ITERATOR$5]();
      iter.next = function() {
        return {done: (safe = true)};
      };
      arr[ITERATOR$5] = function() {
        return iter;
      };
      exec(arr);
    } catch (e) {
      /* empty */
    }
    return safe;
  };

  _export$1(_export$1.S + _export$1.F * !_iterDetect(iter => {}), "Array", {
    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
    from: function from(
      arrayLike /* , mapfn = undefined, thisArg = undefined */
    ) {
      const O = _toObject$1(arrayLike);
      let C = typeof this === "function" ? this : Array;
      const aLen = arguments.length;
      let mapfn = aLen > 1 ? arguments[1] : undefined;
      const mapping = mapfn !== undefined;
      let index = 0;
      const iterFn = core_getIteratorMethod(O);
      let length;
      var result;
      let step;
      let iterator;
      if (mapping)
        mapfn = _ctx$1(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
      // if object isn't iterable or it's array with default iterator - use simple case
      if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
        for (
          iterator = iterFn.call(O), result = new C();
          !(step = iterator.next()).done;
          index++
        ) {
          _createProperty(
            result,
            index,
            mapping
              ? _iterCall(iterator, mapfn, [step.value, index], true)
              : step.value
          );
        }
      } else {
        length = _toLength$1(O.length);
        for (result = new C(length); length > index; index++) {
          _createProperty(
            result,
            index,
            mapping ? mapfn(O[index], index) : O[index]
          );
        }
      }
      result.length = index;
      return result;
    }
  });

  const from_1 = _core$1.Array.from;

  const from_1$1 = createCommonjsModule(module => {
    module.exports = {default: from_1, __esModule: true};
  });

  const _Array$from = unwrapExports(from_1$1);

  const toConsumableArray$1 = createCommonjsModule((module, exports) => {
    exports.__esModule = true;

    let _from2 = _interopRequireDefault(from_1$1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }

    exports.default = function(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      } 
        return (0, _from2.default)(arr);
      
    };
  });

  const _toConsumableArray$1 = unwrapExports(toConsumableArray$1);

  const newArrowCheck$1 = createCommonjsModule((module, exports) => {
    exports.__esModule = true;

    exports.default = function(innerThis, boundThis) {
      if (innerThis !== boundThis) {
        throw new TypeError("Cannot instantiate an arrow function");
      }
    };
  });

  const _newArrowCheck$1 = unwrapExports(newArrowCheck$1);

  const Fun = createCommonjsModule((module, exports) => {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.flip = flip;
    exports.constant = constant;
    exports.on = on;
    exports.compose = compose;
    exports.pipe = pipe;
    exports.curry = curry;
    // eslint-disable-line no-redeclare

    // Flips the order of the arguments to a function of two arguments.
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare

    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare

    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    function flip(f) {
      return function(b, a) {
        return f(a, b);
      };
    }

    // Returns its first argument and ignores its second.
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare

    function constant(a) {
      return function() {
        return a;
      };
    }

    // The `on` function is used to change the domain of a binary operator.
    function on(o, f) {
      return function(x, y) {
        return o(f(x), f(y));
      };
    }

    function compose() {
      const _this = this;

      for (
        var _len = arguments.length, fns = Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        fns[_key] = arguments[_key];
      }

      // eslint-disable-line no-redeclare
      const len = fns.length - 1;
      return function(x) {
        let y = x;
        for (let _i = len; _i > -1; _i--) {
          y = fns[_i].call(_this, y);
        }
        return y;
      };
    }

    function pipe() {
      const _this2 = this;

      for (
        var _len2 = arguments.length, fns = Array(_len2), _key2 = 0;
        _key2 < _len2;
        _key2++
      ) {
        fns[_key2] = arguments[_key2];
      }

      // eslint-disable-line no-redeclare
      const len = fns.length - 1;
      return function(x) {
        let y = x;
        for (let _i2 = 0; _i2 <= len; _i2++) {
          y = fns[_i2].call(_this2, y);
        }
        return y;
      };
    }

    function curried(f, length, acc) {
      return function() {
        const combined = acc.concat(Array.prototype.slice.call(arguments));
        return combined.length >= length
          ? f.apply(this, combined)
          : curried(f, length, combined);
      };
    }

    function curry(f) {
      // eslint-disable-line no-redeclare
      return curried(f, f.length, []);
    }
  });

  unwrapExports(Fun);
  const Fun_1 = Fun.flip;
  const Fun_2 = Fun.constant;
  const Fun_3 = Fun.on;
  const Fun_4 = Fun.compose;
  const Fun_5 = Fun.pipe;
  const Fun_6 = Fun.curry;

  const f$2 = Object.getOwnPropertySymbols;

  const _objectGops = {
    f: f$2
  };

  const f$3 = {}.propertyIsEnumerable;

  const _objectPie = {
    f: f$3
  };

  // 19.1.2.1 Object.assign(target, source, ...)

  const $assign = Object.assign;

  // should work with symbols and should have deterministic property order (V8 bug)
  const _objectAssign =
    !$assign ||
    _fails$1(() => {
      const A = {};
      const B = {};
      // eslint-disable-next-line no-undef
      const S = Symbol();
      let K = "abcdefghijklmnopqrst";
      A[S] = 7;
      K.split("").forEach((k) => {
        B[k] = k;
      });
      return (
        $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join("") != K
      );
    })
      ? function assign(target, source) {
          // eslint-disable-line no-unused-vars
          const T = _toObject$1(target);
          const aLen = arguments.length;
          let index = 1;
          const getSymbols = _objectGops.f;
          const isEnum = _objectPie.f;
          while (aLen > index) {
            const S = _iobject$1(arguments[index++]);
            const keys = getSymbols
              ? _objectKeys$1(S).concat(getSymbols(S))
              : _objectKeys$1(S);
            const length = keys.length;
            let j = 0;
            var key;
            while (length > j)
              if (isEnum.call(S, (key = keys[j++]))) T[key] = S[key];
          }
          return T;
        }
      : $assign;

  // 19.1.3.1 Object.assign(target, source)

  _export$1(_export$1.S + _export$1.F, "Object", {assign: _objectAssign});

  const assign = _core$1.Object.assign;

  const assign$1 = createCommonjsModule(module => {
    module.exports = {default: assign, __esModule: true};
  });

  unwrapExports(assign$1);

  const _extends = createCommonjsModule((module, exports) => {
    exports.__esModule = true;

    let _assign2 = _interopRequireDefault(assign$1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }

    exports.default =
      _assign2.default ||
      function(target) {
        for (let i = 1; i < arguments.length; i++) {
          const source = arguments[i];

          for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };
  });

  const _extends$1 = unwrapExports(_extends);

  // most Object methods by ES6 should accept primitives

  const _objectSap = function(KEY, exec) {
    const fn = (_core$1.Object || {})[KEY] || Object[KEY];
    const exp = {};
    exp[KEY] = exec(fn);
    _export$1(
      _export$1.S +
        _export$1.F *
          _fails$1(() => {
            fn(1);
          }),
      "Object",
      exp
    );
  };

  // 19.1.2.14 Object.keys(O)

  _objectSap("keys", () => function keys(it) {
      return _objectKeys$1(_toObject$1(it));
    });

  const keys = _core$1.Object.keys;

  const keys$1 = createCommonjsModule(module => {
    module.exports = {default: keys, __esModule: true};
  });

  const _Object$keys = unwrapExports(keys$1);

  // 20.1.2.3 Number.isInteger(number)

  const floor$2 = Math.floor;
  const _isInteger = function isInteger(it) {
    return !_isObject$1(it) && isFinite(it) && floor$2(it) === it;
  };

  // 20.1.2.3 Number.isInteger(number)

  _export$1(_export$1.S, "Number", {isInteger: _isInteger});

  const isInteger = _core$1.Number.isInteger;

  const isInteger$1 = createCommonjsModule(module => {
    module.exports = {default: isInteger, __esModule: true};
  });

  const _Number$isInteger = unwrapExports(isInteger$1);

  const objectWithoutProperties$1 = createCommonjsModule((module, exports) => {
    exports.__esModule = true;

    exports.default = function(obj, keys) {
      const target = {};

      for (const i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
      }

      return target;
    };
  });

  const _objectWithoutProperties$1 = unwrapExports(objectWithoutProperties$1);

  const _this$5;

  /**
   * Returns a new Array with elements appended to the one given.
   */
  const append = function(elements, array) {
    _newArrowCheck$1(this, _this$5);

    return [].concat(
      _toConsumableArray$1(array),
      _toConsumableArray$1(elements)
    );
  }.bind(undefined);

  const append$1 = Fun_6(append);

  const _this$1$1;

  /**
   * Returns input if it is an Array or returns a new Array with input inside if
   * it is not.
   */
  const convertIfNot = function(input) {
    _newArrowCheck$1(this, _this$1$1);

    return Array.isArray(input) ? input : [input];
  }.bind(undefined);

  const _this$3$1;

  /**
   * Returns true if given index is the last one or false otherwise.
   */
  const isLastIndex = function(array, index) {
    _newArrowCheck$1(this, _this$3$1);

    return index === array.length - 1;
  }.bind(undefined);

  const isLastIndex$1 = Fun_6(isLastIndex);

  const _this$2$1;

  /**
   * Returns 0 if current index is the last one, or returns next if it is not.
   */
  const cycleNext = function(array, currentIndex) {
    _newArrowCheck$1(this, _this$2$1);

    return isLastIndex$1(array, currentIndex) ? 0 : currentIndex + 1;
  }.bind(undefined);

  const cycleNext$1 = Fun_6(cycleNext);

  const _this$4$1;

  const getObjectLength = function(object) {
    _newArrowCheck$1(this, _this$4$1);

    return Math.max(..._toConsumableArray$1(_Object$keys(object))) + 1;
  }.bind(undefined);

  /**
   * Creates a new array using the given object
   * If all of its entries are array keys.
   *
   * (it could also have a property length with its size)
   */
  const fromObject = function(object) {
    _newArrowCheck$1(this, _this$4$1);

    return _Array$from(
      "length" in object
        ? object
        : _extends$1({}, object, {length: getObjectLength(object)})
    );
  }.bind(undefined);

  const _this$5$1;

  /**
   * Returns a new Array with the result of having inserted the given elements at
   * the specified index.
   */
  const insert = function(index, elements, array) {
    _newArrowCheck$1(this, _this$5$1);

    return [].concat(
      _toConsumableArray$1(array.slice(0, index)),
      _toConsumableArray$1(elements),
      _toConsumableArray$1(array.slice(index + 1))
    );
  }.bind(undefined);

  const insert$1 = Fun_6(insert);

  const _this$6;

  const isIntGreaterThan = function(number, other) {
    _newArrowCheck$1(this, _this$6);

    return _Number$isInteger(number) && number >= other;
  }.bind(undefined);

  /**
   * Returns true if the given string is an Array key or false otherwise.
   */
  const isKey = function(string) {
    _newArrowCheck$1(this, _this$6);

    return isIntGreaterThan(Number(string), 0);
  }.bind(undefined);

  const _this$7;

  /**
   * Returns true if an Array can be created from the given Object, or in other
   * words, if it has or not a length property, and the rest of its keys are Array
   * ones.
   */
  const isPossibleFromObject = function(_ref) {
    const length = _ref.length;

    let rest = _objectWithoutProperties$1(_ref, ["length"]);

    _newArrowCheck$1(this, _this$7);

    return _Object$keys(rest).every(isKey);
  }.bind(undefined);

  const _this$8;

  /**
   * Returns a new Array with elements prepended to the one given.
   */
  const prepend = function(elements, array) {
    _newArrowCheck$1(this, _this$8);

    return [].concat(
      _toConsumableArray$1(elements),
      _toConsumableArray$1(array)
    );
  }.bind(undefined);

  const prepend$1 = Fun_6(prepend);

  const _this$9;

  /**
   * Reduce the given array applying reduce function only to elements filtered.
   */
  const reduceIf = function(filter, reduce, resultInitial, array) {
    _newArrowCheck$1(this, _this$9);

    return array.reduce((result, element, index) => {
      _newArrowCheck$1(this, _this$9);

      return filter(element, index, result)
        ? reduce(result, element, index)
        : result;
    }, resultInitial);
  }.bind(undefined);

  const reduceIf$1 = Fun_6(reduceIf);

  const _this$10;

  /**
   * Reduce the given array applying reduce function while shouldProceed function
   * returns true.
   */
  const reduceWhile = function(shouldProceed, reduce, resultInitial, array) {
    _newArrowCheck$1(this, _this$10);

    let result = resultInitial;

    array.every((element, index) => {
      _newArrowCheck$1(this, _this$10);

      const proceed = shouldProceed(element, index, result);

      if (proceed) {
        result = reduce(result, element, index);
      }

      return proceed;
    });

    return result;
  }.bind(undefined);

  const reduceWhile$1 = Fun_6(reduceWhile);

  const _this$11;

  /**
   * Returns a new Array with the result of having removed the specified amount
   * (count) of elements at the given index.
   */
  const remove = function(index, count, array) {
    _newArrowCheck$1(this, _this$11);

    return [].concat(
      _toConsumableArray$1(array.slice(0, index)),
      _toConsumableArray$1(array.slice(index + count))
    );
  }.bind(undefined);

  const remove$1 = Fun_6(remove);

  const _this$12;

  /**
   * Returns a new Array with the given size (count) filled with the specified
   * element.
   */
  const repeat = function(count, element) {
    _newArrowCheck$1(this, _this$12);

    return [].concat(_toConsumableArray$1(Array(count))).map(() => {
      _newArrowCheck$1(this, _this$12);

      return element;
    });
  }.bind(undefined);

  const repeat$1 = Fun_6(repeat);

  const _this$13;

  /**
   * Returns a new Array with the result of having replaced the elements at the
   * given index with the ones specified.
   */
  const replace = function(index, elements, array) {
    _newArrowCheck$1(this, _this$13);

    return [].concat(
      _toConsumableArray$1(array.slice(0, index)),
      _toConsumableArray$1(elements),
      _toConsumableArray$1(array.slice(index + elements.length))
    );
  }.bind(undefined);

  const replace$1 = Fun_6(replace);

  const _this$14;

  /**
   * Returns an absolute index from a relative one.
   *
   * Relative indexes differ from absolute ones in that they can be negative and
   * in those cases it would be as simple as substracting them from the length of
   * the array from where they belong to obtain their absolute counterparts.
   */
  const resolveIndex = function(array, relativeIndex) {
    _newArrowCheck$1(this, _this$14);

    return relativeIndex < 0 ? array.length - relativeIndex : relativeIndex;
  }.bind(undefined);

  const resolveIndex$1 = Fun_6(resolveIndex);

  // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

  const $find = _arrayMethods(6);
  const KEY = "findIndex";
  let forced = true;
  // Shouldn't skip holes
  if (KEY in [])
    Array(1)[KEY](() => {
      forced = false;
    });
  _export(_export.P + _export.F * forced, "Array", {
    findIndex: function findIndex(callbackfn /* , that = undefined */) {
      return $find(
        this,
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined
      );
    }
  });
  _addToUnscopables(KEY);

  const Fun$2 = createCommonjsModule((module, exports) => {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.flip = flip;
    exports.constant = constant;
    exports.on = on;
    exports.compose = compose;
    exports.pipe = pipe;
    exports.curry = curry;
    // eslint-disable-line no-redeclare

    // Flips the order of the arguments to a function of two arguments.
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare

    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare

    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    function flip(f) {
      return function(b, a) {
        return f(a, b);
      };
    }

    // Returns its first argument and ignores its second.
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare
    // eslint-disable-line no-redeclare

    function constant(a) {
      return function() {
        return a;
      };
    }

    // The `on` function is used to change the domain of a binary operator.
    function on(o, f) {
      return function(x, y) {
        return o(f(x), f(y));
      };
    }

    function compose() {
      const _this = this;

      for (
        var _len = arguments.length, fns = Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        fns[_key] = arguments[_key];
      }

      // eslint-disable-line no-redeclare
      const len = fns.length - 1;
      return function(x) {
        let y = x;
        for (let _i = len; _i > -1; _i--) {
          y = fns[_i].call(_this, y);
        }
        return y;
      };
    }

    function pipe() {
      const _this2 = this;

      for (
        var _len2 = arguments.length, fns = Array(_len2), _key2 = 0;
        _key2 < _len2;
        _key2++
      ) {
        fns[_key2] = arguments[_key2];
      }

      // eslint-disable-line no-redeclare
      const len = fns.length - 1;
      return function(x) {
        let y = x;
        for (let _i2 = 0; _i2 <= len; _i2++) {
          y = fns[_i2].call(_this2, y);
        }
        return y;
      };
    }

    function curried(f, length, acc) {
      return function() {
        const combined = acc.concat(Array.prototype.slice.call(arguments));
        return combined.length >= length
          ? f.apply(this, combined)
          : curried(f, length, combined);
      };
    }

    function curry(f) {
      // eslint-disable-line no-redeclare
      return curried(f, f.length, []);
    }
  });

  unwrapExports(Fun$2);
  const Fun_1$1 = Fun$2.flip;
  const Fun_2$1 = Fun$2.constant;
  const Fun_3$1 = Fun$2.on;
  const Fun_4$1 = Fun$2.compose;
  const Fun_5$1 = Fun$2.pipe;
  const Fun_6$1 = Fun$2.curry;

  const _iterStep$1 = function(done, value) {
    return {value, done: !!done};
  };

  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  const es6_array_iterator$1 = _iterDefine$1(
    Array,
    "Array",
    function(iterated, kind) {
      this._t = _toIobject$1(iterated); // target
      this._i = 0; // next index
      this._k = kind; // kind
      // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
    },
    function() {
      const O = this._t;
      const kind = this._k;
      const index = this._i++;
      if (!O || index >= O.length) {
        this._t = undefined;
        return _iterStep$1(1);
      }
      if (kind == "keys") return _iterStep$1(0, index);
      if (kind == "values") return _iterStep$1(0, O[index]);
      return _iterStep$1(0, [index, O[index]]);
    },
    "values"
  );

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  _iterators$1.Arguments = _iterators$1.Array;

  const TO_STRING_TAG$1 = _wks$1("toStringTag");

  const DOMIterables$1 = (
    "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList," +
    "DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement," +
    "MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList," +
    "SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList," +
    "TextTrackList,TouchList"
  ).split(",");

  for (let i$1 = 0; i$1 < DOMIterables$1.length; i$1++) {
    const NAME$2 = DOMIterables$1[i$1];
    const Collection$1 = _global$1[NAME$2];
    const proto$1 = Collection$1 && Collection$1.prototype;
    if (proto$1 && !proto$1[TO_STRING_TAG$1])
      _hide$1(proto$1, TO_STRING_TAG$1, NAME$2);
    _iterators$1[NAME$2] = _iterators$1.Array;
  }

  const f$4 = _wks$1;

  const _wksExt = {
    f: f$4
  };

  const iterator = _wksExt.f("iterator");

  const iterator$1 = createCommonjsModule(module => {
    module.exports = {default: iterator, __esModule: true};
  });

  unwrapExports(iterator$1);

  const _meta = createCommonjsModule(module => {
    let META = _uid$1("meta");

    let setDesc = _objectDp$1.f;
    let id = 0;
    let isExtensible =
      Object.isExtensible ||
      function() {
        return true;
      };
    let FREEZE = !_fails$1(() => {
      return isExtensible(Object.preventExtensions({}));
    });
    let setMeta = function(it) {
      setDesc(it, META, {
        value: {
          i: `O${  ++id}`, // object ID
          w: {} // weak collections IDs
        }
      });
    };
    let fastKey = function(it, create) {
      // return primitive with prefix
      if (!_isObject$1(it))
        return typeof it === "symbol"
          ? it
          : (typeof it === "string" ? "S" : "P") + it;
      if (!_has$1(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return "F";
        // not necessary to add metadata
        if (!create) return "E";
        // add missing metadata
        setMeta(it);
        // return object ID
      }
      return it[META].i;
    };
    let getWeak = function(it, create) {
      if (!_has$1(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return true;
        // not necessary to add metadata
        if (!create) return false;
        // add missing metadata
        setMeta(it);
        // return hash weak collections IDs
      }
      return it[META].w;
    };
    // add metadata on freeze-family methods calling
    let onFreeze = function(it) {
      if (FREEZE && meta.NEED && isExtensible(it) && !_has$1(it, META))
        setMeta(it);
      return it;
    };
    var meta = (module.exports = {
      KEY: META,
      NEED: false,
      fastKey,
      getWeak,
      onFreeze
    });
  });
  const _meta_1 = _meta.KEY;
  const _meta_2 = _meta.NEED;
  const _meta_3 = _meta.fastKey;
  const _meta_4 = _meta.getWeak;
  const _meta_5 = _meta.onFreeze;

  const defineProperty$1 = _objectDp$1.f;
  const _wksDefine = function(name) {
    const $Symbol = _core$1.Symbol || (_core$1.Symbol = {});
    if (name.charAt(0) != "_" && !(name in $Symbol))
      defineProperty$1($Symbol, name, {value: _wksExt.f(name)});
  };

  // all enumerable object keys, includes symbols

  const _enumKeys = function(it) {
    const result = _objectKeys$1(it);
    const getSymbols = _objectGops.f;
    if (getSymbols) {
      const symbols = getSymbols(it);
      const isEnum = _objectPie.f;
      let i = 0;
      let key;
      while (symbols.length > i)
        if (isEnum.call(it, (key = symbols[i++]))) result.push(key);
    }
    return result;
  };

  // 7.2.2 IsArray(argument)

  const _isArray$1 =
    Array.isArray ||
    function isArray(arg) {
      return _cof$1(arg) == "Array";
    };

  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

  const hiddenKeys = _enumBugKeys$1.concat("length", "prototype");

  const f$5 =
    Object.getOwnPropertyNames ||
    function getOwnPropertyNames(O) {
      return _objectKeysInternal$1(O, hiddenKeys);
    };

  const _objectGopn = {
    f: f$5
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

  const gOPN = _objectGopn.f;
  const toString$2 = {}.toString;

  const windowNames =
    typeof window === "object" && window && Object.getOwnPropertyNames
      ? Object.getOwnPropertyNames(window)
      : [];

  const getWindowNames = function(it) {
    try {
      return gOPN(it);
    } catch (e) {
      return windowNames.slice();
    }
  };

  const f$6 = function getOwnPropertyNames(it) {
    return windowNames && toString$2.call(it) == "[object Window]"
      ? getWindowNames(it)
      : gOPN(_toIobject$1(it));
  };

  const _objectGopnExt = {
    f: f$6
  };

  const gOPD = Object.getOwnPropertyDescriptor;

  const f$7 = _descriptors$1
    ? gOPD
    : function getOwnPropertyDescriptor(O, P) {
        O = _toIobject$1(O);
        P = _toPrimitive$1(P, true);
        if (_ie8DomDefine$1)
          try {
            return gOPD(O, P);
          } catch (e) {
            /* empty */
          }
        if (_has$1(O, P))
          return _propertyDesc$1(!_objectPie.f.call(O, P), O[P]);
      };

  const _objectGopd = {
    f: f$7
  };

  // ECMAScript 6 symbols shim

  const META = _meta.KEY;

  const gOPD$1 = _objectGopd.f;
  const dP$3 = _objectDp$1.f;
  const gOPN$1 = _objectGopnExt.f;
  let $Symbol = _global$1.Symbol;
  const $JSON = _global$1.JSON;
  const _stringify = $JSON && $JSON.stringify;
  const PROTOTYPE$4 = "prototype";
  const HIDDEN = _wks$1("_hidden");
  const TO_PRIMITIVE = _wks$1("toPrimitive");
  const isEnum = {}.propertyIsEnumerable;
  const SymbolRegistry = _shared$1("symbol-registry");
  const AllSymbols = _shared$1("symbols");
  const OPSymbols = _shared$1("op-symbols");
  const ObjectProto$2 = Object[PROTOTYPE$4];
  const USE_NATIVE = typeof $Symbol === "function";
  const QObject = _global$1.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  let setter =
    !QObject || !QObject[PROTOTYPE$4] || !QObject[PROTOTYPE$4].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  const setSymbolDesc =
    _descriptors$1 &&
    _fails$1(() => (
        _objectCreate$1(
          dP$3({}, "a", {
            get: function() {
              return dP$3(this, "a", {value: 7}).a;
            }
          })
        ).a != 7
      ))
      ? function(it, key, D) {
          const protoDesc = gOPD$1(ObjectProto$2, key);
          if (protoDesc) delete ObjectProto$2[key];
          dP$3(it, key, D);
          if (protoDesc && it !== ObjectProto$2)
            dP$3(ObjectProto$2, key, protoDesc);
        }
      : dP$3;

  const wrap = function(tag) {
    const sym = (AllSymbols[tag] = _objectCreate$1($Symbol[PROTOTYPE$4]));
    sym._k = tag;
    return sym;
  };

  const isSymbol =
    USE_NATIVE && typeof $Symbol.iterator === "symbol"
      ? function(it) {
          return typeof it === "symbol";
        }
      : function(it) {
          return it instanceof $Symbol;
        };

  var $defineProperty = function defineProperty(it, key, D) {
    if (it === ObjectProto$2) $defineProperty(OPSymbols, key, D);
    _anObject$1(it);
    key = _toPrimitive$1(key, true);
    _anObject$1(D);
    if (_has$1(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!_has$1(it, HIDDEN)) dP$3(it, HIDDEN, _propertyDesc$1(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (_has$1(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
        D = _objectCreate$1(D, {enumerable: _propertyDesc$1(0, false)});
      }
      return setSymbolDesc(it, key, D);
    }
    return dP$3(it, key, D);
  };
  const $defineProperties = function defineProperties(it, P) {
    _anObject$1(it);
    const keys = _enumKeys((P = _toIobject$1(P)));
    let i = 0;
    const l = keys.length;
    let key;
    while (l > i) $defineProperty(it, (key = keys[i++]), P[key]);
    return it;
  };
  const $create = function create(it, P) {
    return P === undefined
      ? _objectCreate$1(it)
      : $defineProperties(_objectCreate$1(it), P);
  };
  const $propertyIsEnumerable = function propertyIsEnumerable(key) {
    const E = isEnum.call(this, (key = _toPrimitive$1(key, true)));
    if (
      this === ObjectProto$2 &&
      _has$1(AllSymbols, key) &&
      !_has$1(OPSymbols, key)
    )
      return false;
    return E ||
      !_has$1(this, key) ||
      !_has$1(AllSymbols, key) ||
      (_has$1(this, HIDDEN) && this[HIDDEN][key])
      ? E
      : true;
  };
  const $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
    it = _toIobject$1(it);
    key = _toPrimitive$1(key, true);
    if (
      it === ObjectProto$2 &&
      _has$1(AllSymbols, key) &&
      !_has$1(OPSymbols, key)
    )
      return;
    const D = gOPD$1(it, key);
    if (
      D &&
      _has$1(AllSymbols, key) &&
      !(_has$1(it, HIDDEN) && it[HIDDEN][key])
    )
      D.enumerable = true;
    return D;
  };
  const $getOwnPropertyNames = function getOwnPropertyNames(it) {
    const names = gOPN$1(_toIobject$1(it));
    const result = [];
    let i = 0;
    let key;
    while (names.length > i) {
      if (
        !_has$1(AllSymbols, (key = names[i++])) &&
        key != HIDDEN &&
        key != META
      )
        result.push(key);
    }
    return result;
  };
  const $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
    const IS_OP = it === ObjectProto$2;
    const names = gOPN$1(IS_OP ? OPSymbols : _toIobject$1(it));
    const result = [];
    let i = 0;
    let key;
    while (names.length > i) {
      if (
        _has$1(AllSymbols, (key = names[i++])) &&
        (IS_OP ? _has$1(ObjectProto$2, key) : true)
      )
        result.push(AllSymbols[key]);
    }
    return result;
  };

  // 19.4.1.1 Symbol([description])
  if (!USE_NATIVE) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol)
        throw TypeError("Symbol is not a constructor!");
      const tag = _uid$1(arguments.length > 0 ? arguments[0] : undefined);
      var $set = function(value) {
        if (this === ObjectProto$2) $set.call(OPSymbols, value);
        if (_has$1(this, HIDDEN) && _has$1(this[HIDDEN], tag))
          this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, _propertyDesc$1(1, value));
      };
      if (_descriptors$1 && setter)
        setSymbolDesc(ObjectProto$2, tag, {configurable: true, set: $set});
      return wrap(tag);
    };
    _redefine$1($Symbol[PROTOTYPE$4], "toString", function toString() {
      return this._k;
    });

    _objectGopd.f = $getOwnPropertyDescriptor;
    _objectDp$1.f = $defineProperty;
    _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
    _objectPie.f = $propertyIsEnumerable;
    _objectGops.f = $getOwnPropertySymbols;

    if (_descriptors$1 && !_library$1) {
      _redefine$1(
        ObjectProto$2,
        "propertyIsEnumerable",
        $propertyIsEnumerable,
        true
      );
    }

    _wksExt.f = function(name) {
      return wrap(_wks$1(name));
    };
  }

  _export$1(_export$1.G + _export$1.W + _export$1.F * !USE_NATIVE, {
    Symbol: $Symbol
  });

  for (
    let es6Symbols = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(
        // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
        ","
      ),
      j = 0;
    es6Symbols.length > j;

  )
    _wks$1(es6Symbols[j++]);

  for (
    let wellKnownSymbols = _objectKeys$1(_wks$1.store), k = 0;
    wellKnownSymbols.length > k;

  )
    _wksDefine(wellKnownSymbols[k++]);

  _export$1(_export$1.S + _export$1.F * !USE_NATIVE, "Symbol", {
    // 19.4.2.1 Symbol.for(key)
    for(key) {
      return _has$1(SymbolRegistry, (key += ""))
        ? SymbolRegistry[key]
        : (SymbolRegistry[key] = $Symbol(key));
    },
    // 19.4.2.5 Symbol.keyFor(sym)
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(`${sym} is not a symbol!`);
      for (const key in SymbolRegistry)
        if (SymbolRegistry[key] === sym) return key;
    },
    useSetter() {
      setter = true;
    },
    useSimple() {
      setter = false;
    }
  });

  _export$1(_export$1.S + _export$1.F * !USE_NATIVE, "Object", {
    // 19.1.2.2 Object.create(O [, Properties])
    create: $create,
    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
    defineProperty: $defineProperty,
    // 19.1.2.3 Object.defineProperties(O, Properties)
    defineProperties: $defineProperties,
    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: $getOwnPropertyNames,
    // 19.1.2.8 Object.getOwnPropertySymbols(O)
    getOwnPropertySymbols: $getOwnPropertySymbols
  });

  // 24.3.2 JSON.stringify(value [, replacer [, space]])
  $JSON &&
    _export$1(
      _export$1.S +
        _export$1.F *
          (!USE_NATIVE ||
            _fails$1(() => {
              const S = $Symbol();
              // MS Edge converts symbol values to JSON as {}
              // WebKit converts symbol values to JSON as null
              // V8 throws on boxed symbols
              return (
                _stringify([S]) != "[null]" ||
                _stringify({a: S}) != "{}" ||
                _stringify(Object(S)) != "{}"
              );
            })),
      "JSON",
      {
        stringify: function stringify(it) {
          if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
          const args = [it];
          let i = 1;
          let replacer;
          let $replacer;
          while (arguments.length > i) args.push(arguments[i++]);
          replacer = args[1];
          if (typeof replacer === "function") $replacer = replacer;
          if ($replacer || !_isArray$1(replacer))
            replacer = function(key, value) {
              if ($replacer) value = $replacer.call(this, key, value);
              if (!isSymbol(value)) return value;
            };
          args[1] = replacer;
          return _stringify.apply($JSON, args);
        }
      }
    );

  // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
  $Symbol[PROTOTYPE$4][TO_PRIMITIVE] ||
    _hide$1($Symbol[PROTOTYPE$4], TO_PRIMITIVE, $Symbol[PROTOTYPE$4].valueOf);
  // 19.4.3.5 Symbol.prototype[@@toStringTag]
  _setToStringTag$1($Symbol, "Symbol");
  // 20.2.1.9 Math[@@toStringTag]
  _setToStringTag$1(Math, "Math", true);
  // 24.3.3 JSON[@@toStringTag]
  _setToStringTag$1(_global$1.JSON, "JSON", true);

  _wksDefine("asyncIterator");

  _wksDefine("observable");

  const symbol = _core$1.Symbol;

  const symbol$1 = createCommonjsModule(module => {
    module.exports = {default: symbol, __esModule: true};
  });

  const _Symbol = unwrapExports(symbol$1);

  const _typeof_1 = createCommonjsModule((module, exports) => {
    exports.__esModule = true;

    let _iterator2 = _interopRequireDefault(iterator$1);

    let _symbol2 = _interopRequireDefault(symbol$1);

    let _typeof =
      typeof _symbol2.default === "function" &&
      typeof _iterator2.default === "symbol"
        ? function(obj) {
            return typeof obj;
          }
        : function(obj) {
            return obj &&
              typeof _symbol2.default === "function" &&
              obj.constructor === _symbol2.default &&
              obj !== _symbol2.default.prototype
              ? "symbol"
              : typeof obj;
          };

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }

    exports.default =
      typeof _symbol2.default === "function" &&
      _typeof(_iterator2.default) === "symbol"
        ? function(obj) {
            return typeof obj === "undefined" ? "undefined" : _typeof(obj);
          }
        : function(obj) {
            return obj &&
              typeof _symbol2.default === "function" &&
              obj.constructor === _symbol2.default &&
              obj !== _symbol2.default.prototype
              ? "symbol"
              : typeof obj === "undefined"
              ? "undefined"
              : _typeof(obj);
          };
  });

  const _typeof = unwrapExports(_typeof_1);

  const fastDeepEqual = function equal(a, b) {
    if (a === b) return true;

    const arrA = Array.isArray(a);

    var arrB = Array.isArray(b);

    var i;

    if (arrA && arrB) {
      if (a.length != b.length) return false;
      for (i = 0; i < a.length; i++) if (!equal(a[i], b[i])) return false;
      return true;
    }

    if (arrA != arrB) return false;

    if (a && b && typeof a === "object" && typeof b === "object") {
      const keys = Object.keys(a);
      if (keys.length !== Object.keys(b).length) return false;

      const dateA = a instanceof Date;

      var dateB = b instanceof Date;
      if (dateA && dateB) return a.getTime() == b.getTime();
      if (dateA != dateB) return false;

      const regexpA = a instanceof RegExp;

      var regexpB = b instanceof RegExp;
      if (regexpA && regexpB) return a.toString() == b.toString();
      if (regexpA != regexpB) return false;

      for (i = 0; i < keys.length; i++)
        if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

      for (i = 0; i < keys.length; i++)
        if (!equal(a[keys[i]], b[keys[i]])) return false;

      return true;
    }

    return false;
  };

  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
  _export$1(_export$1.S + _export$1.F * !_descriptors$1, "Object", {
    defineProperty: _objectDp$1.f
  });

  const $Object = _core$1.Object;
  const defineProperty$2 = function defineProperty(it, key, desc) {
    return $Object.defineProperty(it, key, desc);
  };

  const defineProperty$3 = createCommonjsModule(module => {
    module.exports = {default: defineProperty$2, __esModule: true};
  });

  unwrapExports(defineProperty$3);

  const defineProperty$5 = createCommonjsModule((module, exports) => {
    exports.__esModule = true;

    let _defineProperty2 = _interopRequireDefault(defineProperty$3);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }

    exports.default = function(obj, key, value) {
      if (key in obj) {
        (0, _defineProperty2.default)(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    };
  });

  const _defineProperty$1 = unwrapExports(defineProperty$5);

  const ITERATOR$6 = _wks$1("iterator");

  const core_isIterable = (_core$1.isIterable = function(it) {
    const O = Object(it);
    return (
      O[ITERATOR$6] !== undefined ||
      "@@iterator" in O ||
      // eslint-disable-next-line no-prototype-builtins
      _iterators$1.hasOwnProperty(_classof(O))
    );
  });

  const isIterable = core_isIterable;

  const isIterable$1 = createCommonjsModule(module => {
    module.exports = {default: isIterable, __esModule: true};
  });

  unwrapExports(isIterable$1);

  const core_getIterator = (_core$1.getIterator = function(it) {
    const iterFn = core_getIteratorMethod(it);
    if (typeof iterFn !== "function") throw TypeError(`${it} is not iterable!`);
    return _anObject$1(iterFn.call(it));
  });

  const getIterator = core_getIterator;

  const getIterator$1 = createCommonjsModule(module => {
    module.exports = {default: getIterator, __esModule: true};
  });

  unwrapExports(getIterator$1);

  const slicedToArray = createCommonjsModule((module, exports) => {
    exports.__esModule = true;

    let _isIterable3 = _interopRequireDefault(isIterable$1);

    let _getIterator3 = _interopRequireDefault(getIterator$1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }

    exports.default = (function() {
      function sliceIterator(arr, i) {
        const _arr = [];
        let _n = true;
        let _d = false;
        let _e;

        try {
          for (
            var _i = (0, _getIterator3.default)(arr), _s;
            !(_n = (_s = _i.next()).done);
            _n = true
          ) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i.return) _i.return();
          } finally {
            if (_d) throw _e;
          }
        }

        return _arr;
      }

      return function(arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } if ((0, _isIterable3.default)(Object(arr))) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        }
      };
    })();
  });

  const _slicedToArray = unwrapExports(slicedToArray);

  const isEnum$1 = _objectPie.f;
  const _objectToArray = function(isEntries) {
    return function(it) {
      const O = _toIobject$1(it);
      const keys = _objectKeys$1(O);
      const length = keys.length;
      let i = 0;
      const result = [];
      let key;
      while (length > i)
        if (isEnum$1.call(O, (key = keys[i++]))) {
          result.push(isEntries ? [key, O[key]] : O[key]);
        }
      return result;
    };
  };

  // https://github.com/tc39/proposal-object-values-entries

  const $entries = _objectToArray(true);

  _export$1(_export$1.S, "Object", {
    entries: function entries(it) {
      return $entries(it);
    }
  });

  const entries = _core$1.Object.entries;

  const entries$1 = createCommonjsModule(module => {
    module.exports = {default: entries, __esModule: true};
  });

  const _Object$entries = unwrapExports(entries$1);

  let _this$a = void 0;

  var get = function(e, r) {
    return _newArrowCheck$1(this, _this$a), r[e];
  }.bind(void 0);

  var get$1 = Fun_6$1(get);

  var _this$2$2 = void 0;

  var isObject = function(e) {
    return (
      _newArrowCheck$1(this, _this$2$2),
      e !== null && (void 0 === e ? "undefined" : _typeof(e)) === "object"
    );
  }.bind(void 0);

  var is$2 = function(e) {
    return _newArrowCheck$1(this, _this$2$2), Array.isArray(e) || isObject(e);
  }.bind(void 0);

  var _this$1$2 = void 0;

  var getInIfNeeded = function(e, r, t) {
    return (
      _newArrowCheck$1(this, _this$1$2),
      isLastIndex$1(r, e) ? t : getInRecur(e + 1, r, t)
    );
  }.bind(void 0);

  var getNotCompositeErrorMessage = function(e, r, t) {
    return (
      _newArrowCheck$1(this, _this$1$2),
      `Expected to find a composite at [${ 
          String(r.join(", ")) 
          }][${ 
          String(e) 
          }], but instead got: ${ 
          void 0 === t ? "undefined" : _typeof(t)}`
    );
  }.bind(void 0);

  var ensureIsComposite = function(e, r, t) {
    if ((_newArrowCheck$1(this, _this$1$2), is$2(t))) return t;
    throw new Error(getNotCompositeErrorMessage(e, r, t));
  }.bind(void 0);

  var getInRecur = function(e, r, t) {
    return (
      _newArrowCheck$1(this, _this$1$2),
      void 0 === t
        ? void 0
        : getInIfNeeded(e, r, get$1(r[e], ensureIsComposite(e, r, t)))
    );
  }.bind(void 0);

  var getIn = function(e, r) {
    return (
      _newArrowCheck$1(this, _this$1$2),
      e.length === 0 ? void 0 : getInRecur(0, e, r)
    );
  }.bind(void 0);

  var getIn$1 = Fun_6$1(getIn);

  var _this$3$2 = void 0;

  var getKeys = function(e) {
    return (
      _newArrowCheck$1(this, _this$3$2),
      Array.isArray(e)
        ? [].concat(_toConsumableArray$1(e.keys()))
        : _Object$keys(e)
    );
  }.bind(void 0);

  var _this$4$2 = void 0;

  var hasIn = function(e, r, t) {
    return _newArrowCheck$1(this, _this$4$2), fastDeepEqual(getIn$1(e, t), r);
  }.bind(void 0);

  var hasIn$1 = Fun_6$1(hasIn);

  var _this$5$2 = void 0;

  var hasKey = function(e, r) {
    return (
      _newArrowCheck$1(this, _this$5$2),
      Object.prototype.hasOwnProperty.call(r, e)
    );
  }.bind(void 0);

  var hasKey$1 = Fun_6$1(hasKey);

  var _this$6$1 = void 0;

  var haveSameProps = function(e, r) {
    _newArrowCheck$1(this, _this$6$1);
    var t = getKeys(e);
    return (
      t.length === getKeys(r).length &&
      t.every(
        function(t) {
          return (
            _newArrowCheck$1(this, _this$6$1),
            hasKey$1(t, r) && get$1(t, e) === get$1(t, r)
          );
        }.bind(this)
      )
    );
  }.bind(void 0);

  var haveSameProps$1 = Fun_6$1(haveSameProps);

  var _this$7$1 = void 0;

  var isEmpty = function(e) {
    return _newArrowCheck$1(this, _this$7$1), getKeys(e).length === 0;
  }.bind(void 0);

  var _this$8$1 = void 0;

  var mapObject = function(e, r) {
    return (
      _newArrowCheck$1(this, _this$8$1),
      _Object$entries(r).reduce(
        function(t, i) {
          var n = _slicedToArray(i, 2);

              
var o = n[0];

              
var s = n[1];
          return (
            _newArrowCheck$1(this, _this$8$1),
            _extends$1({}, t, _defineProperty$1({}, o, e(s, o, r)))
          );
        }.bind(this),
        {}
      )
    );
  }.bind(void 0);

  var map = function(e, r) {
    return (
      _newArrowCheck$1(this, _this$8$1),
      Array.isArray(r) ? r.map(e) : mapObject(e, r)
    );
  }.bind(void 0);

  var map$1 = Fun_6$1(map);

  var _this$9$1 = void 0;

  var objectRemove = function(e, r) {
    r[e];
    var t = _objectWithoutProperties$1(r, [e]);
    return _newArrowCheck$1(this, _this$9$1), t;
  }.bind(void 0);

  var remove$1$1 = function(e, r) {
    return (
      _newArrowCheck$1(this, _this$9$1),
      Array.isArray(r) ? remove$1(e, 1, r) : objectRemove(e, r)
    );
  }.bind(void 0);

  var remove$2 = Fun_6$1(remove$1$1);

  var _this$12$1 = void 0;

  var shallowCopy = function(e) {
    return (
      _newArrowCheck$1(this, _this$12$1),
      Array.isArray(e) ? [].concat(_toConsumableArray$1(e)) : _extends$1({}, e)
    );
  }.bind(void 0);

  var _this$11$1 = void 0;

  var createReduceContext = function(e) {
    _newArrowCheck$1(this, _this$11$1);
    var r = shallowCopy(e);
    return {origin: r, current: r, previous: void 0};
  }.bind(void 0);

  var set = function(e, r, t) {
    return _newArrowCheck$1(this, _this$11$1), (t[e] = r), get$1(e, t);
  }.bind(void 0);

  var updateSet = function(e, r, t, i) {
    return (
      _newArrowCheck$1(this, _this$11$1),
      _extends$1({}, i, {
        current: set(e[r], t, i.current),
        previous: i.current
      })
    );
  }.bind(void 0);

  var updateRemove = function(e, r, t) {
    _newArrowCheck$1(this, _this$11$1);
    let i = remove$2(e[r], t.current);
    return r === 0
      ? _extends$1({}, t, {current: i, origin: i})
      : _extends$1({}, t, {previous: set(e[r - 1], i, t.previous)});
  }.bind(void 0);

  var removeAction = _Symbol("composite.updateIn.removeAction");

  var update = function(e, r, t, i) {
    return (
      _newArrowCheck$1(this, _this$11$1),
      t === removeAction ? updateRemove(e, r, i) : updateSet(e, r, t, i)
    );
  }.bind(void 0);

  var createSupporting = function(e) {
    return _newArrowCheck$1(this, _this$11$1), typeof e == "number" ? [] : {};
  }.bind(void 0);

  var copyOrCreate = function(e, r, t) {
    return (
      _newArrowCheck$1(this, _this$11$1),
      hasKey$1(e, t) ? shallowCopy(get$1(e, t)) : createSupporting(r)
    );
  }.bind(void 0);

  var getNext = function(e, r, t, i) {
    return (
      _newArrowCheck$1(this, _this$11$1),
      isLastIndex$1(e, t) ? r(get$1(e[t], i)) : copyOrCreate(e[t], e[t + 1], i)
    );
  }.bind(void 0);

  var getReducer = function(e, r) {
    return (
      _newArrowCheck$1(this, _this$11$1),
      function(t, i, n) {
        return (
          _newArrowCheck$1(this, _this$11$1),
          update(e, n, getNext(e, r, n, t.current), t)
        );
      }.bind(this)
    );
  }.bind(void 0);

  var updateIn = function(e, r, t) {
    return (
      _newArrowCheck$1(this, _this$11$1),
      0 === e.length
        ? t
        : e.reduce(getReducer(e, r), createReduceContext(t)).origin
    );
  }.bind(void 0);

  var updateInCurried = Fun_6$1(updateIn);
  updateInCurried.remove = removeAction;
  const _this$10$1 = void 0;

  var remove$3 = function() {
    return _newArrowCheck$1(this, _this$10$1), updateInCurried.remove;
  }.bind(void 0);

  var removeIn = function(e, r) {
    return _newArrowCheck$1(this, _this$10$1), updateInCurried(e, remove$3, r);
  }.bind(void 0);

  var removeIn$1 = Fun_6$1(removeIn);

  var _this$13$1 = void 0;

  var set$1 = function(e, r, t) {
    _newArrowCheck$1(this, _this$13$1);
    var i = shallowCopy(t);
    return (i[e] = r), i;
  }.bind(void 0);

  var set$2 = Fun_6$1(set$1);

  var _this$14$1 = void 0;

  var setIn = function(e, r, t) {
    return (
      _newArrowCheck$1(this, _this$14$1),
      updateInCurried(
        e,
        function() {
          return _newArrowCheck$1(this, _this$14$1), r;
        }.bind(this),
        t
      )
    );
  }.bind(void 0);

  var setIn$1 = Fun_6$1(setIn);

  var _this$15 = void 0;

  var xor = function(e, r) {
    return _newArrowCheck$1(this, _this$15), Boolean(Number(e) ^ Number(r));
  }.bind(void 0);

  var shallowEqual = function(e, r) {
    return (
      _newArrowCheck$1(this, _this$15),
      e === r ||
        (!xor(Array.isArray(e), Array.isArray(r)) && haveSameProps$1(e, r))
    );
  }.bind(void 0);

  var shallowEqual$1 = Fun_6$1(shallowEqual);

  var _this$16 = void 0;

  var toUndefinedIfEmpty = function(e) {
    return _newArrowCheck$1(this, _this$16), isEmpty(e) ? void 0 : e;
  }.bind(void 0);

  const _this$b;

  const findIndex = function findIndex(
    notifiers,
    key,
    value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
  ) {
    newArrowCheck(this, _this$b);

    return notifiers.findIndex(hasIn$1([key], value));
  }.bind(undefined);

  const _this$c;

  const refresh = function refresh(notifier) {
    const _this2 = this;

    newArrowCheck(this, _this$c);

    return function(notifiers) {
      newArrowCheck(this, _this2);

      return replace$1(
        findIndex(notifiers, "request", notifier.request),
        [notifier],
        notifiers
      );
    }.bind(this);
  }.bind(undefined);

  const _this$d;

  const remove$4 = function remove$$1(notifier) {
    const _this2 = this;

    newArrowCheck(this, _this$d);

    return function(notifiers) {
      newArrowCheck(this, _this2);

      return remove$1(
        findIndex(notifiers, "request", notifier.request),
        1,
        notifiers
      );
    }.bind(this);
  }.bind(undefined);

  const _this$e;

  const updateNotifiers = function updateNotifiers(absintheSocket, updater) {
    newArrowCheck(this, _this$e);

    absintheSocket.notifiers = updater(absintheSocket.notifiers);
    return absintheSocket;
  }.bind(undefined);

  const _this$f;

  const refreshNotifier = function refreshNotifier(absintheSocket, notifier) {
    newArrowCheck(this, _this$f);

    updateNotifiers(absintheSocket, refresh(notifier));
    return notifier;
  }.bind(undefined);

  const requestStatuses = {
    canceled: "canceled",
    canceling: "canceling",
    pending: "pending",
    sent: "sent",
    sending: "sending"
  };

  const $map = _arrayMethods(1);

  _export(_export.P + _export.F * !_strictMethod([].map, true), "Array", {
    // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments[1]);
    }
  });

  // true  -> String#at
  // false -> String#codePointAt
  const _stringAt$1 = function(TO_STRING) {
    return function(that, pos) {
      const s = String(_defined(that));
      const i = _toInteger(pos);
      const l = s.length;
      let a;
      let b;
      if (i < 0 || i >= l) return TO_STRING ? "" : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 ||
        a > 0xdbff ||
        i + 1 === l ||
        (b = s.charCodeAt(i + 1)) < 0xdc00 ||
        b > 0xdfff
        ? TO_STRING
          ? s.charAt(i)
          : a
        : TO_STRING
        ? s.slice(i, i + 2)
        : ((a - 0xd800) << 10) + (b - 0xdc00) + 0x10000;
    };
  };

  const at = _stringAt$1(true);

  // `AdvanceStringIndex` abstract operation
  // https://tc39.github.io/ecma262/#sec-advancestringindex
  const _advanceStringIndex = function(S, index, unicode) {
    return index + (unicode ? at(S, index).length : 1);
  };

  // getting tag from 19.1.3.6 Object.prototype.toString()

  const TAG$3 = _wks("toStringTag");
  // ES3 wrong here
  const ARG$1 =
    _cof(
      (function() {
        return arguments;
      })()
    ) == "Arguments";

  // fallback for IE11 Script Access Denied error
  const tryGet$1 = function(it, key) {
    try {
      return it[key];
    } catch (e) {
      /* empty */
    }
  };

  const _classof$1 = function(it) {
    let O;
    let T;
    let B;
    return it === undefined
      ? "Undefined"
      : it === null
      ? "Null"
      : // @@toStringTag case
      typeof (T = tryGet$1((O = Object(it)), TAG$3)) === "string"
      ? T
      : // builtinTag case
      ARG$1
      ? _cof(O)
      : // ES3 arguments fallback
      (B = _cof(O)) == "Object" && typeof O.callee === "function"
      ? "Arguments"
      : B;
  };

  const builtinExec = RegExp.prototype.exec;

  // `RegExpExec` abstract operation
  // https://tc39.github.io/ecma262/#sec-regexpexec
  const _regexpExecAbstract = function(R, S) {
    const exec = R.exec;
    if (typeof exec === "function") {
      const result = exec.call(R, S);
      if (typeof result !== "object") {
        throw new TypeError(
          "RegExp exec method returned something other than an Object or null"
        );
      }
      return result;
    }
    if (_classof$1(R) !== "RegExp") {
      throw new TypeError("RegExp#exec called on incompatible receiver");
    }
    return builtinExec.call(R, S);
  };

  // 21.2.5.3 get RegExp.prototype.flags

  const _flags = function() {
    const that = _anObject(this);
    let result = "";
    if (that.global) result += "g";
    if (that.ignoreCase) result += "i";
    if (that.multiline) result += "m";
    if (that.unicode) result += "u";
    if (that.sticky) result += "y";
    return result;
  };

  const nativeExec = RegExp.prototype.exec;
  // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.
  const nativeReplace = String.prototype.replace;

  let patchedExec = nativeExec;

  const LAST_INDEX = "lastIndex";

  const UPDATES_LAST_INDEX_WRONG = (function() {
    const re1 = /a/;

    let re2 = /b*/g;
    nativeExec.call(re1, "a");
    nativeExec.call(re2, "a");
    return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
  })();

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  const NPCG_INCLUDED = /()??/.exec("")[1] !== undefined;

  const PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

  if (PATCH) {
    patchedExec = function exec(str) {
      const re = this;
      let lastIndex;
      let reCopy;
      let match;
      let i;

      if (NPCG_INCLUDED) {
        reCopy = new RegExp(`^${re.source}$(?!\\s)`, _flags.call(re));
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

      match = nativeExec.call(re, str);

      if (UPDATES_LAST_INDEX_WRONG && match) {
        re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        // eslint-disable-next-line no-loop-func
        nativeReplace.call(match[0], reCopy, function() {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  const _regexpExec = patchedExec;

  _export(
    {
      target: "RegExp",
      proto: true,
      forced: _regexpExec !== /./.exec
    },
    {
      exec: _regexpExec
    }
  );

  const SPECIES$1 = _wks("species");

  const REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(() => {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    const re = /./;
    re.exec = function() {
      const result = [];
      result.groups = {a: "7"};
      return result;
    };
    return "".replace(re, "$<a>") !== "7";
  });

  const SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function() {
    // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
    const re = /(?:)/;
    const originalExec = re.exec;
    re.exec = function() {
      return originalExec.apply(this, arguments);
    };
    const result = "ab".split(re);
    return result.length === 2 && result[0] === "a" && result[1] === "b";
  })();

  const _fixReWks = function(KEY, length, exec) {
    const SYMBOL = _wks(KEY);

    const DELEGATES_TO_SYMBOL = !_fails(() => {
      // String methods call symbol-named RegEp methods
      const O = {};
      O[SYMBOL] = function() {
        return 7;
      };
      return ""[KEY](O) != 7;
    });

    const DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL
      ? !_fails(() => {
          // Symbol-named RegExp methods call .exec
          let execCalled = false;
          const re = /a/;
          re.exec = function() {
            execCalled = true;
            return null;
          };
          if (KEY === "split") {
            // RegExp[@@split] doesn't call the regex's exec method, but first creates
            // a new one. We need to return the patched regex when creating the new one.
            re.constructor = {};
            re.constructor[SPECIES$1] = function() {
              return re;
            };
          }
          re[SYMBOL]("");
          return !execCalled;
        })
      : undefined;

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      (KEY === "replace" && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
      (KEY === "split" && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
    ) {
      const nativeRegExpMethod = /./[SYMBOL];
      const fns = exec(
        _defined,
        SYMBOL,
        ""[KEY],
        (nativeMethod, regexp, str, arg2, forceStringMethod) => {
          if (regexp.exec === _regexpExec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              // The native String method already delegates to @@method (this
              // polyfilled function), leasing to infinite recursion.
              // We avoid it by directly calling the native @@method method.
              return {
                done: true,
                value: nativeRegExpMethod.call(regexp, str, arg2)
              };
            }
            return {done: true, value: nativeMethod.call(str, regexp, arg2)};
          }
          return {done: false};
        }
      );
      const strfn = fns[0];
      const rxfn = fns[1];

      _redefine(String.prototype, KEY, strfn);
      _hide(
        RegExp.prototype,
        SYMBOL,
        length == 2
          ? // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
            // 21.2.5.11 RegExp.prototype[@@split](string, limit)
            function(string, arg) {
              return rxfn.call(string, this, arg);
            }
          : // 21.2.5.6 RegExp.prototype[@@match](string)
            // 21.2.5.9 RegExp.prototype[@@search](string)
            function(string) {
              return rxfn.call(string, this);
            }
      );
    }
  };

  // @@match logic
  _fixReWks("match", 1, (defined, MATCH, $match, maybeCallNative) => [
      // `String.prototype.match` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = defined(this);
        let fn = regexp == undefined ? undefined : regexp[MATCH];
        return fn !== undefined
          ? fn.call(regexp, O)
          : new RegExp(regexp)[MATCH](String(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
      function(regexp) {
        var res = maybeCallNative($match, regexp, this);
        if (res.done) return res.value;
        let rx = _anObject(regexp);
        let S = String(this);
        if (!rx.global) return _regexpExecAbstract(rx, S);
        let fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        let A = [];
        let n = 0;
        let result;
        while ((result = _regexpExecAbstract(rx, S)) !== null) {
          let matchStr = String(result[0]);
          A[n] = matchStr;
          if (matchStr === "")
            rx.lastIndex = _advanceStringIndex(
              S,
              _toLength(rx.lastIndex),
              fullUnicode
            );
          n++;
        }
        return n === 0 ? null : A;
      }
    ]);

  const $some = _arrayMethods(3);

  _export(_export.P + _export.F * !_strictMethod([].some, true), "Array", {
    // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
    some: function some(callbackfn /* , thisArg */) {
      return $some(this, callbackfn, arguments[1]);
    }
  });

  const _this$g;

  const locationsToString = function locationsToString(locations) {
    const _this2 = this;

    newArrowCheck(this, _this$g);

    return locations
      .map(_ref => {
        const column = _ref.column;

        var line = _ref.line;

        newArrowCheck(this, _this2);

        return "".concat(line, ":").concat(column);
      })
      .join("; ");
  }.bind(undefined);

  const errorToString = function errorToString(_ref2) {
    const message = _ref2.message;

    let locations = _ref2.locations;

    newArrowCheck(this, _this$g);

    return (
      message +
      (locations ? " (".concat(locationsToString(locations), ")") : "")
    );
  }.bind(undefined);
  /**
   * Transforms an array of GqlError into a string.
   *
   * @example
   *
   * const gqlRespose = {
   *   errors: [
   *     {message: "First Error", locations: [{column: 10, line: 2}]},
   *     {message: "Second Error", locations: [{column: 2, line: 4}]}
   *   ]
   * }
   *
   * const error = errorsToString(gqlRespose.errors);
   * // string with the following:
   * // First Error (2:10)
   * // Second Error (4:2)
   */

  const errorsToString = function errorsToString(gqlErrors) {
    newArrowCheck(this, _this$g);

    return gqlErrors.map(errorToString).join("\n");
  }.bind(undefined);

  const _this$1$3;

  const operationTypeRe = /^\s*(query|mutation|subscription|\{)/;

  const getOperationTypeFromMatched = function getOperationTypeFromMatched(
    matched
  ) {
    newArrowCheck(this, _this$1$3);

    return matched === "{" ? "query" : matched;
  }.bind(undefined);
  /**
   * Returns the type (query, mutation, or subscription) of the given operation
   *
   * @example
   *
   * const operation = `
   *   subscription userSubscription($userId: ID!) {
   *     user(userId: $userId) {
   *       id
   *       name
   *     }
   *   }
   * `;
   *
   * const operationType = getOperationType(operation);
   *
   * console.log(operationType); // "subscription"
   */

  const getOperationType = function getOperationType(operation) {
    newArrowCheck(this, _this$1$3);

    const result = operation.match(operationTypeRe);

    if (!result) {
      throw new TypeError("Invalid operation:\n".concat(operation));
    }

    return getOperationTypeFromMatched(result[1]);
  }.bind(undefined);

  const _this$2$3;

  const isSubscription = function isSubscription(definition) {
    newArrowCheck(this, _this$2$3);

    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  }.bind(undefined);
  /**
   * Returns true if documentNode has a subscription or false otherwise
   */

  const hasSubscription = function hasSubscription(documentNode) {
    newArrowCheck(this, _this$2$3);

    return documentNode.definitions.some(isSubscription);
  }.bind(undefined);

  const _this$3$3;

  /**
   * Creates a GqlRequest using given GqlRequestCompat
   *
   * @param {GqlRequestCompat<Variables>} gqlRequestCompat
   *
   * @return {GqlRequest<Variables>}
   *
   * @example
   * const query = `
   *   query userQuery($userId: ID!) {
   *     user(userId: $userId) {
   *       id
   *       email
   *     }
   *   }
   * `;
   *
   * console.log(requestFromCompat({query, variables: {userId: 10}}));
   * // {operation: "...", variables: {userId: 10}}
   */
  const requestFromCompat = function requestFromCompat(_ref) {
    const operation = _ref.query;

    let variables = _ref.variables;

    newArrowCheck(this, _this$3$3);

    return variables
      ? {
          operation,
          variables
        }
      : {
          operation
        };
  }.bind(undefined);

  const _this$4$3;

  /**
   * Creates a GqlRequest using given GqlRequestCompat
   *
   * @param {GqlRequest<Variables>} gqlRequest
   *
   * @return {GqlRequestCompat<Variables>}
   *
   * @example
   * const operation = `
   *   query userQuery($userId: ID!) {
   *     user(userId: $userId) {
   *       id
   *       email
   *     }
   *   }
   * `;
   *
   * console.log(requestToCompat({operation, variables: {userId: 10}}));
   * // {query: "...", variables: {userId: 10}}
   */
  const requestToCompat = function requestToCompat(_ref) {
    const query = _ref.operation;

    let variables = _ref.variables;

    newArrowCheck(this, _this$4$3);

    return variables
      ? {
          query,
          variables
        }
      : {
          query
        };
  }.bind(undefined);

  const _this$h;

  const getObservers = function getObservers(_ref) {
    const activeObservers = _ref.activeObservers;

    let canceledObservers = _ref.canceledObservers;

    newArrowCheck(this, _this$h);

    return toConsumableArray(activeObservers).concat(
      toConsumableArray(canceledObservers)
    );
  }.bind(undefined);

  const notify = function notify(notifier, event) {
    newArrowCheck(this, _this$h);

    notifyAll(getObservers(notifier), event);
    return notifier;
  }.bind(undefined);

  const _this$i;

  const abortNotifier = function abortNotifier(absintheSocket, notifier, error) {
    newArrowCheck(this, _this$i);

    return updateNotifiers(
      absintheSocket,
      remove$4(notify(notifier, createAbortEvent(error)))
    );
  }.bind(undefined);

  // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

  const $find$1 = _arrayMethods(5);
  const KEY$1 = "find";
  let forced$1 = true;
  // Shouldn't skip holes
  if (KEY$1 in [])
    Array(1)[KEY$1](() => {
      forced$1 = false;
    });
  _export(_export.P + _export.F * forced$1, "Array", {
    find: function find(callbackfn /* , that = undefined */) {
      return $find$1(
        this,
        callbackfn,
        arguments.length > 1 ? arguments[1] : undefined
      );
    }
  });
  _addToUnscopables(KEY$1);

  const _this$j;

  const find = function find(
    notifiers,
    key,
    value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
  ) {
    newArrowCheck(this, _this$j);

    return notifiers.find(hasIn$1([key], value));
  }.bind(undefined);

  const _this$k;

  const notifyActive = function notifyActive(notifier, event) {
    newArrowCheck(this, _this$k);

    notifyAll(notifier.activeObservers, event);
    return notifier;
  }.bind(undefined);

  const _this$l;

  const notifyResultEvent = function notifyResultEvent(notifier, result) {
    newArrowCheck(this, _this$l);

    return notifyActive(notifier, createResultEvent(result));
  }.bind(undefined);

  const _this$m;

  const notifyStartEvent = function notifyStartEvent(notifier) {
    newArrowCheck(this, _this$m);

    return notifyActive(notifier, createStartEvent(notifier));
  }.bind(undefined);

  const _this$n;

  const reset = function reset(notifier) {
    newArrowCheck(this, _this$n);

    return flushCanceled(
      objectSpread({}, notifier, {
        isActive: true,
        requestStatus: requestStatuses.pending,
        subscriptionId: undefined
      })
    );
  }.bind(undefined);

  const phoenix = createCommonjsModule((module, exports) => {
    !(function(e, t) {
      module.exports = t();
    })(commonjsGlobal, () => {
      return (function(e) {
        var t = {};
        function n(i) {
          if (t[i]) return t[i].exports;
          var o = (t[i] = {i: i, l: !1, exports: {}});
          return e[i].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
        }
        return (
          (n.m = e),
          (n.c = t),
          (n.d = function(e, t, i) {
            n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: i});
          }),
          (n.r = function(e) {
            "undefined" != typeof Symbol &&
              Symbol.toStringTag &&
              Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}),
              Object.defineProperty(e, "__esModule", {value: !0});
          }),
          (n.t = function(e, t) {
            if ((1 & t && (e = n(e)), 8 & t)) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var i = Object.create(null);
            if (
              (n.r(i),
              Object.defineProperty(i, "default", {enumerable: !0, value: e}),
              2 & t && "string" != typeof e)
            )
              for (var o in e)
                n.d(
                  i,
                  o,
                  function(t) {
                    return e[t];
                  }.bind(null, o)
                );
            return i;
          }),
          (n.n = function(e) {
            var t =
              e && e.__esModule
                ? function() {
                    return e.default;
                  }
                : function() {
                    return e;
                  };
            return n.d(t, "a", t), t;
          }),
          (n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }),
          (n.p = ""),
          n((n.s = 0))
        );
      })([
        function(e, t, n) {
          (function(t) {
            e.exports = t.Phoenix = n(2);
          }.call(this, n(1)));
        },
        function(e, t) {
          var n;
          n = (function() {
            return this;
          })();
          try {
            n = n || Function("return this")() || (0, eval)("this");
          } catch (e) {
            "object" == typeof window && (n = window);
          }
          e.exports = n;
        },
        function(e, t, n) {
          function i(e) {
            return (
              (function(e) {
                if (Array.isArray(e)) {
                  for (var t = 0, n = new Array(e.length); t < e.length; t++)
                    n[t] = e[t];
                  return n;
                }
              })(e) ||
              (function(e) {
                if (
                  Symbol.iterator in Object(e) ||
                  "[object Arguments]" === Object.prototype.toString.call(e)
                )
                  return Array.from(e);
              })(e) ||
              (function() {
                throw new TypeError(
                  "Invalid attempt to spread non-iterable instance"
                );
              })()
            );
          }
          function o(e) {
            return (o =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function(e) {
                    return typeof e;
                  }
                : function(e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  })(e);
          }
          function r(e, t) {
            return (
              (function(e) {
                if (Array.isArray(e)) return e;
              })(e) ||
              (function(e, t) {
                var n = [],
                  i = !0,
                  o = !1,
                  r = void 0;
                try {
                  for (
                    var s, a = e[Symbol.iterator]();
                    !(i = (s = a.next()).done) &&
                    (n.push(s.value), !t || n.length !== t);
                    i = !0
                  );
                } catch (e) {
                  (o = !0), (r = e);
                } finally {
                  try {
                    i || null == a.return || a.return();
                  } finally {
                    if (o) throw r;
                  }
                }
                return n;
              })(e, t) ||
              (function() {
                throw new TypeError(
                  "Invalid attempt to destructure non-iterable instance"
                );
              })()
            );
          }
          function s(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          }
          function a(e, t) {
            for (var n = 0; n < t.length; n++) {
              var i = t[n];
              (i.enumerable = i.enumerable || !1),
                (i.configurable = !0),
                "value" in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i);
            }
          }
          function c(e, t, n) {
            return t && a(e.prototype, t), n && a(e, n), e;
          }
          n.r(t),
            n.d(t, "Channel", function() {
              return b;
            }),
            n.d(t, "Socket", function() {
              return R;
            }),
            n.d(t, "LongPoll", function() {
              return w;
            }),
            n.d(t, "Ajax", function() {
              return C;
            }),
            n.d(t, "Presence", function() {
              return S;
            });
          var u = "undefined" != typeof self ? self : null,
            h = "undefined" != typeof window ? window : null,
            l = u || h || void 0,
            f = {connecting: 0, open: 1, closing: 2, closed: 3},
            p = 1e4,
            d = {
              closed: "closed",
              errored: "errored",
              joined: "joined",
              joining: "joining",
              leaving: "leaving"
            },
            v = {
              close: "phx_close",
              error: "phx_error",
              join: "phx_join",
              reply: "phx_reply",
              leave: "phx_leave"
            },
            y = [v.close, v.error, v.join, v.reply, v.leave],
            g = {longpoll: "longpoll", websocket: "websocket"},
            m = function(e) {
              if ("function" == typeof e) return e;
              return function() {
                return e;
              };
            },
            k = (function() {
              function e(t, n, i, o) {
                s(this, e),
                  (this.channel = t),
                  (this.event = n),
                  (this.payload =
                    i ||
                    function() {
                      return {};
                    }),
                  (this.receivedResp = null),
                  (this.timeout = o),
                  (this.timeoutTimer = null),
                  (this.recHooks = []),
                  (this.sent = !1);
              }
              return (
                c(e, [
                  {
                    key: "resend",
                    value: function(e) {
                      (this.timeout = e), this.reset(), this.send();
                    }
                  },
                  {
                    key: "send",
                    value: function() {
                      this.hasReceived("timeout") ||
                        (this.startTimeout(),
                        (this.sent = !0),
                        this.channel.socket.push({
                          topic: this.channel.topic,
                          event: this.event,
                          payload: this.payload(),
                          ref: this.ref,
                          join_ref: this.channel.joinRef()
                        }));
                    }
                  },
                  {
                    key: "receive",
                    value: function(e, t) {
                      return (
                        this.hasReceived(e) && t(this.receivedResp.response),
                        this.recHooks.push({status: e, callback: t}),
                        this
                      );
                    }
                  },
                  {
                    key: "reset",
                    value: function() {
                      this.cancelRefEvent(),
                        (this.ref = null),
                        (this.refEvent = null),
                        (this.receivedResp = null),
                        (this.sent = !1);
                    }
                  },
                  {
                    key: "matchReceive",
                    value: function(e) {
                      var t = e.status,
                        n = e.response;
                      e.ref;
                      this.recHooks
                        .filter(function(e) {
                          return e.status === t;
                        })
                        .forEach(function(e) {
                          return e.callback(n);
                        });
                    }
                  },
                  {
                    key: "cancelRefEvent",
                    value: function() {
                      this.refEvent && this.channel.off(this.refEvent);
                    }
                  },
                  {
                    key: "cancelTimeout",
                    value: function() {
                      clearTimeout(this.timeoutTimer),
                        (this.timeoutTimer = null);
                    }
                  },
                  {
                    key: "startTimeout",
                    value: function() {
                      var e = this;
                      this.timeoutTimer && this.cancelTimeout(),
                        (this.ref = this.channel.socket.makeRef()),
                        (this.refEvent = this.channel.replyEventName(this.ref)),
                        this.channel.on(this.refEvent, function(t) {
                          e.cancelRefEvent(),
                            e.cancelTimeout(),
                            (e.receivedResp = t),
                            e.matchReceive(t);
                        }),
                        (this.timeoutTimer = setTimeout(function() {
                          e.trigger("timeout", {});
                        }, this.timeout));
                    }
                  },
                  {
                    key: "hasReceived",
                    value: function(e) {
                      return (
                        this.receivedResp && this.receivedResp.status === e
                      );
                    }
                  },
                  {
                    key: "trigger",
                    value: function(e, t) {
                      this.channel.trigger(this.refEvent, {
                        status: e,
                        response: t
                      });
                    }
                  }
                ]),
                e
              );
            })(),
            b = (function() {
              function e(t, n, i) {
                var o = this;
                s(this, e),
                  (this.state = d.closed),
                  (this.topic = t),
                  (this.params = m(n || {})),
                  (this.socket = i),
                  (this.bindings = []),
                  (this.bindingRef = 0),
                  (this.timeout = this.socket.timeout),
                  (this.joinedOnce = !1),
                  (this.joinPush = new k(
                    this,
                    v.join,
                    this.params,
                    this.timeout
                  )),
                  (this.pushBuffer = []),
                  (this.rejoinTimer = new T(function() {
                    return o.rejoinUntilConnected();
                  }, this.socket.reconnectAfterMs)),
                  this.joinPush.receive("ok", function() {
                    (o.state = d.joined),
                      o.rejoinTimer.reset(),
                      o.pushBuffer.forEach(function(e) {
                        return e.send();
                      }),
                      (o.pushBuffer = []);
                  }),
                  this.onClose(function() {
                    o.rejoinTimer.reset(),
                      o.socket.hasLogger() &&
                        o.socket.log(
                          "channel",
                          "close ".concat(o.topic, " ").concat(o.joinRef())
                        ),
                      (o.state = d.closed),
                      o.socket.remove(o);
                  }),
                  this.onError(function(e) {
                    o.isLeaving() ||
                      o.isClosed() ||
                      (o.socket.hasLogger() &&
                        o.socket.log("channel", "error ".concat(o.topic), e),
                      (o.state = d.errored),
                      o.rejoinTimer.scheduleTimeout());
                  }),
                  this.joinPush.receive("timeout", function() {
                    o.isJoining() &&
                      (o.socket.hasLogger() &&
                        o.socket.log(
                          "channel",
                          "timeout "
                            .concat(o.topic, " (")
                            .concat(o.joinRef(), ")"),
                          o.joinPush.timeout
                        ),
                      new k(o, v.leave, m({}), o.timeout).send(),
                      (o.state = d.errored),
                      o.joinPush.reset(),
                      o.rejoinTimer.scheduleTimeout());
                  }),
                  this.on(v.reply, function(e, t) {
                    o.trigger(o.replyEventName(t), e);
                  });
              }
              return (
                c(e, [
                  {
                    key: "rejoinUntilConnected",
                    value: function() {
                      this.rejoinTimer.scheduleTimeout(),
                        this.socket.isConnected() && this.rejoin();
                    }
                  },
                  {
                    key: "join",
                    value: function() {
                      var e =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : this.timeout;
                      if (this.joinedOnce)
                        throw new Error(
                          "tried to join multiple times. 'join' can only be called a single time per channel instance"
                        );
                      return (
                        (this.joinedOnce = !0), this.rejoin(e), this.joinPush
                      );
                    }
                  },
                  {
                    key: "onClose",
                    value: function(e) {
                      this.on(v.close, e);
                    }
                  },
                  {
                    key: "onError",
                    value: function(e) {
                      return this.on(v.error, function(t) {
                        return e(t);
                      });
                    }
                  },
                  {
                    key: "on",
                    value: function(e, t) {
                      var n = this.bindingRef++;
                      return (
                        this.bindings.push({event: e, ref: n, callback: t}), n
                      );
                    }
                  },
                  {
                    key: "off",
                    value: function(e, t) {
                      this.bindings = this.bindings.filter(function(n) {
                        return !(
                          n.event === e &&
                          (void 0 === t || t === n.ref)
                        );
                      });
                    }
                  },
                  {
                    key: "canPush",
                    value: function() {
                      return this.socket.isConnected() && this.isJoined();
                    }
                  },
                  {
                    key: "push",
                    value: function(e, t) {
                      var n =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : this.timeout;
                      if (!this.joinedOnce)
                        throw new Error(
                          "tried to push '"
                            .concat(e, "' to '")
                            .concat(
                              this.topic,
                              "' before joining. Use channel.join() before pushing events"
                            )
                        );
                      var i = new k(
                        this,
                        e,
                        function() {
                          return t;
                        },
                        n
                      );
                      return (
                        this.canPush()
                          ? i.send()
                          : (i.startTimeout(), this.pushBuffer.push(i)),
                        i
                      );
                    }
                  },
                  {
                    key: "leave",
                    value: function() {
                      var e = this,
                        t =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : this.timeout;
                      this.state = d.leaving;
                      var n = function() {
                          e.socket.hasLogger() &&
                            e.socket.log("channel", "leave ".concat(e.topic)),
                            e.trigger(v.close, "leave");
                        },
                        i = new k(this, v.leave, m({}), t);
                      return (
                        i
                          .receive("ok", function() {
                            return n();
                          })
                          .receive("timeout", function() {
                            return n();
                          }),
                        i.send(),
                        this.canPush() || i.trigger("ok", {}),
                        i
                      );
                    }
                  },
                  {
                    key: "onMessage",
                    value: function(e, t, n) {
                      return t;
                    }
                  },
                  {
                    key: "isLifecycleEvent",
                    value: function(e) {
                      return y.indexOf(e) >= 0;
                    }
                  },
                  {
                    key: "isMember",
                    value: function(e, t, n, i) {
                      return (
                        this.topic === e &&
                        (!i ||
                          i === this.joinRef() ||
                          !this.isLifecycleEvent(t) ||
                          (this.socket.hasLogger() &&
                            this.socket.log(
                              "channel",
                              "dropping outdated message",
                              {topic: e, event: t, payload: n, joinRef: i}
                            ),
                          !1))
                      );
                    }
                  },
                  {
                    key: "joinRef",
                    value: function() {
                      return this.joinPush.ref;
                    }
                  },
                  {
                    key: "sendJoin",
                    value: function(e) {
                      (this.state = d.joining), this.joinPush.resend(e);
                    }
                  },
                  {
                    key: "rejoin",
                    value: function() {
                      var e =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : this.timeout;
                      this.isLeaving() || this.sendJoin(e);
                    }
                  },
                  {
                    key: "trigger",
                    value: function(e, t, n, i) {
                      var o = this.onMessage(e, t, n, i);
                      if (t && !o)
                        throw new Error(
                          "channel onMessage callbacks must return the payload, modified or unmodified"
                        );
                      for (var r = 0; r < this.bindings.length; r++) {
                        var s = this.bindings[r];
                        s.event === e && s.callback(o, n, i || this.joinRef());
                      }
                    }
                  },
                  {
                    key: "replyEventName",
                    value: function(e) {
                      return "chan_reply_".concat(e);
                    }
                  },
                  {
                    key: "isClosed",
                    value: function() {
                      return this.state === d.closed;
                    }
                  },
                  {
                    key: "isErrored",
                    value: function() {
                      return this.state === d.errored;
                    }
                  },
                  {
                    key: "isJoined",
                    value: function() {
                      return this.state === d.joined;
                    }
                  },
                  {
                    key: "isJoining",
                    value: function() {
                      return this.state === d.joining;
                    }
                  },
                  {
                    key: "isLeaving",
                    value: function() {
                      return this.state === d.leaving;
                    }
                  }
                ]),
                e
              );
            })(),
            j = {
              encode: function(e, t) {
                var n = [e.join_ref, e.ref, e.topic, e.event, e.payload];
                return t(JSON.stringify(n));
              },
              decode: function(e, t) {
                var n = r(JSON.parse(e), 5);
                return t({
                  join_ref: n[0],
                  ref: n[1],
                  topic: n[2],
                  event: n[3],
                  payload: n[4]
                });
              }
            },
            R = (function() {
              function e(t) {
                var n = this,
                  i =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {};
                s(this, e),
                  (this.stateChangeCallbacks = {
                    open: [],
                    close: [],
                    error: [],
                    message: []
                  }),
                  (this.channels = []),
                  (this.sendBuffer = []),
                  (this.ref = 0),
                  (this.timeout = i.timeout || p),
                  (this.transport = i.transport || l.WebSocket || w),
                  (this.defaultEncoder = j.encode),
                  (this.defaultDecoder = j.decode),
                  this.transport !== w
                    ? ((this.encode = i.encode || this.defaultEncoder),
                      (this.decode = i.decode || this.defaultDecoder))
                    : ((this.encode = this.defaultEncoder),
                      (this.decode = this.defaultDecoder)),
                  (this.heartbeatIntervalMs = i.heartbeatIntervalMs || 3e4),
                  (this.reconnectAfterMs =
                    i.reconnectAfterMs ||
                    function(e) {
                      return [1e3, 2e3, 5e3, 1e4][e - 1] || 1e4;
                    }),
                  (this.logger = i.logger || null),
                  (this.longpollerTimeout = i.longpollerTimeout || 2e4),
                  (this.params = m(i.params || {})),
                  (this.endPoint = "".concat(t, "/").concat(g.websocket)),
                  (this.heartbeatTimer = null),
                  (this.pendingHeartbeatRef = null),
                  (this.reconnectTimer = new T(function() {
                    n.teardown(function() {
                      return n.connect();
                    });
                  }, this.reconnectAfterMs));
              }
              return (
                c(e, [
                  {
                    key: "protocol",
                    value: function() {
                      return location.protocol.match(/^https/) ? "wss" : "ws";
                    }
                  },
                  {
                    key: "endPointURL",
                    value: function() {
                      var e = C.appendParams(
                        C.appendParams(this.endPoint, this.params()),
                        {vsn: "2.0.0"}
                      );
                      return "/" !== e.charAt(0)
                        ? e
                        : "/" === e.charAt(1)
                        ? "".concat(this.protocol(), ":").concat(e)
                        : ""
                            .concat(this.protocol(), "://")
                            .concat(location.host)
                            .concat(e);
                    }
                  },
                  {
                    key: "disconnect",
                    value: function(e, t, n) {
                      this.reconnectTimer.reset(), this.teardown(e, t, n);
                    }
                  },
                  {
                    key: "connect",
                    value: function(e) {
                      var t = this;
                      e &&
                        (console &&
                          console.log(
                            "passing params to connect is deprecated. Instead pass :params to the Socket constructor"
                          ),
                        (this.params = m(e))),
                        this.conn ||
                          ((this.conn = new this.transport(this.endPointURL())),
                          (this.conn.timeout = this.longpollerTimeout),
                          (this.conn.onopen = function() {
                            return t.onConnOpen();
                          }),
                          (this.conn.onerror = function(e) {
                            return t.onConnError(e);
                          }),
                          (this.conn.onmessage = function(e) {
                            return t.onConnMessage(e);
                          }),
                          (this.conn.onclose = function(e) {
                            return t.onConnClose(e);
                          }));
                    }
                  },
                  {
                    key: "log",
                    value: function(e, t, n) {
                      this.logger(e, t, n);
                    }
                  },
                  {
                    key: "hasLogger",
                    value: function() {
                      return null !== this.logger;
                    }
                  },
                  {
                    key: "onOpen",
                    value: function(e) {
                      this.stateChangeCallbacks.open.push(e);
                    }
                  },
                  {
                    key: "onClose",
                    value: function(e) {
                      this.stateChangeCallbacks.close.push(e);
                    }
                  },
                  {
                    key: "onError",
                    value: function(e) {
                      this.stateChangeCallbacks.error.push(e);
                    }
                  },
                  {
                    key: "onMessage",
                    value: function(e) {
                      this.stateChangeCallbacks.message.push(e);
                    }
                  },
                  {
                    key: "onConnOpen",
                    value: function() {
                      this.hasLogger() &&
                        this.log(
                          "transport",
                          "connected to ".concat(this.endPointURL())
                        ),
                        this.flushSendBuffer(),
                        this.reconnectTimer.reset(),
                        this.resetHeartbeat(),
                        this.stateChangeCallbacks.open.forEach(function(e) {
                          return e();
                        });
                    }
                  },
                  {
                    key: "resetHeartbeat",
                    value: function() {
                      var e = this;
                      this.conn.skipHeartbeat ||
                        ((this.pendingHeartbeatRef = null),
                        clearInterval(this.heartbeatTimer),
                        (this.heartbeatTimer = setInterval(function() {
                          return e.sendHeartbeat();
                        }, this.heartbeatIntervalMs)));
                    }
                  },
                  {
                    key: "teardown",
                    value: function(e, t, n) {
                      this.conn &&
                        ((this.conn.onclose = function() {}),
                        t ? this.conn.close(t, n || "") : this.conn.close(),
                        (this.conn = null)),
                        e && e();
                    }
                  },
                  {
                    key: "onConnClose",
                    value: function(e) {
                      this.hasLogger() && this.log("transport", "close", e),
                        this.triggerChanError(),
                        clearInterval(this.heartbeatTimer),
                        e &&
                          1e3 !== e.code &&
                          this.reconnectTimer.scheduleTimeout(),
                        this.stateChangeCallbacks.close.forEach(function(t) {
                          return t(e);
                        });
                    }
                  },
                  {
                    key: "onConnError",
                    value: function(e) {
                      this.hasLogger() && this.log("transport", e),
                        this.triggerChanError(),
                        this.stateChangeCallbacks.error.forEach(function(t) {
                          return t(e);
                        });
                    }
                  },
                  {
                    key: "triggerChanError",
                    value: function() {
                      this.channels.forEach(function(e) {
                        return e.trigger(v.error);
                      });
                    }
                  },
                  {
                    key: "connectionState",
                    value: function() {
                      switch (this.conn && this.conn.readyState) {
                        case f.connecting:
                          return "connecting";
                        case f.open:
                          return "open";
                        case f.closing:
                          return "closing";
                        default:
                          return "closed";
                      }
                    }
                  },
                  {
                    key: "isConnected",
                    value: function() {
                      return "open" === this.connectionState();
                    }
                  },
                  {
                    key: "remove",
                    value: function(e) {
                      this.channels = this.channels.filter(function(t) {
                        return t.joinRef() !== e.joinRef();
                      });
                    }
                  },
                  {
                    key: "channel",
                    value: function(e) {
                      var t =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : {},
                        n = new b(e, t, this);
                      return this.channels.push(n), n;
                    }
                  },
                  {
                    key: "push",
                    value: function(e) {
                      var t = this;
                      if (this.hasLogger()) {
                        var n = e.topic,
                          i = e.event,
                          o = e.payload,
                          r = e.ref,
                          s = e.join_ref;
                        this.log(
                          "push",
                          ""
                            .concat(n, " ")
                            .concat(i, " (")
                            .concat(s, ", ")
                            .concat(r, ")"),
                          o
                        );
                      }
                      this.isConnected()
                        ? this.encode(e, function(e) {
                            return t.conn.send(e);
                          })
                        : this.sendBuffer.push(function() {
                            return t.encode(e, function(e) {
                              return t.conn.send(e);
                            });
                          });
                    }
                  },
                  {
                    key: "makeRef",
                    value: function() {
                      var e = this.ref + 1;
                      return (
                        e === this.ref ? (this.ref = 0) : (this.ref = e),
                        this.ref.toString()
                      );
                    }
                  },
                  {
                    key: "sendHeartbeat",
                    value: function() {
                      if (this.isConnected()) {
                        if (this.pendingHeartbeatRef)
                          return (
                            (this.pendingHeartbeatRef = null),
                            this.hasLogger() &&
                              this.log(
                                "transport",
                                "heartbeat timeout. Attempting to re-establish connection"
                              ),
                            void this.conn.close(1e3, "hearbeat timeout")
                          );
                        (this.pendingHeartbeatRef = this.makeRef()),
                          this.push({
                            topic: "phoenix",
                            event: "heartbeat",
                            payload: {},
                            ref: this.pendingHeartbeatRef
                          });
                      }
                    }
                  },
                  {
                    key: "flushSendBuffer",
                    value: function() {
                      this.isConnected() &&
                        this.sendBuffer.length > 0 &&
                        (this.sendBuffer.forEach(function(e) {
                          return e();
                        }),
                        (this.sendBuffer = []));
                    }
                  },
                  {
                    key: "onConnMessage",
                    value: function(e) {
                      var t = this;
                      this.decode(e.data, function(e) {
                        var n = e.topic,
                          i = e.event,
                          o = e.payload,
                          r = e.ref,
                          s = e.join_ref;
                        r &&
                          r === t.pendingHeartbeatRef &&
                          (t.pendingHeartbeatRef = null),
                          t.hasLogger() &&
                            t.log(
                              "receive",
                              ""
                                .concat(o.status || "", " ")
                                .concat(n, " ")
                                .concat(i, " ")
                                .concat((r && "(" + r + ")") || ""),
                              o
                            );
                        for (var a = 0; a < t.channels.length; a++) {
                          var c = t.channels[a];
                          c.isMember(n, i, o, s) && c.trigger(i, o, r, s);
                        }
                        for (
                          var u = 0;
                          u < t.stateChangeCallbacks.message.length;
                          u++
                        )
                          t.stateChangeCallbacks.message[u](e);
                      });
                    }
                  }
                ]),
                e
              );
            })(),
            w = (function() {
              function e(t) {
                s(this, e),
                  (this.endPoint = null),
                  (this.token = null),
                  (this.skipHeartbeat = !0),
                  (this.onopen = function() {}),
                  (this.onerror = function() {}),
                  (this.onmessage = function() {}),
                  (this.onclose = function() {}),
                  (this.pollEndpoint = this.normalizeEndpoint(t)),
                  (this.readyState = f.connecting),
                  this.poll();
              }
              return (
                c(e, [
                  {
                    key: "normalizeEndpoint",
                    value: function(e) {
                      return e
                        .replace("ws://", "http://")
                        .replace("wss://", "https://")
                        .replace(
                          new RegExp("(.*)/" + g.websocket),
                          "$1/" + g.longpoll
                        );
                    }
                  },
                  {
                    key: "endpointURL",
                    value: function() {
                      return C.appendParams(this.pollEndpoint, {
                        token: this.token
                      });
                    }
                  },
                  {
                    key: "closeAndRetry",
                    value: function() {
                      this.close(), (this.readyState = f.connecting);
                    }
                  },
                  {
                    key: "ontimeout",
                    value: function() {
                      this.onerror("timeout"), this.closeAndRetry();
                    }
                  },
                  {
                    key: "poll",
                    value: function() {
                      var e = this;
                      (this.readyState !== f.open &&
                        this.readyState !== f.connecting) ||
                        C.request(
                          "GET",
                          this.endpointURL(),
                          "application/json",
                          null,
                          this.timeout,
                          this.ontimeout.bind(this),
                          function(t) {
                            if (t) {
                              var n = t.status,
                                i = t.token,
                                o = t.messages;
                              e.token = i;
                            } else n = 0;
                            switch (n) {
                              case 200:
                                o.forEach(function(t) {
                                  return e.onmessage({data: t});
                                }),
                                  e.poll();
                                break;
                              case 204:
                                e.poll();
                                break;
                              case 410:
                                (e.readyState = f.open), e.onopen(), e.poll();
                                break;
                              case 0:
                              case 500:
                                e.onerror(), e.closeAndRetry();
                                break;
                              default:
                                throw new Error(
                                  "unhandled poll status ".concat(n)
                                );
                            }
                          }
                        );
                    }
                  },
                  {
                    key: "send",
                    value: function(e) {
                      var t = this;
                      C.request(
                        "POST",
                        this.endpointURL(),
                        "application/json",
                        e,
                        this.timeout,
                        this.onerror.bind(this, "timeout"),
                        function(e) {
                          (e && 200 === e.status) ||
                            (t.onerror(e && e.status), t.closeAndRetry());
                        }
                      );
                    }
                  },
                  {
                    key: "close",
                    value: function(e, t) {
                      (this.readyState = f.closed), this.onclose();
                    }
                  }
                ]),
                e
              );
            })(),
            C = (function() {
              function e() {
                s(this, e);
              }
              return (
                c(e, null, [
                  {
                    key: "request",
                    value: function(e, t, n, i, o, r, s) {
                      if (l.XDomainRequest) {
                        var a = new XDomainRequest();
                        this.xdomainRequest(a, e, t, i, o, r, s);
                      } else {
                        var c = l.XMLHttpRequest
                          ? new l.XMLHttpRequest()
                          : new ActiveXObject("Microsoft.XMLHTTP");
                        this.xhrRequest(c, e, t, n, i, o, r, s);
                      }
                    }
                  },
                  {
                    key: "xdomainRequest",
                    value: function(e, t, n, i, o, r, s) {
                      var a = this;
                      (e.timeout = o),
                        e.open(t, n),
                        (e.onload = function() {
                          var t = a.parseJSON(e.responseText);
                          s && s(t);
                        }),
                        r && (e.ontimeout = r),
                        (e.onprogress = function() {}),
                        e.send(i);
                    }
                  },
                  {
                    key: "xhrRequest",
                    value: function(e, t, n, i, o, r, s, a) {
                      var c = this;
                      e.open(t, n, !0),
                        (e.timeout = r),
                        e.setRequestHeader("Content-Type", i),
                        (e.onerror = function() {
                          a && a(null);
                        }),
                        (e.onreadystatechange = function() {
                          if (e.readyState === c.states.complete && a) {
                            var t = c.parseJSON(e.responseText);
                            a(t);
                          }
                        }),
                        s && (e.ontimeout = s),
                        e.send(o);
                    }
                  },
                  {
                    key: "parseJSON",
                    value: function(e) {
                      if (!e || "" === e) return null;
                      try {
                        return JSON.parse(e);
                      } catch (t) {
                        return (
                          console &&
                            console.log("failed to parse JSON response", e),
                          null
                        );
                      }
                    }
                  },
                  {
                    key: "serialize",
                    value: function(e, t) {
                      var n = [];
                      for (var i in e)
                        if (e.hasOwnProperty(i)) {
                          var r = t ? "".concat(t, "[").concat(i, "]") : i,
                            s = e[i];
                          "object" === o(s)
                            ? n.push(this.serialize(s, r))
                            : n.push(
                                encodeURIComponent(r) +
                                  "=" +
                                  encodeURIComponent(s)
                              );
                        }
                      return n.join("&");
                    }
                  },
                  {
                    key: "appendParams",
                    value: function(e, t) {
                      if (0 === Object.keys(t).length) return e;
                      var n = e.match(/\?/) ? "&" : "?";
                      return ""
                        .concat(e)
                        .concat(n)
                        .concat(this.serialize(t));
                    }
                  }
                ]),
                e
              );
            })();
          C.states = {complete: 4};
          var S = (function() {
              function e(t) {
                var n = this,
                  i =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {};
                s(this, e);
                var o = i.events || {
                  state: "presence_state",
                  diff: "presence_diff"
                };
                (this.state = {}),
                  (this.pendingDiffs = []),
                  (this.channel = t),
                  (this.joinRef = null),
                  (this.caller = {
                    onJoin: function() {},
                    onLeave: function() {},
                    onSync: function() {}
                  }),
                  this.channel.on(o.state, function(t) {
                    var i = n.caller,
                      o = i.onJoin,
                      r = i.onLeave,
                      s = i.onSync;
                    (n.joinRef = n.channel.joinRef()),
                      (n.state = e.syncState(n.state, t, o, r)),
                      n.pendingDiffs.forEach(function(t) {
                        n.state = e.syncDiff(n.state, t, o, r);
                      }),
                      (n.pendingDiffs = []),
                      s();
                  }),
                  this.channel.on(o.diff, function(t) {
                    var i = n.caller,
                      o = i.onJoin,
                      r = i.onLeave,
                      s = i.onSync;
                    n.inPendingSyncState()
                      ? n.pendingDiffs.push(t)
                      : ((n.state = e.syncDiff(n.state, t, o, r)), s());
                  });
              }
              return (
                c(
                  e,
                  [
                    {
                      key: "onJoin",
                      value: function(e) {
                        this.caller.onJoin = e;
                      }
                    },
                    {
                      key: "onLeave",
                      value: function(e) {
                        this.caller.onLeave = e;
                      }
                    },
                    {
                      key: "onSync",
                      value: function(e) {
                        this.caller.onSync = e;
                      }
                    },
                    {
                      key: "list",
                      value: function(t) {
                        return e.list(this.state, t);
                      }
                    },
                    {
                      key: "inPendingSyncState",
                      value: function() {
                        return (
                          !this.joinRef ||
                          this.joinRef !== this.channel.joinRef()
                        );
                      }
                    }
                  ],
                  [
                    {
                      key: "syncState",
                      value: function(e, t, n, i) {
                        var o = this,
                          r = this.clone(e),
                          s = {},
                          a = {};
                        return (
                          this.map(r, function(e, n) {
                            t[e] || (a[e] = n);
                          }),
                          this.map(t, function(e, t) {
                            var n = r[e];
                            if (n) {
                              var i = t.metas.map(function(e) {
                                  return e.phx_ref;
                                }),
                                c = n.metas.map(function(e) {
                                  return e.phx_ref;
                                }),
                                u = t.metas.filter(function(e) {
                                  return c.indexOf(e.phx_ref) < 0;
                                }),
                                h = n.metas.filter(function(e) {
                                  return i.indexOf(e.phx_ref) < 0;
                                });
                              u.length > 0 && ((s[e] = t), (s[e].metas = u)),
                                h.length > 0 &&
                                  ((a[e] = o.clone(n)), (a[e].metas = h));
                            } else s[e] = t;
                          }),
                          this.syncDiff(r, {joins: s, leaves: a}, n, i)
                        );
                      }
                    },
                    {
                      key: "syncDiff",
                      value: function(e, t, n, o) {
                        var r = t.joins,
                          s = t.leaves,
                          a = this.clone(e);
                        return (
                          n || (n = function() {}),
                          o || (o = function() {}),
                          this.map(r, function(e, t) {
                            var o = a[e];
                            if (((a[e] = t), o)) {
                              var r,
                                s = a[e].metas.map(function(e) {
                                  return e.phx_ref;
                                }),
                                c = o.metas.filter(function(e) {
                                  return s.indexOf(e.phx_ref) < 0;
                                });
                              (r = a[e].metas).unshift.apply(r, i(c));
                            }
                            n(e, o, t);
                          }),
                          this.map(s, function(e, t) {
                            var n = a[e];
                            if (n) {
                              var i = t.metas.map(function(e) {
                                return e.phx_ref;
                              });
                              (n.metas = n.metas.filter(function(e) {
                                return i.indexOf(e.phx_ref) < 0;
                              })),
                                o(e, n, t),
                                0 === n.metas.length && delete a[e];
                            }
                          }),
                          a
                        );
                      }
                    },
                    {
                      key: "list",
                      value: function(e, t) {
                        return (
                          t ||
                            (t = function(e, t) {
                              return t;
                            }),
                          this.map(e, function(e, n) {
                            return t(e, n);
                          })
                        );
                      }
                    },
                    {
                      key: "map",
                      value: function(e, t) {
                        return Object.getOwnPropertyNames(e).map(function(n) {
                          return t(n, e[n]);
                        });
                      }
                    },
                    {
                      key: "clone",
                      value: function(e) {
                        return JSON.parse(JSON.stringify(e));
                      }
                    }
                  ]
                ),
                e
              );
            })(),
            T = (function() {
              function e(t, n) {
                s(this, e),
                  (this.callback = t),
                  (this.timerCalc = n),
                  (this.timer = null),
                  (this.tries = 0);
              }
              return (
                c(e, [
                  {
                    key: "reset",
                    value: function() {
                      (this.tries = 0), clearTimeout(this.timer);
                    }
                  },
                  {
                    key: "scheduleTimeout",
                    value: function() {
                      var e = this;
                      clearTimeout(this.timer),
                        (this.timer = setTimeout(function() {
                          (e.tries = e.tries + 1), e.callback();
                        }, this.timerCalc(this.tries + 1)));
                    }
                  }
                ]),
                e
              );
            })();
        }
      ]);
    });
  });

  unwrapExports(phoenix);
  const phoenix_1 = phoenix.Ajax;
  const phoenix_2 = phoenix.Channel;
  const phoenix_3 = phoenix.LongPoll;
  const phoenix_4 = phoenix.Presence;
  const phoenix_5 = phoenix.Socket;
  const phoenix_6 = phoenix.Phoenix;

  const _this$o;

  const handlePush = function handlePush(push, handler) {
    newArrowCheck(this, _this$o);

    return push
      .receive("ok", handler.onSucceed)
      .receive("error", handler.onError)
      .receive("timeout", handler.onTimeout);
  }.bind(undefined);

  const _this$p;

  const getPushHandlerMethodGetter = function getPushHandlerMethodGetter(
    absintheSocket,
    request
  ) {
    const _this2 = this;

    newArrowCheck(this, _this$p);

    return function(handle) {
      const _this3 = this;

      newArrowCheck(this, _this2);

      return function() {
        newArrowCheck(this, _this3);

        const notifier = find(absintheSocket.notifiers, "request", request);

        if (notifier) {
          for (
            var _len = arguments.length, args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key];
          }

          handle(...[absintheSocket, notifier].concat(args));
        }
      }.bind(this);
    }.bind(this);
  }.bind(undefined);

  const getPushHandler = function getPushHandler(
    absintheSocket,
    request,
    notifierPushHandler
  ) {
    newArrowCheck(this, _this$p);

    return map$1(
      getPushHandlerMethodGetter(absintheSocket, request),
      notifierPushHandler
    );
  }.bind(undefined);

  const pushAbsintheEvent = function pushAbsintheEvent(
    absintheSocket,
    request,
    notifierPushHandler,
    absintheEvent
  ) {
    newArrowCheck(this, _this$p);

    handlePush(
      absintheSocket.channel.push(absintheEvent.name, absintheEvent.payload),
      getPushHandler(absintheSocket, request, notifierPushHandler)
    );
    return absintheSocket;
  }.bind(undefined);

  const absintheEventNames = {
    doc: "doc",
    unsubscribe: "unsubscribe"
  };

  const _this$q;

  const createAbsintheUnsubscribeEvent = function createAbsintheUnsubscribeEvent(
    payload
  ) {
    newArrowCheck(this, _this$q);

    return {
      payload,
      name: absintheEventNames.unsubscribe
    };
  }.bind(undefined);

  const createAbsintheDocEvent = function createAbsintheDocEvent(payload) {
    newArrowCheck(this, _this$q);

    return {
      payload,
      name: absintheEventNames.doc
    };
  }.bind(undefined);

  const _this$r;

  const pushAbsintheDocEvent = function pushAbsintheDocEvent(
    absintheSocket,
    _ref,
    notifierPushHandler
  ) {
    const request = _ref.request;

    newArrowCheck(this, _this$r);

    return pushAbsintheEvent(
      absintheSocket,
      request,
      notifierPushHandler,
      createAbsintheDocEvent(requestToCompat(request))
    );
  }.bind(undefined);

  const setNotifierRequestStatusSending = function setNotifierRequestStatusSending(
    absintheSocket,
    notifier
  ) {
    newArrowCheck(this, _this$r);

    return refreshNotifier(
      absintheSocket,
      objectSpread({}, notifier, {
        requestStatus: requestStatuses.sending
      })
    );
  }.bind(undefined);

  const createRequestError = function createRequestError(message) {
    newArrowCheck(this, _this$r);

    const error = new Error("request: ".concat(message));
    error.name = "SocketError";
    return error;
  }.bind(undefined);

  const createRequestErrorWithResult = function createRequestErrorWithResult(
    message,
    result
  ) {
    newArrowCheck(this, _this$r);

    const error = new Error("request: ".concat(message));
    error.name = "SocketError";
    error.result = result;
    return error;
  }.bind(undefined);

  const onTimeout = function onTimeout(absintheSocket, notifier) {
    newArrowCheck(this, _this$r);

    return notifyActive(
      notifier,
      createErrorEvent(createRequestError("timeout"))
    );
  }.bind(undefined);

  const onError = function onError(absintheSocket, notifier, result) {
    newArrowCheck(this, _this$r);

    return abortNotifier(
      absintheSocket,
      notifier,
      createRequestErrorWithResult("GraphQL error", result)
    );
  }.bind(undefined);

  const getNotifierPushHandler = function getNotifierPushHandler(onSucceed) {
    newArrowCheck(this, _this$r);

    return {
      onError,
      onSucceed,
      onTimeout
    };
  }.bind(undefined);

  const pushRequestUsing = function pushRequestUsing(
    absintheSocket,
    notifier,
    onSucceed
  ) {
    newArrowCheck(this, _this$r);

    return pushAbsintheDocEvent(
      absintheSocket,
      setNotifierRequestStatusSending(absintheSocket, notifier),
      getNotifierPushHandler(onSucceed)
    );
  }.bind(undefined);

  const _this$s;

  const onUnsubscribeSucceedCanceled = function onUnsubscribeSucceedCanceled(
    absintheSocket,
    notifier
  ) {
    newArrowCheck(this, _this$s);

    return updateNotifiers(absintheSocket, remove$4(flushCanceled(notifier)));
  }.bind(undefined);

  const onUnsubscribeSucceedActive = function onUnsubscribeSucceedActive(
    absintheSocket,
    notifier
  ) {
    newArrowCheck(this, _this$s);

    return subscribe(
      absintheSocket,
      refreshNotifier(absintheSocket, reset(notifier))
    );
  }.bind(undefined);

  const createUnsubscribeError = function createUnsubscribeError(message) {
    newArrowCheck(this, _this$s);

    return new Error("unsubscribe: ".concat(message));
  }.bind(undefined);

  const unsubscribeHandler = {
    onError: function onError$$1(absintheSocket, notifier, errorMessage) {
      newArrowCheck(this, _this$s);

      return abortNotifier(
        absintheSocket,
        notifier,
        createUnsubscribeError(errorMessage)
      );
    }.bind(undefined),
    onTimeout: function onTimeout(absintheSocket, notifier) {
      newArrowCheck(this, _this$s);

      return notifyCanceled(
        notifier,
        createErrorEvent(createUnsubscribeError("timeout"))
      );
    }.bind(undefined),
    onSucceed: function onSucceed(absintheSocket, notifier) {
      newArrowCheck(this, _this$s);

      if (notifier.isActive) {
        onUnsubscribeSucceedActive(absintheSocket, notifier);
      } else {
        onUnsubscribeSucceedCanceled(absintheSocket, notifier);
      }
    }.bind(undefined)
  };

  const pushAbsintheUnsubscribeEvent = function pushAbsintheUnsubscribeEvent(
    absintheSocket,
    _ref
  ) {
    const request = _ref.request;

    let subscriptionId = _ref.subscriptionId;

    newArrowCheck(this, _this$s);

    return pushAbsintheEvent(
      absintheSocket,
      request,
      unsubscribeHandler,
      createAbsintheUnsubscribeEvent({
        subscriptionId
      })
    );
  }.bind(undefined);

  const unsubscribe = function unsubscribe(absintheSocket, notifier) {
    newArrowCheck(this, _this$s);

    return pushAbsintheUnsubscribeEvent(
      absintheSocket,
      refreshNotifier(
        absintheSocket,
        objectSpread({}, notifier, {
          requestStatus: requestStatuses.canceling
        })
      )
    );
  }.bind(undefined);

  const onSubscribeSucceed = function onSubscribeSucceed(
    absintheSocket,
    notifier,
    _ref2
  ) {
    const subscriptionId = _ref2.subscriptionId;

    newArrowCheck(this, _this$s);

    const subscribedNotifier = refreshNotifier(
      absintheSocket,
      objectSpread({}, notifier, {
        subscriptionId,
        requestStatus: requestStatuses.sent
      })
    );

    if (subscribedNotifier.isActive) {
      notifyStartEvent(subscribedNotifier);
    } else {
      unsubscribe(absintheSocket, subscribedNotifier);
    }
  }.bind(undefined);

  const onSubscribe = function onSubscribe(absintheSocket, notifier, response) {
    newArrowCheck(this, _this$s);

    if (response.errors) {
      onError(absintheSocket, notifier, errorsToString(response.errors));
    } else {
      onSubscribeSucceed(absintheSocket, notifier, response);
    }
  }.bind(undefined);

  var subscribe = function subscribe(absintheSocket, notifier) {
    newArrowCheck(this, _this$s);

    return pushRequestUsing(absintheSocket, notifier, onSubscribe);
  }.bind(undefined);

  const onDataMessage = function onDataMessage(absintheSocket, _ref3) {
    const payload = _ref3.payload;

    newArrowCheck(this, _this$s);

    const notifier = find(
      absintheSocket.notifiers,
      "subscriptionId",
      payload.subscriptionId
    );

    if (notifier) {
      notifyResultEvent(notifier, payload.result);
    }
  }.bind(undefined);

  const dataMessageEventName = "subscription:data";

  const isDataMessage = function isDataMessage(message) {
    newArrowCheck(this, _this$s);

    return message.event === dataMessageEventName;
  }.bind(undefined);

  const _this$t;

  const cancelQueryOrMutationSending = function cancelQueryOrMutationSending(
    absintheSocket,
    notifier
  ) {
    newArrowCheck(this, _this$t);

    return updateNotifiers(
      absintheSocket,
      refresh(flushCanceled(cancel(notifier)))
    );
  }.bind(undefined);

  const cancelQueryOrMutationIfSending = function cancelQueryOrMutationIfSending(
    absintheSocket,
    notifier
  ) {
    newArrowCheck(this, _this$t);

    return notifier.requestStatus === requestStatuses.sending
      ? cancelQueryOrMutationSending(absintheSocket, notifier)
      : absintheSocket;
  }.bind(undefined);

  const cancelPending = function cancelPending(absintheSocket, notifier) {
    newArrowCheck(this, _this$t);

    return updateNotifiers(
      absintheSocket,
      remove$4(flushCanceled(cancel(notifier)))
    );
  }.bind(undefined);

  const cancelQueryOrMutation = function cancelQueryOrMutation(
    absintheSocket,
    notifier
  ) {
    newArrowCheck(this, _this$t);

    return notifier.requestStatus === requestStatuses.pending
      ? cancelPending(absintheSocket, notifier)
      : cancelQueryOrMutationIfSending(absintheSocket, notifier);
  }.bind(undefined);

  const unsubscribeIfNeeded = function unsubscribeIfNeeded(
    absintheSocket,
    notifier
  ) {
    newArrowCheck(this, _this$t);

    return notifier.requestStatus === requestStatuses.sent
      ? unsubscribe(absintheSocket, notifier)
      : absintheSocket;
  }.bind(undefined);

  const cancelNonPendingSubscription = function cancelNonPendingSubscription(
    absintheSocket,
    notifier
  ) {
    newArrowCheck(this, _this$t);

    return unsubscribeIfNeeded(
      absintheSocket,
      refreshNotifier(absintheSocket, cancel(notifier))
    );
  }.bind(undefined);

  const cancelSubscription = function cancelSubscription(
    absintheSocket,
    notifier
  ) {
    newArrowCheck(this, _this$t);

    return notifier.requestStatus === requestStatuses.pending
      ? cancelPending(absintheSocket, notifier)
      : cancelNonPendingSubscription(absintheSocket, notifier);
  }.bind(undefined);

  const cancelActive = function cancelActive(absintheSocket, notifier) {
    newArrowCheck(this, _this$t);

    return notifier.operationType === "subscription"
      ? cancelSubscription(absintheSocket, notifier)
      : cancelQueryOrMutation(absintheSocket, notifier);
  }.bind(undefined);
  /**
   * Cancels a notifier sending a Cancel event to all its observers and
   * unsubscribing in case it holds a subscription request
   *
   * @example
   * import * as withAbsintheSocket from "@absinthe/socket";
   *
   * withAbsintheSocket.cancel(absintheSocket, notifier);
   */

  const cancel$1 = function cancel$$1(absintheSocket, notifier) {
    newArrowCheck(this, _this$t);

    return notifier.isActive
      ? cancelActive(absintheSocket, notifier)
      : absintheSocket;
  }.bind(undefined);

  const _this$u;

  const setNotifierRequestStatusSent = function setNotifierRequestStatusSent(
    absintheSocket,
    notifier
  ) {
    newArrowCheck(this, _this$u);

    return refreshNotifier(
      absintheSocket,
      objectSpread({}, notifier, {
        requestStatus: requestStatuses.sent
      })
    );
  }.bind(undefined);

  const onQueryOrMutationSucceed = function onQueryOrMutationSucceed(
    absintheSocket,
    notifier,
    response
  ) {
    newArrowCheck(this, _this$u);

    return updateNotifiers(
      absintheSocket,
      remove$4(
        notifyResultEvent(
          setNotifierRequestStatusSent(absintheSocket, notifier),
          response
        )
      )
    );
  }.bind(undefined);

  const pushQueryOrMutation = function pushQueryOrMutation(
    absintheSocket,
    notifier
  ) {
    newArrowCheck(this, _this$u);

    return pushRequestUsing(
      absintheSocket,
      notifyStartEvent(notifier),
      onQueryOrMutationSucceed
    );
  }.bind(undefined);

  const pushRequest = function pushRequest(absintheSocket, notifier) {
    newArrowCheck(this, _this$u);

    if (notifier.operationType === "subscription") {
      subscribe(absintheSocket, notifier);
    } else {
      pushQueryOrMutation(absintheSocket, notifier);
    }
  }.bind(undefined);

  const _this$v;

  const createChannelJoinError = function createChannelJoinError(message) {
    newArrowCheck(this, _this$v);

    return new Error("channel join: ".concat(message));
  }.bind(undefined);

  const notifyErrorToAllActive = function notifyErrorToAllActive(
    absintheSocket,
    errorMessage
  ) {
    const _this2 = this;

    newArrowCheck(this, _this$v);

    return absintheSocket.notifiers.forEach(notifier => {
      newArrowCheck(this, _this2);

      return notifyActive(
        notifier,
        createErrorEvent(createChannelJoinError(errorMessage))
      );
    });
  }.bind(undefined); // join Push is reused and so the handler
  // https://github.com/phoenixframework/phoenix/blob/master/assets/js/phoenix.js#L356

  const createChannelJoinHandler = function createChannelJoinHandler(
    absintheSocket
  ) {
    const _this3 = this;

    newArrowCheck(this, _this$v);

    return {
      onError: function onError(errorMessage) {
        newArrowCheck(this, _this3);

        return notifyErrorToAllActive(absintheSocket, errorMessage);
      }.bind(this),
      onSucceed: function onSucceed() {
        const _this4 = this;

        newArrowCheck(this, _this3);

        return absintheSocket.notifiers.forEach(notifier => {
          newArrowCheck(this, _this4);

          return pushRequest(absintheSocket, notifier);
        });
      }.bind(this),
      onTimeout: function onTimeout() {
        newArrowCheck(this, _this3);

        return notifyErrorToAllActive(absintheSocket, "timeout");
      }.bind(this)
    };
  }.bind(undefined);

  const joinChannel = function joinChannel(absintheSocket) {
    newArrowCheck(this, _this$v);

    handlePush(
      absintheSocket.channel.join(),
      createChannelJoinHandler(absintheSocket)
    );
    absintheSocket.channelJoinCreated = true;
    return absintheSocket;
  }.bind(undefined);

  const _this$w;

  const onMessage = function onMessage(absintheSocket) {
    const _this2 = this;

    newArrowCheck(this, _this$w);

    return function(message) {
      newArrowCheck(this, _this2);

      if (isDataMessage(message)) {
        onDataMessage(absintheSocket, message);
      }
    }.bind(this);
  }.bind(undefined);

  const createConnectionCloseError = function createConnectionCloseError() {
    newArrowCheck(this, _this$w);

    return new Error("connection: close");
  }.bind(undefined);

  const notifyConnectionCloseError = function notifyConnectionCloseError(
    notifier
  ) {
    newArrowCheck(this, _this$w);

    return notify(notifier, createErrorEvent(createConnectionCloseError()));
  }.bind(undefined);

  const notifierOnConnectionCloseCanceled = function notifierOnConnectionCloseCanceled(
    absintheSocket,
    notifier
  ) {
    newArrowCheck(this, _this$w);

    return updateNotifiers(
      absintheSocket,
      remove$4(notifyConnectionCloseError(notifier))
    );
  }.bind(undefined);

  const notifierOnConnectionCloseActive = function notifierOnConnectionCloseActive(
    absintheSocket,
    notifier
  ) {
    newArrowCheck(this, _this$w);

    if (notifier.operationType === "mutation") {
      abortNotifier(absintheSocket, notifier, createConnectionCloseError());
    } else {
      refreshNotifier(
        absintheSocket,
        reset(notifyConnectionCloseError(notifier))
      );
    }
  }.bind(undefined);

  const notifierOnConnectionClose = function notifierOnConnectionClose(
    absintheSocket
  ) {
    const _this3 = this;

    newArrowCheck(this, _this$w);

    return function(notifier) {
      newArrowCheck(this, _this3);

      if (notifier.isActive) {
        notifierOnConnectionCloseActive(absintheSocket, notifier);
      } else {
        notifierOnConnectionCloseCanceled(absintheSocket, notifier);
      }
    }.bind(this);
  }.bind(undefined);

  const onConnectionClose = function onConnectionClose(absintheSocket) {
    const _this4 = this;

    newArrowCheck(this, _this$w);

    return function() {
      newArrowCheck(this, _this4);

      return absintheSocket.notifiers.forEach(
        notifierOnConnectionClose(absintheSocket)
      );
    }.bind(this);
  }.bind(undefined);

  const shouldJoinChannel = function shouldJoinChannel(absintheSocket) {
    newArrowCheck(this, _this$w);

    return (
      !absintheSocket.channelJoinCreated && absintheSocket.notifiers.length > 0
    );
  }.bind(undefined);

  const onConnectionOpen = function onConnectionOpen(absintheSocket) {
    const _this5 = this;

    newArrowCheck(this, _this$w);

    return function() {
      newArrowCheck(this, _this5);

      if (shouldJoinChannel(absintheSocket)) {
        joinChannel(absintheSocket);
      }
    }.bind(this);
  }.bind(undefined);

  const absintheChannelName = "__absinthe__:control";
  /**
	 * Creates an Absinthe Socket using the given Phoenix Socket instance
	 *
	 * @example
	 * import * as withAbsintheSocket from "@absinthe/socket";
	 * import {Socket as PhoenixSocket} from "phoenix";

	 * const absintheSocket = withAbsintheSocket.create(
	 *   new PhoenixSocket("ws://localhost:4000/socket")
	 * );
	 */

  const create = function create(phoenixSocket) {
    newArrowCheck(this, _this$w);

    const absintheSocket = {
      phoenixSocket,
      channel: phoenixSocket.channel(absintheChannelName),
      channelJoinCreated: false,
      notifiers: []
    };
    phoenixSocket.onOpen(onConnectionOpen(absintheSocket));
    phoenixSocket.onClose(onConnectionClose(absintheSocket));
    phoenixSocket.onMessage(onMessage(absintheSocket));
    return absintheSocket;
  }.bind(undefined);

  const _this$x;

  const observe = function observe(_ref, observer) {
    const activeObservers = _ref.activeObservers;

    let rest = objectWithoutProperties(_ref, ["activeObservers"]);

    newArrowCheck(this, _this$x);

    return objectSpread({}, rest, {
      activeObservers: toConsumableArray(activeObservers).concat([observer]),
      isActive: true
    });
  }.bind(undefined);

  const _this$y;

  /**
   * Observes given notifier using the provided observer
   *
   * @example
   * import * as withAbsintheSocket from "@absinthe/socket"
   *
   * const logEvent = eventName => (...args) => console.log(eventName, ...args);
   *
   * const updatedNotifier = withAbsintheSocket.observe(absintheSocket, notifier, {
   *   onAbort: logEvent("abort"),
   *   onError: logEvent("error"),
   *   onStart: logEvent("open"),
   *   onResult: logEvent("result")
   * });
   */
  const observe$1 = function observe$$1(absintheSocket, notifier, observer) {
    newArrowCheck(this, _this$y);

    return refreshNotifier(absintheSocket, observe(notifier, observer));
  }.bind(undefined);

  const _this$z;

  const createUsing = function createUsing(request, operationType) {
    newArrowCheck(this, _this$z);

    return {
      operationType,
      request,
      activeObservers: [],
      canceledObservers: [],
      isActive: true,
      requestStatus: requestStatuses.pending,
      subscriptionId: undefined
    };
  }.bind(undefined);

  const create$1 = function create(request) {
    newArrowCheck(this, _this$z);

    return createUsing(request, getOperationType(request.operation));
  }.bind(undefined);

  const _this$A;

  const reactivate = function reactivate(notifier) {
    newArrowCheck(this, _this$A);

    return notifier.isActive
      ? notifier
      : objectSpread({}, notifier, {
          isActive: true
        });
  }.bind(undefined);

  const _this$B;

  const connectOrJoinChannel = function connectOrJoinChannel(absintheSocket) {
    newArrowCheck(this, _this$B);

    if (absintheSocket.phoenixSocket.isConnected()) {
      joinChannel(absintheSocket);
    } else {
      // socket ignores connect calls if a connection has already been created
      absintheSocket.phoenixSocket.connect();
    }
  }.bind(undefined);

  const sendNew = function sendNew(absintheSocket, request) {
    newArrowCheck(this, _this$B);

    const notifier = create$1(request);
    updateNotifiers(absintheSocket, append$1([notifier]));

    if (absintheSocket.channelJoinCreated) {
      pushRequest(absintheSocket, notifier);
    } else {
      connectOrJoinChannel(absintheSocket);
    }

    return notifier;
  }.bind(undefined);

  const updateCanceledReactivate = function updateCanceledReactivate(
    absintheSocket,
    notifier
  ) {
    newArrowCheck(this, _this$B);

    return refreshNotifier(absintheSocket, reactivate(notifier));
  }.bind(undefined);

  const updateCanceled = function updateCanceled(absintheSocket, notifier) {
    newArrowCheck(this, _this$B);

    return notifier.requestStatus === requestStatuses.sending
      ? updateCanceledReactivate(absintheSocket, flushCanceled(notifier))
      : updateCanceledReactivate(absintheSocket, notifier);
  }.bind(undefined);

  const updateIfCanceled = function updateIfCanceled(absintheSocket, notifier) {
    newArrowCheck(this, _this$B);

    return notifier.isActive
      ? notifier
      : updateCanceled(absintheSocket, notifier);
  }.bind(undefined);

  const getExistentIfAny = function getExistentIfAny(absintheSocket, request) {
    newArrowCheck(this, _this$B);

    const notifier = find(absintheSocket.notifiers, "request", request);
    return notifier && updateIfCanceled(absintheSocket, notifier);
  }.bind(undefined);
  /**
   * Sends given request and returns an object (notifier) to track its progress
   * (see observe function)
   *
   * @example
   * import * as withAbsintheSocket from "@absinthe/socket";
   *
   * const operation = `
   *   subscription userSubscription($userId: ID!) {
   *     user(userId: $userId) {
   *       id
   *       name
   *     }
   *   }
   * `;
   *
   * // This example uses a subscription, but the functionallity is the same for
   * // all operation types (queries, mutations and subscriptions)
   *
   * const notifier = withAbsintheSocket.send(absintheSocket, {
   *   operation,
   *   variables: {userId: 10}
   * });
   */

  const send = function send(absintheSocket, request) {
    newArrowCheck(this, _this$B);

    return (
      getExistentIfAny(absintheSocket, request) ||
      sendNew(absintheSocket, request)
    );
  }.bind(undefined);

  const Observable_1 = createCommonjsModule((module, exports) => {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    let _createClass = (function() {
      function defineProperties(target, props) {
        for (let i = 0; i < props.length; i++) {
          let descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    // === Symbol Support ===

    let hasSymbols = function() {
      return typeof Symbol === "function";
    };
    let hasSymbol = function(name) {
      return hasSymbols() && Boolean(Symbol[name]);
    };
    let getSymbol = function(name) {
      return hasSymbol(name) ? Symbol[name] : `@@${  name}`;
    };

    if (hasSymbols() && !hasSymbol("observable")) {
      Symbol.observable = Symbol("observable");
    }

    let SymbolIterator = getSymbol("iterator");
    let SymbolObservable = getSymbol("observable");
    let SymbolSpecies = getSymbol("species");

    // === Abstract Operations ===

    function getMethod(obj, key) {
      const value = obj[key];

      if (value == null) return undefined;

      if (typeof value !== "function")
        throw new TypeError(`${value  } is not a function`);

      return value;
    }

    function getSpecies(obj) {
      let ctor = obj.constructor;
      if (ctor !== undefined) {
        ctor = ctor[SymbolSpecies];
        if (ctor === null) {
          ctor = undefined;
        }
      }
      return ctor !== undefined ? ctor : Observable;
    }

    function isObservable(x) {
      return x instanceof Observable; // SPEC: Brand check
    }

    function hostReportError(e) {
      if (hostReportError.log) {
        hostReportError.log(e);
      } else {
        setTimeout(() => {
          throw e;
        });
      }
    }

    function enqueue(fn) {
      Promise.resolve().then(() => {
        try {
          fn();
        } catch (e) {
          hostReportError(e);
        }
      });
    }

    function cleanupSubscription(subscription) {
      const cleanup = subscription._cleanup;
      if (cleanup === undefined) return;

      subscription._cleanup = undefined;

      if (!cleanup) {
        return;
      }

      try {
        if (typeof cleanup === "function") {
          cleanup();
        } else {
          let unsubscribe = getMethod(cleanup, "unsubscribe");
          if (unsubscribe) {
            unsubscribe.call(cleanup);
          }
        }
      } catch (e) {
        hostReportError(e);
      }
    }

    function closeSubscription(subscription) {
      subscription._observer = undefined;
      subscription._queue = undefined;
      subscription._state = "closed";
    }

    function flushSubscription(subscription) {
      const queue = subscription._queue;
      if (!queue) {
        return;
      }
      subscription._queue = undefined;
      subscription._state = "ready";
      for (let i = 0; i < queue.length; ++i) {
        notifySubscription(subscription, queue[i].type, queue[i].value);
        if (subscription._state === "closed") break;
      }
    }

    function notifySubscription(subscription, type, value) {
      subscription._state = "running";

      let observer = subscription._observer;

      try {
        let m = getMethod(observer, type);
        switch (type) {
          case "next":
            if (m) m.call(observer, value);
            break;
          case "error":
            closeSubscription(subscription);
            if (m) m.call(observer, value);
            else throw value;
            break;
          case "complete":
            closeSubscription(subscription);
            if (m) m.call(observer);
            break;
        }
      } catch (e) {
        hostReportError(e);
      }

      if (subscription._state === "closed") cleanupSubscription(subscription);
      else if (subscription._state === "running") subscription._state = "ready";
    }

    function onNotify(subscription, type, value) {
      if (subscription._state === "closed") return;

      if (subscription._state === "buffering") {
        subscription._queue.push({type, value});
        return;
      }

      if (subscription._state !== "ready") {
        subscription._state = "buffering";
        subscription._queue = [{type, value}];
        enqueue(() => {
          return flushSubscription(subscription);
        });
        return;
      }

      notifySubscription(subscription, type, value);
    }

    let Subscription = (function() {
      function Subscription(observer, subscriber) {
        _classCallCheck(this, Subscription);

        // ASSERT: observer is an object
        // ASSERT: subscriber is callable

        this._cleanup = undefined;
        this._observer = observer;
        this._queue = undefined;
        this._state = "initializing";

        const subscriptionObserver = new SubscriptionObserver(this);

        try {
          this._cleanup = subscriber.call(undefined, subscriptionObserver);
        } catch (e) {
          subscriptionObserver.error(e);
        }

        if (this._state === "initializing") this._state = "ready";
      }

      _createClass(Subscription, [
        {
          key: "unsubscribe",
          value: function unsubscribe() {
            if (this._state !== "closed") {
              closeSubscription(this);
              cleanupSubscription(this);
            }
          }
        },
        {
          key: "closed",
          get() {
            return this._state === "closed";
          }
        }
      ]);

      return Subscription;
    })();

    var SubscriptionObserver = (function() {
      function SubscriptionObserver(subscription) {
        _classCallCheck(this, SubscriptionObserver);

        this._subscription = subscription;
      }

      _createClass(SubscriptionObserver, [
        {
          key: "next",
          value: function next(value) {
            onNotify(this._subscription, "next", value);
          }
        },
        {
          key: "error",
          value: function error(value) {
            onNotify(this._subscription, "error", value);
          }
        },
        {
          key: "complete",
          value: function complete() {
            onNotify(this._subscription, "complete");
          }
        },
        {
          key: "closed",
          get() {
            return this._subscription._state === "closed";
          }
        }
      ]);

      return SubscriptionObserver;
    })();

    var Observable = (exports.Observable = (function() {
      function Observable(subscriber) {
        _classCallCheck(this, Observable);

        if (!(this instanceof Observable))
          throw new TypeError("Observable cannot be called as a function");

        if (typeof subscriber !== "function")
          throw new TypeError("Observable initializer must be a function");

        this._subscriber = subscriber;
      }

      _createClass(
        Observable,
        [
          {
            key: "subscribe",
            value: function subscribe(observer) {
              if (typeof observer !== "object" || observer === null) {
                observer = {
                  next: observer,
                  error: arguments[1],
                  complete: arguments[2]
                };
              }
              return new Subscription(observer, this._subscriber);
            }
          },
          {
            key: "forEach",
            value: function forEach(fn) {
              const _this = this;

              return new Promise(((resolve, reject) => {
                if (typeof fn !== "function") {
                  reject(new TypeError(fn + " is not a function"));
                  return;
                }

                function done() {
                  subscription.unsubscribe();
                  resolve();
                }

                var subscription = _this.subscribe({
                  next: function(value) {
                    try {
                      fn(value, done);
                    } catch (e) {
                      reject(e);
                      subscription.unsubscribe();
                    }
                  },

                  error: reject,
                  complete: resolve
                });
              }));
            }
          },
          {
            key: "map",
            value: function map(fn) {
              let _this2 = this;

              if (typeof fn !== "function")
                throw new TypeError(`${fn  } is not a function`);

              let C = getSpecies(this);

              return new C(((observer) => {
                return _this2.subscribe({
                  next: function(value) {
                    try {
                      value = fn(value);
                    } catch (e) {
                      return observer.error(e);
                    }
                    observer.next(value);
                  },
                  error: function(e) {
                    observer.error(e);
                  },
                  complete: function() {
                    observer.complete();
                  }
                });
              }));
            }
          },
          {
            key: "filter",
            value: function filter(fn) {
              const _this3 = this;

              if (typeof fn !== "function")
                throw new TypeError(`${fn  } is not a function`);

              const C = getSpecies(this);

              return new C(((observer) => {
                return _this3.subscribe({
                  next: function(value) {
                    try {
                      if (!fn(value)) return;
                    } catch (e) {
                      return observer.error(e);
                    }
                    observer.next(value);
                  },
                  error: function(e) {
                    observer.error(e);
                  },
                  complete: function() {
                    observer.complete();
                  }
                });
              }));
            }
          },
          {
            key: "reduce",
            value: function reduce(fn) {
              const _this4 = this;

              if (typeof fn !== "function")
                throw new TypeError(`${fn  } is not a function`);

              const C = getSpecies(this);
              const hasSeed = arguments.length > 1;
              let hasValue = false;
              let seed = arguments[1];
              let acc = seed;

              return new C(((observer) => {
                return _this4.subscribe({
                  next: function(value) {
                    let first = !hasValue;
                    hasValue = true;

                    if (!first || hasSeed) {
                      try {
                        acc = fn(acc, value);
                      } catch (e) {
                        return observer.error(e);
                      }
                    } else {
                      acc = value;
                    }
                  },
                  error: function(e) {
                    observer.error(e);
                  },
                  complete: function() {
                    if (!hasValue && !hasSeed)
                      return observer.error(
                        new TypeError("Cannot reduce an empty sequence")
                      );

                    observer.next(acc);
                    observer.complete();
                  }
                });
              }));
            }
          },
          {
            key: "concat",
            value: function concat() {
              let _this5 = this;

              for (
                var _len = arguments.length, sources = Array(_len), _key = 0;
                _key < _len;
                _key++
              ) {
                sources[_key] = arguments[_key];
              }

              const C = getSpecies(this);

              return new C(((observer) => {
                let subscription = void 0;
                var index = 0;

                function startNext(next) {
                  subscription = next.subscribe({
                    next: function(v) {
                      observer.next(v);
                    },
                    error: function(e) {
                      observer.error(e);
                    },
                    complete: function() {
                      if (index === sources.length) {
                        subscription = undefined;
                        observer.complete();
                      } else {
                        startNext(C.from(sources[index++]));
                      }
                    }
                  });
                }

                startNext(_this5);

                return function() {
                  if (subscription) {
                    subscription.unsubscribe();
                    subscription = undefined;
                  }
                };
              }));
            }
          },
          {
            key: "flatMap",
            value: function flatMap(fn) {
              const _this6 = this;

              if (typeof fn !== "function")
                throw new TypeError(`${fn  } is not a function`);

              const C = getSpecies(this);

              return new C(((observer) => {
                let subscriptions = [];

                let outer = _this6.subscribe({
                  next: function(value) {
                    if (fn) {
                      try {
                        value = fn(value);
                      } catch (e) {
                        return observer.error(e);
                      }
                    }

                    var inner = C.from(value).subscribe({
                      next: function(value) {
                        observer.next(value);
                      },
                      error: function(e) {
                        observer.error(e);
                      },
                      complete: function() {
                        let i = subscriptions.indexOf(inner);
                        if (i >= 0) subscriptions.splice(i, 1);
                        completeIfDone();
                      }
                    });

                    subscriptions.push(inner);
                  },
                  error: function(e) {
                    observer.error(e);
                  },
                  complete: function() {
                    completeIfDone();
                  }
                });

                function completeIfDone() {
                  if (outer.closed && subscriptions.length === 0)
                    observer.complete();
                }

                return function() {
                  subscriptions.forEach(function(s) {
                    return s.unsubscribe();
                  });
                  outer.unsubscribe();
                };
              }));
            }
          },
          {
            key: SymbolObservable,
            value() {
              return this;
            }
          }
        ],
        [
          {
            key: "from",
            value: function from(x) {
              let C = typeof this === "function" ? this : Observable;

              if (x == null) throw new TypeError(`${x  } is not an object`);

              let method = getMethod(x, SymbolObservable);
              if (method) {
                const observable = method.call(x);

                if (Object(observable) !== observable)
                  throw new TypeError(`${observable  } is not an object`);

                if (isObservable(observable) && observable.constructor === C)
                  return observable;

                return new C(((observer) => {
                  return observable.subscribe(observer);
                }));
              }

              if (hasSymbol("iterator")) {
                method = getMethod(x, SymbolIterator);
                if (method) {
                  return new C(((observer) => {
                    enqueue(function() {
                      if (observer.closed) return;
                      let _iteratorNormalCompletion = true;
                      let _didIteratorError = false;
                      let _iteratorError = undefined;

                      try {
                        for (
                          var _iterator = method.call(x)[Symbol.iterator](),
                            _step;
                          !(_iteratorNormalCompletion = (_step = _iterator.next())
                            .done);
                          _iteratorNormalCompletion = true
                        ) {
                          let item = _step.value;

                          observer.next(item);
                          if (observer.closed) return;
                        }
                      } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                      } finally {
                        try {
                          if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                          }
                        } finally {
                          if (_didIteratorError) {
                            throw _iteratorError;
                          }
                        }
                      }

                      observer.complete();
                    });
                  }));
                }
              }

              if (Array.isArray(x)) {
                return new C(((observer) => {
                  enqueue(function() {
                    if (observer.closed) return;
                    for (let i = 0; i < x.length; ++i) {
                      observer.next(x[i]);
                      if (observer.closed) return;
                    }
                    observer.complete();
                  });
                }));
              }

              throw new TypeError(`${x  } is not observable`);
            }
          },
          {
            key: "of",
            value: function of() {
              for (
                var _len2 = arguments.length, items = Array(_len2), _key2 = 0;
                _key2 < _len2;
                _key2++
              ) {
                items[_key2] = arguments[_key2];
              }

              let C = typeof this === "function" ? this : Observable;

              return new C(((observer) => {
                enqueue(function() {
                  if (observer.closed) return;
                  for (let i = 0; i < items.length; ++i) {
                    observer.next(items[i]);
                    if (observer.closed) return;
                  }
                  observer.complete();
                });
              }));
            }
          },
          {
            key: SymbolSpecies,
            get() {
              return this;
            }
          }
        ]
      );

      return Observable;
    })());

    if (hasSymbols()) {
      Object.defineProperty(Observable, Symbol("extensions"), {
        value: {
          symbol: SymbolObservable,
          hostReportError
        },
        configurable: true
      });
    }
  });

  unwrapExports(Observable_1);
  const Observable_2 = Observable_1.Observable;

  const zenObservable = Observable_1.Observable;

  const _this$C;

  // prettier-ignore
  const getUnsubscriber = function getUnsubscriber(absintheSocket, _ref, observer, unsubscribe) {
	  const _this2 = this;

	  const request = _ref.request;

	  newArrowCheck(this, _this$C);

	  return function () {
	    newArrowCheck(this, _this2);

	    const notifier = find(absintheSocket.notifiers, "request", request);
	    unsubscribe(absintheSocket, notifier, notifier ? observer : undefined);
	  }.bind(this);
	}.bind(undefined);

  const onResult = function onResult(_ref2, observableObserver) {
    const _this3 = this;

    const operationType = _ref2.operationType;

    newArrowCheck(this, _this$C);

    return function(result) {
      newArrowCheck(this, _this3);

      observableObserver.next(result);

      if (operationType !== "subscription") {
        observableObserver.complete();
      }
    }.bind(this);
  }.bind(undefined);

  const createObserver = function createObserver(
    notifier,
    handlers,
    observableObserver
  ) {
    newArrowCheck(this, _this$C);

    return objectSpread({}, handlers, {
      onAbort: observableObserver.error.bind(observableObserver),
      onResult: onResult(notifier, observableObserver)
    });
  }.bind(undefined);
  /**
   * Creates an Observable that will follow the given notifier
   *
   * @param {AbsintheSocket} absintheSocket
   * @param {Notifier<Result, Variables>} notifier
   * @param {Object} [options]
   * @param {function(error: Error): undefined} [options.onError]
   * @param {function(notifier: Notifier<Result, Variables>): undefined} [options.onStart]
   * @param {function(): undefined} [options.unsubscribe]
   *
   * @return {Observable}
   *
   * @example
   * import * as withAbsintheSocket from "@absinthe/socket";
   *
   * const unobserveOrCancelIfNeeded = (absintheSocket, notifier, observer) => {
   *   if (notifier && observer) {
   *     withAbsintheSocket.unobserveOrCancel(absintheSocket, notifier, observer);
   *   }
   * };
   *
   * const logEvent = eventName => (...args) => console.log(eventName, ...args);
   *
   * const observable = withAbsintheSocket.toObservable(absintheSocket, notifier, {
   *   onError: logEvent("error"),
   *   onStart: logEvent("open"),
   *   unsubscribe: unobserveOrCancelIfNeeded
   * });
   */

  const toObservable = function toObservable(absintheSocket, notifier) {
    const _this4 = this;

    const _ref3 =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    let unsubscribe = _ref3.unsubscribe;

    let handlers = objectWithoutProperties(_ref3, ["unsubscribe"]);

    newArrowCheck(this, _this$C);

    return new zenObservable(observableObserver => {
      newArrowCheck(this, _this4);

      const observer = createObserver(notifier, handlers, observableObserver);
      observe$1(absintheSocket, notifier, observer);
      return (
        unsubscribe &&
        getUnsubscriber(absintheSocket, notifier, observer, unsubscribe)
      );
    });
  }.bind(undefined);

  // https://github.com/tc39/Array.prototype.includes

  const $includes = _arrayIncludes(true);

  _export(_export.P, "Array", {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes(
        this,
        el,
        arguments.length > 1 ? arguments[1] : undefined
      );
    }
  });

  _addToUnscopables("includes");

  // 7.2.8 IsRegExp(argument)

  const MATCH = _wks("match");
  const _isRegexp = function(it) {
    let isRegExp;
    return (
      _isObject(it) &&
      ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == "RegExp")
    );
  };

  // helper for String#{startsWith, endsWith, includes}

  const _stringContext = function(that, searchString, NAME) {
    if (_isRegexp(searchString))
      throw TypeError(`String#${NAME} doesn't accept regex!`);
    return String(_defined(that));
  };

  const MATCH$1 = _wks("match");
  const _failsIsRegexp = function(KEY) {
    const re = /./;
    try {
      "/./"[KEY](re);
    } catch (e) {
      try {
        re[MATCH$1] = false;
        return !"/./"[KEY](re);
      } catch (f) {
        /* empty */
      }
    }
    return true;
  };

  const INCLUDES = "includes";

  _export(_export.P + _export.F * _failsIsRegexp(INCLUDES), "String", {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~_stringContext(this, searchString, INCLUDES).indexOf(
        searchString,
        arguments.length > 1 ? arguments[1] : undefined
      );
    }
  });

  const $indexOf = _arrayIncludes(false);
  const $native = [].indexOf;
  const NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

  _export(
    _export.P + _export.F * (NEGATIVE_ZERO || !_strictMethod($native)),
    "Array",
    {
      // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
      indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
        return NEGATIVE_ZERO
          ? // convert -0 to +0
            $native.apply(this, arguments) || 0
          : $indexOf(this, searchElement, arguments[1]);
      }
    }
  );

  const _this$D;

  const removeObserver = function removeObserver(observers, observer) {
    newArrowCheck(this, _this$D);

    return remove$1(observers.indexOf(observer), 1, observers);
  }.bind(undefined);

  const unobserve = function unobserve(_ref, observer) {
    const activeObservers = _ref.activeObservers;

    let rest = objectWithoutProperties(_ref, ["activeObservers"]);

    newArrowCheck(this, _this$D);

    return objectSpread({}, rest, {
      activeObservers: removeObserver(activeObservers, observer)
    });
  }.bind(undefined);

  const _this$E;

  const ensureHasActiveObserver = function ensureHasActiveObserver(
    notifier,
    observer
  ) {
    newArrowCheck(this, _this$E);

    if (notifier.activeObservers.includes(observer)) return notifier;
    throw new Error("Observer is not attached to notifier");
  }.bind(undefined);
  /**
   * Detaches observer from notifier
   *
   * @example
   * import * as withAbsintheSocket from "@absinthe/socket";
   *
   * withAbsintheSocket.unobserve(absintheSocket, notifier, observer);
   */

  const unobserve$1 = function unobserve$$1(absintheSocket, notifier, observer) {
    newArrowCheck(this, _this$E);

    return updateNotifiers(
      absintheSocket,
      refresh(unobserve(ensureHasActiveObserver(notifier, observer), observer))
    );
  }.bind(undefined);

  const _this$F;

  const doUnobserveOrCancel = function doUnobserveOrCancel(
    absintheSocket,
    notifier,
    observer
  ) {
    newArrowCheck(this, _this$F);

    return notifier.activeObservers.length === 1
      ? cancel$1(absintheSocket, notifier)
      : unobserve$1(absintheSocket, notifier, observer);
  }.bind(undefined);
  /**
   * Cancels notifier if there are no more observers apart from the one given, or
   * detaches given observer from notifier otherwise
   *
   * @example
   * import * as withAbsintheSocket from "@absinthe/socket";
   *
   * withAbsintheSocket.unobserve(absintheSocket, notifier, observer);
   */

  const unobserveOrCancel = function unobserveOrCancel(
    absintheSocket,
    notifier,
    observer
  ) {
    newArrowCheck(this, _this$F);

    return notifier.isActive
      ? doUnobserveOrCancel(absintheSocket, notifier, observer)
      : absintheSocket;
  }.bind(undefined);

  exports.cancel = cancel$1;
  exports.create = create;
  exports.observe = observe$1;
  exports.send = send;
  exports.toObservable = toObservable;
  exports.unobserve = unobserve$1;
  exports.unobserveOrCancel = unobserveOrCancel;

  Object.defineProperty(exports, "__esModule", {value: true});
});
// # sourceMappingURL=index.js.map
