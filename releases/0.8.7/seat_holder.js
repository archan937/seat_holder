if (typeof(SeatHolder) == "undefined") {

// *
// * SeatHolder 0.8.7 (Uncompressed)
// * The modest Javascript placeholder (used in http://gettopup.com)
// *
// * This library requires jQuery (http://jquery.com)
// *
// * (c) 2010 Paul Engel (Internetbureau Holder B.V.)
// * Except otherwise noted, SeatHolder is licensed under
// * http://creativecommons.org/licenses/by-sa/3.0
// *
// * $Date: 2010-09-01 23:14:04 +0100 (Wed, 01 September 2010) $
// *

SeatHolder = (function() {
  var hintClass = "sh_hint", hideClass = "sh_hide", ignored_types = ["file", "submit"];
  
  var injectCode = function() {
    var style = "<style>" + 
                  "." + hintClass + " { color: " + SeatHolder.hintColor +" !important } " +
                  "." + hideClass + " { display: none !important }" +
                "</style>";

    jQuery(style).prependTo("head");
  };
  var bind = function() {
    var hintedElements = [];
    
    jQuery.each(jQuery(SeatHolder.selector), function(i, element) {
      element = jQuery(element);
      var seatholder = element.attr("seatholder");

      if (!element.is("[seatholder]") || element.is("[type=file]") || element.is("[type=submit]")) {
        return;
      }

      if (seatholder.match(/^&/)) {
        onBlur(null, element);
      } else {
        hintedElements.push(element);
      }
        
      element.focus(onFocus)
             .blur(onBlur);
    });
    
    jQuery.each(hintedElements, function(i, element) {
      element         = jQuery(element);
      var hintElement = element.data("hint_element");

      if (typeof(hintElement) == "undefined") {
        (hintElement = element.attr("type").toLowerCase() == "textarea" ?
                         jQuery("<" + element.attr("type") + "/>") :
                         jQuery("<input/>").attr("type", element.attr("type")))
                       .attr("readonly", true)
                       .data("hinted_element", element)
                       .focus(onHintFocus);
      
        jQuery.each(element.get(0).attributes, function(index, attribute) {
          var key   = attribute.name;
          var value = attribute.value;
        
          if ((jQuery.inArray(key, ["class", "size", "cols", "rows", "style"]) != -1) || key.match(/^data-/)) {
            switch(attribute) {
              case "class":
                hintElement.attr(key, value.replace(hideClass, "")); break;
              default:
                hintElement.attr(key, value);
            }          
          }
        });
      
        hintElement.addClass(hintClass);
        element.data("hint_element", hintElement)
               .before(hintElement);
      }
    
      hintElement.val(element.attr("seatholder"));
      onBlur(null, element);
    });
  };
  
  var onHintFocus = function(event) {
    var hintElement = jQuery(event.target).addClass(hideClass);
    
    hintElement.data("hinted_element")
               .removeClass(hideClass)
               .focus();
  };
  var onFocus = function(event) {
    var element = jQuery(event.target);
    var seatholder = element.attr("seatholder");
    
    if (element.val() == seatholder.replace(/^&/, "")) {
      element.val("");
    }
    
    var input = element.get(0);
      
    if (input.createTextRange) {
      var oRange = input.createTextRange();
      oRange.moveStart("character", 0);
      oRange.moveEnd("character", element.val().length);
      oRange.select();
    } else if (input.setSelectionRange) {
      input.setSelectionRange(0, element.val().length);
    }
  };
  var onBlur = function(event, element) {
    if (element == null) {
      element = jQuery(event.target);
    }
    
    var seatholder  = element.attr("seatholder");
    var hintElement = element.data("hint_element");
    if (typeof(hintElement) == "undefined") {
      hintElement = null;
    }
    
    if ((element.val().length > 0 && element.val() != seatholder.replace(/^&/, ""))) {
      if (hintElement) {
      	hintElement.addClass(hideClass);
      }
			return;
    }
    
    if (seatholder.match(/^&/)) {
      element.val(seatholder.replace(/^&/, ""));
    } else {
      element.val("")
             .addClass(hideClass);
      hintElement.removeClass(hideClass);
    }
  };
  
  return {
    version: "0.8.7",
    selector: "[seatholder]",
    hintColor: "#AAA",
    init: function() {
      if (typeof(onSeatHolderReady) == "function") {
        onSeatHolderReady();
      };
      jQuery(document).ready(function() {
        injectCode();
        bind();
      });
    },
    rebind: function() {
      bind();
    }
  };
}());

(function requireMissingLibs() {
  var missing_libs = [];
  
  if (typeof(jQuery) == "undefined") {
    missing_libs.push("core");
  }
  
  if (missing_libs.length == 0) {
    SeatHolder.init();
  } else {
    var id = "sh_dummy_script";
    document.write('<script id="' + id + '"></script>');

    var dummyScript = document.getElementById(id);
    var element     = dummyScript.previousSibling;
    while (element && element.tagName.toLowerCase() != "script") {
      element = element.previousSibling;
    }
    dummyScript.parentNode.removeChild(dummyScript);
    
    var src = element.getAttribute("src").replace(/(development\/)?(\w+)(\-min)?\.js.*$/, "jquery/" + missing_libs.sort().join(".") + ".js");
    document.write('<script src="' + src + '" type="text/javascript" ' + 
                           'onload="SeatHolder.init()" onreadystatechange="SeatHolder.init()">' +
                   '</script>');
  }
}());

}
