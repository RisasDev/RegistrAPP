"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[193],{193:(M,f,t)=>{t.r(f),t.d(f,{PerfilPageModule:()=>p});var d=t(177),P=t(4341),i=t(4742),a=t(1739),e=t(3953),c=t(7185);const g=()=>["/controller"];function h(n,l){1&n&&(e.j41(0,"ion-button",7),e.EFF(1,"Ver Usuarios"),e.k0s()),2&n&&e.Y8G("routerLink",e.lJ4(1,g))}const m=[{path:"",component:(()=>{var n;class l{constructor(o,s){this.router=o,this.apiService=s,this.user={},this.users=[];const u=this.router.getCurrentNavigation();this.user=(null==u?void 0:u.extras.state).user}ngOnInit(){this.apiService.getUsers().subscribe(o=>{this.users=o})}}return(n=l).\u0275fac=function(o){return new(o||n)(e.rXU(a.Ix),e.rXU(c.G))},n.\u0275cmp=e.VBU({type:n,selectors:[["app-perfil"]],decls:18,vars:6,consts:[[3,"translucent"],["slot","start"],[3,"fullscreen"],["collapse","condense"],["size","large"],["id","container"],["color","warning","fill","outline",3,"routerLink",4,"ngIf"],["color","warning","fill","outline",3,"routerLink"]],template:function(o,s){1&o&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),e.nrm(3,"ion-back-button"),e.k0s(),e.j41(4,"ion-title"),e.EFF(5,"Perfil"),e.k0s()()(),e.j41(6,"ion-content",2)(7,"ion-header",3)(8,"ion-toolbar")(9,"ion-title",4),e.EFF(10,"Perfil"),e.k0s()()(),e.j41(11,"div",5)(12,"h1"),e.EFF(13),e.k0s()(),e.j41(14,"div")(15,"h6"),e.EFF(16),e.k0s()(),e.DNE(17,h,2,2,"ion-button",6),e.k0s()),2&o&&(e.Y8G("translucent",!0),e.R7$(6),e.Y8G("fullscreen",!0),e.R7$(7),e.Lme("Bienvenido/a ",s.user.firstname," ",s.user.lastname,""),e.R7$(3),e.SpI("Has ingresado como ",s.user.role,""),e.R7$(),e.Y8G("ngIf","Profesor"===s.user.role))},dependencies:[d.bT,i.Jm,i.QW,i.W9,i.eU,i.BC,i.ai,i.el,i.N7,a.Wk]}),l})()},{path:"alumno",loadChildren:()=>t.e(8107).then(t.bind(t,8107)).then(n=>n.AlumnoPageModule)},{path:"docente",loadChildren:()=>t.e(3905).then(t.bind(t,3905)).then(n=>n.DocentePageModule)},{path:"qr-view",loadChildren:()=>t.e(5699).then(t.bind(t,5699)).then(n=>n.QrViewPageModule)}];let v=(()=>{var n;class l{}return(n=l).\u0275fac=function(o){return new(o||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[a.iI.forChild(m),a.iI]}),l})(),p=(()=>{var n;class l{}return(n=l).\u0275fac=function(o){return new(o||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[d.MD,P.YN,i.bv,v]}),l})()}}]);