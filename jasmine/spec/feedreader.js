/* feedreader.js*/

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        /* This  tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has urls', function() {
            allFeeds.forEach(
                function(f) {
            expect(f.url).toBeDefined();
            expect(f.url.length).not.toBe(0);
                });
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name', function() {
            allFeeds.forEach(
                function(f) {
            expect(f.name).toBeDefined();
            expect(f.name.length).not.toBe(0);
                });
        });
    });

    describe('The menu', function() {

        /* A test that ensures the menu element is
         * hidden by default.
         */
         it("hides menu", function() {
            expect($("body").hasClass("menu-hidden")).toBe(true);
         });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
          it("toggles menu", function() {
            $('.menu-icon-link').click();
            expect($("body").hasClass("menu-hidden")).toBe(false);
            $('.menu-icon-link').click();
            expect($("body").hasClass("menu-hidden")).toBe(true);
          });
    });

    describe('Initial Entries', function() {

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         beforeEach(function(done) {
            setTimeout(function() {
             loadFeed(1, done);
            }, 5);});
    
        it("creates an entry", function(){
            expect($(".entry-link").length > 0).toBe(true);

        });});

    describe("New Feed Selection", function () {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * It does this via callbacks, saving the top url before and
         * after a feed change.
         */
         var startUrl, endUrl;

         beforeEach(function(done) {
            setTimeout(function() {
             loadFeed(1, 
                function() {
                    startUrl = $(".entry-link")[0].href;
                    setTimeout(function() {
                     loadFeed(0,
                        function() {
                            endUrl = $(".entry-link")[0].href;
                            done();
                        });
                    }, 5);
                }
                );
            }, 5);});

         // Ensure that during the earlier feed loading, the url of the
         // first article changed.
         it("updates feed", function(){
            expect(startUrl).not.toBe(endUrl);
         });});
}());
