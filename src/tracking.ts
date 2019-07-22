import { mainProcessData } from './util';
import { get } from 'lodash';
import { Tracking } from "@quarkjs/api/umd/src/api/electron/electron.internal";
import ua from 'universal-analytics';

let userId = null;
let usr = null;
let enabledTelemetry = null

declare global {
    var telemetry: Tracking
    var reportMainProcessEvent: (action: string, label: string, value?: string) => void
}

export function setTracking() {
    userId = get(mainProcessData, 'telemetry.userId', 'qqqwwweeerrr-no-user-id-xxxcccvvvbbb');
    usr = ua('UA-112064718-3', userId);
    enabledTelemetry = get(mainProcessData, 'telemetry.enableTelemetry', false);
    try {
        global['telemetry'] = {
            trackEvent,
            reportLifecycleEvent,
            reportException
        } as Tracking;
        global['reportMainProcessEvent'] = reportMainProcessEventtt;
    } catch (err) {
        console.error(err);
    }
}

function trackEvent(category: string, action: string, label?: string, value?: string) {
    try {

        if (!enabledTelemetry) {
            return;
        }

        usr
            .event({
                ec: category,
                ea: action,
                el: label,
                ev: value,
            })
            .send();

    } catch (err) {
        console.error(err);
    }
}

function reportLifecycleEvent(action: string) {

    try {
        if (!enabledTelemetry) {
            return;
        }

        usr.event({
            ec: 'Lifecycle',
            ea: action,
        }).send();

    } catch (err) {
        console.error(err);
    }
}

function reportException(description: string) {
    try {

        if (!enabledTelemetry) {
            return;
        }

        usr.exception(description).send();
    } catch (err) {
        console.error(err);
    }

}

function reportMainProcessEventtt(action: string, label: string, value?: string) {
    try {
        if (!enabledTelemetry) {
            return;
        }

        usr.event({
            ec: 'MainProcess',
            ea: action,
            el: label,
            ev: value
        }).send();

    } catch (err) {
        console.error(err);
    }
}