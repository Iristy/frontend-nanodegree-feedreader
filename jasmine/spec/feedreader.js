/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('urls are defined and not empty', () => {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined and not empty', () => {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', () => {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', () => {
            const menu = document.querySelector('.slide-menu');
            expect(menu.parentElement.classList.contains('menu-hidden')).toBe(true);

            // Detect if menu is within the viewport.
            const boundingRect = menu.getBoundingClientRect();
            expect(boundingRect.x).toBeLessThanOrEqual(0);
            expect(boundingRect.x + boundingRect.width).toBeLessThanOrEqual(0);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('is visible after menu icon is clicked by', () => {
            const menuIcon = document.querySelector('.menu-icon-link');

            menuIcon.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);

            menuIcon.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', () => {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach((cb) => loadFeed(0, cb));

        it('is called', () => {
            let feed = document.querySelector('.feed');
            let entry = feed.querySelector('.entry-link');

            // If any entry exists, then the feed is loaded and not empty.
            expect(entry).not.toBeUndefined();
            expect(entry).not.toBe(null);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {

        // Keep a global reference to the first entry of feed id 1.
        let entry1;

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach((cb) => {
            const feed = document.querySelector('.feed');
            loadFeed(0, () => {
                loadFeed(1, cb);
                entry1 = feed.querySelector('.entry-link');
            });
        });

        it('content changed', () => {
            const feed = document.querySelector('.feed');
            let entry0 = feed.querySelector('.entry-link');
            
            // Compare the first entry for each feed.
            expect(entry0).not.toBe(entry1);
        });
    });
}());
