webpackHotUpdate("static\\development\\pages\\login.js",{

/***/ "./pages/login.js":
/*!************************!*\
  !*** ./pages/login.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _comps_selectbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../comps/selectbox */ "./comps/selectbox.js");
/* harmony import */ var _comps_DesignInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../comps/DesignInput */ "./comps/DesignInput.js");
/* harmony import */ var _comps_DesignCheckbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../comps/DesignCheckbox */ "./comps/DesignCheckbox.js");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../i18n */ "./i18n.js");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_i18n__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _static_css_app_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../static/css/app.scss */ "./static/css/app.scss");
/* harmony import */ var _static_css_app_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_static_css_app_scss__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _redux_module_login__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../redux/module/login */ "./redux/module/login.js");


var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;






 // css




var Login = function Login(props) {
  var t = props.t;
  var options = [{
    value: 'ko',
    label: t('korean')
  }, {
    value: 'en',
    label: t('english')
  }, {
    value: 'ja',
    label: t('japenese')
  }];

  var _login = function _login(username, password) {
    // this.props.dispatch(loginRequest({username, password}))
    // this.props.dispatch(loginRequest({username :'username', password:'password'}))
    props.dispatch(Object(_redux_module_login__WEBPACK_IMPORTED_MODULE_10__["loginRequest"])({
      username: 'username',
      password: 'password'
    }));
  };

  return __jsx("div", {
    className: "platform--login-wrap menu-select-wrap"
  }, __jsx("div", {
    className: "menu-select--lang-wrap"
  }, __jsx(_comps_selectbox__WEBPACK_IMPORTED_MODULE_5__["default"], {
    options: options
  })), __jsx("div", {
    className: "platform--login-wrap--content"
  }, __jsx("div", {
    className: "platform--login-logo"
  }, __jsx("p", null, t('welcome'))), __jsx("div", null, __jsx(_comps_DesignInput__WEBPACK_IMPORTED_MODULE_6__["default"], {
    placeholder: t('login.id'),
    name: "username"
  }), __jsx(_comps_DesignInput__WEBPACK_IMPORTED_MODULE_6__["default"], {
    type: "password",
    placeholder: t('login.pasword'),
    name: "password"
  }), __jsx("div", {
    className: "left"
  }, __jsx(_comps_DesignCheckbox__WEBPACK_IMPORTED_MODULE_7__["default"], {
    id: "check_remember",
    name: "remember",
    text: t('login.save')
  })), __jsx("button", {
    className: "button btn-main platform--login-btn",
    onClick: _login
  }, t('login.btn')), __jsx("div", {
    className: "platform--login-info"
  }, __jsx("p", null, t('login.info')), __jsx("p", null, t('login.infoEmail'))))));
};

Login.getInitialProps =
/*#__PURE__*/
Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", {
            namespacesRequired: ['common']
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));
Login.propTypes = {
  t: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func.isRequired,
  history: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object,
  dispatch: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func
};

function select(state) {
  return {
    data: state
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(_i18n__WEBPACK_IMPORTED_MODULE_8__["withTranslation"])('common')(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(select)(Login)));

/***/ })

})
//# sourceMappingURL=login.js.dc73979e4c45c588f2a0.hot-update.js.map