angular.module("rainMenu",[]),function(){function n(){return{restrict:"AE",require:"^rainMenu",transclude:!0,scope:{label:"@",icon:"@",route:"@"},templateUrl:"rainModules/rainMenu/rainMenuItem/rainMenuItemTemplate.html",link:e}}function e(n,e,r,i){n.isActive=function(){return e===i.getActiveElement()},n.isVertical=function(){return i.isVertical()},e.on("click",function(r){r.stopPropagation(),r.preventDefault(),n.$apply(function(){i.setActiveElement(e),i.setRoute(n.route),n.isVertical()||i.closeCurrentMenu()})})}angular.module("rainMenu").directive("rainMenuItem",n)}(),function(){function n(){return{restrict:"AE",require:"^rainMenu",transclude:!0,scope:{label:"@",icon:"@"},templateUrl:"rainModules/rainMenu/rainMenuGroup/rainMenuGroupTemplate.html",link:e}}function e(n,e,r,i){function t(){var n=e.offset(),r=e.find(".r-menu-group-horizontal"),i=40;r&&(i=r.height()),e.find(".r-menu-sub-section").css({left:n.left+2,top:i+6})}n.isOpen=!1,n.closeMenu=function(){n.isOpen=!1},n.isActiveGroup=function(){return e===i.getActiveGroupElement()},n.clicked=function(){n.isOpen||i.closeCurrentMenu(),n.isOpen=!n.isOpen,n.isVertical()||t(),i.setOpenMenuScope(n)},n.isVertical=function(){return i.isVertical()},e.on("click",function(r){r.stopPropagation(),r.preventDefault(),n.$apply(function(){i.setActiveGroupElement(e),i.setRoute(n.route)})})}angular.module("rainMenu").directive("rainMenuGroup",n)}(),function(){var n=angular.module("rainGrid",[]),e={baseUrl:"rainModules/rainGrid/",version:"1.0.0"};n.value("rainGridConfig",e)}(),function(){function n(){return{restrict:"AE",templateUrl:"rainModules/rainGrid/rainGridMenu/rainGridMenuTemplate.html",replace:!1,scope:{filterData:"&",gridOptions:"="},controller:"rainGrid.menu.controller"}}angular.module("rainGrid").directive("rainGridMenu",[n])}(),function(){function n(n,e){function r(){t(),n.filters=[{col:{},constraint:{},expression:""}],i()}function i(){if(0===n.filters.length)n.hasFiltered=!1;else{var e=n.filters[0];n.hasFiltered=!!e.col&&!!e.constraint&&void 0!==e.expression&&""!==e.expression}}function t(){n.status={isOpen:!1},n.toggled=function(n){console.log("Dropdown is now: ",n)},n.toggleDropdown=function(e){e.preventDefault(),e.stopPropagation(),n.status.isOpen=!n.status.isOpen}}r(),n.doFilter=function(){var r=e.showFilterModal(n.gridOptions,n.filters);r.then(function(e){e.isCancel||(n.filters=e.filters,i(),n.filterData({filters:n.filters}))})},n.removeFilters=function(){n.filters=[{col:{},constraint:{},expression:""}],i(),n.filterData({filters:n.filters})}}angular.module("rainGrid").controller("rainGrid.menu.controller",["$scope","rainGridService",n])}(),function(){function n(n,e,r,i){function t(){i.filters.push({col:{},constraint:{},expression:""})}function l(n){_.remove(i.filters,function(e){return e.col.value===n.value}),0===i.filters.length&&i.filters.push({col:{},constraint:{},expression:""})}function a(){s(),n.close({filters:i.filters,isCancel:!1})}function o(){s(),n.close({filters:i.filters,isCancel:!0})}function s(){_.remove(i.filters,function(n){return!n.col||!n.constraint||void 0===n.expression||""===n.expression}),0===i.filters.length&&i.filters.push({col:{},constraint:{},expression:""})}i.columns=_.map(e,function(n){return{label:n.displayName,value:n.field,isNumber:n.isNumber,isCurrency:n.isCurrency,isBoolean:n.isBoolean||n.isCheckbox,isDate:n.isDate}}),i.filters=r,i.addFilter=t,i.deleteFilter=l,i.doFilter=a,i.doCancel=o}angular.module("rainGrid").controller("rainGrid.filterModal.controller",["$modalInstance","columnDefs","filters","$scope",n])}(),function(){function n(){return{restrict:"AE",templateUrl:"rainModules/rainGrid/rainGridFilterInput/rainGridFilterInputTemplate.html",replace:!1,scope:{filter:"=",columns:"=",deleteFilter:"&"},controller:"rainGrid.filterInput.controller"}}angular.module("rainGrid").directive("rainGridFilter",[n])}(),function(){function n(n,e){function r(){i(),t(n.filter.col),l(),n.isBool=n.filter.col.isBoolean}function i(){for(var e=-1,r=0;r<n.columns.length;r++)if(n.columns[r].value===n.filter.col.value){e=r;break}n.filter.col=-1===e?{}:n.columns[e]}function t(r){if(n.constraints=e.getFilterConstraintsByColumnType(r),n.filter.constraint){for(var i=-1,t=0;t<n.constraints.length;t++)if(n.constraints[t].value===n.filter.constraint.value){i=t;break}n.filter.constraint=-1===i?{}:n.constraints[i]}n.isBool=n.filter.col.isBoolean}function l(){n.boolValues=[{label:"true",value:!0},{label:"false",value:!1}]}r(),n.columnChanged=t,n.removeFilter=function(e){n.deleteFilter({col:e})}}angular.module("rainGrid").controller("rainGrid.filterInput.controller",["$scope","rainGridService",n])}(),function(){function n(){function n(n,e,r){n.value=n.gridCell,(n.isLink||n.isButton)&&(n.linkFunc=function(){n.funcLink()})}return{restrict:"AE",templateUrl:"rainModules/rainGrid/rainGridCell/rainGridCellTemplate.html",replace:!1,scope:{gridCell:"=",isDate:"=",isCurrency:"=",isNumber:"=",isCheckbox:"=",isLink:"=",isButton:"=",isHidden:"=",decimal:"=",funcLink:"&"},link:n}}angular.module("rainGrid").directive("gridCell",[n])}(),angular.module("rainMenu").run(["$templateCache",function(n){n.put("rainModules/rainMenu/rainMenuTemplate.html",'<div class="r-menu-area" ng-show="showMenu"\r\n     ng-class="{\'r-menu-area-horizontal\':!isVertical,\'r-menu-area-vertical\':isVertical}">\r\n    <ul class="r-menu">\r\n        <div ng-transclude ng-class="{\'r-menu-vertical\':isVertical,\'r-menu-horizontal\':!isVertical}"></div>\r\n        <a class="btn r-menu-layout-button" ng-click="toggleMenuOrientation()"\r\n                                            ng-show="allowHorizontalMenu"\r\n                                            ng-class="{\'r-menu-layout-button-horizontal\':!isVertical}">\r\n        <i class="fa" ng-class="{\' fa-chevron-up\':isVertical,\' fa-chevron-left\':!isVertical}"></i>\r\n    </a></ul>\r\n\r\n</div>'),n.put("rainModules/rainMenu/rainMenuGroup/rainMenuGroupTemplate.html",'<li class="r-selectable-item r-no-select" ng-click="clicked()"\r\n    ng-class="{\'r-menu-group-horizontal\':!isVertical(),\'isActiveGroup\':isActiveGroup()||isOpen}">\r\n    <div class="r-no-select group-title">\r\n        <i class="fa {{icon}} r-menu-icon"></i>\r\n        {{label}}\r\n    </div>\r\n    <i class="fa fa-angle-left  r-menu-group-indicator" ng-if="isVertical()"\r\n       ng-class="{\'fa-rotate-270\':isOpen}"></i>\r\n\r\n    <!--<div ng-show="isOpen" class="r-menu-sub-section r-menu-fade-in-animation" ng-class="{\'r-menu-popup\':!isVertical()}">-->\r\n    <div ng-show="isOpen" class="r-menu-sub-section animated fadeIn"\r\n         ng-class="{\'r-menu-popup\':!isVertical()}">\r\n        <ul ng-transclude></ul>\r\n    </div>\r\n</li>'),n.put("rainModules/rainMenu/rainMenuItem/rainMenuItemTemplate.html",'<li class="r-selectable-item r-no-select r-menu-item" ng-class="{\'r-menu-item-active\':isActive()}">\r\n    <div class="r-no-select">\r\n        <i class="fa {{icon}} r-menu-icon"></i>\r\n        {{label}}\r\n    </div>\r\n    <!--<i class="fa fa-2x fa-angle-left  r-menu-active-indicator" ng-if="isActive()"></i>-->\r\n</li>')}]),angular.module("rainGrid").run(["$templateCache",function(n){n.put("rainModules/rainGrid/_rainGridTemplate.html",'<div class="rain-grid-panel panel panel-success">\r\n    <div class="panel-heading">\r\n        <div class="clearfix">\r\n            <div class="pull-left" style="margin-top: 4px;">\r\n                <i class="fa fa-arrow-circle-up" style="font-size: 18px;" ng-show="sortOrder===\'ASC\'"></i>\r\n                <i class="fa fa-arrow-circle-down" style="font-size: 18px;" ng-show="sortOrder===\'DSC\'"></i>\r\n                <i class="fa fa-file-o " style="font-size: 18px;" ng-show="!sortOrder"></i>\r\n                <span style="margin-left: 5px;font-weight: bold;">{{title}}</span>\r\n            </div>\r\n            <div class="rain-page pull-right">\r\n                <div class="clearfix">\r\n\r\n                    <div class="pull-left" ng-if="showToolMenu">\r\n                        <div rain-grid-menu filter-data="filterData(filters)" grid-options="gridOptions"></div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="panel-body">\r\n        <table class="table table-striped table-bordered table-hover table-condensed rain-grid-table">\r\n            <tbody>\r\n            <tr>\r\n                <th ng-repeat="field in header" ng-click="sortingChanged(field.fieldName)"\r\n                    ng-class="{dsc:field.fieldName===sortField&&sortOrder===\'DSC\',\r\n                            asc:field.fieldName===sortField&&sortOrder===\'ASC\'}"\r\n                    ng-if="!field.isHidden">\r\n                    <span>\r\n                        {{field.displayName}}\r\n                    </span>\r\n                </th>\r\n            </tr>\r\n            <tr ng-repeat="row in list" ng-click="selectRow(row)" ng-class="{\'row-selected\':row.rowSelected}">\r\n                <td ng-repeat="field in row.rowData" ng-if="!field.isHidden">\r\n                    <div style="display: inline-block;" ng-class="{\'cell-center\':field.isButton}"\r\n                         grid-cell="field.value"\r\n                         is-date="field.isDate"\r\n                         is-checkbox="field.isCheckbox"\r\n                         is-currency="field.isCurrency"\r\n                         is-number="field.isNumber"\r\n                         is-link="field.isLink"\r\n                         is-button="field.isButton"\r\n                         is-hidden="field.isHidden"\r\n                         decimal="field.decimal"\r\n                         func-link="linkTo(row.rowData,field.linkFunc.funcEvent,field.linkFunc.funcIdField)">\r\n                        <!--{{field.value}}-->\r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            </tbody>\r\n        </table>\r\n        <div class="col-xs-12 rain-grid-pagination">\r\n            <div class="clearfix" style="display: inline-block;height: 30px;">\r\n                <div class="pull-left" style="margin: 5px 5px 5px 0;">\r\n                    <span style="margin-right: 5px;">Count:</span>\r\n                    <span style="color: #337AB7;font-weight: bold;">{{rowCount}}</span>\r\n                </div>\r\n            </div>\r\n            <div class="clearfix" style="display: inline-block;" ng-show="enablePage">\r\n                <div class="pull-left" style="width: 160px;">\r\n                    <div class="clearfix">\r\n                        <div class="pull-left" style="margin: 5px 5px 0 0;">Page size:</div>\r\n                        <div class="pull-left">\r\n                            <select class="form-control input-sm" ng-model="pageSize" style=""\r\n                                    ng-change="pageSizeChanged(pageSize)"\r\n                                    ng-options="size as size.label for size in pageSizes">\r\n                            </select>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="clearfix" style="display: inline-block;height: 30px;">\r\n                <div class="pull-left" ng-show="enablePage">\r\n                    <pagination total-items="rowCount" ng-model="currentPage" max-size="maxSize"\r\n                                class="pagination-sm" boundary-links="true" rotate="false"\r\n                                first-text="<<" previous-text="<" next-text=">" last-text=">>"\r\n                                items-per-page="pageSize.value" ng-change="pageChanged()">\r\n                    </pagination>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n\r\n\r\n'),n.put("rainModules/rainGrid/rainGridCell/rainGridCellTemplate.html",'<div ng-if="isCheckbox" rain-checkbox="value" readonly="true" style="padding-right: 10px;"></div>\r\n\r\n<span ng-if="isLink">\r\n    <a ng-click="linkFunc()">{{value}}</a>\r\n</span>\r\n\r\n<div style="display: inline-block;" ng-if="isButton">\r\n    <a class="btn btn-primary btn-xs" ng-click="linkFunc()">{{value}}</a>\r\n</div>\r\n\r\n<div class="clearfix" ng-if="isCurrency">\r\n    <div class="pull-right">\r\n        {{value|currency}}\r\n    </div>\r\n</div>\r\n\r\n<div class="clearfix" ng-if="isDate">\r\n    <div class="pull-right">\r\n        {{value|date: \'yyyy-MM-dd\'}}\r\n    </div>\r\n</div>\r\n\r\n<div class="clearfix" ng-if="isNumber">\r\n    <div class="pull-right">\r\n        <span ng-if="decimal==1">{{value|number:1}}</span>\r\n        <span ng-if="decimal==2">{{value|number:2}}</span>\r\n        <span ng-if="decimal==3">{{value|number:3}}</span>\r\n        <span ng-if="decimal==4">{{value|number:4}}</span>\r\n        <span ng-if="!decimal || decimal > 4">{{value}}</span>\r\n    </div>\r\n</div>\r\n\r\n<span ng-if="!isCheckbox && !isLink && !isButton && !isCurrency && !isNumber && !isDate && !isHidden">\r\n    {{value}}\r\n</span>\r\n\r\n'),n.put("rainModules/rainGrid/rainGridFilterInput/rainGridFilterInputTemplate.html",'<form name="formFilter" class="form-horizontal">\r\n    <div class="well well-sm">\r\n        <div class="row">\r\n            <div class="col-sm-12">\r\n                <div class="col-sm-4">\r\n                    <select class="form-control input-sm" ng-model="filter.col" ng-change="columnChanged(filter.col)"\r\n                            ng-options="colDef as colDef.label for colDef in columns">\r\n                    </select>\r\n                </div>\r\n                <div class="col-sm-4">\r\n                    <select class="form-control input-sm" ng-model="filter.constraint"\r\n                            ng-options="con as con.label for con in constraints">\r\n                    </select>\r\n                </div>\r\n                <div class="col-sm-3" ng-if="!isBool">\r\n                    <input type="text" class="form-control input-sm" ng-model="filter.expression">\r\n                </div>\r\n                <div class="col-sm-3" ng-if="isBool">\r\n                    <select class="form-control input-sm" ng-model="filter.expression"\r\n                            ng-options="bool.value as bool.label for bool in boolValues">\r\n                    </select>\r\n                </div>\r\n                <div class="col-sm-1" style="padding-top: 3px;">\r\n                    <button class="btn btn-warning btn-xs" ng-click="removeFilter(filter.col)">\r\n                        <i class="glyphicon glyphicon-minus"></i>\r\n                    </button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>\r\n'),n.put("rainModules/rainGrid/rainGridFilterModal/rainGridFilterModalTemplate.html",'<div>\r\n    <div class="modal-header">\r\n        <div style="display:inline-block;margin-left: 10px;font-size: 16px;font-weight: bold;">Filters</div>\r\n        <div class="pull-right">\r\n            <button class="btn btn-sm btn-success" ng-click="addFilter()">\r\n                <i class="glyphicon glyphicon-plus "></i>Add filter\r\n            </button>\r\n        </div>\r\n    </div>\r\n    <div style="margin:10px;padding-right: 10px;">\r\n\r\n        <div>\r\n            <div ng-repeat="filter in filters">\r\n                <div rain-grid-filter filter="filter" columns="columns" delete-filter="deleteFilter(col)"></div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n    <div class="modal-footer">\r\n        <button class="btn btn-primary" ng-click="doFilter()">Filter</button>\r\n        <button class="btn btn-warning" ng-click="doCancel()">Cancel</button>\r\n    </div>\r\n</div>'),n.put("rainModules/rainGrid/rainGridMenu/rainGridMenuTemplate.html",'<div>\r\n    <div class="btn-group" dropdown is-open="status.isOpen" style="cursor: pointer;">\r\n        <i class="fa fa-cog  dropdown-toggle" style="font-size: 23px;margin-left: 10px;"\r\n           dropdown-toggle ng-disabled="disabled"></i>\r\n        <ul class="dropdown-menu" role="menu" style="left:auto;right: -12px;">\r\n            <li>\r\n                <a ng-click="doFilter()">\r\n                    <i class="glyphicon glyphicon-filter" style="margin-right: 5px;color: #337AB7;"></i>\r\n\r\n                    <div style="display: inline-block;">Filter</div>\r\n                </a>\r\n            </li>\r\n            <li ng-if="hasFiltered">\r\n                <a href="#" ng-click="removeFilters()">\r\n                    <i class="fa fa-times" style="margin-right: 5px;color: #337AB7;"></i>\r\n\r\n                    <div style="display: inline-block;">Remove Filters</div>\r\n                </a>\r\n            </li>\r\n            <li class="divider" style="border-width: 0;"></li>\r\n            <li>\r\n                <a>\r\n                    <i class="fa fa-file-excel-o" style="margin-right: 5px;color: green;"></i>\r\n                    <span>Export To Excel</span>\r\n                </a>\r\n            </li>\r\n            <li>\r\n                <a>\r\n                    <i class="fa fa-file-pdf-o" style="margin-right: 5px;color: red;"></i>\r\n                    <span>Export To PDF</span>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n\r\n</div>\r\n\r\n')}]),angular.module("rainFramework",["rainMenu"]),angular.module("rainFramework").run(["$templateCache",function(n){n.put("rainModules/rainFramework/rainFrameworkTemplate.html",'<div class=r-title-bar><div class=row><div class="r-logo-area col-sm-6"><img ng-src={{iconFile}} alt class=r-icon><div class=r-title-area><p class=r-logo-title>{{headerTitle}}</p><p class=r-logo-subtitle>{{headerSubTitle}}</p></div><div ng-if=isMenuButtonVisible class="r-collapsed-menu pull-right"><button class="btn r-nav-button" ng-click=menuButtonClicked()><i class="fa fa-bars"></i></button></div></div><div class="r-right-side-controls col-sm-6"><div><div style="display: inline-block;margin-top: 5px;margin-right: 10px;">Welcome <strong>{{username}}!</strong></div><button class="btn btn-sm btn-default btn-hover-border" ng-click=logout()><i class="fa fa-sign-out"></i> Log out</button></div><div class=pull-right></div></div></div></div><div ng-transclude></div><div ng-switch=routerName class=rain-view ng-class="{\'rain-view-full-width\':isFullWidth()}"><div ng-switch-when=NGNEWROUTER><ng-viewport>{{routeString}}</ng-viewport></div><div ng-switch-when=UIROUTER><div ui-view></div></div><div ng-switch-default><div ng-view>{{routeString}}</div></div></div>')}]),function(){function n(){return{restrict:"EA",require:"ngModel",link:function(n,e,r,i){n.$watch(r.ngModel,function(n,e){if(n){var t=String(n).split("");if(0!==t.length&&(1!==t.length||"-"!=t[0]&&"."!==t[0])&&(2!==t.length||"-."!==n)){if(t.indexOf(".")>0){var l=r.numberOnly;["0","1","2","3","4","5"].indexOf(l)>=0&&(l=parseInt(l),t.length-t.indexOf(".")>l+1&&(i.$setViewValue(e),i.$render()))}isNaN(n)&&(i.$setViewValue(e),i.$render())}}})}}}var e=angular.module("rainNumberOnly",[]);e.directive("numberOnly",n)}(),function(){angular.module("rainService",[])}(),function(){function n(n,e){function r(r){return e(function(){return n.get(r.url).then(function(n){return n.data})},200)}function i(e,r){return n.get(e.url+"/"+r).then(function(n){return n.data})}function t(e,r){return n["delete"](e.url+"/"+r).then(function(n){return n.data})}function l(e,r){return n.post(e.url,r).then(function(n){return n.data})}return{getDataList:r,getDataById:i,deleteDataById:t,addOrUpdateData:l}}var e=angular.module("rainService");e.factory("rainService.repository",["$http","$timeout",n])}(),function(){function n(n,r){function i(i,t,l){var a={header:{"Content-Type":"application/x-www-form-urlencoded"}},o=e({username:t,password:l,grant_type:"password"});return n.post(i,o,a).then(function(n){return r.setProfile(t,n.data.access_token),n},function(n){return n})}function t(){r.logout()}function l(n,e,r){var i="";return r&&(i="&role="+r.key.trim()),"username="+n.trim()+"&password="+e.trim()+i}function a(n){var e=o(n);return e}function o(n){var e,r,i,t,l={};for(e=n.split("&"),i=0,t=e.length;t>i;i++)r=e[i].split("="),l[r[0]]=r[1];return l}return{login:i,logout:t,token:{createToken:l,decryptToken:a}}}function e(n){var e=[];for(var r in n)e.push(encodeURIComponent(r)+"="+encodeURIComponent(n[r]));return e.join("&").replace(/%20/g,"+")}var r=angular.module("rainService");r.factory("rainService.oauth",["$http","rainService.currentUser",n])}(),function(){function n(n){function e(n,e){e=angular.toJson(e),t.setItem(n,e)}function r(n){var e=t.getItem(n);return e&&(e=angular.fromJson(e)),e}function i(n){t.removeItem(n)}var t=n.localStorage;return{add:e,get:r,remove:i}}angular.module("rainService").factory("rainService.localStorage",["$window",n])}(),function(){function n(n,e){var r=function(r){return e.profile.loggedIn&&(r.headers.Authorization="Bearer "+e.profile.token),n.when(r)};return{request:r}}function e(n,e,r){var i=function(i){return(401==i.status||403==i.status)&&e.$broadcast("AUTHENTICATION_EVENT",{statusCode:i.status,requestedPath:r.path(),eventSource:"rainService.loginRedirect.responseError"}),n.reject(i)};return{responseError:i}}var r=angular.module("rainService");r.factory("rainService.addToken",["$q","rainService.currentUser",n]),r.factory("rainService.loginRedirect",["$q","$rootScope","$location",e]),r.config(["$httpProvider",function(n){n.interceptors.push("rainService.addToken")}]),r.config(["$httpProvider",function(n){n.interceptors.push("rainService.loginRedirect")}])}(),function(){function n(n){function e(e,i,t){function l(n,e){n.ok=function(){t&&angular.isFunction(t)&&t(),e.close(!0)},n.cancel=function(){e.close(!1)}}e=e||"Confirm",i=i||"Are you sure?";var a=n.open({template:r(e,i),controller:["$scope","$modalInstance",l]});return a.result}function r(n,e){return'<div class="modal-header"><h3 class="modal-title">'+n+'</h3></div><div class="modal-body"><p style="font-size: 16px;">'+e+'</p></div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">Yes</button><button class="btn btn-warning" ng-click="cancel()">No</button></div>'}function i(e,r,i){function l(n,e){n.ok=function(){i&&angular.isFunction(i)&&i(),e.close(!0)}}e=e||"Information",r=r||"<p></p>";var a=n.open({template:t(e,r),controller:["$scope","$modalInstance",l]});return a.result}function t(n,e){return'<div class="modal-header"><h3 class="modal-title">'+n+'</h3></div><div class="modal-body">'+e+'</div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">Close</button></div>'}return{confirmModal:e,messageModal:i}}angular.module("rainService").factory("rainService.dialog",["$modal",n])}(),function(){function n(n){function e(e,r){l.username=e,l.token=r,n.add(t,l)}function r(){var e={username:"",token:"",get loggedIn(){return!!this.token}},r=n.get(t);return r&&(e.username=r.username,e.token=r.token),e}function i(){l.username="",l.token="",n.remove(t)}var t="tokenKey",l=r();return{setProfile:e,profile:l,logout:i}}angular.module("rainService").factory("rainService.currentUser",["rainService.localStorage",n])}(),function(){function n(n){function e(n,e,r){}return{restrict:"AE",transclude:!0,scope:{horizontalMenu:"="},controller:"rainMenu.controller",templateUrl:"rainModules/rainMenu/rainMenuTemplate.html",link:e}}angular.module("rainMenu").directive("rainMenu",["$timeout",n])}(),function(){function n(n,e){function r(e){i(e),t(),l&&n.toggleMenuOrientation()}function i(r){r.setActiveElement=function(e){n.activeElement=e},r.getActiveElement=function(){return n.activeElement},r.setActiveGroupElement=function(e){n.activeGroupElement=e},r.getActiveGroupElement=function(){return n.activeGroupElement},r.isVertical=function(){return n.isVertical},r.setOpenMenuScope=function(e){n.openMenuScope=e},r.closeCurrentMenu=function(){n.openMenuScope&&n.openMenuScope.closeMenu()},r.setRoute=function(n){n&&e.$broadcast("rain-menu-item-selected-event",{route:n})}}function t(){n.$on("rain-menu-show",function(e,r){n.showMenu=r.show,n.isVertical=r.isVertical,n.allowHorizontalMenu=r.allowHorizontalMenu}),n.toggleMenuOrientation=function(){n.isVertical=!n.isVertical,e.$broadcast("rain-menu-orientation-changed-event",{isMenuVertical:n.isVertical})},angular.element(document).bind("click",function(e){if(n.openMenuScope&&!n.isVertical){if($(e.target).parent().hasClass("r-selectable-item"))return;n.$apply(function(){n.openMenuScope.closeMenu()}),e.preventDefault(),e.stopPropagation()}})}var l=n.horizontalMenu;n.showMenu=!0,n.isVertical=!0,n.openMenuScope=null,n.allowHorizontalMenu=!0;var a=this;r(a)}angular.module("rainMenu").controller("rainMenu.controller",["$scope","$rootScope",n])}(),function(){function n(){return{restrict:"AE",templateUrl:"rainModules/rainGrid/_rainGridTemplate.html",replace:!1,scope:{rainGrid:"="},controller:"rainGrid.controller"}}angular.module("rainGrid").directive("rainGrid",[n])}(),function(){function n(n,e,r){function i(){t(),n.gridOptions.data.then(function(n){l(n)})}function t(){n.gridOptions={enablePage:!0,pageSize:10,selectable:!1,showToolMenu:!0},n.gridOptions=_.assign(n.gridOptions,n.rainGrid),n.selectable=n.gridOptions.selectable,n.showToolMenu=n.gridOptions.showToolMenu,n.title=n.gridOptions.title}function l(e){n.gridOptions.dataList=e,n.gridData=c(n.gridOptions),a(),o(n.gridData),r.modifyPaginationIcons()}function a(){if(n.enablePage=n.gridOptions.enablePage,n.currentPage=1,n.maxSize=3,n.pageSizes=[{label:" 5",value:5},{label:"10",value:10},{label:"15",value:15},{label:"20",value:20}],n.pageSize=n.pageSizes[1],n.gridOptions.pageSize){var e=_.find(n.pageSizes,function(e){return e.value==n.gridOptions.pageSize});e&&(n.pageSize=e)}}function o(e){n.currentPage=1,p=0,g=null,u=e.rows,n.header=e.header,n.rowCount=u.length,n.enablePage=n.gridOptions.enablePage&&n.rowCount>n.pageSizes[0].value,d=u,s(d)}function s(e){if(!n.enablePage)return n.list=e,n.list;var i=r.getDataListByPage(e,n.currentPage,n.pageSize.value);return i&&(n.list=i,angular.forEach(n.list,function(e){e.rowSelected&&e!=n.selectedRow&&(e.rowSelected=!1)})),n.list}function c(e){var i=r.buildGridData(e);return i.rows.length>0&&i.rows[0].rowSelected&&(n.selectedRow=i.rows[0]),i}n.gridOptions={};var u=[],d=[],f=[null,"ASC","DSC"],p=0,g=null,v=!1,m=[];n.$watch("rainGrid.data",function(){i()}),i(),n.filterData=function(e){d=r.filterData(u,e),v=e.length>0&&!!e[0].col,v&&(m=d),n.rowCount=d.length,n.enablePage=n.gridOptions.enablePage&&n.rowCount>n.pageSizes[0].value,n.sortField=null,n.sortOrder=null,n.currentPage=1,s(d)},n.linkTo=function(n,r,i){var t=_.find(n,function(n){return n.fieldName===i});if(t){var l=t.value;e.$broadcast(r,{id:l})}},n.pageSizeChanged=function(e){n.currentPage=1,s(d)},n.pageChanged=function(){s(d)},n.sortingChanged=function(e){g!==e?p=1:(p+=1,p>2&&(p=0)),g=e,n.sortField=e,n.sortOrder=f[p];var i=v?m:u;d=r.sortData(i,f,g,p),s(d)},n.selectRow=function(r){if(n.selectable){var i=r.rowSelected;if(angular.forEach(n.list,function(n){n.rowSelected=!1}),r.rowSelected=!i,r.rowSelected&&(n.selectedRow=r),r.rowSelected&&n.gridOptions.rowSelectedEvent){var t=n.gridOptions.rowSelectedEvent.funcEvent;e.$broadcast(t,{id:r.id})}}}}angular.module("rainGrid").controller("rainGrid.controller",n),n.$inject=["$scope","$rootScope","rainGridService"]}(),function(){function n(n,e,r){function i(e,r){var i=_.find(e.row,function(n){return n.fieldName===e.funcIdField});if(i){var t=i.value,l=e.funcName+"("+t+")",a=n(l);a(r)}}function t(n,e,r){if(!n||0>=e)return null;try{var i=(e-1)*r,t=_.slice(n,i,i+r);return t?t:null}catch(l){return console.log(l.message),null}}function l(n){var e=[];return angular.forEach(n,function(n){e.push({fieldName:n.field,displayName:n.displayName,isHidden:n.isHidden})}),e}function a(n){var e=n.dataList,r=n.columnDefs,i=null,t=null,a={rows:[],header:l(r)};return 0==e.length?a:(a.rows=_.map(e,function(e){var l=[];if(r)i=n.idField,i&&(t=e[n.idField]),angular.forEach(r,function(r){l.push({id:e[n.idField],fieldName:r.field,value:e[r.field]||r.field,displayName:r.displayName,isCheckbox:r.isCheckbox,isCurrency:r.isCurrency,isNumber:r.isNumber,decimal:r.decimal,isLink:r.isLink,isButton:r.isButton,isDate:r.isDate,isHidden:r.isHidden||!1,linkFunc:r.linkFunc||{funcName:"",funcIdField:""}})});else for(var a in e)e.hasOwnProperty(a)&&l.push({fieldName:a,value:e[a],displayName:a});return{rowData:l,rowSelected:!1,idField:i,id:t}}),n.selectFirstRow&&a.rows.length>0&&(a.rows[0].rowSelected=!0),a)}function o(n,e,r,i){var t=e[i];if(!r||!t)return n;var l=_.sortBy(n,function(n){for(var e=n.rowData,i=null,t=0;t<e.length;t++)if(e[t].fieldName===r)return i=e[t].value});return t===e[1]?l:l.reverse()}function s(){$('ul.pagination a:contains("<<"):first').html("<i class='fa fa-angle-double-left page-arrow'></i>"),$('ul.pagination a:contains(">>"):first').html("<i class='fa fa-angle-double-right page-arrow'></i>"),$('ul.pagination a:contains("<"):first').html("<i class='fa fa-angle-left page-arrow'></i>"),$('ul.pagination a:contains(">"):first').html("<i class='fa fa-angle-right page-arrow'></i>")}function c(n,r){var i=e.open({templateUrl:f+"rainGridFilterModal/rainGridFilterModalTemplate.html",controller:"rainGrid.filterModal.controller",resolve:{columnDefs:function(){return n.columnDefs},filters:function(){return r}}});return i.result}function u(n){var e=[],r="text";switch(n.isNumber||n.isCurrency?r="number":n.isBoolean?r="bool":n.isDate&&(r="date"),r){case"number":e=[{label:"equal to",value:"equalTo"},{label:"greater than",value:"greaterThan"},{label:"less than",value:"lessThan"}];break;case"bool":e=[{label:"equal to",value:"equalTo"}];break;case"date":e=[{label:"equal to",value:"equalTo"},{label:"greater than",value:"greaterThan"},{label:"less than",value:"lessThan"}];break;default:e=[{label:"equal to",value:"equalTo"},{label:"greater than",value:"greaterThan"},{label:"less than",value:"lessThan"},{label:"contains",value:"contains"},{label:"starts with",value:"startsWith"}]}return e}function d(n,e){var r=[];return r=0!==e.length&&e[0].col?_.filter(n,function(n){for(var r=n.rowData,i=!0,t=0;t<r.length;t++){for(var l=r[t],a=0;a<e.length;a++){var o=e[a],s=o.col.value,c=o.constraint.value,u=o.expression;if(l.fieldName===s){switch(c){case"equalTo":i=i&&l.value==u;break;case"greaterThan":i=i&&l.value>u;break;case"lessThan":i=i&&l.value<u;break;case"contains":i=i&&l.value.indexOf(u)>=0;break;case"startsWith":i=i&&0===l.value.indexOf(u)}if(!i)break}}if(!i)break}return i}):n}var f=r.baseUrl;return{baseUrl:f,rainGridLinkFunc:i,modifyPaginationIcons:s,getDataListByPage:t,buildGridData:a,sortData:o,showFilterModal:c,getFilterConstraintsByColumnType:u,filterData:d}}angular.module("rainGrid").factory("rainGridService",["$parse","$modal","rainGridConfig",n])}(),function(){function n(){return{transclude:!0,scope:{headerTitle:"@",headerSubTitle:"@",iconFile:"@",router:"@"},controller:"rainFramework.controller",templateUrl:"rainModules/rainFramework/rainFrameworkTemplate.html"}}angular.module("rainFramework").directive("rainFramework",n)}(),function(){function n(n,e,r,i,t,l){function a(){o(),r(function(){d()},0)}function o(){n.$on("rain-menu-item-selected-event",function(e,r){n.routeString=r.route,n.routeString&&u(n.routeString),d()}),n.$on("rain-menu-orientation-changed-event",function(e,r){n.isMenuVertical=r.isMenuVertical}),$(e).on("resize.rainFramework",function(){n.$apply(function(){d()})}),$(e).on("$destroy",function(){$(e).off("resize.rainFramework")}),n.menuButtonClicked=function(){n.isVerticalMenuVisible=!n.isVerticalMenuVisible;var r=Math.max(e.innerWidth,$(e).width());n.isMenuVertical=768>r,s()}}function s(){i.$broadcast("rain-menu-show",{show:n.isVerticalMenuVisible,isVertical:n.isMenuVertical,allowHorizontalMenu:!n.isMenuButtonVisible})}function c(){l.logout(),n.$emit("AUTHENTICATION_EVENT",{statusCode:401,eventSource:"rainFramework.controller.logout"})}function u(n){i.$broadcast("rain-change-route-event",{route:n})}function d(){var r=Math.max(e.innerWidth,$(e).width());

n.isVerticalMenuVisible=r>=768,n.isMenuButtonVisible=!n.isVerticalMenuVisible,s()}n.isMenuButtonVisible=!0,n.isVerticalMenuVisible=!0,n.isMenuVertical=!0,n.routerName=n.router.trim().toUpperCase(),n.username=t.profile.username,n.logout=c,n.isFullWidth=function(){return!n.isMenuVertical||!n.isVerticalMenuVisible},a()}angular.module("rainFramework").controller("rainFramework.controller",["$scope","$window","$timeout","$rootScope","rainService.currentUser","rainService.oauth",n])}(),function(){angular.module("rainForm",[])}(),function(){function n(n){return{restrict:"A",require:"^form",link:l(n)}}var e=angular.module("rainForm");e.directive("formInput",n),n.$inject=["$compile"];var r=function(n,e){return function(){return e&&n[e]?n.$submitted?n[e].$invalid:n[e].$dirty?n[e].$invalid:!1:void 0}},i=function(n){return function(e){e?(n.addClass("has-error"),n.find(".help-block").show()):(n.removeClass("has-error"),n.find(".help-block").hide())}},t=function(n,e,r){if(n.hasClass("form-group")||0!==n.find(".form-group").length)n.addClass("form-group-sm");else{var i=n.html(),t='<div class="form-group form-group-sm">'+i+"</div>";n.html(e(t)(r))}var l=n[0].querySelector("label");l&&l.classList.add("control-label");var a=n[0].querySelector("input, textarea, select,[ng-model]");if(a){var o=a.getAttribute("type"),s=a.getAttribute("name");return"checkbox"!==o&&"radio"!==o&&a.classList.add("form-control"),s}},l=function(n){return function(e,l,a,o){var s=t(l,n,e);e.$watch(r(o,s),i(l))}}}(),function(){function n(){return{restrict:"AE",template:i(),replace:!1,scope:{rainCheckbox:"=",text:"@",readonly:"=",onChanging:"&"},controller:["$scope",e],link:r}}function e(n){n.onclick=function(){n.readonly!==!0&&(n.rainCheckbox=!n.rainCheckbox,n.onChanging())}}function r(n,e){function r(){var r=e.find("input:checkbox+label");n.readonly===!0?r.addClass("readonly"):r.removeClass("readonly")}r(),n.$watch("readonly",function(){r()})}function i(){return'<div class="rain-checkbox-container"><div class="checkbox-image"><div  class="rain-checkbox"><input type="checkbox" ng-model="rainCheckbox" style="display: inline;"/><label class="checkbox-label" ng-click="onclick()"></label></div></div><div class="checkbox-text">{{text}}</div></div>'}var t=angular.module("rainCheckbox",[]);t.directive("rainCheckbox",[n])}();