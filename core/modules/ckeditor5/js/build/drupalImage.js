!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.CKEditor5=e():(t.CKEditor5=t.CKEditor5||{},t.CKEditor5.drupalImage=e())}(self,(function(){return function(){var t={"ckeditor5/src/core.js":function(t,e,i){t.exports=i("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/upload.js":function(t,e,i){t.exports=i("dll-reference CKEditor5.dll")("./src/upload.js")},"ckeditor5/src/utils.js":function(t,e,i){t.exports=i("dll-reference CKEditor5.dll")("./src/utils.js")},"dll-reference CKEditor5.dll":function(t){"use strict";t.exports=CKEditor5.dll}},e={};function i(r){var n=e[r];if(void 0!==n)return n.exports;var a=e[r]={exports:{}};return t[r](a,a.exports,i),a.exports}i.d=function(t,e){for(var r in e)i.o(e,r)&&!i.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)};var r={};return function(){"use strict";i.d(r,{default:function(){return h}});var t=i("ckeditor5/src/core.js");function e(t,e,i){if(e.attributes)for(const[r,n]of Object.entries(e.attributes))t.setAttribute(r,n,i);e.styles&&t.setStyle(e.styles,i),e.classes&&t.addClass(e.classes,i)}function n(t){return t.createEmptyElement("img")}function a(t){const e=parseFloat(t);return!Number.isNaN(e)&&t===String(e)}class o extends t.Plugin{static get requires(){return["ImageUtils"]}static get pluginName(){return"DrupalImageEditing"}init(){const{editor:t}=this,{conversion:i}=t,{schema:r}=t.model;r.isRegistered("imageInline")&&r.extend("imageInline",{allowAttributes:["dataEntityUuid","dataEntityType","width","height"]}),r.isRegistered("imageBlock")&&r.extend("imageBlock",{allowAttributes:["dataEntityUuid","dataEntityType","width","height"]}),i.for("upcast").add(function(t){function e(e,i,r){const{viewItem:n}=i,{writer:a,consumable:o,safeInsert:s,updateConversionResult:u,schema:l}=r,d=[];let c;if(o.test(n,{name:!0,attributes:"src"})){if(c=l.checkChild(i.modelCursor,"imageInline")?a.createElement("imageInline",{src:n.getAttribute("src")}):a.createElement("imageBlock",{src:n.getAttribute("src")}),t.plugins.has("ImageStyleEditing")&&o.test(n,{name:!0,attributes:"data-align"})){const t={left:"alignBlockLeft",center:"alignCenter",right:"alignBlockRight"},e={left:"alignLeft",right:"alignRight"},i=n.getAttribute("data-align"),r=c.is("element","imageBlock")?t[i]:e[i];a.setAttribute("imageStyle",r,c),d.push("data-align")}if(c.is("element","imageBlock")&&o.test(n,{name:!0,attributes:"data-caption"})){const e=a.createElement("caption"),i=t.data.processor.toView(n.getAttribute("data-caption")),o=a.createDocumentFragment();r.consumable.constructor.createFrom(i,r.consumable),r.convertChildren(i,o);for(const t of Array.from(o.getChildren()))a.append(t,e);a.append(e,c),d.push("data-caption")}o.test(n,{name:!0,attributes:"data-entity-uuid"})&&(a.setAttribute("dataEntityUuid",n.getAttribute("data-entity-uuid"),c),d.push("data-entity-uuid")),o.test(n,{name:!0,attributes:"data-entity-type"})&&(a.setAttribute("dataEntityType",n.getAttribute("data-entity-type"),c),d.push("data-entity-type")),s(c,i.modelCursor)&&(o.consume(n,{name:!0,attributes:d}),u(c,i))}}return t=>{t.on("element:img",e,{priority:"high"})}}(t)).attributeToAttribute({view:{name:"img",key:"width"},model:{key:"width",value:t=>a(t.getAttribute("width"))?`${t.getAttribute("width")}px`:`${t.getAttribute("width")}`}}).attributeToAttribute({view:{name:"img",key:"height"},model:{key:"height",value:t=>a(t.getAttribute("height"))?`${t.getAttribute("height")}px`:`${t.getAttribute("height")}`}}),i.for("downcast").add(function(){function t(t,e,i){const{item:r}=e,{consumable:n,writer:a}=i;if(!n.consume(r,t.name))return;const o=i.mapper.toViewElement(r),s=Array.from(o.getChildren()).find((t=>"img"===t.name));a.setAttribute("data-entity-uuid",e.attributeNewValue,s||o)}return e=>{e.on("attribute:dataEntityUuid",t)}}()).add(function(){function t(t,e,i){const{item:r}=e,{consumable:n,writer:a}=i;if(!n.consume(r,t.name))return;const o=i.mapper.toViewElement(r),s=Array.from(o.getChildren()).find((t=>"img"===t.name));a.setAttribute("data-entity-type",e.attributeNewValue,s||o)}return e=>{e.on("attribute:dataEntityType",t)}}()),i.for("dataDowncast").add(function(t){return e=>{e.on("insert:caption",((e,i,r)=>{const{consumable:n,writer:a,mapper:o}=r;if(!t.plugins.get("ImageUtils").isImage(i.item.parent)||!n.consume(i.item,"insert"))return;const s=t.model.createRangeIn(i.item),u=a.createDocumentFragment();o.bindElements(i.item,u);for(const{item:e}of Array.from(s)){const i={item:e,range:t.model.createRangeOn(e)},n=`insert:${e.name||"$text"}`;t.data.downcastDispatcher.fire(n,i,r);for(const n of e.getAttributeKeys())Object.assign(i,{attributeKey:n,attributeOldValue:null,attributeNewValue:i.item.getAttribute(n)}),t.data.downcastDispatcher.fire(`attribute:${n}`,i,r)}for(const t of a.createRangeIn(u).getItems())o.unbindViewElement(t);o.unbindViewElement(u);const l=t.data.processor.toData(u);if(l){const t=o.toViewElement(i.item.parent);a.setAttribute("data-caption",l,t)}}),{priority:"high"})}}(t)).elementToElement({model:"imageBlock",view:(t,{writer:e})=>n(e),converterPriority:"high"}).elementToElement({model:"imageInline",view:(t,{writer:e})=>n(e),converterPriority:"high"}).add(function(){function t(t,e,i){const{item:r}=e,{consumable:n,writer:a}=i,o={alignLeft:"left",alignRight:"right",alignCenter:"center",alignBlockRight:"right",alignBlockLeft:"left"};if(!o[e.attributeNewValue]||!n.consume(r,t.name))return;const s=i.mapper.toViewElement(r),u=Array.from(s.getChildren()).find((t=>"img"===t.name));a.setAttribute("data-align",o[e.attributeNewValue],u||s)}return e=>{e.on("attribute:imageStyle",t,{priority:"high"})}}()).add(function(){function t(t,e,i){const{item:r}=e,{consumable:n,writer:a}=i;if(!n.consume(r,t.name))return;const o=i.mapper.toViewElement(r),s=Array.from(o.getChildren()).find((t=>"img"===t.name));a.setAttribute("width",e.attributeNewValue.replace("px",""),s||o)}return e=>{e.on("attribute:width:imageInline",t,{priority:"high"}),e.on("attribute:width:imageBlock",t,{priority:"high"})}}()).add(function(){function t(t,e,i){const{item:r}=e,{consumable:n,writer:a}=i;if(!n.consume(r,t.name))return;const o=i.mapper.toViewElement(r),s=Array.from(o.getChildren()).find((t=>"img"===t.name));a.setAttribute("height",e.attributeNewValue.replace("px",""),s||o)}return e=>{e.on("attribute:height:imageInline",t,{priority:"high"}),e.on("attribute:height:imageBlock",t,{priority:"high"})}}()).add(function(){function t(t,i,r){if(!r.consumable.consume(i.item,t.name))return;const n=r.mapper.toViewElement(i.item),a=r.writer,o=a.createContainerElement("a",{href:i.attributeNewValue});a.insert(a.createPositionBefore(n),o),a.move(a.createRangeOn(n),a.createPositionAt(o,0)),r.consumable.consume(i.item,"attribute:htmlLinkAttributes:imageBlock")&&e(r.writer,i.item.getAttribute("htmlLinkAttributes"),o)}return e=>{e.on("attribute:linkHref:imageBlock",t,{priority:"high"})}}())}}class s extends t.Plugin{static get requires(){return[o]}static get pluginName(){return"DrupalImage"}}var u=s;class l extends t.Plugin{init(){const{editor:t}=this;t.plugins.get("ImageUploadEditing").on("uploadComplete",((e,{data:i,imageElement:r})=>{t.model.change((t=>{t.setAttribute("dataEntityUuid",i.dataEntityUuid,r),t.setAttribute("dataEntityType",i.dataEntityType,r)}))}))}static get pluginName(){return"DrupalImageUploadEditing"}}var d=i("ckeditor5/src/upload.js"),c=i("ckeditor5/src/utils.js");class m{constructor(t,e){this.loader=t,this.options=e}upload(){return this.loader.file.then((t=>new Promise(((e,i)=>{this._initRequest(),this._initListeners(e,i,t),this._sendRequest(t)}))))}abort(){this.xhr&&this.xhr.abort()}_initRequest(){this.xhr=new XMLHttpRequest,this.xhr.open("POST",this.options.uploadUrl,!0),this.xhr.responseType="json"}_initListeners(t,e,i){const r=this.xhr,n=this.loader,a=`Couldn't upload file: ${i.name}.`;r.addEventListener("error",(()=>e(a))),r.addEventListener("abort",(()=>e())),r.addEventListener("load",(()=>{const i=r.response;if(!i||i.error)return e(i&&i.error&&i.error.message?i.error.message:a);t({urls:{default:i.url},dataEntityUuid:i.uuid?i.uuid:"",dataEntityType:i.entity_type?i.entity_type:""})})),r.upload&&r.upload.addEventListener("progress",(t=>{t.lengthComputable&&(n.uploadTotal=t.total,n.uploaded=t.loaded)}))}_sendRequest(t){const e=this.options.headers||{},i=this.options.withCredentials||!1;Object.keys(e).forEach((t=>{this.xhr.setRequestHeader(t,e[t])})),this.xhr.withCredentials=i;const r=new FormData;r.append("upload",t),this.xhr.send(r)}}class g extends t.Plugin{static get requires(){return[d.FileRepository]}static get pluginName(){return"DrupalFileRepository"}init(){const t=this.editor.config.get("drupalImageUpload");t&&(t.uploadUrl?this.editor.plugins.get(d.FileRepository).createUploadAdapter=e=>new m(e,t):(0,c.logWarning)("simple-upload-adapter-missing-uploadurl"))}}class p extends t.Plugin{static get requires(){return[g,l]}static get pluginName(){return"DrupalImageUpload"}}var h={DrupalImage:u,DrupalImageUpload:p}}(),r=r.default}()}));