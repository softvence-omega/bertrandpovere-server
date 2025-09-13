# Project Name : `bertrandpovere`

Base URL: *http://localhost:5000/api*

---


## 📑 Table of Contents

- [Data Types](#data-types)
    - [Account Model](#account-model)
    - [Template Model](#template-model)
    - [Action Model](#action-model)
    - [User Model](#user-model)
    - [Group Model](#group-model)
    - [Site Model](#site-model)
    - [Organization Model](#organization-model)
- [API Endpoints](#api-endpoints)
    - [Authentication Endpoints](#auth-endpoints)
        - [Organization Register](#organization-register)
        - [Organization Login](#organization-login)



## Data Types 

### Account Model
```ts
type TAccount = {
    _id: string;
    email: string;
    password: string;
    isDeleted?: boolean;
    accountStatus?: "ACTIVE" | "INACTIVE" | "SUSPENDED";
    role: "USER" | "ADMIN",
    isVerified: boolean,
    firstName: string;
    lastName?:string;
    mobileNo?: string;
    profilePhoto?: string;
    organization: Types.ObjectId;
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
    owner: Types.ObjectId;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    userType: "GUEST" | "LITE SEATS" | "FULL ACCESS";
    joinedGroups: Types.ObjectId[];
    joinedSites: Types.ObjectId[];
    organization: Types.ObjectId;
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
}
```

### Group Model
```ts 
type TGroup = {
    _id:Types.ObjectId;
    owner: Types.ObjectId;
    groupName: string;
    groupAvatar?: string;
    joinedUser?: Types.ObjectId[];
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
}
```

### Site Model
```ts
type TSite = {
    _id:Types.ObjectId;
    owner: Types.ObjectId;
    siteName: string;
    siteAvatar?: string;
    joinedUsers?: Types.ObjectId[];
    inspections?: Types.ObjectId[];
    actions?: Types.ObjectId[];
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
}
```

### Organization Model
```ts
export type TOrganization = {
    _id:Types.ObjectId;
    organizationName: string;
    owner: Types.ObjectId;
    phoneNumber?: string;
    websiteURL?: string;
    organizationLogo?: string;
    language: string; // default is english
    dateFormat: "dd/mm/yyyy" | "mm/dd/yyyy" | "yyyy/mm/dd"; // default dd/mm/yyyy
    timeFormat: "12h" | "24h";
    temperatureUnit: "C" | "F";
    distanceUnit: "km" | "mile" | "meter" | "feet"; // default meeter
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
}
```





<p id="api-endpoints"> </p>

## 🚀 API Endpoints

<p id="auth-endpoints"> </p>

### 🔐 Authentication



<p id="organization-register"> </p>

#### Register Organization - (POST) - `/auth/organization-register`
`Headers` - Content-Type: application/json <br/>
`Request Body`
```json
{
    "firstName": "Abumahid",
    "lastName":"Islam",
    "email": "dev.abumahid@gmail.com",
    "password": "123456"
}
```
`Response`
```json
{
    "success": true,
    "message": "Organization created successful",
    "data": [
        {
            "email": "dev.abumahid@gmail.com",
            "password": "$2b$10$9HqSx8exluO4dlv8x/2HA.GQwNVtN0neqd.WZNhMyzXAs1WHghOLO",
            "isDeleted": false,
            "accountStatus": "ACTIVE",
            "role": "ADMIN",
            "firstName": "Abumahid",
            "lastName": "Islam",
            "_id": "68c52ee7720a2d3552e68d78",
            "createdAt": "2025-09-13T08:44:23.793Z",
            "updatedAt": "2025-09-13T08:44:23.793Z"
        }
    ],
    "meta": null
}
```


<p id="organization-login"> </p>

#### Organization Login - (POST) - `/auth/organization-login`
`Headers` - Content-Type: application/json <br/>
`Request Body`
```json
{
    "email":"dev.abumahid@gmail.com",
    "password":"123456"
}
```
`Response`
```json
{
    "success": true,
    "message": "Organization log in successful !",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldi5hYnVtYWhpZEBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTc3NTM0MTgsImV4cCI6MTc1ODM1ODIxOH0.BelFM9ii7-t_cUPouZEMXd6e2mxaAYjZl2I_zKzm06Q",
        "role": "ADMIN"
    },
    "meta": null
}
```
`Note That` : accessToken and refreshToken are stored in cookies. You can pass it on headers. When you pass cookies on headers on this time you don't need to authorization header. It will managed automatically using cookie.