import { TalentSessionEvents } from './types';

export class TalentEventEmitter {
  private listeners: Map<keyof TalentSessionEvents, Set<Function>> = new Map();

  on<K extends keyof TalentSessionEvents>(
    event: K,
    listener: TalentSessionEvents[K]
  ): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);
  }

  off<K extends keyof TalentSessionEvents>(
    event: K,
    listener: TalentSessionEvents[K]
  ): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(listener);
    }
  }

  emit<K extends keyof TalentSessionEvents>(
    event: K,
    ...args: Parameters<TalentSessionEvents[K]>
  ): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(listener => {
        try {
          // @ts-ignore
          listener(...args);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  removeAllListeners(): void {
    this.listeners.clear();
  }
}