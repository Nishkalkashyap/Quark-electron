import { mainProcessData } from './util';
import { get } from 'lodash';
import { Tracking } from "@quarkjs/api/umd/src/api/electron/electron.internal";

const ua: typeof import('universal-analytics') = global['require']('universal-analytics');
const userId = get(mainProcessData, 'telemetry.userId', 'qqqwwweeerrr-no-user-id-xxxcccvvvbbb');
const usr = ua('UA-112064718-3', userId);
const enabledTelemetry = get(mainProcessData, 'telemetry.enableTelemetry', false);

declare global {
    var telemetry: Tracking
    var reportMainProcessEvent: (action: string, label: string, value?: string) => void
}

export function setTracking() {
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