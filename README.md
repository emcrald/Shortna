## **Shortna - URL Shortener**  

> A simple and fast URL shortener built with MongoDB, Netlify Functions, and vanilla JavaScript.

### Overview

Shortna is a lightweight URL shortener that converts long URLs into short, easy-to-share links. It uses MongoDB to store URL mappings and Netlify Functions for backend processing.

### Features

- Generate short URLs for any long link.
- Redirect users from short URLs to their original destinations.
- Simple UI for easy URL input and retrieval.
- Fully serverless, running on Netlify Functions.

### Live Demo

Try the live version: [**Shortna URL Shortener**](https://shortna.emcrald.me)

---

## Installation

### Running Locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/emcrald/shortna.git
   cd shortna
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file and add your MongoDB connection string:
     
     ```
     mongoDBURL=your_mongodb_connection_string
     ```

4. **Run the development server:**
   ```
   netlify dev
   ```

5. **Open in a browser:**
   - Visit `http://localhost:8888`

---

## Usage

1. **Enter a URL**  
   - Paste a long URL into the input field.  
2. **Shorten the URL**  
   - Click the "Shorten URL" button.  
3. **Copy & Share**  
   - Copy the generated short URL and share it.  

---

## Technologies Used

- **MongoDB** – Stores short & long URLs  
- **Netlify Functions** – Serverless backend  
- **JavaScript** – Frontend and API interaction  
- **HTML & CSS** – Simple UI

---

## Designed in Figma  

Shortna's UI design was initially created in Figma and repurposed from **[Jax Convert](https://github.com/emcrald/JaxConvert)**, maintaining the same interface.  
![image](https://github.com/user-attachments/assets/e488e421-c428-4371-8446-70af8a28aeac)

---

## Contributing

1. Fork the repository.  
2. Create a new branch: `git checkout -b feature-branch`  
3. Commit changes: `git commit -m 'Add new feature'`  
4. Push to branch: `git push origin feature-branch`  
5. Open a pull request.  

---

## Contact

For any questions or feedback, reach out on Discord: [@emcrald](https://discord.gg/Gj8xWwg)
