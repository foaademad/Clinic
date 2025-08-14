# Clinic API HTTP Test Files

This directory contains organized HTTP test files for testing the Clinic API endpoints. The API uses a centralized error handling system that provides specific error messages instead of generic "Internal server error" responses.

## 📁 File Structure

```
http-tests/
├── user-endpoints.http         # User management endpoints
├── doctor-endpoints.http       # Doctor management endpoints
├── session-endpoints.http      # Session management endpoints
├── appointment-endpoints.http  # Appointment management endpoints
└── README.md                   # This file
```

## 🚀 Prerequisites

1. **Server Running**: Ensure the Clinic API server is running on `https://clinic-beta-silk.vercel.app`
2. **Test File**: Create a `test.png` file in the project root for file upload testing
3. **Environment Variables**: Ensure `.env` file is configured with Cloudinary credentials

## 🛠️ How to Use

### VS Code REST Client
1. Install the "REST Client" extension
2. Open any `.http` file
3. Click "Send Request" above each request
4. View responses in the output panel

### Postman
1. Import the `.http` files into Postman
2. Set up environment variables for dynamic values
3. Run individual requests or collections

### cURL (Command Line)
```bash
# Example: Test user registration
curl -X POST https://clinic-beta-silk.vercel.app/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "role": "patient",
    "age": 25,
    "password": "password123"
  }'
```

## 📋 Test File Requirements

- **test.png**: Required for file upload testing (any small image file)
- **Global Variables**: Each file uses `@baseUrl`, `@testFile`, and ID placeholders
- **Environment**: Ensure MongoDB is connected and Cloudinary is configured

## 🔧 Endpoint Categories

### 1. User Management (`user-endpoints.http`)
- User registration (with/without profile image)
- User login
- Profile updates
- **Error Handling**: Validation errors, duplicate emails, invalid credentials

### 2. Doctor Management (`doctor-endpoints.http`)
- Complete doctor information
- Upload doctor documents
- Get/update doctor info
- **Error Handling**: Role validation, missing fields, invalid IDs

### 3. Session Management (`session-endpoints.http`)
- Create/update/delete sessions
- **Error Handling**: Past dates, invalid durations, booked sessions

### 4. Appointment Management (`appointment-endpoints.http`)
- Book/cancel appointments
- Get appointment details
- **Error Handling**: Double booking, past sessions, invalid patients

## ✅ Expected Response Format

### Success Responses
```json
{
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

### Error Responses (Centralized Error Handling)
```json
{
  "error": "Specific error message"
}
```

## 🚨 Error Handling System

The API uses a centralized error handling middleware that provides:

### Validation Errors (400)
- Missing required fields
- Invalid email formats
- Invalid ObjectId formats
- Invalid data types

### Authentication Errors (401)
- Invalid credentials
- Missing tokens
- Expired tokens

### Authorization Errors (403)
- Insufficient permissions
- Role-based access control

### Not Found Errors (404)
- User not found
- Doctor not found
- Session not found
- Appointment not found

### Conflict Errors (409)
- Email already exists
- Doctor info already completed
- Session already booked
- Patient already has appointment

### File Upload Errors (400)
- Invalid file type
- File too large
- No file uploaded

## 🔍 Testing Strategy

Each endpoint file contains:
1. **Success scenarios** with expected responses
2. **Error scenarios** with specific error messages
3. **Validation examples** for different input types
4. **Business logic testing** for role-based access

## 🐛 Troubleshooting

### Common Issues

1. **Server Not Running**
   ```
   Error: connect ECONNREFUSED 127.0.0.1:4010
   ```
   **Solution**: Start the server with `npm start`

2. **File Upload Errors**
   ```
   Error: No file uploaded
   ```
   **Solution**: Ensure `test.png` exists in project root

3. **Database Connection**
   ```
   Error: Internal server error
   ```
   **Solution**: Check MongoDB connection and `.env` configuration

4. **Cloudinary Errors**
   ```
   Error: Failed to upload file to Cloudinary
   ```
   **Solution**: Verify Cloudinary credentials in `.env`

### Debug Steps

1. Check server logs for detailed error messages
2. Verify all environment variables are set
3. Ensure test files exist in correct locations
4. Test with Postman for better error visibility

## 📝 Notes

- All error responses now use the `error` field instead of `message`
- Error messages are specific and actionable
- HTTP status codes are consistent across all endpoints
- File upload testing requires actual image files
- Global variables make testing easier across different environments

## 🔄 Updates

- **v2.0**: Centralized error handling system
- **v1.0**: Basic endpoint testing
- All controllers now use `asyncHandler` wrapper
- Validation helpers provide consistent error messages
- **Cleaned up structure**: Removed duplicate files, organized by endpoint type
