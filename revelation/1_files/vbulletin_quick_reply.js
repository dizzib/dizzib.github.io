/*======================================================================*\
|| #################################################################### ||
|| # vBulletin 3.6.7 PL1
|| # ---------------------------------------------------------------- # ||
|| # Copyright �2000-2007 Jelsoft Enterprises Ltd. All Rights Reserved. ||
|| # This file may not be redistributed in whole or significant part. # ||
|| # ---------------- VBULLETIN IS NOT FREE SOFTWARE ---------------- # ||
|| # http://www.vbulletin.com | http://www.vbulletin.com/license.html # ||
|| #################################################################### ||
\*======================================================================*/

var qr_repost = false;
var qr_errors_shown = false;
var qr_active = false;
var qr_posting = 0;
var clickedelm = false;

/**
* Initializes the quick reply system
*/
function qr_init()
{
	qr_disable_controls();
	qr_init_buttons(fetch_object('posts'));
}

/**
* Steps through the given object activating all quick reply buttons it finds
*
* @param	object	HTML object to search
*/
function qr_init_buttons(obj)
{
	var anchors = fetch_tags(obj, 'a');
	for (var i = 0; i < anchors.length; i++)
	{
		if (anchors[i].id && anchors[i].id.substr(0, 3) == 'qr_')
		{
			anchors[i].onclick = function(e) { return qr_activate(this.id.substr(3)); };
		}
	}
}

/**
* Disables the controls in the quick reply system
*/
function qr_disable_controls()
{
	if (require_click)
	{
		fetch_object('qr_postid').value = 0;

		vB_Editor[QR_EditorID].disable_editor(vbphrase['click_quick_reply_icon']);

		var qr_sig = fetch_object('cb_signature');
		if (qr_sig != null)
		{
			qr_sig.disabled = true;
		}

		active = false;
	}
	else
	{
		vB_Editor[QR_EditorID].write_editor_contents('');
	}

	if (threaded_mode != 1)
	{
		fetch_object('qr_quickreply').disabled = true;
	}

	qr_active = false;
}

/**
* Activates the controls in the quick reply system
*
* @param	integer	Post ID of the post to which we are replying
*
* @return	boolean	false
*/
function qr_activate(postid)
{
	var qr_collapse = fetch_object('collapseobj_quickreply');
	if (qr_collapse && qr_collapse.style.display == "none")
	{
		toggle_collapse('quickreply');
	}

	fetch_object('qr_postid').value = postid;
	fetch_object('qr_preview').select();
	fetch_object('qr_quickreply').disabled = false;

	var qr_sig = fetch_object("cb_signature");
	if (qr_sig)
	{
		qr_sig.disabled = false;
		// Workaround for 3.5 Bug # 1618: Set checked as Firefox < 1.5 "forgets" that when checkbox is disabled via JS
		qr_sig.checked = true;
	}

	if (qr_active == false)
	{
		vB_Editor[QR_EditorID].enable_editor('');
	}

	if (!is_ie && vB_Editor[QR_EditorID].wysiwyg_mode)
	{
		fetch_object('qr_scroll').scrollIntoView(false);
	}

	vB_Editor[QR_EditorID].check_focus();

	qr_active = true;

	return false;
}

/**
* Checks the contents of the new reply and decides whether or not to allow it through
*
* @param	object	<form> object containing quick reply
* @param	integer	Minimum allowed characters in message
*
* @return	boolean
*/
function qr_prepare_submit(formobj, minchars)
{
	if (qr_repost == true)
	{
		return true;
	}

	if (!allow_ajax_qr || !AJAX_Compatible)
	{
		// not last page, or threaded mode - do not attempt to use AJAX
		return qr_check_data(formobj, minchars);
	}
	else if (qr_check_data(formobj, minchars))
	{
		var test_ajax = new vB_AJAX_Handler(true);
		if (!test_ajax.init() || (typeof vb_disable_ajax != 'undefined' && vb_disable_ajax > 0))
		{
			// couldn't initialize, return true to allow click to go through
			return true;
		}

		if (is_ie && userAgent.indexOf('msie 5.') != -1)
		{
			// IE 5 has problems with non-ASCII characters being returned by
			// AJAX. Don't universally disable it, but if we're going to be sending
			// non-ASCII, let's not use AJAX.
			if (PHP.urlencode(formobj.message.value).indexOf('%u') != -1)
			{
				return true;
			}
		}

		if (qr_posting == 1)
		{
			return false;
		}
		else
		{
			qr_posting = 1;
			setTimeout("qr_posting = 0", 1000);
		}

		if (clickedelm == formobj.preview.value)
		{
			return true;
		}
		else
		{
			var submitstring = 'ajax=1';
			if (typeof ajax_last_post != 'undefined')
			{
				submitstring += '&ajax_lastpost=' + PHP.urlencode(ajax_last_post);
			}

			for (i = 0; i < formobj.elements.length; i++)
			{
				var obj = formobj.elements[i];

				if (obj.name && !obj.disabled)
				{
					switch (obj.type)
					{
						case 'text':
						case 'textarea':
						case 'hidden':
							submitstring += '&' + obj.name + '=' + PHP.urlencode(obj.value);
							break;
						case 'checkbox':
						case 'radio':
							submitstring += obj.checked ? '&' + obj.name + '=' + PHP.urlencode(obj.value) : '';
							break;
						case 'select-one':
							submitstring += '&' + obj.name + '=' + PHP.urlencode(obj.options[obj.selectedIndex].value);
							break;
						case 'select-multiple':
							for (var j = 0; j < obj.options.length; j++)
							{
								submitstring += (obj.options[j].selected ? '&' + obj.name + '=' + PHP.urlencode(obj.options[j].value) : '');
							}
							break;
					}
				}
			}

			fetch_object('qr_posting_msg').style.display = '';
			document.body.style.cursor = 'wait';

			qr_ajax_post(formobj.action, submitstring);
			return false;
		}
	}
	else
	{
		return false;
	}
}

/**
* Works with form data to decide what to do
*
* @param	object	<form> object containing quick reply
* @param	integer	Minimum allowed characters in message
*
* @return	boolean
*/
function qr_check_data(formobj, minchars)
{
	switch (fetch_object('qr_postid').value)
	{
		case '0':
		{
			alert(vbphrase['click_quick_reply_icon']);
			return false;
		}

		case 'who cares':
		{
			if (typeof formobj.quickreply != 'undefined')
			{
				formobj.quickreply.checked = false;
			}
			break;
		}
	}

	if (clickedelm == formobj.preview.value)
	{
		minchars = 0;
	}

	return vB_Editor[QR_EditorID].prepare_submit(0, minchars);
}

/**
* Sends quick reply data to newreply.php via AJAX
*
* @param	string	GET string for action (newreply.php)
* @param	string	String representing form data ('x=1&y=2&z=3' etc.)
*/
function qr_ajax_post(submitaction, submitstring)
{
	qr_repost = false;
	xml = new vB_AJAX_Handler(true);
	xml.onreadystatechange(qr_do_ajax_post);
	xml.send(submitaction, submitstring);
}

/**
* Handles quick reply data when AJAX says qr_ajax_post() is complete
*/
function qr_do_ajax_post()
{
	if (xml.handler.readyState == 4 && xml.handler.status == 200)
	{
		if (xml.handler.responseXML)
		{
			document.body.style.cursor = 'auto';
			fetch_object('qr_posting_msg').style.display = 'none';
			qr_posting = 0;

			if (fetch_tag_count(xml.handler.responseXML, 'postbit'))
			{
				ajax_last_post = xml.fetch_data(fetch_tags(xml.handler.responseXML, 'time')[0]);
				qr_disable_controls();
				qr_hide_errors();

				var postbits = fetch_tags(xml.handler.responseXML, 'postbit');
				for (var i = 0; i < postbits.length; i++)
				{
					var newdiv = document.createElement('div');
					newdiv.innerHTML = xml.fetch_data(postbits[i]);
					var lp = fetch_object('lastpost');
					var lpparent = lp.parentNode;
					var postbit = lpparent.insertBefore(newdiv, lp);

					PostBit_Init(postbit, postbits[i].getAttribute('postid'));
				}

				// unfocus the qr_submit button to prevent a space from resubmitting
				if (fetch_object('qr_submit'))
				{
					fetch_object('qr_submit').blur();
				}
			}
			else
			{
				if (!is_saf)
				{
					// this is the nice error handler, of which Safari makes a mess
					var errors = fetch_tags(xml.handler.responseXML, 'error');

					var error_html = '<ol>';
					for (var i = 0; i < errors.length; i++)
					{
						error_html += '<li>' + xml.fetch_data(errors[i]) + '</li>';
					}
					error_html += '</ol>';

					qr_show_errors('<ol>' + error_html + '</ol>');

					if (is_ie)
					{
						xml.handler.abort();
					}

					return false;
				}

				// this is the not so nice error handler, which is a fallback in case the previous one doesn't work

				qr_repost = true;
				fetch_object('qrform').submit();
			}
		}
		else
		{
			qr_repost = true;
			fetch_object('qrform').submit();
		}

		if (is_ie)
		{
			// in my tests, FF freaks out if I do this abort call here...
			// however, it seems to be necessary (in local tests) for IE
			xml.handler.abort();
		}
	}
}

/**
* Un-hides the quick reply errors element
*
* @param	string	Error(s) to show
*
* @return	boolean	false
*/
function qr_show_errors(errortext)
{
	qr_errors_shown = true;
	fetch_object('qr_error_td').innerHTML = errortext;
	fetch_object('qr_error_tbody').style.display = '';
	vB_Editor[QR_EditorID].check_focus();
	return false;
}

/**
* Hides the quick reply errors element
*
* @return	boolean	false
*/
function qr_hide_errors()
{
	if (qr_errors_shown)
	{
		qr_errors_shown = true;
		fetch_object('qr_error_tbody').style.display = 'none';
		return false;
	}
}

var vB_QuickReply = true;

/*======================================================================*\
|| ####################################################################
|| # Downloaded: 17:54, Thu May 31st 2007
|| # CVS: $RCSfile$ - $Revision: 16993 $
|| ####################################################################
\*======================================================================*/