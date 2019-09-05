import {
    defineWidget,
    log,
    runCallback,
} from 'widget-base-helpers';

export default defineWidget('BrowserClose', false, {

    _obj: null,
    mfToExecute: "",
    warning: "",


    constructor() {
        this.log = log.bind(this);
        this.runCallback = runCallback.bind(this);
    },

    postCreate() {
        log.call(this, 'postCreate', this._WIDGET_VERSION);
        if (this.warning){
            window.onbeforeunload = confirmExit;
        }
        function confirmExit() {
            return "You have attempted to leave this page. Are you sure?";
        }
    },

    update(obj, callback) {
        const microflow = this.microflow;
        if (microflow){
           window.onunload = function () {
                console.log("this executed");
                var guid = obj.getGuid();
                mx.data.action({
                    params: {
                        applyto: "selection",
                        actionname: microflow,
                        guids: [guid],
                    },
                    origin: this.mxform,
                    callback: function() {
                    },
                    error: function() {
                    }
                });
            };
        }

         if(callback) {callback();}
    },
});
