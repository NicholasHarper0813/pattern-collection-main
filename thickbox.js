var tb_pathToImage = "/wp-includes/js/thickbox/loadingAnimation.gif";

if ( typeof tb_closeImage != 'string' ) 
{
	var tb_closeImage = thickboxL10n.closeImage;
}

if ( typeof tb_pathToImage != 'string' ) 
{
	var tb_pathToImage = thickboxL10n.loadingAnimation;
}

jQuery(document).ready(function(){
	tb_init('a.thickbox, area.thickbox, input.thickbox');
	imgLoader = new Image();
	imgLoader.src = tb_pathToImage;
});

function tb_init(domChunk)
{
	jQuery(domChunk).live('click', tb_click);
}

function tb_click()
{
	var a = this.href || this.alt;
	var t = this.title || this.name || null;
	var g = this.rel || false;
	tb_show(t,a,g);
	this.blur();
	
	return false;
}

function tb_show(caption, url, imageGroup)
{
	try {
		if (typeof document.body.style.maxHeight === "undefined") 
		{
			jQuery("body","html").css({height: "100%", width: "100%"});
			jQuery("html").css("overflow","hidden");
			if (document.getElementById("TB_HideSelect") === null) 
			{
				jQuery("body").append("<iframe id='TB_HideSelect'>"+thickboxL10n.noiframes+"</iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
				jQuery("#TB_overlay").click(tb_remove);
			}
		}
		else
		{
			if(document.getElementById("TB_overlay") === null)
			{
				jQuery("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>");
				jQuery("#TB_overlay").click(tb_remove);
			}
		}

		if(tb_detectMacXFF())
		{
			jQuery("#TB_overlay").addClass("TB_overlayMacFFBGHack");
		}
		else
		{
			jQuery("#TB_overlay").addClass("TB_overlayBG");
		}

		if(caption===null)
		{
			caption="";
		}
		
		jQuery("body").append("<div id='TB_load'><img src='"+tb_pathToImage+"' /></div>");
		jQuery('#TB_load').show();

		var baseURL;
		if(url.indexOf("?")!==-1)
	   	{
			baseURL = url.substr(0, url.indexOf("?"));
	   	}
	   	else
	   	{
			baseURL = url;
	   	}
	
	   	var urlString = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/;
	   	var urlType = baseURL.toLowerCase().match(urlString);

		if(urlType == '.jpg' || urlType == '.bmp' || urlType == '.jpeg' || urlType == '.gif' || urlType == '.png')
		{
			TB_PrevCaption = "";
			TB_imageCount = "";
			TB_NextCaption = "";
			TB_NextURL = "";
			TB_NextHTML = "";
			TB_PrevURL = "";
			TB_PrevHTML = "";
			TB_FoundURL = false;
			if(imageGroup)
			{
				TB_TempArray = jQuery("a[rel="+imageGroup+"]").get();
				for (TB_Counter = 0; ((TB_Counter < TB_TempArray.length) && (TB_NextHTML === "")); TB_Counter++) 
				{
					var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
					if (!(TB_TempArray[TB_Counter].href == url)) 
					{
						if (TB_FoundURL) 
						{
							TB_NextCaption = TB_TempArray[TB_Counter].title;
							TB_NextURL = TB_TempArray[TB_Counter].href;
							TB_NextHTML = "<span id='TB_next'>&nbsp;&nbsp;<a href='#'>"+thickboxL10n.next+"</a></span>";
						}
						else 
						{
							TB_PrevCaption = TB_TempArray[TB_Counter].title;
							TB_PrevURL = TB_TempArray[TB_Counter].href;
							TB_PrevHTML = "<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>"+thickboxL10n.prev+"</a></span>";
						}
					} 
					else 
					{
						TB_FoundURL = true;
						TB_imageCount = thickboxL10n.image + ' ' + (TB_Counter + 1) + ' ' + thickboxL10n.of + ' ' + (TB_TempArray.length);
					}
				}
			}

			imgPreloader = new Image();
			imgPreloader.onload = function(){
			imgPreloader.onload = null;

			var pagesize = tb_getPageSize();
			var x = pagesize[0] - 150;
			var y = pagesize[1] - 150;
			var imageWidth = imgPreloader.width;
			var imageHeight = imgPreloader.height;
			if (imageWidth > x) 
			{
				imageHeight = imageHeight * (x / imageWidth);
				imageWidth = x;
				if (imageHeight > y) 
				{
					imageWidth = imageWidth * (y / imageHeight);
					imageHeight = y;
				}
			} 
			else if (imageHeight > y) 
			{
				imageWidth = imageWidth * (y / imageHeight);
				imageHeight = y;
				if (imageWidth > x) {
					imageHeight = imageHeight * (x / imageWidth);
					imageWidth = x;
				}
			}

			TB_WIDTH = imageWidth + 30;
			TB_HEIGHT = imageHeight + 60;
			jQuery("#TB_window").append("<a href='' id='TB_ImageOff' title='"+thickboxL10n.close+"'><img id='TB_Image' src='"+url+"' width='"+imageWidth+"' height='"+imageHeight+"' alt='"+caption+"'/></a>" + "<div id='TB_caption'>"+caption+"<div id='TB_secondLine'>" + TB_imageCount + TB_PrevHTML + TB_NextHTML + "</div></div><div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='"+thickboxL10n.close+"'><img src='" + tb_closeImage + "' /></a></div>");
			jQuery("#TB_closeWindowButton").click(tb_remove);

			if (!(TB_PrevHTML === ""))
			{
				function goPrev()
				{
					if(jQuery(document).unbind("click",goPrev)){jQuery(document).unbind("click",goPrev);}
					jQuery("#TB_window").remove();
					jQuery("body").append("<div id='TB_window'></div>");
					tb_show(TB_PrevCaption, TB_PrevURL, imageGroup);
					return false;
				}
				jQuery("#TB_prev").click(goPrev);
			}

			if (!(TB_NextHTML === "")) 
			{
				function goNext()
				{
					jQuery("#TB_window").remove();
					jQuery("body").append("<div id='TB_window'></div>");
					tb_show(TB_NextCaption, TB_NextURL, imageGroup);
					return false;
				}
				jQuery("#TB_next").click(goNext);
			}

			jQuery(document).bind('keydown.thickbox', function(e){
				e.stopImmediatePropagation();
				if ( e.which == 27 )
				{
					if ( !jQuery(document).triggerHandler( 'wp_CloseOnEscape', [{ event: e, what: 'thickbox', cb: tb_remove }] ) )
						tb_remove();

				} 
				else if ( e.which == 190 )
				{
					if(!(TB_NextHTML == ""))
					{
						jQuery(document).unbind('thickbox');
						goNext();
					}
				} 
				else if ( e.which == 188 )
				{
					if(!(TB_PrevHTML == ""))
					{
						jQuery(document).unbind('thickbox');
						goPrev();
					}
				}
				return false;
			});

			tb_position();
			jQuery("#TB_load").remove();
			jQuery("#TB_ImageOff").click(tb_remove);
			jQuery("#TB_window").css({'visibility':'visible'});
			};

			imgPreloader.src = url;
		}
		else
		{
			var queryString = url.replace(/^[^\?]+\??/,'');
			var params = tb_parseQuery( queryString );

			TB_WIDTH = (params['width']*1) + 30 || 630;
			TB_HEIGHT = (params['height']*1) + 40 || 440;

			ajaxContentW = TB_WIDTH - 30;
			ajaxContentH = TB_HEIGHT - 45;

			if(url.indexOf('TB_iframe') != -1)
			{
				urlNoQuery = url.split('TB_');
				jQuery("#TB_iframeContent").remove(); 
				if(params['modal'] != "true")
				{
					jQuery("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title=''><img src='' /></a></div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;' ></iframe>");
				}
				else
				{
					jQuery("#TB_overlay").unbind();
					jQuery("#TB_window").append("<iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;'>"+thickboxL10n.noiframes+"</iframe>");
				}
			}
			else
			{
				if(jQuery("#TB_window").css("visibility") != "visible")
				{
					if(params['modal'] != "true")
					{
						jQuery("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'><img src='" + tb_closeImage + "' /></a></div></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px'></div>");
					}
					else
					{
						jQuery("#TB_overlay").unbind();
						jQuery("#TB_window").append("<div id='TB_ajaxContent' class='TB_modal' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>");
					}
				}
				else
				{
					jQuery("#TB_ajaxContent")[0].style.width = ajaxContentW +"px";
					jQuery("#TB_ajaxContent")[0].style.height = ajaxContentH +"px";
					jQuery("#TB_ajaxContent")[0].scrollTop = 0;
					jQuery("#TB_ajaxWindowTitle").html(caption);
				}
			}

			jQuery("#TB_closeWindowButton").click(tb_remove);
			if(url.indexOf('TB_inline') != -1)
			{
				jQuery("#TB_ajaxContent").append(jQuery('#' + params['inlineId']).children());
				jQuery("#TB_window").bind('tb_unload', function () {
					jQuery('#' + params['inlineId']).append( jQuery("#TB_ajaxContent").children() ); // move elements back when you're finished
				});
				tb_position();
				jQuery("#TB_load").remove();
				jQuery("#TB_window").css({'visibility':'visible'});
			}
			else if(url.indexOf('TB_iframe') != -1)
			{
				tb_position();
				if(jQuery.browser.safari)
				{
					jQuery("#TB_load").remove();
					jQuery("#TB_window").css({'visibility':'visible'});
				}
			}
			else
			{
				jQuery("#TB_ajaxContent").load(url += "&random=" + (new Date().getTime()),function(){//to do a post change this load method
					tb_position();
					jQuery("#TB_load").remove();
					tb_init("#TB_ajaxContent a.thickbox");
					jQuery("#TB_window").css({'visibility':'visible'});
				});
			}

		}

		if(!params['modal'])
		{
			jQuery(document).bind('keyup.thickbox', function(e) {
				if ( e.which == 27 )
				{
					e.stopImmediatePropagation();
					if ( ! jQuery(document).triggerHandler( 'wp_CloseOnEscape', [{ event: e, what: 'thickbox', cb: tb_remove }] ) )
						tb_remove();

					return false;
				}
			});
		}
	} 
	catch(e) 
	{
		//console.log(e.message)
	}
}

function tb_showIframe()
{
	jQuery("#TB_load").remove();
	jQuery("#TB_window").css({'visibility':'visible'});
}

function tb_remove() 
{
 	jQuery("#TB_imageOff").unbind("click");
	jQuery("#TB_closeWindowButton").unbind("click");
	jQuery("#TB_window").fadeOut("fast",function(){jQuery('#TB_window,#TB_overlay,#TB_HideSelect').trigger("tb_unload").unbind().remove();});
	jQuery("#TB_load").remove();
	if (typeof document.body.style.maxHeight == "undefined") 
	{
		jQuery("body","html").css({height: "auto", width: "auto"});
		jQuery("html").css("overflow","");
	}
	jQuery(document).unbind('.thickbox');
	return false;
}

function tb_position() 
{
	var isIE6 = typeof document.body.style.maxHeight === "undefined";
	jQuery("#TB_window").css({marginLeft: '-' + parseInt((TB_WIDTH / 2),10) + 'px', width: TB_WIDTH + 'px'});
	if ( ! isIE6 ) 
	{
		jQuery("#TB_window").css({marginTop: '-' + parseInt((TB_HEIGHT / 2),10) + 'px'});
	}
}

function tb_parseQuery ( query ) 
{
   var Params = {};
   if ( !query ) 
   {
	   return Params;
   }
   var Pairs = query.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) 
   {
      var KeyVal = Pairs[i].split('=');
      if ( !KeyVal || KeyVal.length != 2 ) 
      {
	      continue;
      }
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
	
   return Params;
}

function tb_getPageSize()
{
	var de = document.documentElement;
	var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
	var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
	arrayPageSize = [w,h];
	return arrayPageSize;
}

function tb_detectMacXFF() 
{
  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox')!=-1) 
  {
	  return true;
  }
}
