# Project Name : `bertrandpovere`

Live URL: *https://*

---


## 📑 Table of Contents

- [Data Types](#data-types)
    - [Account Model](#account-model)
    - [Template Model](#template-model)
    - [Action Model](#action-model)
    - [User Model](#user-model)
    - [Group Model](#group-model)



## Data Types 

### Account Model
```ts
type TAccount = {
    _id: string;
    email: string;
    password: string;
    lastPasswordChange?: Date;
    isDeleted?: boolean;
    accountStatus?: "ACTIVE" | "INACTIVE" | "SUSPENDED";
    role: "USER" | "ADMIN",
    isVerified: boolean,
    fullName: string;
    mobileNo?: string;
    profilePhoto?: string;
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
};
```

### Template Model

```ts
type TTemplate = {
    _id: Types.ObjectId;
    author: Types.ObjectId;
    templateLogo?: string;
    templateName: string;
    templateDisc?: string;
    pages: {
        pageIndex: number;
        title: string;
        questions?: {
            index: number;
            question: string;
            answer: string | string[];
            isRequired: boolean;
        }[];
    }[];
    approval?: {
        approvedBy: string;
        questions?: {
            index: number;
            question: string;
            answer: string | string[];
            isRequired: boolean;
        }[];
    }[];
    report?: {
        style?: {
            coverPageImage?: string;
            logo?: string;
            pageSize?: "A4" | "LETTER";
            thumbnailGrid?: number;
            resolution?: "HIGH" | "LOW"
        };
        content?: {
            footer?: boolean;
            pageBreak?: boolean;
            tableOfContent?: boolean;
        }
    };
    access?: {
        userId: Types.ObjectId;
        role: "viewer" | "editor" | "owner";
    }[];
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
};

```

### Action Model
```ts
export type TAction = {
    _id: Types.ObjectId;
    index: string;
    author: Types.ObjectId;
    actionTitle: string;
    actionDisc?: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: string;
    assignBy?: Types.ObjectId;
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
}
```

### User Model
```ts
type TUser = {
    _id: Types.ObjectId;
    ownerId: Types.ObjectId;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    userType: "GUEST" | "LITE SEATS" | "FULL ACCESS";
    joinedGroups: Types.ObjectId[];
    joinedSites: Types.ObjectId[];
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
}
```

### Group Model
```ts 
type TGroup = {
    _id:Types.ObjectId;
    ownerId: Types.ObjectId;
    groupName: string;
    groupAvatar?: string;
    joinedUser?: Types.ObjectId[];
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
}
```