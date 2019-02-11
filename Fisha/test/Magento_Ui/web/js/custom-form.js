define([
    'uiComponent',
    'jquery',
    'mage/translate',
    'mage/validation',
    'domReady!'
], function (Component, $, $t) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Magento_Ui/custom-form',
            title: $t('Form Title'),
            isChecked: Math.floor(Math.random() * 2),
            isValid: false,
            arrCities: [{"name": "Country", "alpha3Code": ""}]
        },

        initialize: function () {
            this._super();
            this.observables();
            this.subscriptions();
            this.getArrCities();
        },

        observables: function () {
            this.observe('isValid');
            this.observe('arrCities');
        },

        subscriptions: function () {
            const self = this;
        },

        validateForm: function (form) {
            return this.isValid($(form).validation() && $(form).validation('isValid'));
        },

        clearForm: function (element) {
            $(element).closest('form')[0].reset();
        },

        getArrCities: function () {
            fetch(this.countriesUrl)
                .then(blob => blob.json())
                .then(data => this.arrCities.push(...data))
        }
    });
});
