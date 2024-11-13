class Events {
    callbacks = [];
    nextId = 0;

    //Emitir evento
    emit(eventName, value) {
        this.callbacks.forEach(stored => {
          if (stored.eventName === eventName) {
            stored.callback(value)
          }
        })
    }

    //Suscríbete a algo que sucede
    on(eventName, caller, callback) {
        this.nextId += 1;
        this.callbacks.push({
          id: this.nextId,
          eventName,
          caller,
          callback,
        });
        return this.nextId;
    }

    //eliminar la suscripción
    off(id) {
        this.callbacks = this.callbacks.filter((stored) => stored.id !== id);
    }

    unsubscribe(caller) {
        this.callbacks = this.callbacks.filter(
            (stored) => stored.caller !== caller,
        );
    }
}

export const events = new Events();