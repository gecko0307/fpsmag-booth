$(document).ready(function()
{
    "use strict";
    $('#Scrollable').perfectScrollbar({suppressScrollX: true});
	
    $("#NavigatorLeft").click(function(e)
	{
        e.preventDefault();
        loadElementsList(prevLevel());
    });
	
    $("#NavigatorRight").click(function(e)
	{
        e.preventDefault();
    });
	
	loadElementsList("root.list");
});

// TODO: redesign this with a stack
var level = 0;
var folder = "root.list";
function prevLevel()
{
    if (level == 0 || level == 1)
	    return "root.list";
    else
	{
	    return folder;
	}
}

function loadElementsList(jsonFile)
{
    var success = false;
	$("#NavigatorInfo").text("FPS Magazine");

    $('#ScrollableContent').empty();
    $.getJSON(jsonFile, function(data)
    {
        $.each(data, function(index, element)
        {
            img = "unknown.jpg";
            if ("img" in element)
                img = element.img;
            var item = $("<div>",
            {
                "class": "FPSListElement",
                "style": "background-image: url('thumbs/" + img + "');"
            });

            var a = $("<a>",
            {
                "class": "FPSLink",
                href: element.url
            }).appendTo('#ScrollableContent');

            item.hover(function()
            {
                $("#NavigatorInfo").text(element.title);
            });
			
			item.mouseleave(function()
			{
                $("#NavigatorInfo").text("FPS Magazine");
            });

            a.click(function(e)
            {
                e.preventDefault();
				level = level + 1;
				if (extension(element.url) == "list")
                    loadElementsList(element.url);
				else if (extension(element.url) == "page")
				    loadPage("pages/" + element.url);
            });

            item.appendTo(a);
			
			success = true;
        });
    });
}

function numberOfElements()
{
    return $("#ScrollableContent").children().length;
}

function loadPage(jsonFile)
{
    var success = false;
	$("#NavigatorInfo").text("FPS Magazine");

    $('#ScrollableContent').empty();
    $.getJSON(jsonFile, function(data)
    {
        $.each(data, function(index, element)
        {
			$("#ScrollableContent").load("pages/" + element.html, function()
			{
            });
			
			success = true;
			
			$("#NavigatorInfo").text(element.title);
        });
	});
}

function extension(filename)
{
    return filename.split('.').pop();
}