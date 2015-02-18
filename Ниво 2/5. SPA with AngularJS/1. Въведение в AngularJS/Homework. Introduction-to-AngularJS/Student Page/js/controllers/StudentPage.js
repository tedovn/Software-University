app.controller('StudentPage', function($scope){

    $scope.name = 'Student Page';

    var students = [{

            'name' : 'Pesho',
            'photo' : 'http://www.nakov.com/wp-content/uploads/2014/05/SoftUni-Logo.png',
            'grade' : '5',
            'school' : "High School of Mathematics",
            'teacher' : "Ivanka Ivanova"
        },
        {
            'name' : 'Ivan',
            'photo' : 'http://cf.juggle-images.com/matte/white/280x280/smile-3-logo-primary.jpg',
            'grade' : '3',
            'school' : "High School of Economics",
            'teacher' : "Dimcho Daskalov"

        },
        {
            'name' : 'Mariq',
            'photo' : 'http://seeklogo.com/images/A/angel-and-devil-logo-293424446F-seeklogo.com.gif',
            'grade' : '6',
            'school' : "High School of Economics",
            'teacher' : "Dimitur Ignatov"

        }

    ];

    $scope.students = students;


});