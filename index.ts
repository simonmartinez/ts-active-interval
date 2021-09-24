import { timer } from 'rxjs';

class VisibilityChecker {
    private static foos: any[] = [];
    public static active: boolean = true;

    public static Check() {
        VisibilityChecker.active = !document.hidden;
        if (!document.hidden) {
            VisibilityChecker.WakeUp();
        }
    }

    private static WakeUp() {
        while (VisibilityChecker.foos.length) {
            VisibilityChecker.foos[0]();
            VisibilityChecker.foos.splice(0, 1);
        }
    }

    public static Subscribe(foo: any) {
        this.foos.push(foo);
    }
}

document.addEventListener('visibilitychange', VisibilityChecker.Check, false);

export class ActiveInterval {
    private interval: any;
    private subscribed: boolean = false;

    constructor() {
    }

    public setInterval(foo: any, time: number, callDirectly: boolean): void {
        if (this.interval) {
            this.stopInterval();
        }
        this.interval = timer(callDirectly ? 0 : time, time).subscribe(() => {
            if (VisibilityChecker.active) {
                this.subscribed = false;
                foo();
            } else if (!this.subscribed) {
                this.subscribed = true;
                VisibilityChecker.Subscribe(() => {
                    this.setInterval(foo, time, true);
                });
            }
        });
    }

    public stopInterval(): void {
        this.interval?.unsubscribe();
    }
}
