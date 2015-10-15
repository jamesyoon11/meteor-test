
Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
});

Router.map(function() {
    
    this.route('Home', {
        path: '/',
        template: 'home'
    });


    this.route('About', {
        path: '/about',
        template: 'about'
    });


    this.route('Search', {
        path: '/search',
        template: 'search'
    });
});
