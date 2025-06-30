import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AppState {

    private readonly state = {

        appLoading$: signal<boolean>(false),

    } as const;

    readonly appLoading$ = this.state.appLoading$.asReadonly();


    setAppLoading(loading: boolean) {
        this.state.appLoading$.set(loading)
    }

}