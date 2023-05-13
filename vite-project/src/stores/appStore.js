import { writable } from "svelte/store";
export const authModalStore = writable(false);
export const adminProductModalStore = writable(false);
export const adminSideBarToggleStore = writable(false);
export const isPasswordLost = writable(false);
