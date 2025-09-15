# Project Name : `bertrandpovere`

Base URL: *https://bertrandpovere-server.onrender.com/api*

`You can check all including endpoints with this api link`

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
        - [Get Me With Organization](#get-me-organization-profile)
        - [Change Password](#change-password)
        - [Forgot Password](#forgot-password)
        - [Reset Password](#reset-password)
    - [Group Endpoints](#group-endpoints)
        - [Create New Group](#create-new-group)
        - [Get All Group](#get-all-groups)
        - [Get Single Group](#get-single-groups)
        - [Update Group](#update-group)
        - [Add Member Into Group](#add-member-group)
        - [Remove Member From Group](#remove-member-group)
        - [Delete Group](#delete-group)
        - [Get Joined Groups](#get-joined-groups)
    - [User Endpoints](#user-endpoints)
        - [Add New User](#add-new-user)
        - [Get all Organization Users](#get-all-organization-users)
        - [Get Organization Users By Id](#get-single-organization-users)



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

#### ➡️ Register Organization - (POST) - `/auth/organization-register`
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

#### ➡️ Organization Login - (POST) - `/auth/organization-login`
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



<p id="get-me-organization-profile"> </p>

#### ➡️ Get My Profile with Organization - (GET) - `/auth/me`
`Headers` - Authorization: accessToken needed / cookies needed <br/>

`Response`
```json
{
    "success": true,
    "message": "User profile fetched successfully!",
    "data": {
        "_id": "68c52ee7720a2d3552e68d78",
        "email": "dev.abumahid@gmail.com",
        "password": "",
        "isDeleted": false,
        "accountStatus": "ACTIVE",
        "role": "ADMIN",
        "firstName": "Abumahid",
        "lastName": "Islam",
        "createdAt": "2025-09-13T08:44:23.793Z",
        "updatedAt": "2025-09-13T08:44:23.940Z",
        "organization": {
            "_id": "68c52ee7720a2d3552e68d7a",
            "organizationName": "Abumahid' Organization",
            "owner": "68c52ee7720a2d3552e68d78",
            "language": "english",
            "dateFormat": "dd/mm/yyyy",
            "timeFormat": "12h",
            "temperatureUnit": "C",
            "distanceUnit": "meter",
            "createdAt": "2025-09-13T08:44:23.868Z",
            "updatedAt": "2025-09-13T08:44:23.868Z"
        }
    },
    "meta": null
}
```


<p id="change-password"> </p>

#### ➡️ Change Password- (POST) - `/auth/change-password`
`Headers` 
- Content-Type: application/json
- Authorization: accessToken / Cookies needed

`Request Body`
```json
{
    "oldPassword":"123456",
    "newPassword":"000000"
}
```
`Response`
```json
{
    "success": true,
    "message": "Password changed successfully!",
    "data": "Password changed successful.",
    "meta": null
}
```

<p id="forgot-password"> </p>

#### ➡️ Forgot Password - (POST) - `/auth/forgot-password`
`Headers` - Content-Type: application/json <br/>
`Request Body`
```json
{
    "email":"dev.abumahid@gmail.com"
}
```
`Response`
```json
{
    "success": true,
    "message": "Reset password link sent to your email!",
    "data": null,
    "meta": null
}
```
`Note That`: An email sent to your email. Click on the link and reset your password.


<p id="reset-password"> </p>

#### ➡️ Reset Password - (POST) - `/auth/reset-password`
`Headers` - Content-Type: application/json <br/>
`Request Body`
```json
{
    "email":"dev.abumahid@gmail.com", // come form email link you get using useParams hook on react
    "token":"string", // come form email link you get using useParams hook on react
    "newPassword":"111111"  
}
```
`Response`
```json
{
    "success": true,
    "message": "Password reset successfully!",
    "data": "Password reset successfully!",
    "meta": null
}
```

<p id="group-endpoints"> </p>

## 🚀 Group Endpoints

<p id="create-new-group"> </p>

#### ➡️ Create New Group - (POST) - `/group`
`Headers` 
- Content-Type: application/json
- Authorization: accessToken / Cookies needed


`Request Body`
```json
{
    "groupName":"Group-6",
    "joinedUser":["68c52ee7720a2d3552e68d78"] // optional
}
```
`Response`
```json
{
    "success": true,
    "message": "Group created successful",
    "data": {
        "groupName": "Group-6",
        "owner": "68c52ee7720a2d3552e68d78",
        "joinedUser":["68c52ee7720a2d3552e68d78"]
    },
    "meta": null
}
```

<p id="get-all-groups"> </p>

#### ➡️ Get All Group - (GET) - `/group`
`Headers` 
- Authorization: accessToken / Cookies needed

`query params` 
- page 
- limit
- searchTerm

`Response`
```json
{
    "success": true,
    "message": "Groups fetched successfully!",
    "data": [
        {
            "_id": "68c78377de30d8be0107b771",
            "owner": "68c52ee7720a2d3552e68d78",
            "groupName": "Group-1",
            "joinedUser": [
                {
                    "_id": "68c7a5df61def31c2c423b19",
                    "email": "user3@gmail.com",
                    "firstName": "user",
                    "lastName": "Hello",
                    "userType": "GUEST"
                }
            ],
            "createdAt": "2025-09-15T03:09:43.463Z",
            "updatedAt": "2025-09-15T05:36:48.053Z"
        },
        {...}
    ],
    "meta": {
        "total": 8,
        "page": 1,
        "limit": 10,
        "totalPages": 1
    }
}
```


<p id="get-single-groups"> </p>

#### ➡️ Get Single Group - (GET) - `/group/:groupId`

`Response`
```json
{
    "success": true,
    "message": "Group fetched successfully!",
    "data": {
        "_id": "68c78377de30d8be0107b771",
        "owner": "68c52ee7720a2d3552e68d78",
        "groupName": "Group-1",
        "joinedUser": [
            {
                "_id": "68c7a5df61def31c2c423b19",
                "email": "user3@gmail.com",
                "firstName": "user",
                "lastName": "Hello",
                "userType": "GUEST"
            }
        ],
        "createdAt": "2025-09-15T03:09:43.463Z",
        "updatedAt": "2025-09-15T05:36:48.053Z"
    },
    "meta": null
}
```


<p id="update-group"> </p>

#### ➡️ Update Group - (PATCH) - `/group/:groupId`

`Headers` 
- Content-Type: multipart/form-data
- Authorization: accessToken / Cookies needed

`Request Body`
| Field Name | Type | Example |
| --- | --- | --- |
| data | Object | {"groupName":"Group-4"} |
| image | File |  any .png, .jpg, .jpeg , .webp

`Response`
```json

{
    "success": true,
    "message": "Group update successfully!",
    "data": {
        "_id": "68c7837ede30d8be0107b77d",
        "owner": "68c52ee7720a2d3552e68d78",
        "groupName": "Group-4",
        "joinedUser": [],
        "createdAt": "2025-09-15T03:09:50.214Z",
        "updatedAt": "2025-09-15T03:57:18.727Z",
        "groupAvatar": "https://res.cloudinary.com/dnxsk9rgl/image/upload/v1757908639/twmsahtvhlhw5aie50du.png"
    },
    "meta": null
}

```

<p id="add-member-group"> </p>

#### ➡️ Add Member in Group - (PUT) - `/group/:groupId`
`Headers` 
- Content-Type: application/json
- Authorization: accessToken / Cookies needed

`Request Body`
```json
{
    "joinedUser":["68c7837ede30d8be0107b77a"]
}
```
`Response`
```json
{
    "success": true,
    "message": "Group member added successfully!",
    "data": {
        "_id": "68c7837ede30d8be0107b77d",
        "owner": "68c52ee7720a2d3552e68d78",
        "groupName": "Group-4",
        "joinedUser": [
            "68c7837ede30d8be0107b77d",
            "68c7837ede30d8be0107b77f",
            "68c7837ede30d8be0107b77a"
        ],
        "createdAt": "2025-09-15T03:09:50.214Z",
        "updatedAt": "2025-09-15T04:11:45.406Z",
        "groupAvatar": "https://res.cloudinary.com/dnxsk9rgl/image/upload/v1757908639/twmsahtvhlhw5aie50du.png"
    },
    "meta": null
}
```

<p id="remove-member-group"> </p>

#### ➡️ Remove Member from Group - (PUT) - `/group/remove/:groupId`
`Headers` 
- Content-Type: application/json
- Authorization: accessToken / Cookies needed

`Request Body`
```json
{
    "joinedUser":["68c7837ede30d8be0107b77a"]
}
```
`Response`
```json
{
    "success": true,
    "message": "Group member added successfully!",
    "data": {
        "_id": "68c7837ede30d8be0107b77d",
        "owner": "68c52ee7720a2d3552e68d78",
        "groupName": "Group-4",
        "joinedUser": [
            "68c7837ede30d8be0107b77d",
            "68c7837ede30d8be0107b77f"
        ],
        "createdAt": "2025-09-15T03:09:50.214Z",
        "updatedAt": "2025-09-15T04:11:45.406Z",
        "groupAvatar": "https://res.cloudinary.com/dnxsk9rgl/image/upload/v1757908639/twmsahtvhlhw5aie50du.png"
    },
    "meta": null
}
```


<p id="delete-group"> </p>

#### ➡️ Delete Group - (DELETE) - `/group/:groupId`
`Headers` 
- Authorization: accessToken / Cookies needed

`Response`
```json
{
    "success": true,
    "message": "Group deleted successfully!",
    "data": null,
    "meta": null
}
```

<p id="get-joined-groups"> </p>

#### ➡️ Get Joined Groups - (GET) - `/group/join-group/:userId`

`Response`
```json
{
    "success": true,
    "message": "Group fetched successfully!",
    "data": [
        {
            "_id": "68c78377de30d8be0107b771",
            "owner": "68c52ee7720a2d3552e68d78",
            "groupName": "Group-1",
            "joinedUser": [
                "68c7837ede30d8be0107b77a"
            ],
            "createdAt": "2025-09-15T03:09:43.463Z",
            "updatedAt": "2025-09-15T04:46:58.468Z"
        },
        {...}
    ],
    "meta": null
}
```

`Note That`: Here only fetch which group user joined.



<p id="user-endpoints"> </p>

## 🚀 User Endpoints

<p id="add-new-user"> </p>

#### ➡️ Add New User - (POST) - `/user`
`Headers` 
    - Content-Type: application/json
    - Authorization: accessToken / Cookies needed

`Request Body`
```json
{
    "email":"user3@gmail.com",
    "firstName":"user",
    "lastName":"Hello",
    "userType":"GUEST",
    "password":"111111"
}
```
`Response`
```json
{
    "success": true,
    "message": "User added successfully!",
    "data": {
        "owner": "68c52ee7720a2d3552e68d78",
        "email": "user3@gmail.com",
        "firstName": "user",
        "lastName": "Hello",
        "password": "$2b$10$rH0Nw5qhP5Is1excnwhbkeXTk4PdNKDaW3CSPM0l681sEpPUip/AG",
        "userType": "GUEST",
        "joinedGroups": [],
        "joinedSites": [],
        "_id": "68c7a5df61def31c2c423b19",
        "createdAt": "2025-09-15T05:36:31.204Z",
        "updatedAt": "2025-09-15T05:36:31.204Z"
    },
    "meta": null
}
```


<p id="get-all-organization-users"> </p>

#### ➡️ Get all organization user - (GET) - `/`
`Headers` 
- Authorization: accessToken / Cookies needed

`Response`
```json
{
    "success": true,
    "message": "Users fetched successfully!",
    "data": [
        {
            "_id": "68c7a5bb61def31c2c423b0b",
            "owner": "68c52ee7720a2d3552e68d78",
            "email": "user1@gmail.com",
            "firstName": "user",
            "lastName": "Hello",
            "userType": "GUEST",
            "joinedGroups": [],
            "joinedSites": [],
            "createdAt": "2025-09-15T05:35:55.491Z",
            "updatedAt": "2025-09-15T05:35:55.491Z"
        },
        {...},
    ],
    "meta": null
}
```

<p id="get-single-organization-users"> </p>

#### ➡️  Get single organization user - (GET) - `/user/:userId`
`Headers` 
- Authorization: accessToken / Cookies needed


`Response`
```json
{
    "success": true,
    "message": "User fetched successfully!",
    "data": {
        "_id": "68c7b01dce020b0cc83eb74d",
        "owner": "68c52ee7720a2d3552e68d78",
        "email": "user3@gmail.com",
        "firstName": "user",
        "lastName": "Hello",
        "userType": "GUEST",
        "joinedGroups": [
            {
                "_id": "68c78377de30d8be0107b771",
                "owner": "68c52ee7720a2d3552e68d78",
                "groupName": "Group-1",
                "joinedUser": [
                    "68c7837ede30d8be0107b77a",
                    "68c7a5df61def31c2c423b19",
                    "68c7b01dce020b0cc83eb74d"
                ],
                "createdAt": "2025-09-15T03:09:43.463Z",
                "updatedAt": "2025-09-15T06:40:21.576Z"
            },
            {...}
        ],
        "joinedSites": [],
        "organization": "68c52ee7720a2d3552e68d7a",
        "createdAt": "2025-09-15T06:20:13.299Z",
        "updatedAt": "2025-09-15T06:40:21.685Z"
    },
    "meta": null
}
```