export interface User{
    id ?: number,
    email ?: string,
    name ?: string,
    createdAt ?: Date,
    updatedAt ?: Date,
    provider ?: string,
    hashPassword ?: string,
    password?: string,
    salt?: string
}

export interface Token{
    id ?: number,
    userId ?: number,
    token ?: string
}