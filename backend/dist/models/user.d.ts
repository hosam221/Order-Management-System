export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    password_hash: string;
    role: string;
};
export declare class UserStore {
    index(): Promise<User[]>;
    create(u: User): Promise<User>;
}
//# sourceMappingURL=user.d.ts.map