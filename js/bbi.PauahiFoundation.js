/*! (c) Blackbaud, Inc. */

/** 
 * REGISTER:
 * First, give your new application a name.
 * This can be the organization's name, or an alias that is unique.
 * Next, fill in the array with any plugin dependencies the app may require.
 **/ 
BBI.register({
    alias: "PauahiFoundation",
    requires: [],
    author: "Lucas Cobb",
    client: "Pauahi Foundation",
    created: "2014/11/13",
    assignment_numbers: "A-0133766, A-0133767, A-0133769,", // SalesForce assignment numbers
    changelog: []
})

.scope(function (app, bbi, $) {
	return {
	isEdit: bbi.isPageEditor()
	};
})


.action("mainNav", function(app, bbi, $) {
	$(document).ready(function () {
// 			Changes the BBNC Menu into a Bootstrap menu			
			$('#wrapNav .menu.mainMenu').addClass('nav navbar-nav navbar-right');		
			$('#wrapNav li.selected').addClass('active');
			$('#wrapNav ul.nav.navbar-nav > li.parent').addClass('dropdown');
			$('#wrapNav ul.nav.navbar-nav li.parent li.parent').addClass('dropdown-submenu');
			$('#wrapNav li.dropdown-submenu > a').addClass('dropdown-toggle');
			$('#wrapNav li.dropdown > a').addClass('dropdown-toggle');
			$('#wrapNav .dropdown-toggle').attr('data-toggle', 'dropdown');
			$('#wrapNav a.dropdown-toggle + ul').addClass('dropdown-menu');
			$('#wrapNav li.divider > a').remove();
			$('#wrapNav li.dropdown-header a').addClass('headerVanish').wrapInner( "<span></span>" ).children().unwrap();
			$('#wrapNav .navbar-right .dropdown-submenu').addClass('pull-left');
			
			//inserts caret onto menu icon because BBNC wysiwyg strips it out
			$('#wrapNav .dropdown > .dropdown-toggle').append( "<b class='caret'></b>" );
			
			//inserts menu icon because BBNC wysiwyg strips it out
			$('.navbar-toggle.collapsed .sr-only').after( "<span class='icon-bar'></span><span class='icon-bar'></span><span class='icon-bar'></span>");
			
			//Adds third level dropdown menus
			$('#wrapNav ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {

			    // Avoid following the href location when clicking
			    event.preventDefault(); 

			    // Avoid having the menu to close when clicking
			    event.stopPropagation(); 

			    // If a menu is already open we close it
			    //$('ul.dropdown-menu [data-toggle=dropdown]').parent().removeClass('open');
			    // opening the one you clicked on
			    $(this).parent().addClass('open');
			
			
			    var menu = $(this).parent().find("ul");
			    var menupos = menu.offset();
			  
			    if ((menupos.left + menu.width()) + 30 > $(window).width()) {
			        var newpos = - menu.width();      
			    } else {
			        var newpos = $(this).parent().width();
			    }
			    menu.css({ left:newpos });
			
			});
			// disable click and go on small screens
			var $win = $(window);
			$win.resize(function () {
			  if ($win.width() > 768)
			      $(".navbar-nav > .dropdown > a").attr("data-toggle", "");
			  else
			      $(".navbar-nav > .dropdown > a").attr("data-toggle", "dropdown");
			}).resize();
			$(".dropdown-menu").find("input, button").each(function () {
			  $(this).click(function (e) {
			      e.stopPropagation();
			  });
			});
			// nests the top level title into a span, then changes the meta title into smaller text for tablet if needed.
			var items = $('.navbar-nav > li > a');
            $.each(items, function(k,v) {
                var a = $(v),
                    t = a.text(),
                    n = a.attr('title');
                    new_title = $('<span />', {'class': 'hidden-sm hidden-md',text: t}).add($('<span />', {'class': 'hidden-xs hidden-lg', text: n}));
                a.html(new_title);
                /* console.log(new_title); */
            });			
			
			//now it has everything it needs, lets display it
			$('.navbar-collapse ul.nav, #wrapNav .mainMenu li.hiddenMenu, #wrapNav').css( "display", "block" );
	});	
})



.action("offCanvas", function(app, bbi, $) {
    return {
        init: function (options, element) {
			//give the off canvas menu the stuff it needs
			$('#wrapNav .offcanvas').attr('data-toggle', 'offcanvas');
			$('.sidebar-offcanvas').attr('role', 'navigation');
			$('[data-toggle="offcanvas"]').click(function () {
				$('.row-offcanvas').toggleClass('active');
			});
			$('#wrapNav .offcanvas ul').addClass('hidden-lg hidden-md hidden-sm');
        }
    };
})


// .action("makeJumbotron", function(app, bbi, $) {
//     $(document).ready(function () {
// 		$('.isViewer .jumbotron').backgroundIMG({
// 			'imageCont': '.jumbotron'
// 		});	
// 	});	
// })


.action("breadCrumbs", function(app, bbi, $) {
	$(document).ready(function () {
		$("#contentPrimary .mainMenu" ).wrapInner( "<li class='hmLink selected parent'><ul class='nccUlMenuSub0'></ul></li>");
		$("#contentPrimary .mainMenu .nccUlMenuSub0" ).before( "<a href='/'>Home</a>");
	});
})

.action("quickSearch", function(app, bbi, $) {
	$(document).ready(function () {
		if (!bbi.isPageEditor()) {
			// strips the table elements
			var list = $('.quickSearch table td *');
	    	$('.quickSearch').html(list.get());
	    	// removes labels
	    	$("label[id*=lblTxtSearch]" ).remove();
	    	$("label[id*=lblQuickSearch]" ).remove();
			// wraps quickSearch in bootstrap form
			$("div[class*=quickSearch]" ).wrapInner( "<form class='navbar-form' role='search'><div class='input-group'></div></form>");
			$("input[class*=QuickSearchButton]" ).wrap( "<div class='input-group-btn'></div>");
			// ads bootstrap class to input box
			$("input[class*=QuickSearchTextbox]" ).addClass( "form-control" );
		}
	});
})

.action("socialIcons", function(app, bbi, $) {
	$(document).ready(function () {
		// adds spans on social sharing
		$("ul[class*=social-media] .ShareThis a").wrapInner( "<span class='st_sharethis_custom fa-stack fa-lg'></span>");
		$("ul[class*=social-media] .ShareThis a").replaceWith(function() {
		 return $('span', this);
		});
		
		// adds spans on social links for font awesome
		$("ul[class*=social-media] a" ).wrapInner( "<span class='fa-stack fa-lg'></span>");
		$("ul[class*=social-media] span.fa-stack" ).wrapInner( "<i class='fa fa-stack-2x'></i>");
		$("ul[class*=social-media] span.fa-stack i.fa-stack-2x" ).after( "<i class='fa fa-stack-1x fa-inverse'></i>");
		
		// then gives it its icon
		$("ul[class*=social-media] a[href*=facebook] span i + i" ).addClass( "fa-facebook" );
		$("ul[class*=social-media] a[href*=twitter] span i + i" ).addClass( "fa-twitter" );
		$("ul[class*=social-media] a[href*=youtube] span i + i" ).addClass( "fa-youtube" );
		$("ul[class*=social-media] a[href*=tumblr] span i + i" ).addClass( "fa-tumblr" );
		$("ul[class*=social-media] a[href*=pinterest] span i + i" ).addClass( "fa-pinterest" );
		$("ul[class*=social-media] a[href*=google] span i + i" ).addClass( "fa-google-plus" );
		$("ul[class*=social-media] a[href*=linkedin] span i + i" ).addClass( "fa-linkedin" );
		$("ul[class*=social-media] a[href*=flickr] span i + i" ).addClass( "fa-flickr" );
		$("ul[class*=social-media] a[href*=instagram] span i + i" ).addClass( "fa-instagram" );
		$("ul[class*=social-media] a[href*=rss] span i + i" ).addClass( "fa-rss" );
		$("ul[class*=social-media] a[href*=mailto] span i + i" ).addClass( "fa-envelope-o" );
		$("ul[class*=social-media] a[href*=giving] span i + i" ).addClass( "fa-rebel" );
		$("ul[class*=social-media] .ShareThis span i + i" ).addClass( "fa-share-alt" );
		
		//then removes any unneeded text
		$('ul[class*=social-media] span i').text('');
		
		//determin the shape of the icon
		$("ul[class*=social-media].circle i.fa-stack-2x").addClass( "fa-circle" );
		$("ul[class*=social-media].circle-o i.fa-stack-2x").addClass( "fa-circle-o" );
		$("ul[class*=social-media].square i.fa-stack-2x").addClass( "fa-square" );
		$("ul[class*=social-media].square-o i.fa-stack-2x").addClass( "fa-square-o" );
		$("ul[class*=social-media].heart i.fa-stack-2x").addClass( "fa-heart" );
		$("ul[class*=social-media].star i.fa-stack-2x").addClass( "fa-star" );
		$("ul[class*=social-media].star-o i.fa-stack-2x").addClass( "fa-star-o" );
	});
})

.action("injectBootstrapInBBNC", function(app, bbi, $) {
	$(document).ready(function () {
// 		Progress Bars
		$(".BBSequenceMap").addClass("progress");
		$(".BBSequenceMapStep").addClass("progress-bar");
// 		Default Buttons
		$('.BBSequenceMapNavigationPreviousButton,.BBFormDisplaySequenceMapOptionalContainer .BBSequenceMapNavigationButton').addClass('btn btn-default');
// 		Action Buttons
		$('.BBFormSubmitButton,.BBSequenceMapNavigationNextButton,.BBFormDisplayLinkButton,input[type=button]').addClass('btn btn-brand-primary');		
// 		Makes main images responsive
		$("#contentPrimary img,#contentSecondary img,.jumbotron img" ).addClass( "img-responsive" );
		$("#BodyId .CalendarViewBottomIcons img,#BodyId .EventCalendarButtonBar img,[id*='ExportCell'] img,#BodyId .NewsChannelFormTitle img,#BodyId img.UpcomingAssignmentsDropboxImage,.BBLinkHelpIcon img").removeClass("img-responsive");// stops the calendar icons being responsive.
// 		format cations
		$(".alignright" ).addClass( "pull-right" );
		$(".alignleft" ).addClass( "pull-left" );
// 		Make Tables Responsive
		$( ".isViewer #content-primary table, .isViewer .Ev2_PriceTypesContainer" ).addClass('table table-bordered').wrap( "<div class='table-responsive'></div>" );
// 		Converst BBNC heading to Bootstrap
		$( ".SurveyTitle, .ReportTitle, .NCC_Forms_Title, .SearchFormTitle, .EventCalendarName, .BBMembershipFormTitle, .BBDocumentFormTitle span, .DiscussionGroupFormTitle span, .JobBoardFormTitle span, .ReportTitle, .heading, .ClassPageHeaderClassName span" ).wrap( "<h1></h1>" );
		$( ".LoginSectionHeader, .LoginFormTitle, .DonationListingHeading span, .DonationCaptureListingHeading span, .CalendarFormLegend span, .ListViewDateLabel, .CalendarViewTopMiddle span, .EventSectionHeader span, .DetailCaption span, .NewsReaderFormTitle span, .ProfileFormTitle span, .UpcomingEventTitle span, .RecentEventTitle span, .SubscriptionFormTitle span, .BBAnonymousSubscriptionTitle span, .BBMembershipFormTitle span, .DirectoryFormTitle span, .BBVolOpJobListTitle span, .BBVolOpJobDetailTitle span, .NewsChannelFormTitle span, .PostChannelStoryFormTitle span, .SpellFormTitle span, .BBPollsFormTitle span, .BBNotesTitle span, .ECardWizardHeading span, .ReportsLandingTable caption, .DiscussionGroupHeadingText span, .SearchJobHeading span, .JobResultsHeading span" ).wrap( "<h2></h2>" );
		$( ".ListViewEventDate, .EventItemTitleTime, .EventItemTitleName, .EventItemRegistrationsHeader, .EventItemRegistrantsEventName, .NewsChannelItemTitle span, .ReportListingHeading" ).wrap( "<h3></h3>" );
// 		Form Formatting
		$(".BBFormDisplayTextbox,.BBFormDisplaySelectList,.BBFormTextArea,.BBFormTextbox").addClass("form-control");
	});	
})

.action("occToBootstrapPanels", function(app, bbi, $) {
	$(document).ready(function () {
			$(".UPMPartEditToolbarTitle").addClass("panel-heading");
			$(".UPMPartEditToolbarTitle span" ).wrap( "<h3 class='panel-title'></h3>" );
			$(".ClassPagePartContent,.OCCPartDisplayDiv").addClass("panel-body");
			$('.OCCHeader').each(function() {
				
				$(this).next('.ClassPagePartContent,.OCCPartDisplayDiv').andSelf().wrapAll('<div class="panel panel-info" />');
				
			});
			$(".UPMDisplay" ).wrap( "<div class='panel panel-info'></div>" ).before( "<div class='panel-heading'><h3 class='panel-title'>Campus Manager</h3></div>").wrap( "<div class='panel-body'></div>" );
	});	
})





/** 
 * BUILD:
 * This method installs all plugin dependencies, then executes all actions at once.
 * If the action has an init function, it will need to be called outside of this file,
 * wrapped in a 'bbi.ready' event.
 **/
.build();