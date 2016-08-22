(function(){
  'use strict';
  var fs = require('fs');
  var module = angular.module('contactsService', []);
  module.service('contactsSvc', Service);


  function Service($http){
    var path = '../contacts.json';
    Service.get = function(){
      return $http.get(path).then(function(results){
        return results.data;
      });
    };

    Service.put = function (contact) {
      var Json = Service.get().then(function(result){
        result.push(contact);
        fs.writeFile(path,result, 'utf8', function(result){
          console.log(result);

          return true;
        });
      });
    };

    Service.getOne = function(id){
        return Service.get().then(function(result){
            var contact = _.find(result, function(contact){
                return contact.id = id;
            });
            return contact;
        });
    };


    return Service;

  }


})();
