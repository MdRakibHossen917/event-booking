# API Endpoints Documentation

Base URL: `https://event-booking-server-wheat.vercel.app`

## Authentication
All protected endpoints require Firebase authentication token in the header:
```
Authorization: Bearer <firebase_id_token>
```

---

## Groups/Events Endpoints

### 1. Get All Groups
- **Method:** `GET`
- **Endpoint:** `/groups`
- **Auth Required:** No
- **Description:** Fetch all groups/events
- **Query Parameters:** None
- **Used in:** AllGroups.jsx, Banner.jsx, LatestCard.jsx, UpcomingEventCountdown.jsx, GroupDetails.jsx

### 2. Get Groups by User Email
- **Method:** `GET`
- **Endpoint:** `/groups?userEmail={email}`
- **Auth Required:** No (but user email is required)
- **Description:** Get groups created by a specific user
- **Query Parameters:** `userEmail` (string)
- **Used in:** MyGroup.jsx, MyEvents.jsx, MyCreatedGroups.jsx, DashboardHome.jsx

### 3. Get Single Group by ID
- **Method:** `GET`
- **Endpoint:** `/groups/{id}`
- **Auth Required:** No
- **Description:** Get details of a specific group
- **Path Parameters:** `id` (string) - Group ID
- **Used in:** UpdateGroup.jsx, GroupDetails.jsx

### 4. Create Group/Event
- **Method:** `POST`
- **Endpoint:** `/createGroup`
- **Auth Required:** Yes (Firebase token)
- **Description:** Create a new group/event
- **Request Body:**
  ```json
  {
    "groupName": "string",
    "description": "string",
    "location": "string",
    "maxMembers": number,
    "image": "string",
    "formattedDate": "string",
    "formatHour": "string",
    "day": "string",
    "category": "string",
    "creatorName": "string",
    "creatorImage": "string",
    "userEmail": "string"
  }
  ```
- **Used in:** CreateGroupForm.jsx

### 5. Update Group/Event
- **Method:** `PUT`
- **Endpoint:** `/groups/{id}`
- **Auth Required:** Yes (Firebase token)
- **Description:** Update an existing group/event
- **Path Parameters:** `id` (string) - Group ID
- **Request Body:**
  ```json
  {
    "groupName": "string",
    "category": "string",
    "description": "string",
    "location": "string",
    "maxMembers": number,
    "image": "string",
    "formattedDate": "string",
    "formatHour": "string",
    "day": "string",
    "userEmail": "string"
  }
  ```
- **Used in:** UpdateGroup.jsx, MyGroup.jsx (inline update)

### 6. Delete Group/Event
- **Method:** `DELETE`
- **Endpoint:** `/groups/{id}` or `/groups/{id}?userEmail={email}`
- **Auth Required:** Yes (Firebase token)
- **Description:** Delete a group/event
- **Path Parameters:** `id` (string) - Group ID
- **Query Parameters:** `userEmail` (string, optional) - User email
- **Used in:** MyGroup.jsx, MyEvents.jsx, MyCreatedGroups.jsx

### 7. Get Groups by IDs
- **Method:** `POST`
- **Endpoint:** `/groupsByIds`
- **Auth Required:** No
- **Description:** Get multiple groups by their IDs
- **Request Body:**
  ```json
  {
    "ids": ["id1", "id2", "id3"]
  }
  ```
- **Used in:** MyGroup.jsx, MyEvents.jsx, JoinedGroups.jsx

### 8. Join Group/Event
- **Method:** `POST`
- **Endpoint:** `/joinGroup`
- **Auth Required:** Yes (Firebase token)
- **Description:** Join a group/event
- **Request Body:**
  ```json
  {
    "groupId": "string",
    "groupName": "string",
    "userEmail": "string",
    "joinedAt": "ISO date string"
  }
  ```
- **Used in:** AllGroups.jsx, LatestCard.jsx

### 9. Leave Group/Event
- **Method:** `POST` or `DELETE`
- **Endpoint:** `/leaveGroup`
- **Auth Required:** Yes (Firebase token)
- **Description:** Leave a group/event
- **Request Body:**
  ```json
  {
    "groupId": "string",
    "userEmail": "string"
  }
  ```
- **Note:** Some implementations use `POST`, others use `DELETE`
- **Used in:** MyGroup.jsx, MyEvents.jsx, JoinedGroups.jsx

### 10. Get User Joined Groups
- **Method:** `GET`
- **Endpoint:** `/user-joined-groups?email={email}`
- **Auth Required:** No (but email is required)
- **Description:** Get all groups a user has joined
- **Query Parameters:** `email` (string) - User email
- **Used in:** MyGroup.jsx, MyEvents.jsx, AllGroups.jsx, LatestCard.jsx, JoinedGroups.jsx, DashboardHome.jsx

---

## Articles Endpoints

### 11. Get All Articles
- **Method:** `GET`
- **Endpoint:** `/articles`
- **Auth Required:** No
- **Description:** Fetch all articles
- **Used in:** MyArticles.jsx, Articles.jsx, ArticleDetails.jsx, UpdateArticle.jsx, FeaturedArticles.jsx

### 12. Create Article
- **Method:** `POST`
- **Endpoint:** `/articles`
- **Auth Required:** Yes (Firebase token)
- **Description:** Create a new article
- **Request Body:**
  ```json
  {
    "title": "string",
    "shortDescription": "string",
    "content": "string",
    "coverImage": "string",
    "category": "string",
    "authorName": "string",
    "authorImage": "string",
    "publishDate": "ISO date string"
  }
  ```
- **Note:** `authorEmail` and `authorId` are set automatically by backend from authenticated user
- **Used in:** CreateArticle.jsx

### 13. Update Article
- **Method:** `PUT`
- **Endpoint:** `/articles/{id}`
- **Auth Required:** Yes (Firebase token)
- **Description:** Update an existing article
- **Path Parameters:** `id` (string) - Article ID
- **Request Body:**
  ```json
  {
    "title": "string",
    "shortDescription": "string",
    "content": "string",
    "coverImage": "string",
    "category": "string"
  }
  ```
- **Used in:** UpdateArticle.jsx

### 14. Delete Article
- **Method:** `DELETE`
- **Endpoint:** `/articles/{id}`
- **Auth Required:** Yes (Firebase token)
- **Description:** Delete an article
- **Path Parameters:** `id` (string) - Article ID
- **Used in:** MyArticles.jsx

### 15. Get Article Comments
- **Method:** `GET`
- **Endpoint:** `/articles/{articleId}/comments`
- **Auth Required:** No
- **Description:** Get all comments for an article
- **Path Parameters:** `articleId` (string) - Article ID
- **Used in:** Comments.jsx

### 16. Create Article Comment
- **Method:** `POST`
- **Endpoint:** `/articles/{articleId}/comments`
- **Auth Required:** Yes (Firebase token)
- **Description:** Add a comment to an article
- **Path Parameters:** `articleId` (string) - Article ID
- **Request Body:**
  ```json
  {
    "text": "string",
    "authorName": "string",
    "authorEmail": "string",
    "authorImage": "string"
  }
  ```
- **Used in:** Comments.jsx

### 17. Delete Article Comment
- **Method:** `DELETE`
- **Endpoint:** `/articles/{articleId}/comments/{commentId}`
- **Auth Required:** Yes (Firebase token)
- **Description:** Delete a comment
- **Path Parameters:** 
  - `articleId` (string) - Article ID
  - `commentId` (string) - Comment ID
- **Used in:** Comments.jsx

---

## User Endpoints

### 18. Save User
- **Method:** `POST`
- **Endpoint:** `/save-user`
- **Auth Required:** No
- **Description:** Save user data to MongoDB when they log in
- **Request Body:**
  ```json
  {
    "email": "string",
    "name": "string",
    "photo": "string"
  }
  ```
- **Used in:** AuthProvider.jsx

### 19. Get Total Users Count
- **Method:** `GET`
- **Endpoint:** `/totalUsers`
- **Auth Required:** No
- **Description:** Get total number of registered users
- **Used in:** DiscountBanner.jsx, Banner.jsx, DashboardHome.jsx

---

## Dashboard Endpoints

### 20. Get Dashboard Stats
- **Method:** `GET`
- **Endpoint:** `/dashboard-stats`
- **Auth Required:** No (but may require user context)
- **Description:** Get dashboard statistics
- **Used in:** DashboardHome.jsx

---

## External APIs

### ImgBB Image Upload
- **Method:** `POST`
- **Endpoint:** `https://api.imgbb.com/1/upload?expiration=600&key={API_KEY}`
- **Auth Required:** No (API key in URL)
- **Description:** Upload images to ImgBB
- **Request Body:** FormData with `image` field
- **Used in:** CreateArticle.jsx, CreateGroupForm.jsx, Profile.jsx

---

## Summary

### Public Endpoints (No Auth Required):
- GET `/groups`
- GET `/groups/{id}`
- GET `/groups?userEmail={email}`
- GET `/user-joined-groups?email={email}`
- POST `/groupsByIds`
- GET `/articles`
- GET `/articles/{articleId}/comments`
- POST `/save-user`
- GET `/totalUsers`
- GET `/dashboard-stats`

### Protected Endpoints (Auth Required):
- POST `/createGroup`
- PUT `/groups/{id}`
- DELETE `/groups/{id}`
- POST `/joinGroup`
- POST `/leaveGroup`
- DELETE `/leaveGroup`
- POST `/articles`
- PUT `/articles/{id}`
- DELETE `/articles/{id}`
- POST `/articles/{articleId}/comments`
- DELETE `/articles/{articleId}/comments/{commentId}`

---

## Authentication Headers Format

For protected endpoints, include:
```
Authorization: Bearer <firebase_id_token>
Content-Type: application/json
X-User-Email: user@example.com (fallback)
X-User-UID: firebase_uid (fallback)
```

Use the `getAuthHeaders(user)` helper function from `src/utils/apiHelpers.js` to automatically add these headers.

