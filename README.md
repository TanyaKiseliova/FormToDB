# Adaptive Web page with a form which save data to SQLite database
## technologies: SQLite database, php, html, CSS and Bootstrap, JS, FontAwesome, Docker

## Some scrins
<img width="2539" height="994" alt="image" src="https://github.com/user-attachments/assets/392b1705-ffcf-47d2-9daf-a9a83061947c" />
<img width="2538" height="1070" alt="image" src="https://github.com/user-attachments/assets/560d1e00-1c33-4129-bf96-54e0eb94ae34" />
<img width="2531" height="741" alt="image" src="https://github.com/user-attachments/assets/fc3c45b6-abf5-4099-bbe3-0d7a639f3139" />
<img width="1762" height="258" alt="image" src="https://github.com/user-attachments/assets/e8d94d1b-f952-4cc7-af30-af80b82027dd" />


## Features
- **Validation rules:**
  - First name and last name, birth date and rules agree checkboxare required.
  - At least one contact method (email or phone) must be provided.
- **Phone numbers:**
  - Multiple phone inputs can be added dynamically.
  - All numbers are cleaned (digits only) and stored in one field separated by commas.
- **Database:**
  - SQLite database auto-created if missing.
     
## How to run 
1. Clone this project
2. In project must be files Dockerfile and docker-compose.yml
3. Build project:  docker-compose build
4. Run: docker-compose up
5. Open in browser: http://localhost:8080/index.html




