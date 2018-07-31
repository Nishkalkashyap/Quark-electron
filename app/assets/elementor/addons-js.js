/*!
 * Countdown v0.1.0
 * https://github.com/fengyuanchen/countdown
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 */

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";var b=function(c,d){this.$element=a(c),this.defaults=a.extend({},b.defaults,this.$element.data(),a.isPlainObject(d)?d:{}),this.init()};b.prototype={constructor:b,init:function(){var a=this.$element.html(),b=new Date(this.defaults.date||a);b.getTime()&&(this.content=a,this.date=b,this.find(),this.defaults.autoStart&&this.start())},find:function(){var a=this.$element;this.$days=a.find("[data-days]"),this.$hours=a.find("[data-hours]"),this.$minutes=a.find("[data-minutes]"),this.$seconds=a.find("[data-seconds]"),this.$days.length+this.$hours.length+this.$minutes.length+this.$seconds.length>0&&(this.found=!0)},reset:function(){this.found?(this.output("days"),this.output("hours"),this.output("minutes"),this.output("seconds")):this.output()},ready:function(){var a,b=this.date,c=100,d=1e3,e=6e4,f=36e5,g=864e5,h={};return b?(a=b.getTime()-(new Date).getTime(),0>=a?(this.end(),!1):(h.days=a,h.hours=h.days%g,h.minutes=h.hours%f,h.seconds=h.minutes%e,h.milliseconds=h.seconds%d,this.days=Math.floor(h.days/g),this.hours=Math.floor(h.hours/f),this.minutes=Math.floor(h.minutes/e),this.seconds=Math.floor(h.seconds/d),this.deciseconds=Math.floor(h.milliseconds/c),!0)):!1},start:function(){!this.active&&this.ready()&&(this.active=!0,this.reset(),this.autoUpdate=this.defaults.fast?setInterval(a.proxy(this.fastUpdate,this),100):setInterval(a.proxy(this.update,this),1e3))},stop:function(){this.active&&(this.active=!1,clearInterval(this.autoUpdate))},end:function(){this.date&&(this.stop(),this.days=0,this.hours=0,this.minutes=0,this.seconds=0,this.deciseconds=0,this.reset(),this.defaults.end())},destroy:function(){this.date&&(this.stop(),this.$days=null,this.$hours=null,this.$minutes=null,this.$seconds=null,this.$element.empty().html(this.content),this.$element.removeData("countdown"))},fastUpdate:function(){--this.deciseconds>=0?this.output("deciseconds"):(this.deciseconds=9,this.update())},update:function(){--this.seconds>=0?this.output("seconds"):(this.seconds=59,--this.minutes>=0?this.output("minutes"):(this.minutes=59,--this.hours>=0?this.output("hours"):(this.hours=23,--this.days>=0?this.output("days"):this.end())))},output:function(a){if(!this.found)return void this.$element.empty().html(this.template());switch(a){case"deciseconds":this.$seconds.text(this.getSecondsText());break;case"seconds":this.$seconds.text(this.seconds);break;case"minutes":this.$minutes.text(this.minutes);break;case"hours":this.$hours.text(this.hours);break;case"days":this.$days.text(this.days)}},template:function(){return this.defaults.text.replace("%s",this.days).replace("%s",this.hours).replace("%s",this.minutes).replace("%s",this.getSecondsText())},getSecondsText:function(){return this.active&&this.defaults.fast?this.seconds+"."+this.deciseconds:this.seconds}},b.defaults={autoStart:!0,date:null,fast:!1,end:a.noop,text:"%s days, %s hours, %s minutes, %s seconds"},b.setDefaults=function(c){a.extend(b.defaults,c)},a.fn.countdown=function(c){return this.each(function(){var d=a(this),e=d.data("countdown");e||d.data("countdown",e=new b(this,c)),"string"==typeof c&&a.isFunction(e[c])&&e[c]()})},a.fn.countdown.constructor=b,a.fn.countdown.setDefaults=b.setDefaults,a(function(){a("[countdown]").countdown()})});
(function ($) {
	"use strict";

    var FilterGallery = function( $scope, $ ) {
        var filtergallery_elem = $scope.find('.eael-filter-gallery-wrapper').eq(0);

        $(filtergallery_elem).each(function() {
            var gridStyle = $(this).data('grid-style'),
                ref = $(this).find('.item').data('ref'),
                duration = $(this).data('duration'),
                effects = $(this).data('effects'),
                popup = $(this).data('popup'),
                galleryEnabled = $(this).data('gallery-enabled');
            var mixer = mixitup( $(this), {
                controls: {
                    scope: 'local'
                },
                selectors: {
                    target: '[data-ref~="'+ref+'"]'
                },
                animation: {
                    enable: true,
                    duration: ''+duration+'',
                    effects: ''+effects+'',
                    easing: 'cubic-bezier(0.245, 0.045, 0.955, 1)',
                }
            } );

            // Set Background Image
            if( gridStyle == 'eael-hoverer' || gridStyle == 'eael-tiles' ) {
                var postColumn = $(this).find( '.eael-filter-gallery-container .item' );
                postColumn.each( function() {
                    let dataBg = $(this).attr( 'data-item-bg' );
                    $(this).css( 'background-image', 'url( '+ dataBg +' )' );
                } );
            }
            // Magnific Popup
            if( true == popup ) {
                $(this).find('.eael-magnific-link').magnificPopup({
                    type: 'image',
                    gallery:{
                        enabled: galleryEnabled
                    },
                    callbacks: {
                        close: function() {
                            $( '#elementor-lightbox' ).hide();
                        }
                    }
                });
            }
        });
    }

    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/eael-filterable-gallery.default', FilterGallery);
    });
}(jQuery));
/* https://github.com/mattboldt/typed.js/ */
!function(t,s,e){"use strict";var i=function(t,s){var i=this;this.el=t,this.options={},Object.keys(r).forEach(function(t){i.options[t]=r[t]}),Object.keys(s).forEach(function(t){i.options[t]=s[t]}),this.isInput="input"===this.el.tagName.toLowerCase(),this.attr=this.options.attr,this.showCursor=!this.isInput&&this.options.showCursor,this.elContent=this.attr?this.el.getAttribute(this.attr):this.el.textContent,this.contentType=this.options.contentType,this.typeSpeed=this.options.typeSpeed,this.startDelay=this.options.startDelay,this.backSpeed=this.options.backSpeed,this.backDelay=this.options.backDelay,e&&this.options.stringsElement instanceof e?this.stringsElement=this.options.stringsElement[0]:this.stringsElement=this.options.stringsElement,this.strings=this.options.strings,this.strPos=0,this.arrayPos=0,this.stopNum=0,this.loop=this.options.loop,this.loopCount=this.options.loopCount,this.curLoop=0,this.stop=!1,this.cursorChar=this.options.cursorChar,this.shuffle=this.options.shuffle,this.sequence=[],this.build()};i.prototype={constructor:i,init:function(){var t=this;t.timeout=setTimeout(function(){for(var s=0;s<t.strings.length;++s)t.sequence[s]=s;t.shuffle&&(t.sequence=t.shuffleArray(t.sequence)),t.typewrite(t.strings[t.sequence[t.arrayPos]],t.strPos)},t.startDelay)},build:function(){var t=this;if(this.showCursor===!0&&(this.cursor=s.createElement("span"),this.cursor.className="typed-cursor",this.cursor.innerHTML=this.cursorChar,this.el.parentNode&&this.el.parentNode.insertBefore(this.cursor,this.el.nextSibling)),this.stringsElement){this.strings=[],this.stringsElement.style.display="none";var e=Array.prototype.slice.apply(this.stringsElement.children);e.forEach(function(s){t.strings.push(s.innerHTML)})}this.init()},typewrite:function(t,s){if(this.stop!==!0){var e=Math.round(70*Math.random())+this.typeSpeed,i=this;i.timeout=setTimeout(function(){var e=0,r=t.substr(s);if("^"===r.charAt(0)){var o=1;/^\^\d+/.test(r)&&(r=/\d+/.exec(r)[0],o+=r.length,e=parseInt(r)),t=t.substring(0,s)+t.substring(s+o)}if("html"===i.contentType){var n=t.substr(s).charAt(0);if("<"===n||"&"===n){var a="",h="";for(h="<"===n?">":";";t.substr(s+1).charAt(0)!==h&&(a+=t.substr(s).charAt(0),s++,!(s+1>t.length)););s++,a+=h}}i.timeout=setTimeout(function(){if(s===t.length){if(i.options.onStringTyped(i.arrayPos),i.arrayPos===i.strings.length-1&&(i.options.callback(),i.curLoop++,i.loop===!1||i.curLoop===i.loopCount))return;i.timeout=setTimeout(function(){i.backspace(t,s)},i.backDelay)}else{0===s&&i.options.preStringTyped(i.arrayPos);var e=t.substr(0,s+1);i.attr?i.el.setAttribute(i.attr,e):i.isInput?i.el.value=e:"html"===i.contentType?i.el.innerHTML=e:i.el.textContent=e,s++,i.typewrite(t,s)}},e)},e)}},backspace:function(t,s){if(this.stop!==!0){var e=Math.round(70*Math.random())+this.backSpeed,i=this;i.timeout=setTimeout(function(){if("html"===i.contentType&&">"===t.substr(s).charAt(0)){for(var e="";"<"!==t.substr(s-1).charAt(0)&&(e-=t.substr(s).charAt(0),s--,!(s<0)););s--,e+="<"}var r=t.substr(0,s);i.attr?i.el.setAttribute(i.attr,r):i.isInput?i.el.value=r:"html"===i.contentType?i.el.innerHTML=r:i.el.textContent=r,s>i.stopNum?(s--,i.backspace(t,s)):s<=i.stopNum&&(i.arrayPos++,i.arrayPos===i.strings.length?(i.arrayPos=0,i.shuffle&&(i.sequence=i.shuffleArray(i.sequence)),i.init()):i.typewrite(i.strings[i.sequence[i.arrayPos]],s))},e)}},shuffleArray:function(t){var s,e,i=t.length;if(i)for(;--i;)e=Math.floor(Math.random()*(i+1)),s=t[e],t[e]=t[i],t[i]=s;return t},reset:function(){var t=this;clearInterval(t.timeout);this.el.getAttribute("id");this.el.textContent="","undefined"!=typeof this.cursor&&"undefined"!=typeof this.cursor.parentNode&&this.cursor.parentNode.removeChild(this.cursor),this.strPos=0,this.arrayPos=0,this.curLoop=0,this.options.resetCallback()}},i["new"]=function(t,e){var r=Array.prototype.slice.apply(s.querySelectorAll(t));r.forEach(function(t){var s=t._typed,r="object"==typeof e&&e;s&&s.reset(),t._typed=s=new i(t,r),"string"==typeof e&&s[e]()})},e&&(e.fn.typed=function(t){return this.each(function(){var s=e(this),r=s.data("typed"),o="object"==typeof t&&t;r&&r.reset(),s.data("typed",r=new i(this,o)),"string"==typeof t&&r[t]()})}),t.Typed=i;var r={strings:["These are the default values...","You know what you should do?","Use your own!","Have a great day!"],stringsElement:null,typeSpeed:0,startDelay:0,backSpeed:0,shuffle:!1,backDelay:500,loop:!1,loopCount:!1,showCursor:!0,cursorChar:"|",attr:null,contentType:"html",callback:function(){},preStringTyped:function(){},onStringTyped:function(){},resetCallback:function(){}}}(window,document,window.jQuery);

/*! Morphext - v2.4.4 https://github.com/MrSaints/Morphext - 2015-05-21 */
!function(a){"use strict";function b(b,c){this.element=a(b),this.settings=a.extend({},d,c),this._defaults=d,this._init()}var c="Morphext",d={animation:"bounceIn",separator:",",speed:2e3,complete:a.noop};b.prototype={_init:function(){var b=this;this.phrases=[],this.element.addClass("morphext"),a.each(this.element.text().split(this.settings.separator),function(c,d){b.phrases.push(a.trim(d))}),this.index=-1,this.animate(),this.start()},animate:function(){this.index=++this.index%this.phrases.length,this.element[0].innerHTML='<span class="animated '+this.settings.animation+'">'+this.phrases[this.index]+"</span>",a.isFunction(this.settings.complete)&&this.settings.complete.call(this)},start:function(){var a=this;this._interval=setInterval(function(){a.animate()},this.settings.speed)},stop:function(){this._interval=clearInterval(this._interval)}},a.fn[c]=function(d){return this.each(function(){a.data(this,"plugin_"+c)||a.data(this,"plugin_"+c,new b(this,d))})}}(jQuery);

/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(a){var b,c,d,e,f,g,h="Close",i="BeforeClose",j="AfterClose",k="BeforeAppend",l="MarkupParse",m="Open",n="Change",o="mfp",p="."+o,q="mfp-ready",r="mfp-removing",s="mfp-prevent-close",t=function(){},u=!!window.jQuery,v=a(window),w=function(a,c){b.ev.on(o+a+p,c)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(c,d){b.ev.triggerHandler(o+c,d),b.st.callbacks&&(c=c.charAt(0).toLowerCase()+c.slice(1),b.st.callbacks[c]&&b.st.callbacks[c].apply(b,a.isArray(d)?d:[d]))},z=function(c){return c===g&&b.currTemplate.closeBtn||(b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%",b.st.tClose)),g=c),b.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(b=new t,b.init(),a.magnificPopup.instance=b)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(void 0!==a.transition)return!0;for(;b.length;)if(b.pop()+"Transition"in a)return!0;return!1};t.prototype={constructor:t,init:function(){var c=navigator.appVersion;b.isLowIE=b.isIE8=document.all&&!document.addEventListener,b.isAndroid=/android/gi.test(c),b.isIOS=/iphone|ipad|ipod/gi.test(c),b.supportsTransition=B(),b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),d=a(document),b.popupsCache={}},open:function(c){var e;if(c.isObj===!1){b.items=c.items.toArray(),b.index=0;var g,h=c.items;for(e=0;e<h.length;e++)if(g=h[e],g.parsed&&(g=g.el[0]),g===c.el[0]){b.index=e;break}}else b.items=a.isArray(c.items)?c.items:[c.items],b.index=c.index||0;if(b.isOpen)return void b.updateItemHTML();b.types=[],f="",c.mainEl&&c.mainEl.length?b.ev=c.mainEl.eq(0):b.ev=d,c.key?(b.popupsCache[c.key]||(b.popupsCache[c.key]={}),b.currTemplate=b.popupsCache[c.key]):b.currTemplate={},b.st=a.extend(!0,{},a.magnificPopup.defaults,c),b.fixedContentPos="auto"===b.st.fixedContentPos?!b.probablyMobile:b.st.fixedContentPos,b.st.modal&&(b.st.closeOnContentClick=!1,b.st.closeOnBgClick=!1,b.st.showCloseBtn=!1,b.st.enableEscapeKey=!1),b.bgOverlay||(b.bgOverlay=x("bg").on("click"+p,function(){b.close()}),b.wrap=x("wrap").attr("tabindex",-1).on("click"+p,function(a){b._checkIfClose(a.target)&&b.close()}),b.container=x("container",b.wrap)),b.contentContainer=x("content"),b.st.preloader&&(b.preloader=x("preloader",b.container,b.st.tLoading));var i=a.magnificPopup.modules;for(e=0;e<i.length;e++){var j=i[e];j=j.charAt(0).toUpperCase()+j.slice(1),b["init"+j].call(b)}y("BeforeOpen"),b.st.showCloseBtn&&(b.st.closeBtnInside?(w(l,function(a,b,c,d){c.close_replaceWith=z(d.type)}),f+=" mfp-close-btn-in"):b.wrap.append(z())),b.st.alignTop&&(f+=" mfp-align-top"),b.fixedContentPos?b.wrap.css({overflow:b.st.overflowY,overflowX:"hidden",overflowY:b.st.overflowY}):b.wrap.css({top:v.scrollTop(),position:"absolute"}),(b.st.fixedBgPos===!1||"auto"===b.st.fixedBgPos&&!b.fixedContentPos)&&b.bgOverlay.css({height:d.height(),position:"absolute"}),b.st.enableEscapeKey&&d.on("keyup"+p,function(a){27===a.keyCode&&b.close()}),v.on("resize"+p,function(){b.updateSize()}),b.st.closeOnContentClick||(f+=" mfp-auto-cursor"),f&&b.wrap.addClass(f);var k=b.wH=v.height(),n={};if(b.fixedContentPos&&b._hasScrollBar(k)){var o=b._getScrollbarSize();o&&(n.marginRight=o)}b.fixedContentPos&&(b.isIE7?a("body, html").css("overflow","hidden"):n.overflow="hidden");var r=b.st.mainClass;return b.isIE7&&(r+=" mfp-ie7"),r&&b._addClassToMFP(r),b.updateItemHTML(),y("BuildControls"),a("html").css(n),b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo||a(document.body)),b._lastFocusedEl=document.activeElement,setTimeout(function(){b.content?(b._addClassToMFP(q),b._setFocus()):b.bgOverlay.addClass(q),d.on("focusin"+p,b._onFocusIn)},16),b.isOpen=!0,b.updateSize(k),y(m),c},close:function(){b.isOpen&&(y(i),b.isOpen=!1,b.st.removalDelay&&!b.isLowIE&&b.supportsTransition?(b._addClassToMFP(r),setTimeout(function(){b._close()},b.st.removalDelay)):b._close())},_close:function(){y(h);var c=r+" "+q+" ";if(b.bgOverlay.detach(),b.wrap.detach(),b.container.empty(),b.st.mainClass&&(c+=b.st.mainClass+" "),b._removeClassFromMFP(c),b.fixedContentPos){var e={marginRight:""};b.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}d.off("keyup"+p+" focusin"+p),b.ev.off(p),b.wrap.attr("class","mfp-wrap").removeAttr("style"),b.bgOverlay.attr("class","mfp-bg"),b.container.attr("class","mfp-container"),!b.st.showCloseBtn||b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0||b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach(),b.st.autoFocusLast&&b._lastFocusedEl&&a(b._lastFocusedEl).focus(),b.currItem=null,b.content=null,b.currTemplate=null,b.prevHeight=0,y(j)},updateSize:function(a){if(b.isIOS){var c=document.documentElement.clientWidth/window.innerWidth,d=window.innerHeight*c;b.wrap.css("height",d),b.wH=d}else b.wH=a||v.height();b.fixedContentPos||b.wrap.css("height",b.wH),y("Resize")},updateItemHTML:function(){var c=b.items[b.index];b.contentContainer.detach(),b.content&&b.content.detach(),c.parsed||(c=b.parseEl(b.index));var d=c.type;if(y("BeforeChange",[b.currItem?b.currItem.type:"",d]),b.currItem=c,!b.currTemplate[d]){var f=b.st[d]?b.st[d].markup:!1;y("FirstMarkupParse",f),f?b.currTemplate[d]=a(f):b.currTemplate[d]=!0}e&&e!==c.type&&b.container.removeClass("mfp-"+e+"-holder");var g=b["get"+d.charAt(0).toUpperCase()+d.slice(1)](c,b.currTemplate[d]);b.appendContent(g,d),c.preloaded=!0,y(n,c),e=c.type,b.container.prepend(b.contentContainer),y("AfterChange")},appendContent:function(a,c){b.content=a,a?b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0?b.content.find(".mfp-close").length||b.content.append(z()):b.content=a:b.content="",y(k),b.container.addClass("mfp-"+c+"-holder"),b.contentContainer.append(b.content)},parseEl:function(c){var d,e=b.items[c];if(e.tagName?e={el:a(e)}:(d=e.type,e={data:e,src:e.src}),e.el){for(var f=b.types,g=0;g<f.length;g++)if(e.el.hasClass("mfp-"+f[g])){d=f[g];break}e.src=e.el.attr("data-mfp-src"),e.src||(e.src=e.el.attr("href"))}return e.type=d||b.st.type||"inline",e.index=c,e.parsed=!0,b.items[c]=e,y("ElementParse",e),b.items[c]},addGroup:function(a,c){var d=function(d){d.mfpEl=this,b._openClick(d,a,c)};c||(c={});var e="click.magnificPopup";c.mainEl=a,c.items?(c.isObj=!0,a.off(e).on(e,d)):(c.isObj=!1,c.delegate?a.off(e).on(e,c.delegate,d):(c.items=a,a.off(e).on(e,d)))},_openClick:function(c,d,e){var f=void 0!==e.midClick?e.midClick:a.magnificPopup.defaults.midClick;if(f||!(2===c.which||c.ctrlKey||c.metaKey||c.altKey||c.shiftKey)){var g=void 0!==e.disableOn?e.disableOn:a.magnificPopup.defaults.disableOn;if(g)if(a.isFunction(g)){if(!g.call(b))return!0}else if(v.width()<g)return!0;c.type&&(c.preventDefault(),b.isOpen&&c.stopPropagation()),e.el=a(c.mfpEl),e.delegate&&(e.items=d.find(e.delegate)),b.open(e)}},updateStatus:function(a,d){if(b.preloader){c!==a&&b.container.removeClass("mfp-s-"+c),d||"loading"!==a||(d=b.st.tLoading);var e={status:a,text:d};y("UpdateStatus",e),a=e.status,d=e.text,b.preloader.html(d),b.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),b.container.addClass("mfp-s-"+a),c=a}},_checkIfClose:function(c){if(!a(c).hasClass(s)){var d=b.st.closeOnContentClick,e=b.st.closeOnBgClick;if(d&&e)return!0;if(!b.content||a(c).hasClass("mfp-close")||b.preloader&&c===b.preloader[0])return!0;if(c===b.content[0]||a.contains(b.content[0],c)){if(d)return!0}else if(e&&a.contains(document,c))return!0;return!1}},_addClassToMFP:function(a){b.bgOverlay.addClass(a),b.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),b.wrap.removeClass(a)},_hasScrollBar:function(a){return(b.isIE7?d.height():document.body.scrollHeight)>(a||v.height())},_setFocus:function(){(b.st.focus?b.content.find(b.st.focus).eq(0):b.wrap).focus()},_onFocusIn:function(c){return c.target===b.wrap[0]||a.contains(b.wrap[0],c.target)?void 0:(b._setFocus(),!1)},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(l,[b,c,d]),a.each(c,function(c,d){if(void 0===d||d===!1)return!0;if(e=c.split("_"),e.length>1){var f=b.find(p+"-"+e[0]);if(f.length>0){var g=e[1];"replaceWith"===g?f[0]!==d[0]&&f.replaceWith(d):"img"===g?f.is("img")?f.attr("src",d):f.replaceWith(a("<img>").attr("src",d).attr("class",f.attr("class"))):f.attr(e[1],d)}}else b.find(p+"-"+c).html(d)})},_getScrollbarSize:function(){if(void 0===b.scrollbarSize){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),b.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return b.scrollbarSize}},a.magnificPopup={instance:null,proto:t.prototype,modules:[],open:function(b,c){return A(),b=b?a.extend(!0,{},b):{},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(c){A();var d=a(this);if("string"==typeof c)if("open"===c){var e,f=u?d.data("magnificPopup"):d[0].magnificPopup,g=parseInt(arguments[1],10)||0;f.items?e=f.items[g]:(e=d,f.delegate&&(e=e.find(f.delegate)),e=e.eq(g)),b._openClick({mfpEl:e},d,f)}else b.isOpen&&b[c].apply(b,Array.prototype.slice.call(arguments,1));else c=a.extend(!0,{},c),u?d.data("magnificPopup",c):d[0].magnificPopup=c,b.addGroup(d,c);return d};var C,D,E,F="inline",G=function(){E&&(D.after(E.addClass(C)).detach(),E=null)};a.magnificPopup.registerModule(F,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){b.types.push(F),w(h+"."+F,function(){G()})},getInline:function(c,d){if(G(),c.src){var e=b.st.inline,f=a(c.src);if(f.length){var g=f[0].parentNode;g&&g.tagName&&(D||(C=e.hiddenClass,D=x(C),C="mfp-"+C),E=f.after(D).detach().removeClass(C)),b.updateStatus("ready")}else b.updateStatus("error",e.tNotFound),f=a("<div>");return c.inlineElement=f,f}return b.updateStatus("ready"),b._parseMarkup(d,{},c),d}}});var H,I="ajax",J=function(){H&&a(document.body).removeClass(H)},K=function(){J(),b.req&&b.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){b.types.push(I),H=b.st.ajax.cursor,w(h+"."+I,K),w("BeforeChange."+I,K)},getAjax:function(c){H&&a(document.body).addClass(H),b.updateStatus("loading");var d=a.extend({url:c.src,success:function(d,e,f){var g={data:d,xhr:f};y("ParseAjax",g),b.appendContent(a(g.data),I),c.finished=!0,J(),b._setFocus(),setTimeout(function(){b.wrap.addClass(q)},16),b.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),c.finished=c.loadError=!0,b.updateStatus("error",b.st.ajax.tError.replace("%url%",c.src))}},b.st.ajax.settings);return b.req=a.ajax(d),""}}});var L,M=function(c){if(c.data&&void 0!==c.data.title)return c.data.title;var d=b.st.image.titleSrc;if(d){if(a.isFunction(d))return d.call(b,c);if(c.el)return c.el.attr(d)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=b.st.image,d=".image";b.types.push("image"),w(m+d,function(){"image"===b.currItem.type&&c.cursor&&a(document.body).addClass(c.cursor)}),w(h+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),v.off("resize"+p)}),w("Resize"+d,b.resizeImage),b.isLowIE&&w("AfterChange",b.resizeImage)},resizeImage:function(){var a=b.currItem;if(a&&a.img&&b.st.image.verticalFit){var c=0;b.isLowIE&&(c=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",b.wH-c)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var c=0,d=a.img[0],e=function(f){L&&clearInterval(L),L=setInterval(function(){return d.naturalWidth>0?void b._onImageHasSize(a):(c>200&&clearInterval(L),c++,void(3===c?e(10):40===c?e(50):100===c&&e(500)))},f)};e(1)},getImage:function(c,d){var e=0,f=function(){c&&(c.img[0].complete?(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("ready")),c.hasSize=!0,c.loaded=!0,y("ImageLoadComplete")):(e++,200>e?setTimeout(f,100):g()))},g=function(){c&&(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("error",h.tError.replace("%url%",c.src))),c.hasSize=!0,c.loaded=!0,c.loadError=!0)},h=b.st.image,i=d.find(".mfp-img");if(i.length){var j=document.createElement("img");j.className="mfp-img",c.el&&c.el.find("img").length&&(j.alt=c.el.find("img").attr("alt")),c.img=a(j).on("load.mfploader",f).on("error.mfploader",g),j.src=c.src,i.is("img")&&(c.img=c.img.clone()),j=c.img[0],j.naturalWidth>0?c.hasSize=!0:j.width||(c.hasSize=!1)}return b._parseMarkup(d,{title:M(c),img_replaceWith:c.img},c),b.resizeImage(),c.hasSize?(L&&clearInterval(L),c.loadError?(d.addClass("mfp-loading"),b.updateStatus("error",h.tError.replace("%url%",c.src))):(d.removeClass("mfp-loading"),b.updateStatus("ready")),d):(b.updateStatus("loading"),c.loading=!0,c.hasSize||(c.imgHidden=!0,d.addClass("mfp-loading"),b.findImageSize(c)),d)}}});var N,O=function(){return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a,c=b.st.zoom,d=".zoom";if(c.enabled&&b.supportsTransition){var e,f,g=c.duration,j=function(a){var b=a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+c.duration/1e3+"s "+c.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,b.css(e),b},k=function(){b.content.css("visibility","visible")};w("BuildControls"+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.content.css("visibility","hidden"),a=b._getItemToZoom(),!a)return void k();f=j(a),f.css(b._getOffset()),b.wrap.append(f),e=setTimeout(function(){f.css(b._getOffset(!0)),e=setTimeout(function(){k(),setTimeout(function(){f.remove(),a=f=null,y("ZoomAnimationEnded")},16)},g)},16)}}),w(i+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.st.removalDelay=g,!a){if(a=b._getItemToZoom(),!a)return;f=j(a)}f.css(b._getOffset(!0)),b.wrap.append(f),b.content.css("visibility","hidden"),setTimeout(function(){f.css(b._getOffset())},16)}}),w(h+d,function(){b._allowZoom()&&(k(),f&&f.remove(),a=null)})}},_allowZoom:function(){return"image"===b.currItem.type},_getItemToZoom:function(){return b.currItem.hasSize?b.currItem.img:!1},_getOffset:function(c){var d;d=c?b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);var e=d.offset(),f=parseInt(d.css("padding-top"),10),g=parseInt(d.css("padding-bottom"),10);e.top-=a(window).scrollTop()-f;var h={width:d.width(),height:(u?d.innerHeight():d[0].offsetHeight)-g-f};return O()?h["-moz-transform"]=h.transform="translate("+e.left+"px,"+e.top+"px)":(h.left=e.left,h.top=e.top),h}}});var P="iframe",Q="//about:blank",R=function(a){if(b.currTemplate[P]){var c=b.currTemplate[P].find("iframe");c.length&&(a||(c[0].src=Q),b.isIE8&&c.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){b.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(h+"."+P,function(){R()})},getIframe:function(c,d){var e=c.src,f=b.st.iframe;a.each(f.patterns,function(){return e.indexOf(this.index)>-1?(this.id&&(e="string"==typeof this.id?e.substr(e.lastIndexOf(this.id)+this.id.length,e.length):this.id.call(this,e)),e=this.src.replace("%id%",e),!1):void 0});var g={};return f.srcAction&&(g[f.srcAction]=e),b._parseMarkup(d,g,c),b.updateStatus("ready"),d}}});var S=function(a){var c=b.items.length;return a>c-1?a-c:0>a?c+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=b.st.gallery,e=".mfp-gallery";return b.direction=!0,c&&c.enabled?(f+=" mfp-gallery",w(m+e,function(){c.navigateByImgClick&&b.wrap.on("click"+e,".mfp-img",function(){return b.items.length>1?(b.next(),!1):void 0}),d.on("keydown"+e,function(a){37===a.keyCode?b.prev():39===a.keyCode&&b.next()})}),w("UpdateStatus"+e,function(a,c){c.text&&(c.text=T(c.text,b.currItem.index,b.items.length))}),w(l+e,function(a,d,e,f){var g=b.items.length;e.counter=g>1?T(c.tCounter,f.index,g):""}),w("BuildControls"+e,function(){if(b.items.length>1&&c.arrows&&!b.arrowLeft){var d=c.arrowMarkup,e=b.arrowLeft=a(d.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(s),f=b.arrowRight=a(d.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(s);e.click(function(){b.prev()}),f.click(function(){b.next()}),b.container.append(e.add(f))}}),w(n+e,function(){b._preloadTimeout&&clearTimeout(b._preloadTimeout),b._preloadTimeout=setTimeout(function(){b.preloadNearbyImages(),b._preloadTimeout=null},16)}),void w(h+e,function(){d.off(e),b.wrap.off("click"+e),b.arrowRight=b.arrowLeft=null})):!1},next:function(){b.direction=!0,b.index=S(b.index+1),b.updateItemHTML()},prev:function(){b.direction=!1,b.index=S(b.index-1),b.updateItemHTML()},goTo:function(a){b.direction=a>=b.index,b.index=a,b.updateItemHTML()},preloadNearbyImages:function(){var a,c=b.st.gallery.preload,d=Math.min(c[0],b.items.length),e=Math.min(c[1],b.items.length);for(a=1;a<=(b.direction?e:d);a++)b._preloadItem(b.index+a);for(a=1;a<=(b.direction?d:e);a++)b._preloadItem(b.index-a)},_preloadItem:function(c){if(c=S(c),!b.items[c].preloaded){var d=b.items[c];d.parsed||(d=b.parseEl(c)),y("LazyLoad",d),"image"===d.type&&(d.img=a('<img class="mfp-img" />').on("load.mfploader",function(){d.hasSize=!0}).on("error.mfploader",function(){d.hasSize=!0,d.loadError=!0,y("LazyLoadError",d)}).attr("src",d.src)),d.preloaded=!0}}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=b.st.retina,c=a.ratio;c=isNaN(c)?c():c,c>1&&(w("ImageHasSize."+U,function(a,b){b.img.css({"max-width":b.img[0].naturalWidth/c,width:"100%"})}),w("ElementParse."+U,function(b,d){d.src=a.replaceSrc(d,c)}))}}}}),A()});
(function($) {
	'use strict';

	window.loadMore = function( options, settings ) {

		// Default Values for Load More Js
		var optionsValue = {
			siteUrl: options.siteUrl,
			totalPosts: options.totalPosts,
			loadMoreBtn: options.loadMoreBtn,
			postContainer: options.postContainer,
			postStyle: options.postStyle, // block, grid, timeline
		}
		// Settings Values
		var settingsValue = {
			postType: settings.postType,
			perPage: settings.perPage,
			postOrder: settings.postOrder,
			showImage: settings.showImage,
			showTitle: settings.showTitle,
			showExcerpt: settings.showExcerpt,
			showMeta: settings.showMeta,
			metaPosition: settings.metaPosition,
			excerptLength: settings.excerptLength,
			btnText: settings.btnText,
			categories: settings.categories,
		}

		var offset = settingsValue.perPage;

		optionsValue.loadMoreBtn.on( 'click', function( e ) {
			e.preventDefault();
			$(this).addClass( 'button--loading' );
			$(this).find( 'span' ).html( 'Loading...' );

			// Rest Api Url Settings
			if( settings.categories == '' ) {
				var restUrl = optionsValue.siteUrl+'wp-json/wp/v2/'+settings.postType+'?per_page='+settingsValue.perPage+'&offset='+offset+'&order='+settingsValue.postOrder+'&_embed';
			}else {
				var restUrl = optionsValue.siteUrl+'wp-json/wp/v2/'+settings.postType+'?categories='+settingsValue.categories+'&per_page='+settingsValue.perPage+'&offset='+offset+'&order='+settingsValue.postOrder+'&_embed';
			}

			$.ajax({
				url: restUrl,
				type: 'GET',
				success: function( res ) {
					createPostHtml( res );
					if( optionsValue.postStyle === 'grid' ) {
						$( '.eael-post-grid' ).masonry( 'destroy' );
						setTimeout(function() {
							$('.eael-post-grid').masonry({
						    	itemSelector: '.eael-grid-post',
						    	percentPosition: true,
						    	columnWidth: '.eael-post-grid-column'
						    });
						}, 100);
					}
					optionsValue.loadMoreBtn.removeClass( 'button--loading' );
					optionsValue.loadMoreBtn.find( 'span' ).html( settingsValue.btnText );

					offset = offset + settingsValue.perPage;
					if( offset >= optionsValue.totalPosts ) {
						optionsValue.loadMoreBtn.remove();
					}
				},
				error: function( err ) {
					console.log( 'Something went wrong!' );
				}
			});
		} );

		/**
		 * Create Html Post Block
		 */
		function createPostHtml( data ) {

			if( optionsValue.postStyle === 'timeline' ) {
				var html = '';
				for (var i = 0; i < data.length; i++) {
				    // Get Image
				    if (data[i]._links['wp:featuredmedia']) {
				        var feature_image = 'style="background-image: url(' + data[i]._embedded['wp:featuredmedia'][0].source_url + ');"';
				    } else {
				        var feature_image = '';
				    }
				    // Get Date
				    var getPostDate = new Date(data[i].date);

				    html += '<article class="eael-timeline-post eael-timeline-column">';
				    html += '<div class="eael-timeline-bullet"></div>';
				    html += '<div class="eael-timeline-post-inner">';
				    html += '<a class="eael-timeline-post-link" href="' + data[i].link + '" title="' + data[i].title.rendered + '">';
				    html += '<time datetime="' + get_post_date(getPostDate) + '">' + get_post_date(getPostDate) + '</time>';
				    html += '<div class="eael-timeline-post-image" ' + feature_image + ' ></div>';
				    if ( settingsValue.showExcerpt == 1 ) {
				        html += '<div class="eael-timeline-post-excerpt">';
				        html += '' + data[i].excerpt.rendered.split(/\s+/).slice(0, settingsValue.excerptLength).join(" ");
				        html += '</div>';
				    }
				    if ( settingsValue.showTitle == 1 ) {
				        html += '<div class="eael-timeline-post-title">';
				        html += '<h2>' + data[i].title.rendered + '</h2>';
				        html += '</div>';
				    }
				    html += '</a>';
				    html += '</div>';
				    html += '</div>';
				    html += '</article>';
				}
				optionsValue.postContainer.append(html);
			}else if( optionsValue.postStyle === 'grid' ) {
				var html = '';
				for( var i = 0; i < data.length; i++ ) {
					// Get Image
					if( data[i]._links['wp:featuredmedia'] ) {
						var feature_image = '<img src="'+data[i]._embedded['wp:featuredmedia'][0].source_url+'" />';
					}else {
						var feature_image = '';
					}
					// Get Date
					var getPostDate = new Date( data[i].date );

					html += '<article class="eael-grid-post eael-post-grid-column">';
					html += '<div class="eael-grid-post-holder">';
					html += '<div class="eael-grid-post-holder-inner">';
					if( data[i]._links['wp:featuredmedia'] ) {
						html += '<div class="eael-entry-media">';
						html += '<div class="eael-entry-overlay">';
						html += '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>';
						html += '<a href="'+data[i].link+'"></a>';
						html += '</div>';
						if( settingsValue.showImage == 1 ) {
							html += '<div class="eael-entry-thumbnail">'+feature_image;
							html += '</div>';
						}
						html += '</div>';
					}
					html += '<div class="eael-entry-wrapper">';

					html += '<header class="eael-entry-header">';
					if( settingsValue.showTitle == 1 ) {
						html += '<h2 class="eael-entry-title"><a class="eael-grid-post-link" href="'+data[i].link+'" title="'+data[i].title.rendered+'">'+data[i].title.rendered+'</a></h2>';
					}
					if( settingsValue.showMeta == 1 && settingsValue.metaPosition == 'meta-entry-header') {
						html += '<div class="eael-entry-meta">';
						html += '<span class="eael-posted-by"><a href="'+data[i]._embedded.author[0].link+'">'+data[i]._embedded.author[0].name+'</a></span>';
						html += '<span class="eael-posted-on"><time datetime="'+get_post_date( getPostDate )+'">'+get_post_date( getPostDate )+'</time></span>';
						html += '</div>';
					}
					html += '</header>';

					html += '<div class="eael-entry-content">';
					if( settingsValue.showExcerpt == 1 ) {
						html += '<div class="eael-grid-post-excerpt">';
						html += '<p>'+data[i].excerpt.rendered.split( /\s+/ ).slice( 0, settingsValue.excerptLength ).join( " " )+'...</p>';
						html += '</div>';
					}
					html += '</div>';
					html += '</div>';
					if( settingsValue.showMeta == 1 && settingsValue.metaPosition == 'meta-entry-footer' ) {
						html += '<div class="eael-entry-footer">';
						html += '<div class="eael-author-avatar">';
						html += '<a href="'+data[i]._embedded.author[0].link+'">';
						html += '<img src="'+data[i]._embedded.author[0].avatar_urls[96]+'" class="avatar avatar-96 photo" />';
						html += '</a>';
						html += '</div>';
						html += '<div class="eael-entry-meta">';
						html += '<div class="eael-posted-by">';
						html += '<a href="'+data[i]._embedded.author[0].link+'">'+data[i]._embedded.author[0].name+'</a>';
						html += '</div>';
						html += '<div class="eael-posted-on">';
						html += '<time datetime="'+get_post_date( getPostDate )+'">'+get_post_date( getPostDate );
						html += '</time>';
						html += '</div>';
						html += '</div>';
						html += '</div>';
					}
					html += '</div>';
					html += '</article>';
				}
				optionsValue.postContainer.append( html );
			}

		}

	}



	/**
	 * Get Date
	 */
	function get_post_date( date ) {
		var getDate = new Date( date );
		var month = new Array();
		month[0] = "January";
		month[1] = "February";
		month[2] = "March";
		month[3] = "April";
		month[4] = "May";
		month[5] = "June";
		month[6] = "July";
		month[7] = "August";
		month[8] = "September";
		month[9] = "October";
		month[10] = "November";
		month[11] = "December";
		var dayNum = getDate.getDate();
		var monthName = month[ getDate.getMonth() ];
		var getYear = getDate.getFullYear();

		var returnYear = monthName + ' ' + dayNum + ', ' + getYear;
		return returnYear;
	}

})(jQuery);
/*!
 * Masonry PACKAGED v4.2.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,r,a){function h(t,e,n){var o,r="$()."+i+'("'+e+'")';return t.each(function(t,h){var u=a.data(h,i);if(!u)return void s(i+" not initialized. Cannot call methods, i.e. "+r);var d=u[e];if(!d||"_"==e.charAt(0))return void s(r+" is not a valid method");var l=d.apply(u,n);o=void 0===o?l:o}),void 0!==o?o:t}function u(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new r(n,e),a.data(n,i,o))})}a=a||e||t.jQuery,a&&(r.prototype.option||(r.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return h(this,t,e)}return u(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,r=t.console,s="undefined"==typeof r?function(){}:function(t){r.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=-1==t.indexOf("%")&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;u>e;e++){var i=h[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function o(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var o=n(e);r.isBoxSizeOuter=s=200==t(o.width),i.removeChild(e)}}function r(e){if(o(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var r=n(e);if("none"==r.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==r.boxSizing,l=0;u>l;l++){var c=h[l],f=r[c],m=parseFloat(f);a[c]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,g=a.paddingTop+a.paddingBottom,y=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,z=a.borderTopWidth+a.borderBottomWidth,E=d&&s,b=t(r.width);b!==!1&&(a.width=b+(E?0:p+_));var x=t(r.height);return x!==!1&&(a.height=x+(E?0:g+z)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(g+z),a.outerWidth=a.width+y,a.outerHeight=a.height+v,a}}var s,a="undefined"==typeof console?e:function(t){console.error(t)},h=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],u=h.length,d=!1;return r}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"object"==typeof t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},i.getParent=function(t,i){for(;t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),r=0;r<i.length;r++)o.push(i[r])}}),o},i.debounceMethod=function(t,e,i){var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];t&&clearTimeout(t);var e=arguments,r=this;this[o]=setTimeout(function(){n.apply(r,e),delete r[o]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var r=i.toDashed(o),s="data-"+r,a=document.querySelectorAll("["+s+"]"),h=document.querySelectorAll(".js-"+r),u=i.makeArray(a).concat(i.makeArray(h)),d=s+"-options",l=t.jQuery;u.forEach(function(t){var i,r=t.getAttribute(s)||t.getAttribute(d);try{i=r&&JSON.parse(r)}catch(a){return void(n&&n.error("Error parsing "+s+" on "+t.className+": "+a))}var h=new e(t,i);l&&l.data(t,o,h)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function n(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var r=document.documentElement.style,s="string"==typeof r.transition?"transition":"WebkitTransition",a="string"==typeof r.transform?"transform":"WebkitTransform",h={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[s],u={transform:a,transition:s,transitionDuration:s+"Duration",transitionProperty:s+"Property",transitionDelay:s+"Delay"},d=n.prototype=Object.create(t.prototype);d.constructor=n,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var n=u[i]||i;e[n]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],r=this.layout.size,s=-1!=n.indexOf("%")?parseFloat(n)/100*r.width:parseInt(n,10),a=-1!=o.indexOf("%")?parseFloat(o)/100*r.height:parseInt(o,10);s=isNaN(s)?0:s,a=isNaN(a)?0:a,s-=e?r.paddingLeft:r.paddingRight,a-=i?r.paddingTop:r.paddingBottom,this.position.x=s,this.position.y=a},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",r=i?"left":"right",s=i?"right":"left",a=this.position.x+t[o];e[r]=this.getXValue(a),e[s]="";var h=n?"paddingTop":"paddingBottom",u=n?"top":"bottom",d=n?"bottom":"top",l=this.position.y+t[h];e[u]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),r=parseInt(e,10),s=o===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,h=e-n,u={};u.transform=this.getTranslate(a,h),this.transition({to:u,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return t=i?t:-t,e=n?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+o(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(h,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var c={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,n=c[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){var o=e.onEnd[n];o.call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(h,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var f={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(f)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return s&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,r){return e(t,i,n,o,r)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function r(t,e){var i=n.getQueryElement(t);if(!i)return void(h&&h.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,u&&(this.$element=u(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++l;this.element.outlayerGUID=o,c[o]=this,this._create();var r=this._getOption("initLayout");r&&this.layout()}function s(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],n=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var o=m[n]||1;return i*o}var h=t.console,u=t.jQuery,d=function(){},l=0,c={};r.namespace="outlayer",r.Item=o,r.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var f=r.prototype;n.extend(f,e.prototype),f.option=function(t){n.extend(this.options,t)},f._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},r.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},f._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},f.reloadItems=function(){this.items=this._itemize(this.element.children)},f._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var r=e[o],s=new i(r,this);n.push(s)}return n},f._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},f.getItemElements=function(){return this.items.map(function(t){return t.element})},f.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},f._init=f.layout,f._resetLayout=function(){this.getSize()},f.getSize=function(){this.size=i(this.element)},f._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},f.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},f._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},f._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},f._getItemLayoutPosition=function(){return{x:0,y:0}},f._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},f.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},f._positionItem=function(t,e,i,n,o){n?t.goTo(e,i):(t.stagger(o*this.stagger),t.moveTo(e,i))},f._postLayout=function(){this.resizeContainer()},f.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},f._getContainerSize=d,f._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},f._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){s++,s==r&&i()}var o=this,r=e.length;if(!e||!r)return void i();var s=0;e.forEach(function(e){e.once(t,n)})},f.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),u)if(this.$element=this.$element||u(this.element),e){var o=u.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},f.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},f.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},f.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},f.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},f._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)):void 0},f._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},f._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},f._manageStamp=d,f._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t),r={left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom};return r},f.handleEvent=n.handleEvent,f.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},f.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},f.onresize=function(){this.resize()},n.debounceMethod(r,"onresize",100),f.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},f.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},f.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},f.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},f.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},f.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},f.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},f.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},f.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},f.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},f.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},f.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},f.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete c[e],delete this.element.outlayerGUID,u&&u.removeData(this.element,this.constructor.namespace)},r.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&c[e]},r.create=function(t,e){var i=s(r);return i.defaults=n.extend({},r.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},r.compatOptions),i.namespace=t,i.data=r.data,i.Item=s(o),n.htmlInit(i,t),u&&u.bridget&&u.bridget(t,i),i};var m={ms:1,s:1e3};return r.Item=o,r}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");i.compatOptions.fitWidth="isFitWidth";var n=i.prototype;return n._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},n.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,r=o/n,s=n-o%n,a=s&&1>s?"round":"floor";r=Math[a](r),this.cols=Math.max(r,1)},n.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,n=e(i);this.containerWidth=n&&n.innerWidth},n._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&1>e?"round":"ceil",n=Math[i](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",r=this[o](n,t),s={x:this.columnWidth*r.col,y:r.y},a=r.y+t.size.outerHeight,h=n+r.col,u=r.col;h>u;u++)this.colYs[u]=a;return s},n._getTopColPosition=function(t){var e=this._getTopColGroup(t),i=Math.min.apply(Math,e);return{col:e.indexOf(i),y:i}},n._getTopColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++)e[n]=this._getColGroupY(n,t);return e},n._getColGroupY=function(t,e){if(2>e)return this.colYs[t];var i=this.colYs.slice(t,t+e);return Math.max.apply(Math,i)},n._getHorizontalColPosition=function(t,e){var i=this.horizontalColIndex%this.cols,n=t>1&&i+t>this.cols;i=n?0:i;var o=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=o?i+t:this.horizontalColIndex,{col:i,y:this._getColGroupY(i,t)}},n._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft"),r=o?n.left:n.right,s=r+i.outerWidth,a=Math.floor(r/this.columnWidth);a=Math.max(0,a);var h=Math.floor(s/this.columnWidth);h-=s%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var u=this._getOption("originTop"),d=(u?n.top:n.bottom)+i.outerHeight,l=a;h>=l;l++)this.colYs[l]=Math.max(d,this.colYs[l])},n._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},n._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},n.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i});
/**!
 * MixItUp v3.2.2
 * A high-performance, dependency-free library for animated filtering, sorting and more
 * Build 20a1a182-d7bd-4c8f-807d-b888e325e44d
 *
 * @copyright Copyright 2014-2017 KunkaLabs Limited.
 * @author    KunkaLabs Limited.
 * @link      https://www.kunkalabs.com/mixitup/
 *
 * @license   Commercial use requires a commercial license.
 *            https://www.kunkalabs.com/mixitup/licenses/
 *
 *            Non-commercial use permitted under same terms as CC BY-NC 3.0 license.
 *            http://creativecommons.org/licenses/by-nc/3.0/
 */
!function(t){"use strict";var e=null,n=null;!function(){var e=["webkit","moz","o","ms"],n=t.document.createElement("div"),a=-1;for(a=0;a<e.length&&!t.requestAnimationFrame;a++)t.requestAnimationFrame=t[e[a]+"RequestAnimationFrame"];"undefined"==typeof n.nextElementSibling&&Object.defineProperty(t.Element.prototype,"nextElementSibling",{get:function(){for(var t=this.nextSibling;t;){if(1===t.nodeType)return t;t=t.nextSibling}return null}}),function(t){t.matches=t.matches||t.machesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector||t.webkitMatchesSelector||function(t){return Array.prototype.indexOf.call(this.parentElement.querySelectorAll(t),this)>-1}}(t.Element.prototype),Object.keys||(Object.keys=function(){var t=Object.prototype.hasOwnProperty,e=!1,n=[],a=-1;return e=!{toString:null}.propertyIsEnumerable("toString"),n=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],a=n.length,function(i){var o=[],r="",s=-1;if("object"!=typeof i&&("function"!=typeof i||null===i))throw new TypeError("Object.keys called on non-object");for(r in i)t.call(i,r)&&o.push(r);if(e)for(s=0;s<a;s++)t.call(i,n[s])&&o.push(n[s]);return o}}()),Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),"function"!=typeof Object.create&&(Object.create=function(t){var e=function(){};return function(n,a){if(n!==Object(n)&&null!==n)throw TypeError("Argument must be an object, or null");e.prototype=n||{};var i=new e;return e.prototype=null,a!==t&&Object.defineProperties(i,a),null===n&&(i.__proto__=null),i}}()),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}),Array.prototype.indexOf||(Array.prototype.indexOf=function(t){var e,n,a,i;if(null===this)throw new TypeError;if(a=Object(this),i=a.length>>>0,0===i)return-1;if(e=0,arguments.length>1&&(e=Number(arguments[1]),e!==e?e=0:0!==e&&e!==1/0&&e!==-(1/0)&&(e=(e>0||-1)*Math.floor(Math.abs(e)))),e>=i)return-1;for(n=e>=0?e:Math.max(i-Math.abs(e),0);n<i;n++)if(n in a&&a[n]===t)return n;return-1}),Function.prototype.bind||(Function.prototype.bind=function(t){var e,n,a,i;if("function"!=typeof this)throw new TypeError;return e=Array.prototype.slice.call(arguments,1),n=this,a=function(){},i=function(){return n.apply(this instanceof a?this:t,e.concat(Array.prototype.slice.call(arguments)))},this.prototype&&(a.prototype=this.prototype),i.prototype=new a,i}),t.Element.prototype.dispatchEvent||(t.Element.prototype.dispatchEvent=function(t){try{return this.fireEvent("on"+t.type,t)}catch(e){}})}(),e=function(a,i,o){var r=null,s=!1,l=null,c=null,u=null,f=null,h=[],d="",m=[],g=-1;if(u=o||t.document,(s=arguments[3])&&(s="boolean"==typeof s),"string"==typeof a)m=u.querySelectorAll(a);else if(a&&"object"==typeof a&&n.isElement(a,u))m=[a];else{if(!a||"object"!=typeof a||!a.length)throw new Error(e.messages.errorFactoryInvalidContainer());m=a}if(m.length<1)throw new Error(e.messages.errorFactoryContainerNotFound());for(g=0;(r=m[g])&&(!(g>0)||s);g++)r.id?d=r.id:(d="MixItUp"+n.randomHex(),r.id=d),e.instances[d]instanceof e.Mixer?(l=e.instances[d],(!i||i&&i.debug&&i.debug.showWarnings!==!1)&&console.warn(e.messages.warningFactoryPreexistingInstance())):(l=new e.Mixer,l.attach(r,u,d,i),e.instances[d]=l),c=new e.Facade(l),i&&i.debug&&i.debug.enable?h.push(l):h.push(c);return f=s?new e.Collection(h):h[0]},e.use=function(t){e.Base.prototype.callActions.call(e,"beforeUse",arguments),"function"==typeof t&&"mixitup-extension"===t.TYPE?"undefined"==typeof e.extensions[t.NAME]&&(t(e),e.extensions[t.NAME]=t):t.fn&&t.fn.jquery&&(e.libraries.$=t),e.Base.prototype.callActions.call(e,"afterUse",arguments)},e.instances={},e.extensions={},e.libraries={},n={hasClass:function(t,e){return!!t.className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))},addClass:function(t,e){this.hasClass(t,e)||(t.className+=t.className?" "+e:e)},removeClass:function(t,e){if(this.hasClass(t,e)){var n=new RegExp("(\\s|^)"+e+"(\\s|$)");t.className=t.className.replace(n," ").trim()}},extend:function(t,e,n,a){var i=[],o="",r=-1;n=n||!1,a=a||!1;try{if(Array.isArray(e))for(r=0;r<e.length;r++)i.push(r);else e&&(i=Object.keys(e));for(r=0;r<i.length;r++)o=i[r],!n||"object"!=typeof e[o]||this.isElement(e[o])?t[o]=e[o]:Array.isArray(e[o])?(t[o]||(t[o]=[]),this.extend(t[o],e[o],n,a)):(t[o]||(t[o]={}),this.extend(t[o],e[o],n,a))}catch(s){if(!a)throw s;this.handleExtendError(s,t)}return t},handleExtendError:function(t,n){var a=/property "?(\w*)"?[,:] object/i,i=null,o="",r="",s="",l="",c="",u=-1,f=-1;if(t instanceof TypeError&&(i=a.exec(t.message))){o=i[1];for(c in n){for(f=0;f<o.length&&o.charAt(f)===c.charAt(f);)f++;f>u&&(u=f,l=c)}throw u>1&&(s=e.messages.errorConfigInvalidPropertySuggestion({probableMatch:l})),r=e.messages.errorConfigInvalidProperty({erroneous:o,suggestion:s}),new TypeError(r)}throw t},template:function(t){for(var e=/\${([\w]*)}/g,n={},a=null;a=e.exec(t);)n[a[1]]=new RegExp("\\${"+a[1]+"}","g");return function(e){var a="",i=t;e=e||{};for(a in n)i=i.replace(n[a],"undefined"!=typeof e[a]?e[a]:"");return i}},on:function(e,n,a,i){e&&(e.addEventListener?e.addEventListener(n,a,i):e.attachEvent&&(e["e"+n+a]=a,e[n+a]=function(){e["e"+n+a](t.event)},e.attachEvent("on"+n,e[n+a])))},off:function(t,e,n){t&&(t.removeEventListener?t.removeEventListener(e,n,!1):t.detachEvent&&(t.detachEvent("on"+e,t[e+n]),t[e+n]=null))},getCustomEvent:function(e,n,a){var i=null;return a=a||t.document,"function"==typeof t.CustomEvent?i=new t.CustomEvent(e,{detail:n,bubbles:!0,cancelable:!0}):"function"==typeof a.createEvent?(i=a.createEvent("CustomEvent"),i.initCustomEvent(e,!0,!0,n)):(i=a.createEventObject(),i.type=e,i.returnValue=!1,i.cancelBubble=!1,i.detail=n),i},getOriginalEvent:function(t){return t.touches&&t.touches.length?t.touches[0]:t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t},index:function(t,e){for(var n=0;null!==(t=t.previousElementSibling);)e&&!t.matches(e)||++n;return n},camelCase:function(t){return t.toLowerCase().replace(/([_-][a-z])/g,function(t){return t.toUpperCase().replace(/[_-]/,"")})},pascalCase:function(t){return(t=this.camelCase(t)).charAt(0).toUpperCase()+t.slice(1)},dashCase:function(t){return t.replace(/([A-Z])/g,"-$1").replace(/^-/,"").toLowerCase()},isElement:function(e,n){return n=n||t.document,!!(t.HTMLElement&&e instanceof t.HTMLElement)||(!!(n.defaultView&&n.defaultView.HTMLElement&&e instanceof n.defaultView.HTMLElement)||null!==e&&1===e.nodeType&&"string"==typeof e.nodeName)},createElement:function(e,n){var a=null,i=null;for(n=n||t.document,a=n.createDocumentFragment(),i=n.createElement("div"),i.innerHTML=e.trim();i.firstChild;)a.appendChild(i.firstChild);return a},removeWhitespace:function(t){for(var e;t&&"#text"===t.nodeName;)e=t,t=t.previousSibling,e.parentElement&&e.parentElement.removeChild(e)},isEqualArray:function(t,e){var n=t.length;if(n!==e.length)return!1;for(;n--;)if(t[n]!==e[n])return!1;return!0},deepEquals:function(t,e){var n;if("object"==typeof t&&t&&"object"==typeof e&&e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(n in t)if(!e.hasOwnProperty(n)||!this.deepEquals(t[n],e[n]))return!1}else if(t!==e)return!1;return!0},arrayShuffle:function(t){for(var e=t.slice(),n=e.length,a=n,i=-1,o=[];a--;)i=~~(Math.random()*n),o=e[a],e[a]=e[i],e[i]=o;return e},arrayFromList:function(t){var e,n;try{return Array.prototype.slice.call(t)}catch(a){for(e=[],n=0;n<t.length;n++)e.push(t[n]);return e}},debounce:function(t,e,n){var a;return function(){var i=this,o=arguments,r=n&&!a,s=null;s=function(){a=null,n||t.apply(i,o)},clearTimeout(a),a=setTimeout(s,e),r&&t.apply(i,o)}},position:function(t){for(var e=0,n=0,a=t;t;)e-=t.scrollLeft,n-=t.scrollTop,t===a&&(e+=t.offsetLeft,n+=t.offsetTop,a=t.offsetParent),t=t.parentElement;return{x:e,y:n}},getHypotenuse:function(t,e){var n=t.x-e.x,a=t.y-e.y;return n=n<0?n*-1:n,a=a<0?a*-1:a,Math.sqrt(Math.pow(n,2)+Math.pow(a,2))},getIntersectionRatio:function(t,e){var n=t.width*t.height,a=-1,i=-1,o=-1,r=-1;return a=Math.max(0,Math.min(t.left+t.width,e.left+e.width)-Math.max(t.left,e.left)),i=Math.max(0,Math.min(t.top+t.height,e.top+e.height)-Math.max(t.top,e.top)),o=i*a,r=o/n},closestParent:function(e,n,a,i){var o=e.parentNode;if(i=i||t.document,a&&e.matches(n))return e;for(;o&&o!=i.body;){if(o.matches&&o.matches(n))return o;if(!o.parentNode)return null;o=o.parentNode}return null},children:function(e,n,a){var i=[],o="";return a=a||t.doc,e&&(e.id||(o="Temp"+this.randomHexKey(),e.id=o),i=a.querySelectorAll("#"+e.id+" > "+n),o&&e.removeAttribute("id")),i},clean:function(t){var e=[],n=-1;for(n=0;n<t.length;n++)""!==t[n]&&e.push(t[n]);return e},defer:function(n){var a=null,i=null,o=null;return i=new this.Deferred,e.features.has.promises?i.promise=new Promise(function(t,e){i.resolve=t,i.reject=e}):(o=t.jQuery||n.$)&&"function"==typeof o.Deferred?(a=o.Deferred(),i.promise=a.promise(),i.resolve=a.resolve,i.reject=a.reject):t.console&&console.warn(e.messages.warningNoPromiseImplementation()),i},all:function(n,a){var i=null;return e.features.has.promises?Promise.all(n):(i=t.jQuery||a.$)&&"function"==typeof i.when?i.when.apply(i,n).done(function(){return arguments}):(t.console&&console.warn(e.messages.warningNoPromiseImplementation()),[])},getPrefix:function(t,e,a){var i=-1,o="";if(n.dashCase(e)in t.style)return"";for(i=0;o=a[i];i++)if(o+e in t.style)return o.toLowerCase();return"unsupported"},randomHex:function(){return("00000"+(16777216*Math.random()<<0).toString(16)).substr(-6).toUpperCase()},getDocumentState:function(e){return e="object"==typeof e.body?e:t.document,{scrollTop:t.pageYOffset,scrollLeft:t.pageXOffset,docHeight:e.documentElement.scrollHeight,docWidth:e.documentElement.scrollWidth,viewportHeight:e.documentElement.clientHeight,viewportWidth:e.documentElement.clientWidth}},bind:function(t,e){return function(){return e.apply(t,arguments)}},isVisible:function(e){var n=null;return!!e.offsetParent||(n=t.getComputedStyle(e),"fixed"===n.position&&"hidden"!==n.visibility&&"0"!==n.opacity)},seal:function(t){"function"==typeof Object.seal&&Object.seal(t)},freeze:function(t){"function"==typeof Object.freeze&&Object.freeze(t)},compareVersions:function(t,e){var n=t.split("."),a=e.split("."),i=-1,o=-1,r=-1;for(r=0;r<n.length;r++){if(i=parseInt(n[r].replace(/[^\d.]/g,"")),o=parseInt(a[r].replace(/[^\d.]/g,"")||0),o<i)return!1;if(o>i)return!0}return!0},Deferred:function(){this.promise=null,this.resolve=null,this.reject=null,this.id=n.randomHex()},isEmptyObject:function(t){var e="";if("function"==typeof Object.keys)return 0===Object.keys(t).length;for(e in t)if(t.hasOwnProperty(e))return!1;return!0},getClassname:function(t,e,n){var a="";return a+=t.block,a.length&&(a+=t.delineatorElement),a+=t["element"+this.pascalCase(e)],n?(a.length&&(a+=t.delineatorModifier),a+=n):a},getProperty:function(t,e){var n=e.split("."),a=null,i="",o=0;if(!e)return t;for(a=function(t){return t?t[i]:null};o<n.length;)i=n[o],t=a(t),o++;return"undefined"!=typeof t?t:null}},e.h=n,e.Base=function(){},e.Base.prototype={constructor:e.Base,callActions:function(t,e){var a=this,i=a.constructor.actions[t],o="";if(i&&!n.isEmptyObject(i))for(o in i)i[o].apply(a,e)},callFilters:function(t,e,a){var i=this,o=i.constructor.filters[t],r=e,s="";if(!o||n.isEmptyObject(o))return r;a=a||[];for(s in o)a=n.arrayFromList(a),a.unshift(r),r=o[s].apply(i,a);return r}},e.BaseStatic=function(){this.actions={},this.filters={},this.extend=function(t){n.extend(this.prototype,t)},this.registerAction=function(t,e,n){(this.actions[t]=this.actions[t]||{})[e]=n},this.registerFilter=function(t,e,n){(this.filters[t]=this.filters[t]||{})[e]=n}},e.Features=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.boxSizingPrefix="",this.transformPrefix="",this.transitionPrefix="",this.boxSizingPrefix="",this.transformProp="",this.transformRule="",this.transitionProp="",this.perspectiveProp="",this.perspectiveOriginProp="",this.has=new e.Has,this.canary=null,this.BOX_SIZING_PROP="boxSizing",this.TRANSITION_PROP="transition",this.TRANSFORM_PROP="transform",this.PERSPECTIVE_PROP="perspective",this.PERSPECTIVE_ORIGIN_PROP="perspectiveOrigin",this.VENDORS=["Webkit","moz","O","ms"],this.TWEENABLE=["opacity","width","height","marginRight","marginBottom","x","y","scale","translateX","translateY","translateZ","rotateX","rotateY","rotateZ"],this.callActions("afterConstruct")},e.BaseStatic.call(e.Features),e.Features.prototype=Object.create(e.Base.prototype),n.extend(e.Features.prototype,{constructor:e.Features,init:function(){var t=this;t.callActions("beforeInit",arguments),t.canary=document.createElement("div"),t.setPrefixes(),t.runTests(),t.callActions("beforeInit",arguments)},runTests:function(){var e=this;e.callActions("beforeRunTests",arguments),e.has.promises="function"==typeof t.Promise,e.has.transitions="unsupported"!==e.transitionPrefix,e.callActions("afterRunTests",arguments),n.freeze(e.has)},setPrefixes:function(){var t=this;t.callActions("beforeSetPrefixes",arguments),t.transitionPrefix=n.getPrefix(t.canary,"Transition",t.VENDORS),t.transformPrefix=n.getPrefix(t.canary,"Transform",t.VENDORS),t.boxSizingPrefix=n.getPrefix(t.canary,"BoxSizing",t.VENDORS),t.boxSizingProp=t.boxSizingPrefix?t.boxSizingPrefix+n.pascalCase(t.BOX_SIZING_PROP):t.BOX_SIZING_PROP,t.transitionProp=t.transitionPrefix?t.transitionPrefix+n.pascalCase(t.TRANSITION_PROP):t.TRANSITION_PROP,t.transformProp=t.transformPrefix?t.transformPrefix+n.pascalCase(t.TRANSFORM_PROP):t.TRANSFORM_PROP,t.transformRule=t.transformPrefix?"-"+t.transformPrefix+"-"+t.TRANSFORM_PROP:t.TRANSFORM_PROP,t.perspectiveProp=t.transformPrefix?t.transformPrefix+n.pascalCase(t.PERSPECTIVE_PROP):t.PERSPECTIVE_PROP,t.perspectiveOriginProp=t.transformPrefix?t.transformPrefix+n.pascalCase(t.PERSPECTIVE_ORIGIN_PROP):t.PERSPECTIVE_ORIGIN_PROP,t.callActions("afterSetPrefixes",arguments)}}),e.Has=function(){this.transitions=!1,this.promises=!1,n.seal(this)},e.features=new e.Features,e.features.init(),e.ConfigAnimation=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.enable=!0,this.effects="fade scale",this.effectsIn="",this.effectsOut="",this.duration=600,this.easing="ease",this.applyPerspective=!0,this.perspectiveDistance="3000px",this.perspectiveOrigin="50% 50%",this.queue=!0,this.queueLimit=3,this.animateResizeContainer=!0,this.animateResizeTargets=!1,this.staggerSequence=null,this.reverseOut=!1,this.nudge=!0,this.clampHeight=!0,this.clampWidth=!0,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.ConfigAnimation),e.ConfigAnimation.prototype=Object.create(e.Base.prototype),e.ConfigAnimation.prototype.constructor=e.ConfigAnimation,e.ConfigBehavior=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.liveSort=!1,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.ConfigBehavior),e.ConfigBehavior.prototype=Object.create(e.Base.prototype),e.ConfigBehavior.prototype.constructor=e.ConfigBehavior,e.ConfigCallbacks=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.onMixStart=null,this.onMixBusy=null,this.onMixEnd=null,this.onMixFail=null,this.onMixClick=null,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.ConfigCallbacks),e.ConfigCallbacks.prototype=Object.create(e.Base.prototype),e.ConfigCallbacks.prototype.constructor=e.ConfigCallbacks,e.ConfigControls=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.enable=!0,this.live=!1,this.scope="global",this.toggleLogic="or",this.toggleDefault="all",this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.ConfigControls),e.ConfigControls.prototype=Object.create(e.Base.prototype),e.ConfigControls.prototype.constructor=e.ConfigControls,e.ConfigClassNames=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.block="mixitup",this.elementContainer="container",this.elementFilter="control",this.elementSort="control",this.elementMultimix="control",this.elementToggle="control",this.modifierActive="active",this.modifierDisabled="disabled",this.modifierFailed="failed",this.delineatorElement="-",this.delineatorModifier="-",this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.ConfigClassNames),e.ConfigClassNames.prototype=Object.create(e.Base.prototype),e.ConfigClassNames.prototype.constructor=e.ConfigClassNames,e.ConfigData=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.uidKey="",this.dirtyCheck=!1,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.ConfigData),e.ConfigData.prototype=Object.create(e.Base.prototype),e.ConfigData.prototype.constructor=e.ConfigData,e.ConfigDebug=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.enable=!1,this.showWarnings=!0,this.fauxAsync=!1,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.ConfigDebug),e.ConfigDebug.prototype=Object.create(e.Base.prototype),e.ConfigDebug.prototype.constructor=e.ConfigDebug,e.ConfigLayout=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.allowNestedTargets=!0,this.containerClassName="",this.siblingBefore=null,this.siblingAfter=null,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.ConfigLayout),e.ConfigLayout.prototype=Object.create(e.Base.prototype),e.ConfigLayout.prototype.constructor=e.ConfigLayout,e.ConfigLoad=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.filter="all",this.sort="default:asc",this.dataset=null,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.ConfigLoad),e.ConfigLoad.prototype=Object.create(e.Base.prototype),e.ConfigLoad.prototype.constructor=e.ConfigLoad,e.ConfigSelectors=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.target=".mix",this.control="",this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.ConfigSelectors),e.ConfigSelectors.prototype=Object.create(e.Base.prototype),e.ConfigSelectors.prototype.constructor=e.ConfigSelectors,e.ConfigRender=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.target=null,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.ConfigRender),e.ConfigRender.prototype=Object.create(e.Base.prototype),e.ConfigRender.prototype.constructor=e.ConfigRender,e.ConfigTemplates=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.ConfigTemplates),e.ConfigTemplates.prototype=Object.create(e.Base.prototype),e.ConfigTemplates.prototype.constructor=e.ConfigTemplates,e.Config=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.animation=new e.ConfigAnimation,this.behavior=new e.ConfigBehavior,this.callbacks=new e.ConfigCallbacks,this.controls=new e.ConfigControls,this.classNames=new e.ConfigClassNames,this.data=new e.ConfigData,this.debug=new e.ConfigDebug,this.layout=new e.ConfigLayout,this.load=new e.ConfigLoad,this.selectors=new e.ConfigSelectors,this.render=new e.ConfigRender,this.templates=new e.ConfigTemplates,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.Config),e.Config.prototype=Object.create(e.Base.prototype),e.Config.prototype.constructor=e.Config,e.MixerDom=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.document=null,this.body=null,this.container=null,this.parent=null,this.targets=[],this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.MixerDom),e.MixerDom.prototype=Object.create(e.Base.prototype),e.MixerDom.prototype.constructor=e.MixerDom,e.UiClassNames=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.base="",this.active="",this.disabled="",this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.UiClassNames),e.UiClassNames.prototype=Object.create(e.Base.prototype),e.UiClassNames.prototype.constructor=e.UiClassNames,e.CommandDataset=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.dataset=null,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.CommandDataset),e.CommandDataset.prototype=Object.create(e.Base.prototype),e.CommandDataset.prototype.constructor=e.CommandDataset,e.CommandMultimix=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.filter=null,this.sort=null,this.insert=null,this.remove=null,this.changeLayout=null,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.CommandMultimix),e.CommandMultimix.prototype=Object.create(e.Base.prototype),e.CommandMultimix.prototype.constructor=e.CommandMultimix,e.CommandFilter=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.selector="",this.collection=null,this.action="show",this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.CommandFilter),e.CommandFilter.prototype=Object.create(e.Base.prototype),e.CommandFilter.prototype.constructor=e.CommandFilter,e.CommandSort=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.sortString="",this.attribute="",this.order="asc",this.collection=null,this.next=null,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.CommandSort),e.CommandSort.prototype=Object.create(e.Base.prototype),e.CommandSort.prototype.constructor=e.CommandSort,e.CommandInsert=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.index=0,this.collection=[],this.position="before",this.sibling=null,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.CommandInsert),e.CommandInsert.prototype=Object.create(e.Base.prototype),e.CommandInsert.prototype.constructor=e.CommandInsert,e.CommandRemove=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.targets=[],this.collection=[],this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.CommandRemove),e.CommandRemove.prototype=Object.create(e.Base.prototype),e.CommandRemove.prototype.constructor=e.CommandRemove,e.CommandChangeLayout=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.containerClassName="",this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.CommandChangeLayout),e.CommandChangeLayout.prototype=Object.create(e.Base.prototype),e.CommandChangeLayout.prototype.constructor=e.CommandChangeLayout,e.ControlDefinition=function(t,a,i,o){e.Base.call(this),this.callActions("beforeConstruct"),this.type=t,this.selector=a,this.live=i||!1,this.parent=o||"",this.callActions("afterConstruct"),n.freeze(this),n.seal(this)},e.BaseStatic.call(e.ControlDefinition),e.ControlDefinition.prototype=Object.create(e.Base.prototype),e.ControlDefinition.prototype.constructor=e.ControlDefinition,e.controlDefinitions=[],e.controlDefinitions.push(new e.ControlDefinition("multimix","[data-filter][data-sort]")),e.controlDefinitions.push(new e.ControlDefinition("filter","[data-filter]")),e.controlDefinitions.push(new e.ControlDefinition("sort","[data-sort]")),e.controlDefinitions.push(new e.ControlDefinition("toggle","[data-toggle]")),e.Control=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.el=null,this.selector="",this.bound=[],this.pending=-1,this.type="",this.status="inactive",this.filter="",this.sort="",this.canDisable=!1,this.handler=null,this.classNames=new e.UiClassNames,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.Control),e.Control.prototype=Object.create(e.Base.prototype),n.extend(e.Control.prototype,{constructor:e.Control,init:function(t,n,a){var i=this;if(this.callActions("beforeInit",arguments),i.el=t,i.type=n,i.selector=a,i.selector)i.status="live";else switch(i.canDisable="boolean"==typeof i.el.disable,i.type){case"filter":i.filter=i.el.getAttribute("data-filter");break;case"toggle":i.filter=i.el.getAttribute("data-toggle");break;case"sort":i.sort=i.el.getAttribute("data-sort");break;case"multimix":i.filter=i.el.getAttribute("data-filter"),i.sort=i.el.getAttribute("data-sort")}i.bindClick(),e.controls.push(i),this.callActions("afterInit",arguments)},isBound:function(t){var e=this,n=!1;return this.callActions("beforeIsBound",arguments),n=e.bound.indexOf(t)>-1,e.callFilters("afterIsBound",n,arguments)},addBinding:function(t){var e=this;this.callActions("beforeAddBinding",arguments),e.isBound()||e.bound.push(t),this.callActions("afterAddBinding",arguments)},removeBinding:function(t){var n=this,a=-1;this.callActions("beforeRemoveBinding",arguments),(a=n.bound.indexOf(t))>-1&&n.bound.splice(a,1),n.bound.length<1&&(n.unbindClick(),a=e.controls.indexOf(n),e.controls.splice(a,1),"active"===n.status&&n.renderStatus(n.el,"inactive")),this.callActions("afterRemoveBinding",arguments)},bindClick:function(){var t=this;this.callActions("beforeBindClick",arguments),t.handler=function(e){t.handleClick(e)},n.on(t.el,"click",t.handler),this.callActions("afterBindClick",arguments)},unbindClick:function(){var t=this;this.callActions("beforeUnbindClick",arguments),n.off(t.el,"click",t.handler),t.handler=null,this.callActions("afterUnbindClick",arguments)},handleClick:function(t){var a=this,i=null,o=null,r=!1,s=void 0,l={},c=null,u=[],f=-1;if(this.callActions("beforeHandleClick",arguments),this.pending=0,o=a.bound[0],i=a.selector?n.closestParent(t.target,o.config.selectors.control+a.selector,!0,o.dom.document):a.el,!i)return void a.callActions("afterHandleClick",arguments);switch(a.type){case"filter":l.filter=a.filter||i.getAttribute("data-filter");break;case"sort":l.sort=a.sort||i.getAttribute("data-sort");break;case"multimix":l.filter=a.filter||i.getAttribute("data-filter"),l.sort=a.sort||i.getAttribute("data-sort");break;case"toggle":l.filter=a.filter||i.getAttribute("data-toggle"),r="live"===a.status?n.hasClass(i,a.classNames.active):"active"===a.status}for(f=0;f<a.bound.length;f++)c=new e.CommandMultimix,n.extend(c,l),u.push(c);for(u=a.callFilters("commandsHandleClick",u,arguments),a.pending=a.bound.length,f=0;o=a.bound[f];f++)l=u[f],l&&(o.lastClicked||(o.lastClicked=i),e.events.fire("mixClick",o.dom.container,{state:o.state,instance:o,originalEvent:t,control:o.lastClicked},o.dom.document),"function"==typeof o.config.callbacks.onMixClick&&(s=o.config.callbacks.onMixClick.call(o.lastClicked,o.state,t,o),s===!1)||("toggle"===a.type?r?o.toggleOff(l.filter):o.toggleOn(l.filter):o.multimix(l)));this.callActions("afterHandleClick",arguments)},update:function(t,n){var a=this,i=new e.CommandMultimix;a.callActions("beforeUpdate",arguments),a.pending--,a.pending=Math.max(0,a.pending),a.pending>0||("live"===a.status?a.updateLive(t,n):(i.sort=a.sort,i.filter=a.filter,a.callFilters("actionsUpdate",i,arguments),a.parseStatusChange(a.el,t,i,n)),a.callActions("afterUpdate",arguments))},updateLive:function(t,n){var a=this,i=null,o=null,r=null,s=-1;if(a.callActions("beforeUpdateLive",arguments),a.el){for(i=a.el.querySelectorAll(a.selector),s=0;r=i[s];s++){switch(o=new e.CommandMultimix,a.type){case"filter":o.filter=r.getAttribute("data-filter");break;case"sort":o.sort=r.getAttribute("data-sort");break;case"multimix":o.filter=r.getAttribute("data-filter"),o.sort=r.getAttribute("data-sort");break;case"toggle":o.filter=r.getAttribute("data-toggle")}o=a.callFilters("actionsUpdateLive",o,arguments),a.parseStatusChange(r,t,o,n)}a.callActions("afterUpdateLive",arguments)}},parseStatusChange:function(t,e,n,a){var i=this,o="",r="",s=-1;switch(i.callActions("beforeParseStatusChange",arguments),i.type){case"filter":e.filter===n.filter?i.renderStatus(t,"active"):i.renderStatus(t,"inactive");break;case"multimix":e.sort===n.sort&&e.filter===n.filter?i.renderStatus(t,"active"):i.renderStatus(t,"inactive");break;case"sort":e.sort.match(/:asc/g)&&(o=e.sort.replace(/:asc/g,"")),e.sort===n.sort||o===n.sort?i.renderStatus(t,"active"):i.renderStatus(t,"inactive");break;case"toggle":for(a.length<1&&i.renderStatus(t,"inactive"),e.filter===n.filter&&i.renderStatus(t,"active"),s=0;s<a.length;s++){if(r=a[s],r===n.filter){i.renderStatus(t,"active");break}i.renderStatus(t,"inactive")}}i.callActions("afterParseStatusChange",arguments)},renderStatus:function(t,e){var a=this;switch(a.callActions("beforeRenderStatus",arguments),e){case"active":n.addClass(t,a.classNames.active),n.removeClass(t,a.classNames.disabled),a.canDisable&&(a.el.disabled=!1);break;case"inactive":n.removeClass(t,a.classNames.active),n.removeClass(t,a.classNames.disabled),a.canDisable&&(a.el.disabled=!1);break;case"disabled":a.canDisable&&(a.el.disabled=!0),n.addClass(t,a.classNames.disabled),n.removeClass(t,a.classNames.active)}"live"!==a.status&&(a.status=e),a.callActions("afterRenderStatus",arguments)}}),e.controls=[],e.StyleData=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.x=0,this.y=0,this.top=0,this.right=0,this.bottom=0,this.left=0,this.width=0,this.height=0,this.marginRight=0,this.marginBottom=0,this.opacity=0,this.scale=new e.TransformData,this.translateX=new e.TransformData,this.translateY=new e.TransformData,this.translateZ=new e.TransformData,this.rotateX=new e.TransformData,this.rotateY=new e.TransformData,this.rotateZ=new e.TransformData,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.StyleData),e.StyleData.prototype=Object.create(e.Base.prototype),e.StyleData.prototype.constructor=e.StyleData,e.TransformData=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.value=0,this.unit="",this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.TransformData),e.TransformData.prototype=Object.create(e.Base.prototype),e.TransformData.prototype.constructor=e.TransformData,e.TransformDefaults=function(){e.StyleData.apply(this),this.callActions("beforeConstruct"),this.scale.value=.01,this.scale.unit="",this.translateX.value=20,this.translateX.unit="px",this.translateY.value=20,this.translateY.unit="px",this.translateZ.value=20,this.translateZ.unit="px",this.rotateX.value=90,this.rotateX.unit="deg",this.rotateY.value=90,this.rotateY.unit="deg",this.rotateX.value=90,this.rotateX.unit="deg",this.rotateZ.value=180,this.rotateZ.unit="deg",this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.TransformDefaults),e.TransformDefaults.prototype=Object.create(e.StyleData.prototype),e.TransformDefaults.prototype.constructor=e.TransformDefaults,e.transformDefaults=new e.TransformDefaults,e.EventDetail=function(){this.state=null,this.futureState=null,this.instance=null,this.originalEvent=null},e.Events=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.mixStart=null,this.mixBusy=null,this.mixEnd=null,this.mixFail=null,this.mixClick=null,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.Events),e.Events.prototype=Object.create(e.Base.prototype),e.Events.prototype.constructor=e.Events,e.Events.prototype.fire=function(t,a,i,o){var r=this,s=null,l=new e.EventDetail;if(r.callActions("beforeFire",arguments),"undefined"==typeof r[t])throw new Error('Event type "'+t+'" not found.');l.state=new e.State,n.extend(l.state,i.state),i.futureState&&(l.futureState=new e.State,n.extend(l.futureState,i.futureState)),l.instance=i.instance,i.originalEvent&&(l.originalEvent=i.originalEvent),s=n.getCustomEvent(t,l,o),r.callFilters("eventFire",s,arguments),a.dispatchEvent(s)},e.events=new e.Events,e.QueueItem=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.args=[],this.instruction=null,this.triggerElement=null,this.deferred=null,this.isToggling=!1,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.QueueItem),e.QueueItem.prototype=Object.create(e.Base.prototype),e.QueueItem.prototype.constructor=e.QueueItem,e.Mixer=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.config=new e.Config,this.id="",this.isBusy=!1,this.isToggling=!1,this.incPadding=!0,this.controls=[],this.targets=[],this.origOrder=[],this.cache={},this.toggleArray=[],this.targetsMoved=0,this.targetsImmovable=0,this.targetsBound=0,this.targetsDone=0,this.staggerDuration=0,this.effectsIn=null,this.effectsOut=null,this.transformIn=[],this.transformOut=[],this.queue=[],this.state=null,this.lastOperation=null,
this.lastClicked=null,this.userCallback=null,this.userDeferred=null,this.dom=new e.MixerDom,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.Mixer),e.Mixer.prototype=Object.create(e.Base.prototype),n.extend(e.Mixer.prototype,{constructor:e.Mixer,attach:function(a,i,o,r){var s=this,l=null,c=-1;for(s.callActions("beforeAttach",arguments),s.id=o,r&&n.extend(s.config,r,!0,!0),s.sanitizeConfig(),s.cacheDom(a,i),s.config.layout.containerClassName&&n.addClass(s.dom.container,s.config.layout.containerClassName),e.features.has.transitions||(s.config.animation.enable=!1),"undefined"==typeof t.console&&(s.config.debug.showWarnings=!1),s.config.data.uidKey&&(s.config.controls.enable=!1),s.indexTargets(),s.state=s.getInitialState(),c=0;l=s.lastOperation.toHide[c];c++)l.hide();s.config.controls.enable&&(s.initControls(),s.buildToggleArray(null,s.state),s.updateControls({filter:s.state.activeFilter,sort:s.state.activeSort})),s.parseEffects(),s.callActions("afterAttach",arguments)},sanitizeConfig:function(){var t=this;t.callActions("beforeSanitizeConfig",arguments),t.config.controls.scope=t.config.controls.scope.toLowerCase().trim(),t.config.controls.toggleLogic=t.config.controls.toggleLogic.toLowerCase().trim(),t.config.controls.toggleDefault=t.config.controls.toggleDefault.toLowerCase().trim(),t.config.animation.effects=t.config.animation.effects.trim(),t.callActions("afterSanitizeConfig",arguments)},getInitialState:function(){var t=this,n=new e.State,a=new e.Operation;if(t.callActions("beforeGetInitialState",arguments),n.activeContainerClassName=t.config.layout.containerClassName,t.config.load.dataset){if(!t.config.data.uidKey||"string"!=typeof t.config.data.uidKey)throw new TypeError(e.messages.errorConfigDataUidKeyNotSet());a.startDataset=a.newDataset=n.activeDataset=t.config.load.dataset.slice(),a.startContainerClassName=a.newContainerClassName=n.activeContainerClassName,a.show=t.targets.slice(),n=t.callFilters("stateGetInitialState",n,arguments)}else n.activeFilter=t.parseFilterArgs([t.config.load.filter]).command,n.activeSort=t.parseSortArgs([t.config.load.sort]).command,n.totalTargets=t.targets.length,n=t.callFilters("stateGetInitialState",n,arguments),n.activeSort.collection||n.activeSort.attribute||"random"===n.activeSort.order||"desc"===n.activeSort.order?(a.newSort=n.activeSort,t.sortOperation(a),t.printSort(!1,a),t.targets=a.newOrder):a.startOrder=a.newOrder=t.targets,a.startFilter=a.newFilter=n.activeFilter,a.startSort=a.newSort=n.activeSort,a.startContainerClassName=a.newContainerClassName=n.activeContainerClassName,"all"===a.newFilter.selector?a.newFilter.selector=t.config.selectors.target:"none"===a.newFilter.selector&&(a.newFilter.selector="");return a=t.callFilters("operationGetInitialState",a,[n]),t.lastOperation=a,a.newFilter&&t.filterOperation(a),n=t.buildState(a)},cacheDom:function(t,e){var n=this;n.callActions("beforeCacheDom",arguments),n.dom.document=e,n.dom.body=n.dom.document.querySelector("body"),n.dom.container=t,n.dom.parent=t,n.callActions("afterCacheDom",arguments)},indexTargets:function(){var t=this,a=null,i=null,o=null,r=-1;if(t.callActions("beforeIndexTargets",arguments),t.dom.targets=t.config.layout.allowNestedTargets?t.dom.container.querySelectorAll(t.config.selectors.target):n.children(t.dom.container,t.config.selectors.target,t.dom.document),t.dom.targets=n.arrayFromList(t.dom.targets),t.targets=[],(o=t.config.load.dataset)&&o.length!==t.dom.targets.length)throw new Error(e.messages.errorDatasetPrerenderedMismatch());if(t.dom.targets.length){for(r=0;i=t.dom.targets[r];r++)a=new e.Target,a.init(i,t,o?o[r]:void 0),a.isInDom=!0,t.targets.push(a);t.dom.parent=t.dom.targets[0].parentElement===t.dom.container?t.dom.container:t.dom.targets[0].parentElement}t.origOrder=t.targets,t.callActions("afterIndexTargets",arguments)},initControls:function(){var t=this,n="",a=null,i=null,o=null,r=null,s=null,l=-1,c=-1;switch(t.callActions("beforeInitControls",arguments),t.config.controls.scope){case"local":o=t.dom.container;break;case"global":o=t.dom.document;break;default:throw new Error(e.messages.errorConfigInvalidControlsScope())}for(l=0;n=e.controlDefinitions[l];l++)if(t.config.controls.live||n.live){if(n.parent){if(r=t.dom[n.parent],!r||r.length<0)continue;"number"!=typeof r.length&&(r=[r])}else r=[o];for(c=0;i=r[c];c++)s=t.getControl(i,n.type,n.selector),t.controls.push(s)}else for(a=o.querySelectorAll(t.config.selectors.control+n.selector),c=0;i=a[c];c++)s=t.getControl(i,n.type,""),s&&t.controls.push(s);t.callActions("afterInitControls",arguments)},getControl:function(t,a,i){var o=this,r=null,s=-1;if(o.callActions("beforeGetControl",arguments),!i)for(s=0;r=e.controls[s];s++){if(r.el===t&&r.isBound(o))return o.callFilters("controlGetControl",null,arguments);if(r.el===t&&r.type===a&&r.selector===i)return r.addBinding(o),o.callFilters("controlGetControl",r,arguments)}return r=new e.Control,r.init(t,a,i),r.classNames.base=n.getClassname(o.config.classNames,a),r.classNames.active=n.getClassname(o.config.classNames,a,o.config.classNames.modifierActive),r.classNames.disabled=n.getClassname(o.config.classNames,a,o.config.classNames.modifierDisabled),r.addBinding(o),o.callFilters("controlGetControl",r,arguments)},getToggleSelector:function(){var t=this,e="or"===t.config.controls.toggleLogic?", ":"",a="";return t.callActions("beforeGetToggleSelector",arguments),t.toggleArray=n.clean(t.toggleArray),a=t.toggleArray.join(e),""===a&&(a=t.config.controls.toggleDefault),t.callFilters("selectorGetToggleSelector",a,arguments)},buildToggleArray:function(t,e){var a=this,i="";if(a.callActions("beforeBuildToggleArray",arguments),t&&t.filter)i=t.filter.selector.replace(/\s/g,"");else{if(!e)return;i=e.activeFilter.selector.replace(/\s/g,"")}i!==a.config.selectors.target&&"all"!==i||(i=""),"or"===a.config.controls.toggleLogic?a.toggleArray=i.split(","):a.toggleArray=a.splitCompoundSelector(i),a.toggleArray=n.clean(a.toggleArray),a.callActions("afterBuildToggleArray",arguments)},splitCompoundSelector:function(t){var e=t.split(/([\.\[])/g),n=[],a="",i=-1;for(""===e[0]&&e.shift(),i=0;i<e.length;i++)i%2===0&&(a=""),a+=e[i],i%2!==0&&n.push(a);return n},updateControls:function(t){var a=this,i=null,o=new e.CommandMultimix,r=-1;for(a.callActions("beforeUpdateControls",arguments),t.filter?o.filter=t.filter.selector:o.filter=a.state.activeFilter.selector,t.sort?o.sort=a.buildSortString(t.sort):o.sort=a.buildSortString(a.state.activeSort),o.filter===a.config.selectors.target&&(o.filter="all"),""===o.filter&&(o.filter="none"),n.freeze(o),r=0;i=a.controls[r];r++)i.update(o,a.toggleArray);a.callActions("afterUpdateControls",arguments)},buildSortString:function(t){var e=this,n="";return n+=t.sortString,t.next&&(n+=" "+e.buildSortString(t.next)),n},insertTargets:function(t,a){var i=this,o=null,r=-1,s=null,l=null,c=null,u=-1;if(i.callActions("beforeInsertTargets",arguments),"undefined"==typeof t.index&&(t.index=0),o=i.getNextSibling(t.index,t.sibling,t.position),s=i.dom.document.createDocumentFragment(),r=o?n.index(o,i.config.selectors.target):i.targets.length,t.collection){for(u=0;c=t.collection[u];u++){if(i.dom.targets.indexOf(c)>-1)throw new Error(e.messages.errorInsertPreexistingElement());c.style.display="none",s.appendChild(c),s.appendChild(i.dom.document.createTextNode(" ")),n.isElement(c,i.dom.document)&&c.matches(i.config.selectors.target)&&(l=new e.Target,l.init(c,i),l.isInDom=!0,i.targets.splice(r,0,l),r++)}i.dom.parent.insertBefore(s,o)}a.startOrder=i.origOrder=i.targets,i.callActions("afterInsertTargets",arguments)},getNextSibling:function(t,e,n){var a=this,i=null;return t=Math.max(t,0),e&&"before"===n?i=e:e&&"after"===n?i=e.nextElementSibling||null:a.targets.length>0&&"undefined"!=typeof t?i=t<a.targets.length||!a.targets.length?a.targets[t].dom.el:a.targets[a.targets.length-1].dom.el.nextElementSibling:0===a.targets.length&&a.dom.parent.children.length>0&&(a.config.layout.siblingAfter?i=a.config.layout.siblingAfter:a.config.layout.siblingBefore?i=a.config.layout.siblingBefore.nextElementSibling:a.dom.parent.children[0]),a.callFilters("elementGetNextSibling",i,arguments)},filterOperation:function(t){var e=this,n=!1,a=-1,i="",o=null,r=-1;for(e.callActions("beforeFilterOperation",arguments),i=t.newFilter.action,r=0;o=t.newOrder[r];r++)n=t.newFilter.collection?t.newFilter.collection.indexOf(o.dom.el)>-1:""!==t.newFilter.selector&&o.dom.el.matches(t.newFilter.selector),e.evaluateHideShow(n,o,i,t);if(t.toRemove.length)for(r=0;o=t.show[r];r++)t.toRemove.indexOf(o)>-1&&(t.show.splice(r,1),(a=t.toShow.indexOf(o))>-1&&t.toShow.splice(a,1),t.toHide.push(o),t.hide.push(o),r--);t.matching=t.show.slice(),0===t.show.length&&""!==t.newFilter.selector&&0!==e.targets.length&&(t.hasFailed=!0),e.callActions("afterFilterOperation",arguments)},evaluateHideShow:function(t,e,n,a){var i=this;i.callActions("beforeEvaluateHideShow",arguments),t===!0&&"show"===n||t===!1&&"hide"===n?(a.show.push(e),!e.isShown&&a.toShow.push(e)):(a.hide.push(e),e.isShown&&a.toHide.push(e)),i.callActions("afterEvaluateHideShow",arguments)},sortOperation:function(t){var e=this;e.callActions("beforeSortOperation",arguments),t.startOrder=e.targets,t.newSort.collection?t.newOrder=t.newSort.collection:"random"===t.newSort.order?t.newOrder=n.arrayShuffle(t.startOrder):""===t.newSort.attribute?(t.newOrder=e.origOrder.slice(),"desc"===t.newSort.order&&t.newOrder.reverse()):(t.newOrder=t.startOrder.slice(),t.newOrder.sort(function(n,a){return e.compare(n,a,t.newSort)})),n.isEqualArray(t.newOrder,t.startOrder)&&(t.willSort=!1),e.callActions("afterSortOperation",arguments)},compare:function(t,e,n){var a=this,i=n.order,o=a.getAttributeValue(t,n.attribute),r=a.getAttributeValue(e,n.attribute);return isNaN(1*o)||isNaN(1*r)?(o=o.toLowerCase(),r=r.toLowerCase()):(o=1*o,r=1*r),o<r?"asc"===i?-1:1:o>r?"asc"===i?1:-1:o===r&&n.next?a.compare(t,e,n.next):0},getAttributeValue:function(t,n){var a=this,i="";return i=t.dom.el.getAttribute("data-"+n),null===i&&a.config.debug.showWarnings&&console.warn(e.messages.warningInconsistentSortingAttributes({attribute:"data-"+n})),a.callFilters("valueGetAttributeValue",i||0,arguments)},printSort:function(e,a){var i=this,o=e?a.newOrder:a.startOrder,r=e?a.startOrder:a.newOrder,s=o.length?o[o.length-1].dom.el.nextElementSibling:null,l=t.document.createDocumentFragment(),c=null,u=null,f=null,h=-1;for(i.callActions("beforePrintSort",arguments),h=0;u=o[h];h++)f=u.dom.el,"absolute"!==f.style.position&&(n.removeWhitespace(f.previousSibling),f.parentElement.removeChild(f));for(c=s?s.previousSibling:i.dom.parent.lastChild,c&&"#text"===c.nodeName&&n.removeWhitespace(c),h=0;u=r[h];h++)f=u.dom.el,n.isElement(l.lastChild)&&l.appendChild(t.document.createTextNode(" ")),l.appendChild(f);i.dom.parent.firstChild&&i.dom.parent.firstChild!==s&&l.insertBefore(t.document.createTextNode(" "),l.childNodes[0]),s?(l.appendChild(t.document.createTextNode(" ")),i.dom.parent.insertBefore(l,s)):i.dom.parent.appendChild(l),i.callActions("afterPrintSort",arguments)},parseSortString:function(t,a){var i=this,o=t.split(" "),r=a,s=[],l=-1;for(l=0;l<o.length;l++){switch(s=o[l].split(":"),r.sortString=o[l],r.attribute=n.dashCase(s[0]),r.order=s[1]||"asc",r.attribute){case"default":r.attribute="";break;case"random":r.attribute="",r.order="random"}if(!r.attribute||"random"===r.order)break;l<o.length-1&&(r.next=new e.CommandSort,n.freeze(r),r=r.next)}return i.callFilters("commandsParseSort",a,arguments)},parseEffects:function(){var t=this,n="",a=t.config.animation.effectsIn||t.config.animation.effects,i=t.config.animation.effectsOut||t.config.animation.effects;t.callActions("beforeParseEffects",arguments),t.effectsIn=new e.StyleData,t.effectsOut=new e.StyleData,t.transformIn=[],t.transformOut=[],t.effectsIn.opacity=t.effectsOut.opacity=1,t.parseEffect("fade",a,t.effectsIn,t.transformIn),t.parseEffect("fade",i,t.effectsOut,t.transformOut,!0);for(n in e.transformDefaults)e.transformDefaults[n]instanceof e.TransformData&&(t.parseEffect(n,a,t.effectsIn,t.transformIn),t.parseEffect(n,i,t.effectsOut,t.transformOut,!0));t.parseEffect("stagger",a,t.effectsIn,t.transformIn),t.parseEffect("stagger",i,t.effectsOut,t.transformOut,!0),t.callActions("afterParseEffects",arguments)},parseEffect:function(t,n,a,i,o){var r=this,s=/\(([^)]+)\)/,l=-1,c="",u=[],f="",h=["%","px","em","rem","vh","vw","deg"],d="",m=-1;if(r.callActions("beforeParseEffect",arguments),"string"!=typeof n)throw new TypeError(e.messages.errorConfigInvalidAnimationEffects());if(n.indexOf(t)<0)return void("stagger"===t&&(r.staggerDuration=0));switch(l=n.indexOf(t+"("),l>-1&&(c=n.substring(l),u=s.exec(c),f=u[1]),t){case"fade":a.opacity=f?parseFloat(f):0;break;case"stagger":r.staggerDuration=f?parseFloat(f):100;break;default:if(o&&r.config.animation.reverseOut&&"scale"!==t?a[t].value=(f?parseFloat(f):e.transformDefaults[t].value)*-1:a[t].value=f?parseFloat(f):e.transformDefaults[t].value,f){for(m=0;d=h[m];m++)if(f.indexOf(d)>-1){a[t].unit=d;break}}else a[t].unit=e.transformDefaults[t].unit;i.push(t+"("+a[t].value+a[t].unit+")")}r.callActions("afterParseEffect",arguments)},buildState:function(t){var n=this,a=new e.State,i=null,o=-1;for(n.callActions("beforeBuildState",arguments),o=0;i=n.targets[o];o++)(!t.toRemove.length||t.toRemove.indexOf(i)<0)&&a.targets.push(i.dom.el);for(o=0;i=t.matching[o];o++)a.matching.push(i.dom.el);for(o=0;i=t.show[o];o++)a.show.push(i.dom.el);for(o=0;i=t.hide[o];o++)(!t.toRemove.length||t.toRemove.indexOf(i)<0)&&a.hide.push(i.dom.el);return a.id=n.id,a.container=n.dom.container,a.activeFilter=t.newFilter,a.activeSort=t.newSort,a.activeDataset=t.newDataset,a.activeContainerClassName=t.newContainerClassName,a.hasFailed=t.hasFailed,a.totalTargets=n.targets.length,a.totalShow=t.show.length,a.totalHide=t.hide.length,a.totalMatching=t.matching.length,a.triggerElement=t.triggerElement,n.callFilters("stateBuildState",a,arguments)},goMix:function(a,i){var o=this,r=null;return o.callActions("beforeGoMix",arguments),o.config.animation.duration&&o.config.animation.effects&&n.isVisible(o.dom.container)||(a=!1),i.toShow.length||i.toHide.length||i.willSort||i.willChangeLayout||(a=!1),i.startState.show.length||i.show.length||(a=!1),e.events.fire("mixStart",o.dom.container,{state:i.startState,futureState:i.newState,instance:o},o.dom.document),"function"==typeof o.config.callbacks.onMixStart&&o.config.callbacks.onMixStart.call(o.dom.container,i.startState,i.newState,o),n.removeClass(o.dom.container,n.getClassname(o.config.classNames,"container",o.config.classNames.modifierFailed)),r=o.userDeferred?o.userDeferred:o.userDeferred=n.defer(e.libraries),o.isBusy=!0,a&&e.features.has.transitions?(t.pageYOffset!==i.docState.scrollTop&&t.scrollTo(i.docState.scrollLeft,i.docState.scrollTop),o.config.animation.applyPerspective&&(o.dom.parent.style[e.features.perspectiveProp]=o.config.animation.perspectiveDistance,o.dom.parent.style[e.features.perspectiveOriginProp]=o.config.animation.perspectiveOrigin),o.config.animation.animateResizeContainer&&i.startHeight!==i.newHeight&&i.viewportDeltaY!==i.startHeight-i.newHeight&&(o.dom.parent.style.height=i.startHeight+"px"),o.config.animation.animateResizeContainer&&i.startWidth!==i.newWidth&&i.viewportDeltaX!==i.startWidth-i.newWidth&&(o.dom.parent.style.width=i.startWidth+"px"),i.startHeight===i.newHeight&&(o.dom.parent.style.height=i.startHeight+"px"),i.startWidth===i.newWidth&&(o.dom.parent.style.width=i.startWidth+"px"),i.startHeight===i.newHeight&&i.startWidth===i.newWidth&&(o.dom.parent.style.overflow="hidden"),requestAnimationFrame(function(){o.moveTargets(i)}),o.callFilters("promiseGoMix",r.promise,arguments)):(o.config.debug.fauxAsync?setTimeout(function(){o.cleanUp(i)},o.config.animation.duration):o.cleanUp(i),o.callFilters("promiseGoMix",r.promise,arguments))},getStartMixData:function(n){var a=this,i=t.getComputedStyle(a.dom.parent),o=a.dom.parent.getBoundingClientRect(),r=null,s={},l=-1,c=i[e.features.boxSizingProp];for(a.incPadding="border-box"===c,a.callActions("beforeGetStartMixData",arguments),l=0;r=n.show[l];l++)s=r.getPosData(),n.showPosData[l]={startPosData:s};for(l=0;r=n.toHide[l];l++)s=r.getPosData(),n.toHidePosData[l]={startPosData:s};n.startX=o.left,n.startY=o.top,n.startHeight=a.incPadding?o.height:o.height-parseFloat(i.paddingTop)-parseFloat(i.paddingBottom)-parseFloat(i.borderTop)-parseFloat(i.borderBottom),n.startWidth=a.incPadding?o.width:o.width-parseFloat(i.paddingLeft)-parseFloat(i.paddingRight)-parseFloat(i.borderLeft)-parseFloat(i.borderRight),a.callActions("afterGetStartMixData",arguments)},setInter:function(t){var e=this,a=null,i=-1;for(e.callActions("beforeSetInter",arguments),e.config.animation.clampHeight&&(e.dom.parent.style.height=t.startHeight+"px",e.dom.parent.style.overflow="hidden"),e.config.animation.clampWidth&&(e.dom.parent.style.width=t.startWidth+"px",e.dom.parent.style.overflow="hidden"),i=0;a=t.toShow[i];i++)a.show();t.willChangeLayout&&(n.removeClass(e.dom.container,t.startContainerClassName),n.addClass(e.dom.container,t.newContainerClassName)),e.callActions("afterSetInter",arguments)},getInterMixData:function(t){var e=this,n=null,a=-1;for(e.callActions("beforeGetInterMixData",arguments),a=0;n=t.show[a];a++)t.showPosData[a].interPosData=n.getPosData();for(a=0;n=t.toHide[a];a++)t.toHidePosData[a].interPosData=n.getPosData();e.callActions("afterGetInterMixData",arguments)},setFinal:function(t){var e=this,n=null,a=-1;for(e.callActions("beforeSetFinal",arguments),t.willSort&&e.printSort(!1,t),a=0;n=t.toHide[a];a++)n.hide();e.callActions("afterSetFinal",arguments)},getFinalMixData:function(e){var a=this,i=null,o=null,r=null,s=-1;for(a.callActions("beforeGetFinalMixData",arguments),s=0;r=e.show[s];s++)e.showPosData[s].finalPosData=r.getPosData();for(s=0;r=e.toHide[s];s++)e.toHidePosData[s].finalPosData=r.getPosData();for((a.config.animation.clampHeight||a.config.animation.clampWidth)&&(a.dom.parent.style.height=a.dom.parent.style.width=a.dom.parent.style.overflow=""),a.incPadding||(i=t.getComputedStyle(a.dom.parent)),o=a.dom.parent.getBoundingClientRect(),e.newX=o.left,e.newY=o.top,e.newHeight=a.incPadding?o.height:o.height-parseFloat(i.paddingTop)-parseFloat(i.paddingBottom)-parseFloat(i.borderTop)-parseFloat(i.borderBottom),e.newWidth=a.incPadding?o.width:o.width-parseFloat(i.paddingLeft)-parseFloat(i.paddingRight)-parseFloat(i.borderLeft)-parseFloat(i.borderRight),e.viewportDeltaX=e.docState.viewportWidth-this.dom.document.documentElement.clientWidth,e.viewportDeltaY=e.docState.viewportHeight-this.dom.document.documentElement.clientHeight,e.willSort&&a.printSort(!0,e),s=0;r=e.toShow[s];s++)r.hide();for(s=0;r=e.toHide[s];s++)r.show();e.willChangeLayout&&(n.removeClass(a.dom.container,e.newContainerClassName),n.addClass(a.dom.container,a.config.layout.containerClassName)),a.callActions("afterGetFinalMixData",arguments)},getTweenData:function(t){var n=this,a=null,i=null,o=Object.getOwnPropertyNames(n.effectsIn),r="",s=null,l=-1,c=-1,u=-1,f=-1;for(n.callActions("beforeGetTweenData",arguments),u=0;a=t.show[u];u++)for(i=t.showPosData[u],i.posIn=new e.StyleData,i.posOut=new e.StyleData,i.tweenData=new e.StyleData,a.isShown?(i.posIn.x=i.startPosData.x-i.interPosData.x,i.posIn.y=i.startPosData.y-i.interPosData.y):i.posIn.x=i.posIn.y=0,i.posOut.x=i.finalPosData.x-i.interPosData.x,i.posOut.y=i.finalPosData.y-i.interPosData.y,i.posIn.opacity=a.isShown?1:n.effectsIn.opacity,i.posOut.opacity=1,i.tweenData.opacity=i.posOut.opacity-i.posIn.opacity,a.isShown||n.config.animation.nudge||(i.posIn.x=i.posOut.x,i.posIn.y=i.posOut.y),i.tweenData.x=i.posOut.x-i.posIn.x,i.tweenData.y=i.posOut.y-i.posIn.y,n.config.animation.animateResizeTargets&&(i.posIn.width=i.startPosData.width,i.posIn.height=i.startPosData.height,l=(i.startPosData.width||i.finalPosData.width)-i.interPosData.width,i.posIn.marginRight=i.startPosData.marginRight-l,c=(i.startPosData.height||i.finalPosData.height)-i.interPosData.height,i.posIn.marginBottom=i.startPosData.marginBottom-c,i.posOut.width=i.finalPosData.width,i.posOut.height=i.finalPosData.height,l=(i.finalPosData.width||i.startPosData.width)-i.interPosData.width,i.posOut.marginRight=i.finalPosData.marginRight-l,c=(i.finalPosData.height||i.startPosData.height)-i.interPosData.height,i.posOut.marginBottom=i.finalPosData.marginBottom-c,i.tweenData.width=i.posOut.width-i.posIn.width,i.tweenData.height=i.posOut.height-i.posIn.height,i.tweenData.marginRight=i.posOut.marginRight-i.posIn.marginRight,i.tweenData.marginBottom=i.posOut.marginBottom-i.posIn.marginBottom),f=0;r=o[f];f++)s=n.effectsIn[r],s instanceof e.TransformData&&s.value&&(i.posIn[r].value=s.value,i.posOut[r].value=0,i.tweenData[r].value=i.posOut[r].value-i.posIn[r].value,i.posIn[r].unit=i.posOut[r].unit=i.tweenData[r].unit=s.unit);for(u=0;a=t.toHide[u];u++)for(i=t.toHidePosData[u],i.posIn=new e.StyleData,i.posOut=new e.StyleData,i.tweenData=new e.StyleData,i.posIn.x=a.isShown?i.startPosData.x-i.interPosData.x:0,i.posIn.y=a.isShown?i.startPosData.y-i.interPosData.y:0,i.posOut.x=n.config.animation.nudge?0:i.posIn.x,i.posOut.y=n.config.animation.nudge?0:i.posIn.y,i.tweenData.x=i.posOut.x-i.posIn.x,i.tweenData.y=i.posOut.y-i.posIn.y,n.config.animation.animateResizeTargets&&(i.posIn.width=i.startPosData.width,i.posIn.height=i.startPosData.height,l=i.startPosData.width-i.interPosData.width,i.posIn.marginRight=i.startPosData.marginRight-l,c=i.startPosData.height-i.interPosData.height,i.posIn.marginBottom=i.startPosData.marginBottom-c),i.posIn.opacity=1,i.posOut.opacity=n.effectsOut.opacity,i.tweenData.opacity=i.posOut.opacity-i.posIn.opacity,f=0;r=o[f];f++)s=n.effectsOut[r],s instanceof e.TransformData&&s.value&&(i.posIn[r].value=0,i.posOut[r].value=s.value,i.tweenData[r].value=i.posOut[r].value-i.posIn[r].value,i.posIn[r].unit=i.posOut[r].unit=i.tweenData[r].unit=s.unit);n.callActions("afterGetTweenData",arguments)},moveTargets:function(t){var a=this,i=null,o=null,r=null,s="",l=!1,c=-1,u=-1,f=a.checkProgress.bind(a);for(a.callActions("beforeMoveTargets",arguments),u=0;i=t.show[u];u++)o=new e.IMoveData,r=t.showPosData[u],s=i.isShown?"none":"show",l=a.willTransition(s,t.hasEffect,r.posIn,r.posOut),l&&c++,i.show(),o.posIn=r.posIn,o.posOut=r.posOut,o.statusChange=s,o.staggerIndex=c,o.operation=t,o.callback=l?f:null,i.move(o);for(u=0;i=t.toHide[u];u++)r=t.toHidePosData[u],o=new e.IMoveData,s="hide",l=a.willTransition(s,r.posIn,r.posOut),o.posIn=r.posIn,o.posOut=r.posOut,o.statusChange=s,o.staggerIndex=u,o.operation=t,o.callback=l?f:null,i.move(o);a.config.animation.animateResizeContainer&&(a.dom.parent.style[e.features.transitionProp]="height "+a.config.animation.duration+"ms ease, width "+a.config.animation.duration+"ms ease ",requestAnimationFrame(function(){t.startHeight!==t.newHeight&&t.viewportDeltaY!==t.startHeight-t.newHeight&&(a.dom.parent.style.height=t.newHeight+"px"),t.startWidth!==t.newWidth&&t.viewportDeltaX!==t.startWidth-t.newWidth&&(a.dom.parent.style.width=t.newWidth+"px")})),t.willChangeLayout&&(n.removeClass(a.dom.container,a.config.layout.ContainerClassName),n.addClass(a.dom.container,t.newContainerClassName)),a.callActions("afterMoveTargets",arguments)},hasEffect:function(){var t=this,e=["scale","translateX","translateY","translateZ","rotateX","rotateY","rotateZ"],n="",a=null,i=!1,o=-1,r=-1;if(1!==t.effectsIn.opacity)return t.callFilters("resultHasEffect",!0,arguments);for(r=0;n=e[r];r++)if(a=t.effectsIn[n],o="undefined"!==a.value?a.value:a,0!==o){i=!0;break}return t.callFilters("resultHasEffect",i,arguments)},willTransition:function(t,e,a,i){var o=this,r=!1;return r=!!n.isVisible(o.dom.container)&&(!!("none"!==t&&e||a.x!==i.x||a.y!==i.y)||!!o.config.animation.animateResizeTargets&&(a.width!==i.width||a.height!==i.height||a.marginRight!==i.marginRight||a.marginTop!==i.marginTop)),o.callFilters("resultWillTransition",r,arguments)},checkProgress:function(t){var e=this;e.targetsDone++,e.targetsBound===e.targetsDone&&e.cleanUp(t)},cleanUp:function(t){var a=this,i=null,o=null,r=null,s=null,l=-1;for(a.callActions("beforeCleanUp",arguments),a.targetsMoved=a.targetsImmovable=a.targetsBound=a.targetsDone=0,l=0;i=t.show[l];l++)i.cleanUp(),i.show();for(l=0;i=t.toHide[l];l++)i.cleanUp(),i.hide();if(t.willSort&&a.printSort(!1,t),a.dom.parent.style[e.features.transitionProp]=a.dom.parent.style.height=a.dom.parent.style.width=a.dom.parent.style.overflow=a.dom.parent.style[e.features.perspectiveProp]=a.dom.parent.style[e.features.perspectiveOriginProp]="",t.willChangeLayout&&(n.removeClass(a.dom.container,t.startContainerClassName),n.addClass(a.dom.container,t.newContainerClassName)),t.toRemove.length){for(l=0;i=a.targets[l];l++)t.toRemove.indexOf(i)>-1&&((o=i.dom.el.previousSibling)&&"#text"===o.nodeName&&(r=i.dom.el.nextSibling)&&"#text"===r.nodeName&&n.removeWhitespace(o),t.willSort||a.dom.parent.removeChild(i.dom.el),a.targets.splice(l,1),i.isInDom=!1,l--);a.origOrder=a.targets}t.willSort&&(a.targets=t.newOrder),a.state=t.newState,a.lastOperation=t,a.dom.targets=a.state.targets,e.events.fire("mixEnd",a.dom.container,{state:a.state,instance:a},a.dom.document),"function"==typeof a.config.callbacks.onMixEnd&&a.config.callbacks.onMixEnd.call(a.dom.container,a.state,a),t.hasFailed&&(e.events.fire("mixFail",a.dom.container,{state:a.state,instance:a},a.dom.document),"function"==typeof a.config.callbacks.onMixFail&&a.config.callbacks.onMixFail.call(a.dom.container,a.state,a),n.addClass(a.dom.container,n.getClassname(a.config.classNames,"container",a.config.classNames.modifierFailed))),"function"==typeof a.userCallback&&a.userCallback.call(a.dom.container,a.state,a),"function"==typeof a.userDeferred.resolve&&a.userDeferred.resolve(a.state),a.userCallback=null,a.userDeferred=null,a.lastClicked=null,a.isToggling=!1,a.isBusy=!1,a.queue.length&&(a.callActions("beforeReadQueueCleanUp",arguments),s=a.queue.shift(),a.userDeferred=s.deferred,a.isToggling=s.isToggling,a.lastClicked=s.triggerElement,s.instruction.command instanceof e.CommandMultimix?a.multimix.apply(a,s.args):a.dataset.apply(a,s.args)),a.callActions("afterCleanUp",arguments)},parseMultimixArgs:function(t){var a=this,i=new e.UserInstruction,o=null,r=-1;for(i.animate=a.config.animation.enable,i.command=new e.CommandMultimix,r=0;r<t.length;r++)o=t[r],null!==o&&("object"==typeof o?n.extend(i.command,o):"boolean"==typeof o?i.animate=o:"function"==typeof o&&(i.callback=o));return!i.command.insert||i.command.insert instanceof e.CommandInsert||(i.command.insert=a.parseInsertArgs([i.command.insert]).command),!i.command.remove||i.command.remove instanceof e.CommandRemove||(i.command.remove=a.parseRemoveArgs([i.command.remove]).command),!i.command.filter||i.command.filter instanceof e.CommandFilter||(i.command.filter=a.parseFilterArgs([i.command.filter]).command),!i.command.sort||i.command.sort instanceof e.CommandSort||(i.command.sort=a.parseSortArgs([i.command.sort]).command),!i.command.changeLayout||i.command.changeLayout instanceof e.CommandChangeLayout||(i.command.changeLayout=a.parseChangeLayoutArgs([i.command.changeLayout]).command),i=a.callFilters("instructionParseMultimixArgs",i,arguments),n.freeze(i),i},parseFilterArgs:function(t){var a=this,i=new e.UserInstruction,o=null,r=-1;for(i.animate=a.config.animation.enable,i.command=new e.CommandFilter,r=0;r<t.length;r++)o=t[r],"string"==typeof o?i.command.selector=o:null===o?i.command.collection=[]:"object"==typeof o&&n.isElement(o,a.dom.document)?i.command.collection=[o]:"object"==typeof o&&"undefined"!=typeof o.length?i.command.collection=n.arrayFromList(o):"object"==typeof o?n.extend(i.command,o):"boolean"==typeof o?i.animate=o:"function"==typeof o&&(i.callback=o);if(i.command.selector&&i.command.collection)throw new Error(e.messages.errorFilterInvalidArguments());return i=a.callFilters("instructionParseFilterArgs",i,arguments),n.freeze(i),i},parseSortArgs:function(t){var a=this,i=new e.UserInstruction,o=null,r="",s=-1;for(i.animate=a.config.animation.enable,i.command=new e.CommandSort,s=0;s<t.length;s++)if(o=t[s],null!==o)switch(typeof o){case"string":r=o;break;case"object":o.length&&(i.command.collection=n.arrayFromList(o));break;case"boolean":i.animate=o;break;case"function":i.callback=o}return r&&(i.command=a.parseSortString(r,i.command)),i=a.callFilters("instructionParseSortArgs",i,arguments),n.freeze(i),i},parseInsertArgs:function(t){var a=this,i=new e.UserInstruction,o=null,r=-1;for(i.animate=a.config.animation.enable,i.command=new e.CommandInsert,r=0;r<t.length;r++)o=t[r],null!==o&&("number"==typeof o?i.command.index=o:"string"==typeof o&&["before","after"].indexOf(o)>-1?i.command.position=o:"string"==typeof o?i.command.collection=n.arrayFromList(n.createElement(o).childNodes):"object"==typeof o&&n.isElement(o,a.dom.document)?i.command.collection.length?i.command.sibling=o:i.command.collection=[o]:"object"==typeof o&&o.length?i.command.collection.length?i.command.sibling=o[0]:i.command.collection=o:"object"==typeof o&&o.childNodes&&o.childNodes.length?i.command.collection.length?i.command.sibling=o.childNodes[0]:i.command.collection=n.arrayFromList(o.childNodes):"object"==typeof o?n.extend(i.command,o):"boolean"==typeof o?i.animate=o:"function"==typeof o&&(i.callback=o));if(i.command.index&&i.command.sibling)throw new Error(e.messages.errorInsertInvalidArguments());return!i.command.collection.length&&a.config.debug.showWarnings&&console.warn(e.messages.warningInsertNoElements()),i=a.callFilters("instructionParseInsertArgs",i,arguments),n.freeze(i),i},parseRemoveArgs:function(t){var a=this,i=new e.UserInstruction,o=null,r=null,s=-1;for(i.animate=a.config.animation.enable,i.command=new e.CommandRemove,s=0;s<t.length;s++)if(r=t[s],null!==r)switch(typeof r){case"number":a.targets[r]&&(i.command.targets[0]=a.targets[r]);break;case"string":i.command.collection=n.arrayFromList(a.dom.parent.querySelectorAll(r));break;case"object":r&&r.length?i.command.collection=r:n.isElement(r,a.dom.document)?i.command.collection=[r]:n.extend(i.command,r);break;case"boolean":i.animate=r;break;case"function":i.callback=r}if(i.command.collection.length)for(s=0;o=a.targets[s];s++)i.command.collection.indexOf(o.dom.el)>-1&&i.command.targets.push(o);return!i.command.targets.length&&a.config.debug.showWarnings&&console.warn(e.messages.warningRemoveNoElements()),n.freeze(i),i},parseDatasetArgs:function(t){var a=this,i=new e.UserInstruction,o=null,r=-1;for(i.animate=a.config.animation.enable,i.command=new e.CommandDataset,r=0;r<t.length;r++)if(o=t[r],null!==o)switch(typeof o){case"object":Array.isArray(o)||"number"==typeof o.length?i.command.dataset=o:n.extend(i.command,o);break;case"boolean":i.animate=o;break;case"function":i.callback=o}return n.freeze(i),i},parseChangeLayoutArgs:function(t){var a=this,i=new e.UserInstruction,o=null,r=-1;for(i.animate=a.config.animation.enable,i.command=new e.CommandChangeLayout,r=0;r<t.length;r++)if(o=t[r],null!==o)switch(typeof o){case"string":i.command.containerClassName=o;break;case"object":n.extend(i.command,o);break;case"boolean":i.animate=o;break;case"function":i.callback=o}return n.freeze(i),i},queueMix:function(t){var a=this,i=null,o="";return a.callActions("beforeQueueMix",arguments),i=n.defer(e.libraries),a.config.animation.queue&&a.queue.length<a.config.animation.queueLimit?(t.deferred=i,a.queue.push(t),a.config.controls.enable&&(a.isToggling?(a.buildToggleArray(t.instruction.command),o=a.getToggleSelector(),a.updateControls({filter:{selector:o}})):a.updateControls(t.instruction.command))):(a.config.debug.showWarnings&&console.warn(e.messages.warningMultimixInstanceQueueFull()),i.resolve(a.state),e.events.fire("mixBusy",a.dom.container,{state:a.state,instance:a},a.dom.document),"function"==typeof a.config.callbacks.onMixBusy&&a.config.callbacks.onMixBusy.call(a.dom.container,a.state,a)),a.callFilters("promiseQueueMix",i.promise,arguments)},getDataOperation:function(t){var a=this,i=new e.Operation,o=[];if(i=a.callFilters("operationUnmappedGetDataOperation",i,arguments),a.dom.targets.length&&!(o=a.state.activeDataset||[]).length)throw new Error(e.messages.errorDatasetNotSet());
return i.id=n.randomHex(),i.startState=a.state,i.startDataset=o,i.newDataset=t.slice(),a.diffDatasets(i),i.startOrder=a.targets,i.newOrder=i.show,a.config.animation.enable&&(a.getStartMixData(i),a.setInter(i),i.docState=n.getDocumentState(a.dom.document),a.getInterMixData(i),a.setFinal(i),a.getFinalMixData(i),a.parseEffects(),i.hasEffect=a.hasEffect(),a.getTweenData(i)),a.targets=i.show.slice(),i.newState=a.buildState(i),Array.prototype.push.apply(a.targets,i.toRemove),i=a.callFilters("operationMappedGetDataOperation",i,arguments)},diffDatasets:function(t){var a=this,i=[],o=[],r=[],s=null,l=null,c=null,u=null,f=null,h={},d="",m=-1;for(a.callActions("beforeDiffDatasets",arguments),m=0;s=t.newDataset[m];m++){if("undefined"==typeof(d=s[a.config.data.uidKey])||d.toString().length<1)throw new TypeError(e.messages.errorDatasetInvalidUidKey({uidKey:a.config.data.uidKey}));if(h[d])throw new Error(e.messages.errorDatasetDuplicateUid({uid:d}));h[d]=!0,(l=a.cache[d])instanceof e.Target?(a.config.data.dirtyCheck&&!n.deepEquals(s,l.data)&&(c=l.render(s),l.data=s,c!==l.dom.el&&(l.isInDom&&(l.unbindEvents(),a.dom.parent.replaceChild(c,l.dom.el)),l.isShown||(c.style.display="none"),l.dom.el=c,l.isInDom&&l.bindEvents())),c=l.dom.el):(l=new e.Target,l.init(null,a,s),l.hide()),l.isInDom?(f=l.dom.el.nextElementSibling,o.push(d),u&&(u.lastElementChild&&u.appendChild(a.dom.document.createTextNode(" ")),a.insertDatasetFrag(u,l.dom.el,r),u=null)):(u||(u=a.dom.document.createDocumentFragment()),u.lastElementChild&&u.appendChild(a.dom.document.createTextNode(" ")),u.appendChild(l.dom.el),l.isInDom=!0,l.unbindEvents(),l.bindEvents(),l.hide(),t.toShow.push(l),r.push(l)),t.show.push(l)}for(u&&(f=f||a.config.layout.siblingAfter,f&&u.appendChild(a.dom.document.createTextNode(" ")),a.insertDatasetFrag(u,f,r)),m=0;s=t.startDataset[m];m++)d=s[a.config.data.uidKey],l=a.cache[d],t.show.indexOf(l)<0?(t.hide.push(l),t.toHide.push(l),t.toRemove.push(l)):i.push(d);n.isEqualArray(i,o)||(t.willSort=!0),a.callActions("afterDiffDatasets",arguments)},insertDatasetFrag:function(t,e,n){var a=this,i=e?Array.from(a.dom.parent.children).indexOf(e):a.targets.length;for(a.dom.parent.insertBefore(t,e);n.length;)a.targets.splice(i,0,n.shift()),i++},willSort:function(t,e){var n=this,a=!1;return a=!!(n.config.behavior.liveSort||"random"===t.order||t.attribute!==e.attribute||t.order!==e.order||t.collection!==e.collection||null===t.next&&e.next||t.next&&null===e.next)||!(!t.next||!e.next)&&n.willSort(t.next,e.next),n.callFilters("resultWillSort",a,arguments)},show:function(){var t=this;return t.filter("all")},hide:function(){var t=this;return t.filter("none")},isMixing:function(){var t=this;return t.isBusy},filter:function(){var t=this,e=t.parseFilterArgs(arguments);return t.multimix({filter:e.command},e.animate,e.callback)},toggleOn:function(){var t=this,e=t.parseFilterArgs(arguments),n=e.command.selector,a="";return t.isToggling=!0,t.toggleArray.indexOf(n)<0&&t.toggleArray.push(n),a=t.getToggleSelector(),t.multimix({filter:a},e.animate,e.callback)},toggleOff:function(){var t=this,e=t.parseFilterArgs(arguments),n=e.command.selector,a=t.toggleArray.indexOf(n),i="";return t.isToggling=!0,a>-1&&t.toggleArray.splice(a,1),i=t.getToggleSelector(),t.multimix({filter:i},e.animate,e.callback)},sort:function(){var t=this,e=t.parseSortArgs(arguments);return t.multimix({sort:e.command},e.animate,e.callback)},changeLayout:function(){var t=this,e=t.parseChangeLayoutArgs(arguments);return t.multimix({changeLayout:e.command},e.animate,e.callback)},dataset:function(){var t=this,n=t.parseDatasetArgs(arguments),a=null,i=null,o=!1;return t.callActions("beforeDataset",arguments),t.isBusy?(i=new e.QueueItem,i.args=arguments,i.instruction=n,t.queueMix(i)):(n.callback&&(t.userCallback=n.callback),o=n.animate^t.config.animation.enable?n.animate:t.config.animation.enable,a=t.getDataOperation(n.command.dataset),t.goMix(o,a))},multimix:function(){var t=this,n=null,a=!1,i=null,o=t.parseMultimixArgs(arguments);return t.callActions("beforeMultimix",arguments),t.isBusy?(i=new e.QueueItem,i.args=arguments,i.instruction=o,i.triggerElement=t.lastClicked,i.isToggling=t.isToggling,t.queueMix(i)):(n=t.getOperation(o.command),t.config.controls.enable&&(o.command.filter&&!t.isToggling&&(t.toggleArray.length=0,t.buildToggleArray(n.command)),t.queue.length<1&&t.updateControls(n.command)),o.callback&&(t.userCallback=o.callback),a=o.animate^t.config.animation.enable?o.animate:t.config.animation.enable,t.callFilters("operationMultimix",n,arguments),t.goMix(a,n))},getOperation:function(t){var a=this,i=t.sort,o=t.filter,r=t.changeLayout,s=t.remove,l=t.insert,c=new e.Operation;return c=a.callFilters("operationUnmappedGetOperation",c,arguments),c.id=n.randomHex(),c.command=t,c.startState=a.state,c.triggerElement=a.lastClicked,a.isBusy?(a.config.debug.showWarnings&&console.warn(e.messages.warningGetOperationInstanceBusy()),null):(l&&a.insertTargets(l,c),s&&(c.toRemove=s.targets),c.startSort=c.newSort=c.startState.activeSort,c.startOrder=c.newOrder=a.targets,i&&(c.startSort=c.startState.activeSort,c.newSort=i,c.willSort=a.willSort(i,c.startState.activeSort),c.willSort&&a.sortOperation(c)),c.startFilter=c.startState.activeFilter,o?c.newFilter=o:c.newFilter=n.extend(new e.CommandFilter,c.startFilter),"all"===c.newFilter.selector?c.newFilter.selector=a.config.selectors.target:"none"===c.newFilter.selector&&(c.newFilter.selector=""),a.filterOperation(c),c.startContainerClassName=c.startState.activeContainerClassName,r?(c.newContainerClassName=r.containerClassName,c.newContainerClassName!==c.startContainerClassName&&(c.willChangeLayout=!0)):c.newContainerClassName=c.startContainerClassName,a.config.animation.enable&&(a.getStartMixData(c),a.setInter(c),c.docState=n.getDocumentState(a.dom.document),a.getInterMixData(c),a.setFinal(c),a.getFinalMixData(c),a.parseEffects(),c.hasEffect=a.hasEffect(),a.getTweenData(c)),c.willSort&&(a.targets=c.newOrder),c.newState=a.buildState(c),a.callFilters("operationMappedGetOperation",c,arguments))},tween:function(t,e){var n=null,a=null,i=-1,o=-1;for(e=Math.min(e,1),e=Math.max(e,0),o=0;n=t.show[o];o++)a=t.showPosData[o],n.applyTween(a,e);for(o=0;n=t.hide[o];o++)n.isShown&&n.hide(),(i=t.toHide.indexOf(n))>-1&&(a=t.toHidePosData[i],n.isShown||n.show(),n.applyTween(a,e))},insert:function(){var t=this,e=t.parseInsertArgs(arguments);return t.multimix({insert:e.command},e.animate,e.callback)},insertBefore:function(){var t=this,e=t.parseInsertArgs(arguments);return t.insert(e.command.collection,"before",e.command.sibling,e.animate,e.callback)},insertAfter:function(){var t=this,e=t.parseInsertArgs(arguments);return t.insert(e.command.collection,"after",e.command.sibling,e.animate,e.callback)},prepend:function(){var t=this,e=t.parseInsertArgs(arguments);return t.insert(0,e.command.collection,e.animate,e.callback)},append:function(){var t=this,e=t.parseInsertArgs(arguments);return t.insert(t.state.totalTargets,e.command.collection,e.animate,e.callback)},remove:function(){var t=this,e=t.parseRemoveArgs(arguments);return t.multimix({remove:e.command},e.animate,e.callback)},getConfig:function(t){var e=this,a=null;return a=t?n.getProperty(e.config,t):e.config,e.callFilters("valueGetConfig",a,arguments)},configure:function(t){var e=this;e.callActions("beforeConfigure",arguments),n.extend(e.config,t,!0,!0),e.callActions("afterConfigure",arguments)},getState:function(){var t=this,a=null;return a=new e.State,n.extend(a,t.state),n.freeze(a),t.callFilters("stateGetState",a,arguments)},forceRefresh:function(){var t=this;t.indexTargets()},forceRender:function(){var t=this,e=null,n=null,a="";for(a in t.cache)e=t.cache[a],n=e.render(e.data),n!==e.dom.el&&(e.isInDom&&(e.unbindEvents(),t.dom.parent.replaceChild(n,e.dom.el)),e.isShown||(n.style.display="none"),e.dom.el=n,e.isInDom&&e.bindEvents());t.state=t.buildState(t.lastOperation)},destroy:function(t){var n=this,a=null,i=null,o=0;for(n.callActions("beforeDestroy",arguments),o=0;a=n.controls[o];o++)a.removeBinding(n);for(o=0;i=n.targets[o];o++)t&&i.show(),i.unbindEvents();n.dom.container.id.match(/^MixItUp/)&&n.dom.container.removeAttribute("id"),delete e.instances[n.id],n.callActions("afterDestroy",arguments)}}),e.IMoveData=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.posIn=null,this.posOut=null,this.operation=null,this.callback=null,this.statusChange="",this.duration=-1,this.staggerIndex=-1,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.IMoveData),e.IMoveData.prototype=Object.create(e.Base.prototype),e.IMoveData.prototype.constructor=e.IMoveData,e.TargetDom=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.el=null,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.TargetDom),e.TargetDom.prototype=Object.create(e.Base.prototype),e.TargetDom.prototype.constructor=e.TargetDom,e.Target=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.id="",this.sortString="",this.mixer=null,this.callback=null,this.isShown=!1,this.isBound=!1,this.isExcluded=!1,this.isInDom=!1,this.handler=null,this.operation=null,this.data=null,this.dom=new e.TargetDom,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.Target),e.Target.prototype=Object.create(e.Base.prototype),n.extend(e.Target.prototype,{constructor:e.Target,init:function(t,n,a){var i=this,o="";if(i.callActions("beforeInit",arguments),i.mixer=n,t||(t=i.render(a)),i.cacheDom(t),i.bindEvents(),"none"!==i.dom.el.style.display&&(i.isShown=!0),a&&n.config.data.uidKey){if("undefined"==typeof(o=a[n.config.data.uidKey])||o.toString().length<1)throw new TypeError(e.messages.errorDatasetInvalidUidKey({uidKey:n.config.data.uidKey}));i.id=o,i.data=a,n.cache[o]=i}i.callActions("afterInit",arguments)},render:function(t){var a=this,i=null,o=null,r=null,s="";if(a.callActions("beforeRender",arguments),i=a.callFilters("renderRender",a.mixer.config.render.target,arguments),"function"!=typeof i)throw new TypeError(e.messages.errorDatasetRendererNotSet());return s=i(t),s&&"object"==typeof s&&n.isElement(s)?o=s:"string"==typeof s&&(r=document.createElement("div"),r.innerHTML=s,o=r.firstElementChild),a.callFilters("elRender",o,arguments)},cacheDom:function(t){var e=this;e.callActions("beforeCacheDom",arguments),e.dom.el=t,e.callActions("afterCacheDom",arguments)},getSortString:function(t){var e=this,n=e.dom.el.getAttribute("data-"+t)||"";e.callActions("beforeGetSortString",arguments),n=isNaN(1*n)?n.toLowerCase():1*n,e.sortString=n,e.callActions("afterGetSortString",arguments)},show:function(){var t=this;t.callActions("beforeShow",arguments),t.isShown||(t.dom.el.style.display="",t.isShown=!0),t.callActions("afterShow",arguments)},hide:function(){var t=this;t.callActions("beforeHide",arguments),t.isShown&&(t.dom.el.style.display="none",t.isShown=!1),t.callActions("afterHide",arguments)},move:function(t){var e=this;e.callActions("beforeMove",arguments),e.isExcluded||e.mixer.targetsMoved++,e.applyStylesIn(t),requestAnimationFrame(function(){e.applyStylesOut(t)}),e.callActions("afterMove",arguments)},applyTween:function(t,n){var a=this,i="",o=null,r=t.posIn,s=[],l=new e.StyleData,c=-1;for(a.callActions("beforeApplyTween",arguments),l.x=r.x,l.y=r.y,0===n?a.hide():a.isShown||a.show(),c=0;i=e.features.TWEENABLE[c];c++)if(o=t.tweenData[i],"x"===i){if(!o)continue;l.x=r.x+o*n}else if("y"===i){if(!o)continue;l.y=r.y+o*n}else if(o instanceof e.TransformData){if(!o.value)continue;l[i].value=r[i].value+o.value*n,l[i].unit=o.unit,s.push(i+"("+l[i].value+o.unit+")")}else{if(!o)continue;l[i]=r[i]+o*n,a.dom.el.style[i]=l[i]}(l.x||l.y)&&s.unshift("translate("+l.x+"px, "+l.y+"px)"),s.length&&(a.dom.el.style[e.features.transformProp]=s.join(" ")),a.callActions("afterApplyTween",arguments)},applyStylesIn:function(t){var n=this,a=t.posIn,i=1!==n.mixer.effectsIn.opacity,o=[];n.callActions("beforeApplyStylesIn",arguments),o.push("translate("+a.x+"px, "+a.y+"px)"),n.mixer.config.animation.animateResizeTargets&&("show"!==t.statusChange&&(n.dom.el.style.width=a.width+"px",n.dom.el.style.height=a.height+"px"),n.dom.el.style.marginRight=a.marginRight+"px",n.dom.el.style.marginBottom=a.marginBottom+"px"),i&&(n.dom.el.style.opacity=a.opacity),"show"===t.statusChange&&(o=o.concat(n.mixer.transformIn)),n.dom.el.style[e.features.transformProp]=o.join(" "),n.callActions("afterApplyStylesIn",arguments)},applyStylesOut:function(t){var n=this,a=[],i=[],o=n.mixer.config.animation.animateResizeTargets,r="undefined"!=typeof n.mixer.effectsIn.opacity;if(n.callActions("beforeApplyStylesOut",arguments),a.push(n.writeTransitionRule(e.features.transformRule,t.staggerIndex)),"none"!==t.statusChange&&a.push(n.writeTransitionRule("opacity",t.staggerIndex,t.duration)),o&&(a.push(n.writeTransitionRule("width",t.staggerIndex,t.duration)),a.push(n.writeTransitionRule("height",t.staggerIndex,t.duration)),a.push(n.writeTransitionRule("margin",t.staggerIndex,t.duration))),!t.callback)return n.mixer.targetsImmovable++,void(n.mixer.targetsMoved===n.mixer.targetsImmovable&&n.mixer.cleanUp(t.operation));switch(n.operation=t.operation,n.callback=t.callback,!n.isExcluded&&n.mixer.targetsBound++,n.isBound=!0,n.applyTransition(a),o&&t.posOut.width>0&&t.posOut.height>0&&(n.dom.el.style.width=t.posOut.width+"px",n.dom.el.style.height=t.posOut.height+"px",n.dom.el.style.marginRight=t.posOut.marginRight+"px",n.dom.el.style.marginBottom=t.posOut.marginBottom+"px"),n.mixer.config.animation.nudge||"hide"!==t.statusChange||i.push("translate("+t.posOut.x+"px, "+t.posOut.y+"px)"),t.statusChange){case"hide":r&&(n.dom.el.style.opacity=n.mixer.effectsOut.opacity),i=i.concat(n.mixer.transformOut);break;case"show":r&&(n.dom.el.style.opacity=1)}(n.mixer.config.animation.nudge||!n.mixer.config.animation.nudge&&"hide"!==t.statusChange)&&i.push("translate("+t.posOut.x+"px, "+t.posOut.y+"px)"),n.dom.el.style[e.features.transformProp]=i.join(" "),n.callActions("afterApplyStylesOut",arguments)},writeTransitionRule:function(t,e,n){var a=this,i=a.getDelay(e),o="";return o=t+" "+(n>0?n:a.mixer.config.animation.duration)+"ms "+i+"ms "+("opacity"===t?"linear":a.mixer.config.animation.easing),a.callFilters("ruleWriteTransitionRule",o,arguments)},getDelay:function(t){var e=this,n=-1;return"function"==typeof e.mixer.config.animation.staggerSequence&&(t=e.mixer.config.animation.staggerSequence.call(e,t,e.state)),n=e.mixer.staggerDuration?t*e.mixer.staggerDuration:0,e.callFilters("delayGetDelay",n,arguments)},applyTransition:function(t){var n=this,a=t.join(", ");n.callActions("beforeApplyTransition",arguments),n.dom.el.style[e.features.transitionProp]=a,n.callActions("afterApplyTransition",arguments)},handleTransitionEnd:function(t){var e=this,n=t.propertyName,a=e.mixer.config.animation.animateResizeTargets;e.callActions("beforeHandleTransitionEnd",arguments),e.isBound&&t.target.matches(e.mixer.config.selectors.target)&&(n.indexOf("transform")>-1||n.indexOf("opacity")>-1||a&&n.indexOf("height")>-1||a&&n.indexOf("width")>-1||a&&n.indexOf("margin")>-1)&&(e.callback.call(e,e.operation),e.isBound=!1,e.callback=null,e.operation=null),e.callActions("afterHandleTransitionEnd",arguments)},eventBus:function(t){var e=this;switch(e.callActions("beforeEventBus",arguments),t.type){case"webkitTransitionEnd":case"transitionend":e.handleTransitionEnd(t)}e.callActions("afterEventBus",arguments)},unbindEvents:function(){var t=this;t.callActions("beforeUnbindEvents",arguments),n.off(t.dom.el,"webkitTransitionEnd",t.handler),n.off(t.dom.el,"transitionend",t.handler),t.callActions("afterUnbindEvents",arguments)},bindEvents:function(){var t=this,a="";t.callActions("beforeBindEvents",arguments),a="webkit"===e.features.transitionPrefix?"webkitTransitionEnd":"transitionend",t.handler=function(e){return t.eventBus(e)},n.on(t.dom.el,a,t.handler),t.callActions("afterBindEvents",arguments)},getPosData:function(n){var a=this,i={},o=null,r=new e.StyleData;return a.callActions("beforeGetPosData",arguments),r.x=a.dom.el.offsetLeft,r.y=a.dom.el.offsetTop,(a.mixer.config.animation.animateResizeTargets||n)&&(o=a.dom.el.getBoundingClientRect(),r.top=o.top,r.right=o.right,r.bottom=o.bottom,r.left=o.left,r.width=o.width,r.height=o.height),a.mixer.config.animation.animateResizeTargets&&(i=t.getComputedStyle(a.dom.el),r.marginBottom=parseFloat(i.marginBottom),r.marginRight=parseFloat(i.marginRight)),a.callFilters("posDataGetPosData",r,arguments)},cleanUp:function(){var t=this;t.callActions("beforeCleanUp",arguments),t.dom.el.style[e.features.transformProp]="",t.dom.el.style[e.features.transitionProp]="",t.dom.el.style.opacity="",t.mixer.config.animation.animateResizeTargets&&(t.dom.el.style.width="",t.dom.el.style.height="",t.dom.el.style.marginRight="",t.dom.el.style.marginBottom=""),t.callActions("afterCleanUp",arguments)}}),e.Collection=function(t){var e=null,a=-1;for(this.callActions("beforeConstruct"),a=0;e=t[a];a++)this[a]=e;this.length=t.length,this.callActions("afterConstruct"),n.freeze(this)},e.BaseStatic.call(e.Collection),e.Collection.prototype=Object.create(e.Base.prototype),n.extend(e.Collection.prototype,{constructor:e.Collection,mixitup:function(t){var a=this,i=null,o=Array.prototype.slice.call(arguments),r=[],s=-1;for(this.callActions("beforeMixitup"),o.shift(),s=0;i=a[s];s++)r.push(i[t].apply(i,o));return a.callFilters("promiseMixitup",n.all(r,e.libraries),arguments)}}),e.Operation=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.id="",this.args=[],this.command=null,this.showPosData=[],this.toHidePosData=[],this.startState=null,this.newState=null,this.docState=null,this.willSort=!1,this.willChangeLayout=!1,this.hasEffect=!1,this.hasFailed=!1,this.triggerElement=null,this.show=[],this.hide=[],this.matching=[],this.toShow=[],this.toHide=[],this.toMove=[],this.toRemove=[],this.startOrder=[],this.newOrder=[],this.startSort=null,this.newSort=null,this.startFilter=null,this.newFilter=null,this.startDataset=null,this.newDataset=null,this.viewportDeltaX=0,this.viewportDeltaY=0,this.startX=0,this.startY=0,this.startHeight=0,this.startWidth=0,this.newX=0,this.newY=0,this.newHeight=0,this.newWidth=0,this.startContainerClassName="",this.startDisplay="",this.newContainerClassName="",this.newDisplay="",this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.Operation),e.Operation.prototype=Object.create(e.Base.prototype),e.Operation.prototype.constructor=e.Operation,e.State=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.id="",this.activeFilter=null,this.activeSort=null,this.activeContainerClassName="",this.container=null,this.targets=[],this.hide=[],this.show=[],this.matching=[],this.totalTargets=-1,this.totalShow=-1,this.totalHide=-1,this.totalMatching=-1,this.hasFailed=!1,this.triggerElement=null,this.activeDataset=null,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.State),e.State.prototype=Object.create(e.Base.prototype),e.State.prototype.constructor=e.State,e.UserInstruction=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.command={},this.animate=!1,this.callback=null,this.callActions("afterConstruct"),n.seal(this)},e.BaseStatic.call(e.UserInstruction),e.UserInstruction.prototype=Object.create(e.Base.prototype),e.UserInstruction.prototype.constructor=e.UserInstruction,e.Messages=function(){e.Base.call(this),this.callActions("beforeConstruct"),this.ERROR_FACTORY_INVALID_CONTAINER="[MixItUp] An invalid selector or element reference was passed to the mixitup factory function",this.ERROR_FACTORY_CONTAINER_NOT_FOUND="[MixItUp] The provided selector yielded no container element",this.ERROR_CONFIG_INVALID_ANIMATION_EFFECTS="[MixItUp] Invalid value for `animation.effects`",this.ERROR_CONFIG_INVALID_CONTROLS_SCOPE="[MixItUp] Invalid value for `controls.scope`",this.ERROR_CONFIG_INVALID_PROPERTY='[MixitUp] Invalid configuration object property "${erroneous}"${suggestion}',this.ERROR_CONFIG_INVALID_PROPERTY_SUGGESTION='. Did you mean "${probableMatch}"?',this.ERROR_CONFIG_DATA_UID_KEY_NOT_SET="[MixItUp] To use the dataset API, a UID key must be specified using `data.uidKey`",this.ERROR_DATASET_INVALID_UID_KEY='[MixItUp] The specified UID key "${uidKey}" is not present on one or more dataset items',this.ERROR_DATASET_DUPLICATE_UID='[MixItUp] The UID "${uid}" was found on two or more dataset items. UIDs must be unique.',this.ERROR_INSERT_INVALID_ARGUMENTS="[MixItUp] Please provider either an index or a sibling and position to insert, not both",this.ERROR_INSERT_PREEXISTING_ELEMENT="[MixItUp] An element to be inserted already exists in the container",this.ERROR_FILTER_INVALID_ARGUMENTS="[MixItUp] Please provide either a selector or collection `.filter()`, not both",this.ERROR_DATASET_NOT_SET="[MixItUp] To use the dataset API with pre-rendered targets, a starting dataset must be set using `load.dataset`",this.ERROR_DATASET_PRERENDERED_MISMATCH="[MixItUp] `load.dataset` does not match pre-rendered targets",this.ERROR_DATASET_RENDERER_NOT_SET="[MixItUp] To insert an element via the dataset API, a target renderer function must be provided to `render.target`",this.WARNING_FACTORY_PREEXISTING_INSTANCE="[MixItUp] WARNING: This element already has an active MixItUp instance. The provided configuration object will be ignored. If you wish to perform additional methods on this instance, please create a reference.",this.WARNING_INSERT_NO_ELEMENTS="[MixItUp] WARNING: No valid elements were passed to `.insert()`",this.WARNING_REMOVE_NO_ELEMENTS="[MixItUp] WARNING: No valid elements were passed to `.remove()`",this.WARNING_MULTIMIX_INSTANCE_QUEUE_FULL="[MixItUp] WARNING: An operation was requested but the MixItUp instance was busy. The operation was rejected because the queue is full or queuing is disabled.",this.WARNING_GET_OPERATION_INSTANCE_BUSY="[MixItUp] WARNING: Operations can be be created while the MixItUp instance is busy.",this.WARNING_NO_PROMISE_IMPLEMENTATION="[MixItUp] WARNING: No Promise implementations could be found. If you wish to use promises with MixItUp please install an ES6 Promise polyfill.",this.WARNING_INCONSISTENT_SORTING_ATTRIBUTES='[MixItUp] WARNING: The requested sorting data attribute "${attribute}" was not present on one or more target elements which may product unexpected sort output',this.callActions("afterConstruct"),this.compileTemplates(),n.seal(this)},e.BaseStatic.call(e.Messages),e.Messages.prototype=Object.create(e.Base.prototype),e.Messages.prototype.constructor=e.Messages,e.Messages.prototype.compileTemplates=function(){var t="",e="";for(t in this)"string"==typeof(e=this[t])&&(this[n.camelCase(t)]=n.template(e))},e.messages=new e.Messages,e.Facade=function(t){e.Base.call(this),this.callActions("beforeConstruct",arguments),this.configure=t.configure.bind(t),this.show=t.show.bind(t),this.hide=t.hide.bind(t),this.filter=t.filter.bind(t),this.toggleOn=t.toggleOn.bind(t),this.toggleOff=t.toggleOff.bind(t),this.sort=t.sort.bind(t),this.changeLayout=t.changeLayout.bind(t),this.multimix=t.multimix.bind(t),this.dataset=t.dataset.bind(t),this.tween=t.tween.bind(t),this.insert=t.insert.bind(t),this.insertBefore=t.insertBefore.bind(t),this.insertAfter=t.insertAfter.bind(t),this.prepend=t.prepend.bind(t),this.append=t.append.bind(t),this.remove=t.remove.bind(t),this.destroy=t.destroy.bind(t),this.forceRefresh=t.forceRefresh.bind(t),this.forceRender=t.forceRender.bind(t),this.isMixing=t.isMixing.bind(t),this.getOperation=t.getOperation.bind(t),this.getConfig=t.getConfig.bind(t),this.getState=t.getState.bind(t),this.callActions("afterConstruct",arguments),n.freeze(this),n.seal(this)},e.BaseStatic.call(e.Facade),e.Facade.prototype=Object.create(e.Base.prototype),e.Facade.prototype.constructor=e.Facade,"object"==typeof exports&&"object"==typeof module?module.exports=e:"function"==typeof define&&define.amd?define(function(){return e}):"undefined"!=typeof t.mixitup&&"function"==typeof t.mixitup||(t.mixitup=e),e.BaseStatic.call(e.constructor),e.NAME="mixitup",e.CORE_VERSION="3.2.2"}(window);
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A Twitter library in JavaScript
 *
 * @package   codebird
 * @version   3.0.0-dev
 * @author    Jublo Solutions <support@jublo.net>
 * @copyright 2010-2016 Jublo Solutions <support@jublo.net>
 * @license   http://opensource.org/licenses/GPL-3.0 GNU Public License 3.0
 * @link      https://github.com/jublonet/codebird-php
 */

/* global window,
      document,
      navigator,
      Ti,
      ActiveXObject,
      module,
      define,
      require */

(function () {
  /**
   * A Twitter library in JavaScript
   *
   * @package codebird
   * @subpackage codebird-js
   */

  var Codebird = (function () {
    function Codebird() {
      _classCallCheck(this, Codebird);

      /**
       * The OAuth consumer key of your registered app
       */
      this._oauth_consumer_key = null;

      /**
       * The corresponding consumer secret
       */
      this._oauth_consumer_secret = null;

      /**
       * The app-only bearer token. Used to authorize app-only requests
       */
      this._oauth_bearer_token = null;

      /**
       * The API endpoint base to use
       */
      this._endpoint_base = "https://api.twitter.com/";

      /**
       * The media API endpoint base to use
       */
      this._endpoint_base_media = "https://upload.twitter.com/";

      /**
       * The API endpoint to use
       */
      this._endpoint = this._endpoint_base + "1.1/";

      /**
       * The media API endpoint to use
       */
      this._endpoint_media = this._endpoint_base_media + "1.1/";

      /**
       * The publish API endpoint to use
       */
      this._endpoint_publish = "https://publish.twitter.com/";

      /**
       * The API endpoint base to use
       */
      this._endpoint_oauth = this._endpoint_base;

      /**
       * API proxy endpoint
       */
      this._endpoint_proxy = "https://api.jublo.net/codebird/";

      /**
       * Whether to access the API via a proxy that is allowed by CORS
       * Assume that CORS is only necessary in browsers
       */
      this._use_proxy = typeof navigator !== "undefined" && typeof navigator.userAgent !== "undefined";

      /**
       * The Request or access token. Used to sign requests
       */
      this._oauth_token = null;

      /**
       * The corresponding request or access token secret
       */
      this._oauth_token_secret = null;

      /**
       * The current Codebird version
       */
      this._version = "3.0.0-dev";

      this.b64_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    }

    /**
     * Sets the OAuth consumer key and secret (App key)
     *
     * @param string key    OAuth consumer key
     * @param string secret OAuth consumer secret
     *
     * @return void
     */

    _createClass(Codebird, [{
      key: "setConsumerKey",
      value: function setConsumerKey(key, secret) {
        this._oauth_consumer_key = key;
        this._oauth_consumer_secret = secret;
      }

      /**
       * Sets the OAuth2 app-only auth bearer token
       *
       * @param string token OAuth2 bearer token
       *
       * @return void
       */

    }, {
      key: "setBearerToken",
      value: function setBearerToken(token) {
        this._oauth_bearer_token = token;
      }

      /**
       * Gets the current Codebird version
       *
       * @return string The version number
       */

    }, {
      key: "getVersion",
      value: function getVersion() {
        return this._version;
      }

      /**
       * Sets the OAuth request or access token and secret (User key)
       *
       * @param string token  OAuth request or access token
       * @param string secret OAuth request or access token secret
       *
       * @return void
       */

    }, {
      key: "setToken",
      value: function setToken(token, secret) {
        this._oauth_token = token;
        this._oauth_token_secret = secret;
      }

      /**
       * Forgets the OAuth request or access token and secret (User key)
       *
       * @return bool
       */

    }, {
      key: "logout",
      value: function logout() {
        this._oauth_token = this._oauth_token_secret = null;

        return true;
      }

      /**
       * Enables or disables CORS proxy
       *
       * @param bool use_proxy Whether to use CORS proxy or not
       *
       * @return void
       */

    }, {
      key: "setUseProxy",
      value: function setUseProxy(use_proxy) {
        this._use_proxy = !!use_proxy;
      }

      /**
       * Sets custom CORS proxy server
       *
       * @param string proxy Address of proxy server to use
       *
       * @return void
       */

    }, {
      key: "setProxy",
      value: function setProxy(proxy) {
        // add trailing slash if missing
        if (!proxy.match(/\/$/)) {
          proxy += "/";
        }
        this._endpoint_proxy = proxy;
      }

      /**
       * Signing helpers
       */

      /**
       * URL-encodes the given data
       *
       * @param mixed data
       *
       * @return mixed The encoded data
       */

    }, {
      key: "_url",
      value: function _url(data) {
        if (/boolean|number|string/.test(typeof data === "undefined" ? "undefined" : _typeof(data))) {
          return encodeURIComponent(data).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
        } else {
          return "";
        }
      }

      /**
       * Gets the base64-encoded SHA1 hash for the given data
       *
       * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
       * in FIPS PUB 180-1
       * Based on version 2.1 Copyright Paul Johnston 2000 - 2002.
       * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
       * Distributed under the BSD License
       * See http://pajhome.org.uk/crypt/md5 for details.
       *
       * @param string data The data to calculate the hash from
       *
       * @return string The hash
       */

    }, {
      key: "_sha1",
      value: function _sha1(e) {
        function n(e, b) {
          e[b >> 5] |= 128 << 24 - b % 32;
          e[(b + 64 >> 9 << 4) + 15] = b;
          for (var c = new Array(80), a = 1732584193, d = -271733879, h = -1732584194, k = 271733878, g = -1009589776, p = 0; p < e.length; p += 16) {
            for (var o = a, q = d, r = h, s = k, t = g, f = 0; 80 > f; f++) {
              var m = undefined;

              if (f < 16) {
                m = e[p + f];
              } else {
                m = c[f - 3] ^ c[f - 8] ^ c[f - 14] ^ c[f - 16];
                m = m << 1 | m >>> 31;
              }

              c[f] = m;
              m = l(l(a << 5 | a >>> 27, 20 > f ? d & h | ~d & k : 40 > f ? d ^ h ^ k : 60 > f ? d & h | d & k | h & k : d ^ h ^ k), l(l(g, c[f]), 20 > f ? 1518500249 : 40 > f ? 1859775393 : 60 > f ? -1894007588 : -899497514));
              g = k;
              k = h;
              h = d << 30 | d >>> 2;
              d = a;
              a = m;
            }
            a = l(a, o);
            d = l(d, q);
            h = l(h, r);
            k = l(k, s);
            g = l(g, t);
          }
          return [a, d, h, k, g];
        }

        function l(e, b) {
          var c = (e & 65535) + (b & 65535);
          return (e >> 16) + (b >> 16) + (c >> 16) << 16 | c & 65535;
        }

        function q(e) {
          for (var b = [], c = (1 << g) - 1, a = 0; a < e.length * g; a += g) {
            b[a >> 5] |= (e.charCodeAt(a / g) & c) << 24 - a % 32;
          }
          return b;
        }
        var g = 8;

        var b = this._oauth_consumer_secret + "&" + (null !== this._oauth_token_secret ? this._oauth_token_secret : "");
        if (this._oauth_consumer_secret === null) {
          throw "To generate a hash, the consumer secret must be set.";
        }
        var c = q(b);
        if (c.length > 16) {
          c = n(c, b.length * g);
        }
        var bb = new Array(16);
        for (var a = new Array(16), d = 0; d < 16; d++) {
          a[d] = c[d] ^ 909522486;
          bb[d] = c[d] ^ 1549556828;
        }
        c = n(a.concat(q(e)), 512 + e.length * g);
        bb = n(bb.concat(c), 672);
        b = "";
        for (g = 0; g < 4 * bb.length; g += 3) {
          for (d = (bb[g >> 2] >> 8 * (3 - g % 4) & 255) << 16 | (bb[g + 1 >> 2] >> 8 * (3 - (g + 1) % 4) & 255) << 8 | bb[g + 2 >> 2] >> 8 * (3 - (g + 2) % 4) & 255, e = 0; 4 > e; e++) {
            b = 8 * g + 6 * e > 32 * bb.length ? b + "=" : b + this.b64_alphabet.charAt(d >> 6 * (3 - e) & 63);
          }
        }
        return b;
      }

      /*
       * Gets the base64 representation for the given data
       *
       * http://phpjs.org
       * +   original by: Tyler Akins (http://rumkin.com)
       * +   improved by: Bayron Guevara
       * +   improved by: Thunder.m
       * +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
       * +   bugfixed by: Pellentesque Malesuada
       * +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
       * +   improved by: Rafał Kukawski (http://kukawski.pl)
       *
       * @param string data The data to calculate the base64 representation from
       *
       * @return string The base64 representation
       */

    }, {
      key: "_base64_encode",
      value: function _base64_encode(a) {
        var d = undefined,
            e = undefined,
            f = undefined,
            b = undefined,
            g = 0,
            h = 0,
            i = this.b64_alphabet,
            c = [];
        if (!a) {
          return a;
        }
        do {
          d = a.charCodeAt(g++);
          e = a.charCodeAt(g++);
          f = a.charCodeAt(g++);
          b = d << 16 | e << 8 | f;
          d = b >> 18 & 63;
          e = b >> 12 & 63;
          f = b >> 6 & 63;
          b &= 63;
          c[h++] = i.charAt(d) + i.charAt(e) + i.charAt(f) + i.charAt(b);
        } while (g < a.length);
        i = c.join("");
        a = a.length % 3;
        return (a ? i.slice(0, a - 3) : i) + "===".slice(a || 3);
      }

      /*
       * Builds a HTTP query string from the given data
       *
       * http://phpjs.org
       * +     original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
       * +     improved by: Legaev Andrey
       * +     improved by: Michael White (http://getsprink.com)
       * +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
       * +     improved by: Brett Zamir (http://brett-zamir.me)
       * +        revised by: stag019
       * +     input by: Dreamer
       * +     bugfixed by: Brett Zamir (http://brett-zamir.me)
       * +     bugfixed by: MIO_KODUKI (http://mio-koduki.blogspot.com/)
       *
       * @param string data The data to concatenate
       *
       * @return string The HTTP query
       */

    }, {
      key: "_http_build_query",
      value: function _http_build_query(e, f, b) {
        function g(c, a, d) {
          var b = undefined,
              e = [];
          if (a === true) {
            a = "1";
          } else if (a === false) {
            a = "0";
          }
          if (null !== a) {
            if ((typeof a === "undefined" ? "undefined" : _typeof(a)) === "object") {
              for (b in a) {
                if (a.hasOwnProperty(b) && a[b] !== null) {
                  e.push(g.call(this, c + "[" + b + "]", a[b], d));
                }
              }
              return e.join(d);
            }
            if (typeof a !== "function") {
              return this._url(c) + "=" + this._url(a);
            }
            throw "There was an error processing for http_build_query().";
          } else {
            return "";
          }
        }
        var d,
            c,
            h = [];
        if (!b) {
          b = "&";
        }
        for (c in e) {
          if (!e.hasOwnProperty(c)) {
            continue;
          }
          d = e[c];
          if (f && !isNaN(c)) {
            c = String(f) + c;
          }
          d = g.call(this, c, d, b);
          if (d !== "") {
            h.push(d);
          }
        }
        return h.join(b);
      }

      /**
       * Generates a (hopefully) unique random string
       *
       * @param int optional length The length of the string to generate
       *
       * @return string The random string
       */

    }, {
      key: "_nonce",
      value: function _nonce() {
        var length = arguments.length <= 0 || arguments[0] === undefined ? 8 : arguments[0];

        if (length < 1) {
          throw "Invalid nonce length.";
        }
        var nonce = "";
        for (var i = 0; i < length; i++) {
          var character = Math.floor(Math.random() * 61);
          nonce += this.b64_alphabet.substring(character, character + 1);
        }
        return nonce;
      }

      /**
       * Sort array elements by key
       *
       * @param array input_arr The array to sort
       *
       * @return array The sorted keys
       */

    }, {
      key: "_ksort",
      value: function _ksort(input_arr) {
        var keys = [],
            sorter = undefined,
            k = undefined;

        sorter = function (a, b) {
          var a_float = parseFloat(a),
              b_float = parseFloat(b),
              a_numeric = a_float + "" === a,
              b_numeric = b_float + "" === b;
          if (a_numeric && b_numeric) {
            return a_float > b_float ? 1 : a_float < b_float ? -1 : 0;
          } else if (a_numeric && !b_numeric) {
            return 1;
          } else if (!a_numeric && b_numeric) {
            return -1;
          }
          return a > b ? 1 : a < b ? -1 : 0;
        };

        // Make a list of key names
        for (k in input_arr) {
          if (input_arr.hasOwnProperty(k)) {
            keys.push(k);
          }
        }
        keys.sort(sorter);
        return keys;
      }

      /**
       * Clone objects
       *
       * @param object obj    The object to clone
       *
       * @return object clone The cloned object
       */

    }, {
      key: "_clone",
      value: function _clone(obj) {
        var clone = {};
        for (var i in obj) {
          if (_typeof(obj[i]) === "object") {
            clone[i] = this._clone(obj[i]);
          } else {
            clone[i] = obj[i];
          }
        }
        return clone;
      }

      /**
       * Gets the XML HTTP Request object, trying to load it in various ways
       *
       * @return object The XMLHttpRequest object instance
       */

    }, {
      key: "_getXmlRequestObject",
      value: function _getXmlRequestObject() {
        var xml = null;
        // first, try the W3-standard object
        if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && window && typeof window.XMLHttpRequest !== "undefined") {
          xml = new window.XMLHttpRequest();
          // then, try Titanium framework object
        } else if ((typeof Ti === "undefined" ? "undefined" : _typeof(Ti)) === "object" && Ti && typeof Ti.Network.createHTTPClient !== "undefined") {
            xml = Ti.Network.createHTTPClient();
            // are we in an old Internet Explorer?
          } else if (typeof ActiveXObject !== "undefined") {
              try {
                xml = new ActiveXObject("Microsoft.XMLHTTP");
              } catch (e) {
                throw "ActiveXObject object not defined.";
              }
              // now, consider RequireJS and/or Node.js objects
            } else if (typeof require === "function") {
                var XMLHttpRequest;
                // look for xmlhttprequest module
                try {
                  XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
                  xml = new XMLHttpRequest();
                } catch (e1) {
                  // or maybe the user is using xhr2
                  try {
                    XMLHttpRequest = require("xhr2");
                    xml = new XMLHttpRequest();
                  } catch (e2) {
                    throw "xhr2 object not defined, cancelling.";
                  }
                }
              }
        return xml;
      }

      /**
       * Parse URL-style parameters into object
       *
       * version: 1109.2015
       * discuss at: http://phpjs.org/functions/parse_str
       * +   original by: Cagri Ekin
       * +   improved by: Michael White (http://getsprink.com)
       * +    tweaked by: Jack
       * +   bugfixed by: Onno Marsman
       * +   reimplemented by: stag019
       * +   bugfixed by: Brett Zamir (http://brett-zamir.me)
       * +   bugfixed by: stag019
       * -    depends on: urldecode
       * +   input by: Dreamer
       * +   bugfixed by: Brett Zamir (http://brett-zamir.me)
       * %        note 1: When no argument is specified, will put variables in global scope.
       *
       * @param string str String to parse
       * @param array array to load data into
       *
       * @return object
       */

    }, {
      key: "_parse_str",
      value: function _parse_str(str, array) {
        var glue1 = "=",
            glue2 = "&",
            array2 = String(str).replace(/^&?([\s\S]*?)&?$/, "$1").split(glue2),
            i,
            j,
            chr,
            tmp,
            key,
            value,
            bracket,
            keys,
            evalStr,
            fixStr = function fixStr(str) {
          return decodeURIComponent(str).replace(/([\\"'])/g, "\\$1").replace(/\n/g, "\\n").replace(/\r/g, "\\r");
        };
        if (!array) {
          array = this.window;
        }

        for (i = 0; i < array2.length; i++) {
          tmp = array2[i].split(glue1);
          if (tmp.length < 2) {
            tmp = [tmp, ""];
          }
          key = fixStr(tmp[0]);
          value = fixStr(tmp[1]);
          while (key.charAt(0) === " ") {
            key = key.substr(1);
          }
          if (key.indexOf("\0") > -1) {
            key = key.substr(0, key.indexOf("\0"));
          }
          if (key && key.charAt(0) !== "[") {
            keys = [];
            bracket = 0;
            for (j = 0; j < key.length; j++) {
              if (key.charAt(j) === "[" && !bracket) {
                bracket = j + 1;
              } else if (key.charAt(j) === "]") {
                if (bracket) {
                  if (!keys.length) {
                    keys.push(key.substr(0, bracket - 1));
                  }
                  keys.push(key.substr(bracket, j - bracket));
                  bracket = 0;
                  if (key.charAt(j + 1) !== "[") {
                    break;
                  }
                }
              }
            }
            if (!keys.length) {
              keys = [key];
            }
            for (j = 0; j < keys[0].length; j++) {
              chr = keys[0].charAt(j);
              if (chr === " " || chr === "." || chr === "[") {
                keys[0] = keys[0].substr(0, j) + "_" + keys[0].substr(j + 1);
              }
              if (chr === "[") {
                break;
              }
            }
            evalStr = "array";
            for (j = 0; j < keys.length; j++) {
              key = keys[j];
              if (key !== "" && key !== " " || j === 0) {
                key = "'" + key + "'";
              } else {
                key = eval(evalStr + ".push([]);") - 1;
              }
              evalStr += "[" + key + "]";
              if (j !== keys.length - 1 && eval("typeof " + evalStr) === "undefined") {
                eval(evalStr + " = [];");
              }
            }
            evalStr += " = '" + value + "';\n";
            eval(evalStr);
          }
        }
      }

      /**
       * Get allowed API methods, sorted by GET or POST
       * Watch out for multiple-method "account/settings"!
       *
       * @return array $apimethods
       */

    }, {
      key: "getApiMethods",
      value: function getApiMethods() {
        var httpmethods = {
          GET: ["account/settings", "account/verify_credentials", "application/rate_limit_status", "blocks/ids", "blocks/list", "collections/entries", "collections/list", "collections/show", "direct_messages", "direct_messages/sent", "direct_messages/show", "favorites/list", "followers/ids", "followers/list", "friends/ids", "friends/list", "friendships/incoming", "friendships/lookup", "friendships/lookup", "friendships/no_retweets/ids", "friendships/outgoing", "friendships/show", "geo/id/:place_id", "geo/reverse_geocode", "geo/search", "geo/similar_places", "help/configuration", "help/languages", "help/privacy", "help/tos", "lists/list", "lists/members", "lists/members/show", "lists/memberships", "lists/ownerships", "lists/show", "lists/statuses", "lists/subscribers", "lists/subscribers/show", "lists/subscriptions", "mutes/users/ids", "mutes/users/list", "oauth/authenticate", "oauth/authorize", "saved_searches/list", "saved_searches/show/:id", "search/tweets", "site", "statuses/firehose", "statuses/home_timeline", "statuses/mentions_timeline", "statuses/oembed", "statuses/retweeters/ids", "statuses/retweets/:id", "statuses/retweets_of_me", "statuses/sample", "statuses/show/:id", "statuses/user_timeline", "trends/available", "trends/closest", "trends/place", "user", "users/contributees", "users/contributors", "users/profile_banner", "users/search", "users/show", "users/suggestions", "users/suggestions/:slug", "users/suggestions/:slug/members"],
          POST: ["account/remove_profile_banner", "account/settings__post", "account/update_delivery_device", "account/update_profile", "account/update_profile_background_image", "account/update_profile_banner", "account/update_profile_colors", "account/update_profile_image", "blocks/create", "blocks/destroy", "collections/create", "collections/destroy", "collections/entries/add", "collections/entries/curate", "collections/entries/move", "collections/entries/remove", "collections/update", "direct_messages/destroy", "direct_messages/new", "favorites/create", "favorites/destroy", "friendships/create", "friendships/destroy", "friendships/update", "lists/create", "lists/destroy", "lists/members/create", "lists/members/create_all", "lists/members/destroy", "lists/members/destroy_all", "lists/subscribers/create", "lists/subscribers/destroy", "lists/update", "media/upload", "mutes/users/create", "mutes/users/destroy", "oauth/access_token", "oauth/request_token", "oauth2/invalidate_token", "oauth2/token", "saved_searches/create", "saved_searches/destroy/:id", "statuses/destroy/:id", "statuses/filter", "statuses/lookup", "statuses/retweet/:id", "statuses/unretweet/:id", "statuses/update", "statuses/update_with_media", // deprecated, use media/upload
          "users/lookup", "users/report_spam"]
        };
        return httpmethods;
      }

      /**
       * Promise helpers
       */

      /**
       * Get a deferred object
       */

    }, {
      key: "_getDfd",
      value: function _getDfd() {
        if (typeof window !== "undefined") {
          if (typeof window.jQuery !== "undefined" && window.jQuery.Deferred) {
            return window.jQuery.Deferred();
          }
          if (typeof window.Q !== "undefined" && window.Q.defer) {
            return window.Q.defer();
          }
          if (typeof window.RSVP !== "undefined" && window.RSVP.defer) {
            return window.RSVP.defer();
          }
          if (typeof window.when !== "undefined" && window.when.defer) {
            return window.when.defer();
          }
        }
        if (typeof require !== "undefined") {
          var promise_class = false;
          try {
            promise_class = require("jquery");
          } catch (e) {}
          if (promise_class) {
            return promise_class.Deferred();
          }
          try {
            promise_class = require("q");
          } catch (e) {}
          if (!promise_class) {
            try {
              promise_class = require("rsvp");
            } catch (e) {}
          }
          if (!promise_class) {
            try {
              promise_class = require("when");
            } catch (e) {}
          }
          if (promise_class) {
            try {
              return promise_class.defer();
            } catch (e) {}
          }
        }
        return false;
      }

      /**
       * Get a promise from the dfd object
       */

    }, {
      key: "_getPromise",
      value: function _getPromise(dfd) {
        if (typeof dfd.promise === "function") {
          return dfd.promise();
        }
        return dfd.promise; // object
      }

      /**
       * __call() helpers
       */

      /**
       * Parse given params, detect query-style params
       *
       * @param array|string params Parameters to parse
       *
       * @return array apiparams
       */

    }, {
      key: "_parseApiParams",
      value: function _parseApiParams(params) {
        var apiparams = {};
        if ((typeof params === "undefined" ? "undefined" : _typeof(params)) === "object") {
          apiparams = params;
        } else {
          this._parse_str(params, apiparams); //TODO
        }

        return apiparams;
      }

      /**
       * Replace null and boolean parameters with their string representations
       *
       * @param array apiparams Parameter array to replace in
       *
       * @return array apiparams
       */

    }, {
      key: "_stringifyNullBoolParams",
      value: function _stringifyNullBoolParams(apiparams) {
        for (var key in apiparams) {
          if (!apiparams.hasOwnProperty(key)) {
            continue;
          }
          var value = apiparams[key];
          if (value === null) {
            apiparams[key] = "null";
          } else if (value === true || value === false) {
            apiparams[key] = value ? "true" : "false";
          }
        }

        return apiparams;
      }

      /**
       * API method mapping: Replaces _ with / character
       *
       * @param string fn Function called
       *
       * @return string API method to call
       */

    }, {
      key: "_mapFnInsertSlashes",
      value: function _mapFnInsertSlashes(fn) {
        return fn.split("_").join("/");
      }

      /**
       * API method mapping: Restore _ character in named parameters
       *
       * @param string method API method to call
       *
       * @return string API method with restored underscores
       */

    }, {
      key: "_mapFnRestoreParamUnderscores",
      value: function _mapFnRestoreParamUnderscores(method) {
        var url_parameters_with_underscore = ["screen_name", "place_id"];
        var i = undefined,
            param = undefined,
            replacement_was = undefined;
        for (i = 0; i < url_parameters_with_underscore.length; i++) {
          param = url_parameters_with_underscore[i].toUpperCase();
          replacement_was = param.split("_").join("/");
          method = method.split(replacement_was).join(param);
        }

        return method;
      }

      /**
       * Maps called PHP magic method name to Twitter API method
       *
       * @param string $fn              Function called
       * @param array  $apiparams byref API parameters
       *
       * @return string[] (string method, string method_template)
       */

    }, {
      key: "_mapFnToApiMethod",
      value: function _mapFnToApiMethod(fn, apiparams) {
        var method = "",
            param = undefined,
            i = undefined,
            j = undefined;

        // replace _ by /
        method = this._mapFnInsertSlashes(fn);

        // undo replacement for URL parameters
        method = this._mapFnRestoreParamUnderscores(method);

        // replace AA by URL parameters
        var method_template = method;
        var match = method.match(/[A-Z_]{2,}/);
        if (match) {
          for (i = 0; i < match.length; i++) {
            param = match[i];
            var param_l = param.toLowerCase();
            method_template = method_template.split(param).join(":" + param_l);
            if (typeof apiparams[param_l] === "undefined") {
              for (j = 0; j < 26; j++) {
                method_template = method_template.split(String.fromCharCode(65 + j)).join("_" + String.fromCharCode(97 + j));
              }
              throw "To call the templated method \"" + method_template + "\", specify the parameter value for \"" + param_l + "\".";
            }
            method = method.split(param).join(apiparams[param_l]);
            delete apiparams[param_l];
          }
        }

        // replace A-Z by _a-z
        for (i = 0; i < 26; i++) {
          method = method.split(String.fromCharCode(65 + i)).join("_" + String.fromCharCode(97 + i));
          method_template = method_template.split(String.fromCharCode(65 + i)).join("_" + String.fromCharCode(97 + i));
        }

        return [method, method_template];
      }

      /**
       * Detects HTTP method to use for API call
       *
       * @param string method The API method to call
       * @param array  params The parameters to send along
       *
       * @return string The HTTP method that should be used
       */

    }, {
      key: "_detectMethod",
      value: function _detectMethod(method, params) {
        if (typeof params.httpmethod !== "undefined") {
          var httpmethod = params.httpmethod;
          delete params.httpmethod;
          return httpmethod;
        }

        // multi-HTTP method endpoints
        switch (method) {
          case "account/settings":
          case "account/login_verification_enrollment":
          case "account/login_verification_request":
            method = Object.keys(params).length ? method + "__post" : method;
            break;
        }

        var apimethods = this.getApiMethods();
        for (var httpmethod in apimethods) {
          if (apimethods.hasOwnProperty(httpmethod) && apimethods[httpmethod].indexOf(method) > -1) {
            return httpmethod;
          }
        }
        throw "Can't find HTTP method to use for \"" + method + "\".";
      }

      /**
       * Detects if API call should use multipart/form-data
       *
       * @param string method The API method to call
       *
       * @return bool Whether the method should be sent as multipart
       */

    }, {
      key: "_detectMultipart",
      value: function _detectMultipart(method) {
        var multiparts = [
        // Tweets
        "statuses/update_with_media", "media/upload",

        // Users
        "account/update_profile_background_image", "account/update_profile_image", "account/update_profile_banner"];
        return multiparts.indexOf(method) > -1;
      }

      /**
       * Signature helper
       *
       * @param string httpmethod   Usually either 'GET' or 'POST' or 'DELETE'
       * @param string method       The API method to call
       * @param array  base_params  The signature base parameters
       *
       * @return string signature
       */

    }, {
      key: "_getSignature",
      value: function _getSignature(httpmethod, method, keys, base_params) {
        // convert params to string
        var base_string = "",
            key = undefined,
            value = undefined;
        for (var i = 0; i < keys.length; i++) {
          key = keys[i];
          value = base_params[key];
          base_string += key + "=" + this._url(value) + "&";
        }
        base_string = base_string.substring(0, base_string.length - 1);
        return this._sha1(httpmethod + "&" + this._url(method) + "&" + this._url(base_string));
      }

      /**
       * Generates the UNIX timestamp
       */

    }, {
      key: "_time",
      value: function _time() {
        return Math.round(new Date().getTime() / 1000);
      }

      /**
       * Generates an OAuth signature
       *
       * @param string          httpmethod    Usually either 'GET' or 'POST' or 'DELETE'
       * @param string          method        The API method to call
       * @param array  optional params        The API call parameters, associative
       *
       * @return string Authorization HTTP header
       */

    }, {
      key: "_sign",
      value: function _sign(httpmethod, method) {
        var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        if (this._oauth_consumer_key === null) {
          throw "To generate a signature, the consumer key must be set.";
        }
        var sign_params = {
          consumer_key: this._oauth_consumer_key,
          version: "1.0",
          timestamp: this._time(),
          nonce: this._nonce(),
          signature_method: "HMAC-SHA1"
        };
        var sign_base_params = {};
        for (var key in sign_params) {
          if (!sign_params.hasOwnProperty(key)) {
            continue;
          }
          var value = sign_params[key];
          sign_base_params["oauth_" + key] = this._url(value);
        }
        if (this._oauth_token !== null) {
          sign_base_params.oauth_token = this._url(this._oauth_token);
        }
        var oauth_params = this._clone(sign_base_params);
        for (key in params) {
          if (!params.hasOwnProperty(key)) {
            continue;
          }
          sign_base_params[key] = params[key];
        }
        var keys = this._ksort(sign_base_params);

        var signature = this._getSignature(httpmethod, method, keys, sign_base_params);

        params = oauth_params;
        params.oauth_signature = signature;
        keys = this._ksort(params);
        var authorization = "OAuth ";
        for (var i = 0; i < keys.length; i++) {
          key = keys[i];
          authorization += key + "=\"" + this._url(params[key]) + "\", ";
        }
        return authorization.substring(0, authorization.length - 2);
      }

      /**
       * Build multipart request from upload params
       *
       * @param string method  The API method to call
       * @param array  params  The parameters to send along
       *
       * @return null|string The built multipart request body
       */

    }, {
      key: "_buildMultipart",
      value: function _buildMultipart(method, params) {
        // well, files will only work in multipart methods
        if (!this._detectMultipart(method)) {
          return;
        }

        // only check specific parameters
        var possible_methods = [
        // Tweets
        "media/upload", "statuses/update_with_media",
        // Accounts
        "account/update_profile_background_image", "account/update_profile_image", "account/update_profile_banner"];
        var possible_files = {
          // Tweets
          "media/upload": "media",
          "statuses/update_with_media": "media[]",
          // Accounts
          "account/update_profile_background_image": "image",
          "account/update_profile_image": "image",
          "account/update_profile_banner": "banner"
        };
        // method might have files?
        if (possible_methods.indexOf(method) === -1) {
          return;
        }

        // check for filenames
        possible_files = possible_files[method].split(" ");

        var multipart_border = "--------------------" + this._nonce();
        var multipart_request = "";
        for (var key in params) {
          if (!params.hasOwnProperty(key)) {
            continue;
          }
          multipart_request += "--" + multipart_border + "\r\nContent-Disposition: form-data; name=\"" + key + "\"";
          if (possible_files.indexOf(key) === -1) {
            multipart_request += "\r\nContent-Transfer-Encoding: base64";
          }
          multipart_request += "\r\n\r\n" + params[key] + "\r\n";
        }
        multipart_request += "--" + multipart_border + "--";
        return multipart_request;
      }

      /**
       * Detects if API call should use media endpoint
       *
       * @param string method The API method to call
       *
       * @return bool Whether the method is defined in media API
       */

    }, {
      key: "_detectMedia",
      value: function _detectMedia(method) {
        var medias = ["media/upload"];
        return medias.indexOf(method) > -1;
      }

      /**
       * Detects if API call should use JSON body
       *
       * @param string method The API method to call
       *
       * @return bool Whether the method is defined as accepting JSON body
       */

    }, {
      key: "_detectJsonBody",
      value: function _detectJsonBody(method) {
        var json_bodies = ["collections/entries/curate"];
        return json_bodies.indexOf(method) > -1;
      }

      /**
       * Builds the complete API endpoint url
       *
       * @param string method The API method to call
       *
       * @return string The URL to send the request to
       */

    }, {
      key: "_getEndpoint",
      value: function _getEndpoint(method) {
        var url = undefined;
        if (method.substring(0, 5) === "oauth") {
          url = this._endpoint_oauth + method;
        } else if (this._detectMedia(method)) {
          url = this._endpoint_media + method + ".json";
        } else if (method === "statuses/oembed") {
          url = this._endpoint_publish + "oembed";
        } else {
          url = this._endpoint + method + ".json";
        }
        return url;
      }

      /**
       * Parses the API reply to encode it in the set return_format
       *
       * @param string reply  The actual reply, JSON-encoded or URL-encoded
       *
       * @return array|object The parsed reply
       */

    }, {
      key: "_parseApiReply",
      value: function _parseApiReply(reply) {
        if (typeof reply !== "string" || reply === "") {
          return {};
        }
        if (reply === "[]") {
          return [];
        }
        var parsed = undefined;
        try {
          parsed = JSON.parse(reply);
        } catch (e) {
          parsed = {};
          // assume query format
          var elements = reply.split("&");
          for (var i = 0; i < elements.length; i++) {
            var element = elements[i].split("=", 2);
            if (element.length > 1) {
              parsed[element[0]] = decodeURIComponent(element[1]);
            } else {
              parsed[element[0]] = null;
            }
          }
        }
        return parsed;
      }

      /**
       * Uncommon API methods
       */

      /**
       * Gets the OAuth authenticate URL for the current request token
       *
       * @return object Promise
       */

    }, {
      key: "oauth_authenticate",
      value: function oauth_authenticate() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var callback = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
        var type = arguments.length <= 2 || arguments[2] === undefined ? "authenticate" : arguments[2];

        var dfd = this._getDfd();
        if (typeof params.force_login === "undefined") {
          params.force_login = null;
        }
        if (typeof params.screen_name === "undefined") {
          params.screen_name = null;
        }
        if (["authenticate", "authorize"].indexOf(type) === -1) {
          type = "authenticate";
        }
        if (this._oauth_token === null) {
          var error = "To get the " + type + " URL, the OAuth token must be set.";
          if (dfd) {
            dfd.reject({ error: error });
            return this._getPromise(dfd);
          }
          throw error;
        }
        var url = this._endpoint_oauth + "oauth/" + type + "?oauth_token=" + this._url(this._oauth_token);
        if (params.force_login === true) {
          url += "&force_login=1";
        }
        if (params.screen_name !== null) {
          url += "&screen_name=" + params.screen_name;
        }
        if (typeof callback === "function") {
          callback(url);
        }
        if (dfd) {
          dfd.resolve({ reply: url });
          return this._getPromise(dfd);
        }
        // no promises
        return true;
      }

      /**
       * Gets the OAuth authorize URL for the current request token
       *
       * @return string The OAuth authorize URL
       */

    }, {
      key: "oauth_authorize",
      value: function oauth_authorize(params, callback) {
        return this.oauth_authenticate(params, callback, "authorize");
      }

      /**
       * Gets the OAuth bearer token
       *
       * @return object Promise
       */

    }, {
      key: "oauth2_token",
      value: function oauth2_token(callback) {
        var _this = this;

        var dfd = this._getDfd();

        if (this._oauth_consumer_key === null) {
          var error = "To obtain a bearer token, the consumer key must be set.";
          if (dfd) {
            dfd.reject({ error: error });
            return this._getPromise(dfd);
          }
          throw error;
        }

        if (!dfd && typeof callback === "undefined") {
          callback = function () {};
        }

        var post_fields = "grant_type=client_credentials";
        var url = this._endpoint_oauth + "oauth2/token";

        if (this._use_proxy) {
          url = url.replace(this._endpoint_base, this._endpoint_proxy);
        }

        var xml = this._getXmlRequestObject();
        if (xml === null) {
          return;
        }
        xml.open("POST", url, true);
        xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xml.setRequestHeader((this._use_proxy ? "X-" : "") + "Authorization", "Basic " + this._base64_encode(this._oauth_consumer_key + ":" + this._oauth_consumer_secret));

        xml.onreadystatechange = function () {
          if (xml.readyState >= 4) {
            var httpstatus = 12027;
            try {
              httpstatus = xml.status;
            } catch (e) {}
            var response = "";
            try {
              response = xml.responseText;
            } catch (e) {}
            var reply = _this._parseApiReply(response);
            reply.httpstatus = httpstatus;
            if (httpstatus === 200) {
              _this.setBearerToken(reply.access_token);
            }
            if (typeof callback === "function") {
              callback(reply);
            }
            if (dfd) {
              dfd.resolve({ reply: reply });
            }
          }
        };
        // function called when an error occurs, including a timeout
        xml.onerror = function (e) {
          if (typeof callback === "function") {
            callback(null, e);
          }
          if (dfd) {
            dfd.reject(e);
          }
        };
        xml.timeout = 30000; // in milliseconds

        xml.send(post_fields);
        if (dfd) {
          return this._getPromise(dfd);
        }
      }

      /**
       * Calls the API using cURL
       *
       * @param string          httpmethod    The HTTP method to use for making the request
       * @param string          method        The API method to call
       * @param array  optional params        The parameters to send along
       * @param bool   optional multipart     Whether to use multipart/form-data
       * @param bool   optional app_only_auth Whether to use app-only bearer authentication
       * @param function        callback      The function to call with the API call result
       *
       * @return mixed The API reply, encoded in the set return_format
       */

    }, {
      key: "_callApi",
      value: function _callApi(httpmethod, method) {
        var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        var multipart = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

        var _this2 = this;

        var app_only_auth = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];
        var callback = arguments.length <= 5 || arguments[5] === undefined ? function () {} : arguments[5];

        var dfd = this._getDfd();

        var url = this._getEndpoint(method),
            authorization = null;

        var xml = this._getXmlRequestObject();
        if (xml === null) {
          return;
        }
        var post_fields = undefined;

        if (httpmethod === "GET") {
          var url_with_params = url;
          if (JSON.stringify(params) !== "{}") {
            url_with_params += "?" + this._http_build_query(params);
          }
          if (!app_only_auth) {
            authorization = this._sign(httpmethod, url, params);
          }

          if (this._use_proxy) {
            url_with_params = url_with_params.replace(this._endpoint_base, this._endpoint_proxy).replace(this._endpoint_base_media, this._endpoint_proxy);
          }
          xml.open(httpmethod, url_with_params, true);
        } else {
          if (multipart) {
            if (!app_only_auth) {
              authorization = this._sign(httpmethod, url, {});
            }
            params = this._buildMultipart(method, params);
          } else if (this._detectJsonBody(method)) {
            authorization = this._sign(httpmethod, url, {});
            params = JSON.stringify(params);
          } else {
            if (!app_only_auth) {
              authorization = this._sign(httpmethod, url, params);
            }
            params = this._http_build_query(params);
          }
          post_fields = params;
          if (this._use_proxy || multipart) {
            // force proxy for multipart base64
            url = url.replace(this._endpoint_base, this._endpoint_proxy).replace(this._endpoint_base_media, this._endpoint_proxy);
          }
          xml.open(httpmethod, url, true);
          if (multipart) {
            xml.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + post_fields.split("\r\n")[0].substring(2));
          } else if (this._detectJsonBody(method)) {
            xml.setRequestHeader("Content-Type", "application/json");
          } else {
            xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          }
        }
        if (app_only_auth) {
          if (this._oauth_consumer_key === null && this._oauth_bearer_token === null) {
            var error = "To make an app-only auth API request, consumer key or bearer token must be set.";
            if (dfd) {
              dfd.reject({ error: error });
              return this._getPromise(dfd);
            }
            throw error;
          }
          // automatically fetch bearer token, if necessary
          if (this._oauth_bearer_token === null) {
            if (dfd) {
              return this.oauth2_token().then(function () {
                return _this2._callApi(httpmethod, method, params, multipart, app_only_auth, callback);
              });
            }
            this.oauth2_token(function () {
              _this2._callApi(httpmethod, method, params, multipart, app_only_auth, callback);
            });
            return;
          }
          authorization = "Bearer " + this._oauth_bearer_token;
        }
        if (authorization !== null) {
          xml.setRequestHeader((this._use_proxy ? "X-" : "") + "Authorization", authorization);
        }
        xml.onreadystatechange = function () {
          if (xml.readyState >= 4) {
            var httpstatus = 12027;
            try {
              httpstatus = xml.status;
            } catch (e) {}
            var response = "";
            try {
              response = xml.responseText;
            } catch (e) {}
            var reply = _this2._parseApiReply(response);
            reply.httpstatus = httpstatus;
            var rate = null;
            if (typeof xml.getResponseHeader !== "undefined" && xml.getResponseHeader("x-rate-limit-limit") !== "") {
              rate = {
                limit: xml.getResponseHeader("x-rate-limit-limit"),
                remaining: xml.getResponseHeader("x-rate-limit-remaining"),
                reset: xml.getResponseHeader("x-rate-limit-reset")
              };
            }
            if (typeof callback === "function") {
              callback(reply, rate);
            }
            if (dfd) {
              dfd.resolve({ reply: reply, rate: rate });
            }
          }
        };
        // function called when an error occurs, including a timeout
        xml.onerror = function (e) {
          if (typeof callback === "function") {
            callback(null, null, e);
          }
          if (dfd) {
            dfd.reject(e);
          }
        };
        xml.timeout = 30000; // in milliseconds

        xml.send(httpmethod === "GET" ? null : post_fields);
        if (dfd) {
          return this._getPromise(dfd);
        }
        return true;
      }

      /**
       * Main API handler working on any requests you issue
       *
       * @param string   fn            The member function you called
       * @param array    params        The parameters you sent along
       * @param function callback      The callback to call with the reply
       * @param bool     app_only_auth Whether to use app-only auth
       *
       * @return object Promise
       */

    }, {
      key: "__call",
      value: function __call(fn) {
        var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var callback = arguments[2];
        var app_only_auth = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

        if (typeof callback !== "function" && typeof params === "function") {
          callback = params;
          params = {};
          if (typeof callback === "boolean") {
            app_only_auth = callback;
          }
        } else if (typeof callback === "undefined") {
          callback = function () {};
        }
        switch (fn) {
          case "oauth_authenticate":
          case "oauth_authorize":
            return this[fn](params, callback);

          case "oauth2_token":
            return this[fn](callback);
        }

        // parse parameters
        var apiparams = this._parseApiParams(params);

        // stringify null and boolean parameters
        apiparams = this._stringifyNullBoolParams(apiparams);

        // reset token when requesting a new token (causes 401 for signature error on 2nd+ requests)
        if (fn === "oauth_requestToken") {
          this.setToken(null, null);
        }

        // map function name to API method

        var _mapFnToApiMethod2 = this._mapFnToApiMethod(fn, apiparams);

        var _mapFnToApiMethod3 = _slicedToArray(_mapFnToApiMethod2, 2);

        var method = _mapFnToApiMethod3[0];
        var method_template = _mapFnToApiMethod3[1];
        var httpmethod = this._detectMethod(method_template, apiparams);
        var multipart = this._detectMultipart(method_template);

        return this._callApi(httpmethod, method, apiparams, multipart, app_only_auth, callback);
      }
    }]);

    return Codebird;
  })();

  ;

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module && _typeof(module.exports) === "object") {
    // Expose codebird as module.exports in loaders that implement the Node
    // module pattern (including browserify). Do not create the global, since
    // the user will be storing it themselves locally, and globals are frowned
    // upon in the Node module world.
    module.exports = Codebird;
  } else {
    // Otherwise expose codebird to the global object as usual
    if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && window) {
      window.Codebird = Codebird;
    }

    // Register as a named AMD module, since codebird can be concatenated with other
    // files that may use define, but not via a proper concatenation script that
    // understands anonymous AMD modules. A named AMD is safest and most robust
    // way to register. Lowercase codebird is used because AMD module names are
    // derived from file names, and codebird is normally delivered in a lowercase
    // file name. Do this after creating the global so that if an AMD module wants
    // to call noConflict to hide this version of codebird, it will work.
    if (typeof define === "function" && define.amd) {
      define("codebird", [], function () {
        return Codebird;
      });
    }
  }
})();
/* Laura Doktorova https://github.com/olado/doT */
!function(){"use strict";function e(n,t,r){return("string"==typeof t?t:t.toString()).replace(n.define||a,function(e,t,o,a){return 0===t.indexOf("def.")&&(t=t.substring(4)),t in r||(":"===o?(n.defineParams&&a.replace(n.defineParams,function(e,n,o){r[t]={arg:n,text:o}}),t in r||(r[t]=a)):new Function("def","def['"+t+"']="+a)(r)),""}).replace(n.use||a,function(t,o){n.useParams&&(o=o.replace(n.useParams,function(e,n,t,o){if(r[t]&&r[t].arg&&o){var a=(t+":"+o).replace(/'|\\/g,"_");return r.__exp=r.__exp||{},r.__exp[a]=r[t].text.replace(new RegExp("(^|[^\\w$])"+r[t].arg+"([^\\w$])","g"),"$1"+o+"$2"),n+"def.__exp['"+a+"']"}}));var a=new Function("def","return "+o)(r);return a?e(n,a,r):a})}function n(e){return e.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}var t,r={engine:"doT",version:"1.1.1",templateSettings:{evaluate:/\{\{([\s\S]+?(\}?)+)\}\}/g,interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:"it",strip:!0,append:!0,selfcontained:!1,doNotSkipEncoded:!1},template:void 0,compile:void 0,log:!0};r.encodeHTMLSource=function(e){var n={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},t=e?/[&<>"'\/]/g:/&(?!#?\w+;)|<|>|"|'|\//g;return function(e){return e?e.toString().replace(t,function(e){return n[e]||e}):""}},t=function(){return this||(0,eval)("this")}(),"undefined"!=typeof module&&module.exports?module.exports=r:"function"==typeof define&&define.amd?define(function(){return r}):t.doT=r;var o={append:{start:"'+(",end:")+'",startencode:"'+encodeHTML("},split:{start:"';out+=(",end:");out+='",startencode:"';out+=encodeHTML("}},a=/$^/;r.template=function(c,i,u){i=i||r.templateSettings;var d,s,p=i.append?o.append:o.split,l=0,f=i.use||i.define?e(i,c,u||{}):c;f=("var out='"+(i.strip?f.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):f).replace(/'|\\/g,"\\$&").replace(i.interpolate||a,function(e,t){return p.start+n(t)+p.end}).replace(i.encode||a,function(e,t){return d=!0,p.startencode+n(t)+p.end}).replace(i.conditional||a,function(e,t,r){return t?r?"';}else if("+n(r)+"){out+='":"';}else{out+='":r?"';if("+n(r)+"){out+='":"';}out+='"}).replace(i.iterate||a,function(e,t,r,o){return t?(l+=1,s=o||"i"+l,t=n(t),"';var arr"+l+"="+t+";if(arr"+l+"){var "+r+","+s+"=-1,l"+l+"=arr"+l+".length-1;while("+s+"<l"+l+"){"+r+"=arr"+l+"["+s+"+=1];out+='"):"';} } out+='"}).replace(i.evaluate||a,function(e,t){return"';"+n(t)+"out+='"})+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,""),d&&(i.selfcontained||!t||t._encodeHTML||(t._encodeHTML=r.encodeHTMLSource(i.doNotSkipEncoded)),f="var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : ("+r.encodeHTMLSource.toString()+"("+(i.doNotSkipEncoded||"")+"));"+f);try{return new Function(i.varname,f)}catch(e){throw"undefined"!=typeof console&&console.log("Could not create a template function: "+f),e}},r.compile=function(e,n){return r.template(e,null,n)}}();
if (typeof Object.create !== 'function') {
    Object.create = function(obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}

(function($, window, document, undefined) {
    $.fn.socialfeed = function(_options) {


        var defaults = {
            plugin_folder: '', // a folder in which the plugin is located (with a slash in the end)
            template: 'template.html', // a path to the template file
            show_media: false, // show images of attachments if available
            media_min_width: 300,
            length: 500, // maximum length of post message shown
            date_format: 'll',
            date_locale: 'en'
        };
        //---------------------------------------------------------------------------------
        var options = $.extend(defaults, _options),
            container = $(this),
            template,
            social_networks = ['facebook', 'instagram', 'vk', 'google', 'blogspot', 'twitter', 'pinterest', 'rss'],
            posts_to_load_count = 0,
            loaded_post_count = 0;
        // container.empty().css('display', 'block');
        //---------------------------------------------------------------------------------

        //---------------------------------------------------------------------------------
        // This function performs consequent data loading from all of the sources by calling corresponding functions
        function calculatePostsToLoadCount() {
            social_networks.forEach(function(network) {
                if (options[network]) {
                    if (options[network].accounts) {
                        posts_to_load_count += options[network].limit * options[network].accounts.length;
                    } else if (options[network].urls ){
                        posts_to_load_count += options[network].limit * options[network].urls.length;
                    } else {
                        posts_to_load_count += options[network].limit;
                    }
                }
            });
        }

        calculatePostsToLoadCount();

        function fireCallback() {
            var fire = true;
            /*$.each(Object.keys(loaded), function() {
                if (loaded[this] > 0)
                    fire = false;
            });*/
            if (fire && options.callback) {
                options.callback();
            }
        }

        var Utility = {
            request: function(url, callback) {
                $.ajax({
                    url: url,
                    dataType: 'jsonp',
                    success: callback
                });
            },
            get_request: function(url, callback) {
                $.get(url, callback, 'json');
            },
            wrapLinks: function(string, social_network) {
                var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
                if (social_network === 'google-plus') {
                    string = string.replace(/(@|#)([a-z0-9_]+['])/ig, Utility.wrapGoogleplusTagTemplate);
                } else {
                    string = string.replace(exp, Utility.wrapLinkTemplate);
                }
                return string;
            },
            wrapLinkTemplate: function(string) {
                return '<a target="_blank" href="' + string + '">' + string + '<\/a>';
            },
            wrapGoogleplusTagTemplate: function(string) {
                return '<a target="_blank" href="https://plus.google.com/s/' + string + '" >' + string + '<\/a>';
            },
            shorten: function(string) {
                string = $.trim(string);
                if (string.length > options.length) {
                    return jQuery.trim(string).substring(0, options.length).split(" ").slice(0, -1).join(" ") + "...";
                } else {
                    return string;
                }
            },
            stripHTML: function(string) {
                if (typeof string === "undefined" || string === null) {
                    return '';
                }
                return string.replace(/(<([^>]+)>)|nbsp;|\s{2,}|/ig, "");
            }
        };

        function SocialFeedPost(social_network, data) {
            this.content = data;
            this.content.social_network = social_network;
            this.content.attachment = (this.content.attachment === undefined) ? '' : this.content.attachment;
            this.content.time_ago = data.dt_create.locale(options.date_locale).fromNow();
            this.content.date = data.dt_create.locale(options.date_locale).format(options.date_format);
            this.content.dt_create = this.content.dt_create.valueOf();
            this.content.text = Utility.wrapLinks(Utility.shorten(data.message + ' ' + data.description), data.social_network);
            this.content.moderation_passed = (options.moderation) ? options.moderation(this.content) : true;

            Feed[social_network].posts.push(this);
        }
        SocialFeedPost.prototype = {
            render: function() {
                var rendered_html = Feed.template(this.content);
                var data = this.content;

                if ($(container).children('[social-feed-id=' + data.id + ']').length !== 0) {
                    return false;
                }
                if ($(container).children().length === 0) {
                    $(container).append(rendered_html);
                } else {
                    var i = 0,
                        insert_index = -1;
                    $.each($(container).children(), function() {
                        if ($(this).attr('dt-create') < data.dt_create) {
                            insert_index = i;
                            return false;
                        }
                        i++;
                    });
                    $(container).append(rendered_html);
                    if (insert_index >= 0) {
                        insert_index++;
                        var before = $(container).children('div:nth-child(' + insert_index + ')'),
                            current = $(container).children('div:last-child');
                        $(current).insertBefore(before);
                    }

                }
                if (options.media_min_width) {

                    var query = '[social-feed-id=' + data.id + '] img.attachment';
                    var image = $(query);

                    // preload the image
                    var height, width = '';
                    var img = new Image();
                    var imgSrc = image.attr("src");

                    $(img).load(function() {

                        if (img.width < options.media_min_width) {
                            image.hide();
                        }
                        // garbage collect img
                        delete img;

                    }).error(function() {
                        // image couldnt be loaded
                        image.hide();

                    }).attr({
                        src: imgSrc
                    });

                }

                loaded_post_count++;
                if (loaded_post_count == posts_to_load_count) {
                    fireCallback();
                }

            }

        };

        var Feed = {
            template: false,
            init: function() {
                Feed.getTemplate(function() {
                    social_networks.forEach(function(network) {
                        if (options[network]) {
                            if ( options[network].accounts ) {
                                //loaded[network] = 0;
                                options[network].accounts.forEach(function(account) {
                                    //loaded[network]++;
                                    Feed[network].getData(account);
                                });
                            } else if ( options[network].urls ) {
                                options[network].urls.forEach(function(url) {
                                    Feed[network].getData(url);
                                });
                            } else {
                                Feed[network].getData();
                            }
                        }
                    });
                });
            },
            getTemplate: function(callback) {
                if (Feed.template)
                    return callback();
                else {
                    if (options.template_html) {
                        Feed.template = doT.template(options.template_html);
                        return callback();
                    } else {
                        $.get(options.template, function(template_html) {
                            Feed.template = doT.template(template_html);
                            return callback();
                        });
                    }
                }
            },
            twitter: {
                posts: [],
                loaded: false,
                api: 'http://api.tweecool.com/',

                getData: function(account) {

                    var cb = new Codebird();
                    cb.setConsumerKey(options.twitter.consumer_key, options.twitter.consumer_secret);

                    // Allow setting your own proxy with Codebird
                    if (options.twitter.proxy !== undefined) {
                        cb.setProxy(options.twitter.proxy);
                    }

                    switch (account[0]) {
                        case '@':
                            var userid = account.substr(1);
                            cb.__call(
                                "statuses_userTimeline",
                                "id=" + userid + "&count=" + options.twitter.limit,
                                Feed.twitter.utility.getPosts,
                                true // this parameter required
                            );
                            break;
                        case '#':
                            var hashtag = account.substr(1);
                            cb.__call(
                                "search_tweets",
                                "q=" + hashtag + "&count=" + options.twitter.limit,
                                function(reply) {
                                    Feed.twitter.utility.getPosts(reply.statuses);
                                },
                                true // this parameter required
                            );
                            break;
                        default:
                    }
                },
                utility: {
                    getPosts: function(json) {
                        if (json) {
                            $.each(json, function() {
                                var element = this;
                                var post = new SocialFeedPost('twitter', Feed.twitter.utility.unifyPostData(element));
                                post.render();
                            });
                        }
                    },
                    unifyPostData: function(element) {
                        var post = {};
                        if (element.id) {
                            post.id = element.id_str;
                            //prevent a moment.js console warning due to Twitter's poor date format.
                            post.dt_create = moment(element.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY');
                            post.author_link = 'http://twitter.com/' + element.user.screen_name;
                            post.author_picture = element.user.profile_image_url_https;
                            post.post_url = post.author_link + '/status/' + element.id_str;
                            post.author_name = element.user.name;
                            post.message = element.text;
                            post.description = '';
                            post.link = 'http://twitter.com/' + element.user.screen_name + '/status/' + element.id_str;

                            if (options.show_media === true) {
                                if (element.entities.media && element.entities.media.length > 0) {
                                    var image_url = element.entities.media[0].media_url_https;
                                    if (image_url) {
                                        post.attachment = '<img class="attachment" src="' + image_url + '" />';
                                    }
                                }
                            }
                        }
                        return post;
                    }
                }
            },
            facebook: {
                posts: [],
                graph: 'https://graph.facebook.com/',
                loaded: false,
                getData: function(account) {
                    var proceed = function(request_url){
                        Utility.request(request_url, Feed.facebook.utility.getPosts);
                    };
                    var fields = '?fields=id,from,name,message,created_time,story,description,link';
                       fields += (options.show_media === true)?',picture,object_id':'';
                    var request_url, limit = '&limit=' + options.facebook.limit,
                        query_extention = '&access_token=' + options.facebook.access_token + '&callback=?';
                    switch (account[0]) {
                        case '@':
                            var username = account.substr(1);
                            Feed.facebook.utility.getUserId(username, function(userdata) {
                                if (userdata.id !== '') {
                                    request_url = Feed.facebook.graph + 'v2.4/' + userdata.id + '/posts'+ fields + limit + query_extention;
                                    proceed(request_url);
                                }
                            });
                            break;
                        case '!':
                            var page = account.substr(1);
                            request_url = Feed.facebook.graph + 'v2.4/' + page + '/feed'+ fields + limit + query_extention;
                            proceed(request_url);
                            break;
                        default:
                            proceed(request_url);
                    }
                },
                utility: {
                    getUserId: function(username, callback) {
                        var query_extention = '&access_token=' + options.facebook.access_token + '&callback=?';
                        var url = 'https://graph.facebook.com/' + username + '?' + query_extention;
                        var result = '';
                        $.get(url, callback, 'json');
                    },
                    prepareAttachment: function(element) {
                        var image_url = element.picture;
                        if (image_url.indexOf('_b.') !== -1) {
                            //do nothing it is already big
                        } else if (image_url.indexOf('safe_image.php') !== -1) {
                            image_url = Feed.facebook.utility.getExternalImageURL(image_url, 'url');

                        } else if (image_url.indexOf('app_full_proxy.php') !== -1) {
                            image_url = Feed.facebook.utility.getExternalImageURL(image_url, 'src');

                        } else if (element.object_id) {
                            image_url = Feed.facebook.graph + element.object_id + '/picture/?type=normal';
                        }
                        return '<img class="attachment" src="' + image_url + '" />';
                    },
                    getExternalImageURL: function(image_url, parameter) {
                        image_url = decodeURIComponent(image_url).split(parameter + '=')[1];
                        if (image_url.indexOf('fbcdn-sphotos') === -1) {
                            return image_url.split('&')[0];
                        } else {
                            return image_url;
                        }

                    },
                    getPosts: function(json) {
                        if (json['data']) {
                            json['data'].forEach(function(element) {
                                var post = new SocialFeedPost('facebook', Feed.facebook.utility.unifyPostData(element));
                                post.render();
                            });
                        }
                    },
                    unifyPostData: function(element) {
                        var post = {},
                            text = (element.message) ? element.message : element.story;

                        post.id = element.id;
                        post.dt_create = moment(element.created_time);
                        post.author_link = 'http://facebook.com/' + element.from.id;
                        post.author_picture = Feed.facebook.graph + element.from.id + '/picture';
                        post.author_name = element.from.name;
                        post.name = element.name || "";
                        post.message = (text) ? text : '';
                        post.description = (element.description) ? element.description : '';
                        post.link = (element.link) ? element.link : 'http://facebook.com/' + element.from.id;

                        if (options.show_media === true) {
                            if (element.picture) {
                                var attachment = Feed.facebook.utility.prepareAttachment(element);
                                if (attachment) {
                                    post.attachment = attachment;
                                }
                            }
                        }
                        return post;
                    }
                }
            },
            google: {
                posts: [],
                loaded: false,
                api: 'https://www.googleapis.com/plus/v1/',
                getData: function(account) {
                    var request_url;
                    switch (account[0]) {
                        case '#':
                            var hashtag = account.substr(1);
                            request_url = Feed.google.api + 'activities?query=' + hashtag + '&key=' + options.google.access_token + '&maxResults=' + options.google.limit;
                            Utility.get_request(request_url, Feed.google.utility.getPosts);
                            break;
                        case '@':
                            var username = account.substr(1);
                            request_url = Feed.google.api + 'people/' + username + '/activities/public?key=' + options.google.access_token + '&maxResults=' + options.google.limit;
                            Utility.get_request(request_url, Feed.google.utility.getPosts);
                            break;
                        default:
                    }
                },
                utility: {
                    getPosts: function(json) {
                        if (json.items) {
                            $.each(json.items, function(i) {
                                var post = new SocialFeedPost('google', Feed.google.utility.unifyPostData(json.items[i]));
                                post.render();
                            });
                        }
                    },
                    unifyPostData: function(element) {
                        var post = {};

                        post.id = element.id;
                        post.attachment = '';
                        post.description = '';
                        post.dt_create = moment(element.published);
                        post.author_link = element.actor.url;
                        post.author_picture = element.actor.image.url;
                        post.author_name = element.actor.displayName;

                        if (options.show_media === true) {
                            if (element.object.attachments) {
                                $.each(element.object.attachments, function() {
                                    var image = '';
                                    if (this.fullImage) {
                                        image = this.fullImage.url;
                                    } else {
                                        if (this.objectType === 'album') {
                                            if (this.thumbnails && this.thumbnails.length > 0) {
                                                if (this.thumbnails[0].image) {
                                                    image = this.thumbnails[0].image.url;
                                                }
                                            }
                                        }
                                    }
                                    post.attachment = '<img class="attachment" src="' + image + '"/>';
                                });
                            }
                        }
                        post.message = element.title;
                        post.link = element.url;

                        return post;
                    }
                }
            },
            instagram: {
                posts: [],
                api: 'https://api.instagram.com/v1/',
                loaded: false,
                accessType: function() {
                    // If we have both the client_id and access_token set in options,
                    // use access_token for authentication. If client_id is not set
                    // then use access_token. If neither are set, log an error to console.
                    if (typeof options.instagram.access_token === 'undefined' && typeof options.instagram.client_id === 'undefined') {
                        console.log('You need to define a client_id or access_token to authenticate with Instagram\'s API.');
                        return undefined;
                    }
                    if (options.instagram.access_token) { options.instagram.client_id = undefined; }
                    options.instagram.access_type = (typeof options.instagram.client_id === 'undefined' ? 'access_token' : 'client_id');
                    return options.instagram.access_type;
                },
                getData: function(account) {
                    var url;

                    // API endpoint URL depends on which authentication type we're using.
                    if (this.accessType() !== 'undefined') {
                        var authTokenParams = options.instagram.access_type + '=' + options.instagram[options.instagram.access_type];
                    }

                    switch (account[0]) {
                        case '@':
                            var username = account.substr(1);
                            url = Feed.instagram.api + 'users/search/?q=' + username + '&' + authTokenParams + '&count=1' + '&callback=?';
                            Utility.request(url, Feed.instagram.utility.getUsers);
                            break;
                        case '#':
                            var hashtag = account.substr(1);
                            url = Feed.instagram.api + 'tags/' + hashtag + '/media/recent/?' + authTokenParams + '&' + 'count=' + options.instagram.limit + '&callback=?';
                            Utility.request(url, Feed.instagram.utility.getImages);
                            break;
                        case '&':
                            var id = account.substr(1);
                            url = Feed.instagram.api + 'users/' + id + '/?' + authTokenParams + '&' + 'count=' + options.instagram.limit + '&callback=?';
                            Utility.request(url, Feed.instagram.utility.getUsers);
                        default:
                    }
                },
                utility: {
                    getImages: function(json) {
                        if (json.data) {
                            json.data.forEach(function(element) {
                                var post = new SocialFeedPost('instagram', Feed.instagram.utility.unifyPostData(element));
                                post.render();
                            });
                        }
                    },
                    getUsers: function(json) {
                        // API endpoint URL depends on which authentication type we're using.
                        if (options.instagram.access_type !== 'undefined') {
                            var authTokenParams = options.instagram.access_type + '=' + options.instagram[options.instagram.access_type];
                        }

                        if (!jQuery.isArray(json.data)) json.data = [json.data]
                        json.data.forEach(function(user) {
                            var url = Feed.instagram.api + 'users/' + user.id + '/media/recent/?' + authTokenParams + '&' + 'count=' + options.instagram.limit + '&callback=?';
                            Utility.request(url, Feed.instagram.utility.getImages);
                        });
                    },
                    unifyPostData: function(element) {
                        var post = {};

                        post.id = element.id;
                        post.dt_create = moment(element.created_time * 1000);
                        post.author_link = 'http://instagram.com/' + element.user.username;
                        post.author_picture = element.user.profile_picture;
                        post.author_name = element.user.full_name || element.user.username;
                        post.message = (element.caption && element.caption) ? element.caption.text : '';
                        post.description = '';
                        post.link = element.link;
                        if (options.show_media) {
                            post.attachment = '<img class="attachment" src="' + element.images.standard_resolution.url + '' + '" />';
                        }
                        return post;
                    }
                }
            },
            vk: {
                posts: [],
                loaded: false,
                base: 'http://vk.com/',
                api: 'https://api.vk.com/method/',
                user_json_template: 'https://api.vk.com/method/' + 'users.get?fields=first_name,%20last_name,%20screen_name,%20photo&uid=',
                group_json_template: 'https://api.vk.com/method/' + 'groups.getById?fields=first_name,%20last_name,%20screen_name,%20photo&gid=',
                getData: function(account) {
                    var request_url;

                    switch (account[0]) {
                        case '@':
                            var username = account.substr(1);
                            request_url = Feed.vk.api + 'wall.get?owner_id=' + username + '&filter=' + options.vk.source + '&count=' + options.vk.limit + '&callback=?';
                            Utility.get_request(request_url, Feed.vk.utility.getPosts);
                            break;
                        case '#':
                            var hashtag = account.substr(1);
                            request_url = Feed.vk.api + 'newsfeed.search?q=' + hashtag + '&count=' + options.vk.limit + '&callback=?';
                            Utility.get_request(request_url, Feed.vk.utility.getPosts);
                            break;
                        default:
                    }
                },
                utility: {
                    getPosts: function(json) {
                        if (json.response) {
                            $.each(json.response, function() {
                                if (this != parseInt(this) && this.post_type === 'post') {
                                    var owner_id = (this.owner_id) ? this.owner_id : this.from_id,
                                        vk_wall_owner_url = (owner_id > 0) ? (Feed.vk.user_json_template + owner_id + '&callback=?') : (Feed.vk.group_json_template + (-1) * owner_id + '&callback=?'),
                                        element = this;
                                    Utility.get_request(vk_wall_owner_url, function(wall_owner) {
                                        Feed.vk.utility.unifyPostData(wall_owner, element, json);
                                    });
                                }
                            });
                        }
                    },
                    unifyPostData: function(wall_owner, element, json) {
                        var post = {};

                        post.id = element.id;
                        post.dt_create = moment.unix(element.date);
                        post.description = ' ';
                        post.message = Utility.stripHTML(element.text);
                        if (options.show_media) {
                            if (element.attachment) {
                                if (element.attachment.type === 'link')
                                    post.attachment = '<img class="attachment" src="' + element.attachment.link.image_src + '" />';
                                if (element.attachment.type === 'video')
                                    post.attachment = '<img class="attachment" src="' + element.attachment.video.image_big + '" />';
                                if (element.attachment.type === 'photo')
                                    post.attachment = '<img class="attachment" src="' + element.attachment.photo.src_big + '" />';
                            }
                        }

                        if (element.from_id > 0) {
                            var vk_user_json = Feed.vk.user_json_template + element.from_id + '&callback=?';
                            Utility.get_request(vk_user_json, function(user_json) {
                                var vk_post = new SocialFeedPost('vk', Feed.vk.utility.getUser(user_json, post, element, json));
                                vk_post.render();
                            });

                        } else {
                            var vk_group_json = Feed.vk.group_json_template + (-1) * element.from_id + '&callback=?';
                            Utility.get_request(vk_group_json, function(user_json) {
                                var vk_post = new SocialFeedPost('vk', Feed.vk.utility.getGroup(user_json, post, element, json));
                                vk_post.render();
                            });
                        }
                    },
                    getUser: function(user_json, post, element, json) {
                        post.author_name = user_json.response[0].first_name + ' ' + user_json.response[0].last_name;
                        post.author_picture = user_json.response[0].photo;
                        post.author_link = Feed.vk.base + user_json.response[0].screen_name;
                        post.link = Feed.vk.base + user_json.response[0].screen_name + '?w=wall' + element.from_id + '_' + element.id;

                        return post;
                    },
                    getGroup: function(user_json, post, element, json) {
                        post.author_name = user_json.response[0].name;
                        post.author_picture = user_json.response[0].photo;
                        post.author_link = Feed.vk.base + user_json.response[0].screen_name;
                        post.link = Feed.vk.base + user_json.response[0].screen_name + '?w=wall-' + user_json.response[0].gid + '_' + element.id;

                        return post;
                    }
                }
            },
            blogspot: {
                loaded: false,
                getData: function(account) {
                    var url;

                    switch (account[0]) {
                        case '@':
                            var username = account.substr(1);
                            url = 'http://' + username + '.blogspot.com/feeds/posts/default?alt=json-in-script&callback=?';
                            request(url, getPosts);
                            break;
                        default:
                    }
                },
                utility: {
                    getPosts: function(json) {
                        $.each(json.feed.entry, function() {
                            var post = {},
                                element = this;
                            post.id = element.id['$t'].replace(/[^a-z0-9]/gi, '');
                            post.dt_create = moment((element.published['$t']));
                            post.author_link = element.author[0]['uri']['$t'];
                            post.author_picture = 'http:' + element.author[0]['gd$image']['src'];
                            post.author_name = element.author[0]['name']['$t'];
                            post.message = element.title['$t'] + '</br></br>' + stripHTML(element.content['$t']);
                            post.description = '';
                            post.link = element.link.pop().href;

                            if (options.show_media) {
                                if (element['media$thumbnail']) {
                                    post.attachment = '<img class="attachment" src="' + element['media$thumbnail']['url'] + '" />';
                                }
                            }

                            post.render();

                        });
                    }
                }
            },
            pinterest: {
                posts: [],
                loaded: false,
                apiv1: 'https://api.pinterest.com/v1/',

                getData: function(account) {
                    var request_url,
                      limit = 'limit=' + options.pinterest.limit,
                      fields = 'fields=id,created_at,link,note,creator(url,first_name,last_name,image),image',
                      query_extention = fields + '&access_token=' + options.pinterest.access_token + '&' + limit + '&callback=?';
                    switch (account[0]) {
                        case '@':
                            var username = account.substr(1);
                            if (username === 'me') {
                                request_url = Feed.pinterest.apiv1 + 'me/pins/?' + query_extention;
                            } else {
                                request_url = Feed.pinterest.apiv1 + 'boards/' + username + '/pins?' + query_extention;
                            }
                            break;
                        default:
                    }
                    Utility.request(request_url, Feed.pinterest.utility.getPosts);
                },
                utility: {

                    getPosts: function(json) {
                        json.data.forEach(function(element) {
                            var post = new SocialFeedPost('pinterest', Feed.pinterest.utility.unifyPostData(element));
                            post.render();
                        });
                    },

                    unifyPostData: function(element){
                        var post = {};

                        post.id = element.id;
                        post.dt_create= moment(element.created_at);
                        post.author_link = element.creator.url;
                        post.author_picture = element.creator.image['60x60' ].url;
                        post.author_name =  element.creator.first_name + element.creator.last_name;
                        post.message = element.note;
                        post.description = '';
                        post.social_network = 'pinterest';
                        post.link = element.link ? element.link : 'https://www.pinterest.com/pin/' + element.id;
                        if (options.show_media) {
                            post.attachment = '<img class="attachment" src="' + element.image['original'].url + '" />';
                        }
                        return post;
                    }
                }
            },
            rss : {
                posts: [],
                loaded: false,
                api : 'https://query.yahooapis.com/v1/public/yql?q=',
                datatype: 'json',

                getData: function(url) {
                    var limit = options.rss.limit,
                      yql = encodeURIComponent('select entry FROM feednormalizer where url=\'' + url + '\' AND output=\'atom_1.0\' | truncate(count=' + limit + ')' ),
                      request_url = Feed.rss.api + yql + '&format=json&callback=?';

                    Utility.request(request_url, Feed.rss.utility.getPosts, Feed.rss.datatype);
                },
                utility: {

                    getPosts: function(json) {
                        console.log(json);
                        if (json.query.count > 0 ){
                            $.each(json.query.results.feed, function(index, element) {
                                var post = new SocialFeedPost('rss', Feed.rss.utility.unifyPostData(index, element));
                                post.render();
                            });
                        }
                    },

                    unifyPostData: function(index, element){

                        var item = element;

                        if ( element.entry !== undefined ){
                            item = element.entry;
                        }
                        var post = {};

                        post.id = '"' + item.id + '"';
                        post.dt_create= moment(item.published, 'YYYY-MM-DDTHH:mm:ssZ', 'en');

                        post.author_link = '';
                        post.author_picture = '';
                        post.author_name = '';
                        if( item.creator !== undefined ){
                            post.author_name = item.creator;
                        }
                        post.message = item.title;
                        post.description = '';
                        if( item.summary !== undefined ){
                            post.description = Utility.stripHTML(item.summary.content);
                        }
                        post.social_network = 'rss';
                        post.link = item.link.href;
                        if (options.show_media && item.thumbnail !== undefined ) {
                            post.attachment = '<img class="attachment" src="' + item.thumbnail.url + '" />';
                        }
                        return post;
                    }
                }
            }
        };

        //make the plugin chainable
        return this.each(function() {
            // Initialization
            Feed.init();
            if (options.update_period) {
                setInterval(function() {
                    return Feed.init();
                }, options.update_period);
            }
        })
    };

})(jQuery);
//! moment.js
//! version : 2.19.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

var hookCallback;

function hooks () {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback (callback) {
    hookCallback = callback;
}

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}

function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
        return (Object.getOwnPropertyNames(obj).length === 0);
    } else {
        var k;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
}

function isUndefined(input) {
    return input === void 0;
}

function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}

function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}

function map(arr, fn) {
    var res = [], i;
    for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
    }
    return res;
}

function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}

function extend(a, b) {
    for (var i in b) {
        if (hasOwnProp(b, i)) {
            a[i] = b[i];
        }
    }

    if (hasOwnProp(b, 'toString')) {
        a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
        a.valueOf = b.valueOf;
    }

    return a;
}

function createUTC (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
}

function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty           : false,
        unusedTokens    : [],
        unusedInput     : [],
        overflow        : -2,
        charsLeftOver   : 0,
        nullInput       : false,
        invalidMonth    : null,
        invalidFormat   : false,
        userInvalidated : false,
        iso             : false,
        parsedDateParts : [],
        meridiem        : null,
        rfc2822         : false,
        weekdayMismatch : false
    };
}

function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}

var some;
if (Array.prototype.some) {
    some = Array.prototype.some;
} else {
    some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

function isValid(m) {
    if (m._isValid == null) {
        var flags = getParsingFlags(m);
        var parsedParts = some.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) &&
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.weekdayMismatch &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));

        if (m._strict) {
            isNowValid = isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
    }
    return m._isValid;
}

function createInvalid (flags) {
    var m = createUTC(NaN);
    if (flags != null) {
        extend(getParsingFlags(m), flags);
    }
    else {
        getParsingFlags(m).userInvalidated = true;
    }

    return m;
}

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = hooks.momentProperties = [];

function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
        to._i = from._i;
    }
    if (!isUndefined(from._f)) {
        to._f = from._f;
    }
    if (!isUndefined(from._l)) {
        to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
        to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
        to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) {
                to[prop] = val;
            }
        }
    }

    return to;
}

var updateInProgress = false;

// Moment prototype object
function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
        this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
    }
}

function isMoment (obj) {
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}

function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }

    return value;
}

// compare two arrays, return the number of differences
function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
    for (i = 0; i < len; i++) {
        if ((dontConvert && array1[i] !== array2[i]) ||
            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
}

function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;

    return extend(function () {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = '';
                if (typeof arguments[i] === 'object') {
                    arg += '\n[' + i + '] ';
                    for (var key in arguments[0]) {
                        arg += key + ': ' + arguments[0][key] + ', ';
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                } else {
                    arg = arguments[i];
                }
                args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

function set (config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if (isFunction(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
}

function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig), prop;
    for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    for (prop in parentConfig) {
        if (hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])) {
            // make sure changes to properties don't modify parent config
            res[prop] = extend({}, res[prop]);
        }
    }
    return res;
}

function Locale(config) {
    if (config != null) {
        this.set(config);
    }
}

var keys;

if (Object.keys) {
    keys = Object.keys;
} else {
    keys = function (obj) {
        var i, res = [];
        for (i in obj) {
            if (hasOwnProp(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}

var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};

function calendar (key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
}

var defaultLongDateFormat = {
    LTS  : 'h:mm:ss A',
    LT   : 'h:mm A',
    L    : 'MM/DD/YYYY',
    LL   : 'MMMM D, YYYY',
    LLL  : 'MMMM D, YYYY h:mm A',
    LLLL : 'dddd, MMMM D, YYYY h:mm A'
};

function longDateFormat (key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
        return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
        return val.slice(1);
    });

    return this._longDateFormat[key];
}

var defaultInvalidDate = 'Invalid date';

function invalidDate () {
    return this._invalidDate;
}

var defaultOrdinal = '%d';
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

function ordinal (number) {
    return this._ordinal.replace('%d', number);
}

var defaultRelativeTime = {
    future : 'in %s',
    past   : '%s ago',
    s  : 'a few seconds',
    ss : '%d seconds',
    m  : 'a minute',
    mm : '%d minutes',
    h  : 'an hour',
    hh : '%d hours',
    d  : 'a day',
    dd : '%d days',
    M  : 'a month',
    MM : '%d months',
    y  : 'a year',
    yy : '%d years'
};

function relativeTime (number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return (isFunction(output)) ?
        output(number, withoutSuffix, string, isFuture) :
        output.replace(/%d/i, number);
}

function pastFuture (diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
}

var aliases = {};

function addUnitAlias (unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}

var priorities = {};

function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}

function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({unit: u, priority: priorities[u]});
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}

function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}

var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

var formatFunctions = {};

var formatTokenFunctions = {};

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function addFormatToken (token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
        func = function () {
            return this[callback]();
        };
    }
    if (token) {
        formatTokenFunctions[token] = func;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
    }
    if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
}

function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
    var array = format.match(formattingTokens), i, length;

    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        } else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }

    return function (mom) {
        var output = '', i;
        for (i = 0; i < length; i++) {
            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
}

// format date using native date object
function formatMoment(m, format) {
    if (!m.isValid()) {
        return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

    return formatFunctions[format](m);
}

function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }

    return format;
}

var match1         = /\d/;            //       0 - 9
var match2         = /\d\d/;          //      00 - 99
var match3         = /\d{3}/;         //     000 - 999
var match4         = /\d{4}/;         //    0000 - 9999
var match6         = /[+-]?\d{6}/;    // -999999 - 999999
var match1to2      = /\d\d?/;         //       0 - 99
var match3to4      = /\d\d\d\d?/;     //     999 - 9999
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf

var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;


var regexes = {};

function addRegexToken (token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
        return (isStrict && strictRegex) ? strictRegex : regex;
    };
}

function getParseRegexForToken (token, config) {
    if (!hasOwnProp(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
}

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var tokens = {};

function addParseToken (token, callback) {
    var i, func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if (isNumber(callback)) {
        func = function (input, array) {
            array[callback] = toInt(input);
        };
    }
    for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
    }
}

function addWeekParseToken (token, callback) {
    addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
    });
}

function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
}

var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;
var WEEK = 7;
var WEEKDAY = 8;

// FORMATTING

addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});

addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});

addFormatToken(0, ['YYYY',   4],       0, 'year');
addFormatToken(0, ['YYYYY',  5],       0, 'year');
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

addUnitAlias('year', 'y');

// PRIORITIES

addUnitPriority('year', 1);

// PARSING

addRegexToken('Y',      matchSigned);
addRegexToken('YY',     match1to2, match2);
addRegexToken('YYYY',   match1to4, match4);
addRegexToken('YYYYY',  match1to6, match6);
addRegexToken('YYYYYY', match1to6, match6);

addParseToken(['YYYYY', 'YYYYYY'], YEAR);
addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// HOOKS

hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
};

// MOMENTS

var getSetYear = makeGetSet('FullYear', true);

function getIsLeapYear () {
    return isLeapYear(this.year());
}

function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

function set$1 (mom, unit, value) {
    if (mom.isValid() && !isNaN(value)) {
        if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
        }
        else {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }
}

// MOMENTS

function stringGet (units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}


function stringSet (units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}

function mod(n, x) {
    return ((n % x) + x) % x;
}

var indexOf;

if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
} else {
    indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
}

function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
        return NaN;
    }
    var modMonth = mod(month, 12);
    year += (month - modMonth) / 12;
    return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
}

// FORMATTING

addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});

addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

addUnitAlias('month', 'M');

// PRIORITY

addUnitPriority('month', 8);

// PARSING

addRegexToken('M',    match1to2);
addRegexToken('MM',   match1to2, match2);
addRegexToken('MMM',  function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});

addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
});

addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[MONTH] = month;
    } else {
        getParsingFlags(config).invalidMonth = input;
    }
});

// LOCALES

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {
    if (!m) {
        return isArray(this._months) ? this._months :
            this._months['standalone'];
    }
    return isArray(this._months) ? this._months[m.month()] :
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}

var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
function localeMonthsShort (m, format) {
    if (!m) {
        return isArray(this._monthsShort) ? this._monthsShort :
            this._monthsShort['standalone'];
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}

function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = createUTC([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeMonthsParse (monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
}

// MOMENTS

function setMonth (mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = toInt(value);
        } else {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (!isNumber(value)) {
                return mom;
            }
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

function getSetMonth (value) {
    if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
    } else {
        return get(this, 'Month');
    }
}

function getDaysInMonth () {
    return daysInMonth(this.year(), this.month());
}

var defaultMonthsShortRegex = matchWord;
function monthsShortRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}

var defaultMonthsRegex = matchWord;
function monthsRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
}

function computeMonthsParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom;
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}

function createDate (y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date = new Date(y, m, d, h, M, s, ms);

    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

function createUTCDate (y) {
    var date = new Date(Date.UTC.apply(null, arguments));

    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}

// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

    return -fwdlw + fwd - 1;
}

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear, resDayOfYear;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek, resYear;

    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }

    return {
        week: resWeek,
        year: resYear
    };
}

function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

// FORMATTING

addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');

// PRIORITIES

addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);

// PARSING

addRegexToken('w',  match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W',  match1to2);
addRegexToken('WW', match1to2, match2);

addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
});

// HELPERS

// LOCALES

function localeWeek (mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
}

var defaultLocaleWeek = {
    dow : 0, // Sunday is the first day of the week.
    doy : 6  // The week that contains Jan 1st is the first week of the year.
};

function localeFirstDayOfWeek () {
    return this._week.dow;
}

function localeFirstDayOfYear () {
    return this._week.doy;
}

// MOMENTS

function getSetWeek (input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}

function getSetISOWeek (input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}

// FORMATTING

addFormatToken('d', 0, 'do', 'day');

addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

addFormatToken('e', 0, 0, 'weekday');
addFormatToken('E', 0, 0, 'isoWeekday');

// ALIASES

addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');

// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);

// PARSING

addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
addRegexToken('ddd',   function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd',   function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});

addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    } else {
        getParsingFlags(config).invalidWeekday = input;
    }
});

addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
});

// HELPERS

function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
}

// LOCALES

var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
function localeWeekdays (m, format) {
    if (!m) {
        return isArray(this._weekdays) ? this._weekdays :
            this._weekdays['standalone'];
    }
    return isArray(this._weekdays) ? this._weekdays[m.day()] :
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}

var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
function localeWeekdaysShort (m) {
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
function localeWeekdaysMin (m) {
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}

function handleStrictParse$1(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];

        for (i = 0; i < 7; ++i) {
            mom = createUTC([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeWeekdaysParse (weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = createUTC([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}

// MOMENTS

function getSetDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

function getSetLocaleDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

function getSetISODayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

var defaultWeekdaysRegex = matchWord;
function weekdaysRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ?
            this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}

var defaultWeekdaysShortRegex = matchWord;
function weekdaysShortRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ?
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}

var defaultWeekdaysMinRegex = matchWord;
function weekdaysMinRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ?
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}


function computeWeekdaysParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}

// FORMATTING

function hFormat() {
    return this.hours() % 12 || 12;
}

function kFormat() {
    return this.hours() || 24;
}

addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('h', ['hh', 2], 0, hFormat);
addFormatToken('k', ['kk', 2], 0, kFormat);

addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});

addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
});

addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

function meridiem (token, lowercase) {
    addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

// ALIASES

addUnitAlias('hour', 'h');

// PRIORITY
addUnitPriority('hour', 13);

// PARSING

function matchMeridiem (isStrict, locale) {
    return locale._meridiemParse;
}

addRegexToken('a',  matchMeridiem);
addRegexToken('A',  matchMeridiem);
addRegexToken('H',  match1to2);
addRegexToken('h',  match1to2);
addRegexToken('k',  match1to2);
addRegexToken('HH', match1to2, match2);
addRegexToken('hh', match1to2, match2);
addRegexToken('kk', match1to2, match2);

addRegexToken('hmm', match3to4);
addRegexToken('hmmss', match5to6);
addRegexToken('Hmm', match3to4);
addRegexToken('Hmmss', match5to6);

addParseToken(['H', 'HH'], HOUR);
addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
});
addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
});
addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
});

// LOCALES

function localeIsPM (input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return ((input + '').toLowerCase().charAt(0) === 'p');
}

var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem (hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
}


// MOMENTS

// Setting the hour should keep the time, because the user explicitly
// specified which hour he wants. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
var getSetHour = makeGetSet('Hours', true);

// months
// week
// weekdays
// meridiem
var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,

    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,

    week: defaultLocaleWeek,

    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,

    meridiemParse: defaultLocaleMeridiemParse
};

// internal storage for locale config files
var locales = {};
var localeFamilies = {};
var globalLocale;

function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    var i = 0, j, next, locale, split;

    while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                //the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return null;
}

function loadLocale(name) {
    var oldLocale = null;
    // TODO: Find a better way to register and load all the locales in Node
    if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            var aliasedRequire = require;
            aliasedRequire('./locale/' + name);
            getSetGlobalLocale(oldLocale);
        } catch (e) {}
    }
    return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale (key, values) {
    var data;
    if (key) {
        if (isUndefined(values)) {
            data = getLocale(key);
        }
        else {
            data = defineLocale(key, values);
        }

        if (data) {
            // moment.duration._locale = moment._locale = data;
            globalLocale = data;
        }
    }

    return globalLocale._abbr;
}

function defineLocale (name, config) {
    if (config !== null) {
        var parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
            deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
            } else {
                if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                    name: name,
                    config: config
                });
                return null;
            }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));

        if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
            });
        }

        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);


        return locales[name];
    } else {
        // useful for testing
        delete locales[name];
        return null;
    }
}

function updateLocale(name, config) {
    if (config != null) {
        var locale, tmpLocale, parentConfig = baseConfig;
        // MERGE
        tmpLocale = loadLocale(name);
        if (tmpLocale != null) {
            parentConfig = tmpLocale._config;
        }
        config = mergeConfigs(parentConfig, config);
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;

        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}

// returns locale data
function getLocale (key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
    }

    if (!key) {
        return globalLocale;
    }

    if (!isArray(key)) {
        //short-circuit everything else
        locale = loadLocale(key);
        if (locale) {
            return locale;
        }
        key = [key];
    }

    return chooseLocale(key);
}

function listLocales() {
    return keys(locales);
}

function checkOverflow (m) {
    var overflow;
    var a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
        overflow =
            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
            -1;

        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
        }

        getParsingFlags(m).overflow = overflow;
    }

    return m;
}

// Pick the first defined of two or three arguments.
function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}

function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray (config) {
    var i, date, input = [], currentDate, yearToUse;

    if (config._d) {
        return;
    }

    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }

        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
        config._a[HOUR] = 24;
    }

    // check for mismatching day of week
    if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== config._d.getDay()) {
        getParsingFlags(config).weekdayMismatch = true;
    }
}

function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        var curWeek = weekOfYear(createLocal(), dow, doy);

        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

        // Default to current week.
        week = defaults(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to begining of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
var isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
function configFromISO(config) {
    var i, l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime, dateFormat, timeFormat, tzFormat;

    if (match) {
        getParsingFlags(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = [
        untruncateYear(yearStr),
        defaultLocaleMonthsShort.indexOf(monthStr),
        parseInt(dayStr, 10),
        parseInt(hourStr, 10),
        parseInt(minuteStr, 10)
    ];

    if (secondStr) {
        result.push(parseInt(secondStr, 10));
    }

    return result;
}

function untruncateYear(yearStr) {
    var year = parseInt(yearStr, 10);
    if (year <= 49) {
        return 2000 + year;
    } else if (year <= 999) {
        return 1900 + year;
    }
    return year;
}

function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').trim();
}

function checkWeekday(weekdayStr, parsedInput, config) {
    if (weekdayStr) {
        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
            weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
        if (weekdayProvided !== weekdayActual) {
            getParsingFlags(config).weekdayMismatch = true;
            config._isValid = false;
            return false;
        }
    }
    return true;
}

var obsOffsets = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
};

function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
        return obsOffsets[obsOffset];
    } else if (militaryOffset) {
        // the only allowed military tz is Z
        return 0;
    } else {
        var hm = parseInt(numOffset, 10);
        var m = hm % 100, h = (hm - m) / 100;
        return h * 60 + m;
    }
}

// date and time from ref 2822 format
function configFromRFC2822(config) {
    var match = rfc2822.exec(preprocessRFC2822(config._i));
    if (match) {
        var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
        if (!checkWeekday(match[1], parsedArray, config)) {
            return;
        }

        config._a = parsedArray;
        config._tzm = calculateOffset(match[8], match[9], match[10]);

        config._d = createUTCDate.apply(null, config._a);
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

        getParsingFlags(config).rfc2822 = true;
    } else {
        config._isValid = false;
    }
}

// date from iso format or fallback
function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }

    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    // Final attempt, use Input Fallback
    hooks.createFromInputFallback(config);
}

hooks.createFromInputFallback = deprecate(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);

// constant that refers to the ISO standard
hooks.ISO_8601 = function () {};

// constant that refers to the RFC 2822 form
hooks.RFC_2822 = function () {};

// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
    }
    if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
    }
    config._a = [];
    getParsingFlags(config).empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
        i, parsedInput, tokens, token, skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;

    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (formatTokenFunctions[token]) {
            if (parsedInput) {
                getParsingFlags(config).empty = false;
            }
            else {
                getParsingFlags(config).unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, config);
        }
        else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token);
        }
    }

    // add remaining unparsed input length to the string
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
    }

    // clear _12h flag if hour is <= 12
    if (config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

    configFromArray(config);
    checkOverflow(config);
}


function meridiemFixWrap (locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
        // nothing to do
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
        // Fallback
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return hour;
    } else {
        // this is not supposed to happen
        return hour;
    }
}

// date from string and array of format strings
function configFromStringAndArray(config) {
    var tempConfig,
        bestMoment,

        scoreToBeat,
        i,
        currentScore;

    if (config._f.length === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
    }

    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);

        if (!isValid(tempConfig)) {
            continue;
        }

        // if there is any input that was not parsed add a penalty for that format
        currentScore += getParsingFlags(tempConfig).charsLeftOver;

        //or tokens
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

        getParsingFlags(tempConfig).score = currentScore;

        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }

    extend(config, bestMoment || tempConfig);
}

function configFromObject(config) {
    if (config._d) {
        return;
    }

    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
        return obj && parseInt(obj, 10);
    });

    configFromArray(config);
}

function createFromConfig (config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

function prepareConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || getLocale(config._l);

    if (input === null || (format === undefined && input === '')) {
        return createInvalid({nullInput: true});
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
        return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
        config._d = input;
    } else if (isArray(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    }  else {
        configFromInput(config);
    }

    if (!isValid(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
        config._d = new Date(hooks.now());
    } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (isObject(input)) {
        configFromObject(config);
    } else if (isNumber(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        hooks.createFromInputFallback(config);
    }
}

function createLocalOrUTC (input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
        input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}

function createLocal (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
}

var prototypeMin = deprecate(
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

var prototypeMax = deprecate(
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
    }
    if (!moments.length) {
        return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
        }
    }
    return res;
}

// TODO: Use [].sort instead?
function min () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isBefore', args);
}

function max () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isAfter', args);
}

var now = function () {
    return Date.now ? Date.now() : +(new Date());
};

var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

function isDurationValid(m) {
    for (var key in m) {
        if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

function isValid$1() {
    return this._isValid;
}

function createInvalid$1() {
    return createDuration(NaN);
}

function Duration (duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible to translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
        quarters * 3 +
        years * 12;

    this._data = {};

    this._locale = getLocale();

    this._bubble();
}

function isDuration (obj) {
    return obj instanceof Duration;
}

function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

// FORMATTING

function offset (token, separator) {
    addFormatToken(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
    });
}

offset('Z', ':');
offset('ZZ', '');

// PARSING

addRegexToken('Z',  matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
        return null;
    }

    var chunk   = matches[matches.length - 1] || [];
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);

    return minutes === 0 ?
      0 :
      parts[0] === '+' ? minutes : -minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks.updateOffset(res, false);
        return res;
    } else {
        return createLocal(input).local();
    }
}

function getDateOffset (m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks.updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function getSetOffset (input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}

function getSetZone (input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }

        this.utcOffset(input, keepLocalTime);

        return this;
    } else {
        return -this.utcOffset();
    }
}

function setOffsetToUTC (keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}

function setOffsetToLocal (keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;

        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}

function setOffsetToParsedOffset () {
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        }
        else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

function hasAlignedHourOffset (input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

function isDaylightSavingTime () {
    return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
    );
}

function isDaylightSavingTimeShifted () {
    if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() &&
            compareArrays(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

function isLocal () {
    return this.isValid() ? !this._isUTC : false;
}

function isUtcOffset () {
    return this.isValid() ? this._isUTC : false;
}

function isUtc () {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}

// ASP.NET json date format regex
var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

function createDuration (input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
        match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
        duration = {
            ms : input._milliseconds,
            d  : input._days,
            M  : input._months
        };
    } else if (isNumber(input)) {
        duration = {};
        if (key) {
            duration[key] = input;
        } else {
            duration.milliseconds = input;
        }
    } else if (!!(match = aspNetRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y  : 0,
            d  : toInt(match[DATE])                         * sign,
            h  : toInt(match[HOUR])                         * sign,
            m  : toInt(match[MINUTE])                       * sign,
            s  : toInt(match[SECOND])                       * sign,
            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };
    } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : (match[1] === '+') ? 1 : 1;
        duration = {
            y : parseIso(match[2], sign),
            M : parseIso(match[3], sign),
            w : parseIso(match[4], sign),
            d : parseIso(match[5], sign),
            h : parseIso(match[6], sign),
            m : parseIso(match[7], sign),
            s : parseIso(match[8], sign)
        };
    } else if (duration == null) {// checks for null or undefined
        duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
        ret._locale = input._locale;
    }

    return ret;
}

createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;

function parseIso (inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
}

function positiveMomentsDifference(base, other) {
    var res = {milliseconds: 0, months: 0};

    res.months = other.month() - base.month() +
        (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
    }

    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

    return res;
}

function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
        return {milliseconds: 0, months: 0};
    }

    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
    } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }

    return res;
}

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val; val = period; period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

function addSubtract (mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (months) {
        setMonth(mom, get(mom, 'Month') + months * isAdding);
    }
    if (days) {
        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }
    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (updateOffset) {
        hooks.updateOffset(mom, days || months);
    }
}

var add      = createAdder(1, 'add');
var subtract = createAdder(-1, 'subtract');

function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';
}

function calendar$1 (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}

function clone () {
    return new Moment(this);
}

function isAfter (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

function isBefore (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

function isBetween (from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

function isSame (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input,units);
}

function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input,units);
}

function diff (input, units, asFloat) {
    var that,
        zoneDelta,
        delta, output;

    if (!this.isValid()) {
        return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

    units = normalizeUnits(units);

    switch (units) {
        case 'year': output = monthDiff(this, that) / 12; break;
        case 'month': output = monthDiff(this, that); break;
        case 'quarter': output = monthDiff(this, that) / 3; break;
        case 'second': output = (this - that) / 1e3; break; // 1000
        case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
        case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
        case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
        case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
        default: output = this - that;
    }

    return asFloat ? output : absFloor(output);
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

function toString () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}

function toISOString() {
    if (!this.isValid()) {
        return null;
    }
    var m = this.clone().utc();
    if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }
    if (isFunction(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        return this.toDate().toISOString();
    }
    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
}

/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */
function inspect () {
    if (!this.isValid()) {
        return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment';
    var zone = '';
    if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
        zone = 'Z';
    }
    var prefix = '[' + func + '("]';
    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';

    return this.format(prefix + year + datetime + suffix);
}

function format (inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
}

function from (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function fromNow (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
}

function to (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function toNow (withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
}

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function locale (key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
}

var lang = deprecate(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    }
);

function localeData () {
    return this._locale;
}

function startOf (units) {
    units = normalizeUnits(units);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
    }

    // weeks are a special case
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }

    return this;
}

function endOf (units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}

function valueOf () {
    return this._d.valueOf() - ((this._offset || 0) * 60000);
}

function unix () {
    return Math.floor(this.valueOf() / 1000);
}

function toDate () {
    return new Date(this.valueOf());
}

function toArray () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}

function toObject () {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}

function toJSON () {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
}

function isValid$2 () {
    return isValid(this);
}

function parsingFlags () {
    return extend({}, getParsingFlags(this));
}

function invalidAt () {
    return getParsingFlags(this).overflow;
}

function creationData() {
    return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
    };
}

// FORMATTING

addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
});

addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function addWeekYearFormatToken (token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
}

addWeekYearFormatToken('gggg',     'weekYear');
addWeekYearFormatToken('ggggg',    'weekYear');
addWeekYearFormatToken('GGGG',  'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');

// ALIASES

addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');

// PRIORITY

addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);


// PARSING

addRegexToken('G',      matchSigned);
addRegexToken('g',      matchSigned);
addRegexToken('GG',     match1to2, match2);
addRegexToken('gg',     match1to2, match2);
addRegexToken('GGGG',   match1to4, match4);
addRegexToken('gggg',   match1to4, match4);
addRegexToken('GGGGG',  match1to6, match6);
addRegexToken('ggggg',  match1to6, match6);

addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
});

addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
});

// MOMENTS

function getSetWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
}

function getSetISOWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
}

function getISOWeeksInYear () {
    return weeksInYear(this.year(), 1, 4);
}

function getWeeksInYear () {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return weekOfYear(this, dow, doy).year;
    } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}

// FORMATTING

addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

addUnitAlias('quarter', 'Q');

// PRIORITY

addUnitPriority('quarter', 7);

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});

// MOMENTS

function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

addUnitAlias('date', 'D');

// PRIOROITY
addUnitPriority('date', 9);

// PARSING

addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0], 10);
});

// MOMENTS

var getSetDayOfMonth = makeGetSet('Date', true);

// FORMATTING

addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

addUnitAlias('dayOfYear', 'DDD');

// PRIORITY
addUnitPriority('dayOfYear', 4);

// PARSING

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
});

// HELPERS

// MOMENTS

function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}

// FORMATTING

addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

addUnitAlias('minute', 'm');

// PRIORITY

addUnitPriority('minute', 14);

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

var getSetMinute = makeGetSet('Minutes', false);

// FORMATTING

addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

addUnitAlias('second', 's');

// PRIORITY

addUnitPriority('second', 15);

// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);

// MOMENTS

var getSetSecond = makeGetSet('Seconds', false);

// FORMATTING

addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

addFormatToken(0, ['SSS', 3], 0, 'millisecond');
addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});


// ALIASES

addUnitAlias('millisecond', 'ms');

// PRIORITY

addUnitPriority('millisecond', 16);

// PARSING

addRegexToken('S',    match1to3, match1);
addRegexToken('SS',   match1to3, match2);
addRegexToken('SSS',  match1to3, match3);

var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
}

function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
}

for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
}
// MOMENTS

var getSetMillisecond = makeGetSet('Milliseconds', false);

// FORMATTING

addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

function getZoneAbbr () {
    return this._isUTC ? 'UTC' : '';
}

function getZoneName () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}

var proto = Moment.prototype;

proto.add               = add;
proto.calendar          = calendar$1;
proto.clone             = clone;
proto.diff              = diff;
proto.endOf             = endOf;
proto.format            = format;
proto.from              = from;
proto.fromNow           = fromNow;
proto.to                = to;
proto.toNow             = toNow;
proto.get               = stringGet;
proto.invalidAt         = invalidAt;
proto.isAfter           = isAfter;
proto.isBefore          = isBefore;
proto.isBetween         = isBetween;
proto.isSame            = isSame;
proto.isSameOrAfter     = isSameOrAfter;
proto.isSameOrBefore    = isSameOrBefore;
proto.isValid           = isValid$2;
proto.lang              = lang;
proto.locale            = locale;
proto.localeData        = localeData;
proto.max               = prototypeMax;
proto.min               = prototypeMin;
proto.parsingFlags      = parsingFlags;
proto.set               = stringSet;
proto.startOf           = startOf;
proto.subtract          = subtract;
proto.toArray           = toArray;
proto.toObject          = toObject;
proto.toDate            = toDate;
proto.toISOString       = toISOString;
proto.inspect           = inspect;
proto.toJSON            = toJSON;
proto.toString          = toString;
proto.unix              = unix;
proto.valueOf           = valueOf;
proto.creationData      = creationData;

// Year
proto.year       = getSetYear;
proto.isLeapYear = getIsLeapYear;

// Week Year
proto.weekYear    = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;

// Quarter
proto.quarter = proto.quarters = getSetQuarter;

// Month
proto.month       = getSetMonth;
proto.daysInMonth = getDaysInMonth;

// Week
proto.week           = proto.weeks        = getSetWeek;
proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
proto.weeksInYear    = getWeeksInYear;
proto.isoWeeksInYear = getISOWeeksInYear;

// Day
proto.date       = getSetDayOfMonth;
proto.day        = proto.days             = getSetDayOfWeek;
proto.weekday    = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear  = getSetDayOfYear;

// Hour
proto.hour = proto.hours = getSetHour;

// Minute
proto.minute = proto.minutes = getSetMinute;

// Second
proto.second = proto.seconds = getSetSecond;

// Millisecond
proto.millisecond = proto.milliseconds = getSetMillisecond;

// Offset
proto.utcOffset            = getSetOffset;
proto.utc                  = setOffsetToUTC;
proto.local                = setOffsetToLocal;
proto.parseZone            = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST                = isDaylightSavingTime;
proto.isLocal              = isLocal;
proto.isUtcOffset          = isUtcOffset;
proto.isUtc                = isUtc;
proto.isUTC                = isUtc;

// Timezone
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;

// Deprecations
proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    return createLocal.apply(null, arguments).parseZone();
}

function preParsePostFormat (string) {
    return string;
}

var proto$1 = Locale.prototype;

proto$1.calendar        = calendar;
proto$1.longDateFormat  = longDateFormat;
proto$1.invalidDate     = invalidDate;
proto$1.ordinal         = ordinal;
proto$1.preparse        = preParsePostFormat;
proto$1.postformat      = preParsePostFormat;
proto$1.relativeTime    = relativeTime;
proto$1.pastFuture      = pastFuture;
proto$1.set             = set;

// Month
proto$1.months            =        localeMonths;
proto$1.monthsShort       =        localeMonthsShort;
proto$1.monthsParse       =        localeMonthsParse;
proto$1.monthsRegex       = monthsRegex;
proto$1.monthsShortRegex  = monthsShortRegex;

// Week
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;

// Day of Week
proto$1.weekdays       =        localeWeekdays;
proto$1.weekdaysMin    =        localeWeekdaysMin;
proto$1.weekdaysShort  =        localeWeekdaysShort;
proto$1.weekdaysParse  =        localeWeekdaysParse;

proto$1.weekdaysRegex       =        weekdaysRegex;
proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

// Hours
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;

function get$1 (format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
}

function listMonthsImpl (format, index, field) {
    if (isNumber(format)) {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get$1(format, i, field, 'month');
    }
    return out;
}

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl (localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;

        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
        return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }
    return out;
}

function listMonths (format, index) {
    return listMonthsImpl(format, index, 'months');
}

function listMonthsShort (format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}

function listWeekdays (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}

function listWeekdaysShort (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}

function listWeekdaysMin (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}

getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});

// Side effect imports
hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

var mathAbs = Math.abs;

function abs () {
    var data           = this._data;

    this._milliseconds = mathAbs(this._milliseconds);
    this._days         = mathAbs(this._days);
    this._months       = mathAbs(this._months);

    data.milliseconds  = mathAbs(data.milliseconds);
    data.seconds       = mathAbs(data.seconds);
    data.minutes       = mathAbs(data.minutes);
    data.hours         = mathAbs(data.hours);
    data.months        = mathAbs(data.months);
    data.years         = mathAbs(data.years);

    return this;
}

function addSubtract$1 (duration, input, value, direction) {
    var other = createDuration(input, value);

    duration._milliseconds += direction * other._milliseconds;
    duration._days         += direction * other._days;
    duration._months       += direction * other._months;

    return duration._bubble();
}

// supports only 2.0-style add(1, 's') or add(duration)
function add$1 (input, value) {
    return addSubtract$1(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)
function subtract$1 (input, value) {
    return addSubtract$1(this, input, value, -1);
}

function absCeil (number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds           = absFloor(milliseconds / 1000);
    data.seconds      = seconds % 60;

    minutes           = absFloor(seconds / 60);
    data.minutes      = minutes % 60;

    hours             = absFloor(minutes / 60);
    data.hours        = hours % 24;

    days += absFloor(hours / 24);

    // convert days to months
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = absFloor(months / 12);
    months %= 12;

    data.days   = days;
    data.months = months;
    data.years  = years;

    return this;
}

function daysToMonths (days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

function monthsToDays (months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}

function as (units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;

    units = normalizeUnits(units);

    if (units === 'month' || units === 'year') {
        days   = this._days   + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        return units === 'month' ? months : months / 12;
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
            case 'week'   : return days / 7     + milliseconds / 6048e5;
            case 'day'    : return days         + milliseconds / 864e5;
            case 'hour'   : return days * 24    + milliseconds / 36e5;
            case 'minute' : return days * 1440  + milliseconds / 6e4;
            case 'second' : return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
            default: throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?
function valueOf$1 () {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6
    );
}

function makeAs (alias) {
    return function () {
        return this.as(alias);
    };
}

var asMilliseconds = makeAs('ms');
var asSeconds      = makeAs('s');
var asMinutes      = makeAs('m');
var asHours        = makeAs('h');
var asDays         = makeAs('d');
var asWeeks        = makeAs('w');
var asMonths       = makeAs('M');
var asYears        = makeAs('y');

function clone$1 () {
    return createDuration(this);
}

function get$2 (units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var milliseconds = makeGetter('milliseconds');
var seconds      = makeGetter('seconds');
var minutes      = makeGetter('minutes');
var hours        = makeGetter('hours');
var days         = makeGetter('days');
var months       = makeGetter('months');
var years        = makeGetter('years');

function weeks () {
    return absFloor(this.days() / 7);
}

var round = Math.round;
var thresholds = {
    ss: 44,         // a few seconds to seconds
    s : 45,         // seconds to minute
    m : 45,         // minutes to hour
    h : 22,         // hours to day
    d : 26,         // days to month
    M : 11          // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds  = round(duration.as('s'));
    var minutes  = round(duration.as('m'));
    var hours    = round(duration.as('h'));
    var days     = round(duration.as('d'));
    var months   = round(duration.as('M'));
    var years    = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds]  ||
            seconds < thresholds.s   && ['ss', seconds] ||
            minutes <= 1             && ['m']           ||
            minutes < thresholds.m   && ['mm', minutes] ||
            hours   <= 1             && ['h']           ||
            hours   < thresholds.h   && ['hh', hours]   ||
            days    <= 1             && ['d']           ||
            days    < thresholds.d   && ['dd', days]    ||
            months  <= 1             && ['M']           ||
            months  < thresholds.M   && ['MM', months]  ||
            years   <= 1             && ['y']           || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding (roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof(roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold (threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}

function humanize (withSuffix) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}

var abs$1 = Math.abs;

function sign(x) {
    return ((x > 0) - (x < 0)) || +x;
}

function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days         = abs$1(this._days);
    var months       = abs$1(this._months);
    var minutes, hours, years;

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes           = absFloor(seconds / 60);
    hours             = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years  = absFloor(months / 12);
    months %= 12;


    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
    var total = this.asSeconds();

    if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
    }

    var totalSign = total < 0 ? '-' : '';
    var ymSign = sign(this._months) !== sign(total) ? '-' : '';
    var daysSign = sign(this._days) !== sign(total) ? '-' : '';
    var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

    return totalSign + 'P' +
        (Y ? ymSign + Y + 'Y' : '') +
        (M ? ymSign + M + 'M' : '') +
        (D ? daysSign + D + 'D' : '') +
        ((h || m || s) ? 'T' : '') +
        (h ? hmsSign + h + 'H' : '') +
        (m ? hmsSign + m + 'M' : '') +
        (s ? hmsSign + s + 'S' : '');
}

var proto$2 = Duration.prototype;

proto$2.isValid        = isValid$1;
proto$2.abs            = abs;
proto$2.add            = add$1;
proto$2.subtract       = subtract$1;
proto$2.as             = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds      = asSeconds;
proto$2.asMinutes      = asMinutes;
proto$2.asHours        = asHours;
proto$2.asDays         = asDays;
proto$2.asWeeks        = asWeeks;
proto$2.asMonths       = asMonths;
proto$2.asYears        = asYears;
proto$2.valueOf        = valueOf$1;
proto$2._bubble        = bubble;
proto$2.clone          = clone$1;
proto$2.get            = get$2;
proto$2.milliseconds   = milliseconds;
proto$2.seconds        = seconds;
proto$2.minutes        = minutes;
proto$2.hours          = hours;
proto$2.days           = days;
proto$2.weeks          = weeks;
proto$2.months         = months;
proto$2.years          = years;
proto$2.humanize       = humanize;
proto$2.toISOString    = toISOString$1;
proto$2.toString       = toISOString$1;
proto$2.toJSON         = toISOString$1;
proto$2.locale         = locale;
proto$2.localeData     = localeData;

// Deprecations
proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
proto$2.lang = lang;

// Side effect imports

// FORMATTING

addFormatToken('X', 0, 0, 'unix');
addFormatToken('x', 0, 0, 'valueOf');

// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
});

// Side effect imports


hooks.version = '2.19.3';

setHookCallback(createLocal);

hooks.fn                    = proto;
hooks.min                   = min;
hooks.max                   = max;
hooks.now                   = now;
hooks.utc                   = createUTC;
hooks.unix                  = createUnix;
hooks.months                = listMonths;
hooks.isDate                = isDate;
hooks.locale                = getSetGlobalLocale;
hooks.invalid               = createInvalid;
hooks.duration              = createDuration;
hooks.isMoment              = isMoment;
hooks.weekdays              = listWeekdays;
hooks.parseZone             = createInZone;
hooks.localeData            = getLocale;
hooks.isDuration            = isDuration;
hooks.monthsShort           = listMonthsShort;
hooks.weekdaysMin           = listWeekdaysMin;
hooks.defineLocale          = defineLocale;
hooks.updateLocale          = updateLocale;
hooks.locales               = listLocales;
hooks.weekdaysShort         = listWeekdaysShort;
hooks.normalizeUnits        = normalizeUnits;
hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat        = getCalendarFormat;
hooks.prototype             = proto;

return hooks;

})));