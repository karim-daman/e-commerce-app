import { writable } from "svelte/store";
export const authModalStore = writable(false);
export const adminProductCreateModalStore = writable(false);
export const adminProductEditModalStore = writable(false);

export const adminDiscountCreateModalStore = writable(false);

export const adminSideBarToggleStore = writable(true);
export const isPasswordLost = writable(false);
