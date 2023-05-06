import { writable } from "svelte/store";    
export const authModalStore = writable(false);
export const isPasswordLost = writable(false);
