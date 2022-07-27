import { Subscription } from "rxjs";

export class SubscriptionContainer {
    private subscriptions: Subscription[] = [];

    add(subscription: Subscription) {
        this.subscriptions.push(subscription);
    }

    unsubscribeAll() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }
}