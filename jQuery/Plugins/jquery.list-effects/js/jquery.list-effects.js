/**
 * jQuery module to apply css changes sequencially through any list.
 *
 *
 * LICENSE:
 *
 * Copyright (c) 2006-2014 Martin Andreas Woerz
 *
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted under the terms of the GNU GPL  v2.0 License.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * jquery.listeffects
 * @name        jquery.listeffects
 * @author      Martin Andreas Woerz <m.woerz@ieservices.de>
 * @date        2015-01-22 19:00
 * @developer   Martin Andreas Woerz <m.woerz@ieservices.de>
 * @package     jQuery Effects
 * @category    Visualisations, Effects
 * @copyright   www.ieservices.de (c) 2010 - 2015
 * @link        http://www.ieservices.de
 * @license     http://www.gnu.org/licenses/gpl-2.0.html
 * @ide         Created by PhpStorm
 * @link        https://github.com/ieservices/frontend-components/tree/master/jQuery/Plugins/jquery.list-effects
 * @contact     github [at] ieservices.de
 * @description jQuery module to apply css changes sequencially through any list.
 * @version     0.1
 */
;(function (factory) {
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
        attribute  : '',
        attributes : {},
        value      : '',
        delay      : 1000,
        startIndex : 0,
        activeClass: 'activeEffect',
        trigger    : {
            start: {}
        },
        callback   : {}
    };

    /**
     * applies the defined css style on the next item (increments the index by one)
     */
    var applyEffectOnNextItem = function () {
        var elem = $(list);

        if (elem.length > 1) {

            var previousItem = selectedIndex;

            if (previousItem >= config.startIndex) {

                if (typeof data.elements[previousItem - 1] !== 'undefined') {

                    if (typeof data.elements[previousItem - 1].style == 'undefined' ||
                        data.elements[previousItem - 1].style.length == 0) {
                        // remove the previously added styles
                        $(elem[previousItem - 1]).removeAttr('style');
                    }
                    else {
                        // remove the previously added styles
                        $(elem[previousItem - 1]).attr(data.elements[previousItem - 1].style);
                    }
                }

                if ($(elem[previousItem - 1]).hasClass(config.activeClass)) {
                    // remove the previously added class
                    $(elem[previousItem - 1]).removeClass(config.activeClass);
                }
            }

            if (selectedIndex >= elem.length) {
                selectedIndex = config.startIndex;
            }

            if (typeof data.elements[selectedIndex] == 'undefined') {
                data.elements[selectedIndex] = {};
            }

            // store the old style
            data.elements[selectedIndex].style = $(elem[selectedIndex]).attr('style');

            // go through all attributes
            for (var i = 0; i < config.attributes.length; i++) {
                var property = config.attributes[i];
                $(elem[selectedIndex]).css(property[0], property[1]);
            }

            if (config.attribute.length > 0) {
                $(elem[selectedIndex]).css(config.attribute, config.value);
            }

            $(elem[selectedIndex]).addClass(config.activeClass);


            selectedIndex++;
        }
        else {
            console.error('The selection must contain out of more then one element and is invalid.');

            clearInterval(interval);
        }
    };

    /**
     * applying the effect in the given interval time
     */
    var start = function () {

        var elem = $(list);

        if (config.callback !== null) {

            if (typeof config.callback.type == 'string' &&
                typeof config.callback.method == 'function') {
                $(elem).on(config.callback.type, config.callback.method);
            }
        }

        /**
         * if the trigger configuration is set - example
         * @example config.trigger = {index: 4, type: 'click'};
         */

        if (config.trigger.start !== null) {


            if (typeof config.trigger.start.index == 'number' &&
                typeof config.trigger.start.type == 'string') {

                var startTrigger = config.trigger.start;

                if (startTrigger.index >= 0 && startTrigger.index < elem.length) {
                    if (typeof startTrigger.method == 'function') {
                        $(elem[startTrigger.index]).on(startTrigger.type, startTrigger.method);
                    }
                    $(elem[startTrigger.index]).trigger(startTrigger.type);
                }
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

    return function () {
    };

}(jQuery)));
