app.controller('VideoSystemController',
    function ($scope) {

        $scope.videos = [
            {
                title : 'Top 5 handball saves : Round 8',
                picture : 'http://images.laola1.tv/268209_195x111.jpg',
                length : '1:00',
                category : 'Sport',
                subscribersCount : '',
                Date : new Date(2014, 12, 12).toDateString(),
                HaveSubtitles : false,
                comments : [
                    {
                        username : 'Kim Anderson',
                        Date : new Date(2014, 12, 13, 12, 14).toDateString(),
                        content : 'All saves in this round are amazing',
                        pictureUrl : 'http://images.eurohandball.com/news/2_cl/01_previe_120px_08/andersson_kim200.jpg'
                    }
                ]
            },
            {
                title : 'Animals in Africa',
                picture : 'http://www.tkshare.com/wp-content/uploads/2009/06/123615buh.jpg',
                length : '7:51',
                category : 'History',
                subscribersCount : '',
                Date : new Date(2014, 12, 12).toDateString(),
                HaveSubtitles : false,
                comments : [
                    {
                        username : 'Steve Kearney',
                        Date : new Date(2014, 12, 14, 15, 16).toDateString(),
                        content : 'The information that I get from this video is useful for me!',
                        pictureUrl : 'http://healthwildcatters.com/wp-content/uploads/2013/07/Steve-Kearney-200x200.jpg'
                    }
                ]
            }
        ]
    });