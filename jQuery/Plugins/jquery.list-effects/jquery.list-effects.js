/**
 * $
 * @name        jquery.listeffects
 * @author      $ieservices
 * @date        $
 * @version     $
 * @contact     license [at] ieservices.de
 * @developer   Martin Andreas Woerz <martin [at] ieservices.de>
 * @copyright   www.ieservices.de (c) 2010 - 2014
 * @link        http://www.ieservices.de
 * @license     GNU GPL  v2.0
 * @ide         Created by PhpStorm
 * @description The javascript file jquery.listeffects it to ...
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var list;
    var delay = 1000;
    var attribute, value;
    var selectedIndex = 0;

    var applyEffectOnNextItem = function () {

        var elem = $(list);

        if (elem.length > 0) {

            var previousItem = selectedIndex - 1;

            if (previousItem >= 0) {
                $(elem[previousItem]).css(attribute, '');
            }

            if (selectedIndex >= elem.length) {
                selectedIndex = 0;
            }

            $(elem[selectedIndex]).css(attribute, value);

            selectedIndex++;
        }
    };

    /**
     * applying the effect in the given interval time
     */
    var start = function () {
        setInterval(applyEffectOnNextItem, delay);
    };

    /**
     * create the jQuery function
     */
    $.fn.listEffect = function (options) {
        list = this;
        delay = options.delay;
        attribute = options.attribute;
        value = options.value;
        start();

    }

}(jQuery)));
