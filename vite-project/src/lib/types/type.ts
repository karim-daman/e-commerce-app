import type { SvelteComponent } from "svelte";

export interface Type<T> extends Function {
	new (...args: any[]): T;
}

export interface Slots<T extends SvelteComponent>{
	title:string;
	icon: Type<T> ;
}