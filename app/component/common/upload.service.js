(function() {
    'use strict';
    angular
        .module('xenon-app')
        .factory('uploadService',
            uploadService
        );
    function uploadService($q, $http, Upload) {
        return {
            send: function(file, api) {
                console.log(file);
                var def = $q.defer();
                 Upload.upload({
                    url:'https://protected-badlands-3499.herokuapp.com/'+api,
                    data: {
                      fileName:file
                     },
                     method:'POST'
                    
                }).success(function(data) {
                    def.resolve(data);
                }).error(function() {
                    def.reject('500');
                });
                return def.promise;
            },
        };
    }

})();


// function upload(file, url) {
//    Upload.upload({
//     url: url,
//     data: {
//      fileName: file
//     }
//    }).then(function(resp) {
//     uploadResponseFileName = resp.data.filename;
//     console.log(uploadResponseFileName);
//     send_data_after_upload();
//    }, function(resp) {
//    }, function(evt) {
//     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//    });
//   };
//  }