(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[40],{1415:function(e,a,t){"use strict";t.r(a);var s=t(4),c=t.n(s),n=t(1111),o=t(1127),r=t(908),l=t(909),i=t(108),u=t.n(i),m=t(906),d=t.n(m),p=t(907),b=["className","cssModule","tag"],j={tag:p.n,className:u.a.string,cssModule:u.a.object},E=function(e){var a=e.className,t=e.cssModule,s=e.tag,n=Object(l.a)(e,b),o=Object(p.j)(d()(a,"card-columns"),t);return c.a.createElement(s,Object(r.a)({},n,{className:o}))};E.propTypes=j,E.defaultProps={tag:"div"};var g=E,f=t(955),v=t(944),y=t(956),h=t(63);a.default=function(e){const[a,t]=Object(s.useState)({}),[r,l]=Object(s.useState)({});var i={},u={};const m={tooltips:{enabled:!1,custom:o.CustomTooltips},maintainAspectRatio:!1};Object(s.useEffect)(()=>{d()},[r]);const d=async()=>{(i=await p())&&t(i)},p=async()=>{try{let e="Fiji-Dev",t="/tickets/dashboard",s={headers:{Authorization:"Bearer ".concat((await h.b.currentSession()).getIdToken().getJwtToken())}};var a=await h.a.get(e,t,s)}catch(t){"Request failed with status code 502"===t.message||(alert(JSON.stringify(t)),e.onLogout())}return a},b=()=>((()=>{for(var e in console.log("test"),a){var t=[],s=[],c={datasets:[{data:[],backgroundColor:["#FF6384","#4BC0C0","#FFCE56","#E7E9ED","#36A2EB"],label:""}],labels:[]};Object.values(a[e].Counts).map(e=>t.push(e)),Object.keys(a[e].Counts).map(e=>s.push(e)),c.datasets[0].data=t,c.labels=s,c.datasets[0].label=e,u[a[e].projectKey]=c}console.log(u)})(),c.a.createElement(g,{className:"cols-2"},Object.keys(a).map((e,t)=>c.a.createElement(f.a,{key:a[e].projectKey},c.a.createElement(v.a,null,"Tickets by status: ",e),c.a.createElement(y.a,null,c.a.createElement("div",{className:"chart-wrapper"},c.a.createElement(n.Pie,{data:u[a[e].projectKey],options:m})))))));return c.a.createElement("div",{className:"animated fadeIn"},c.a.createElement(b,null))}}}]);
//# sourceMappingURL=40.4090710d.chunk.js.map