export type EntryType<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

export type EntriesType<T> = EntryType<T>[];
