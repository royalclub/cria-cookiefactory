/*jslint node: true */
/*globals cookieFactory, alert */

/**
 * Controller for message
 * @constructor
 * @param $scope
 * @param messageService
 */
cookieFactory.controller('messageController', function ($scope, messageService) {
    "use strict";

    $scope.message = {
        error: undefined,
        warning: undefined,
        info: undefined,
        success: undefined,
    };

    if (messageService.callbacks.length === 0) {
        messageService.registerCallback(function (text, types) {
            if (types === 'danger') {
                $scope.showDanger = true;
                $scope.message.error = text;
            } else if (types === 'warning') {
                $scope.showWarning = true;
                $scope.message.warning = text;
            } else if (types === 'info') {
                $scope.showInfo = true;
                $scope.message.info = text;
            } else if (types === 'success') {
                $scope.showSuccess = true;
                $scope.message.success = text;
            }
        });
    }
});