app.controller('TigerApp', function($scope) {

    $scope.name = "TIGER";

    var tigerInfo = {
        'Name' : "Tigurcho",
        'Born' : "Asia",
        'BirthDate' : "2006",
        'Live' : "Varna Zoo",
        'url' : "http://tigerday.org/wp-content/uploads/2013/04/tiger.jpg"
    };

    $scope.tiger = tigerInfo;

    var tigerStyle = {
        wrapper: {
            backgroundColor: '#CACACA',
            padding: '20px',
            width: '50%',
            overflow: 'hidden'
        },

        img: {
            width: '50%',
            'float': 'right'
        },

        text: {
            fontFamily: 'Tahoma',
            fontSize: '1.05em',
            color: '#2C3E50',
            textAlign: 'left',
            marginTop : ''
        },
        bold: {
            fontWeight: 'bold'

        },

        divSize: {
            width: '50%',
            display: 'inline-block'
        },
        title: {
            margin : '0',
            textAlign: 'center',
            color: '#2C3E50',
            fontSize: '2em',
            fontFamily: 'Tahoma',
        }
    };
    $scope.tigerStyle = tigerStyle;
});