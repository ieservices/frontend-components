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

    var $self = this;
    var list;
    var interval;
    var selectedIndex = 0;
    var data = {elements: []};

    var config = {
        attribute: '',
        attributes: {},
        value: '',
        delay:  1000,
        startIndex: 0,
        activeClass: 'activeEffect',
        trigger: {
            start: {}
        },
        callback: {}
    };

    /**
     * applies the defined css style on the next item (increments the index by one)
     */
    var applyEffectOnNextItem = function () {
        var elem = $(list);

        if (elem.length > 1) {

            var previousItem = selectedIndex;

            if (previousItem >= config.startIndex) {

                if(typeof data.elements[previousItem-1] !== 'undefined'){

                    if(typeof data.elements[previousItem-1].style == 'undefined' ||
                        data.elements[previousItem-1].style.length == 0)
                    {
                        // remove the previously added styles
                        $(elem[previousItem-1]).removeAttr('style');
                    }
                    else{
                        // remove the previously added styles
                        $(elem[previousItem-1]).attr(data.elements[previousItem-1].style);
                    }
                }

                if($(elem[previousItem-1]).hasClass(config.activeClass)){
                    // remove the previously added class
                    $(elem[previousItem-1]).removeClass(config.activeClass);
                }
            }

            if (selectedIndex >= elem.length) {
                selectedIndex = config.startIndex;
            }

            if(typeof data.elements[selectedIndex] == 'undefined'){
                data.elements[selectedIndex] = {};
            }

            // store the old style
            data.elements[selectedIndex].style =  $(elem[selectedIndex]).attr('style');

            // go through all attributes
            for (var i = 0; i < config.attributes.length; i++) {
                var property = config.attributes[i];
                $(elem[selectedIndex]).css(property[0], property[1]);
            }

            if(config.attribute.length > 0){
                $(elem[selectedIndex]).css(config.attribute, config.value);
            }

            $(elem[selectedIndex]).addClass(config.activeClass);


            selectedIndex++;
        }
        else{
            console.error('The selection must contain out of more then one element and is invalid.');

            clearInterval(interval);
        }
    };

    /**
     * applying the effect in the given interval time
     */
    var start = function () {

        var elem = $(list);

        if(typeof config.callback.type == 'string' &&
            typeof config.callback.method == 'function'){
            $(elem).on(config.callback.type, config.callback.method);
        }

        /**
         * if the trigger configuration is set - example
         * @example config.trigger = {index: 4, type: 'click'};
         */
        if(typeof config.trigger.start.index == 'number' &&
            typeof config.trigger.start.type == 'string'){

            var startTrigger = config.trigger.start;

            if(startTrigger.index >= 0 && startTrigger.index < elem.length){
                if(typeof startTrigger.method == 'function'){
                    $(elem[startTrigger.index]).on(startTrigger.type, startTrigger.method);
                }
                $(elem[startTrigger.index]).trigger(startTrigger.type);
            }
        }

        interval = setInterval(applyEffectOnNextItem, config.delay);
    };

    /**
     * The jQuery function which can be applied on any list (also multiple divs on the same child-level).
     *
     * @param {Object} options object configuration object.
     * @param {Number} options.delay object the time till the next element for alteration is reached.
     * @param {String} options.attribute {CSS Attribute} can be set if just one single attribute should be changed. !If set also options.value must be set!
     * @param {String} options.value the value which should be used to change the attribute. !If set also options.attribute must be set!
     * @param {Number} options.startIndex the first element on which the alteration should be started.
     * @param {String} options.activeClass the class name of the current active element. If activated once a element is activated for effects.
     * @param {Object} callback an object where an event can be triggered on each item. E.g. a click event on all items.
     * @param {String} callback.type the event, which should be triggered. E.g. 'click'.
     * @param {Function} callback.method a event function which is called, when clicking on each item.
     * @param {Object} startTrigger to set up a trigger on a given element on start.
     * @param {Number} startTrigger.index the
     * @param {String} startTrigger.type the event, which should be triggered. E.g. 'click'.
     * @param {Function} startTrigger.method a event function which is called by the given event.
     */
    $.fn.listEffect = function (options, callback, startTrigger) {
        list = this;
        config.delay = typeof options.delay == 'number' ? options.delay : config.delay;
        config.attribute = typeof options.attribute == 'string' ? options.attribute : config.attribute;
        config.value = typeof options.value == 'string' ? options.value : config.value;
        config.attributes = typeof options.attributes == 'object' ? options.attributes : config.attributes;
        config.trigger.start = typeof startTrigger == 'object' ? startTrigger : config.trigger.start;
        config.startIndex = typeof options.startIndex == 'number' ? options.startIndex : config.startIndex;
        config.activeClass = typeof options.activeClass == 'string' ? options.activeClass : config.activeClass;
        config.callback = typeof callback == 'object' ? callback : config.callback;
        selectedIndex = config.startIndex;
        start();

    };

    var $instance = {
        start: start
    };

    return function(){};

}(jQuery)));
