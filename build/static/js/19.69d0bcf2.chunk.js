(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[19],{1021:function(e,t,a){"use strict";var n=a(908),o=a(909),s=a(4),i=a.n(s),r=a(108),c=a.n(r),l=a(906),d=a.n(l),u=a(907),p=["className","cssModule","children","toggle","tag","wrapTag","closeAriaLabel","charCode","close"],m={tag:u.n,wrapTag:u.n,toggle:c.a.func,className:c.a.string,cssModule:c.a.object,children:c.a.node,closeAriaLabel:c.a.string,charCode:c.a.oneOfType([c.a.string,c.a.number]),close:c.a.object},h=function(e){var t,a=e.className,s=e.cssModule,r=e.children,c=e.toggle,l=e.tag,m=e.wrapTag,h=e.closeAriaLabel,b=e.charCode,g=e.close,f=Object(o.a)(e,p),O=Object(u.j)(d()(a,"modal-header"),s);if(!g&&c){var j="number"===typeof b?String.fromCharCode(b):b;t=i.a.createElement("button",{type:"button",onClick:c,className:Object(u.j)("close",s),"aria-label":h},i.a.createElement("span",{"aria-hidden":"true"},j))}return i.a.createElement(m,Object(n.a)({},f,{className:O}),i.a.createElement(l,{className:Object(u.j)("modal-title",s)},r),g||t)};h.propTypes=m,h.defaultProps={tag:"h5",wrapTag:"div",closeAriaLabel:"Close",charCode:215},t.a=h},1022:function(e,t,a){"use strict";var n=a(908),o=a(909),s=a(4),i=a.n(s),r=a(108),c=a.n(r),l=a(906),d=a.n(l),u=a(907),p=["className","cssModule","tag"],m={tag:u.n,className:c.a.string,cssModule:c.a.object},h=function(e){var t=e.className,a=e.cssModule,s=e.tag,r=Object(o.a)(e,p),c=Object(u.j)(d()(t,"modal-body"),a);return i.a.createElement(s,Object(n.a)({},r,{className:c}))};h.propTypes=m,h.defaultProps={tag:"div"},t.a=h},1023:function(e,t,a){"use strict";var n=a(908),o=a(909),s=a(4),i=a.n(s),r=a(108),c=a.n(r),l=a(906),d=a.n(l),u=a(907),p=["className","cssModule","tag"],m={tag:u.n,className:c.a.string,cssModule:c.a.object},h=function(e){var t=e.className,a=e.cssModule,s=e.tag,r=Object(o.a)(e,p),c=Object(u.j)(d()(t,"modal-footer"),a);return i.a.createElement(s,Object(n.a)({},r,{className:c}))};h.propTypes=m,h.defaultProps={tag:"div"},t.a=h},1025:function(e,t,a){"use strict";var n=a(922),o=a(908),s=a(913),i=a(911),r=a(4),c=a.n(r),l=a(108),d=a.n(l),u=a(906),p=a.n(u),m=a(177),h=a.n(m),b=a(907),g={children:d.a.node.isRequired,node:d.a.any},f=function(e){function t(){return e.apply(this,arguments)||this}Object(i.a)(t,e);var a=t.prototype;return a.componentWillUnmount=function(){this.defaultNode&&document.body.removeChild(this.defaultNode),this.defaultNode=null},a.render=function(){return b.c?(this.props.node||this.defaultNode||(this.defaultNode=document.createElement("div"),document.body.appendChild(this.defaultNode)),h.a.createPortal(this.props.children,this.props.node||this.defaultNode)):null},t}(c.a.Component);f.propTypes=g;var O=f,j=a(945);function k(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function E(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?k(Object(a),!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):k(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function y(){}var C=d.a.shape(j.a.propTypes),v={isOpen:d.a.bool,autoFocus:d.a.bool,centered:d.a.bool,scrollable:d.a.bool,size:d.a.string,toggle:d.a.func,keyboard:d.a.bool,role:d.a.string,labelledBy:d.a.string,backdrop:d.a.oneOfType([d.a.bool,d.a.oneOf(["static"])]),onEnter:d.a.func,onExit:d.a.func,onOpened:d.a.func,onClosed:d.a.func,children:d.a.node,className:d.a.string,wrapClassName:d.a.string,modalClassName:d.a.string,backdropClassName:d.a.string,contentClassName:d.a.string,external:d.a.node,fade:d.a.bool,cssModule:d.a.object,zIndex:d.a.oneOfType([d.a.number,d.a.string]),backdropTransition:C,modalTransition:C,innerRef:d.a.oneOfType([d.a.object,d.a.string,d.a.func]),unmountOnClose:d.a.bool,returnFocusAfterClose:d.a.bool,container:b.o,trapFocus:d.a.bool},N=Object.keys(v),T={isOpen:!1,autoFocus:!0,centered:!1,scrollable:!1,role:"dialog",backdrop:!0,keyboard:!0,zIndex:1050,fade:!0,onOpened:y,onClosed:y,modalTransition:{timeout:b.b.Modal},backdropTransition:{mountOnEnter:!0,timeout:b.b.Fade},unmountOnClose:!0,returnFocusAfterClose:!0,container:"body",trapFocus:!1},_=function(e){function t(t){var a;return(a=e.call(this,t)||this)._element=null,a._originalBodyPadding=null,a.getFocusableChildren=a.getFocusableChildren.bind(Object(s.a)(a)),a.handleBackdropClick=a.handleBackdropClick.bind(Object(s.a)(a)),a.handleBackdropMouseDown=a.handleBackdropMouseDown.bind(Object(s.a)(a)),a.handleEscape=a.handleEscape.bind(Object(s.a)(a)),a.handleStaticBackdropAnimation=a.handleStaticBackdropAnimation.bind(Object(s.a)(a)),a.handleTab=a.handleTab.bind(Object(s.a)(a)),a.onOpened=a.onOpened.bind(Object(s.a)(a)),a.onClosed=a.onClosed.bind(Object(s.a)(a)),a.manageFocusAfterClose=a.manageFocusAfterClose.bind(Object(s.a)(a)),a.clearBackdropAnimationTimeout=a.clearBackdropAnimationTimeout.bind(Object(s.a)(a)),a.trapFocus=a.trapFocus.bind(Object(s.a)(a)),a.state={isOpen:!1,showStaticBackdropAnimation:!1},a}Object(i.a)(t,e);var a=t.prototype;return a.componentDidMount=function(){var e=this.props,t=e.isOpen,a=e.autoFocus,n=e.onEnter;t&&(this.init(),this.setState({isOpen:!0}),a&&this.setFocus()),n&&n(),document.addEventListener("focus",this.trapFocus,!0),this._isMounted=!0},a.componentDidUpdate=function(e,t){if(this.props.isOpen&&!e.isOpen)return this.init(),void this.setState({isOpen:!0});this.props.autoFocus&&this.state.isOpen&&!t.isOpen&&this.setFocus(),this._element&&e.zIndex!==this.props.zIndex&&(this._element.style.zIndex=this.props.zIndex)},a.componentWillUnmount=function(){this.clearBackdropAnimationTimeout(),this.props.onExit&&this.props.onExit(),this._element&&(this.destroy(),(this.props.isOpen||this.state.isOpen)&&this.close()),document.removeEventListener("focus",this.trapFocus,!0),this._isMounted=!1},a.trapFocus=function(e){if(this.props.trapFocus&&this._element&&(!this._dialog||this._dialog.parentNode!==e.target)&&!(this.modalIndex<t.openCount-1)){for(var a=this.getFocusableChildren(),n=0;n<a.length;n++)if(a[n]===e.target)return;a.length>0&&(e.preventDefault(),e.stopPropagation(),a[0].focus())}},a.onOpened=function(e,t){this.props.onOpened(),(this.props.modalTransition.onEntered||y)(e,t)},a.onClosed=function(e){var t=this.props.unmountOnClose;this.props.onClosed(),(this.props.modalTransition.onExited||y)(e),t&&this.destroy(),this.close(),this._isMounted&&this.setState({isOpen:!1})},a.setFocus=function(){this._dialog&&this._dialog.parentNode&&"function"===typeof this._dialog.parentNode.focus&&this._dialog.parentNode.focus()},a.getFocusableChildren=function(){return this._element.querySelectorAll(b.e.join(", "))},a.getFocusedChild=function(){var e,t=this.getFocusableChildren();try{e=document.activeElement}catch(a){e=t[0]}return e},a.handleBackdropClick=function(e){if(e.target===this._mouseDownElement){e.stopPropagation();var t=this._dialog?this._dialog.parentNode:null;if(t&&e.target===t&&"static"===this.props.backdrop&&this.handleStaticBackdropAnimation(),!this.props.isOpen||!0!==this.props.backdrop)return;t&&e.target===t&&this.props.toggle&&this.props.toggle(e)}},a.handleTab=function(e){if(9===e.which&&!(this.modalIndex<t.openCount-1)){var a=this.getFocusableChildren(),n=a.length;if(0!==n){for(var o=this.getFocusedChild(),s=0,i=0;i<n;i+=1)if(a[i]===o){s=i;break}e.shiftKey&&0===s?(e.preventDefault(),a[n-1].focus()):e.shiftKey||s!==n-1||(e.preventDefault(),a[0].focus())}}},a.handleBackdropMouseDown=function(e){this._mouseDownElement=e.target},a.handleEscape=function(e){this.props.isOpen&&e.keyCode===b.i.esc&&this.props.toggle&&(this.props.keyboard?(e.preventDefault(),e.stopPropagation(),this.props.toggle(e)):"static"===this.props.backdrop&&(e.preventDefault(),e.stopPropagation(),this.handleStaticBackdropAnimation()))},a.handleStaticBackdropAnimation=function(){var e=this;this.clearBackdropAnimationTimeout(),this.setState({showStaticBackdropAnimation:!0}),this._backdropAnimationTimeout=setTimeout((function(){e.setState({showStaticBackdropAnimation:!1})}),100)},a.init=function(){try{this._triggeringElement=document.activeElement}catch(e){this._triggeringElement=null}this._element||(this._element=document.createElement("div"),this._element.setAttribute("tabindex","-1"),this._element.style.position="relative",this._element.style.zIndex=this.props.zIndex,this._mountContainer=Object(b.g)(this.props.container),this._mountContainer.appendChild(this._element)),this._originalBodyPadding=Object(b.f)(),Object(b.d)(),0===t.openCount&&(document.body.className=p()(document.body.className,Object(b.j)("modal-open",this.props.cssModule))),this.modalIndex=t.openCount,t.openCount+=1},a.destroy=function(){this._element&&(this._mountContainer.removeChild(this._element),this._element=null),this.manageFocusAfterClose()},a.manageFocusAfterClose=function(){if(this._triggeringElement){var e=this.props.returnFocusAfterClose;this._triggeringElement.focus&&e&&this._triggeringElement.focus(),this._triggeringElement=null}},a.close=function(){if(t.openCount<=1){var e=Object(b.j)("modal-open",this.props.cssModule),a=new RegExp("(^| )"+e+"( |$)");document.body.className=document.body.className.replace(a," ").trim()}this.manageFocusAfterClose(),t.openCount=Math.max(0,t.openCount-1),Object(b.m)(this._originalBodyPadding)},a.renderModalDialog=function(){var e,t=this,a=Object(b.k)(this.props,N);return c.a.createElement("div",Object(o.a)({},a,{className:Object(b.j)(p()("modal-dialog",this.props.className,(e={},e["modal-"+this.props.size]=this.props.size,e["modal-dialog-centered"]=this.props.centered,e["modal-dialog-scrollable"]=this.props.scrollable,e)),this.props.cssModule),role:"document",ref:function(e){t._dialog=e}}),c.a.createElement("div",{className:Object(b.j)(p()("modal-content",this.props.contentClassName),this.props.cssModule)},this.props.children))},a.render=function(){var e=this.props.unmountOnClose;if(this._element&&(this.state.isOpen||!e)){var t=!!this._element&&!this.state.isOpen&&!e;this._element.style.display=t?"none":"block";var a=this.props,n=a.wrapClassName,s=a.modalClassName,i=a.backdropClassName,r=a.cssModule,l=a.isOpen,d=a.backdrop,u=a.role,m=a.labelledBy,h=a.external,g=a.innerRef,f={onClick:this.handleBackdropClick,onMouseDown:this.handleBackdropMouseDown,onKeyUp:this.handleEscape,onKeyDown:this.handleTab,style:{display:"block"},"aria-labelledby":m,role:u,tabIndex:"-1"},k=this.props.fade,y=E(E(E({},j.a.defaultProps),this.props.modalTransition),{},{baseClass:k?this.props.modalTransition.baseClass:"",timeout:k?this.props.modalTransition.timeout:0}),C=E(E(E({},j.a.defaultProps),this.props.backdropTransition),{},{baseClass:k?this.props.backdropTransition.baseClass:"",timeout:k?this.props.backdropTransition.timeout:0}),v=d&&(k?c.a.createElement(j.a,Object(o.a)({},C,{in:l&&!!d,cssModule:r,className:Object(b.j)(p()("modal-backdrop",i),r)})):c.a.createElement("div",{className:Object(b.j)(p()("modal-backdrop","show",i),r)}));return c.a.createElement(O,{node:this._element},c.a.createElement("div",{className:Object(b.j)(n)},c.a.createElement(j.a,Object(o.a)({},f,y,{in:l,onEntered:this.onOpened,onExited:this.onClosed,cssModule:r,className:Object(b.j)(p()("modal",s,this.state.showStaticBackdropAnimation&&"modal-static"),r),innerRef:g}),h,this.renderModalDialog()),v))}return null},a.clearBackdropAnimationTimeout=function(){this._backdropAnimationTimeout&&(clearTimeout(this._backdropAnimationTimeout),this._backdropAnimationTimeout=void 0)},t}(c.a.Component);_.propTypes=v,_.defaultProps=T,_.openCount=0;t.a=_},1400:function(e,t,a){"use strict";a.r(t);var n=a(4),o=a.n(n),s=a(932),i=a(955),r=a(944),c=a(917),l=a(956),d=a(931),u=a(959),p=a(1383),m=a(1025),h=a(1021),b=a(1022),g=a(1023),f=a(63),O=a(85),j=a(915);t.default=function(e){const[t,a]=Object(n.useState)([]),[k,E]=Object(n.useState)([]),[y,C]=Object(n.useState)(!1),[v,N]=Object(n.useState)(!1),T={"To Do":"warning",Done:"success",Doing:"info"};Object(n.useEffect)(()=>{_()},[]);const _=async()=>{var e=[],t=await w();t&&(Object.keys(t).forEach((function(t){e.push(t)})),E(e),a(t))},w=async()=>{try{let e="Fiji-Dev",a="/tickets",n={headers:{Authorization:"Bearer ".concat((await f.b.currentSession()).getIdToken().getJwtToken())}};var t=await f.a.get(e,a,n)}catch(a){"Request failed with status code 502"===a.message?A(!0):(alert(JSON.stringify(a)),e.onLogout())}return t},A=function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];C(e)},F=e=>t=>{N(!0),(async e=>{let a="/tickets/".concat(e,"/update"),n={headers:{Authorization:"Bearer ".concat((await f.b.currentSession()).getIdToken().getJwtToken())}};try{await f.a.del("Fiji-Dev",a,n)}catch(t){alert(t)}})(e),_(),N(!1)},M=()=>o.a.createElement(s.a,{xs:"12"},k.map((e,t)=>o.a.createElement(i.a,null,o.a.createElement(r.a,null,o.a.createElement("strong",null,e),o.a.createElement("div",{className:"card-header-actions"},o.a.createElement(O.Link,{to:"/tickets/new/"},o.a.createElement(c.a,{block:!0,color:"ghost-success",size:"sm"},"New Ticket")))),o.a.createElement(l.a,null,o.a.createElement(d.a,null,B(e))),o.a.createElement(u.a,null)))),B=e=>{var a=t[e];let n=[];for(var d in a)n.push(o.a.createElement(s.a,{md:"4"},o.a.createElement(i.a,null,o.a.createElement(r.a,null,o.a.createElement("strong",null,d," - ",a[d].ticketTitle),o.a.createElement("div",{className:"card-header-actions"},o.a.createElement(p.a,{color:T[a[d].ticketStatus],className:"float-right"},a[d].ticketStatus))),o.a.createElement(l.a,null,o.a.createElement("p",null,a[d].ticketDescription," ")),o.a.createElement(u.a,null,o.a.createElement(j.a,{size:"sm",color:"success",className:"float-right mx-1",onClick:F(d),isLoading:v},"Close Ticket"),o.a.createElement(O.Link,{to:"/tickets/edit/".concat(d)},o.a.createElement(c.a,{type:"submit",size:"sm",color:"primary",className:"float-right mx-1"},"Update Ticket")),o.a.createElement(c.a,{size:"sm",color:"light",className:"float-right mx-1"},"Add Comment")))));return n};return o.a.createElement("div",{className:"animated fadeIn"},o.a.createElement(d.a,null,o.a.createElement(n.Suspense,{fallback:o.a.createElement("h1",null,"Doesn't work")},o.a.createElement(M,null))),o.a.createElement(m.a,{isOpen:y,toggle:A,className:"modal-danger"},o.a.createElement(h.a,{toggle:A},"API Error"),o.a.createElement(b.a,null,"We are having issues connecting to the API, please try again later."),o.a.createElement(g.a,null,o.a.createElement(c.a,{color:"secondary",onClick:()=>{A(!1),e.history.push("/dashboard")}},"Ok"))))}},915:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(4),o=a.n(n),s=a(917),i=a(1032);a(916);function r(e){let{isLoading:t,className:a="",disabled:n=!1,...r}=e;return o.a.createElement(s.a,Object.assign({className:"LoaderButton ".concat(a),disabled:n||t},r),t&&o.a.createElement(i.a,{size:"sm",color:"light"}),r.children)}},916:function(e,t,a){},944:function(e,t,a){"use strict";var n=a(908),o=a(909),s=a(4),i=a.n(s),r=a(108),c=a.n(r),l=a(906),d=a.n(l),u=a(907),p=["className","cssModule","tag"],m={tag:u.n,className:c.a.string,cssModule:c.a.object},h=function(e){var t=e.className,a=e.cssModule,s=e.tag,r=Object(o.a)(e,p),c=Object(u.j)(d()(t,"card-header"),a);return i.a.createElement(s,Object(n.a)({},r,{className:c}))};h.propTypes=m,h.defaultProps={tag:"div"},t.a=h}}]);
//# sourceMappingURL=19.69d0bcf2.chunk.js.map