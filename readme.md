# Project Name : `bertrandpovere`

Base URL: *https://bertrandpovere-server.onrender.com/api*

`You can check all including endpoints with this api link`

---


## 📑 Table of Contents

- [Data Types](#data-types)
    - [Account Model](#account-model)
    - [Template Model](#template-model)
    - [Inspection Model](#inspection-model)
    - [Action Model](#action-model)
    - [User Model](#user-model)
    - [Group Model](#group-model)
    - [Site Model](#site-model)
    - [Organization Model](#organization-model)
    - [Notification Model](#notification-model)
- [Notification Endpoints (Socket.io)](#notification-endpoints)
    - [Login Users](#login-user)
- [API Endpoints](#api-endpoints)
    - [Authentication Endpoints](#auth-endpoints)
        - [Organization Register](#organization-register)
        - [Organization Login](#organization-login)
        - [Team member Login](#user-login)
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
        - [Delete Organization Users By Id](#delete-organization-user)
    - [Site Endpoints](#site-endpoints)
        - [Create New Site](#create-new-site)
        - [Get All Sites](#get-all-sites)
        - [Get Single Site](#get-single-site)
        - [Update Site](#update-site)
        - [Delete Site](#delete-site)
        - [Add Member Into Site](#add-member-into-site)
        - [Remove Member from Site](#remove-member-into-site)
    - [Organization Endpoints](#organization-endpoints)
        - [Update Organization](#update-organization)
    - [Action Endpoints](#action-endpoints)
        - [Create New Action](#create-new-action)
        - [Get All Actions](#get-all-actions)
        - [Get Single Action](#get-single-action)
        - [Update Action](#update-action)
        - [Delete Action](#delete-action)
    - [Template Endpoints](#template-endpoints)
        - [Create New Template](#create-new-template)
        - [Get All Templates](#get-all-template)
        - [Get Single Template](#get-single-template)
        - [Update Template](#update-template)
        - [Delete Template](#delete-template)
    - [Inspection Endpoints](#inspection-endpoints)
        - [Create New Inspection](#create-new-inspection)
        - [Get All Inspections](#get-all-inspection)
        - [Get Single Inspection](#get-single-inspection)
        - [Update Inspection](#update-inspection)
        - [Delete Inspection](#delete-inspection)
    



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
import { Types } from "mongoose";

type AnswerType =
    | { answerType: "input"; value: "text" | "email" | "number" }
    | { answerType: "multipleSelect"; value: string[] } // yes, no, n/a ,good, fair, poor,safe,at risk,pass,fail,compliant,not-compliant
    | { answerType: "date"; value: string }
    | { answerType: "media"; value: string }
    | { answerType: "signature"; value: string }
    | { answerType: "location"; value: string }
    | { answerType: "checkbox"; value: boolean }
    | { answerType: "slider"; value: number }
    | { answerType: "annotation"; value: string }
    | { answerType: "instruction"; value: string };

export type TTemplate = {
    organization: Types.ObjectId;
    templateLogo?: string;
    templateName: string;
    templateDisc?: string;
    pages: {
        pageIndex: number;
        title: string;
        questions?: {
            index: number;
            question: string;
            isRequired: boolean;
            answerType: AnswerType;
        }[];
    }[];
    approval?: {
        approvedBy: Types.ObjectId;
    }[];
    report?: {
        style?: {
            coverPageImage?: string;
            logo?: string;
            pageSize?: "A4" | "LETTER";
            thumbnailGrid?: number;
            resolution?: "HIGH" | "LOW";
        };
        content?: {
            footer?: boolean;
            pageBreak?: boolean;
            tableOfContent?: boolean;
        };
    };
    access?: {
        userId: Types.ObjectId;
        role: "viewer" | "editor" | "owner";
    }[];
};


```

### Inspection Model
```ts
export type TInspection = {
    _id: Types.ObjectId;
    organization: Types.ObjectId;
    template: Types.ObjectId;
    inspector: Types.ObjectId;

    inspectionDetails: {
        questionAdnAnswer: {
            question: string;
            answer: string | number | boolean | Date | string[];
        }[]
    }
    createdAt: Date;
    updatedAt: Date;
};

```


### Action Model
```ts
export type TAction = {
    _id: Types.ObjectId;
    author: Types.ObjectId;
    actionTitle: string;
    actionDisc?: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: string;
    assignBy?: Types.ObjectId[];
    state: "To do" | "In Progress" | "Complete" | "can’t do";
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

### Notification Model

```ts
 type TNotification = {
    _id:string
    message: string;
    slug?:string;
    status:"READ" | "UNREAD";
    createdAt?:string
    updatedAt?:string
}

```



<p id="notification-endpoints"> </p>

## 🚀 Notification endpoints using socket.io


<p id="login-user"> </p>

#### ➡️ Login User on organization - 

`Event Name` : *user-logged-in*

` Socket Response`

```json
{
    "name": "user Hello",
    "email": "user2@gmail.com",
    "lastLoginTime": "2025-09-19T10:37:04.040Z"
}
```
`Note that` : use socket.on("user-logged-in", (data) => {}); in client side. Don't send any data on this event.


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


<p id="user-login"> </p>

#### ➡️ Team member Login - (POST) - `/auth/user-login`
`Headers` - Content-Type: application/json <br/>
`Request Body`
```json
{
    "email":"user1@gmail.com",
    "password":"111111"
}
```
`Response`
```json
{
    "success": true,
    "message": "User log in successful !",
    "data": {
        "accessToken": "access token",
        "role": "USER"
    },
    "meta": null
}
```

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
`Not That` : Invited user will notify via email with there login credentials.


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

<p id="delete-organization-user"> </p>

#### ➡️ Delete Organization User - (DELETE) - `/user/:userId`
`Headers` 
- Authorization: accessToken / Cookies needed

`Response`
```json
{
    "success": true,
    "message": "User deleted successfully!",
    "data": null,
    "meta": null
}
```

<p id="site-endpoints"> </p>

## 🚀 Site End points


<p id="create-new-site"> </p>

#### ➡️ Create New Site - (POST) - `/site`
`Headers` 
- Content-Type: application/json
- Authorization: accessToken / Cookies needed

`Request Body`
```json
{
    "siteName":"Softvence"
}
```
`Response`
```json
{
    "success": true,
    "message": "Site created successful",
    "data": {
        "owner": "68c52ee7720a2d3552e68d78",
        "organization": "68c52ee7720a2d3552e68d7a",
        "siteName": "Softvence",
        "joinedUsers": [],
        "inspections": [],
        "actions": [],
        "_id": "68c7cf60b9b9ef2ade01a5cd",
        "createdAt": "2025-09-15T08:33:36.878Z",
        "updatedAt": "2025-09-15T08:33:36.878Z"
    },
    "meta": null
}
```


<p id="get-all-sites"> </p>

#### ➡️ Get All Sites - (GET) - `/site`
`Headers` 
- Authorization: accessToken / Cookies needed

`Query Params`
- page
- limit
- searchTerm


`Response`
```json
{
    "success": true,
    "message": "Site fetched successful",
    "data": {
        "data": [
            {
                "_id": "68c7d13f5366bf8134d13678",
                "owner": "68c52ee7720a2d3552e68d78",
                "organization": "68c52ee7720a2d3552e68d7a",
                "siteName": "Softvence omega",
                "joinedUsers": [],
                "inspections": [],
                "actions": [],
                "createdAt": "2025-09-15T08:41:35.171Z",
                "updatedAt": "2025-09-15T08:41:35.171Z"
            },
            {...}
        ],
    },
   "meta": {
            "page": 1,
            "limit": 10,
            "skip": 0,
            "total": 1
        }
}
```


<p id="get-single-site"> </p>

#### ➡️ Get Single Site - (GET) - `/site/:siteId`
 Authorization: accessToken / Cookies needed

`Response`
```json
{
    "success": true,
    "message": "Site fetched successful",
    "data": {
        "_id": "68c7d13f5366bf8134d13678",
        "owner": "68c52ee7720a2d3552e68d78",
        "organization": "68c52ee7720a2d3552e68d7a",
        "siteName": "Softvence omega",
        "joinedUsers": [], // here include user data like first name, last name, email
        "inspections": [],  // here include inspection data
        "actions": [], // here include action data
        "createdAt": "2025-09-15T08:41:35.171Z",
        "updatedAt": "2025-09-15T08:41:35.171Z"
    },
    "meta": null
}
```

<p id="update-site"> </p>

#### ➡️ Update Site - (PATCH) - `/site/:siteId`

`Headers` 
- Content-Type: multipart/form-data
- Authorization: accessToken / Cookies needed

`Request Body`
| Field Name | Type | Example |
| --- | --- | --- |
| data | Object | {"siteName":"Site-1"} |
| image | File |  any .png, .jpg, .jpeg , .webp

`Response`
```json
{
    "success": true,
    "message": "Site updated successful",
    "data": {
        "_id": "68c7d13f5366bf8134d13678",
        "owner": "68c52ee7720a2d3552e68d78",
        "organization": "68c52ee7720a2d3552e68d7a",
        "siteName": "Site-1",
        "joinedUsers": [],
        "inspections": [],
        "actions": [],
        "createdAt": "2025-09-15T08:41:35.171Z",
        "updatedAt": "2025-09-15T09:12:52.843Z",
        "siteAvatar": "https://res.cloudinary.com/dnxsk9rgl/image/upload/v1757927430/fiwjopwadpqak33clqac.png"
    },
    "meta": null
}
```


<p id="delete-site"> </p>

#### ➡️  Delete Site - (DELETE) - `/site/:siteId`
`Headers` 
- Authorization: accessToken / Cookies needed

`Response`
```json
{
    "success": true,
    "message": "Site deleted successful",
    "data": null,
    "meta": null
}
```

<p id="add-member-into-site"> </p>

#### ➡️ Add Member Into Site - (PUT) - `/site/add-member/:siteId`
`Headers` 
- Content-Type: application/json
- Authorization: accessToken / Cookies needed

`Request Body`
```json
{
    "joinedUsers":["68c7b025ce020b0cc83eb759"]
}
```
`Response`
```json
{
    "success": true,
    "message": "Member added into site successful",
    "data": {
        "_id": "68c7d13f5366bf8134d13678",
        "owner": "68c52ee7720a2d3552e68d78",
        "organization": "68c52ee7720a2d3552e68d7a",
        "siteName": "Site-1",
        "joinedUsers": [
            "68c7b025ce020b0cc83eb759"
        ],
        "inspections": [],
        "actions": [],
        "createdAt": "2025-09-15T08:41:35.171Z",
        "updatedAt": "2025-09-16T02:56:27.272Z",
        "siteAvatar": "https://res.cloudinary.com/dnxsk9rgl/image/upload/v1757927430/fiwjopwadpqak33clqac.png"
    },
    "meta": null
}
```


<p id="remove-member-into-site"> </p>

#### ➡️ Remove Member from Site - (PUT) - `/site/remove-member/:siteId`
`Headers` 
- Content-Type: application/json
- Authorization: accessToken / Cookies needed

`Request Body`
```json
{
    "joinedUsers":["68c7b025ce020b0cc83eb759"]
}
```
`Response`
```json
{
    "success": true,
    "message": "Member removed from site successful",
    "data": {
        "_id": "68c7d13f5366bf8134d13678",
        "owner": "68c52ee7720a2d3552e68d78",
        "organization": "68c52ee7720a2d3552e68d7a",
        "siteName": "Site-1",
        "joinedUsers": [],
        "inspections": [],
        "actions": [],
        "createdAt": "2025-09-15T08:41:35.171Z",
        "updatedAt": "2025-09-16T02:56:27.272Z",
        "siteAvatar": "https://res.cloudinary.com/dnxsk9rgl/image/upload/v1757927430/fiwjopwadpqak33clqac.png"
    },
    "meta": null
}
```


<p id="organization-endpoints"> </p>

### 🚀 Organization Endpoints


<p id="update-organization"> </p>

#### ➡️ Update Organization - (PATCH) - `/organization/update-info`
`Headers` 
- Content-Type: Multipart/form-data
- Authorization: accessToken / Cookies needed

`Request Body`

| Field Name | Type | Example |
| --- | --- | --- |
| data | Object | {sample data} |
| image | File |  any .png, .jpg, .jpeg , .webp


`Note that`: sample data as below, all field are optional.
```json
{
  "organizationName": "Tech Innovators Ltd.",
  "owner": "650c5b2e1f2a5d9b12345678",
  "phoneNumber": "+8801712345678",
  "websiteURL": "https://techinnovators.com",
  "language": "english",
  "dateFormat": "dd/mm/yyyy",
  "timeFormat": "24h",
  "temperatureUnit": "C",
  "distanceUnit": "km"
}
```


`Response`
```json
{
    "success": true,
    "message": "Organization update successfully!",
    "data": {
        "_id": "68c52ee7720a2d3552e68d7a",
        "organizationName": "Tech Innovators Ltd.",
        "owner": "650c5b2e1f2a5d9b12345678",
        "language": "english",
        "dateFormat": "dd/mm/yyyy",
        "timeFormat": "24h",
        "temperatureUnit": "C",
        "distanceUnit": "km",
        "createdAt": "2025-09-13T08:44:23.868Z",
        "updatedAt": "2025-09-16T03:28:34.373Z",
        "organizationLogo": "https://res.cloudinary.com/dnxsk9rgl/image/upload/v1757993314/scge0towmgimusz2x3h9.png",
        "phoneNumber": "+8801712345678",
        "websiteURL": "https://techinnovators.com"
    },
    "meta": null
}
```

<p id="action-endpoints"></p>

### 🚀 Action Endpoints


<p id="create-new-action"> </p>

#### ➡️ Create New action - (POST) - `/action`
`Headers` 
- Content-Type: application/json
- Authorization: accessToken / Cookies needed

`Request Body`
```json
{
    "actionTitle":"First Action",
    "priority":"Low",
    "dueDate":"2025-09-16T03:01:37.587+00:00",
    "index":2,

    // optional fields
    "assignBy": [], // ObjetId array
    "state": "To do", // To do, In Progress, Complete, can’t do
    "priority": "Low", // Low, Medium, High

}
```
`Response`
```json
{
    "success": true,
    "message": "Action created successfully!",
    "data": {
        "author": "68c52ee7720a2d3552e68d78",
        "actionTitle": "First Action",
        "priority": "Low",
        "dueDate": "2025-09-16T03:01:37.587+00:00",
        "assignBy": [],
        "state": "To do",
        "_id": "68c8fcd88f65dd27d24a7599",
        "createdAt": "2025-09-16T05:59:52.442Z",
        "updatedAt": "2025-09-16T05:59:52.442Z"
    },
    "meta": null
}
```

<p id="get-all-actions"> </p>

#### ➡️ Get All Action - (GET) - `/action`
`Headers` 
- Authorization: accessToken / Cookies needed

`query params`
- page
- limit
- searchTerm // which are search action title

`Response`
```json
{
    "success": true,
    "message": "Action created successfully!",
    "data": [
        {
            "_id": "68c8fcd88f65dd27d24a7599",
            "author": "68c52ee7720a2d3552e68d78",
            "actionTitle": "First Action",
            "priority": "Low",
            "dueDate": "2025-09-16T03:01:37.587+00:00",
            "assignBy": [],
            "state": "To do",
            "createdAt": "2025-09-16T05:59:52.442Z",
            "updatedAt": "2025-09-16T05:59:52.442Z"
        },
        {...}
    ],
     "meta": {
        "page": 1,
        "limit": 10,
        "skip": 0,
        "total": 5
    }
}
```

<p id="get-single-action"> </p>

#### ➡️ Get Single Action - (GET) - `/action/:actionId`
`Headers` 
- Authorization: accessToken / Cookies needed


`Response`
```json
{
    "success": true,
    "message": "Action fetched successfully!",
    "data": {
        "_id": "68c8fcd88f65dd27d24a7599",
        "author": "68c52ee7720a2d3552e68d78",
        "actionTitle": "First Action",
        "priority": "Low",
        "dueDate": "2025-09-16T03:01:37.587+00:00",
        "assignBy": [],
        "state": "To do",
        "createdAt": "2025-09-16T05:59:52.442Z",
        "updatedAt": "2025-09-16T05:59:52.442Z"
    },
    "meta": null
}
```

<p id="update-action"> </p>

#### ➡️ Update Action - (PATCH) - `/action/:actionId`
`Headers` 
- Authorization: accessToken / Cookies needed
- Content-Type: application/json

`Request Body`
```json
{
    "priority":"High",
}

```

`Response`
```json
{
    "success": true,
    "message": "Action updated successfully!",
    "data": {
        "_id": "68c8fcd88f65dd27d24a7599",
        "author": "68c52ee7720a2d3552e68d78",
        "actionTitle": "Updated Action",
        "priority": "High",
        "dueDate": "2025-09-16T03:01:37.587+00:00",
        "assignBy": [],
        "state": "To do",
        "createdAt": "2025-09-16T05:59:52.442Z",
        "updatedAt": "2025-09-16T08:49:03.633Z"
    },
    "meta": null
}
```

<p id="delete-action"> </p>

#### ➡️ Delete Action - (DELETE) - `/action/:actionId`
`Headers` 
- Authorization: accessToken / Cookies needed

`Response`
```json
{
    "success": true,
    "message": "Action deleted successfully!",
    "data": null,
    "meta": null
}
```


<p id="template-endpoints"> </p>

## 🚀 Template Endpoints


<p id="create-new-template"> </p>

#### ➡️ Create new Template - (POST) - `/template`
`Headers` 
- Authorization: accessToken / Cookies needed

`Response`
```json
{
    "success": true,
    "message": "Template created successful",
    "data": {
        "author": "68c52ee7720a2d3552e68d78",
        "templateName": "Untitled Template",
        "pages": [
            {
                "pageIndex": 0,
                "title": "Untitled Page",
                "questions": [
                    {
                        "index": 0,
                        "question": "Site conducted",
                        "isRequired": true,
                        "answerType": "input",
                        "valueType": "text"
                    },
                    {
                        "index": 1,
                        "question": "Conducted on",
                        "isRequired": false,
                        "answerType": "input",
                        "valueType": "date"
                    },
                    {
                        "index": 2,
                        "question": "Prepared by",
                        "isRequired": false,
                        "answerType": "input",
                        "valueType": "text"
                    },
                    {
                        "index": 3,
                        "question": "Where is your current office located?",
                        "isRequired": true,
                        "answerType": "location",
                        "coordinates": {
                            "lat": 23.8103,
                            "lng": 90.4125
                        }
                    }
                ]
            },
            {
                "pageIndex": 1,
                "title": "Untitled Page",
                "questions": []
            }
        ],
        "_id": "68cb8e45c97f2019edd6aaa6",
        "approval": [],
        "access": [],
        "createdAt": "2025-09-18T04:44:53.731Z",
        "updatedAt": "2025-09-18T04:44:53.731Z"
    },
    "meta": null
}
```

`Note That`: When create new template, initially you don't need to send any data on backend. We provided a default template for creating new request. After that, you update or edit this template, for auto saving you can use onChange event.


<p id="get-all-template"> </p>

#### ➡️ Get All Template - (GET) - `/`
`Headers` 
- Authorization: accessToken / Cookies needed

`Query Params`
- page
- limit
- searchTerm

`Response`
```json
{
    "success": true,
    "message": "Template fetched successful",
    "data": {
        "data": [
            {
                "_id": "68cb92bbcb42017d5e8d2c3c",
                "author": "68c52ee7720a2d3552e68d7a",
                "templateName": "Untitled Template",
                "pages": [
                    {
                        "pageIndex": 0,
                        "title": "Untitled Page",
                        "questions": [
                            {
                                "index": 0,
                                "question": "Site conducted",
                                "isRequired": true,
                                "answerType": "input",
                                "valueType": "text"
                            },
                            {
                                "index": 1,
                                "question": "Conducted on",
                                "isRequired": false,
                                "answerType": "input",
                                "valueType": "date"
                            },
                            {
                                "index": 2,
                                "question": "Prepared by",
                                "isRequired": false,
                                "answerType": "input",
                                "valueType": "text"
                            },
                            {
                                "index": 3,
                                "question": "Where is your current office located?",
                                "isRequired": true,
                                "answerType": "location",
                                "coordinates": {
                                    "lat": 23.8103,
                                    "lng": 90.4125
                                }
                            }
                        ]
                    },
                    {
                        "pageIndex": 1,
                        "title": "Untitled Page",
                        "questions": []
                    }
                ],
                "approval": [],
                "access": [],
                "createdAt": "2025-09-18T05:03:55.579Z",
                "updatedAt": "2025-09-18T05:03:55.579Z"
            },
            {
                ...
            }
            
        ],
        "meta": {
            "total": 3,
            "page": 1,
            "limit": 10,
            "totalPages": 1
        }
    },
    "meta": null
}
```

<p id="get-single-template"> </p>

#### ➡️ Get Single Template - (GET) - `/:templateId`
`Headers` 
- Authorization: accessToken / Cookies needed

`Params`
- templateId

`Response`
```json
{
    "success": true,
    "message": "Template fetched successful",
    "data": {
        "_id": "68cb92bbcb42017d5e8d2c3c",
        "author": "68c52ee7720a2d3552e68d7a",
        "templateName": "Untitled Template",
        "pages": [
            {
                "pageIndex": 0,
                "title": "Untitled Page",
                "questions": [
                    {
                        "index": 0,
                        "question": "Site conducted",
                        "isRequired": true,
                        "answerType": "input",
                        "valueType": "text"
                    },
                    {
                        "index": 1,
                        "question": "Conducted on",
                        "isRequired": false,
                        "answerType": "input",
                        "valueType": "date"
                    },
                    {
                        "index": 2,
                        "question": "Prepared by",
                        "isRequired": false,
                        "answerType": "input",
                        "valueType": "text"
                    },
                    {
                        "index": 3,
                        "question": "Where is your current office located?",
                        "isRequired": true,
                        "answerType": "location",
                        "coordinates": {
                            "lat": 23.8103,
                            "lng": 90.4125
                        }
                    }
                ]
            },
            {
                "pageIndex": 1,
                "title": "Untitled Page",
                "questions": []
            }
        ],
        "approval": [],
        "access": [],
        "createdAt": "2025-09-18T05:03:55.579Z",
        "updatedAt": "2025-09-18T05:03:55.579Z"
    },
    "meta": null
}
```


<p id="update-template"> </p>

#### ➡️ Update Template - (PATCH) - `/:templateId`
`Headers` 
- Authorization: accessToken / Cookies needed

`Request Body`
| Field Name | Type | Example |
| --- | --- | --- |
| data | Object | {... same formate of TTemplate data} |
|image | File |  any .png, .jpg, .jpeg , .webp, .svg |


`Response`
```json
{
    "success": true,
    "message": "Template updated successful",
    "data": {
        .... // new updated data
    },
    "meta": null
}
```


<p id="delete-template"> </p>

#### ➡️ Delete Template - (DELETE) - `/:templateId`
`Headers` 
- Authorization: accessToken / Cookies needed

`Response`
```json
{
    "success": true,
    "message": "Template delete successful",
    "data": null,
    "meta": null
}
```




<p id="inspection-endpoints"> </p>

## 🚀 Inspection Endpoints

<p id="create-new-inspection"> </p>

#### ➡️ Create New Inspection - (POST) - `/inspection`
`Headers` 
- Content-Type: application/json
- Authorization: accessToken / Cookies needed


`Request Body`
```json
{
    {
    "template":"68cfa0cdd0dde4e32cbceaa1",
    "questionAdnAnswer":[
        {
            "question":"Hello Bangladesh ?",
            "answer":"How are you?",
            "note":"Hello Bangladesh ?", // optional
            "media":["http://dummy.image.com", "https://dummy.image.com"] // optional
        }
    ]
    }
}
```
`Response`
```json
{
    "success": true,
    "message": "Inspection created successfully!",
    "data": {
        "organization": "68c52ee7720a2d3552e68d7a",
        "template": "68cfa0cdd0dde4e32cbceaa1",
        "inspector": "68c52ee7720a2d3552e68d78",
        "questionAdnAnswer": [
            {
                "question": "Hello Bangladesh ?",
                "answer": "How are you?",
                "note":"Hello Bangladesh ?",
                "media":["http://dummy.image.com", "https://dummy.image.com"]
            }
        ],
        "_id": "68cfc6828c6f4ee272d932c2",
        "createdAt": "2025-09-21T09:33:54.661Z",
        "updatedAt": "2025-09-21T09:33:54.661Z"
    },
    "meta": null
}
```

<p id="update-inspection"> </p>

#### ➡️ Update Inspection - (PATCH) - `/inspection/:inspectionId`
`Headers` 
- Content-Type: application/json
- Authorization: accessToken / Cookies needed


`Request Body`
```json
{
    "question":"Submit by?", // Not changeable by user. send this as it is same to same template question.
    "answer":"Mahid", // optional
    "note":"This is a testing inspection", // optional
    "media":["http://dummy.image.com", "https://dummy.image.com"] // optional
}
```
`Response`
```json
{
    "success": true,
    "message": "Inspection update successfully!",
    "data": {
        "_id": "68cfc6828c6f4ee272d932c2",
        "organization": "68c52ee7720a2d3552e68d7a",
        "template": "68cfa0cdd0dde4e32cbceaa1",
        "inspector": "68c52ee7720a2d3552e68d78",
        "questionAdnAnswer": [
            {
                "question":"Submit by?",
                "answer":"Mahid",
                "note":"This is a testing inspection",
                "media":["http://dummy.image.com", "https://dummy.image.com"]
            }
        ],
        "createdAt": "2025-09-21T09:33:54.661Z",
        "updatedAt": "2025-09-21T10:11:34.660Z"
    },
    "meta": null
}
```


<p id="delete-inspection"> </p>

#### ➡️ Delete Inspection - (DELETE) - `/inspection/:inspectionId`
`Headers` 
- Authorization: accessToken / Cookies needed

`Response`
```json
{
    "success": true,
    "message": "Inspection delete successfully!",
    "data": null,
    "meta": null
}
```

<p id="get-all-inspection"> </p>

#### ➡️ Get All Inspection - (GET) - `/inspection`
`Headers` 
- Authorization: accessToken / Cookies needed

`Query Params`
- page
- limit

`Response`
```json
{
    "success": true,
    "message": "Inspection fetched successfully!",
    "data": [
        {
            "_id": "68cfd554a37691f13caf92e0",
            "organization": "68c52ee7720a2d3552e68d7a",
            "template": "68cfa0cdd0dde4e32cbceaa1",
            "inspector": "68c52ee7720a2d3552e68d78",
            "questionAdnAnswer": [
                {
                    "question": "Hello Bagladesh ?",
                    "answer": "How are you?",
                    "mediaFiles": []
                }
            ],
            "createdAt": "2025-09-21T10:37:08.525Z",
            "updatedAt": "2025-09-21T10:37:08.525Z"
        }
    ],
    "meta": {
        "total": 1,
        "page": 1,
        "limit": 10,
        "totalPages": 1
    }
}
```

<p id="get-single-inspection"> </p>

#### ➡️ Get Single Inspection - (GET) - `/inspection/:inspectionId`
`Headers` 
- Authorization: accessToken / Cookies needed

`Response`
```json
{
    "success": true,
    "message": "Inspection fetched successfully!",
    "data": {
        "_id": "68cfd554a37691f13caf92e0",
        "organization": "68c52ee7720a2d3552e68d7a",
        "template": "68cfa0cdd0dde4e32cbceaa1",
        "inspector": "68c52ee7720a2d3552e68d78",
        "questionAdnAnswer": [
            {
                "question": "Hello Bagladesh ?",
                "answer": "How are you?",
                "mediaFiles": []
            }
        ],
        "createdAt": "2025-09-21T10:37:08.525Z",
        "updatedAt": "2025-09-21T10:37:08.525Z"
    },
    "meta": null
}
```