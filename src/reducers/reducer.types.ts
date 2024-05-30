
export type TLoadingStatusType = 'idle' | 'loading' | 'error';
export interface IReducerType<T, A> {
    (state: T, action: A): T
}