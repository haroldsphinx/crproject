

var env = process.argv[2] || 'dev';
switch (env) {
    case 'dev':
        // Setup development config
        var Globals = {
                'domain': 'www.cricketfastliveline.com',
                'db_url': 'mongodb://localhost:27017/cfll',
                'apikey': "VFuzEVfmlCbqsjKnyFMD5jWbsVQ2",
                'serverKey': 'AAAANOW-iy8:APA91bGcx_xIRwKqduCxsSLEz0KfpusT1DYV5jiKLTRMkqJIiVZEqxtgWx8Zwc4oDPm76Wk6NMkEF0FeRPWuvtQ0HDisRRHvpcdCMGysfw0LvA1zf4AO2gnwwBPmWDS7poux3Zxcn4Js'
            };
        break;
    case 'prod':
        // Setup production config
        var Globals = {
                'domain': 'www.cricketfastliveline.com',
                'db_url': 'mongodb://mdb:mdb@172.31.16.137:27017/mdb',
                'apikey': "VFuzEVfmlCbqsjKnyFMD5jWbsVQ2",
                'serverKey': 'AAAANOW-iy8:APA91bGcx_xIRwKqduCxsSLEz0KfpusT1DYV5jiKLTRMkqJIiVZEqxtgWx8Zwc4oDPm76Wk6NMkEF0FeRPWuvtQ0HDisRRHvpcdCMGysfw0LvA1zf4AO2gnwwBPmWDS7poux3Zxcn4Js'
            };
        break;
}



module.exports = Globals;
