if(typeof(SeatHolder)=="undefined"){var scriptElement=(function deriveScriptElement(){var c="sh_dummy_script";document.write('<script id="'+c+'"><\/script>');var b=document.getElementById(c);var a=b.previousSibling;while(a&&a.tagName.toLowerCase()!="script"){a=a.previousSibling}b.parentNode.removeChild(b);return a}());SeatHolder=(function(){var a="sh_hint",f="sh_hide",d=["file","submit"];var h=function(){var i="<style>."+a+" { color: "+SeatHolder.hintColor+" !important } ."+f+" { display: none !important }</style>";jQuery(i).prependTo("head")};var g=function(){var i=[];jQuery.each(jQuery(SeatHolder.selector),function(l,k){k=jQuery(k);var j=k.attr("seatholder");if(!k.is("[seatholder]")||k.is("[type=file]")||k.is("[type=submit]")){return}if(j.match(/^&/)){e(null,k)}else{i.push(k)}k.focus(c).blur(e)});jQuery.each(i,function(k,j){j=jQuery(j);var l=j.data("hint_element");if(typeof(l)=="undefined"){(l=j.attr("type").toLowerCase()=="textarea"?jQuery("<"+j.attr("type")+"/>"):jQuery("<input/>").attr("type",j.attr("type"))).attr("readonly",true).data("hinted_element",j).focus(b);jQuery.each(j.get(0).attributes,function(m,o){var n=o.name;var p=o.value;if((jQuery.inArray(n,["class","size","cols","rows","style"])!=-1)||n.match(/^data-/)){switch(o){case"class":l.attr(n,p.replace(f,""));break;default:l.attr(n,p)}}});l.addClass(a);j.data("hint_element",l).before(l)}l.val(j.attr("seatholder"));e(null,j)})};var b=function(j){var i=jQuery(j.target).addClass(f);i.data("hinted_element").removeClass(f).focus()};var c=function(l){var k=jQuery(l.target);var i=k.attr("seatholder");if(k.val()==i.replace(/^&/,"")){k.val("")}var j=k.get(0);if(j.createTextRange){var m=j.createTextRange();m.moveStart("character",0);m.moveEnd("character",k.val().length);m.select()}else{if(j.setSelectionRange){j.setSelectionRange(0,k.val().length)}}};var e=function(l,j){if(j==null){j=jQuery(l.target)}var i=j.attr("seatholder");var k=j.data("hint_element");if(typeof(k)=="undefined"){k=null}if((j.val().length>0&&j.val()!=i.replace(/^&/,""))){if(k){k.addClass(f)}return}if(i.match(/^&/)){j.val(i.replace(/^&/,""))}else{j.val("").addClass(f);k.removeClass(f)}};return{version:"0.8.6",selector:"[seatholder]",hintColor:"#AAA",init:function(){if(typeof(onSeatHolderReady)=="function"){onSeatHolderReady()}jQuery(document).ready(function(){h();g()})},rebind:function(){g()}}}());(function(){var b=[];if(typeof(jQuery)=="undefined"){b.push("core")}if(b.length==0){SeatHolder.init()}else{var a=scriptElement.getAttribute("src").replace(/(development\/)?(\w+)(\-min)?\.js.*$/,"jquery/"+b.sort().join(".")+".js");document.write('<script src="'+a+'" type="text/javascript" onload="SeatHolder.init()" onreadystatechange="SeatHolder.init()"><\/script>')}}())};