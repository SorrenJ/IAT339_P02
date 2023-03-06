// PART 4: ACTING ON CLICKS

/*
	In JavaScript we can tie 'event listeners' - different kind of in-browser events like clicks, scrolls, resizes, and more - to our objects to have them act when a user interacts with the page. In the case below we are adding a listener to our menuToggle (<button> element) which listens to when the user has clicked on the element.
*/
menuToggle.addEventListener('click',
	function() {


		/*
			To make sure that our button works when clicked on, it is a good idea to make use of the console.
		*/
		console.log('menuToggle has been clicked.');


		/*
			Because we do not know for sure if the navigation items are showing (or not) when a user clicks on the button, we should test and act on both conditions. The if/else statement below checks if our menu has a class of 'hidden' using the 'classList.contains(...)' method and acts accordingly.
		*/
		if ( menu.classList.contains('hidden') ) {
			console.log('Menu is hidden, showing the menu.');


			/*
				We want to remove the 'hidden' class to ensure that the navigation items become visible.
			*/
			menu.classList.remove('hidden');


			/*
				Now that we have shown the menu visually, we also should make sure that screen readers understand that the menu is visible for ACCESSIBILITY purposes:

				- 'aria-hidden'; allows us to now make the element visible to screen readers
				- 'aria-expanded'; allows us to indicate that the dropdown has now been expanded
			*/
			menu.setAttribute('aria-hidden', 'false');
			menu.setAttribute('aria-expanded', 'true');


			/*
				To assist ACCESSIBILITY devices interpret the menu correctly, refocusing keyboard navigation on the first menu item (once expanded) is worthwhile. This is where selecting our first navigation item in a variable and using the 'focus(...)' method on it allows us to do so.
			*/
			menuFirstItem.focus();
		}



		/*
			(Else) if the navigation items are already showing...
		*/
		else {
			console.log('Menu is shown, hiding the menu.');


			/*
				We want to remove add 'hidden' class to ensure that the navigation items are hidden.
			*/
			menu.classList.add('hidden');


			/*
				Now that we have hidden the menu visually, we also should make sure that screen readers understand that the menu is hidden for ACCESSIBILITY purposes:

				- 'aria-hidden'; allows us to now hide the element to screen readers
				- 'aria-expanded'; allows us to indicate that the dropdown has been collapsed
			*/
			menu.setAttribute('aria-hidden', 'true');
			menu.setAttribute('aria-expanded', 'false');
		}

	}
);
