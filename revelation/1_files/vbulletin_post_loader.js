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

/**
* Attempts to display a post via AJAX, falling back to opening a new window if AJAX not available
*
* @param	integer	Post ID
*
* @return	boolean	False
*/
function display_post(postid)
{
	if (AJAX_Compatible)
	{
		vB_PostLoader[postid] = new vB_AJAX_PostLoader(postid);
		vB_PostLoader[postid].init();
	}
	else
	{
		pc_obj = fetch_object('postcount' + this.postid);
		openWindow('showpost.php?' + (SESSIONURL ? 's=' + SESSIONURL : '') + (pc_obj != null ? '&postcount=' + PHP.urlencode(pc_obj.name) : '') + '&p=' + postid);
	}
	return false;
};

// #############################################################################
// vB_AJAX_PostLoader
// #############################################################################

var vB_PostLoader = new Array();

/**
* Class to load a postbit via AJAX
*
* @param	integer	Post ID
*/
function vB_AJAX_PostLoader(postid)
{
	this.postid = postid;
	this.container = fetch_object('edit' + this.postid);
};

/**
* Initiates the AJAX send to showpost.php
*/
vB_AJAX_PostLoader.prototype.init = function()
{
	if (this.container)
	{
		postid = this.postid;
		pc_obj = fetch_object('postcount' + this.postid);
		this.ajax = new vB_AJAX_Handler(true);
		this.ajax.onreadystatechange(vB_PostLoader[postid].ajax_check);
		this.ajax.send('showpost.php?p=' + this.postid,
			'ajax=1&postid=' + this.postid +
			(pc_obj != null ? '&postcount=' + PHP.urlencode(pc_obj.name) : '')
		);
	}
};

/**
* Onreadystate handler for AJAX post loader
*
* @return	boolean	False
*/
vB_AJAX_PostLoader.prototype.ajax_check = function()
{
	var AJAX = vB_PostLoader[postid].ajax.handler;

	if (AJAX.readyState == 4 && AJAX.status == 200)
	{
		vB_PostLoader[postid].display(AJAX.responseXML);

		if (is_ie)
		{
			AJAX.abort();
		}
	}

	return false;
};

/**
* Takes the AJAX HTML output and replaces the existing post placeholder with the new HTML
*
* @param	string	Postbit HTML
*/
vB_AJAX_PostLoader.prototype.display = function(postbit_xml)
{
	if (fetch_tag_count(postbit_xml, 'postbit'))
	{
		this.container.innerHTML = this.ajax.fetch_data(fetch_tags(postbit_xml, 'postbit')[0]);
		PostBit_Init(fetch_object('post' + this.postid), this.postid);
	}
	else
	{	// parsing of XML failed, probably IE
		openWindow('showpost.php?' + (SESSIONURL ? 's=' + SESSIONURL : '') + (pc_obj != null ? '&postcount=' + PHP.urlencode(pc_obj.name) : '') + '&p=' + this.postid);
	}
};

/*======================================================================*\
|| ####################################################################
|| # Downloaded: 17:54, Thu May 31st 2007
|| # CVS: $RCSfile$ - $Revision: 15091 $
|| ####################################################################
\*======================================================================*/