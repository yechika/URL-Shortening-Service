# URL-Shortening-Service
Source : https://roadmap.sh/projects/url-shortening-service

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

