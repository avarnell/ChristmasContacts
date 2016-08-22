(function(){

    'use strict';

    var contactApp = angular.module('contactApp', [
        'contactsService',
        'ui.router',
        'ui.router.stateHelper'
    ])

        .config(function(stateHelperProvider, $urlRouterProvider){

            $urlRouterProvider.otherwise('/');

            stateHelperProvider.setNestedState({
                name : 'index',
                url : '/',
                views : {
                    '@' : {
                        templateUrl : './partials/layout.tpl.html',
                        controller : 'indexCtrl as vm'
                    },
                    'left@index' : {
                        templateUrl : './partials/left.tpl.html',
                        controller : 'leftCtrl as vm'
                    },
                    'main@index' : {
                        templateUrl : './partials/main.tpl.html',
                        controller : 'mainCtrl as vm',
                    }
                },
                children : [
                    {
                        name: "config",
                        url : '/config',
                        views: {
                            'main@index' : {
                                templateUrl : './partials/config.tpl.html'
                            }
                        },
                        children : [
                            {
                                name : 'main',
                                url : '/:id',
                                resolve : {
                                    existingContact: ['$stateParams', 'contactsSvc', function ($stateParams, contactsSvc) {
                                        var id = $stateParams.id;
                                        return contactsSvc.getOne(id).then(function (result) {
                                            return result;
                                        });
                                    }]
                                },
                                redirectTo : 'index.config.main.view',
                                children : [
                                    {
                                        name : 'view',
                                        url: '/view',
                                        templateUrl : './partials/static.tpl.html',
                                        controller : 'viewCtrl as vm',
                                        resolve : {
                                            contact: function(){
                                                console.log('hit');
                                                return existingContact;
                                            }
                                        }
                                    },
                                    {
                                        name : 'edit',
                                        url : '/edit',
                                        templateUrl: './partials/edit.tpl.html',
                                        controller: 'editCtrl as vm',
                                        resolve: {
                                            contact: function(){
                                                return existingContact;
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
        });


    contactApp.controller('indexCtrl', [function(){
        var vm = this;

    }]);


    contactApp.controller('editCtrl', ['contact', function(contact){
        var vm = this;
        vm.contact = contact;

        console.log(vm.contact);

    }]);

    contactApp.controller('mainCtrl', [function(){
        var vm = this;


    }]);

    contactApp.controller('viewCtrl', [function(){
        var vm = this;

    }]);

    contactApp.controller('leftCtrl', ['contactsSvc', '$state', function(contactsSvc, $state){
        var vm = this;
        vm.title = 'Contacts';
        vm.getContact = getContact;

        contactsSvc.get().then(function(result){
            vm.contacts = result;
        });

        function getContact(contact){
            $state.go('index.config.main', {id:contact.id, force:true},{reload : false});
        }


    }]);




})();
