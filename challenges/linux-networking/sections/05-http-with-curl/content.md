## HTTP Requests with curl

In DevOps workflows, we frequently interact with REST APIs, check webserver status, and test network connections by executing **HTTP requests** directly from the command line. The standard tool for this is `curl`.

---

## 1. Fetching Content (GET)

A standard `curl` execution sends an HTTP **GET** request and prints the response body directly to standard output.
```bash
curl http://example.com
```
- **Save to file (`-o`)**:
  ```bash
  curl -o homepage.html http://example.com
  ```

---

## 2. Inspecting Response Headers

To debug connection parameters, redirection paths, or content types, look at the HTTP headers (metadata) returned by the server.
- **Fetch Headers Only (`-I` or `--head`)**:
  ```bash
  curl -I http://example.com
  # Output:
  # HTTP/1.1 200 OK
  # Content-Type: text/html; charset=UTF-8
  # Content-Length: 1256
  ```

---

## 3. Querying APIs (POST, Custom Headers)

To interact with endpoints that require user payloads or custom authentication headers:
- **POST Request with Data (`-d` / `-X POST`)**:
  ```bash
  curl -X POST -d "username=admin&role=dev" http://example.com/api/users
  ```
- **Custom Header (`-H`)**:
  ```bash
  curl -H "Content-Type: application/json" -H "Authorization: Bearer token123" http://example.com/api/profile
  ```

---

## Lab Tasks

### Task 1: Fetch web server response
1. Start the lab in your terminal:
   ```bash
   tld start lnx-fetch-webpage
   ```
2. The setup script launched a lightweight HTTP server on `http://127.0.0.1:9090`.
3. Fetch the homepage response body using `curl`.
4. Save the exact text returned by the server to a file named `homepage.txt` inside your `~/network-test` directory.
5. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Retrieve HTTP status code
1. Start the lab in your terminal:
   ```bash
   tld start lnx-check-http-status
   ```
2. Query the headers of `http://127.0.0.1:9090` to find its HTTP response status code.
3. Save that numeric status code (e.g., `200`) on a single line to a file named `http_status.txt` inside your `~/network-test` directory.
4. Verify the task:
   ```bash
   tld check
   ```

### Task 3: Submit data to an API endpoint
1. Start the lab in your terminal:
   ```bash
   tld start lnx-query-api-endpoint
   ```
2. Submit an HTTP **POST** request to `http://127.0.0.1:9090` (you do not need to send any body parameters).
3. Save the exact text response returned by the server on a single line to a file named `api_response.txt` inside your `~/network-test` directory.
4. Verify the task:
   ```bash
   tld check
   ```
