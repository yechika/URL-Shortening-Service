# URL-Shortening-Service

## API Endpoints

- ✅ `POST /shorten`
- ✅ `GET /shorten/:shortCode`
- ✅ `PUT /shorten/:shortCode`
- ✅ `DELETE /shorten/:shortCode`
- ❌ `GET /shorten/:shortCode/stats`

***

```env
# .env template
MONGO_URI=<your_mongo_db_connection_string>
PORT=<your_PORT>
