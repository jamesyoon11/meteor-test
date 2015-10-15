Meteor.startup(function() {

    if (Jobs.find().count() === 0) {
        // Create sample data.
        var jobs = [
            {   
                title: 'Sales Associate',
                poster: 'Diptyque Paris',
                rate: 16,
                city: 'Los Angeles',
                state: 'CA',
                zipcode: 90019,
                lat: 34.048411,
                lng: -118.34015
            },
            {   
                title: 'Key Holder',
                poster: 'Alternative',
                rate: 14,
                city: 'Los Angeles',
                state: 'CA',
                zipcode: 90019,
                lat: 34.048411,
                lng: -118.34015
            },
            {   
                title: 'Sales Associate',
                poster: 'Alternative',
                rate: 11.5,
                city: 'Los Angeles',
                state: 'CA',
                zipcode: 90019,
                lat: 34.048411,
                lng: -118.34015
            },
            {   
                title: 'Catering Server',
                poster: 'Argyle Event Staffing',
                rate: 12,
                city: 'Los Angeles',
                state: 'CA',
                zipcode: 90010,
                lat: 34.062709,
                lng: -118.31481
            },
            {   
                title: 'Culinary Assistants',
                poster: 'Argyle Event Staffing',
                rate: 11,
                city: 'Los Angeles',
                state: 'CA',
                zipcode: 90010,
                lat: 34.062709,
                lng: -118.31481
            },
            {   
                title: 'Retail/Boutique Sales Associate',
                poster: 'LIBRARY volume one',
                rate: 12,
                city: 'Los Angeles',
                state: 'CA',
                zipcode: 90033,
                lat: 34.050411,
                lng: -118.21195
            },
            {   
                title: 'Prep Cook',
                poster: 'Larchmont Bungalow',
                rate: 10,
                city: 'Los Angeles',
                state: 'CA',
                zipcode: 90004,
                lat: 34.07711,
                lng: -118.30755
            },
            {   
                title: 'Food Runner',
                poster: 'Larchmont Bungalow',
                rate: 10,
                city: 'Los Angeles',
                state: 'CA',
                zipcode: 90004,
                lat: 34.07711,
                lng: -118.30755
            },
            {   
                title: 'Cashier/Food Prep/Make Fruit Bowls/Kitchen Help',
                poster: 'Ubatuba Acai',
                rate: 9,
                city: 'Los Angeles',
                state: 'CA',
                zipcode: 90013,
                lat: 34.044662,
                lng: -118.24255
            },
            {   
                title: 'Cashier',
                poster: 'Lemonade (Larchmont)',
                rate: 10,
                city: 'Los Angeles',
                state: 'CA',
                zipcode: 90004,
                lat: 34.07711,
                lng: -118.30755
            },
            {   
                title: 'Servers',
                poster: 'Sushi One Omakase Bar',
                rate: 10,
                city: 'Los Angeles',
                state: 'CA',
                zipcode: 90013,
                lat: 34.044662,
                lng: -118.24255
            },
            {   
                title: 'Servers/Hosts',
                poster: 'Maré',
                rate: 10,
                city: 'Los Angeles',
                state: 'CA',
                zipcode: 90064,
                lat: 34.03457,
                lng: -118.42843
            },
            {   
                title: 'Hostess',
                poster: 'Maré',
                rate: 10,
                city: 'Los Angeles',
                state: 'CA',
                zipcode: 90064,
                lat: 34.03457,
                lng: -118.42843 
            },
            {   
                title: 'Barback',
                poster: 'Maré',
                rate: 10,
                city: 'Los Angeles',
                state: 'CA',
                zipcode: 90064,
                lat: 34.03457,
                lng: -118.42843
            },
            {   
                title: 'Manicurist or a Hairstylist',
                poster: 'Flors Hair Studio',
                rate: 20,
                city: 'Los Angeles',
                state: 'CA',
                zipcode: 90025,
                lat: 34.045006,
                lng: -118.44527
            }
        ];

        // Insert sample data into db.
        jobs.forEach(function(aJob) {
            Jobs.insert(aJob);
        });
    }
});

// Aggregate data group by zipcode
Meteor.publish("jobListByZip", function() {

    var pipeline = [
        {
            $group: {
                _id: '$zipcode',
                'total' : { $sum: 1 },
                'avg_pay': {$avg: '$rate'},
                'lat': { $avg: '$lat' },
                'lng': { $avg: '$lng' }
            }
        }
    ];

     
    var buffer = Jobs.aggregate(pipeline);

    var self = this;

    _(buffer).each(function(item){
        self.added ('jobAggregate', item._id, item);
    });

    self.ready();
    
});

