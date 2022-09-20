import { Subscription } from 'rxjs'

export class SubscriptionContainer {
  private readonly subscriptions: Subscription[] = []

  add (subscription: Subscription): void {
    this.subscriptions.push(subscription)
  }

  unsubscribeAll (): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe()
    })
  }
}
