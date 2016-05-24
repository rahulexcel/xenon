(function() {
    'use strict';
    angular.module('xenon-frontend')
        .run(function($rootScope, $state, $localStorage, $translate, $timeout, validate, Idle, $window) {
            validate.order_placed();
            Idle.watch();
            init: callfunction();
            var count = 1;

            function callfunction() {
                if (angular.isDefined($localStorage.used)) {
                    $translate.use($localStorage.used);
                    var proposedLanguage = $translate.proposedLanguage() || $translate.use($localStorage.used);
                }
                var proposedLanguage = $translate.proposedLanguage() || $translate.use(used);
                var preferredLanguage = $translate.preferredLanguage();
            }
            $rootScope.$on('IdleTimeout', function() {
                $window.location.reload();
            });


            $(function() {
          var width;
                var widthForsideMenu;
                var viewportWidth = $(window).width();
                var viewportHeight = $(window).height();
                $(window).resize(function() {
                    viewportWidth = $(window).width();
                });
                 if (viewportWidth <= 767) {
                        widthForsideMenu="100%";
                        width = viewportWidth;
                        var NotScroll = {
                            top: '0px',
                            width: width,
                            background: 'white'
                        }

                        var NotScrollSideMenu = {
                            top: '0px',
                            width: "100%",
                            background: 'white',
                            textAlign: "center"
                        }
                    
                    } else {
                        widthForsideMenu="25%";
                        var NotScroll = {
                            position: 'fixed',
                            width: 380,
                            background: 'white',
                        }
                        var NotScrollSideMenu = {
                            position: 'fixed',
                            top: '0px',
                            width: "13%",
                            background: 'white'
                        }
                    }

                $(window).scroll(function() {
                   
                    $('#NotScroll').addClass('text-center');
                    if ($(window).scrollTop() > '180') {
                        $('#NotScroll').css(NotScroll);
                        $("#NotScrollSideMenu").css(NotScrollSideMenu);
                        $("#productMenu").addClass("col-sm-offset-3");
                    } else {
                        $("#productMenu").removeClass("col-sm-offset-3");
                        $('#NotScroll').css({
                            position: 'static',
                            top: '0px'
                        });
                        $('#NotScrollSideMenu').css({
                            position: 'static',
                            width: widthForsideMenu
                        });

                    }
                });
            });
        })
})();